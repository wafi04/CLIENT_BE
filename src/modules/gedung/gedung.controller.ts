import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateGedungDto, GedungImages } from "./dto/create.gedung.dto";
import { GedungService } from "./gedung.service";

@Controller("gedung")
export class GedungController {
  private logger = new Logger();
  constructor(private readonly gedungService: GedungService) {}

  @Post()
  async create(@Body() data: CreateGedungDto) {
    return await this.gedungService.create(data);
  }

  @Get()
  async getAll() {
    return await this.gedungService.getAll();
  }

  @Get("/gedungs/:id")
  async GetGedungById(@Param("id") id: string) {
    return this.gedungService.getById(id);
  }
  @Get("/booked/:id")
  async GetGedungBooked(@Param("id") id: string) {
    return this.gedungService.getBookedDatesByGedungId(id);
  }

  @Get("/available")
  async GetAvailable(
    @Query("alamat") alamat?: string,
    @Query("date") dateString?: string,
    @Query("range") rangeDays?: string
  ) {
    const date = dateString ? new Date(dateString) : new Date();

    const range = rangeDays ? parseInt(rangeDays, 10) : 1;

    // Validasi tanggal
    if (isNaN(date.getTime())) {
      throw new BadRequestException("Invalid date format");
    }

    this.logger.log(dateString);

    return this.gedungService.getAvailableGedung(date, alamat, range);
  }
  @Get("/image")
  async getallWithImages() {
    return await this.gedungService.getAllGedungWithImages();
  }
  @Put("/:id")
  async edit(@Param("id") id: string, @Body() data: CreateGedungDto) {
    this.logger.log(id);
    return await this.gedungService.Edit(id, data);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await this.gedungService.delete(id);
  }

  @Post("/image")
  async createImage(@Body() data: GedungImages) {
    return await this.gedungService.CreateGedungImages(data);
  }
  @Get("/images/:id")
  async getImages(@Param("id") id: string) {
    return await this.gedungService.getAllGedungImages(id);
  }
  @Delete("/image/:id")
  async deleteImages(@Param("id") id: string) {
    return await this.gedungService.deleteGedungImage(id);
  }
}
