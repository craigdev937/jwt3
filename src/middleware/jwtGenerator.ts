import jwt from "jsonwebtoken";
import { config } from "../config/keys";

export const jwtGenerator = (user_id: string) => {
    const payload = {
        user: {
            id: user_id
        }
    };

    return jwt.sign(
        payload, config.JWT_STRATEGY,
        { expiresIn: "1h" }
    )
};




