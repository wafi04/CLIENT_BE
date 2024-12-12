declare const _default: (() => {
    accessToken: {
        secret: string;
        expiresIn: string;
    };
    refreshToken: {
        secret: string;
        expiresIn: string;
    };
    development: {
        ignoreExpiration: boolean;
    };
    production: {
        ignoreExpiration: boolean;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    accessToken: {
        secret: string;
        expiresIn: string;
    };
    refreshToken: {
        secret: string;
        expiresIn: string;
    };
    development: {
        ignoreExpiration: boolean;
    };
    production: {
        ignoreExpiration: boolean;
    };
}>;
export default _default;
