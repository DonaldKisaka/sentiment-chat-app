import { Router } from "express";
import { getUsers, getUser, registerUser, deleteUser  } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
