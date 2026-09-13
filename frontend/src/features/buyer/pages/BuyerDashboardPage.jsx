import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Leaf,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Cloud,
  FileText,
  Heart,
  Star,
  MapPin,
  TrendingUp,
  BarChart3,
  Calendar,
  Eye,
  ArrowRight,
  ChevronRight,
  Zap,
  ShoppingBag,
  Package,
  CreditCard,
  Award,
  Settings,
  HelpCircle,
  Lightbulb,
  Headphones,
  Trees,
  CheckCircle2,
  Clock,
  ExternalLink,
  Bell,
  ChevronLeft,
  X
} from 'lucide-react';

// Assets
import heroBannerBg from '@/assets/supplier-dashboard-hero.jpg';
import westernGhatsImg from '@/assets/western-ghats-sunrise.jpg';
import windEnergyImg from '@/assets/project-wind.jpg';
import solarPowerImg from '@/assets/project-solar.jpg';
import methaneCaptureImg from '@/assets/project-methane.jpg';
import sustainabilityTipImg from '@/assets/sustainability-tip.jpg';
import netZeroSprout from '@/assets/net-zero-sprout.jpg';
import forestCanopyImg from '@/assets/forest-canopy.jpg';
import lakeImg from '@/assets/western-ghats-lake.jpg';

