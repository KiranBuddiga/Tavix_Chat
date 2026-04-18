const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

const sendMail = async (to, name) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject: "Welcome to Travix - Let's Get Started!",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif; color:#333333; line-height:1.5;">
  <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:40px 30px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <p style="margin:0 0 16px; font-size:16px; color:#555555;">
      Hi ${name},
    </p>
    
    <p style="margin:0 0 16px; font-size:24px; font-weight:bold; color:#111111;">
      Welcome to Travix!
    </p>
    
    <p style="margin:0 0 24px; font-size:16px; color:#555555;">
      Your account has been registered successfully.
    </p>
    
    <p style="margin:0; font-size:14px; color:#888888; font-weight:500;">
      Thanks,<br>
      Travix Team
    </p>
    
  </div>
</body>
</html>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = sendMail;
