"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
const cookie_service_1 = require("./cookie.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService, configService, cookiesService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.cookiesService = cookiesService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(registerDto) {
        const { name, email, password, Nik, alamat, jenisKelamin, noTelp, tanggalLahir, tempatLahir, } = registerDto;
        try {
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [{ email: email }, { name: name }],
                },
            });
            if (existingUser) {
                throw new common_1.UnauthorizedException(existingUser.email === email
                    ? "Email sudah terdaftar"
                    : "Nama pengguna sudah digunakan");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
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
        }
        catch (error) {
            this.logger.error("Registration error", error);
            throw new common_1.UnauthorizedException(error.message || "Registrasi gagal");
        }
    }
    async createAdmin(data) {
        const existingUser = await this.prisma.admin.findFirst({
            where: {
                OR: [{ email: data.email }, { name: data.name }],
            },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException(existingUser.email === data.email
                ? "Email sudah terdaftar"
                : "Nama pengguna sudah digunakan");
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
    async login(loginDto, res) {
        const { email, password, role } = loginDto;
        try {
            if (role === "user") {
                const user = await this.validateUser(email, password);
                if (!user) {
                    throw new common_1.UnauthorizedException("Email atau password salah");
                }
                this.logger.log(user);
                const tokens = this.cookiesService.generateTokens({
                    email: user.email,
                    sub: user.id,
                    Nik: user.Nik,
                    role,
                });
                this.cookiesService.setCookies(res, tokens);
                return res.status(common_1.HttpStatus.OK).json({
                    message: "Login berhasil",
                    user,
                    tokens,
                });
            }
            else {
                const validateAdmin = await this.validateAdmin(email, password);
                if (!validateAdmin) {
                    throw new common_1.UnauthorizedException("Email atau password salah");
                }
                this.logger.log(validateAdmin);
                const tokens = this.cookiesService.generateTokens({
                    email: validateAdmin.email,
                    sub: validateAdmin.id,
                    noTelp: validateAdmin.noTelp,
                    role: "admin",
                });
                this.cookiesService.setCookies(res, tokens);
                return res.status(common_1.HttpStatus.OK).json({
                    message: "Login berhasil",
                    validateAdmin,
                    tokens,
                });
            }
        }
        catch (error) {
            this.logger.error("Login error", error);
            throw new common_1.UnauthorizedException(error.message || "Login gagal");
        }
    }
    async getProfile(userId, role) {
        if (!userId) {
            throw new common_1.UnauthorizedException("User ID is required");
        }
        if (role === "admin") {
            const admin = await this.prisma.admin.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException("Admin not found");
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
            throw new common_1.UnauthorizedException("User not found");
        }
        return {
            ...user,
            role: "user",
        };
    }
    async validateAdmin(email, password) {
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
            const { password: _, ...userWithoutPassword } = admin;
            return {
                ...userWithoutPassword,
                role: "admin",
            };
        }
        catch (error) {
            this.logger.error("Admin validation error", error);
            return null;
        }
    }
    async validateUser(email, password) {
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
            const { password: _, ...userWithoutPassword } = user;
            return {
                ...userWithoutPassword,
                role: "user",
            };
        }
        catch (error) {
            this.logger.error("User validation error", error);
            return null;
        }
    }
    async refreshTokens(refreshToken) {
        try {
            const decoded = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get("jwt.refreshToken.secret"),
            });
            const user = await this.prisma.user.findUnique({
                where: { id: decoded.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException("User not found");
            }
            const tokens = this.cookiesService.generateTokens({
                email: user.email,
                sub: user.id,
                Nik: user.Nik,
                role: "user",
            });
            return tokens;
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid refresh token");
        }
    }
    async logout(res) {
        try {
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
            return res.status(common_1.HttpStatus.OK).json({
                message: "Logout berhasil",
            });
        }
        catch (error) {
            this.logger.error("Logout error", error);
            throw new common_1.UnauthorizedException("Logout gagal");
        }
    }
    async verifyToken(token) {
        if (!token) {
            return {
                isValid: false,
                error: "Token is required",
            };
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get("jwt.accessToken.secret"),
            });
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
        }
        catch (error) {
            if (error instanceof jwt_1.JsonWebTokenError) {
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
};
exports.AuthService = AuthService;
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        cookie_service_1.CookieService])
], AuthService);
//# sourceMappingURL=auth.service.js.map