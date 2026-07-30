import { emailProvider } from "./index.js";
import { verificationEmailTemplate } from "./email.templates.js";

export async function sendVerificationEmail(
  username: string,
  email: string,
  verificationUrl: string
) {
  await emailProvider.sendEmail({
    to: email,
    subject: "Verify your PokerOS account",
    html: verificationEmailTemplate(
      username,
      verificationUrl
    ),
  });
}