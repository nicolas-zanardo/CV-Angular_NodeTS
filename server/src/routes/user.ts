import {NextFunction, Request, Response, Router} from "express";
import * as fs from "fs";
import jwt, {VerifyErrors} from 'jsonwebtoken';
import {User} from "../models/user.model";
import UserInterface from "../interface/UserInterface";


export const user = Router();
const RSA_PUBLIC_KEY = fs.readFileSync('./key/key.pub');

function isLoggedIn(req:Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, RSA_PUBLIC_KEY, (err:VerifyErrors | null , decoded: object | undefined ) => {
            if (err) {
                return res.status(401).json('token_invalid')
            }
            // @ts-ignore
            const sub = decoded.sub;
            User.findOne({ '_id': sub }).exec( (err: VerifyErrors, user: UserInterface) => {
                if (err || !user) { res.status(401).json('error') }
                // @ts-ignore
                req.user = user;
                next();
            });
        })
    } else {
        res.status(401).json('token_empty')
    }
}

user.get('/current', isLoggedIn, (req: Request, res: Response) => {
    // @ts-ignore
    res.json(req.user);
});