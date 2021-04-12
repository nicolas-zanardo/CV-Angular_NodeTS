import {Request, Response, Router} from "express";
import isLoggedIn from "../../middleware/isLoggedIn";
import {
    emailLinkVerification,
    initResetPassword,
    resetPassword,
    resetPasswordForm
} from "../../controllers/users.controller"


export const user = Router();

// Check user is logged
user.get('/current', isLoggedIn, (req: Request, res: Response) => {
    // @ts-ignore
    res.json(req.user);
});
// verification of user emails
user.get('/email-verification/:userId/:token', emailLinkVerification)
// forgot password
user.post('/forgot-password/', initResetPassword)
// reset password => send email with a link to reset password
user.get('/reset-password/:userID/:token', resetPasswordForm)
user.post('/reset-password/:userID/:token', resetPassword)