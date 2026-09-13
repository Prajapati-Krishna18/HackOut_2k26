import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  Leaf,
  ChevronDown,
  ArrowLeft,
  MapPin,
  Calendar,
  Zap,
  Building2,
  CheckCircle2,
  Heart,
  Mail,
  Send,
  FileText,
  Clock,
  ShieldCheck,
  Users,
  Sprout,
  BarChart3,
  Globe,
  Star,
  Phone,
  ExternalLink,
  Award,
  Trees,
  Check,
  X,
  Bell,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

// Assets
import heroBannerBg from '@/assets/supplier-dashboard-hero.jpg';
import westernGhatsImg from '@/assets/western-ghats-lake.jpg';
import windEnergyImg from '@/assets/project-wind.jpg';
import solarPowerImg from '@/assets/project-solar.jpg';

export const SupplierDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Active sub-tab state
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Inquiry form state
  const [inquiryForm, setInquiryForm] = useState({
    name: 'Krishna Prajapati',
    email: 'krishna@carbonsphere.io',
    volume: '1,000',
    project: 'Western Ghats Afforestation',
    message: 'Hello, we are interested in securing forward offtakes for Q3 2025. Please provide verification documentation and bulk pricing tiers.'
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setIsInquiryModalOpen(false);
    setToastMessage('Inquiry successfully sent to GreenFuture Solutions Pvt. Ltd.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    setToastMessage(!isSaved ? 'Supplier saved to your favorites.' : 'Supplier removed from favorites.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navTabs = [
    'Overview',
    'Carbon Projects',
    'Certifications',
    'Impact',
    'Reviews (12)',
    'Contact'
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8faf9] font-sans text-slate-900 selection:bg-[#0e6245] selection:text-white flex flex-col justify-between">

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
            <Link to="/buyer/dashboard" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors pb-1 pt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link
              to="/marketplace"
              className="flex items-center gap-1.5 text-[#0e6245] border-b-2 border-[#0e6245] pb-1 pt-1 font-bold transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Marketplace</span>
            </Link>

            <Link to="/transactions" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors pb-1 pt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Orders</span>
            </Link>

            <Link to="/transactions" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors pb-1 pt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Transactions</span>
            </Link>

            <Link to="/sustainability" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors pb-1 pt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Reports</span>
            </Link>

            <Link to="/notifications" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors pb-1 pt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>Messages</span>
            </Link>
          </nav>

          {/* Right Profile & Notifications */}
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
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Notifications</span>
                    <span className="text-[10px] text-emerald-600 cursor-pointer font-medium hover:underline">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-50 text-xs">
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">GreenFuture Solutions response</p>
                      <p className="text-[11px] text-slate-500">Your inquiry regarding Western Ghats was viewed.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
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

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">Krishna Prajapati</p>
                    <p className="text-[11px] text-slate-500">Buyer Account</p>
                  </div>
                  <Link
                    to="/buyer/dashboard"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                  >
                    <span>Buyer Dashboard</span>
                  </Link>
                  <Link
                    to="/role-selection"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                  >
                    <span>Switch Role</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-red-50 text-red-600"
                  >
                    <span>Sign Out</span>
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SUPPLIER HERO BANNER                                                   */}
      {/* ========================================================================= */}
      <div className="w-full relative overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-65 transform scale-105"
          style={{ backgroundImage: `url(${heroBannerBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/70 to-emerald-900/40" />

        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 relative z-10 space-y-6">

          {/* Top Link: Back to Search Results */}
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Search Results</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* Left: Avatar + Title + Meta */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Green Leaf Avatar Badge */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center p-3 shrink-0 border border-white/80">
                <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#0e6245] to-[#10b981] flex items-center justify-center text-white">
                  <Leaf className="w-10 h-10 fill-current" />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                    GreenFuture Solutions Pvt. Ltd.
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-[#10b981]/20 border border-[#10b981]/50 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                    <span>Verified Supplier</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                  Building a Sustainable Tomorrow, Today.
                </p>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-emerald-200/90 pt-1 font-medium">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Ahmedabad, Gujarat, India</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Renewable Energy</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Member since Jan 2023</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Slogan & Sustainable Projects Pill */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
              <div className="text-left lg:text-right">
                <span className="font-serif italic text-sm sm:text-base text-emerald-200 tracking-wide block leading-tight font-medium">
                  Cleaner<br />Choices<br />Brighter<br />Tomorrows
                </span>
              </div>

              {/* Sustainable Projects Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl border border-white/60 text-slate-900">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#0e6245] shrink-0">
                  <Leaf className="w-4 h-4 fill-current" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">Sustainable Projects.</p>
                  <p className="text-[11px] text-slate-500 leading-tight">Real Climate Impact.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUB-NAV TABS & ACTION BUTTONS                                          */}
      {/* ========================================================================= */}
      <div className="w-full bg-white border-b border-slate-200/80 sticky top-16 z-40">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2.5">

          {/* Left Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto text-xs font-bold text-slate-600 no-scrollbar">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 pt-1 whitespace-nowrap transition-colors relative ${
                    isActive ? 'text-[#0e6245] font-black' : 'hover:text-slate-900'
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0e6245] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 self-end sm:self-center">
            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveToggle}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ${
                isSaved
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-red-500' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Send Inquiry Button */}
            <button
              type="button"
              onClick={() => setIsInquiryModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-[#0e6245] hover:bg-[#094732] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Inquiry</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN DETAILS CONTENT (2 COLUMNS: LEFT 8 COLS, RIGHT 4 COLS)            */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1 space-y-6">

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-[#0e6245] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: ABOUT + FEATURED PROJECTS + REVIEWS (8 COLS)             */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-8 space-y-6">

            {/* Card 1: About the Supplier */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  About the Supplier
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                GreenFuture Solutions Pvt. Ltd. is a leading developer of high-quality carbon offset projects across India,
                focused on renewable energy, afforestation, and sustainable agriculture. We work with communities, industries,
                and global partners to create measurable climate impact and a cleaner, greener tomorrow.
              </p>

              {/* 4 Feature Pills in a Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {/* Feature 1: Transparency */}
                <div className="bg-[#f8faf9] border border-slate-100 rounded-xl p-3 space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 pt-1">Transparency</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Open project data</p>
                </div>

                {/* Feature 2: Certified Projects */}
                <div className="bg-[#f8faf9] border border-slate-100 rounded-xl p-3 space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 pt-1">Certified Projects</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Globally recognized</p>
                </div>

                {/* Feature 3: Community Focus */}
                <div className="bg-[#f8faf9] border border-slate-100 rounded-xl p-3 space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 pt-1">Community Focus</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Local employment</p>
                </div>

                {/* Feature 4: Long-term Impact */}
                <div className="bg-[#f8faf9] border border-slate-100 rounded-xl p-3 space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 pt-1">Long-term Impact</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Sustainable development</p>
                </div>
              </div>
            </div>

            {/* Card 2: Featured Carbon Projects */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#0e6245] fill-current" />
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    Featured Carbon Projects
                  </h3>
                </div>
                <Link
                  to="/marketplace"
                  className="text-xs font-bold text-[#0e6245] hover:underline flex items-center gap-1"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3 Project Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Project 1 */}
                <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={westernGhatsImg}
                      alt="Western Ghats Afforestation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs bg-emerald-50 text-emerald-800 border-emerald-200">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                        Western Ghats Afforestation
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">Kodagu, Karnataka, India</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <Trees className="w-3 h-3 text-[#0e6245] shrink-0" />
                        <span className="truncate">Afforestation / Reforestation</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-[#0e6245]">₹ 2,800</span>
                        <span className="text-[10px] text-slate-400"> / ton</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">500 tons available</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate('/marketplace/listing/CGT-001')}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[#0e6245] hover:text-[#0e6245] text-[11px] font-bold text-slate-700 transition-colors flex items-center gap-0.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={windEnergyImg}
                      alt="Tamil Nadu Wind Energy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs bg-amber-50 text-amber-800 border-amber-200">
                        Gold Standard
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                        Tamil Nadu Wind Energy
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">Coimbatore, Tamil Nadu, India</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <Zap className="w-3 h-3 text-[#0e6245] shrink-0" />
                        <span className="truncate">Renewable Energy</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-[#0e6245]">₹ 2,600</span>
                        <span className="text-[10px] text-slate-400"> / ton</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">1,000 tons available</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate('/marketplace/listing/CGT-001')}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[#0e6245] hover:text-[#0e6245] text-[11px] font-bold text-slate-700 transition-colors flex items-center gap-0.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={solarPowerImg}
                      alt="Rajasthan Solar Power"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs bg-emerald-50 text-emerald-800 border-emerald-200">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                        Rajasthan Solar Power
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">Jodhpur, Rajasthan, India</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <Zap className="w-3 h-3 text-[#0e6245] shrink-0" />
                        <span className="truncate">Renewable Energy</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-[#0e6245]">₹ 2,750</span>
                        <span className="text-[10px] text-slate-400"> / ton</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">750 tons available</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate('/marketplace/listing/CGT-001')}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[#0e6245] hover:text-[#0e6245] text-[11px] font-bold text-slate-700 transition-colors flex items-center gap-0.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 3: What Buyers Say */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-black text-[#0e6245] leading-none">“</span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    What Buyers Say
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold text-[#0e6245] hover:underline flex items-center gap-1"
                >
                  <span>View All Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Review Quote Item */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    RS
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-slate-900 leading-none">Rahul Sharma</h5>
                    <p className="text-[11px] text-slate-400 font-medium">EcoTrade Ltd.</p>
                    <div className="flex items-center gap-0.5 text-amber-400 pt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 sm:pl-4">
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    “Excellent transparency and great project quality. The team is very responsive and professional.
                    We have offset over 10,000 tons through their wind energy project.”
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 font-medium shrink-0 self-end sm:self-start">
                  Jan 15, 2025
                </div>
              </div>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: QUICK STATS + CERTIFICATIONS + CONTACT (4 COLS)          */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6">

            {/* Card 1: Quick Stats */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#0e6245]" />
                <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">Quick Stats</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Stat 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 leading-tight">15+</span>
                    <p className="text-[11px] text-slate-500 leading-none">Carbon Projects</p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 leading-tight">250,000+</span>
                    <p className="text-[11px] text-slate-500 leading-none">Tons CO₂ Offset</p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 leading-tight">5</span>
                    <p className="text-[11px] text-slate-500 leading-none">Project Locations</p>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 leading-tight">4.8/5</span>
                    <p className="text-[11px] text-slate-500 leading-none">Supplier Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Certifications */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0e6245]" />
                <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">Certifications</h4>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {/* Verra */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center">
                  <div className="text-[13px] font-black tracking-widest text-[#1d4ed8] border border-[#1d4ed8] px-1.5 py-0.5 rounded">
                    VERRA
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">Verra (VCS)</span>
                </div>

                {/* Gold Standard */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center">
                  <div className="text-[11px] font-bold text-amber-800 tracking-tight leading-tight">
                    Gold Standard
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">Gold Standard</span>
                </div>

                {/* CDM UN */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">CDM</span>
                </div>
              </div>
            </div>

            {/* Card 3: Contact Supplier */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0e6245]" />
                <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">Contact Supplier</h4>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-800">+91 79 4000 1234</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href="mailto:info@greenfuture.com" className="hover:text-[#0e6245] transition-colors">
                    info@greenfuture.com
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href="https://www.greenfuture.com" target="_blank" rel="noreferrer" className="hover:text-[#0e6245] transition-colors">
                    www.greenfuture.com
                  </a>
                </div>

                <div className="flex items-start gap-2.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">B-120, SG Highway, Ahmedabad, Gujarat - 380015, India</span>
                </div>
              </div>

              {/* Bottom Send Inquiry Action */}
              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0e6245] hover:bg-[#094732] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. INQUIRY MODAL                                                          */}
      {/* ========================================================================= */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Send Inquiry to Supplier</h3>
                <p className="text-xs text-slate-400">GreenFuture Solutions Pvt. Ltd.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Name</label>
                  <input
                    type="text"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0e6245]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Work Email</label>
                  <input
                    type="email"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0e6245]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Volume Needed (tCO₂e)</label>
                  <input
                    type="text"
                    value={inquiryForm.volume}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, volume: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0e6245]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Project of Interest</label>
                  <select
                    value={inquiryForm.project}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, project: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0e6245]"
                  >
                    <option>Western Ghats Afforestation</option>
                    <option>Tamil Nadu Wind Energy</option>
                    <option>Rajasthan Solar Power</option>
                    <option>General Portfolio Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Inquiry Message</label>
                <textarea
                  rows={4}
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0e6245]"
                  required
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0e6245] hover:bg-[#094732] text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. FOOTER                                                                 */}
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

export default SupplierDetailPage;
