"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
const jwt_config_1 = require("./config/jwt.config");
const reponse_interceptor_1 = require("./common/interceptor/reponse.interceptor");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const auth_guard_1 = require("./modules/auth/guards/auth.guard");
const gedung_module_1 = require("./modules/gedung/gedung.module");
const booking_module_1 = require("./modules/booking/booking.module");
const payment_module_1 = require("./modules/payment/payment.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: "auth/login", method: common_1.RequestMethod.POST }, { path: "auth/register", method: common_1.RequestMethod.POST }, { path: "auth/refresh", method: common_1.RequestMethod.POST })
            .forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [jwt_config_1.default],
                cache: true,
            }),
            payment_module_1.PaymentModule,
            auth_module_1.AuthModule,
            gedung_module_1.GedungModule,
            prisma_module_1.PrismaModule,
            booking_module_1.BookingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: reponse_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map