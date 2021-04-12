import {Router, Request, Response} from "express";
import {CallbackError} from "mongoose";
import {User} from "../../Database/models/user.model"
import UserInterface from "../../interface/UserInterface";
import bcrypt from "bcrypt";
import jwt, {VerifyErrors} from "jsonwebtoken";
import * as fs from "fs";
import Email from "../../emails/email";
import { v4 as uuidv4 } from 'uuid';

export const auth = Router();

const RSA_KEY_PRIVATE = fs.readFileSync('./key/key');
const RSA_KEY_PUBLIC = fs.readFileSync('./key/key.pub');

// Router() => create new User
auth.post('/signup', (req:Request, res:Response) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        emailToken: uuidv4() ,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        role: ['ROLE_USER'],
        emailVerified: false
    });
    newUser.save((err:CallbackError)=> {
        console.log(err)
        if(err) { return res.status(406).json("l'email existe déjà") };
        return res.status(200).json('user_create')
    });
    new Email().sendEmailVerification({
        to: newUser.email,
        subject: "Vérifiez votre email",
        host: req.headers.host,
        metaData: {
            name: newUser.name,
            userId: newUser._id,
            token: newUser.emailToken,
        }});
});

// Router() => create token
auth.post('/signin', (req:Request, res:Response) => {
    User.findOne({'email': req.body.email}).exec((err: CallbackError, user:UserInterface ) => {
        if (user && bcrypt.compareSync(req.body.password, user.password) && user.emailVerified) {
            const token = jwt.sign({
                role: user.role,
                name: user.name,
                email: user.email
            }, RSA_KEY_PRIVATE, {
                algorithm: "RS256",
                expiresIn: '900s', // 15min
                subject: user._id.toString()
            });
            res.status(200).json(token);
        } else if (!user.emailVerified) {
            res.status(400).json('valider votre email')
        } else {
            res.status(401).json('signin_fail')
        }
    });
});

// Refresh Token
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
