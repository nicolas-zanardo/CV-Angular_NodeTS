import {Request, Response, Router} from "express";
import isLoggedIn from "../../middleware/isLoggedIn";
import {
    emailLinkVerification, getEmailToken,
    initResetPassword,
    resetPassword,
    resetPasswordForm,
    semEmailVerification
} from "../../controllers/users.controller"


export const user = Router();

// Check user is logged
user.get('/current', isLoggedIn, (req: Request, res: Response) => {
    // @ts-ignore
    res.json(req.user);
});
user.post('/send-email-verification', semEmailVerification);
// verification of user emails
user.get('/email-verification/:userId/:token', emailLinkVerification);
// forgot password
user.post('/forgot-password/', initResetPassword);
// reset password 1 step => send email with a link to reset password
user.get('/reset-password/:userID/:token', resetPasswordForm);
// rest password 2 step => user change password
user.post('/reset-password/:userID/:token', resetPassword);
// find the user's email token
user.get('/get-token-email/:id', getEmailToken);