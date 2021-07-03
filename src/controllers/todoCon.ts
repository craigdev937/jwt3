import { RequestHandler } from "express";
import { pool } from "../config/database";

export const CreateTodo: RequestHandler =
async (req, res, next) => {
    try {
        const { description } = req.body;
        const createQuery = `INSERT INTO todos 
        (description) VALUES ($1) RETURNING *`;
        const values = [description];
        const newTodo = await pool.query(createQuery, values);
        res.json(newTodo.rows[0]);
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const FetchAllTodos: RequestHandler =
async (req, res, next) => {
    try {
        const fetchAllQuery = "SELECT * FROM todos";
        const allTodos = await pool.query(fetchAllQuery);
        res.json(allTodos.rows);
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};





