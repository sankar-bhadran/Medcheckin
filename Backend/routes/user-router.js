import express from "express";
import { signup, verifyotp,sendotp } from "../controllers/user-controller.js";
import {login} from '../controllers/user-controller.js'

const userRouter = express.Router();

userRouter.post("/sentotp",sendotp)
userRouter.post('/signup',verifyotp,signup)
userRouter.post("/login",login)

export default userRouter;
