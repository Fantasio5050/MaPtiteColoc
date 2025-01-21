import { Utilisateur } from "../models/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { hashPassword } from "../utils/hash.util";

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userToCreate: CreateUserDto): Promise<Utilisateur> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY
    const existingUser = await this.userRepository.findByEmail(userToCreate.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // ON HASH LE MOT DE PASSE
    const password_hash = await hashPassword(userToCreate.mot_de_passe);

    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({ ...userToCreate, mot_de_passe: password_hash });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }
}