import { Resend } from "resend";
import type { EmailProvider, SendEmailOptions } from "./email.provider.js";

export class ResendProvider implements EmailProvider {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail({
    to,
    subject,
    html,
  }: SendEmailOptions): Promise<void> {
      console.log({
        from: process.env.EMAIL_FROM,
        to,
        hasApiKey: !!process.env.RESEND_API_KEY,
      });

    await this.resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });
  }
}