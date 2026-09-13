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
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';

// Assets
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
        </div>
      </header>

      {/* ========================================================================= */}
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
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
              A Greener Planet Starts with Responsible Buyers.
            </p>
          </div>
        </div>
      </div>

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
                    </p>
                  </div>
                </div>

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

    </div>
  );
};

export default BuyerOnboardingPage;
