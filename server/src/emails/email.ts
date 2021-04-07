import nodemailer from "nodemailer";
import fs from "fs";
import EmailInterface from "../interface/EmailInterface";
import pug from 'pug';
const sparkPostTransport = require("nodemailer-sparkpost-transport")
const EMAIL_KEY = fs.readFileSync('./key/mail.key');

export default  class Email {

    private prodTransporter;
    private devTransporteur;

    constructor() {
        this.prodTransporter = nodemailer.createTransport(sparkPostTransport({
            sparkPostApiKey: `${EMAIL_KEY}`,
            endpoint: "https://api.sparkpost.com"
        }))
        this.devTransporteur = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9088ba2d161ecf",
                pass: "915a8148319467"
            }
        });
    }

    async getTemplate(templateName: string, options: EmailInterface, prod: boolean = false) {
        try {
            const template = await pug.renderFile(
                `views/emails/${templateName}.pug`,
                options.metaData
            );
            if(prod) {
                const data = await this.prodTransporter.sendMail({
                    from: "nicolas-zanardo.com<no-reply@nicolas-zanardo.com>",
                    to: options.to,
                    subject: options.subject,
                    html: template
                })
                console.log('PROD: Email send: ', data);
            } else {
                const data = await this.devTransporteur.sendMail({
                    from: "nicolas-zanardo.com<no-reply@nicolas-zanardo.com>",
                    to: options.to,
                    subject: options.subject,
                    html: template
                })
                console.log('DEV: Email send: ', data);
            }


        } catch(e) {
            throw new Error(e);
        }
    }
}