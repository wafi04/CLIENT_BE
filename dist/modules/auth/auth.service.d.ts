import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
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
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    private cookiesService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, cookiesService: CookieService);
    register(registerDto: RegisterDto): Promise<{
        name: string;
        email: string;
        Nik: string;
        alamat: string;
        tempatLahir: string;
        jenisKelamin: string;
        tanggalLahir: string;
        noTelp: string;
        id: number;
        createdAt: Date;
    }>;
    createAdmin(data: RegisterAdmin): Promise<{
        name: string;
        email: string;
        noTelp: string;
        id: number;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(userId: number, role: string): Promise<UserData | AdminData>;
    validateAdmin(email: string, password: string): Promise<AdminData | null>;
    validateUser(email: string, password: string): Promise<UserData | null>;
    refreshTokens(refreshToken: string): Promise<AuthTokens>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    verifyToken(token: string): Promise<TokenVerificationResult>;
}
