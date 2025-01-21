import { Router } from 'express';
import { registerUser, getUserProfile } from "../controllers/user.controller";
import { loginUser, refreshToken } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", registerUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", loginUser);

// Route pour rafraîchir le token
routes.post("/refresh-token", refreshToken);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", authenticate, getUserProfile);

export default routes;