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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async use(req, res, next) {
        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];
        if (!accessToken && !refreshToken) {
            return res.redirect('/auth/login');
        }
        try {
            const payload = this.jwtService.verify(accessToken, {
                secret: this.configService.get('jwt.accessToken.secret'),
            });
            req['user'] = payload;
            next();
        }
        catch (error) {
            if (refreshToken) {
                try {
                    const refreshPayload = this.jwtService.verify(refreshToken, {
                        secret: this.configService.get('jwt.refreshToken.secret'),
                    });
                    const newAccessToken = this.jwtService.sign({ userId: refreshPayload.userId }, {
                        secret: this.configService.get('jwt.accessToken.secret'),
                        expiresIn: this.configService.get('jwt.accessToken.expiresIn'),
                    });
                    res.cookie('access_token', newAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                    });
                    req['user'] = refreshPayload;
                    next();
                }
                catch (refreshError) {
                    return res.redirect('/auth/login');
                }
            }
            else {
                return res.redirect('/auth/login');
            }
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map