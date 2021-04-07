import {NextFunction, Request, Response} from "express";
import jwt, {VerifyErrors} from "jsonwebtoken";
import {User} from "../Database/models/user.model";
import UserInterface from "../interface/UserInterface";
import fs from "fs";

const RSA_PUBLIC_KEY = fs.readFileSync('./key/key.pub');

/**
 * isLoggedIn
 * -----------
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @return User | Status 401
 */
export default function isLoggedIn(req:Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, RSA_PUBLIC_KEY, (err:VerifyErrors | null , decoded: object | undefined ) => {
            if (err) {
                return res.status(401).json('token_invalid')
            }
            // @ts-ignore
            const sub = decoded.sub;
            return User.findOne({ '_id': sub }).exec( (err: VerifyErrors, user: UserInterface) => {
                if (err || !user) { res.status(401).json('error') }
                // @ts-ignore
                req.user = user;
                next();
            });
        })
    } else {
        return res.status(401).json('token_empty')
    }
}