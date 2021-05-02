import {NextFunction, Request, Response} from "express";
import {findUserPerEmail, findUserPerId} from "../Database/queries/users.queries";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import Email from "../emails/email";
import bcrypt from "bcrypt";


export const getEmailToken = async(req: Request, res: Response, next: NextFunction) => {
  try {
      const id = req.params.id;
      const user:any = await findUserPerId(id);
      if(user) {
          return res.status(200).json(user.emailToken);
      } else {
          return res.status(404).end();
      }
  }  catch (e) {
      next(e);
  }
};

export const emailLinkVerification = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, token } = req.params;
        const user: any = await findUserPerId(userId);
        if (user && token && (token === user.emailToken)) {
            user.emailVerified = true;
            await user.save();
            res.status(200);
            return res.redirect(`/email-verification/${userId}/${token}`);
        } else {
            return res.status(400).end();
        }
    } catch (e) {
        next(e);
    }
};

export const semEmailVerification = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const emailObj = req.body;
        if(emailObj) {
            const user: any = await findUserPerEmail(emailObj.email);
            await new Email().sendEmailVerification({
                to: user.email,
                subject: "Vérifiez votre email",
                host: req.headers.host,
                metaData: {
                    name: user.name,
                    userId: user._id,
                    token: user.emailToken,
                }})
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (e) {
        next(e);
    }
}

export const initResetPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email} = req.body;
        console.log('BEFORE ', email);
        if (email) {
            console.log('IN ', email);
            const user: any = await findUserPerEmail(email);
            console.log('USER ', user);
            if(user) {
                user.passwordToken = uuidv4();
                user.passwordTokenExpiration = moment().add(2.5, 'hours').toDate();
                await user.save();
               let emailCheck =  await new Email().sendResetPasswordLink({
                    to: email,
                    host: req.headers.host,
                    metaData: {
                        userId: user._id,
                        token: user.passwordToken,
                    }
                })
                console.log(emailCheck)
                return res.status(200).end();
            }
        }
        return res.status(200).end();
    } catch (e) {
        next(e);
    }
};

export const resetPasswordForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID, token } = req.params;
        const user: any = await findUserPerId(userID);
        if (user && user.passwordToken === token) {
            return res.status(200).json(user);
        } else {
            return res.status(400).end();
        }
    } catch (e) {
        next(e);
    }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID, token } = req.params;
        const { password } = req.body;
        const user: any = await findUserPerId(userID);
        if (password &&
            user &&
            user.passwordToken === token &&
            moment() < moment(user.passwordTokenExpiration)
        ) {
            user.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            user.passwordToken = null;
            user.passwordTokenExpiration = null;
            await user.save()
            return  res.status(200).end();
        } else if (!user.passwordToken) {
            return res.status(401).end();
        } else {
            return res.status(400).end();
        }
    } catch (e) {
        next(e);
    }
}