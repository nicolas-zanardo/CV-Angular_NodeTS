import {Router, Request, Response} from "express";
import {CallbackError, Error} from "mongoose";
import {User} from "../models/user.model"
import UserInterface from "../interface/UserInterface";
import bcrypt from "bcrypt";
import jwt, {decode, VerifyErrors} from "jsonwebtoken";
import * as fs from "fs";
import {user} from "./user";

export const auth = Router();

const RSA_KEY_PRIVATE = fs.readFileSync('./key/key');
const RSA_KEY_PUBLIC = fs.readFileSync('./key/key.pub');

// Router() => create new User
auth.post('/signup', (req:Request, res:Response) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    });
    newUser.save((err:CallbackError)=> {
        if(err) {res.status(500).json('error_signup')}
        res.status(200).json('user_create')
    });
});

// Router() => create token
auth.post('/signin', (req:Request, res:Response) => {
    User.findOne({'email': req.body.email}).exec((err: CallbackError, user:UserInterface ) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({}, RSA_KEY_PRIVATE, {
                algorithm: "RS256",
                expiresIn: '15s',
                subject: user._id.toString()
            });
            res.status(200).json(token);
        } else {
            res.status(401).json('signin_fail')
        }
    });
});

auth.get('/refresh-token', (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, RSA_KEY_PUBLIC, (err: VerifyErrors | null, decoded: object | undefined) => {
            if (err) {return res.status(403).json('token_wrong')}
            const newToken = jwt.sign({}, RSA_KEY_PRIVATE, {
                algorithm: 'RS256',
                expiresIn: '900s', // 15min
                // @ts-ignore
                subject: decoded.sub
            })
            res.status(200).json(newToken);
        })
    } else {
        res.json(403).json('token_noRefresh');
    }
})
