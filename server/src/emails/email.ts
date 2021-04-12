import EmailInterface from "../interface/EmailInterface";
import pug from 'pug';
import Mail from "nodemailer/lib/mailer";
const env = require(`../environment/${process.env.NODE_ENV}`)

export default class Email {

    private transporter: any;
    private readonly from: string;

    constructor() {
        this.from = env.form;
        this.transporter = env.email;
    }

    /**
     * getTemplate
     * ------------
     * email factory
     * @param templateName string
     * @param options EmailInterface
     */
    async getTemplate(templateName: string, options: EmailInterface) {
        try {
            const template = await pug.renderFile(
                `views/emails/${templateName}.pug`,
                options
            );
            const data = this.transporter.sendMail({
                from: this.from,
                        to: options.to,
                        subject: options.subject,
                        html: template
            }).then((data: Mail) => console.log(data)).catch((e: Error) => {console.log(e.message)})

        } catch(e) {
            throw new Error(e);
        }
    }

    /**
     * sendEmailVerification
     * ---------------------
     * Checks the user’s email is right
     * @param options EmailInterface
     */
    async sendEmailVerification(options: EmailInterface) {
        try {
            const email = {
                from: this.from,
                subject: "Vérifier votre email",
                to: options.to,
                html: pug.renderFile( `views/emails/verified.pug`, {
                    name: options.metaData.name,
                    url: `https://${ options.host }/email-verification/${options.metaData.userId}/${options.metaData.token}`
                })
            };
            const response = await this.transporter.sendMail(email);
            console.log(response);
        } catch(e) {
            throw new Error(e);
        }
    }

    /**
     * sendResetPasswordLink
     * ---------------------
     * send a link for reset password
     * @param options EmailInterface
     */
    async sendResetPasswordLink(options: EmailInterface) {
        try {
            const email = {
                from: this.from,
                subject: "Réinitialiser votre mot de passe",
                to: options.to,
                html: pug.renderFile( `views/emails/password-reset.pug`, {
                    url: `https://${ options.host }/reset-password/${ options.metaData.userId }/${ options.metaData.token }`
                })
            };
            const response = await this.transporter.sendMail(email);
            console.log(response);
        } catch (e) {
            throw e;
        }
    }
}