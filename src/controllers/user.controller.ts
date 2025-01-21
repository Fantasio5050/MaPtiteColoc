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