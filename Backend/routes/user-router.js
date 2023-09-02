import express from "express";
import {
  signup,
  verifyotp,
  sendotp,
  forgotpassword,
  resetpassword,
  logout,
  getuser,
  updateProfile,
  address,
  deleteAddress,
} from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { login } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.post("/sentotp", sendotp);
userRouter.post("/signup", verifyotp, signup);
userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgotpassword);
userRouter.post("/resetpassword", resetpassword);
userRouter.get('/userprofile',verifyToken,getuser)
userRouter.patch('/userprofile',verifyToken,updateProfile)
userRouter.post('/userprofile',verifyToken,address)
userRouter.patch('/deleteaddress',verifyToken,deleteAddress)
userRouter.get("/logout", verifyToken, logout);
export default userRouter;
