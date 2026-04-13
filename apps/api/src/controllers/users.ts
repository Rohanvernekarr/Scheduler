import type { Request, Response } from 'express';
import { userService } from '../services/users.js';
import { CreateUserSchema } from '../schemas/users.js';
import { ZodError } from 'zod';

export class UserController {
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const user = await userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json({ data: user });
    } catch (error) {
      console.error('[UserController.getUser]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const payload = CreateUserSchema.parse(req.body);
      
      const user = await userService.createUser(payload);
      res.status(201).json({ data: user });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[UserController.createUser]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const userController = new UserController();
