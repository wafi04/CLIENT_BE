import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterAdmin, RegisterDto } from "./dto/Register.dto";
import { AuthenticatedRequest } from "src/common/interfaces/user";
import { CookieService } from "./cookie.service";
import { PrismaService } from "src/prisma/prisma.service";
export declare class AuthController {
    private readonly authService;
    private cookieService;
    private readonly prisma;
    private logger;
    constructor(authService: AuthService, cookieService: CookieService, prisma: PrismaService);
    register(data: RegisterDto): Promise<{
        role: string;
        name: string;
        email: string;
        noTelp: string;
        id: number;
    } | {
        role: string;
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
    registerAdmin(data: RegisterAdmin): Promise<{
        name: string;
        email: string;
        noTelp: string;
        id: number;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshTokens(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(request: AuthenticatedRequest): Promise<import("src/common/interfaces/user").UserData | import("src/common/interfaces/user").AdminData>;
    verifyToken(request: Request): Promise<import("./auth.service").TokenVerificationResult>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
}
