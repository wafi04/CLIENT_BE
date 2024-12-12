import { IsString } from "class-validator";

export class GedungImages {
  @IsString()
  url: string;

  @IsString()
  id: string;
}
