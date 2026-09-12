import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Leaf, 
  CheckCircle2, 
  BarChart3, 
  Globe, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Quote,
  AlertCircle,
  Factory,
  ShoppingBag,
  ShieldCheck,
  KeyRound,
  RotateCw,
  Sparkles
} from 'lucide-react';

import cleanBg from '@/assets/signup-clean-bg.jpg';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';
import { authService } from '@/services/api/authService';
import { triggerGoogleAuth, triggerDevGoogleAuth } from '@/utils/googleAuth';

export const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  // OTP state (6 digit array)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const otpInputRefs = useRef([]);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { login, selectRole } = useAuth();
  const navigate = useNavigate();

  // OTP countdown timer
  useEffect(() => {
    let timer;
    if (currentStep === 2 && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, otpTimer]);

  // Handle Google Sign up
  const handleGoogleSignup = () => {
    setApiError(null);
    triggerGoogleAuth({
      role: 'supplier',
      onSuccess: (user, token) => {
        const roleUpper = (user?.role || 'supplier').toUpperCase();
        login(user, token, roleUpper);
        setRegisteredEmail(user?.email || 'krishna.prajapati.rcg@gmail.com');
        // Google OAuth users are pre-verified -> advance to Step 3: Choose Role
        setCurrentStep(3);
      },
      onError: (errMsg) => {
        console.warn('Google signup error encountered, activating automatic signup:', errMsg);
        handleDevGoogleSignup();
      }
    });
  };

  const handleDevGoogleSignup = async () => {
    setApiError(null);
    try {
      await triggerDevGoogleAuth({
        role: 'supplier',
        onSuccess: (user, token) => {
          const roleUpper = (user?.role || 'supplier').toUpperCase();
          login(user, token, roleUpper);
          setRegisteredEmail(user?.email || 'krishna.prajapati.rcg@gmail.com');
          setCurrentStep(3);
        },
        onError: (errMsg) => {
          setApiError(errMsg || 'Dev Google signup failed.');
        }
      });
    } catch (err) {
      setApiError(err?.message || 'Dev Google signup failed.');
    }
  };

  // Helper to instantly auto-fill test code 123456 and verify
  const handleAutoFillTestOtp = async () => {
    const testCode = ['1', '2', '3', '4', '5', '6'];
    setOtp(testCode);
    setIsVerifyingOtp(true);
    setApiError(null);
    try {
      await authService.verifyOtp({
        email: registeredEmail || 'krishna.prajapati.rcg@gmail.com',
        otp: '123456'
      });
      setApiSuccess('Email verified successfully! Please choose your platform role.');
      setTimeout(() => {
        setCurrentStep(3);
        setApiSuccess(null);
      }, 500);
    } catch (err) {
      setApiError(err?.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Dynamic password validation state for the 4 requirements in the reference photo
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecialOrNum = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasSpecialOrNum;

  // Step 1: Submit Account Details
  const onAccountDetailsSubmit = async (data) => {
    setApiError(null);
    setApiSuccess(null);

    if (!isPasswordValid) {
      setApiError('Please satisfy all password security criteria.');
      return;
    }

    try {
      const response = await authService.signup({
        fullName: data.fullName,
        email: data.email,
        password,
        role: 'supplier'
      });

      const { user, token } = response.data?.data || response.data;
      const roleUpper = (user?.role || 'supplier').toUpperCase();
      login(user, token, roleUpper);

      setRegisteredEmail(data.email);
      setOtpTimer(45);
      
      // Advance to Step 2: OTP Verification
      setCurrentStep(2);
      setApiSuccess(`A 6-digit verification code has been dispatched to ${data.email}`);
    } catch (err) {
      console.error('Signup error:', err);
      setApiError(err?.message || 'Registration failed. Please verify your details or try again.');
    }
  };

  // OTP Input Handlers
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pasted.length, 5);
      otpInputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (otpTimer > 0 || isResending) return;
    setIsResending(true);
    setApiError(null);
    try {
      await authService.sendOtp(registeredEmail || 'user@example.com');
      setOtpTimer(45);
      setApiSuccess(`A fresh 6-digit verification code has been dispatched to ${registeredEmail}`);
    } catch (e) {
      setApiError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Step 2: Submit OTP Verification
  const onVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setApiError('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsVerifyingOtp(true);
    setApiError(null);

    try {
      await authService.verifyOtp({
        email: registeredEmail || 'krishna.prajapati.rcg@gmail.com',
        otp: fullCode
      });

      setApiSuccess('Email verified successfully! Please choose your platform role.');
      // Advance to Step 3: Choose Role
      setTimeout(() => {
        setCurrentStep(3);
        setApiSuccess(null);
      }, 600);
    } catch (err) {
      setApiError(err?.message || 'Invalid verification code. Please check or use code 123456.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Step 3: Choose Role & Route to Role-Specific Onboarding
  const handleSelectRole = (roleKey, targetRoute) => {
    selectRole(roleKey);
    navigate(targetRoute);
  };

  return (
    <div 
      className="h-screen max-h-screen w-full relative bg-cover bg-center font-sans text-slate-900 selection:bg-[#10b981] selection:text-white flex flex-col justify-between overflow-hidden"
      style={{ backgroundImage: `url(${cleanBg})` }}
    >
      {/* Background Dark Overlay on Left Side */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-950/60 to-transparent lg:w-[58%] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* TOP BAR: HEADER & LOGIN LINK                                              */}
      {/* ========================================================================= */}
      <header className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between relative z-30 shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] flex items-center justify-center text-white shadow-md">
            <Leaf className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
              Carbon<span className="text-[#10b981]">Sphere</span>
            </span>
            <span className="text-[9px] font-medium tracking-wide text-emerald-200/80 -mt-1 hidden sm:block">
              Connect. Trade. Reuse. For a Cleaner Tomorrow.
            </span>
          </div>
        </Link>

        {/* Top-Right Login Link */}
        <div className="text-xs font-medium text-slate-800 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-xs">
          <span className="text-slate-600">Already have an account? </span>
          <Link to="/login" className="font-bold text-[#0e6245] hover:underline">
            Login
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT SPLIT LAYOUT (EQUAL SIDE SPACING)                            */}
      {/* ========================================================================= */}
      <main className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-1 sm:py-2 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-between relative z-20 min-h-0">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: BRAND STORY & TELEMETRY VALUES                             */}
        {/* ======================================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-3.5 text-white pr-0 lg:pr-4">
          
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-emerald-300">
              <span className="w-5 h-[2px] bg-[#10b981]"></span>
              <span>BE A PART OF THE CHANGE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Create Your<br />
              Account<br />
              for a <span className="text-[#10b981]">Cleaner</span><br />
              <span className="text-[#10b981]">Tomorrow</span>
            </h1>

            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-md">
              Join thousands of businesses and innovators building a sustainable, low-carbon future together.
            </p>
          </div>

          {/* 3 Circular Value Items */}
          <div className="space-y-2.5 max-w-md">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm backdrop-blur-xs">
                <Leaf className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Verified & Trusted Network</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Work with genuine partners</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm backdrop-blur-xs">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Real Climate Impact</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Turn emissions into opportunities</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm backdrop-blur-xs">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">A Greener Economy</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Together for a sustainable tomorrow</p>
              </div>
            </div>
          </div>

          {/* Bottom Stats Strip */}
          <div className="flex flex-wrap items-center gap-5 pt-1 text-white">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#10b981]">
                <Leaf className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black leading-tight">2.5M+</div>
                <p className="text-[9px] text-emerald-200/70">Tons CO2 Reused</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#10b981]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black leading-tight">500+</div>
                <p className="text-[9px] text-emerald-200/70">Verified Partners</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#10b981]">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black leading-tight">120+</div>
                <p className="text-[9px] text-emerald-200/70">Transactions</p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: REGISTRATION CARD                                         */}
        {/* ======================================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative">
          
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_16px_50px_rgba(0,0,0,0.12)] p-5 sm:p-6 max-w-md w-full space-y-3 relative z-10">
            
            {/* Card Header */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-lg font-black text-slate-900 tracking-tight">CarbonSphere</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-0.5">
                {currentStep === 1 && 'Create Your Account'}
                {currentStep === 2 && 'Verify Your Email'}
                {currentStep === 3 && 'Choose Your Role'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {currentStep === 1 && 'Join CarbonSphere and be part of a sustainable future.'}
                {currentStep === 2 && `Enter the 6-digit code sent to ${registeredEmail || 'your email'}.`}
                {currentStep === 3 && 'Select your organization role to start onboarding.'}
              </p>
            </div>

            {/* Stepper Progress Bar (1. Account Details, 2. Verification, 3. Choose Role) */}
            <div className="pt-0.5">
              <div className="flex items-center justify-between relative max-w-xs mx-auto">
                <div className="absolute left-6 right-6 top-3 h-[1.5px] bg-slate-100 -z-0">
                  <div 
                    className="h-full bg-[#0e6245] transition-all duration-300"
                    style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                  />
                </div>

                {/* Step 1 */}
                <div className="flex flex-col items-center relative z-10 cursor-pointer" onClick={() => setCurrentStep(1)}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    currentStep >= 1 ? 'bg-[#0e6245] text-white shadow-xs ring-4 ring-emerald-50' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {currentStep > 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : '1'}
                  </div>
                  <span className={`text-[9px] font-bold mt-0.5 ${currentStep === 1 ? 'text-[#0e6245]' : 'text-slate-400'}`}>
                    Account Details
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center relative z-10 cursor-pointer" onClick={() => currentStep >= 2 && setCurrentStep(2)}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    currentStep >= 2 ? 'bg-[#0e6245] text-white shadow-xs ring-4 ring-emerald-50' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {currentStep > 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : '2'}
                  </div>
                  <span className={`text-[9px] font-medium mt-0.5 ${currentStep === 2 ? 'text-[#0e6245] font-bold' : 'text-slate-400'}`}>
                    Verification
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center relative z-10 cursor-pointer" onClick={() => currentStep >= 3 && setCurrentStep(3)}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    currentStep >= 3 ? 'bg-[#0e6245] text-white shadow-xs ring-4 ring-emerald-50' : 'bg-slate-100 text-slate-400'
                  }`}>
                    3
                  </div>
                  <span className={`text-[9px] font-medium mt-0.5 ${currentStep === 3 ? 'text-[#0e6245] font-bold' : 'text-slate-400'}`}>
                    Choose Role
                  </span>
                </div>
              </div>
            </div>

            {/* Status Alert Banners */}
            {apiError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                  <div className="space-y-1 leading-snug">
                    <p className="font-semibold text-red-800">{apiError}</p>
                    <p className="text-[11px] text-red-600">
                      If Google blocked with <span className="font-mono bg-red-100 px-1 py-0.5 rounded">origin_mismatch</span>, add <span className="font-mono font-bold">http://localhost:3000</span> to <em>Authorized JavaScript Origins</em> in Google Cloud Console.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDevGoogleSignup}
                  className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-medium py-1.5 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>One-Click Sign Up as Krishna Prajapati</span>
                </button>
              </div>
            )}
            {apiSuccess && (
              <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{apiSuccess}</span>
              </div>
            )}

            {/* =================================================================== */}
            {/* STEP 1: ACCOUNT DETAILS                                             */}
            {/* =================================================================== */}
            {currentStep === 1 && (
              <>
                <form onSubmit={handleSubmit(onAccountDetailsSubmit)} className="space-y-2.5 pt-0.5">
                  <div className="space-y-0.5">
                    <label className="block text-[11px] font-semibold text-slate-700">Full Name</label>
                    <div className="border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-[#0e9f6e] focus-within:border-transparent transition-all">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
                        {...register('fullName', { required: 'Full name is required' })}
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="block text-[11px] font-semibold text-slate-700">Email Address</label>
                    <div className="border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-[#0e9f6e] focus-within:border-transparent transition-all">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
                        {...register('email', { required: 'Email is required' })}
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="block text-[11px] font-semibold text-slate-700">Password</label>
                    <div className="border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-[#0e9f6e] focus-within:border-transparent transition-all">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* 4 Password Validation Requirements */}
                  <div className="grid grid-cols-2 gap-x-2.5 gap-y-1 pt-0.5 text-[10px]">
                    <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                      <CheckCircle2 className={`w-3 h-3 ${hasMinLength ? 'text-[#10b981]' : 'text-slate-300'}`} />
                      <span>At least 8 characters</span>
                    </div>

                    <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                      <CheckCircle2 className={`w-3 h-3 ${hasUpper ? 'text-[#10b981]' : 'text-slate-300'}`} />
                      <span>One uppercase letter</span>
                    </div>

                    <div className={`flex items-center gap-1.5 ${hasSpecialOrNum ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                      <CheckCircle2 className={`w-3 h-3 ${hasSpecialOrNum ? 'text-[#10b981]' : 'text-slate-300'}`} />
                      <span className="truncate">Number & special char</span>
                    </div>

                    <div className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                      <CheckCircle2 className={`w-3 h-3 ${hasLower ? 'text-[#10b981]' : 'text-slate-300'}`} />
                      <span>One lowercase letter</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm group mt-1"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="relative flex items-center justify-center pt-0.5">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-2.5 text-[9px] uppercase font-bold text-slate-400 absolute">OR</span>
                </div>

                <div className="space-y-2">
                  <button 
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <button 
                    type="button"
                    onClick={handleDevGoogleSignup}
                    className="w-full bg-[#eef8f2] hover:bg-[#e1f3e8] border border-[#c3e4cc] text-[#0e6245] text-[11px] font-semibold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    title="Bypasses Google OAuth origin mismatch restriction for local development"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0e6245]" />
                    <span>One-Click Sign Up as Krishna (Pre-verified)</span>
                  </button>
                </div>
              </>
            )}

            {/* =================================================================== */}
            {/* STEP 2: OTP VERIFICATION                                            */}
            {/* =================================================================== */}
            {currentStep === 2 && (
              <div className="space-y-4 pt-1">
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-center space-y-1">
                  <div className="w-9 h-9 rounded-full bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center mx-auto shadow-xs">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Verification Code</p>
                  <p className="text-[11px] text-slate-500">
                    Enter the 6 digits sent to <span className="font-semibold text-slate-800">{registeredEmail}</span>
                  </p>
                </div>

                {/* Quick Auto-Fill Test OTP Pill */}
                <div className="bg-[#eef8f2] border border-[#c3e4cc] rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#0e6245]">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-medium text-[11px]">Testing OTP: <strong>123456</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoFillTestOtp}
                    className="bg-[#0e6245] hover:bg-[#0b5038] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors shadow-xs"
                  >
                    Auto-Fill & Verify
                  </button>
                </div>

                {/* 6-Digit OTP Input Fields */}
                <div className="flex items-center justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-12 text-center text-lg font-black bg-white border border-slate-200 rounded-xl focus:border-[#0e6245] focus:ring-2 focus:ring-[#0e6245]/20 outline-none transition-all"
                    />
                  ))}
                </div>

                {/* Resend Helper Row */}
                <div className="flex items-center justify-between text-[11px] px-1">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpTimer > 0 || isResending}
                    className={`font-semibold flex items-center gap-1 ${
                      otpTimer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-[#0e6245] hover:underline'
                    }`}
                  >
                    <RotateCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                    <span>{otpTimer > 0 ? `Resend in 0:${otpTimer < 10 ? '0' : ''}${otpTimer}` : 'Resend Code'}</span>
                  </button>

                  <span className="text-[10px] text-slate-400">
                    Check your email inbox / spam
                  </span>
                </div>

                {/* Verify OTP Button */}
                <button
                  type="button"
                  onClick={onVerifyOtp}
                  disabled={isVerifyingOtp}
                  className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm group"
                >
                  <span>{isVerifyingOtp ? 'Verifying Code...' : 'Verify OTP & Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-slate-500 hover:text-slate-700 inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Change email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-[#0e6245] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Skip to Role Selection</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* STEP 3: CHOOSE ROLE                                                */}
            {/* =================================================================== */}
            {currentStep === 3 && (
              <div className="space-y-2.5 pt-1">
                <p className="text-xs text-slate-600">
                  Select your role in the ecosystem to continue with customized onboarding:
                </p>

                {/* Role 1: Carbon Supplier */}
                <div 
                  onClick={() => handleSelectRole(USER_ROLES.SUPPLIER, '/onboarding/supplier')}
                  className="p-3 border-2 border-slate-200 hover:border-[#0e6245] hover:bg-emerald-50/50 rounded-2xl cursor-pointer transition-all flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0e6245]">Carbon Supplier / Producer</h4>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0e6245] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Industrial emitters, biochar producers, and DAC facilities seeking to monetize captured carbon.
                    </p>
                  </div>
                </div>

                {/* Role 2: Corporate Buyer */}
                <div 
                  onClick={() => handleSelectRole(USER_ROLES.BUYER, '/onboarding/buyer')}
                  className="p-3 border-2 border-slate-200 hover:border-cyan-600 hover:bg-cyan-50/50 rounded-2xl cursor-pointer transition-all flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-cyan-800">Corporate Carbon Buyer</h4>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Enterprises procuring verified carbon removal for Scope 1-3 net-zero targets.
                    </p>
                  </div>
                </div>

                {/* Role 3: Ecosystem Admin */}
                <div 
                  onClick={() => handleSelectRole(USER_ROLES.ADMIN, '/onboarding/admin')}
                  className="p-3 border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 rounded-2xl cursor-pointer transition-all flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800">Auditor & Ecosystem Admin</h4>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Registry supervisors and verification bodies validating telemetry and credit minting.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Privacy Policy Note */}
            <p className="text-center text-[9px] text-slate-500 pt-0.5">
              By continuing, you agree to our{' '}
              <a href="#" className="font-semibold text-emerald-800 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-emerald-800 hover:underline">Privacy Policy</a>.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
};

export default SignupPage;
