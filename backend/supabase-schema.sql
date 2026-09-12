-- =====================================================================
-- CarbonSphere Authentication & User Management Supabase Schema
-- =====================================================================

-- 1. Enable UUID Extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT, -- Nullable for Google OAuth authenticated users
  role VARCHAR(50) NOT NULL DEFAULT 'buyer' CHECK (role IN ('supplier', 'buyer', 'logistics', 'admin')),
  provider VARCHAR(50) NOT NULL DEFAULT 'email' CHECK (provider IN ('email', 'google')),
  avatar_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  verification_token TEXT,
  verification_expires TIMESTAMPTZ,
  reset_password_token TEXT,
  reset_password_expires TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Performance Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON public.users (verification_token);
CREATE INDEX IF NOT EXISTS idx_users_reset_password_token ON public.users (reset_password_token);

-- 4. Create Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Allow public / anon / authenticated / service_role full access
DROP POLICY IF EXISTS "Allow all operations for anon and authenticated" ON public.users;
CREATE POLICY "Allow all operations for anon and authenticated" 
ON public.users 
FOR ALL 
TO public, anon, authenticated, service_role 
USING (true) 
WITH CHECK (true);
