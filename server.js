const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Create transporter for SMTP
const createTransporter = () => {
  // For development/testing, use a mock transporter if SMTP is not properly configured
  if (process.env.NODE_ENV === 'development' || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️  Using mock email service (development mode or missing SMTP credentials).');
    return {
      verify: async () => true,
      sendMail: async (mailOptions) => {
        console.log('📧 MOCK EMAIL SENT:');
        console.log('From:', mailOptions.from);
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Content:', mailOptions.html || mailOptions.text);
        return { messageId: 'mock-' + Date.now() };
      }
    };
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Feedback endpoint
app.post('/api/feedback', async (req, res) => {
  try {
    const { from_name, from_email, likes, improvement, feature, comments } = req.body;

    // Validate required fields
    if (!from_name || !from_email || !comments) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and comments are required'
      });
    }

    console.log('Attempting to send email with credentials:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? '***' : 'NOT SET',
      pass: process.env.SMTP_PASS ? '***' : 'NOT SET'
    });

    const transporter = createTransporter();

    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Email content
    const mailOptions = {
      from: `"${from_name}" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'admin@example.com',
      subject: 'New Feedback from AR Webstore',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Feedback Received</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${from_name} (${from_email})</p>
            <p><strong>What they liked:</strong> ${likes || 'Not specified'}</p>
            <p><strong>Improvement suggestions:</strong> ${improvement || 'Not specified'}</p>
            <p><strong>Feature requests:</strong> ${feature || 'Not specified'}</p>
            <p><strong>Comments:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${comments.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from the AR Webstore feedback form.</p>
        </div>
      `,
      replyTo: from_email
    };

    console.log('Sending email to:', mailOptions.to);
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.json({
      success: true,
      message: 'Feedback sent successfully!'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send feedback. Please try again later.',
      error: error.message
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"Newsletter Signup" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'admin@example.com',
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2 style="color: #333;">New Newsletter Subscriber</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SMTP server is running' });
});

app.listen(PORT, () => {
  console.log(`SMTP server running on port ${PORT}`);
});