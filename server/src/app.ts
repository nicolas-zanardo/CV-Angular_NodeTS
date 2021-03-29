import express, {Express, Request, Response} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import {index} from "./routes";

const app: Express = express();
const env = require(`./environment/${process.env.NODE_ENV}`);

// Tools NodeJS Express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connection BDD Mongoose
mongoose.connect(env.dbUrl,
    {
        // ⚠ https://mongoosejs.com/docs/deprecations.html
        // There are several deprecations in the MongoDB Node.js
        // driver that Mongoose users should be aware of.
        // Mongoose provides options to work around these deprecation
        // warnings, but you need to test whether these options cause
        // any problems for your application.
        // Please report any issues on GitHub.
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // ⚠ https://mongoosejs.com/docs/connections.html#keepAlive
        // For long running applications, it is often prudent to enable
        // keepAlive with a number of milliseconds. Without it, after some
        // period of time you may start to see "connection closed" errors
        // for what seems like no reason. If so, after reading this,
        // you may decide to enable keepAlive:
        keepAlive: true,
        keepAliveInitialDelay: 300000
    }, (err: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connection DB Ok !');
            console.log(env.status);
        }
    }
);

app.use(index);

// Get All Front Request on a SPA
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = app;
