import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { config } from "../config/keys";

export const auth: RequestHandler = (req: any, res, next) => {
    const token = req.handler("jwt_token");
    if (!token) return res.status(403)
        .json({msg: "Auth denied!"});
    
    try {
        const verify: any = jwt.verify(token, config.JWT_STRATEGY);
        req.user = verify.user;
        next();
    } catch (error) {
        res.status(401).json({msg: "Token is not valid!"});
    }
};





