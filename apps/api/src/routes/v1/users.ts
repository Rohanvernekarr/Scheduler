import { Router } from 'express';
import { userController } from '../../controllers/users.js';

const userRouter: Router = Router();

userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.get('/profile/:username', userController.getUserByUsername.bind(userController));
userRouter.post('/', userController.createUser.bind(userController));

export { userRouter };
