import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/presenters";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userToCreateDTO = plainToInstance(CreateUserDto, req.body, { excludeExtraneousValues: true });
    const dtoErrors = await validate(userToCreateDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const user = await userService.registerUser(userToCreateDTO);
    const createdUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(201).json(createdUser);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.user!.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userProfile = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};