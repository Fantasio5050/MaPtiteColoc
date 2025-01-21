import { Expose } from "class-transformer";
import { IsString, IsEmail, IsInt, Min } from "class-validator";

export class CreateUserDto {
  @Expose()
  @IsString()
  prenom: string;

  @Expose()
  @IsString()
  nom: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  mot_de_passe: string;

  @Expose()
  @IsInt()
  @Min(18)
  age: number;
}