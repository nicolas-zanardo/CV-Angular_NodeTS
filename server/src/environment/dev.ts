import path from 'path';
import nodemailer from "nodemailer";

module.exports = {
    dbUrl: 'mongodb+srv://nzcv-nodangts:Du99ScpGqljY6l2bV815aU8952Ceaq15Vrz@nicolas-zanardo.goth2.mongodb.net/nicolas-zanardo-private-3233974?authSource=admin&replicaSet=atlas-s68vfa-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    port: 3000,
    cert: path.join( __dirname, '/mnt/c/Users/niko/.localhost-ssl/nicolas-zanardo.local.crt'),
    key: path.join( __dirname, '/mnt/c/Users/niko/.localhost-ssl/nicolas-zanardo.local.key'),
    status: 'development',
    email: nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9088ba2d161ecf",
            pass: "915a8148319467"
        }
    }),
    from: "nicolas-zanardo.com <no-replay@nicolas-zanardo.com>"
}