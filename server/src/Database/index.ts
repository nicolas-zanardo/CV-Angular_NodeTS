// Connection BDD Mongoose
import mongoose from "mongoose";
const env = require(`../environment/${process.env.NODE_ENV}`);

export default mongoose.connect(env.dbUrl,
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
    }).then(() => {
    console.log('Connection DB Ok !');
    console.log(env.status);
    }).catch(err => {
    console.log(err);
    });



