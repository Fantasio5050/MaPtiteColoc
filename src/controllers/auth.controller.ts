import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, mot_de_passe } = req.body;
    const user = await authService.validateUser(email, mot_de_passe);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Authorization header is required" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token is required" });
      return;
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Invalid refresh token" });
        return;
      }

      const user = { userId: decoded.userId, email: decoded.email };
      const newAccessToken = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });
      const newRefreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

      res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};