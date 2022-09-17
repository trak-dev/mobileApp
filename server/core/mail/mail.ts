import nodemailer  from 'nodemailer';
import config from '../../config';

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
  });

export default class Core_Email {

    static async passwordLostMail(email: string, token: string) {
        try {
            const emailToSend = await transporter.sendMail({
                from: 'LostAccountsRobots@google.com', // sender address
                to: email, // list of receivers
                subject: "Lien de réinitialisation mot de passe", // Subject line
                html: `
                <h1 style="text-align: center;">Vous avez perdu votre mot de passe ?</h1>
                <a style="text-align: center;" href='http://localhost:4200/password-lost?token=${token}'>Changer votre mot de passe ici.</a>`, // html body 
              });
        } catch (error) {
            console.error(error);
            throw "Error sending email";
        }
        
    }


}