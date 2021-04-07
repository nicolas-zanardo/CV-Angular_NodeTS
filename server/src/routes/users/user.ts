import {Request, Response, Router} from "express";
import isLoggedIn from "../../middleware/isLoggedIn";


export const user = Router();


user.get('/current', isLoggedIn, (req: Request, res: Response) => {
    // @ts-ignore
    res.json(req.user);
});