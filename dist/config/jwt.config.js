"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => ({
    accessToken: {
        secret: process.env.JWT_SECRET,
        expiresIn: '86400s',
    },
    refreshToken: {
        secret: process.env.JWT_SECRET,
        expiresIn: '604800s',
    },
    development: {
        ignoreExpiration: true,
    },
    production: {
        ignoreExpiration: false,
    },
}));
//# sourceMappingURL=jwt.config.js.map