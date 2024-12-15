import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterAdmin, RegisterDto } from "./dto/Register.dto";
import { Public } from "src/common/decorator/public.decorator";
import { AuthGuard } from "./guards/auth.guard";
import { AuthenticatedRequest } from "src/common/interfaces/user";
import { CookieService } from "./cookie.service";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Controller("auth")
export class AuthController {
  private logger = new Logger();
  constructor(
    private readonly authService: AuthService,
    private cookieService: CookieService,
    private readonly prisma: PrismaService
  ) {}

  @Public()
  @Post("register")
  async register(@Body() data: RegisterDto) {
    try {
      const isAdminEmail = data.email === "admin@admin.com";

      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            ...(isAdminEmail ? [] : [{ name: data.name }]),
          ],
        },
      });

      const existingAdmin = isAdminEmail
        ? await this.prisma.admin.findUnique({
            where: { email: data.email },
          })
        : null;

      if (existingUser) {
        throw new UnauthorizedException(
          existingUser.email === data.email
            ? "Email sudah terdaftar"
            : "Nama pengguna sudah digunakan"
        );
      }

      if (existingAdmin) {
        throw new UnauthorizedException(
          "Admin dengan email ini sudah terdaftar"
        );
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      if (isAdminEmail) {
        const admin = await this.prisma.admin.create({
          data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            noTelp: data.noTelp || "",
          },
        });

        const { password: _, ...adminWithoutPassword } = admin;
        return {
          ...adminWithoutPassword,
          role: "ADMIN",
        };
      } else {
        const user = await this.prisma.user.create({
          data: {
            name: data.name,
            Nik: data.Nik || "",
            alamat: data.alamat || "",
            jenisKelamin: data.jenisKelamin || "",
            noTelp: data.noTelp || "",
            tanggalLahir: data.tanggalLahir || "",
            tempatLahir: data.tempatLahir || "",
            email: data.email,
            password: hashedPassword,
          },
        });

        const { password: _, ...userWithoutPassword } = user;
        return {
          ...userWithoutPassword,
          role: "USER",
        };
      }
    } catch (error) {
      this.logger.error("Registration error", error);
      throw new UnauthorizedException(error.message || "Registrasi gagal");
    }
  }
  @Public()
  @Post("register/admin")
  async registerAdmin(@Body() data: RegisterAdmin) {
    console.log(data);
    return await this.authService.createAdmin(data);
  }

  @Public()
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    this.logger.log(loginDto);
    return this.authService.login(loginDto, res);
  }

  @Public()
  @Post("refresh")
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies["refresh_token"];

      if (!refreshToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: "Refresh token tidak tersedia",
        });
      }

      const newTokens = await this.authService.refreshTokens(refreshToken);

      const cookies = this.cookieService.setCookies(res, newTokens);

      return res.status(200).json({
        cookies,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Gagal memperbarui token",
        error: error.message,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Req() request: AuthenticatedRequest) {
    return this.authService.getProfile(request.user.sub, request.user.role);
  }

  @Get("verify")
  async verifyToken(@Req() request: Request) {
    const accessToken = request.cookies["access_token"];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    return this.authService.verifyToken(accessToken);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
