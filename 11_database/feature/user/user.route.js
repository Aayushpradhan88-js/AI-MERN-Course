import express from 'express';
import {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
} from './user.controller.js';

const userRouter = express.Router();

// User routes
userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
// userRouter.delete('/:id', deleteUser);

export default userRouter;
