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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const Register_dto_1 = require("./dto/Register.dto");
const public_decorator_1 = require("../../common/decorator/public.decorator");
const auth_guard_1 = require("./guards/auth.guard");
const cookie_service_1 = require("./cookie.service");
let AuthController = class AuthController {
    constructor(authService, cookieService) {
        this.authService = authService;
        this.cookieService = cookieService;
        this.logger = new common_1.Logger();
    }
    async register(data) {
        return await this.authService.register(data);
    }
    async registerAdmin(data) {
        return await this.authService.createAdmin(data);
    }
    async login(loginDto, res) {
        this.logger.log(loginDto);
        return this.authService.login(loginDto, res);
    }
    async refreshTokens(req, res) {
        try {
            const refreshToken = req.cookies["refresh_token"];
            if (!refreshToken) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                    message: "Refresh token tidak tersedia",
                });
            }
            const newTokens = await this.authService.refreshTokens(refreshToken);
            const cookies = this.cookieService.setCookies(res, newTokens);
            return res.status(200).json({
                cookies,
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                message: "Gagal memperbarui token",
                error: error.message,
            });
        }
    }
    async getProfile(request) {
        return this.authService.getProfile(request.user.sub, request.user.role);
    }
    async verifyToken(request) {
        const accessToken = request.cookies["access_token"];
        if (!accessToken) {
            throw new common_1.UnauthorizedException();
        }
        return this.authService.verifyToken(accessToken);
    }
    async logout(res) {
        return this.authService.logout(res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("register/admin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Register_dto_1.RegisterAdmin]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("refresh"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("verify"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        cookie_service_1.CookieService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map