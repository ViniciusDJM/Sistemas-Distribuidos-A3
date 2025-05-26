import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { cacheMiddleware } from '../middlewares/cache';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', cacheMiddleware, userController.findAll);
userRouter.get('/:id', cacheMiddleware, userController.findById);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.patch('/:id', userController.partialUpdate);
userRouter.delete('/:id', userController.delete);

export { userRouter };
