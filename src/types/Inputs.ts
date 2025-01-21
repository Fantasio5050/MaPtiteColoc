import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { Utilisateur } from "../models/user.entity";

export class userToCreateInput {
  @Expose()
  @IsString()
  prenom: Utilisateur['prenom'];

  // à vous de jouer
  nom: string;
  email: string;

  @Expose()
  @IsString()
  mot_de_passe: Utilisateur['mot_de_passe'];
}