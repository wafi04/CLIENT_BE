"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieToken = void 0;
const common_1 = require("@nestjs/common");
exports.CookieToken = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.cookies['access_token'];
    if (!token) {
        throw new common_1.UnauthorizedException('No token found in cookie');
    }
    return token;
});
//# sourceMappingURL=cookie.guard.js.map