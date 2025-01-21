import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { Utilisateur } from "../models/user.entity";

export class AuthService {
  private userRepository = new UserRepository();

  async validateUser(email: string, password: string): Promise<Utilisateur | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.mot_de_passe)) {
      return user;
    }
    return null;
  }

  generateAccessToken(user: Utilisateur): string {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }

  generateRefreshToken(user: Utilisateur): string {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  }
}