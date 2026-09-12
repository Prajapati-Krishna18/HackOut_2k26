import { authService } from './auth.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { HTTP_STATUS } from '../../constants/index.js';
import { setAuthCookie, clearAuthCookie } from '../../utils/generateToken.js';

class AuthController {
  /**
   * POST /api/auth/signup
   */
  async signup(req, res, next) {
    try {
      const { user, token } = await authService.signup(req.body);

      // Attach HTTP-Only secure cookie
      setAuthCookie(res, token);

      return res
        .status(HTTP_STATUS.CREATED)
        .json(
          new ApiResponse(
            HTTP_STATUS.CREATED,
            { user, token },
            'Account registered successfully. A verification code has been dispatched to your email.'
          )
        );
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      const { user, token } = await authService.login(req.body);

      // Attach HTTP-Only secure cookie
      setAuthCookie(res, token);

      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            HTTP_STATUS.OK,
            { user, token },
            'Authentication successful. Welcome to CarbonSphere.'
          )
        );
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/google
   */
  async googleAuth(req, res, next) {
    try {
      const { user, token } = await authService.googleAuth(req.body);

      // Attach HTTP-Only secure cookie
      setAuthCookie(res, token);

      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            HTTP_STATUS.OK,
            { user, token },
            'Google authentication successful.'
          )
        );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/auth/verify-email?token=...
   */
  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const result = await authService.verifyEmail(token);

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, null, result.message));
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/send-otp
   */
  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const result = await authService.sendOtp(email);

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, result, result.message));
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/verify-otp
   */
  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyOtp({ email, otp });

      // Attach HTTP-Only secure cookie
      if (result.token) {
        setAuthCookie(res, result.token);
      }

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, result, result.message));
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/forgot-password
   */
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, null, result.message));
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/reset-password
   */
  async resetPassword(req, res, next) {
    try {
      const result = await authService.resetPassword(req.body);

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, null, result.message));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/auth/me
   */
  async getMe(req, res, next) {
    try {
      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, { user: req.user }, 'Current user profile retrieved.'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/auth/profile
   */
  async updateProfile(req, res, next) {
    try {
      const result = await authService.updateProfile(req.user.id, req.body);

      if (result.token) {
        setAuthCookie(res, result.token);
      }

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, { user: result.user, token: result.token }, result.message));
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/auth/role
   */
  async updateRole(req, res, next) {
    try {
      const { role } = req.body;
      const result = await authService.updateRole(req.user.id, role);

      if (result.token) {
        setAuthCookie(res, result.token);
      }

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, { user: result.user, token: result.token }, 'Workspace role updated.'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/logout
   */
  async logout(req, res, next) {
    try {
      clearAuthCookie(res);

      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, null, 'Logged out successfully.'));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
