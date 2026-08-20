const COLORS = {
  bgOuter: "#0a0b0f",
  bgCard: "#12141b",
  border: "#242732",
  accent: "#2dd9c5",
  accentText: "#04211d",
  textPrimary: "#f5f6f8",
  textSecondary: "#9aa0ac",
  textMuted: "#6b7280",
};

export function verificationEmailTemplate(
  username: string,
  verificationUrl: string
) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your PokerOS account</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLORS.bgOuter}; font-family: Arial, Helvetica, sans-serif;">
    <!-- Preheader (texto de preview oculto en la bandeja de entrada) -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      Confirm your email to start tracking your poker results on PokerOS.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.bgOuter};">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">

            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom: 28px;">
                <span style="font-size:22px; font-weight:bold; color:${COLORS.textPrimary};">
                  <span style="color:${COLORS.accent};">&#9824;</span>
                  Poker<span style="color:${COLORS.accent};">OS</span>
                </span>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background-color:${COLORS.bgCard}; border:1px solid ${COLORS.border}; border-radius:16px; padding:40px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <div style="width:56px; height:56px; border-radius:50%; background-color:rgba(45,217,197,0.12); text-align:center; line-height:56px; font-size:24px;">
                        &#9993;
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-bottom:8px;">
                      <h1 style="margin:0; font-size:20px; color:${COLORS.textPrimary};">
                        Verify your email
                      </h1>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-bottom:24px;">
                      <p style="margin:0; font-size:14px; line-height:1.6; color:${COLORS.textSecondary};">
                        Hi ${username}, welcome to PokerOS. Confirm your email
                        to activate your account and start tracking your results.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-bottom:24px;">
                      
                        href="${verificationUrl}"
                        style="
                          display:inline-block;
                          background-color:${COLORS.accent};
                          color:${COLORS.accentText};
                          font-size:14px;
                          font-weight:bold;
                          text-decoration:none;
                          padding:14px 28px;
                          border-radius:10px;
                        "
                      >
                        Verify Email Address
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td align="center">
                      <p style="margin:0; font-size:12px; line-height:1.6; color:${COLORS.textMuted};">
                        This link expires in 24 hours. If the button doesn't work,
                        copy and paste this URL into your browser:
                      </p>
                      <p style="margin:8px 0 0; font-size:12px; word-break:break-all;">
                        <a href="${verificationUrl}" style="color:${COLORS.accent};">${verificationUrl}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:24px;">
                <p style="margin:0; font-size:12px; color:${COLORS.textMuted};">
                  Good luck at the tables &#9824;
                </p>
                <p style="margin:8px 0 0; font-size:11px; color:${COLORS.textMuted};">
                  If you didn't create a PokerOS account, you can ignore this email.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}