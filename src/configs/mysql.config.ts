import { DataSource } from "typeorm";
import { Utilisateur } from "../models/user.entity";
import { Charge } from "../models/charge.entity";
import { Colocation } from "../models/colocation.entity";
import { HistoriqueAction } from "../models/historique_action.entity";
import { Paiement } from "../models/paiement.entity";
import { UtilisateurColocation } from "../models/utilisateur_colocation.entity";

export const connectMySQLDB = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "maptitecoloc",
  synchronize: true, // Attention : activez uniquement en développement
  logging: false,
  entities: [
    Utilisateur,
    Charge,
    Colocation,
    HistoriqueAction,
    Paiement,
    UtilisateurColocation
  ],
  migrations: ["src/migrations/**/*.ts"], // Scripts de migration
});