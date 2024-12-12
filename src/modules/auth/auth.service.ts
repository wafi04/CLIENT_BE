import {
  Injectable,
  UnauthorizedException,
  Res,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { AdminData, UserData } from "src/common/interfaces/user";
import { PrismaService } from "src/prisma/prisma.service";
import { CookieService } from "./cookie.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterAdmin, RegisterDto } from "./dto/Register.dto";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface TokenVerificationResult {
  isValid: boolean;
  payload?: TokenPayload;
  error?: string;
}
export interface TokenPayload {
  sub: number;
  email: string;
  Nik?: string;
  noTelp?: string;
  role: "admin" | "user";
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private cookiesService: CookieService
  ) {}

  async register(registerDto: RegisterDto) {
    const {
      name,
      email,
      password,
      Nik,
      alamat,
      jenisKelamin,
      noTelp,
      tanggalLahir,
      tempatLahir,
    } = registerDto;

    try {
      // Check if email or name already exists
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: email }, { name: name }],
        },
      });

      if (existingUser) {
        throw new UnauthorizedException(
          existingUser.email === email
            ? "Email sudah terdaftar"
            : "Nama pengguna sudah digunakan"
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await this.prisma.user.create({
        data: {
          name,
          Nik,
          alamat,
          jenisKelamin,
          noTelp,
          tanggalLahir,
          tempatLahir,
          email,
          password: hashedPassword,
        },
      });

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      this.logger.error("Registration error", error);
      throw new UnauthorizedException(error.message || "Registrasi gagal");
    }
  }

  async createAdmin(data: RegisterAdmin) {
    const existingUser = await this.prisma.admin.findFirst({
      where: {
        OR: [{ email: data.email }, { name: data.name }],
      },
    });

    if (existingUser) {
      throw new UnauthorizedException(
        existingUser.email === data.email
          ? "Email sudah terdaftar"
          : "Nama pengguna sudah digunakan"
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const create = await this.prisma.admin.create({
      data: {
        email: data.email,
        name: data.name,
        noTelp: data.noTelp,
        password: hashedPassword,
      },
    });
    const { password: _, ...adminNotPassword } = create;

    return adminNotPassword;
  }

  async login(loginDto: LoginDto, @Res() res: Response) {
    const { email, password, role } = loginDto;

    try {
      if (role === "user") {
        const user = await this.validateUser(email, password);

        if (!user) {
          throw new UnauthorizedException("Email atau password salah");
        }
        this.logger.log(user);

        const tokens = this.cookiesService.generateTokens({
          email: user.email,
          sub: user.id,
          Nik: user.Nik,
          role,
        });

        // Set cookies
        this.cookiesService.setCookies(res, tokens);

        // Prepare response

        return res.status(HttpStatus.OK).json({
          message: "Login berhasil",
          user,
          tokens,
        });
      } else {
        const validateAdmin = await this.validateAdmin(email, password);
        if (!validateAdmin) {
          throw new UnauthorizedException("Email atau password salah");
        }
        this.logger.log(validateAdmin);

        const tokens = this.cookiesService.generateTokens({
          email: validateAdmin.email,
          sub: validateAdmin.id,
          noTelp: validateAdmin.noTelp,
          role: "admin",
        });
        // Set cookies
        this.cookiesService.setCookies(res, tokens);

        // Prepare response

        return res.status(HttpStatus.OK).json({
          message: "Login berhasil",
          validateAdmin,
          tokens,
        });
      }
    } catch (error) {
      this.logger.error("Login error", error);
      throw new UnauthorizedException(error.message || "Login gagal");
    }
  }

  async getProfile(
    userId: number,
    role: string
  ): Promise<UserData | AdminData> {
    if (!userId) {
      throw new UnauthorizedException("User ID is required");
    }

    if (role === "admin") {
      const admin = await this.prisma.admin.findFirst({
        where: {
          id: userId,
        },
      });

      if (!admin) {
        throw new UnauthorizedException("Admin not found");
      }

      return {
        ...admin,
        role: "admin",
      };
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return {
      ...user,
      role: "user",
    };
  }
  async validateAdmin(
    email: string,
    password: string
  ): Promise<AdminData | null> {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: {
          email,
        },
      });

      if (!admin) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        return null;
      }

      //   tanpa menggunakan password
      const { password: _, ...userWithoutPassword } = admin;
      return {
        ...userWithoutPassword,
        role: "admin",
      };
    } catch (error) {
      this.logger.error("Admin validation error", error);
      return null;
    }
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<UserData | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      //   tanpa menggunakan password
      const { password: _, ...userWithoutPassword } = user;
      return {
        ...(userWithoutPassword as User),
        role: "user",
      };
    } catch (error) {
      this.logger.error("User validation error", error);
      return null;
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Verifikasi refresh token
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get("jwt.refreshToken.secret"),
      });

      // Cari user sekali saja dengan metode findUnique
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      });

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const tokens = this.cookiesService.generateTokens({
        email: user.email,
        sub: user.id,
        Nik: user.Nik,
        role: "user",
      });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async logout(@Res() res: Response) {
    try {
      // Clear both access and refresh tokens
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(HttpStatus.OK).json({
        message: "Logout berhasil",
      });
    } catch (error) {
      this.logger.error("Logout error", error);
      throw new UnauthorizedException("Logout gagal");
    }
  }
  async verifyToken(token: string): Promise<TokenVerificationResult> {
    if (!token) {
      return {
        isValid: false,
        error: "Token is required",
      };
    }

    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: this.configService.get("jwt.accessToken.secret"),
      });

      // Verifikasi bahwa user masih ada di database
      const user = await this.getProfile(payload.sub, payload.role);
      if (!user) {
        return {
          isValid: false,
          error: "User not found",
        };
      }

      return {
        isValid: true,
        payload: {
          sub: user.id,
          email: user.email,
          role: "user",
        },
      };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return {
          isValid: false,
          error: "Invalid token",
        };
      }

      return {
        isValid: false,
        error: "Error verifying token",
      };
    }
  }
}
