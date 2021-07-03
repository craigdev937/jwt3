import express from "express";
import { Dash } from "../controllers/dashCon";
import { auth } from "../middleware/auth";

export const dashRt: express.Router = express.Router();
    dashRt.post("/", Dash);




