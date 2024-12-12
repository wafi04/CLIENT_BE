import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGedungDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  deskripsi: string;

  @IsString()
  harga: string;

  @IsString()
  alamat: string;

  @IsString()
  kapasitas: string;

  @IsString()
  ketersediaan: string;
}

export class GedungImages {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  gedungId: string;
}
