import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

const supabaseUrl = env.SUPABASE.URL;
const supabaseAnonKey = env.SUPABASE.ANON_KEY;
const supabaseServiceRoleKey = env.SUPABASE.SERVICE_ROLE_KEY || supabaseAnonKey;

// Validation and logging of environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  logger.warn(
    '[SUPABASE CONFIG] WARNING: Supabase URL or Anon Key is missing in environment variables. ' +
    'Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file.'
  );
} else {
  logger.info(`[SUPABASE CONFIG] Initializing Supabase client for URL: ${supabaseUrl}`);
}

/**
 * Public/Anon client (for client-authorized interactions, signUp, signIn, and RLS context)
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

/**
 * Admin / Service Role client (for admin auth operations, user management, bypassing RLS)
 */
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseServiceRoleKey || supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);
