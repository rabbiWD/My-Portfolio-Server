require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://rabbi-khan.vercel.app/'
  );

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: 'Please fill out all fields.' });
  }

  const mailToOwner = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `Contact with ${name}`,
    html: `
            <h3>Message Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
  };

  const autoReplyToUser = {
    from: 'RABBI KHAN <' + process.env.EMAIL_USER + '>',
    to: email,
    subject: 'Thank you for reaching out!',
    html: `
            <p>Hi ${name},</p>
            <p>Thank you for reaching out! I have received your request: "${message}", and I'll contact you back as soon as possible.</p>
            <br>
            <p>Best Regards</p>
            <p><strong>RABBI KHAN</strong></p>
            <p>MERN Stack Developer</p>
        `,
  };
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
