import { RequestHandler } from "express";
import { pool } from "../config/database";

export const Dash: RequestHandler =
async (req: any, res, next) => {
    try {
        const id = await req.params.id
        const dashQuery = `
            SELECT user_name 
            FROM users 
            WHERE user_id = $1
        `;
        const values = [req.username.id];
        const findUser = await pool.query(dashQuery, values);
        res.json(findUser.rows[0]);
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};




