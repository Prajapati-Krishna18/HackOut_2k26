import { axiosClient } from './axiosClient';
import { ENDPOINTS } from './endpoints';

/**
 * Authentication Service connecting React frontend to Express backend
 */
export const authService = {
  /**
   * Register a new user
   */
  async signup({ fullName, full_name, email, password, role }) {
    const payload = {
      full_name: full_name || fullName,
      email,
      password,
      role: role || 'buyer'
    };
    return await axiosClient.post(ENDPOINTS.AUTH.SIGNUP, payload);
  },

  /**
   * Log in user with email and password
   */
  async login({ email, password }) {
    return await axiosClient.post(ENDPOINTS.AUTH.LOGIN, { email, password });
  },

  /**
   * Authenticate with Google ID token, credential, or access token
   */
  async googleAuth(payload) {
    return await axiosClient.post('/auth/google', payload);
  },

  /**
   * Get current authenticated user profile
   */
  async getMe() {
    return await axiosClient.get(ENDPOINTS.AUTH.ME);
  },

  /**
   * Update authenticated user profile in backend database
   */
  async updateProfile(profileData) {
    return await axiosClient.put('/auth/profile', profileData);
  },

  /**
   * Update active workspace role in backend database
   */
  async updateRole(role) {
    return await axiosClient.put('/auth/role', { role });
  },

  /**
   * Send forgot password email
   */
  async forgotPassword(email) {
    return await axiosClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword({ token, newPassword }) {
    return await axiosClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token) {
    return await axiosClient.get(`/auth/verify-email?token=${token}`);
  },

  /**
   * Request 6-digit OTP code to email
   */
  async sendOtp(email) {
    return await axiosClient.post('/auth/send-otp', { email });
  },

  /**
   * Verify 6-digit OTP code
   */
  async verifyOtp({ email, otp }) {
    return await axiosClient.post('/auth/verify-otp', { email, otp });
  },

  /**
   * Log out user
   */
  async logout() {
    return await axiosClient.post('/auth/logout');
  }
};

export default authService;
