import { Repository } from "typeorm";
import { Utilisateur } from "../models/user.entity";
import { connectMySQLDB } from "../configs/mysql.config";
import { CreateUserDto } from "../dtos/create-user.dto";
import { userToCreateInput } from "../types/Inputs";

export class UserRepository {
  private userDB: Repository<Utilisateur>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(Utilisateur);
  }

  create(user: userToCreateInput): Utilisateur {
    const newUser = this.userDB.create(user);
    return newUser;
  }

  async save(user: Utilisateur): Promise<Utilisateur> {
    return this.userDB.save(user);
  }

  async findByEmail(email: string): Promise<Utilisateur | null> {
    return this.userDB.findOne({ where: { email } });
  }
}