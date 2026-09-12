import { authService } from '@/services/api/authService';

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '642068395657-8tcjr2fgp0djscv4fnop61mgkkn5kvo1.apps.googleusercontent.com';

/**
 * Trigger Real Google OAuth popup with explicit account chooser
 * @param {Object} options
 * @param {string} options.role - Desired role ('supplier', 'buyer', 'logistics', 'admin')
 * @param {Function} options.onSuccess - Callback on successful backend authentication (user, token)
 * @param {Function} options.onError - Callback on error with error message
 */
export const triggerGoogleAuth = ({ role = 'supplier', onSuccess, onError }) => {
  if (typeof window === 'undefined') return;

  if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
    // If the GSI script is still loading, wait or load dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initiateTokenClient({ role, onSuccess, onError });
    };
    script.onerror = () => {
      if (onError) onError('Failed to load Google Identity Services SDK.');
    };
    document.head.appendChild(script);
    return;
  }

  initiateTokenClient({ role, onSuccess, onError });
};

const initiateTokenClient = ({ role, onSuccess, onError }) => {
  try {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      prompt: 'select_account', // Forces Google to display the account selection screen
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          console.error('Google OAuth error:', tokenResponse);
          if (onError) onError(tokenResponse.error_description || tokenResponse.error);
          return;
        }

        try {
          // Send Google access token to backend
          const response = await authService.googleAuth({
            accessToken: tokenResponse.access_token,
            role
          });

          const { user, token } = response.data;
          if (onSuccess) onSuccess(user, token);
        } catch (err) {
          console.error('Backend Google Auth error:', err);
          if (onError) onError(err?.message || 'Failed to authenticate with Google on backend.');
        }
      }
    });

    // Open Google account selector popup
    client.requestAccessToken({ prompt: 'select_account' });
  } catch (err) {
    console.error('Error initiating Google Token Client:', err);
    if (onError) onError('Could not initialize Google Account selection.');
  }
};
