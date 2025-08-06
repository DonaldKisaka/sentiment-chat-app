import { Router } from "express";
import { getUsers, getUser, registerUser, deleteUser, getUserByEmail } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.get('/', (req, res, next) => {
    if (req.query.email) {
        return getUserByEmail(req, res, next);
    }
    return getUsers(req, res, next);
});
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
