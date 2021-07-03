import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { jwtGenerator } from "../middleware/jwtGenerator";
import { pool } from "../config/database";

export const RegisterUser: RequestHandler =
async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const checkIdQuery = `
            SELECT * FROM users 
            WHERE user_email = $1`;
        const IdValues = [email];
        const user = await pool.query(checkIdQuery, IdValues);
        if (user.rows.length > 0) {
            return res.status(401).json("User already exists!");
        };
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const createUserQuery = `
            INSERT INTO users 
            (user_name, user_email, user_password)
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const userValue = [name, email, bcryptPassword];
        const newUser = await pool.query(createUserQuery, userValue);
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ jwtToken });
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const LoginUser: RequestHandler =
async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const loginUserQuery = `
            SELECT * FROM users 
            WHERE user_email = $1`;
        const loginValue = [email];
        const user = await pool.query(loginUserQuery, loginValue);
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credentials");
        };
        const validPassword = await bcrypt.compare(
            password, user.rows[0].user_password
        );
        if (!validPassword) {
            return res.status(401).json("Invalid Credentails");            
        };
        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const VerifyUser: RequestHandler =
async (req, res, next) => {
    try {
        res.json(true);
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};





