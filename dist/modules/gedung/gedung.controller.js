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
exports.GedungController = void 0;
const common_1 = require("@nestjs/common");
const create_gedung_dto_1 = require("./dto/create.gedung.dto");
const gedung_service_1 = require("./gedung.service");
let GedungController = class GedungController {
    constructor(gedungService) {
        this.gedungService = gedungService;
        this.logger = new common_1.Logger();
    }
    async create(data) {
        return await this.gedungService.create(data);
    }
    async getAll() {
        return await this.gedungService.getAll();
    }
    async GetGedungById(id) {
        return this.gedungService.getById(id);
    }
    async GetGedungBooked(id) {
        return this.gedungService.getBookedDatesByGedungId(id);
    }
    async GetAvailable(alamat, dateString, rangeDays) {
        const date = dateString ? new Date(dateString) : new Date();
        const range = rangeDays ? parseInt(rangeDays, 10) : 1;
        if (isNaN(date.getTime())) {
            throw new common_1.BadRequestException("Invalid date format");
        }
        this.logger.log(dateString);
        return this.gedungService.getAvailableGedung(date, alamat, range);
    }
    async getallWithImages() {
        return await this.gedungService.getAllGedungWithImages();
    }
    async edit(id, data) {
        this.logger.log(id);
        return await this.gedungService.Edit(id, data);
    }
    async delete(id) {
        return await this.gedungService.delete(id);
    }
    async createImage(data) {
        return await this.gedungService.CreateGedungImages(data);
    }
    async getImages(id) {
        return await this.gedungService.getAllGedungImages(id);
    }
    async deleteImages(id) {
        return await this.gedungService.deleteGedungImage(id);
    }
};
exports.GedungController = GedungController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gedung_dto_1.CreateGedungDto]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/gedungs/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "GetGedungById", null);
__decorate([
    (0, common_1.Get)("/booked/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "GetGedungBooked", null);
__decorate([
    (0, common_1.Get)("/available"),
    __param(0, (0, common_1.Query)("alamat")),
    __param(1, (0, common_1.Query)("date")),
    __param(2, (0, common_1.Query)("range")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "GetAvailable", null);
__decorate([
    (0, common_1.Get)("/image"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "getallWithImages", null);
__decorate([
    (0, common_1.Put)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_gedung_dto_1.CreateGedungDto]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("/image"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gedung_dto_1.GedungImages]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "createImage", null);
__decorate([
    (0, common_1.Get)("/images/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "getImages", null);
__decorate([
    (0, common_1.Delete)("/image/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GedungController.prototype, "deleteImages", null);
exports.GedungController = GedungController = __decorate([
    (0, common_1.Controller)("gedung"),
    __metadata("design:paramtypes", [gedung_service_1.GedungService])
], GedungController);
//# sourceMappingURL=gedung.controller.js.map