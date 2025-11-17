import nodemailer from "nodemailer";
import { EMAIL_USER, GOOGLE_APP_PASSWORD } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: GOOGLE_APP_PASSWORD,
  },
}); 

export default async function sendEmail(newContact) {
  const mailOptions = {
  from: newContact.email,
  to: EMAIL_USER,
  // to: "hasib.softvence@gmail.com",
  subject: `New Order Request from ${newContact.firstName} ${newContact.lastName}`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2b2b2b;">🛍️ New Order Submission</h2>
      <p>You have received a new order request from your website.</p>
      
      <h3 style="margin-top: 20px;">Customer Details</h3>
      <p><strong>Name:</strong>  ${newContact.firstName} ${newContact.lastName}</p>
      <p><strong>Email:</strong> ${newContact.email}</p>
      <p>
        <strong>Address:</strong><br>
        ${newContact.address}<br>
        ${newContact.city}, ${newContact.state} ${newContact.zip}
      </p>

      <h3 style="margin-top: 20px;">Order Preference</h3>
      <p><strong>Item Preference:</strong> ${newContact.itemPreference}</p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #666;">Received on: ${newContact.date}</p>
    </div>
  `,
};

  await transporter.sendMail(mailOptions);
}
