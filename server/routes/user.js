import { Router } from "express";
import { getUsers, getUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

export default userRouter;
