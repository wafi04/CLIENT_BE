import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsDate,
  IsDecimal,
  IsOptional,
} from "class-validator";
import { Type, Transform } from "class-transformer";

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  gedungId: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @Type(() => Number)
  totalHarga: number;

  @IsOptional()
  status?: BookingStatus = BookingStatus.PENDING;
}
