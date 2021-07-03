import express from "express";
import { Index } from "../controllers/userCon";

export const userRt: express.Router = express.Router();
    userRt.get("/", Index);





