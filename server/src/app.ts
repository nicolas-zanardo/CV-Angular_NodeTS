import express, {Express, Request, Response} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {index} from "./routes";
import email from "./emails/email"
// Database
require("./Database");

const app: Express = express();

new email().getTemplate("email-welcome", {
    to: "contact@nicolas-zanardo.com",
    subject: "Promotion sur touts le shop",
    metaData: {
        name: "Jean"
    }
})

// Tools NodeJS Express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);

// Get All Front Request on a SPA
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = app;
