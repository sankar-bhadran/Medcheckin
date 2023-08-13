import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-router.js";
import connect from "./config/dbconfig.js";
import errorHandling from "./middleware/errorHandling.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api", userRouter);
app.use(errorHandling);

app.listen(5000, () => {
  connect();
  console.log("Connected to Port 5000");
});
