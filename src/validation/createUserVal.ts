import { check } from "express-validator";

export const createUserVal = [
    check("user_name")
        .not()
        .isEmpty()
        .isLength({min: 4, max: 150}),
    check("user_email")
        .not()
        .isEmpty()
        .isLength({min: 4, max: 150})
        .normalizeEmail(),
    check("user_password")
        .isLength({min: 6})
];

export const loginUserVal = [
    check("user_email")
        .not()
        .isEmpty()
        .isLength({min: 4, max: 150})
        .normalizeEmail(),
    check("user_password")
        .isLength({min: 6})    
];



