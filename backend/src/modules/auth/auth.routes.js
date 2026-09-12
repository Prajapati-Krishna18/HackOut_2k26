import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from './auth.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { authenticateUser } from './auth.middleware.js';
import {
  signupSchema,
  loginSchema,
  googleAuthSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema
} from './auth.validation.js';
import { env } from '../../config/env.js';

const router = Router();

// Rate limiter for authentication attempts (prevents brute-force attacks)
const authLimiter = rateLimit({
  windowMs: env.RATE_LIMIT.WINDOW_MS,
  max: env.RATE_LIMIT.AUTH_MAX_REQUESTS,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Public Authentication Endpoints
 */
// 1. Signup with Email & Password
router.post('/signup', authLimiter, validate(signupSchema), authController.signup);

// 2. Login with Email & Password
router.post('/login', authLimiter, validate(loginSchema), authController.login);

// 3. Google OAuth Authentication (Sign in / Sign up)
router.post('/google', validate(googleAuthSchema), authController.googleAuth);

// 4. Verify Email Token
router.get('/verify-email', validate(verifyEmailSchema), authController.verifyEmail);

// 4.1 Send Verification OTP
router.post('/send-otp', authController.sendOtp);

// 4.2 Verify OTP Code
router.post('/verify-otp', authController.verifyOtp);

// 5. Request Password Reset Link
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);

// 6. Reset Password with Token
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);

/**
 * Protected Authentication Endpoints
 */
// 7. Get Current Authenticated User Profile
router.get('/me', authenticateUser, authController.getMe);

// 7.1 Update Profile
router.put('/profile', authenticateUser, authController.updateProfile);

// 7.2 Update Active Role
router.put('/role', authenticateUser, authController.updateRole);

// 8. Logout / Invalidate Session Cookie
router.post('/logout', authenticateUser, authController.logout);

export default router;
