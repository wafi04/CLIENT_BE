"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const response_dto_1 = require("../dto/response.dto");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => {
            const response = context.switchToHttp().getResponse();
            const statusCode = response.statusCode;
            let message = this.getMessageByStatusCode(statusCode);
            return new response_dto_1.ApiResponse(statusCode, message, data);
        }));
    }
    getMessageByStatusCode(statusCode) {
        switch (statusCode) {
            case common_1.HttpStatus.OK:
                return 'Request processed successfully';
            case common_1.HttpStatus.CREATED:
                return 'Resource created successfully';
            case common_1.HttpStatus.ACCEPTED:
                return 'Request accepted for processing';
            case common_1.HttpStatus.BAD_REQUEST:
                return 'Bad Request: Invalid input or parameters';
            case common_1.HttpStatus.UNAUTHORIZED:
                return 'Unauthorized: Authentication required';
            case common_1.HttpStatus.FORBIDDEN:
                return 'Forbidden: You do not have permission';
            case common_1.HttpStatus.NOT_FOUND:
                return 'Not Found: Resource does not exist';
            case common_1.HttpStatus.CONFLICT:
                return 'Conflict: Resource already exists';
            case common_1.HttpStatus.INTERNAL_SERVER_ERROR:
                return 'Internal Server Error: Something went wrong';
            case common_1.HttpStatus.BAD_GATEWAY:
                return 'Bad Gateway: Invalid response from upstream server';
            case common_1.HttpStatus.SERVICE_UNAVAILABLE:
                return 'Service Unavailable: Server is temporarily unable to handle the request';
            case 200:
                return 'Resource updated successfully';
            case 204:
                return 'Resource successfully modified';
            default:
                return 'Request processed';
        }
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=reponse.interceptor.js.map