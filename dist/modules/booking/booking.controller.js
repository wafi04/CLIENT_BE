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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const booking_service_1 = require("./booking.service");
const booking_dto_1 = require("./Dto/booking.dto");
let BookingController = class BookingController {
    constructor(BookingService) {
        this.BookingService = BookingService;
        this.logger = new common_1.Logger();
    }
    async Create(data, request) {
        try {
            const bookingDataWithUserId = {
                ...data,
                userId: request.user.sub || data.userId,
            };
            const errors = await (0, class_validator_1.validate)(bookingDataWithUserId);
            if (errors.length > 0) {
                this.logger.error("Validation errors", errors);
                throw new common_1.BadRequestException(errors.map((err) => Object.values(err.constraints)).flat());
            }
            const result = await this.BookingService.create(bookingDataWithUserId);
            return result;
        }
        catch (error) {
            this.logger.error("Booking creation error", error.stack);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException({
                message: "Failed to create booking",
                error: error.message,
            });
        }
    }
    async GetById(id) {
        return this.BookingService.GetBookingById(id);
    }
    async GetAll() {
        return this.BookingService.getAllBooking();
    }
    async getBookingStatusConfirmed(request) {
        return await this.BookingService.getBookingStatusConfirmed(request.user.sub, request.user.role);
    }
    async updateStatus(id) {
        return this.BookingService.updateStatusBooking(id);
    }
    async Delete(id) {
        return this.BookingService.deleteBooking(id);
    }
    async GetBookingByUser(request, id) {
        const userId = request.user.sub || parseInt(id);
        return this.BookingService.getBookingByUserId(userId);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "Create", null);
__decorate([
    (0, common_1.Get)("/booking/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "GetById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "GetAll", null);
__decorate([
    (0, common_1.Get)("/confirmed"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingStatusConfirmed", null);
__decorate([
    (0, common_1.Patch)("/status/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "Delete", null);
__decorate([
    (0, common_1.Get)("/user/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "GetBookingByUser", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)("Booking"),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map