import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from './logger.js';

/**
 * Creates and configures Nodemailer transporter
 */
const createTransporter = () => {
  if (env.SMTP.USER && env.SMTP.PASS) {
    if (env.SMTP.HOST) {
      return nodemailer.createTransport({
        host: env.SMTP.HOST,
        port: env.SMTP.PORT || 587,
        secure: env.SMTP.SECURE || false,
        auth: {
          user: env.SMTP.USER,
          pass: env.SMTP.PASS
        }
      });
    } else {
      // Default to Gmail service if host is omitted
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: env.SMTP.USER,
          pass: env.SMTP.PASS
        }
      });
    }
  }
  return null;
};

/**
 * Send 6-Digit Email Verification OTP
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.name - User's full name
 * @param {string} params.otp - 6-digit OTP code
 */
export const sendOtpEmail = async ({ to, name, otp }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0fdf4; margin: 0; padding: 24px; }
        .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #d1fae5; }
        .header { background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #a7f3d0; font-weight: 500; }
        .content { padding: 36px 32px; color: #1e293b; line-height: 1.6; }
        .greeting { font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 0; }
        .otp-box { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px dashed #059669; border-radius: 12px; padding: 20px; text-align: center; margin: 28px 0; }
        .otp-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: #047857; margin-bottom: 8px; }
        .otp-code { font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #064e3b; font-family: 'Courier New', monospace; }
        .timer-note { font-size: 13px; color: #64748b; margin-top: 6px; }
        .footer { background: #f8fafc; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>CarbonSphere</h1>
          <p>AI-Powered Circular Carbon Exchange</p>
        </div>
        <div class="content">
          <p class="greeting">Hello ${name || 'Future Eco-Leader'},</p>
          <p>Thank you for registering on <strong>CarbonSphere</strong>. Use the 6-digit verification code below to verify your email address and activate your trading desk.</p>
          
          <div class="otp-box">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-code">${otp}</div>
            <div class="timer-note">Valid for <strong>10 minutes</strong></div>
          </div>
          
          <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
            If you did not request this verification code, please ignore this message or contact security support.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} CarbonSphere Ecosystem. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: env.SMTP.FROM,
        to,
        subject: `${otp} is your CarbonSphere Verification Code`,
        html: htmlContent
      });
      logger.info(`[EMAIL SERVICE] OTP verification email dispatched to: ${to}`);
      return true;
    } catch (err) {
      logger.error(`[EMAIL SERVICE] Failed to send OTP email via SMTP to ${to}: ${err.message}`);
    }
  }

  // Development Fallback Logging
  logger.info(`=======================================================`);
  logger.info(`[EMAIL OTP] Recipient: ${to}`);
  logger.info(`[EMAIL OTP] 6-Digit Code: ${otp}`);
  logger.info(`[EMAIL OTP] Expiry: 10 minutes`);
  logger.info(`=======================================================`);
  return false;
};

/**
 * Send Email Verification Link
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.name - User's full name
 * @param {string} params.verificationToken - Plain verification token
 */
export const sendVerificationEmail = async ({ to, name, verificationToken }) => {
  const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
  const apiVerificationUrl = `http://localhost:${env.PORT}/api/auth/verify-email?token=${verificationToken}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; }
        .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #064e3b, #059669); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .content { padding: 35px 30px; color: #334155; line-height: 1.6; }
        .btn { display: inline-block; padding: 14px 28px; background-color: #10b981; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; margin: 25px 0; text-align: center; }
        .footer { background: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        .link-text { word-break: break-all; color: #059669; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>CarbonSphere</h1>
          <p style="margin: 5px 0 0; font-size: 13px; color: #a7f3d0;">AI-Powered Circular Carbon Exchange</p>
        </div>
        <div class="content">
          <h2>Welcome to CarbonSphere, ${name}!</h2>
          <p>Thank you for joining our mission to accelerate verifiable circular carbon exchange. Please verify your email address to activate your account and access trading desks.</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="btn">Verify My Email</a>
          </div>
          <p>Or click the direct API verification link:</p>
          <p><a href="${apiVerificationUrl}" class="link-text">${apiVerificationUrl}</a></p>
          <p style="font-size: 13px; color: #64748b;">This link expires in 24 hours. If you didn't create this account, please ignore this email.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} CarbonSphere Ecosystem. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: env.SMTP.FROM,
        to,
        subject: 'Verify your CarbonSphere Account',
        html: htmlContent
      });
      logger.info(`Verification email sent to: ${to}`);
      return;
    } catch (err) {
      logger.error(`Failed to send verification email via SMTP to ${to}: ${err.message}`);
    }
  }

  // Development Fallback Logging
  logger.info(`[DEV EMAIL SIMULATION] Verification Email for ${to}:`);
  logger.info(`Verification URL: ${verificationUrl}`);
  logger.info(`Direct API Verification URL: ${apiVerificationUrl}`);
};

/**
 * Send Password Reset Link
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.name - User's full name
 * @param {string} params.resetToken - Plain reset token
 */
export const sendPasswordResetEmail = async ({ to, name, resetToken }) => {
  const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; }
        .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #064e3b, #059669); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; }
        .content { padding: 35px 30px; color: #334155; line-height: 1.6; }
        .btn { display: inline-block; padding: 14px 28px; background-color: #059669; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; margin: 25px 0; text-align: center; }
        .footer { background: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        .link-text { word-break: break-all; color: #059669; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>CarbonSphere</h1>
          <p style="margin: 5px 0 0; font-size: 13px; color: #a7f3d0;">Security & Authentication Desk</p>
        </div>
        <div class="content">
          <h2>Password Reset Request</h2>
          <p>Hello ${name},</p>
          <p>We received a request to reset your CarbonSphere account password. Click the button below to choose a new password.</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="btn">Reset Password</a>
          </div>
          <p>Or paste this URL in your browser:</p>
          <p><a href="${resetUrl}" class="link-text">${resetUrl}</a></p>
          <p style="font-size: 13px; color: #ef4444; font-weight: 600;">This link is valid for 1 hour only.</p>
          <p style="font-size: 13px; color: #64748b;">If you did not request this, please disregard this email. Your password remains safe.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} CarbonSphere Ecosystem. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: env.SMTP.FROM,
        to,
        subject: 'Reset your CarbonSphere Password',
        html: htmlContent
      });
      logger.info(`Password reset email sent to: ${to}`);
      return;
    } catch (err) {
      logger.error(`Failed to send password reset email via SMTP to ${to}: ${err.message}`);
    }
  }

  // Development Fallback Logging
  logger.info(`[DEV EMAIL SIMULATION] Password Reset Email for ${to}:`);
  logger.info(`Reset URL: ${resetUrl}`);
};
