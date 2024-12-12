import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGedungDto, GedungImages } from "./dto/create.gedung.dto";

@Injectable()
export class GedungService {
  constructor(private db: PrismaService) {}

  async create(data: CreateGedungDto) {
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

  async getById(id: string) {
    return await this.db.gedung.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
  }

  async Edit(id: string, data: CreateGedungDto) {
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

  async getBookedDatesByGedungId(gedungId: string) {
    const bookedDates = await this.db.booking.findMany({
      where: {
        gedungId: gedungId,
        // Opsional: filter hanya booking yang sudah dikonfirmasi atau selesai
      },
    });

    // Transform menjadi array tanggal yang sudah dibooking
    const occupiedDateRanges = bookedDates.map((booking) => ({
      startDate: booking.startDate,
      endDate: booking.endDate,
    }));

    return occupiedDateRanges;
  }

  async delete(id: string) {
    return await this.db.gedung.delete({
      where: { id },
    });
  }

  async CreateGedungImages(data: GedungImages) {
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

  async getAllGedungImages(gedungId: string) {
    return await this.db.gedungImage.findMany({
      where: {
        gedungId,
      },
    });
  }

  async deleteGedungImage(id: string) {
    return await this.db.gedungImage.delete({
      where: { id },
    });
  }
  async getAvailableGedung(
    inputDate?: Date,
    alamat?: string,
    daysRange: number = 1
  ) {
    const currentDate = inputDate || new Date();
    if (daysRange < 1 || daysRange > 30) {
      throw new BadRequestException("Days range must be between 1 and 30");
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
}
