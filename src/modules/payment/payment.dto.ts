import { IsEnum, IsNumber, IsString } from "class-validator";

export enum METODE {
  CASH = "CASH",
  QRIS = "QRIS",
  TRANSFER = "TRANSFER",
}

export class PaymentDto {
  @IsString()
  bookingId: string;

  @IsNumber()
  harga: number;

  @IsEnum(METODE)
  metode: METODE;
}
