import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'programingarea@gmail.com',
        pass: '01272681918Ahmed',
      },
    });
  }

  async sendResetCode(email: string, resetCode: string) {
    const mailOptions = {
      from: 'programingarea@gmail.com',
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is ${resetCode}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
