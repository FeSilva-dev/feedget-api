import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cbf9390001e19c",
    pass: "c350765ce01c1d"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <contato@77sol.com.br>',
      to: 'Felipe <feliper.silva011@gmail.com>',
      subject,
      html: body,
    });
  };
}