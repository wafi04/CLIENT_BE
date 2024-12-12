import { Strategy } from "passport-jwt";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(req: Request, payload: {
        sub: number;
        email: string;
    }): Promise<{
        refreshToken: any;
        name: string;
        email: string;
        id: number;
    }>;
}
export {};
