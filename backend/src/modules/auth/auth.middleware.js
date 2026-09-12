import { verifyJwtToken } from '../../utils/generateToken.js';
import { supabaseAdmin } from '../../config/supabase.js';
import { ApiError } from '../../utils/apiError.js';
import { HTTP_STATUS } from '../../constants/index.js';

/**
 * Authentication Middleware
 * Extracts token from HTTP Authorization header (Bearer) or HTTP-Only cookie,
 * verifies the signature, and retrieves the active user record from Supabase.
 */
export const authenticateUser = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization Bearer Header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 2. Check HTTP-Only Cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication token missing. Please sign in.');
    }

    // 3. Verify JWT
    let decoded;
    try {
      decoded = verifyJwtToken(token);
    } catch (jwtErr) {
      if (jwtErr.name === 'TokenExpiredError') {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Session expired. Please sign in again.');
      }
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or corrupted authentication token.');
    }

    // 4. Fetch latest user state from Supabase or local persistence
    let user = null;
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, full_name, email, role, provider, avatar_url, is_verified, created_at, updated_at')
        .eq('id', decoded.id)
        .maybeSingle();

      if (!error && data) {
        user = data;
      }
    } catch (dbErr) {}

    // Resilient local lookup
    if (!user) {
      try {
        const { authService } = await import('./auth.service.js');
        user = await authService.getCurrentUser(decoded.id);
      } catch (localErr) {
        // Fallback to token payload if user exists
        if (decoded && decoded.id) {
          user = {
            id: decoded.id,
            email: decoded.email,
            full_name: decoded.full_name || decoded.name || decoded.email?.split('@')[0],
            role: decoded.role || 'supplier',
            is_verified: decoded.is_verified ?? true
          };
        }
      }
    }

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'User associated with this token no longer exists.');
    }

    // Attach sanitized user to request context
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * @param  {...string} allowedRoles - e.g. 'admin', 'supplier', 'buyer', 'logistics'
 */
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required before role verification.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          `Access denied. Role '${req.user.role}' is not authorized to access this resource.`
        )
      );
    }

    next();
  };
};

/**
 * Verified Email Guard Middleware
 * Ensures user has verified their email address before accessing protected actions
 */
export const requireVerifiedEmail = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.'));
  }

  if (!req.user.is_verified) {
    return next(
      new ApiError(
        HTTP_STATUS.FORBIDDEN,
        'Email verification required. Please verify your email to access this resource.'
      )
    );
  }

  next();
};
