import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Utilisateur } from "../models/user.entity";

export class UserPresenter {
  @Expose()
  @IsNumber()
  id: Utilisateur['id'];

  @Expose()
  @IsString()
  firstname: Utilisateur['prenom'];

  // à vous de jouer
  lastname: string;
  email: string;
  isActive: boolean;
}