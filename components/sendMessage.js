import nodemailer from "nodemailer";
import { EMAIL_USER, GOOGLE_APP_PASSWORD } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: GOOGLE_APP_PASSWORD,
  },
});

export default async function sendMessage(email,message) {
  const mailOptions = {
    from: email,
    to: process.env.RecieverEmail, // You can change this to EMAIL_USER if you want to receive it dynamically
    subject: `📬 New Message from ${email}`,  
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2b2b2b;">💬 New Contact Form Message</h2>
        <p>You have received a new message from your website contact form.</p>

        <h3 style="margin-top: 20px;">Sender Details</h3>
        <p><strong>Email:</strong> ${email}</p>

        <h3 style="margin-top: 20px;">Message</h3>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
          ${message.replace(/\n/g, "<br>")}
        </p>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 14px; color: #666;">Received on: ${new Date().toLocaleString()}</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
