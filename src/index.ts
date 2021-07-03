import express from "express";
import "dotenv/config";
import helmet from "helmet";
import logger from "morgan";
import { trim } from "./middleware/trim";
import { userRt } from "./routes/userRt";
import { dashRt } from "./routes/dashRt";
import { todoRt } from "./routes/todoRt";

(async () => {
    const app: express.Application = express();
    app.use(helmet());

    // CORS Setup
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            return res.status(200).json({"status message": "OK"});
        };
        next();
    });

    // Middleware
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(logger("dev"));
    app.use(trim);

    // Routes and Port
    app.use("/api", userRt);
    app.use("/api/dash", dashRt);
    app.use("/api/todo", todoRt);
    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exti.");
    })
})();




