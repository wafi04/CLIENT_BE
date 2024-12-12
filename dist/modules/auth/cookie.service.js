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
var CookieService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let CookieService = CookieService_1 = class CookieService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(CookieService_1.name);
    }
    generateTokens(payload) {
        try {
            return {
                accessToken: this.jwtService.sign(payload, {
                    secret: this.configService.get("jwt.accessToken.secret"),
                    expiresIn: this.configService.get("jwt.accessToken.expiresIn"),
                }),
                refreshToken: this.jwtService.sign(payload, {
                    secret: this.configService.get("jwt.refreshToken.secret"),
                    expiresIn: this.configService.get("jwt.refreshToken.expiresIn"),
                }),
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Error generating tokens");
        }
    }
    getCookieOptions(isAccessToken) {
        const isProduction = process.env.NODE_ENV === "production";
        return {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
            path: "/",
            maxAge: isAccessToken ? 1 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
        };
    }
    setCookies(response, tokens) {
        try {
            response.cookie("access_token", tokens.accessToken, this.getCookieOptions(true));
            response.cookie("refresh_token", tokens.refreshToken, this.getCookieOptions(false));
        }
        catch (error) {
            this.logger.error("Error setting cookies", error);
            throw new Error("Failed to set authentication cookies");
        }
    }
    clearTokenCookies(res) {
        try {
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            };
            res.clearCookie("access_token", cookieOptions);
            res.clearCookie("refresh_token", cookieOptions);
        }
        catch (error) {
            this.logger.error("Error clearing cookies", error);
            throw new Error("Failed to clear authentication cookies");
        }
    }
    extractTokenFromCookie(req, tokenType) {
        try {
            const cookies = req.cookies;
            return cookies?.[tokenType] || null;
        }
        catch (error) {
            this.logger.error("Error extracting token from cookie", error);
            return null;
        }
    }
};
exports.CookieService = CookieService;
exports.CookieService = CookieService = CookieService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], CookieService);
//# sourceMappingURL=cookie.service.js.map