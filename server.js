const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3003;

// Enable CORS only for your front-end application
app.use(cors({
  origin: 'https://erpcustomization.net/' // Only allow this origin to access your server
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// SMTP transporter configuration
const transporter = nodemailer.createTransport({
  host: 'mail.erpcustomization.net',
  port: 465, // Use 587 if you are using STARTTLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'shoaib@erpcustomization.net',
    pass: 'password123'
  }
});

// POST route to handle form submissions
app.post('/send-email', (req, res) => {
  const { name, email, company, phone, question } = req.body;

  const mailOptions = {
    from: 'shoaib@erpcustomization.net', // sender address
    to: 'shoaib@erpcustomization.net', // list of receivers, modify as needed
    subject: 'New Contact Form Submission', // Subject line
    text: `You have a new inquiry from:
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone}
Question: ${question}`, // plain text body
    html: `<h4>You have a new inquiry from:</h4>
<p>Name: ${name}</p>
<p>Email: ${email}</p>
<p>Company: ${company}</p>
<p>Phone: ${phone}</p>
<p>Question: ${question}</p>` // HTML body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email: ' + error.message });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email Sent Successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
