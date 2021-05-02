import EmailInterface from "../interface/email.interface";
import pug from 'pug';
import Mail from "nodemailer/lib/mailer";
const env = require(`../environment/${process.env.NODE_ENV}`)

export default class Email {

    private transporter: any;
    private readonly from: string;

    constructor() {
        this.from = env.from;
        this.transporter = env.email;
    }

    /**
     * getTemplate
     * ------------
     *
     * email factory
     *
     * Example:
     *      new email().getTemplate("email-welcome", {
     *      to: "contact@YOUR-EMAIL.com",
     *      subject: "YOUR_SUBJECT",
     *      metaData: {
     *         name: "YOUR_NAME"
     *         }
     *      });
     *
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
                    url: `https://${ options.host }/api/user/email-verification/${options.metaData.userId}/${options.metaData.token}`,
                    title: "Verifiez votre email",
                    message: "Bonjour, ce mail vous a été envoyé car vous venez de vous inscrire sur le site web nicolas-zanardo.com.",
                    actionBtn: "Pour activer votre compte, cliquez sur le lien ci-dessous."
                })
            };
            await this.transporter.sendMail(email);
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
                    url: `https://${ options.host }/reset-password/${ options.metaData.userId }/${ options.metaData.token }`,
                    title: "Modifier votre mot de passe",
                    message: "Bonjour, vous recevez ce mail car vous avez fait une demande de réinitialisation de votre mot de passe.",
                    actionBtn: "Vous pouvez cliquer sur le lien ci-dessous pour le réinitialiser."
                })
            };
            await this.transporter.sendMail(email);
        } catch (e) {
            throw new Error(e);
        }
    }
}