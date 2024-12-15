import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookingDto } from "./Dto/booking.dto";

@Injectable()
export class BookingService {
  private logger = new Logger();
  constructor(private readonly db: PrismaService) {}

  async create(data: CreateBookingDto) {
    const { endDate, gedungId, startDate, totalHarga, userId, status } = data;
    const user = await this.db.user.findFirst({
      where: { id: data.userId },
    });

    if (!user) {
      throw new BadRequestException("User Not Found");
    }

    const gedung = await this.db.gedung.findUnique({
      where: {
        id: gedungId,
      },
    });

    if (!gedung) {
      throw new BadRequestException("User Not Found");
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
  async GetBookingById(id: string) {
    return await this.db.booking.findUnique({
      where: {
        id,
      },
    });
  }

  async getBookingByUserId(id: number) {
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

  async updateStatusBooking(bookingId: string) {
    return await this.db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "COMPLETED",
      },
    });
  }
  async deleteBooking(bookingId: string) {
    await this.db.payment.deleteMany({
      where: { bookingId: bookingId },
    });

    return await this.db.booking.delete({
      where: { id: bookingId },
    });
  }

  async getBookingStatusConfirmed(adminId: number, role: "admin" | "user") {
    if (role !== "admin") {
      throw new BadRequestException("Anda Bukan Admin");
    }

    const admin = await this.db.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin) {
      throw new BadRequestException("Admin Anda tak terdefinisi");
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
}