export const BuyerDashboardPage = () => {
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [favoriteProjects, setFavoriteProjects] = useState(['proj-1']);
  const [tipIndex, setTipIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavoriteProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Sustainability Tips carousel data
  const sustainabilityTips = [
    {
      title: 'Support nature-based solutions for a healthier planet.',
      tag: 'Eco Tip 1'
    },
    {
      title: 'Electrify heavy machinery to cut Scope 1 emissions by 35%.',
      tag: 'Eco Tip 2'
    },
    {
      title: 'Combine afforestation credits with direct air capture for permanence.',
      tag: 'Eco Tip 3'
    }
  ];

  // Featured projects
  const featuredProjects = [
    {
      id: 'proj-1',
      title: 'Western Ghats Afforestation',
      category: 'Forestation',
      tagColor: 'bg-emerald-50 text-[#0e6245] border-emerald-200',
      location: 'Kodagu, Karnataka',
      volume: '500 tons CO₂',
      price: '₹ 2,800',
      image: westernGhatsImg,
      link: '/supplier/listings/CGT-001'
    },
    {
      id: 'proj-2',
      title: 'Tamil Nadu Wind Energy',
      category: 'Renewable Energy',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      location: 'Coimbatore, Tamil Nadu',
      volume: '1,000 tons CO₂',
      price: '₹ 2,600',
      image: windEnergyImg,
      link: '/marketplace'
    },
    {
      id: 'proj-3',
      title: 'Rajasthan Solar Power',
      category: 'Solar',
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
      location: 'Jodhpur, Rajasthan',
      volume: '750 tons CO₂',
      price: '₹ 2,750',
      image: solarPowerImg,
      link: '/marketplace'
    },
    {
      id: 'proj-4',
      title: 'Pune Methane Capture',
      category: 'Methane Capture',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      location: 'Pune, Maharashtra',
      volume: '600 tons CO₂',
      price: '₹ 2,500',
      image: methaneCaptureImg,
      link: '/marketplace'
    }
  ];

  // Recommended projects
  const recommendedProjects = [
    {
      id: 'rec-1',
      title: 'Sundarbans Blue Carbon',
      location: 'Sundarbans, West Bengal',
      volume: '400 tons CO₂',
      price: '₹ 3,000',
      image: lakeImg,
      link: '/marketplace'
    },
    {
      id: 'rec-2',
      title: 'Himalayan Reforestation',
      location: 'Uttarakhand',
      volume: '600 tons CO₂',
      price: '₹ 2,900',
      image: forestCanopyImg,
      link: '/marketplace'
    },
    {
      id: 'rec-3',
      title: 'Clean Cookstoves Initiative',
      location: 'Bihar',
      volume: '300 tons CO₂',
      price: '₹ 2,400',
      image: westernGhatsImg,
      link: '/marketplace'
    }
  ];

  // Recent orders
  const recentOrders = [
    {
      id: '#ORD-001',
      projectName: 'Western Ghats Afforestation',
      quantity: '200',
      amount: '₹ 5,60,000',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      date: 'Jan 12, 2025'
    },
    {
      id: '#ORD-002',
      projectName: 'Tamil Nadu Wind Energy',
      quantity: '300',
      amount: '₹ 7,80,000',
      status: 'Processing',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      date: 'Jan 8, 2025'
    },
    {
      id: '#ORD-003',
      projectName: 'Rajasthan Solar Power',
      quantity: '150',
      amount: '₹ 4,12,500',
      status: 'Pending',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      date: 'Jan 5, 2025'
    },
    {
      id: '#ORD-004',
      projectName: 'Pune Methane Capture',
      quantity: '250',
      amount: '₹ 6,25,000',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      date: 'Dec 20, 2024'
    },
    {
      id: '#ORD-005',
      projectName: 'Sundarbans Blue Carbon',
      quantity: '100',
      amount: '₹ 2,90,000',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      date: 'Dec 15, 2024'
    }
  ];

  // Filtered featured projects
  const filteredProjects = featuredProjects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Months data for the bar chart
  const monthsData = [
    { month: 'Jan', monthly: 110, cumulative: 110 },
    { month: 'Feb', monthly: 130, cumulative: 240 },
    { month: 'Mar', monthly: 150, cumulative: 390 },
    { month: 'Apr', monthly: 140, cumulative: 530 },
    { month: 'May', monthly: 160, cumulative: 690 },
    { month: 'Jun', monthly: 170, cumulative: 860 },
    { month: 'Jul', monthly: 160, cumulative: 1020 },
    { month: 'Aug', monthly: 180, cumulative: 1200 },
    { month: 'Sep', monthly: 210, cumulative: 1410 },
    { month: 'Oct', monthly: 220, cumulative: 1630 },
    { month: 'Nov', monthly: 240, cumulative: 1870 },
    { month: 'Dec', monthly: 210, cumulative: 2080 }
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
            <Link
              to="/buyer/dashboard"
              className="flex items-center gap-1.5 text-[#0e6245] border-b-2 border-[#0e6245] pb-1 pt-1 font-bold transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link to="/marketplace" className="flex items-center gap-1.5 hover:text-[#0e6245] transition-colors pb-1 pt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
                  0
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Notifications</span>
                    <span className="text-[10px] text-emerald-600 cursor-pointer font-medium hover:underline">Mark all read</span>
                  </div>
                  <div className="p-4 text-center text-xs text-slate-400">
                    No new unread notifications.
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
                    to="/buyer/onboarding"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                  >
                    <span>Edit Preferences</span>
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
      {/* 2. WELCOME HERO BANNER                                                     */}
      {/* ========================================================================= */}
      <div className="w-full relative overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 transform scale-105"
          style={{ backgroundImage: `url(${heroBannerBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-emerald-900/30" />

        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Left Welcome Text */}
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Welcome back, <span className="text-[#34d399]">Krishna!</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl font-medium">
              Discover and invest in verified carbon projects to make a cleaner, greener tomorrow.
            </p>
          </div>

          {/* Right Slogan & Pill Badge */}
          <div className="flex flex-col items-start md:items-end gap-2.5">
            <div className="text-left md:text-right">
              <span className="font-serif italic text-sm sm:text-base text-emerald-200 tracking-wide block leading-tight font-medium">
                Cleaner<br />Choices<br />Brighter<br />Tomorrows
              </span>
            </div>

            {/* Small actions badge */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-md border border-white/50">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-[#0e6245] shrink-0">
                <Leaf className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Small actions.</p>
                <p className="text-[11px] text-slate-500 leading-tight">Big impact.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SEARCH & FILTERS BAR                                                   */}
      {/* ========================================================================= */}
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">

          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search carbon credits by project name, type, location, or supplier..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] shadow-xs transition-all"
            />
          </div>

          {/* Filters Button */}
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Filters</span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN DASHBOARD CONTENT (2 COLUMNS: 8 COLS / 4 COLS)                    */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 space-y-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT MAIN STREAM (8 COLS / ~70%)                                      */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-8 space-y-6">

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

              {/* Card 1: Credits Purchased */}
              <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 leading-tight">12</span>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight">Credits Purchased</p>
                  <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">↑ 25% this month</p>
                </div>
              </div>

              {/* Card 2: tons CO2 Offset */}
              <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 leading-tight">1,200</span>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight">tons CO₂ Offset</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">≈ Equivalent to 240 cars/year</p>
                </div>
              </div>

              {/* Card 3: Active Orders */}
              <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 leading-tight">5</span>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight">Active Orders</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">2 pending</p>
                </div>
              </div>

              {/* Card 4: Favorite Projects */}
              <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 leading-tight">3</span>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight">Favorite Projects</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Saved for later</p>
                </div>
              </div>

            </div>

            {/* Featured Projects Section */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Featured Projects</h3>
                    <p className="text-[11px] text-slate-400">Handpicked projects that match your interests</p>
                  </div>
                </div>
                <Link
                  to="/marketplace"
                  className="text-xs font-bold text-[#0e6245] hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 4 Cards in Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {filteredProjects.map((project) => {
                  const isFav = favoriteProjects.includes(project.id);
                  return (
                    <div
                      key={project.id}
                      className="rounded-xl border border-slate-200/80 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      {/* Image Thumbnail */}
                      <div className="h-28 w-full relative overflow-hidden bg-slate-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Top Category Badge */}
                        <div className="absolute top-2 left-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs ${project.tagColor}`}>
                            {project.category}
                          </span>
                        </div>

                        {/* Favorite Button */}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(project.id)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-xs"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'text-red-500 fill-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-1 leading-snug">
                            {project.title}
                          </h4>

                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{project.location}</span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                            <Leaf className="w-3 h-3 text-[#0e6245] shrink-0" />
                            <span>{project.volume}</span>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-black text-[#0e6245]">{project.price}</span>
                            <span className="text-[10px] text-slate-400 font-normal"> / ton</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => navigate(project.link)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[#0e6245] hover:text-[#0e6245] text-[11px] font-bold text-slate-700 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Impact Over Time & Credits by Project Type (2 Side by Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Chart 1: Your Impact Over Time */}
              <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#0e6245]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Your Impact Over Time</h4>
                      <p className="text-[10px] text-slate-400">Track your carbon offset journey.</p>
                    </div>
                  </div>

                  {/* Year Dropdown */}
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                {/* Simulated Stacked Bar Chart Graphic */}
                <div className="h-44 w-full flex items-end justify-between gap-1.5 pt-6 pb-2 border-b border-slate-100">
                  {monthsData.map((d) => {
                    const monthlyHeight = Math.min(100, Math.round((d.monthly / 300) * 100));
                    const cumulativeHeight = Math.min(100, Math.round((d.cumulative / 2200) * 100));

                    return (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] rounded px-1.5 py-0.5 whitespace-nowrap z-20 pointer-events-none transition-opacity">
                          {d.month}: {d.monthly}T (Cum: {d.cumulative}T)
                        </div>

                        {/* Dual Bar */}
                        <div className="w-full flex items-end justify-center gap-0.5 h-36">
                          {/* Monthly bar */}
                          <div
                            style={{ height: `${monthlyHeight}%` }}
                            className="w-2 bg-[#a7f3d0] rounded-t-xs hover:bg-[#6ee7b7] transition-all"
                          />
                          {/* Cumulative bar */}
                          <div
                            style={{ height: `${cumulativeHeight}%` }}
                            className="w-2 bg-[#0e6245] rounded-t-xs hover:bg-[#094732] transition-all"
                          />
                        </div>

                        {/* Month Label */}
                        <span className="text-[9px] text-slate-400 font-medium">{d.month}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-5 text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a7f3d0]" />
                    <span>Monthly Offset</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0e6245]" />
                    <span>Cumulative Offset</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Credits by Project Type */}
              <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Credits by Project Type</h4>
                    <p className="text-[10px] text-slate-400">Distribution of your purchased credits.</p>
                  </div>
                </div>

                {/* Donut Chart & Legend Side by Side */}
                <div className="flex items-center justify-between gap-4 pt-2">

                  {/* SVG Donut */}
                  <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 36 36" className="w-36 h-36 transform -rotate-90">
                      {/* Forestation (40%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#0e9f6e"
                        strokeWidth="5"
                        strokeDasharray="40 60"
                        strokeDashoffset="0"
                      />
                      {/* Renewable (30%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="5"
                        strokeDasharray="30 70"
                        strokeDashoffset="-40"
                      />
                      {/* Methane (15%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="5"
                        strokeDasharray="15 85"
                        strokeDashoffset="-70"
                      />
                      {/* Clean Cookstoves (10%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#8b5cf6"
                        strokeWidth="5"
                        strokeDasharray="10 90"
                        strokeDashoffset="-85"
                      />
                      {/* Others (5%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#cbd5e1"
                        strokeWidth="5"
                        strokeDasharray="5 95"
                        strokeDashoffset="-95"
                      />
                    </svg>

                    {/* Donut Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-base font-black text-slate-900 leading-none">1,200</span>
                      <span className="text-[10px] text-slate-400 font-medium">tons CO₂</span>
                    </div>
                  </div>

                  {/* Legend List */}
                  <div className="space-y-2 text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0e9f6e]" />
                        <span className="text-slate-600 font-medium">Forestation</span>
                      </div>
                      <span className="font-bold text-slate-800">40%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                        <span className="text-slate-600 font-medium">Renewable Energy</span>
                      </div>
                      <span className="font-bold text-slate-800">30%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                        <span className="text-slate-600 font-medium">Methane Capture</span>
                      </div>
                      <span className="font-bold text-slate-800">15%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                        <span className="text-slate-600 font-medium">Clean Cookstoves</span>
                      </div>
                      <span className="font-bold text-slate-800">10%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]" />
                        <span className="text-slate-600 font-medium">Others</span>
                      </div>
                      <span className="font-bold text-slate-800">5%</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0e6245]" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Recent Orders</h3>
                    <p className="text-[11px] text-slate-400">Your latest purchases and their status.</p>
                  </div>
                </div>
                <Link
                  to="/transactions"
                  className="text-xs font-bold text-[#0e6245] hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                      <th className="pb-2.5 font-medium">Order ID</th>
                      <th className="pb-2.5 font-medium">Project Name</th>
                      <th className="pb-2.5 font-medium">Quantity (tons)</th>
                      <th className="pb-2.5 font-medium">Amount (INR)</th>
                      <th className="pb-2.5 font-medium">Status</th>
                      <th className="pb-2.5 font-medium">Date</th>
                      <th className="pb-2.5 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-mono font-semibold text-slate-900">{order.id}</td>
                        <td className="py-3 font-semibold text-slate-800">{order.projectName}</td>
                        <td className="py-3">{order.quantity}</td>
                        <td className="py-3 font-semibold text-slate-900">{order.amount}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${order.statusColor}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400 text-[11px]">{order.date}</td>
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-[11px] font-bold text-slate-700 transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommended for You Section */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#0e6245] fill-current" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Recommended for You</h3>
                    <p className="text-[11px] text-slate-400">Based on your interests and past activity.</p>
                  </div>
                </div>
                <Link
                  to="/marketplace"
                  className="text-xs font-bold text-[#0e6245] hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-slate-200/80 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="h-28 w-full relative overflow-hidden bg-slate-100">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFavorite(proj.id)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 shadow-xs"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{proj.title}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{proj.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                          <Leaf className="w-3 h-3 text-[#0e6245] shrink-0" />
                          <span>{proj.volume}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-black text-[#0e6245]">{proj.price}</span>
                          <span className="text-[10px] text-slate-400"> / ton</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigate(proj.link)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[#0e6245] hover:text-[#0e6245] text-[11px] font-bold text-slate-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT SIDEBAR (4 COLS / ~30%)                                         */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6">

            {/* Card 1: Your Impact */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e6245]">
                    <Leaf className="w-4 h-4 fill-current" />
                    <span>Your Impact</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">You've helped offset</p>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">1,200 tons of CO₂</h3>
                </div>

                {/* Tree forest icon illustration */}
                <div className="w-14 h-14 rounded-2xl bg-[#eaf5ef] flex items-center justify-center text-[#0e6245]">
                  <Trees className="w-8 h-8" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="w-full bg-slate-100 rounded-full h-2.5 mr-3 overflow-hidden">
                    <div className="bg-[#0e6245] h-full rounded-full transition-all duration-1000" style={{ width: '60%' }} />
                  </div>
                  <span className="text-[#0e6245] font-black shrink-0">60%</span>
                </div>
                <p className="text-[10px] text-slate-400">of your 2025 goal (2,000 tons)</p>
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={() => navigate('/marketplace')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Leaf className="w-3.5 h-3.5 fill-current" />
                <span>Explore Carbon Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">Quick Actions</h4>
              </div>

              <div className="space-y-1 text-xs">
                <Link
                  to="/marketplace"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-slate-400" />
                    <span>Browse Marketplace</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/transactions"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-slate-400" />
                    <span>Track My Orders</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/transactions"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span>View Transactions</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/sustainability"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>Download Certificates</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/buyer/onboarding"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Set Preferences</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Card 3: Sustainability Tips */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">Sustainability Tips</h4>
                    <p className="text-[10px] text-slate-400">Small changes make a big difference.</p>
                  </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <button
                    type="button"
                    onClick={() => setTipIndex((prev) => (prev > 0 ? prev - 1 : 2))}
                    className="p-1 hover:text-slate-800"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span>{tipIndex + 1}/3</span>
                  <button
                    type="button"
                    onClick={() => setTipIndex((prev) => (prev < 2 ? prev + 1 : 0))}
                    className="p-1 hover:text-slate-800"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Graphic */}
              <div className="rounded-xl overflow-hidden border border-slate-100 bg-emerald-50/50">
                <img
                  src={sustainabilityTipImg}
                  alt="Sustainability Tip"
                  className="w-full h-32 object-cover object-center"
                />
              </div>

              {/* Tip Text */}
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {sustainabilityTips[tipIndex].title}
              </p>
            </div>

            {/* Card 4: Need Help? */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#0e6245]" />
                <h4 className="text-xs font-extrabold text-slate-900">Need Help?</h4>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Have questions about purchasing carbon credits? Our team is here to help.
              </p>

              <button
                type="button"
                onClick={() => navigate('/notifications')}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors"
              >
                Contact Support
              </button>
            </div>

            {/* Card 5: Together for a Greener Tomorrow */}
            <div className="rounded-2xl overflow-hidden relative shadow-sm text-white">
              <div
                className="h-52 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${netZeroSprout})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-5 flex flex-col justify-end">
                <h4 className="text-sm font-black leading-snug">
                  Together<br />for a Greener Tomorrow
                </h4>
                <p className="text-[10px] text-emerald-200/90 mt-1 leading-relaxed">
                  Your choices today can create a cleaner, healthier, and more sustainable planet.
                </p>

                <button
                  type="button"
                  onClick={() => navigate('/marketplace')}
                  className="mt-3 bg-white text-slate-900 text-xs font-bold py-1.5 px-3.5 rounded-full hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1 self-start shadow-xs"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. ORDER DETAILS MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Order Details</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedOrder.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Project</span>
                <span className="font-bold text-slate-900">{selectedOrder.projectName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Volume</span>
                <span className="font-bold text-slate-900">{selectedOrder.quantity} tons CO₂e</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Total Settlement</span>
                <span className="font-bold text-emerald-700">{selectedOrder.amount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Registry Status</span>
                <span className="font-bold text-slate-900">Verra VCS Escrow Locked</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Execution Date</span>
                <span className="font-medium text-slate-700">{selectedOrder.date}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedOrder(null);
                  navigate('/sustainability');
                }}
                className="flex-1 py-2 rounded-xl bg-[#0e6245] text-white font-bold text-xs hover:bg-[#094a34] transition-colors"
              >
                Download Certificate
              </button>
            </div>
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

export default BuyerDashboardPage;
