<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Leaf,
  LayoutDashboard,
  Box,
  ShoppingCart,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  ChevronDown,
  Camera,
  CheckCircle2,
  User,
  Building2,
  Sliders,
  ShieldCheck,
  Clock,
  LogOut,
  Edit2,
  Calendar,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Check,
  Sparkles,
  ArrowRight,
  Shield,
  Save,
  CheckSquare,
  Square,
  AlertCircle
=======
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
>>>>>>> 7b52c819486b8d98c1589abd4fa3cc72946e466f
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';

// Assets
<<<<<<< HEAD
import mountainHeroBg from '@/assets/western-ghats-sunrise.jpg';
import forestBg from '@/assets/forest-canopy.jpg';

export const BuyerOnboardingPage = () => {
  const navigate = useNavigate();
  const { user, login, logout, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  // Active navigation tab on the left
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'organization' | 'preferences' | 'security' | 'notifications' | 'activity'

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState(null);

  // Editable mode flags for individual cards
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingOrg, setIsEditingOrg] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // Personal Details State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.full_name || user?.name || 'Krishna Prajapati',
    role: 'Buyer',
    email: user?.email || 'krishna.prajapati@example.com',
    dob: '12 Mar 2003',
    countryCode: '+91',
    phone: '98765 43210',
    location: 'Ahmedabad, Gujarat, India',
    avatarUrl: user?.avatar_url || null
  });

  // Organization Details State
  const [orgInfo, setOrgInfo] = useState({
    orgName: 'GreenFuture Solutions Pvt. Ltd.',
    orgType: 'Private Company',
    industry: 'Manufacturing',
    website: 'https://www.greenfuture.com',
    address: 'B-120, SG Highway, Ahmedabad, Gujarat, India - 380015'
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    projectTypes: ['Reforestation', 'Renewable Energy', 'Methane Capture'],
    regions: ['India', 'Southeast Asia', 'Global'],
    emailUpdates: true,
    smsNotifications: false,
    productRecommendations: true
  });

  // Profile Checklist items
  const [hasAvatar, setHasAvatar] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle Project Type tag
  const toggleProjectType = (type) => {
    setPreferences((prev) => {
      const exists = prev.projectTypes.includes(type);
      const updated = exists
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type];
      return { ...prev, projectTypes: updated };
    });
  };

  // Toggle Region tag
  const toggleRegion = (region) => {
    setPreferences((prev) => {
      const exists = prev.regions.includes(region);
      const updated = exists
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region];
      return { ...prev, regions: updated };
    });
  };

  // Handle Photo Upload
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPersonalInfo((prev) => ({ ...prev, avatarUrl: url }));
      setHasAvatar(true);
      showToast('Profile photo updated successfully!');
=======
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
>>>>>>> 7b52c819486b8d98c1589abd4fa3cc72946e466f
    }
  };

  // Compute completion %
  const calculateCompletion = () => {
    let score = 0;
    // Base 3 completed items in screenshot: Personal (25%), Org (25%), Prefs (30%) = 80%
    if (personalInfo.fullName && personalInfo.email && personalInfo.location) score += 25;
    if (orgInfo.orgName && orgInfo.industry && orgInfo.address) score += 25;
    if (preferences.projectTypes.length > 0 && preferences.regions.length > 0) score += 30;
    if (hasAvatar || personalInfo.avatarUrl) score += 10;
    if (isEmailVerified) score += 10;
    return score;
  };

