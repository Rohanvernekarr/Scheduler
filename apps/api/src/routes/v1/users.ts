import { Router } from 'express';
import { userController } from '../../controllers/users.js';

const userRouter: Router = Router();

userRouter.get('/:id', userController.getUser.bind(userController));
userRouter.post('/', userController.createUser.bind(userController));

export { userRouter };
