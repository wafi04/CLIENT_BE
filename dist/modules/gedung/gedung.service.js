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
exports.GedungService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let GedungService = class GedungService {
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        const { alamat, deskripsi, kapasitas, ketersediaan, name, harga } = data;
        const create = await this.db.gedung.create({
            data: {
                alamat,
                harga: parseFloat(harga),
                ketersediaan,
                name,
                kapasitas: parseInt(kapasitas),
                deskripsi,
            },
        });
        return create;
    }
    async getAll() {
        return await this.db.gedung.findMany();
    }
    async getById(id) {
        return await this.db.gedung.findUnique({
            where: { id },
            include: {
                images: true,
            },
        });
    }
    async Edit(id, data) {
        const { alamat, deskripsi, kapasitas, ketersediaan, name, harga } = data;
        const edit = await this.db.gedung.update({
            where: { id },
            data: {
                alamat,
                harga: parseFloat(harga),
                ketersediaan,
                name,
                kapasitas: parseInt(kapasitas),
                deskripsi,
            },
        });
        return edit;
    }
    async getBookedDatesByGedungId(gedungId) {
        const bookedDates = await this.db.booking.findMany({
            where: {
                gedungId: gedungId,
            },
        });
        const occupiedDateRanges = bookedDates.map((booking) => ({
            startDate: booking.startDate,
            endDate: booking.endDate,
        }));
        return occupiedDateRanges;
    }
    async delete(id) {
        return await this.db.gedung.delete({
            where: { id },
        });
    }
    async CreateGedungImages(data) {
        return await this.db.gedungImage.create({
            data: {
                url: data.url,
                gedungId: data.gedungId,
            },
        });
    }
    async getAllGedungWithImages() {
        return await this.db.gedung.findMany({
            include: {
                images: true,
            },
        });
    }
    async getAllGedungImages(gedungId) {
        return await this.db.gedungImage.findMany({
            where: {
                gedungId,
            },
        });
    }
    async deleteGedungImage(id) {
        return await this.db.gedungImage.delete({
            where: { id },
        });
    }
    async getAvailableGedung(inputDate, alamat, daysRange = 1) {
        const currentDate = inputDate || new Date();
        if (daysRange < 1 || daysRange > 30) {
            throw new common_1.BadRequestException("Days range must be between 1 and 30");
        }
        const startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(currentDate);
        endDate.setDate(endDate.getDate() + daysRange);
        endDate.setHours(23, 59, 59, 999);
        const availableGedung = await this.db.gedung.findMany({
            where: {
                ...(alamat ? { alamat: { contains: alamat } } : {}),
                ...(inputDate
                    ? {
                        bookings: {
                            none: {
                                AND: [
                                    {
                                        OR: [{ status: "PENDING" }, { status: "CONFIRMED" }],
                                    },
                                    {
                                        startDate: { lte: endDate },
                                        endDate: { gte: startDate },
                                    },
                                ],
                            },
                        },
                    }
                    : {}),
            },
            include: {
                images: true,
            },
        });
        return {
            availableGedung,
            searchParams: {
                inputDate: currentDate,
                startDate,
                endDate,
                alamat: alamat || "Semua Alamat",
                daysRange,
            },
        };
    }
};
exports.GedungService = GedungService;
exports.GedungService = GedungService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GedungService);
//# sourceMappingURL=gedung.service.js.map