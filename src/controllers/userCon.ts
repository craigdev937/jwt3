import { RequestHandler } from "express";

export const Index: RequestHandler =
(req, res) => {
    res.json({ home: "PERN and React!" });
};



