// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cấu hình transporter của Nodemailer (dùng Gmail, hoặc SMTP khác)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mkt01.fortune@gmail.com',         // Địa chỉ email admin
    pass: 'Nf@123456'            // App password, KHÔNG dùng mật khẩu thường!
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, company, country, phone, message } = req.body;
  // Validate đơn giản
  if (!name || !email || !country || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const mailOptions = {
    from: '"Website Contact" <yourgmail@gmail.com>',
    to: 'mkt01.fortune@gmail.com', // Địa chỉ nhận thông báo
    subject: `New Contact from ${name} (${email})`,
    text: `
      Name: ${name}
      Email: ${email}
      Company: ${company || '-'}
      Country: ${country}
      Phone: ${phone || '-'}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Send mail failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Contact API server running on port', PORT));