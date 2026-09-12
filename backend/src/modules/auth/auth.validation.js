import { z } from 'zod';

const passwordValidation = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one number or special character');

export const signupSchema = {
  body: z
    .object({
      full_name: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100).optional(),
      fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100).optional(),
      email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email('Invalid email address')
        .toLowerCase(),
      password: passwordValidation,
      role: z
        .string()
        .optional()
        .transform((val) => (val ? val.toLowerCase() : 'supplier'))
        .pipe(z.enum(['supplier', 'buyer', 'logistics', 'admin', 'verifier']))
        .default('supplier')
    })
    .transform((data) => {
      const resolvedName = data.full_name || data.fullName;
      if (!resolvedName) {
        throw new Error('Full name is required');
      }
      return {
        ...data,
        full_name: resolvedName
      };
    })
};

export const loginSchema = {
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email address')
      .toLowerCase(),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password cannot be empty')
  })
};

export const googleAuthSchema = {
  body: z
    .object({
      idToken: z.string().optional(),
      credential: z.string().optional(),
      accessToken: z.string().optional(),
      role: z
        .string()
        .optional()
        .transform((val) => (val ? val.toLowerCase() : 'supplier'))
        .pipe(z.enum(['supplier', 'buyer', 'logistics', 'admin', 'verifier']))
        .default('supplier')
    })
    .refine((data) => data.idToken || data.credential || data.accessToken, {
      message: 'Google ID token, credential, or access token is required'
    })
};

export const forgotPasswordSchema = {
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email address')
      .toLowerCase()
  })
};

export const resetPasswordSchema = {
  body: z.object({
    token: z.string({ required_error: 'Reset token is required' }).min(1, 'Reset token is missing'),
    newPassword: passwordValidation
  })
};

export const verifyEmailSchema = {
  query: z.object({
    token: z.string({ required_error: 'Verification token is required' }).min(1, 'Verification token is missing')
  })
};
