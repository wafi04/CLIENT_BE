import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { validate } from "class-validator";
import { AuthenticatedRequest } from "src/common/interfaces/user";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./Dto/booking.dto";

@Controller("Booking")
export class BookingController {
  private logger = new Logger();
  constructor(private readonly BookingService: BookingService) {}

  @Post()
  async Create(
    @Body()
    data: CreateBookingDto,
    @Req() request: AuthenticatedRequest
  ) {
    try {
      const bookingDataWithUserId = {
        ...data,
        userId: request.user.sub || data.userId,
      };

      const errors = await validate(bookingDataWithUserId);
      if (errors.length > 0) {
        this.logger.error("Validation errors", errors);
        throw new BadRequestException(
          errors.map((err) => Object.values(err.constraints)).flat()
        );
      }

      const result = await this.BookingService.create(bookingDataWithUserId);

      return result;
    } catch (error) {
      this.logger.error("Booking creation error", error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: "Failed to create booking",
        error: error.message,
      });
    }
  }

  @Get("/booking/:id")
  async GetById(@Param("id") id: string) {
    return this.BookingService.GetBookingById(id);
  }
  @Get()
  async GetAll() {
    return this.BookingService.getAllBooking();
  }

  @Get("/confirmed")
  async getBookingStatusConfirmed(@Req() request: AuthenticatedRequest) {
    return await this.BookingService.getBookingStatusConfirmed(
      request.user.sub,
      request.user.role
    );
  }

  @Patch("/status/:id")
  async updateStatus(@Param("id") id: string) {
    return this.BookingService.updateStatusBooking(id);
  }

  @Delete("/:id")
  async Delete(@Param("id") id: string) {
    return this.BookingService.deleteBooking(id);
  }

  @Get("/user/:id")
  async GetBookingByUser(
    @Req() request: AuthenticatedRequest,
    @Param("id") id: string
  ) {
    const userId = request.user.sub || parseInt(id);
    return this.BookingService.getBookingByUserId(userId);
  }
}
