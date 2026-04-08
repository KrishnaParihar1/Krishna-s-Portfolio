"use server";

import nodemailer from "nodemailer";

export async function sendEmailAction(prevState: unknown, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const country = formData.get("country") as string;

    if (!name || !email || !country) {
      return { status: "error", message: "All fields are required." };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCountry: ${country}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Country:</strong> ${country}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { status: "success", message: "Message sent successfully!" };
  } catch (error) {
    console.error("Email sending error:", error);
    return { status: "error", message: "Failed to send message. Please try again later." };
  }
}
