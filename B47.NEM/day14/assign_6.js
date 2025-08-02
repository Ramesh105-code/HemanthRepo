const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     
    pass: process.env.EMAIL_PASS      
  }
});

app.get('/sendemail', async (req, res) => {
  try {
    let info = await transporter.sendMail({
      from: `"NEM Student" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_USER}, venugopal.burli@masaischool.com`,
      subject: "Test Email from NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply."
    });

    console.log("Message sent: %s", info.messageId);
    res.send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