<<<<<<< HEAD
  const completionPercentage = calculateCompletion();

  // Save changes
  const handleSaveAll = () => {
    if (updateProfile) {
      updateProfile({
        full_name: personalInfo.fullName,
        email: personalInfo.email,
        company: orgInfo.orgName,
        role: USER_ROLES.BUYER,
        avatar_url: personalInfo.avatarUrl
      });
    }
    showToast('Buyer profile settings saved successfully!');
  };

  const handleProceedToDashboard = () => {
    handleSaveAll();
    login(
      {
        email: personalInfo.email,
        name: personalInfo.fullName,
        role: 'BUYER',
        avatar_url: personalInfo.avatarUrl
      },
      'buyer_token_2026',
      USER_ROLES.BUYER
    );
    navigate('/marketplace');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const allProjectTypes = [
    'Reforestation',
    'Renewable Energy',
    'Methane Capture',
    'Direct Air Capture',
    'Biochar',
    'Ocean Alkalinization'
  ];

  const allRegions = [
    'India',
    'Southeast Asia',
    'Global',
    'North America',
    'Europe'
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans text-slate-800 selection:bg-[#10b981] selection:text-white flex flex-col">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (Pixel-accurate matching screenshot)                       */}
      {/* ========================================================================= */}
      <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10b981] flex items-center justify-center text-white shadow-sm">
              <Leaf className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                Carbon<span className="text-[#10b981]">X</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                Cleaner Industries. Brighter Tomorrows.
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/buyer/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e6245] hover:bg-slate-50 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/marketplace"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e6245] hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Marketplace</span>
            </Link>

            <Link
              to="/marketplace"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e6245] hover:bg-slate-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Orders</span>
            </Link>

            <Link
              to="/transactions"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e6245] hover:bg-slate-50 rounded-lg transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Transactions</span>
            </Link>

            <Link
              to="/sustainability"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e6245] hover:bg-slate-50 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Reports</span>
            </Link>

            <Link
              to="/notifications"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e6245] hover:bg-slate-50 rounded-lg transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Messages</span>
            </Link>
          </nav>
        </div>

        {/* Right: Notifications & Profile Pill */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button 
            type="button"
            onClick={() => showToast('You have 3 unread buyer notifications.')}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>

          {/* User Account Capsule */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#0a4833] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {personalInfo.avatarUrl ? (
                <img src={personalInfo.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                'KP'
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {personalInfo.fullName}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {personalInfo.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
=======
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

>>>>>>> 7b52c819486b8d98c1589abd4fa3cc72946e466f
        </div>
      </header>

      {/* ========================================================================= */}
<<<<<<< HEAD
      {/* 2. HERO BANNER SECTION (Mountain scenic backdrop + stylized script)       */}
      {/* ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-2">
        <div 
          className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-cover bg-center min-h-[140px] sm:min-h-[160px] flex items-center justify-between px-6 sm:px-10 py-6"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.2) 100%), url(${mountainHeroBg})` 
          }}
        >
          {/* Left: Heading & Subtitle */}
          <div className="relative z-10 max-w-lg space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Profile
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Manage your personal information, organization details, and preferences.
            </p>
          </div>

          {/* Center Calligraphic Artwork Overlay */}
          <div className="hidden md:flex flex-col items-center justify-center text-center rotate-[-6deg] select-none pointer-events-none opacity-85 z-10 mr-auto ml-12">
            <span className="font-serif italic text-lg sm:text-xl font-black text-[#0a4833] tracking-wider drop-shadow-sm">
              Cleaner
            </span>
            <span className="font-serif italic text-lg sm:text-xl font-black text-[#0e6245] tracking-wider drop-shadow-sm -mt-1">
              Choices
            </span>
            <span className="font-serif italic text-lg sm:text-xl font-black text-[#10b981] tracking-wider drop-shadow-sm -mt-1">
              Brighter
            </span>
            <span className="font-serif italic text-lg sm:text-xl font-black text-[#047857] tracking-wider drop-shadow-sm -mt-1">
              Tomorrows
            </span>
          </div>

          {/* Right: Greener Planet Floating Badge */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md border border-emerald-100/80 rounded-2xl p-3.5 shadow-md max-w-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-xs shrink-0">
              <Leaf className="w-5 h-5 fill-white" />
=======
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
>>>>>>> 7b52c819486b8d98c1589abd4fa3cc72946e466f
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
              A Greener Planet Starts with Responsible Buyers.
            </p>
          </div>

        </div>
      </div>

<<<<<<< HEAD
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a4833] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN 3-COLUMN WORKSPACE GRID                                           */}
      {/* ========================================================================= */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ===================================================================== */}
          {/* COL 1 (Left Sidebar): User Card & Navigation Tabs (3 cols)            */}
          {/* ===================================================================== */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between min-h-[580px]">
              <div className="space-y-5">
                
                {/* User Avatar & Verified Badge */}
                <div className="flex flex-col items-center text-center space-y-2.5 pt-2">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#0a4833] text-white text-2xl font-bold flex items-center justify-center shadow-md border-2 border-emerald-100 overflow-hidden">
                      {personalInfo.avatarUrl ? (
                        <img src={personalInfo.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        'KP'
                      )}
                    </div>

                    {/* Camera Upload Badge */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#0e6245] hover:scale-110 transition-all cursor-pointer"
                      title="Upload photo"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>

                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">
                      {personalInfo.fullName}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {personalInfo.role}
                    </p>
                  </div>

                  {/* Verified Account Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    <span>Verified Account</span>
                  </div>
                </div>

                {/* Sidebar Navigation Items */}
                <nav className="space-y-1 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'profile'
                        ? 'bg-[#eef8f2] text-[#0e6245] shadow-2xs font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4 text-[#0e6245]" />
                    <span>Profile Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('organization')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'organization'
                        ? 'bg-[#eef8f2] text-[#0e6245] shadow-2xs font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>Organization Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('preferences')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'preferences'
                        ? 'bg-[#eef8f2] text-[#0e6245] shadow-2xs font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Sliders className="w-4 h-4 text-slate-400" />
                    <span>Preferences</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('security');
                      showToast('Security settings: Password & 2FA are active.');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'security'
                        ? 'bg-[#eef8f2] text-[#0e6245] shadow-2xs font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    <span>Security</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('notifications');
                      showToast('Notification preferences loaded.');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'notifications'
                        ? 'bg-[#eef8f2] text-[#0e6245] shadow-2xs font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Bell className="w-4 h-4 text-slate-400" />
                    <span>Notifications</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('activity');
                      showToast('Showing recent order audit trails.');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'activity'
                        ? 'bg-[#eef8f2] text-[#0e6245] shadow-2xs font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Activity</span>
                  </button>
                </nav>
              </div>

              {/* Log Out Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ===================================================================== */}
          {/* COL 2 (Center Content): Form Detail Cards (6 cols)                    */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* ----------------------------------------------------------------- */}
            {/* CARD 1: Personal Information                                      */}
            {/* ----------------------------------------------------------------- */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#eef8f2] text-[#0e6245] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Personal Information
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Update your personal details here.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPersonal(!isEditingPersonal);
                    if (isEditingPersonal) showToast('Personal information updated!');
                  }}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  {isEditingPersonal ? <Save className="w-3 h-3 text-[#0e6245]" /> : <Edit2 className="w-3 h-3 text-slate-500" />}
                  <span>{isEditingPersonal ? 'Save' : 'Edit'}</span>
                </button>
              </div>

              {/* Form Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditingPersonal}
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    className={`w-full px-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                      isEditingPersonal
                        ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                    }`}
                  />
                </div>

                {/* Role */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">Role</label>
                  <input
                    type="text"
                    disabled
                    value={personalInfo.role}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-100/70 text-xs font-semibold text-slate-500 cursor-not-allowed"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    disabled={!isEditingPersonal}
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className={`w-full px-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                      isEditingPersonal
                        ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                    }`}
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled={!isEditingPersonal}
                      value={personalInfo.dob}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                      className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                        isEditingPersonal
                          ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                      }`}
                    />
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">Phone Number</label>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 shrink-0">
                      <span>🇮🇳</span>
                      <span>+91</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      disabled={!isEditingPersonal}
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className={`w-full px-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                        isEditingPersonal
                          ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                      }`}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled={!isEditingPersonal}
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                        isEditingPersonal
                          ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                      }`}
                    />
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* CARD 2: Organization Details                                      */}
            {/* ----------------------------------------------------------------- */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#eef8f2] text-[#0e6245] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Organization Details
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Tell us about your organization.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditingOrg(!isEditingOrg);
                    if (isEditingOrg) showToast('Organization details saved!');
                  }}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  {isEditingOrg ? <Save className="w-3 h-3 text-[#0e6245]" /> : <Edit2 className="w-3 h-3 text-slate-500" />}
                  <span>{isEditingOrg ? 'Save' : 'Edit'}</span>
                </button>
              </div>

              <div className="space-y-3 pt-1">
                {/* Row 1: 3 Columns (Org Name, Org Type, Industry) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Organization Name */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Organization Name</label>
                    <input
                      type="text"
                      disabled={!isEditingOrg}
                      value={orgInfo.orgName}
                      onChange={(e) => setOrgInfo({ ...orgInfo, orgName: e.target.value })}
                      className={`w-full px-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                        isEditingOrg
                          ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                      }`}
                    />
                  </div>

                  {/* Organization Type */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Organization Type</label>
                    <select
                      disabled={!isEditingOrg}
                      value={orgInfo.orgType}
                      onChange={(e) => setOrgInfo({ ...orgInfo, orgType: e.target.value })}
                      className={`w-full px-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                        isEditingOrg
                          ? 'bg-white border-[#0e6245] text-slate-900 font-medium'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                      }`}
                    >
                      <option value="Private Company">Private Company</option>
                      <option value="Public Enterprise">Public Enterprise</option>
                      <option value="Non-Profit Organization">Non-Profit Organization</option>
                      <option value="Government Body">Government Body</option>
                    </select>
                  </div>

                  {/* Industry */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Industry</label>
                    <select
                      disabled={!isEditingOrg}
                      value={orgInfo.industry}
                      onChange={(e) => setOrgInfo({ ...orgInfo, industry: e.target.value })}
                      className={`w-full px-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                        isEditingOrg
                          ? 'bg-white border-[#0e6245] text-slate-900 font-medium'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                      }`}
                    >
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Energy & Utilities">Energy & Utilities</option>
                      <option value="Automotive & Mobility">Automotive & Mobility</option>
                      <option value="Steel & Heavy Industry">Steel & Heavy Industry</option>
                      <option value="Technology & Cloud">Technology & Cloud</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: 2 Columns (Company Website, Address) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Company Website */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Company Website</label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled={!isEditingOrg}
                        value={orgInfo.website}
                        onChange={(e) => setOrgInfo({ ...orgInfo, website: e.target.value })}
                        className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                          isEditingOrg
                            ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                            : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                        }`}
                      />
                      <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Address</label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled={!isEditingOrg}
                        value={orgInfo.address}
                        onChange={(e) => setOrgInfo({ ...orgInfo, address: e.target.value })}
                        className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs outline-none transition-all ${
                          isEditingOrg
                            ? 'bg-white border-[#0e6245] ring-2 ring-emerald-50 text-slate-900 font-medium'
                            : 'bg-slate-50/70 border-slate-200 text-slate-700 font-medium cursor-default'
                        }`}
                      />
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* CARD 3: Preferences                                               */}
            {/* ----------------------------------------------------------------- */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#eef8f2] text-[#0e6245] flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Preferences
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Set your preferences for a better experience.
=======
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
>>>>>>> 7b52c819486b8d98c1589abd4fa3cc72946e466f
                    </p>
                  </div>
                </div>

<<<<<<< HEAD
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPreferences(!isEditingPreferences);
                    if (isEditingPreferences) showToast('Buyer preferences saved!');
                  }}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  {isEditingPreferences ? <Save className="w-3 h-3 text-[#0e6245]" /> : <Edit2 className="w-3 h-3 text-slate-500" />}
                  <span>{isEditingPreferences ? 'Save' : 'Edit'}</span>
                </button>
              </div>

              {/* 3 Columns Layout matching reference image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 items-start">
                {/* Column 1: Interested Project Types */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Interested Project Types
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {allProjectTypes.map((type) => {
                      const isSelected = preferences.projectTypes.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleProjectType(type)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-100 text-slate-800 border border-slate-300 font-semibold'
                              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Preferred Regions */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Preferred Regions
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {allRegions.map((reg) => {
                      const isSelected = preferences.regions.includes(reg);
                      return (
                        <button
                          key={reg}
                          type="button"
                          onClick={() => toggleRegion(reg)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-100 text-slate-800 border border-slate-300 font-semibold'
                              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {reg}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Communication Preferences */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Communication Preferences
                  </label>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={preferences.emailUpdates}
                        onChange={(e) => setPreferences({ ...preferences, emailUpdates: e.target.checked })}
                        className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                      />
                      <span className="text-[11px]">Email Updates</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={preferences.smsNotifications}
                        onChange={(e) => setPreferences({ ...preferences, smsNotifications: e.target.checked })}
                        className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                      />
                      <span className="text-[11px]">SMS Notifications</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={preferences.productRecommendations}
                        onChange={(e) => setPreferences({ ...preferences, productRecommendations: e.target.checked })}
                        className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                      />
                      <span className="text-[11px]">Product Recommendations</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ===================================================================== */}
          {/* COL 3 (Right Sidebar): Profile Completion Widget (3 cols)             */}
          {/* ===================================================================== */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-4 h-4 text-[#0e6245]" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Profile Completion
                </h3>
              </div>

              {/* Circular Gauge Meter (80% Default) */}
              <div className="flex flex-col items-center justify-center space-y-2 pt-1">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#f1f5f9"
                      strokeWidth="9"
                    />
                    {/* Glowing Emerald Progress Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="9"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * completionPercentage) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {completionPercentage === 100 ? 'All Set! Profile Complete' : 'Almost there!'}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Complete your profile to get the best buying experience.
                  </p>
                </div>
              </div>

              {/* Checklist Progress Items */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2.5 text-slate-800 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Personal Information</span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-800 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Organization Details</span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-800 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Preferences</span>
                </div>

                {/* Optional Task 1: Add Profile Picture */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-2.5 text-slate-600 hover:text-slate-900 text-left cursor-pointer group"
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    hasAvatar || personalInfo.avatarUrl ? 'bg-emerald-700 text-white' : 'border border-slate-300'
                  }`}>
                    {hasAvatar || personalInfo.avatarUrl ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : null}
                  </div>
                  <span className="group-hover:underline">Add Profile Picture</span>
                </button>

                {/* Optional Task 2: Verify Email */}
                <button
                  type="button"
                  onClick={() => {
                    setIsEmailVerified(true);
                    showToast('Email verified successfully!');
                  }}
                  className="w-full flex items-center gap-2.5 text-slate-600 hover:text-slate-900 text-left cursor-pointer group"
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    isEmailVerified ? 'bg-emerald-700 text-white' : 'border border-slate-300'
                  }`}>
                    {isEmailVerified ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : null}
                  </div>
                  <span className="group-hover:underline">Verify Email</span>
                </button>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleProceedToDashboard}
                  className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all text-xs group cursor-pointer"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </aside>

        </div>
      </main>

=======
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

>>>>>>> 7b52c819486b8d98c1589abd4fa3cc72946e466f
    </div>
  );
};

export default BuyerOnboardingPage;
