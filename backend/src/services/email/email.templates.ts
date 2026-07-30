export function verificationEmailTemplate(
  username: string,
  verificationUrl: string
) {
  return `
    <div
      style="
        font-family: Arial, sans-serif;
        max-width:600px;
        margin:auto;
        padding:32px;
      "
    >

      <h1>♠️ PokerOS</h1>

      <p>Hi ${username},</p>

      <p>
        Welcome to PokerOS!
      </p>

      <p>
        Please verify your email to activate your account.
      </p>

      <a
        href="${verificationUrl}"
        style="
          background:#111827;
          color:white;
          padding:12px 20px;
          text-decoration:none;
          border-radius:8px;
          display:inline-block;
        "
      >
        Verify Email
      </a>

      <p style="margin-top:32px;color:#777;">
        Good luck at the tables ♠️
      </p>

    </div>
  `;
}