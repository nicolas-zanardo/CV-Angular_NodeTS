import {NextFunction, Request, Response} from "express";
import {findUserPerEmail, findUserPerId} from "../Database/queries/users.queries";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import Email from "../emails/email";
import UserInterface from "../interface/UserInterface";
import bcrypt from "bcrypt";

export const emailLinkVerification = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, token } = req.params;
        const user = await findUserPerId(userId);
        console.log(user);
        if (user && token && (token === user.emailToken)) {
            user.emailVerified = true;
            await user.save();
            return res.redirect("/");
        } else {
            return res.status(400).json('Problem during email verification');
        }
    } catch (e) {
        next(e);
    }
};

export const initResetPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email} = req.body;
        if (email) {
            const user = await findUserPerEmail(email);
            if(user) {
                user.passwordToken = uuidv4();
                user.passwordTokenExpiration = moment().add(2.5, 'hours').toDate();
                await user.save();
                await new Email().sendResetPasswordLink({
                    to: email,
                    host: req.headers.host,
                    metaData: {
                        userId: user._id,
                        token: user.passwordToken,
                    }
                })
                return res.status(200).end();
            }
        }
        return res.status(400).json('Utilisateur inconnu')
    } catch (e) {
        next(e);
    }
};

export const resetPasswordForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, token } = req.params;
        const user: UserInterface = await findUserPerId(userId);
        if (user && user.passwordToken === token) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json(`l'utilisateur n'existe pas`)
        }
    } catch (e) {
        next(e);
    }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID, token } = req.params;
        const { password } = req.body;
        const user = await findUserPerId(userID);
        if (password &&
            user &&
            user.passwordToken === token &&
            moment() < moment(user.passwordTokenExpiration)
        ) {
            user.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            user.passwordToken = null;
            user.passwordTokenExpiration = null;
            await user.save()
        } else {
            return res.status(400).json(`L'utilisateur n'existe pas`)
        }
    } catch (e) {
        next(e);
    }
}