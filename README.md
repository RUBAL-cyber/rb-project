# AR Webstore

An augmented reality webstore for immersive 3D product visualization.

## Features

- 3D model viewing with AR support
- Product wishlist functionality
- User authentication
- Feedback system with SMTP email
- Newsletter subscription
- Responsive design

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env` and update the SMTP settings:
   ```env
   # SMTP Configuration (using Gmail as example)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   RECIPIENT_EMAIL=admin@yourwebsite.com
   ```

   **For Gmail SMTP Setup:**
   1. Enable 2-Factor Authentication on your Gmail account
   2. Generate an App Password: https://support.google.com/accounts/answer/185833
   3. **Important**: The App Password should be 16 characters (no spaces)
   4. Use your Gmail address as `SMTP_USER`
   5. Use the 16-character App Password as `SMTP_PASS`

   **Testing SMTP Configuration:**
   ```bash
   npm run test-smtp
   ```

   **Alternative SMTP Providers (Easier Setup):**
   - **SendGrid** (Free tier available):
     1. Sign up at https://sendgrid.com
     2. Create an API key
     3. Use these settings:
     ```
     SMTP_HOST=smtp.sendgrid.net
     SMTP_PORT=587
     SMTP_USER=apikey
     SMTP_PASS=your-sendgrid-api-key
     ```
   
   - **Mailgun** (Free tier available):
     1. Sign up at https://www.mailgun.com
     2. Get SMTP credentials
     3. Use their provided SMTP settings

   **Troubleshooting:**
   - If you get "Invalid login" errors, double-check your App Password
   - Make sure there are no extra spaces in your .env file
   - Test with `npm run test-smtp` before running the full app

### Running the Application

1. **Development Mode** (with mock email service):
   ```bash
   npm run server  # Starts backend with mock SMTP
   npm start       # Starts React app
   ```
   In development mode, emails are logged to the console instead of being sent.

2. **Production Mode** (with real SMTP):
   - Set `NODE_ENV=production` in your `.env` file
   - Configure valid SMTP credentials
   - Run the same commands above

3. Open http://localhost:3000 in your browser

## SMTP Configuration

The application uses Nodemailer with SMTP for sending emails. Supported providers:

- **Gmail**: `smtp.gmail.com:587` (requires App Password)
- **Outlook**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Configure HOST, PORT, USER, PASS accordingly

## API Endpoints

- `POST /api/feedback` - Send feedback emails
- `POST /api/newsletter` - Newsletter subscription
- `GET /api/health` - Health check

## Build for Production

```bash
npm run build
```

## Technologies Used

- React 17
- Node.js/Express
- Nodemailer (SMTP)
- Google Model Viewer (AR)
- React Router
- SweetAlert2