"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.ApiStatusCode = void 0;
var ApiStatusCode;
(function (ApiStatusCode) {
    ApiStatusCode[ApiStatusCode["SUCCESS"] = 200] = "SUCCESS";
    ApiStatusCode[ApiStatusCode["CREATED"] = 201] = "CREATED";
    ApiStatusCode[ApiStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ApiStatusCode[ApiStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ApiStatusCode[ApiStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ApiStatusCode[ApiStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ApiStatusCode[ApiStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(ApiStatusCode || (exports.ApiStatusCode = ApiStatusCode = {}));
class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=response.dto.js.map