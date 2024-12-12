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
var AuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const public_decorator_1 = require("../../../common/decorator/public.decorator");
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(jwtService, reflector, configService) {
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        this.logger.debug(`Endpoint isPublic: ${isPublic}`);
        if (isPublic) {
            this.logger.debug('Public endpoint accessed');
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookie(request);
        this.logger.debug(`Token extracted from cookie: ${token ? 'exists' : 'missing'}`);
        if (!token) {
            this.logger.warn('No token found in cookies');
            throw new common_1.UnauthorizedException('No access token found');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            this.logger.debug('Token verified successfully');
            request['user'] = payload;
        }
        catch (error) {
            this.logger.error('Token verification failed:', error.message);
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return true;
    }
    extractTokenFromCookie(request) {
        const token = request.cookies['access_token'];
        this.logger.debug(`Cookie extraction attempt: ${token ? 'found' : 'not found'}`);
        return token;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map