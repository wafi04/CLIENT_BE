import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";

@Module({
  controllers: [BookingController],
  providers: [BookingService, JwtService],
})
export class BookingModule {}
