import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { AuthTokens, TokenPayload } from "./auth.service";
export interface TokenCookieConfig {
    name: string;
    token: string;
    isAccessToken: boolean;
}
export declare class CookieService {
    private jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    private readonly logger;
    generateTokens(payload: TokenPayload): AuthTokens;
    private getCookieOptions;
    setCookies(response: Response, tokens: {
        accessToken: string;
        refreshToken: string;
    }): void;
    clearTokenCookies(res: Response): void;
    extractTokenFromCookie(req: Request, tokenType: "access_token" | "refresh_token"): string | null;
}
