import express from "express";
import { createUserVal, loginUserVal } from "../validation/createUserVal";
import { LoginUser, RegisterUser, VerifyUser } from "../controllers/userCon";
import { auth } from "../middleware/auth";

export const userRt: express.Router = express.Router();
    userRt.post("/register", createUserVal, RegisterUser);
    userRt.post("/login", loginUserVal, LoginUser);
    userRt.post("/verify", auth, VerifyUser);





