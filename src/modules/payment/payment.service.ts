import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaymentDto } from "./payment.dto";

@Injectable()
export class PaymentService {
  constructor(private db: PrismaService) {}

  async create(payment: PaymentDto) {
    await this.db.booking.update({
      where: {
        id: payment.bookingId,
      },
      data: {
        status: "CONFIRMED",
      },
    });

    return await this.db.payment.create({
      data: {
        harga: payment.harga,
        metode: payment.metode,
        bookingId: payment.bookingId,
      },
    });
  }
}
