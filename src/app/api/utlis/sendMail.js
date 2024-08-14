import nodemailer from "nodemailer";

  let transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL_USERNAME, // Your Gmail address
      pass: process.env.EMAIL_PASSWORD, // Your Gmail password
    },
  });
export const sendEmail = async (to, subject, html) => {
  // Create a transporter

  // Set up email data with unicode symbols
  let mailOptions = {
    from: `"Mr Abdelrahman" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
}
