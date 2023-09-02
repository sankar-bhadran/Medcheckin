import express from "express";
import {
  addCategory,
  adminlogin,
  approval,
  availableCategory,
  getCenterDetails,
  getSub,
  logout,
  ownerAccess,
  ownerList,
  userAccess,
  userList,
  viewCategory,
} from "../controllers/admin-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const adminRouter = express.Router();
adminRouter.post("/adminlogin", adminlogin);
adminRouter.post("/admincategories", verifyToken, addCategory);
adminRouter.get("/admincategories", verifyToken, viewCategory);
adminRouter.patch("/admincategories", verifyToken, availableCategory);
adminRouter.get("/userdetails", verifyToken, userList);
adminRouter.patch("/blockuser", verifyToken, userAccess);
adminRouter.get("/getowner", verifyToken, ownerList);
adminRouter.patch("/blockowner", verifyToken, ownerAccess);
adminRouter.get('/viewdetails/:centerid',verifyToken,getCenterDetails)
adminRouter.get('/getCategory/:categoryid',verifyToken,getSub)
adminRouter.patch('/centerapprove',verifyToken,approval);
adminRouter.get("/adminpanel", verifyToken, logout);

export default adminRouter;
