import {Router, Request, Response} from "express";
import {CallbackError} from "mongoose";
import {User} from "../../Database/models/user.model"
import bcrypt from "bcrypt";
import jwt, {VerifyErrors} from "jsonwebtoken";
import jwt_decode, {JwtDecodeOptions} from "jwt-decode";
import * as fs from "fs";
import Email from "../../emails/email";
import { v4 as uuidv4 } from 'uuid';

export const auth = Router();

const RSA_KEY_PRIVATE = fs.readFileSync('./key/key');
const RSA_KEY_PUBLIC = fs.readFileSync('./key/key.pub');

// Router() => create new User
auth.post('/signup', (req:Request, res:Response) => {
    const newUser: any = new User({
        email: req.body.email,
        company: req.body.company,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        emailToken: uuidv4() ,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        role: ['ROLE_USER'],
        emailVerified: false
    });
    newUser.save((err:CallbackError)=> {
        console.log(err)
        if(err) {
            return res.status(400).end();
        }
        return res.status(201).end();
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
    try {
        User.findOne({'email': req.body.email}).exec(( err: CallbackError , user: any) => {
            if (user && bcrypt.compareSync(req.body.password, user.password) && user.emailVerified) {
                const token = jwt.sign({
                    role: user.role,
                    email: user.email
                }, RSA_KEY_PRIVATE, {
                    algorithm: "RS256",
                    expiresIn: '900s', // 15min
                    subject: user._id.toString()
                });
                return res.status(200).json(token);
            } else if (user && bcrypt.compareSync(req.body.password, user.password) && !user.emailVerified) {
                return res.status(423).end();
            } else {
                return res.status(401).end();
            }
        });
    } catch (e) {
        throw new Error(`ERROR MESSAGE: ${e.message}`);
    }

});

// Refresh Token
auth.get('/refresh-token', (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
        let decoded: any = jwt_decode(token);
        jwt.verify(token, RSA_KEY_PUBLIC, (err: VerifyErrors | null, decode: any) => {
            if (err) {return res.status(403).end()}
            const newToken = jwt.sign({
                role: decoded.role,
                email: decoded.email
            }, RSA_KEY_PRIVATE, {
                algorithm: 'RS256',
                expiresIn: '900s', // 15min
                subject: decode.sub,
            })
            return res.status(200).json(newToken);
        })
    } else {
        return res.json(403).end();
    }
})
