import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Leaf,
  ChevronDown,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Globe,
  BarChart3,
  CheckCircle2,
  Check,
  Building2,
  Briefcase,
  Target,
  Sparkles,
  Award,
  Bell,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';

// Assets
import heroBannerBg from '@/assets/supplier-dashboard-hero.jpg';
import netZeroSprout from '@/assets/net-zero-sprout.jpg';
import buyerIllustration from '@/assets/buyer-illustration.jpg';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', country: 'India' },
  { code: '+1', flag: '🇺🇸', country: 'USA' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+65', flag: '🇸🇬', country: 'Singapore' },
  { code: '+49', flag: '🇩🇪', country: 'Germany' }
];

export const BuyerOnboardingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Form values
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: 'Rohan Mehta',
    email: 'rohan.mehta@company.com',
    phone: '98765 43210',
    password: 'password123',

    // Step 2: Organization Details
    organizationName: 'Tata Sustainability & Carbon Solutions',
    industrySector: 'Heavy Manufacturing & Steel',
    companyRegistration: 'CIN-L27100MH1907PLC000260',
    websiteUrl: 'https://tatasustainability.com',

    // Step 3: Purpose & Preferences
    procurementTarget: '10,000 - 50,000 tCO2e/yr',
    preferredProjects: ['Afforestation & Reforestation', 'Direct Air Capture (DAC)'],
    certificationStandards: 'Gold Standard & Verra VCS',
    targetNetZeroYear: '2030',

    // Step 4: Confirm
    agreeTerms: true,
    agreeRegistryAudit: true
  });

  const stepsList = [
    { number: 1, title: 'Basic Information', subtitle: 'Tell us about yourself' },
    { number: 2, title: 'Organization Details', subtitle: 'Your company information' },
    { number: 3, title: 'Purpose & Preferences', subtitle: 'Your goals and interests' },
    { number: 4, title: 'Review & Confirm', subtitle: 'Verify your details' },
    { number: 5, title: 'Complete', subtitle: "You're all set!" }
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleProject = (project) => {
    setFormData((prev) => {
      const current = prev.preferredProjects;
      if (current.includes(project)) {
        return { ...prev, preferredProjects: current.filter((p) => p !== project) };
      } else {
        return { ...prev, preferredProjects: [...current, project] };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/role-selection');
    }
  };

  const handleFinish = () => {
    login(
      {
        email: formData.email,
        name: formData.fullName,
        role: USER_ROLES.BUYER,
        organization: formData.organizationName
      },
      'mock_buyer_token',
      USER_ROLES.BUYER
    );
    navigate('/buyer/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f5] font-sans text-slate-900 selection:bg-[#0e6245] selection:text-white flex flex-col justify-between">

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">

          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10b981] flex items-center justify-center text-white shadow-sm">
              <Leaf className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                <span>Carbon</span>
                <span className="text-[#0e9f6e]">X</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Cleaner Industries. Brighter Tomorrows.
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link to="/buyer/dashboard" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link to="/marketplace" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Marketplace</span>
            </Link>

            <Link to="/buyer/dashboard?tab=orders" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Orders</span>
            </Link>

            <Link to="/transactions" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Transactions</span>
            </Link>

            <Link to="/sustainability" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Reports</span>
            </Link>

            <Link to="/notifications" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>Messages</span>
            </Link>
          </nav>

          {/* Right Area: Notification + Profile */}
          <div className="flex items-center gap-4">

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  3
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Notifications</span>
                    <span className="text-[10px] text-emerald-600 cursor-pointer font-medium hover:underline">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-50 text-xs">
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">Registration step pending</p>
                      <p className="text-[11px] text-slate-500">Complete organization details for auto-verification.</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">5,000 tCO₂e Available</p>
                      <p className="text-[11px] text-slate-500">Western Ghats afforestation credits released.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#0e6245] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  KP
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">Krishna Prajapati</span>
                  <span className="text-[10px] text-slate-500">Buyer</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* Profile Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">Krishna Prajapati</p>
                    <p className="text-[11px] text-slate-500">krishna@carbonsphere.io</p>
                  </div>
                  <Link
                    to="/buyer/dashboard"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                  >
                    <span>Buyer Dashboard</span>
                  </Link>
                  <Link
                    to="/role-selection"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                  >
                    <span>Switch Role</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserDropdown(false);
                      navigate('/login');
                    }}
                    className="w-full text-left flex items-center gap-2 px-3.5 py-2 hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO BANNER                                                            */}
      {/* ========================================================================= */}
      <div className="w-full relative overflow-hidden bg-slate-900 text-white">
        {/* Background Image with Crisp Gradient Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroBannerBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-emerald-900/40" />

        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-12 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Left Text */}
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block text-[11px] font-extrabold tracking-widest text-[#10b981] uppercase">
              GET STARTED
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Welcome to CarbonX, <span className="text-[#34d399]">Buyer!</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              Join a global marketplace for verified carbon credits and make a real impact towards a sustainable future.
            </p>
          </div>

          {/* Right Slogan & Floating Badge */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 self-start md:self-center">
            <div className="text-right">
              <span className="font-serif italic text-base sm:text-lg text-emerald-200 tracking-wide block leading-tight font-medium">
                Cleaner Choices<br />Brighter Tomorrows
              </span>
            </div>

            {/* Small steps badge */}
            <div className="bg-[#0e6245]/80 backdrop-blur-md border border-emerald-400/30 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center text-[#34d399] shrink-0">
                <Leaf className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-tight">Small steps today.</p>
                <p className="text-[11px] text-emerald-200 leading-tight">A Greener tomorrow.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN ONBOARDING SECTION (3-COLUMN LAYOUT)                              */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 1: STEPPER SIDEBAR & NET ZERO CARD (3 COLS)                     */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">

            {/* Stepper Card */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-6 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight mb-5">
                Buyer Onboarding
              </h3>

              <div className="relative space-y-1">
                {stepsList.map((step, idx) => {
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;
                  const isLast = idx === stepsList.length - 1;

                  return (
                    <div key={step.number} className="relative">
                      {/* Vertical Connector Line */}
                      {!isLast && (
                        <div
                          className={`absolute left-4 top-8 -bottom-1 w-[2px] z-0 transition-colors ${
                            isCompleted ? 'bg-[#0e6245]' : 'bg-slate-200'
                          }`}
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => setCurrentStep(step.number)}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all relative z-10 ${
                          isActive
                            ? 'bg-[#eaf5ef] border border-emerald-200/80 shadow-xs'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Step Circle Indicator */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isActive
                              ? 'bg-[#0e6245] text-white shadow-sm'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                        </div>

                        {/* Step Text */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p
                            className={`text-xs font-bold leading-tight truncate ${
                              isActive ? 'text-[#0e6245]' : 'text-slate-800'
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {step.subtitle}
                          </p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sprout "Together for a Net Zero Future" Card */}
            <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm flex flex-col">
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src={netZeroSprout}
                  alt="Together for a Net Zero Future"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div className="p-4 sm:p-5 space-y-2">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                  Together<br />for a Net Zero Future
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Your purchases today support a cleaner, healthier, and more sustainable planet.
                </p>
                <div className="w-10 h-1 rounded-full bg-[#0e6245] mt-3" />
              </div>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 2: ACTIVE STEP FORM (6 COLS)                                   */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[560px]">

              {/* Top Step Header */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e6245] mb-2">
                  <span>Step {currentStep} of 5</span>
                  <ArrowRight className="w-3 h-3" />
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                  {stepsList[currentStep - 1].title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  {currentStep === 1 && "Let's start with some basic details about you."}
                  {currentStep === 2 && 'Enter your company and corporate information.'}
                  {currentStep === 3 && 'Define your carbon offtake goals and sustainability interests.'}
                  {currentStep === 4 && 'Please verify your information before activation.'}
                  {currentStep === 5 && 'Your profile has been created successfully.'}
                </p>

                {/* STEP 1: BASIC INFORMATION */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="e.g. Rohan Mehta"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="rohan.mehta@company.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#0e6245]/20 focus-within:border-[#0e6245] transition-all">
                        {/* Country code selector */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="h-full px-3.5 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{selectedCountry.flag}</span>
                            <span>{selectedCountry.code}</span>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                          </button>

                          {showCountryDropdown && (
                            <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30">
                              {COUNTRY_CODES.map((c) => (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setShowCountryDropdown(false);
                                  }}
                                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-slate-50 flex items-center justify-between"
                                >
                                  <span>{c.flag} {c.country}</span>
                                  <span className="text-slate-400 font-mono">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Phone input */}
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="98765 43210"
                          className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        Use at least 8 characters with a mix of letters, numbers & symbols.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 2: ORGANIZATION DETAILS */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Organization Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange('organizationName', e.target.value)}
                          placeholder="e.g. Tata Sustainability"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Industry Sector <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.industrySector}
                          onChange={(e) => handleInputChange('industrySector', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all"
                        >
                          <option>Heavy Manufacturing & Steel</option>
                          <option>Energy, Oil & Power Utilities</option>
                          <option>Transportation, Aviation & Logistics</option>
                          <option>Cement, Glass & Chemicals</option>
                          <option>Technology, Cloud & Telecom</option>
                          <option>Consumer Goods & Retail</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Company Registration Number / CIN
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.companyRegistration}
                          onChange={(e) => handleInputChange('companyRegistration', e.target.value)}
                          placeholder="e.g. CIN-L27100MH1907PLC000260"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Corporate Website URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Globe className="w-4 h-4" />
                        </div>
                        <input
                          type="url"
                          value={formData.websiteUrl}
                          onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                          placeholder="https://company.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: PURPOSE & PREFERENCES */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Annual Carbon Offtake Target
                      </label>
                      <select
                        value={formData.procurementTarget}
                        onChange={(e) => handleInputChange('procurementTarget', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all"
                      >
                        <option>1,000 - 5,000 tCO2e/yr</option>
                        <option>5,000 - 25,000 tCO2e/yr</option>
                        <option>10,000 - 50,000 tCO2e/yr</option>
                        <option>50,000+ tCO2e/yr (Enterprise Offtake)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Preferred Carbon Credit Types
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Afforestation & Reforestation',
                          'Direct Air Capture (DAC)',
                          'Blue Carbon & Mangroves',
                          'Biochar & Carbon Removal',
                          'Renewable Biomass',
                          'Industrial Abatement'
                        ].map((proj) => {
                          const isSelected = formData.preferredProjects.includes(proj);
                          return (
                            <button
                              key={proj}
                              type="button"
                              onClick={() => toggleProject(proj)}
                              className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#eaf5ef] border-[#0e6245] text-[#0e6245]'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span className="truncate pr-1">{proj}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Preferred Registries
                        </label>
                        <input
                          type="text"
                          value={formData.certificationStandards}
                          onChange={(e) => handleInputChange('certificationStandards', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Net-Zero Target Year
                        </label>
                        <select
                          value={formData.targetNetZeroYear}
                          onChange={(e) => handleInputChange('targetNetZeroYear', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245]"
                        >
                          <option>2030</option>
                          <option>2035</option>
                          <option>2040</option>
                          <option>2050</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & CONFIRM */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500 font-medium">Buyer Representative</span>
                        <span className="font-bold text-slate-900">{formData.fullName} ({formData.email})</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500 font-medium">Organization</span>
                        <span className="font-bold text-slate-900">{formData.organizationName}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500 font-medium">Industry Sector</span>
                        <span className="font-bold text-slate-900">{formData.industrySector}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500 font-medium">Offtake Target</span>
                        <span className="font-bold text-emerald-700">{formData.procurementTarget}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Focus Projects</span>
                        <span className="font-bold text-slate-900 truncate max-w-[220px]">
                          {formData.preferredProjects.join(', ') || 'All Verified'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                          className="mt-0.5 rounded text-[#0e6245] focus:ring-[#0e6245]"
                        />
                        <span>I confirm that I am authorized to procure carbon offtakes on behalf of this company.</span>
                      </label>

                      <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreeRegistryAudit}
                          onChange={(e) => handleInputChange('agreeRegistryAudit', e.target.checked)}
                          className="mt-0.5 rounded text-[#0e6245] focus:ring-[#0e6245]"
                        />
                        <span>I accept CarbonX's registry verification protocol, smart escrow, and privacy terms.</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 5: COMPLETE */}
                {currentStep === 5 && (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0e6245] mx-auto flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        Welcome to CarbonX, {formData.fullName.split(' ')[0]}!
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Your corporate buyer profile is active. You can now explore high-durability carbon credits and issue automated purchase requests.
                      </p>
                    </div>

                    <div className="bg-[#eaf5ef] border border-emerald-200 rounded-xl p-4 max-w-md mx-auto text-left flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#0e6245] shrink-0" />
                      <div className="text-xs">
                        <p className="font-bold text-slate-900">Verified Buyer Badge Unlocked</p>
                        <p className="text-slate-600 text-[11px]">Instant settlement via Smart Contract Escrow enabled.</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0e6245] hover:bg-[#0b4d37] shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>{currentStep === 5 ? 'Go to Buyer Dashboard' : 'Next'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 3: WHY JOIN AS A BUYER & ILLUSTRATION (3 COLS)                 */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-6 shadow-sm space-y-6">

              {/* Illustrated Card with Green Pill Tag */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-[#eaf5ef] p-2">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={buyerIllustration}
                    alt="Buy Carbon Credits"
                    className="w-full h-44 object-cover object-center"
                  />

                  {/* Float Tag */}
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 border border-slate-100">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#0e6245] flex items-center justify-center">
                      <Leaf className="w-2.5 h-2.5 fill-current" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-900 leading-tight">
                      Buy<br /><span className="text-[#0e6245]">Carbon Credits</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Join as a Buyer? */}
              <div className="space-y-3.5">
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  Why Join as a Buyer?
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#eaf5ef] text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                      <Leaf className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Access verified carbon credits from trusted suppliers
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#eaf5ef] text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Support real climate action projects worldwide
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#eaf5ef] text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Track your environmental impact
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#eaf5ef] text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Be part of a transparent and secure marketplace
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Card */}
              <div className="bg-gradient-to-br from-[#f0f8f3] to-[#e4f2ea] border border-emerald-100 rounded-2xl p-4 relative overflow-hidden">
                <div className="flex items-start gap-2.5">
                  <span className="font-serif text-3xl font-black text-[#0e6245] leading-none select-none">
                    “
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 italic leading-snug">
                      “Sustainable business grows stronger together.”
                    </p>
                  </div>
                </div>

                {/* Subtle Decorative Leaf */}
                <div className="absolute -bottom-2 -right-2 text-emerald-300/40 pointer-events-none">
                  <Leaf className="w-12 h-12 fill-current transform rotate-45" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200/80 py-5 px-4 sm:px-8 lg:px-12 text-slate-500 text-xs mt-8">
        <div className="max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <Leaf className="w-4 h-4 text-[#0e9f6e] fill-current" />
              <span>Carbon<span className="text-[#0e9f6e]">X</span></span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
              <span className="hover:text-slate-600 transition-colors cursor-pointer">About</span>
              <span>|</span>
              <span className="hover:text-slate-600 transition-colors cursor-pointer">Support</span>
              <span>|</span>
              <span className="hover:text-slate-600 transition-colors cursor-pointer">Terms</span>
              <span>|</span>
              <span className="hover:text-slate-600 transition-colors cursor-pointer">Privacy</span>
            </div>
          </div>

          {/* Socials & Slogan */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="hover:text-slate-700 transition-colors" title="LinkedIn">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61Z" /></svg>
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors" title="Twitter / X">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors" title="YouTube">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>

            <span className="text-[11px] text-slate-400 font-serif italic">
              A Cleaner Planet. A Brighter Tomorrow.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default BuyerOnboardingPage;
