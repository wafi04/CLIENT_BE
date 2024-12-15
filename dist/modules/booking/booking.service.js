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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BookingService = class BookingService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger();
    }
    async create(data) {
        const { endDate, gedungId, startDate, totalHarga, userId, status } = data;
        const user = await this.db.user.findFirst({
            where: { id: data.userId },
        });
        if (!user) {
            throw new common_1.BadRequestException("User Not Found");
        }
        const gedung = await this.db.gedung.findUnique({
            where: {
                id: gedungId,
            },
        });
        if (!gedung) {
            throw new common_1.BadRequestException("User Not Found");
        }
        return await this.db.booking.create({
            data: {
                endDate,
                startDate,
                totalHarga,
                gedungId,
                status,
                userId,
            },
        });
    }
    async GetBookingById(id) {
        return await this.db.booking.findUnique({
            where: {
                id,
            },
        });
    }
    async getBookingByUserId(id) {
        return await this.db.booking.findMany({
            where: {
                userId: id,
            },
            include: {
                gedung: {
                    include: {
                        images: true,
                    },
                },
            },
        });
    }
    async updateStatusBooking(bookingId) {
        return await this.db.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: "COMPLETED",
            },
        });
    }
    async deleteBooking(bookingId) {
        await this.db.payment.deleteMany({
            where: { bookingId: bookingId },
        });
        return await this.db.booking.delete({
            where: { id: bookingId },
        });
    }
    async getBookingStatusConfirmed(adminId, role) {
        if (role !== "admin") {
            throw new common_1.BadRequestException("Anda Bukan Admin");
        }
        const admin = await this.db.admin.findUnique({
            where: {
                id: adminId,
            },
        });
        if (!admin) {
            throw new common_1.BadRequestException("Admin Anda tak terdefinisi");
        }
        return await this.db.booking.findMany({
            where: {
                status: {
                    in: ["CONFIRMED", "COMPLETED"],
                },
            },
            include: {
                gedung: {
                    include: {
                        images: true,
                    },
                },
            },
        });
    }
    async getAllBooking() {
        return await this.db.booking.findMany();
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
//# sourceMappingURL=booking.service.js.map