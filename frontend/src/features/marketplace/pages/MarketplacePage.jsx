import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Leaf,
  ChevronDown,
  Search,
  SlidersHorizontal,
  MapPin,
  Heart,
  ShieldCheck,
  Globe,
  FileText,
  Users,
  Cloud,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Bell,
  X,
  ExternalLink,
  Sparkles,
  TreePine,
  Wind,
  Sun,
  Flame,
  Droplets,
  Sprout
} from 'lucide-react';

// Assets
import heroBannerBg from '@/assets/supplier-dashboard-hero.jpg';
import westernGhatsImg from '@/assets/western-ghats-lake.jpg';
import windEnergyImg from '@/assets/project-wind.jpg';
import solarPowerImg from '@/assets/project-solar.jpg';
import methaneCaptureImg from '@/assets/project-methane.jpg';
import blueCarbonImg from '@/assets/western-ghats-stream.jpg';
import agroforestryImg from '@/assets/net-zero-sprout.jpg';
import forestCanopyImg from '@/assets/forest-canopy.jpg';

export const MarketplacePage = () => {
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPill, setSelectedPill] = useState('All');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStandards, setSelectedStandards] = useState([]);
  const [priceMax, setPriceMax] = useState(5000);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [sortBy, setSortBy] = useState('Featured');
  const [favoriteProjects, setFavoriteProjects] = useState(['mkt-1']);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreTypes, setShowMoreTypes] = useState(false);
  const [showMoreStandards, setShowMoreStandards] = useState(false);

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavoriteProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Toggle project type checkbox
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Toggle certification standard checkbox
  const toggleStandard = (standard) => {
    setSelectedStandards((prev) =>
      prev.includes(standard) ? prev.filter((s) => s !== standard) : [...prev, standard]
    );
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedPill('All');
    setSelectedTypes([]);
    setSelectedStandards([]);
    setPriceMax(5000);
    setSelectedRegion('All Regions');
    setSelectedCountry('All Countries');
    setSortBy('Featured');
  };

  // Quick filter pills under hero search
  const filterPills = [
    'Forest Conservation',
    'Renewable Energy',
    'Methane Capture',
    'Clean Cookstoves',
    'Mangrove Restoration',
    'Sustainable Agriculture'
  ];

  // Project listings data
  const listingsData = [
    {
      id: 'mkt-1',
      title: 'Western Ghats Afforestation',
      location: 'Kodagu, Karnataka, India',
      category: 'Afforestation / Reforestation',
      pillCategory: 'Forest Conservation',
      tag: 'Verified',
      tagStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      price: 2800,
      available: '500 tons available',
      image: westernGhatsImg,
      standard: 'Verra (VCS)',
      link: '/marketplace/listing/CGT-001'
    },
    {
      id: 'mkt-2',
      title: 'Tamil Nadu Wind Energy',
      location: 'Coimbatore, Tamil Nadu, India',
      category: 'Renewable Energy',
      pillCategory: 'Renewable Energy',
      tag: 'Verified',
      tagStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      price: 2600,
      available: '1,000 tons available',
      image: windEnergyImg,
      standard: 'Gold Standard',
      link: '/marketplace/listing/CGT-002'
    },
    {
      id: 'mkt-3',
      title: 'Rajasthan Solar Power',
      location: 'Jodhpur, Rajasthan, India',
      category: 'Renewable Energy',
      pillCategory: 'Renewable Energy',
      tag: 'Gold Standard',
      tagStyle: 'bg-amber-50 text-amber-800 border-amber-200',
      price: 2750,
      available: '750 tons available',
      image: solarPowerImg,
      standard: 'Gold Standard',
      link: '/marketplace/listing/CGT-003'
    },
    {
      id: 'mkt-4',
      title: 'Sundarbans Blue Carbon',
      location: 'Sundarbans, West Bengal, India',
      category: 'Mangrove Restoration',
      pillCategory: 'Mangrove Restoration',
      tag: 'Verified',
      tagStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      price: 3000,
      available: '400 tons available',
      image: blueCarbonImg,
      standard: 'Plan Vivo',
      link: '/marketplace/listing/CGT-004'
    },
    {
      id: 'mkt-5',
      title: 'Pune Methane Capture',
      location: 'Pune, Maharashtra, India',
      category: 'Methane Capture',
      pillCategory: 'Methane Capture',
      tag: 'Verra (VCS)',
      tagStyle: 'bg-blue-50 text-blue-800 border-blue-200',
      price: 2500,
      available: '600 tons available',
      image: methaneCaptureImg,
      standard: 'Verra (VCS)',
      link: '/marketplace/listing/CGT-005'
    },
    {
      id: 'mkt-6',
      title: 'Community Agroforestry',
      location: 'Bastar, Chhattisgarh, India',
      category: 'Sustainable Agriculture',
      pillCategory: 'Sustainable Agriculture',
      tag: 'Verified',
      tagStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      price: 2200,
      available: '1,200 tons available',
      image: agroforestryImg,
      standard: 'Climate Action Reserve (CAR)',
      link: '/marketplace/listing/CGT-006'
    }
  ];

  // Filter listings
  const filteredListings = listingsData.filter((item) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Pill selection
    if (selectedPill !== 'All' && item.pillCategory !== selectedPill) {
      return false;
    }

    // Type checkbox filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.category)) {
      return false;
    }

    // Standard checkbox filter
    if (selectedStandards.length > 0 && !selectedStandards.includes(item.standard)) {
      return false;
    }

    // Price range
    if (item.price > priceMax) {
      return false;
    }

    return true;
  });

  // Sort filtered listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0; // Default Featured
  });

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
                      <p className="font-semibold text-slate-800">500t Western Ghats available</p>
                      <p className="text-[11px] text-slate-500">New batch certified under Verra VCS.</p>
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
      {/* 2. HERO BANNER                                                            */}
      {/* ========================================================================= */}
      <div className="w-full relative overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 transform scale-105"
          style={{ backgroundImage: `url(${heroBannerBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/65 to-emerald-900/35" />

        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-12 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

          {/* Left Side: Title, Subtitle, Search, Quick Filters */}
          <div className="space-y-4 max-w-3xl flex-1">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Marketplace
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-emerald-200 mt-1">
                Invest in Verified Carbon Credits
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 font-medium">
                Support sustainable projects. Make a real impact. Build a cleaner, greener tomorrow.
              </p>
            </div>

            {/* Search Input Bar with Inner Button */}
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-white/40 overflow-hidden p-1.5 max-w-2xl">
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, type, location, or supplier..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1.5"
              />
              <button
                type="button"
                className="bg-[#0e6245] hover:bg-[#094732] text-white text-xs font-bold px-6 py-2 rounded-lg transition-colors shadow-xs"
              >
                Search
              </button>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedPill('All')}
                className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all ${
                  selectedPill === 'All'
                    ? 'bg-white text-slate-900 border-white'
                    : 'bg-black/20 text-white/90 border-white/20 hover:bg-black/40'
                }`}
              >
                All Projects
              </button>

              {filterPills.map((pill) => {
                const isActive = selectedPill === pill;
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setSelectedPill(isActive ? 'All' : pill)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all ${
                      isActive
                        ? 'bg-white text-slate-900 border-white'
                        : 'bg-black/20 text-white/90 border-white/20 hover:bg-black/40'
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}

              <button
                type="button"
                className="text-[11px] font-semibold text-emerald-200/90 hover:text-white px-2 py-1 flex items-center gap-0.5"
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Side: Slogan & 4-Stat Floating Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 shrink-0">
            <div className="text-left lg:text-right">
              <span className="font-serif italic text-sm sm:text-base text-emerald-200 tracking-wide block leading-tight font-medium">
                Cleaner<br />Choices<br />Brighter<br />Tomorrows
              </span>
            </div>

            {/* 4 Stats Floating Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 text-slate-900 space-y-3.5 w-full sm:w-64">
              {/* Stat 1: 1,200+ Verified Projects */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 leading-tight">1,200+</span>
                  <p className="text-[11px] font-medium text-slate-500 leading-none">Verified Projects</p>
                </div>
              </div>

              {/* Stat 2: 250+ Trusted Suppliers */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 leading-tight">250+</span>
                  <p className="text-[11px] font-medium text-slate-500 leading-none">Trusted Suppliers</p>
                </div>
              </div>

              {/* Stat 3: 40+ Countries */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 leading-tight">40+</span>
                  <p className="text-[11px] font-medium text-slate-500 leading-none">Countries</p>
                </div>
              </div>

              {/* Stat 4: 5M+ Tons CO2 Available */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 leading-tight">5M+</span>
                  <p className="text-[11px] font-medium text-slate-500 leading-none">Tons of CO₂ Available</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: FILTERS SIDEBAR + PROJECTS GRID + RIGHT SIDEBAR           */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT: FILTERS SIDEBAR (~260px)                                        */}
          {/* --------------------------------------------------------------------- */}
          <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-6">

            {/* Header: Filters + Clear All */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0e6245]" />
                <h3 className="text-sm font-extrabold text-slate-900">Filters</h3>
              </div>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Section 1: Project Type */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Project Type
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                {[
                  'Afforestation / Reforestation',
                  'Renewable Energy',
                  'Methane Capture',
                  'Clean Cookstoves',
                  'Sustainable Agriculture'
                ].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="rounded text-[#0e6245] focus:ring-[#0e6245] w-3.5 h-3.5"
                    />
                    <span className="leading-tight">{type}</span>
                  </label>
                ))}

                {showMoreTypes && (
                  <div className="space-y-2 pt-1">
                    {[
                      'Mangrove Restoration',
                      'Direct Air Capture (DAC)',
                      'Biochar & Soil Carbon'
                    ].map((type) => (
                      <label key={type} className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleType(type)}
                          className="rounded text-[#0e6245] focus:ring-[#0e6245] w-3.5 h-3.5"
                        />
                        <span className="leading-tight">{type}</span>
                      </label>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowMoreTypes(!showMoreTypes)}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 pt-1"
                >
                  <span>{showMoreTypes ? 'Show Less' : 'Show More'}</span>
                  <ChevronDown className={`w-3 h-3 transform transition-transform ${showMoreTypes ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Section 2: Price Range (per ton) */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Price Range (per ton)
                </h4>
                <span className="text-xs font-mono font-bold text-[#0e6245]">₹{priceMax}</span>
              </div>

              {/* Slider bar */}
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#0e6245] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Section 3: Location */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Location
              </h4>

              <div className="space-y-2">
                {/* Region Dropdown */}
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0e6245]"
                >
                  <option>Select Region</option>
                  <option>South Asia</option>
                  <option>Southeast Asia</option>
                  <option>Middle East</option>
                  <option>Africa</option>
                  <option>Latin America</option>
                </select>

                {/* Country Dropdown */}
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0e6245]"
                >
                  <option>Select Country</option>
                  <option>India</option>
                  <option>Indonesia</option>
                  <option>Kenya</option>
                  <option>Brazil</option>
                  <option>United Arab Emirates</option>
                </select>
              </div>
            </div>

            {/* Section 4: Certification Standard */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Certification Standard
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                {[
                  'Verra (VCS)',
                  'Gold Standard',
                  'Climate Action Reserve (CAR)',
                  'Plan Vivo'
                ].map((standard) => (
                  <label key={standard} className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedStandards.includes(standard)}
                      onChange={() => toggleStandard(standard)}
                      className="rounded text-[#0e6245] focus:ring-[#0e6245] w-3.5 h-3.5"
                    />
                    <span className="leading-tight">{standard}</span>
                  </label>
                ))}

                {showMoreStandards && (
                  <div className="space-y-2 pt-1">
                    {['Puro.earth CORC', 'Global Carbon Council (GCC)'].map((standard) => (
                      <label key={standard} className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={selectedStandards.includes(standard)}
                          onChange={() => toggleStandard(standard)}
                          className="rounded text-[#0e6245] focus:ring-[#0e6245] w-3.5 h-3.5"
                        />
                        <span className="leading-tight">{standard}</span>
                      </label>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowMoreStandards(!showMoreStandards)}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 pt-1"
                >
                  <span>{showMoreStandards ? 'Show Less' : 'Show More'}</span>
                  <ChevronDown className={`w-3 h-3 transform transition-transform ${showMoreStandards ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* CENTER: ALL CARBON CREDITS (3-COLUMN GRID)                            */}
          {/* --------------------------------------------------------------------- */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Top Bar: Title + Subtitle + Sort Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  All Carbon Credits
                </h3>
                <p className="text-xs text-slate-500">
                  Browse verified carbon credit projects from around the world.
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-400 font-medium">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none shadow-xs"
                >
                  <option value="Featured">Featured</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* 6 Cards Grid (3 Columns) */}
            {sortedListings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/70 p-12 text-center space-y-3">
                <Leaf className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-800 text-sm">No carbon projects match your criteria.</p>
                <p className="text-xs text-slate-400">Try adjusting your filters or search terms.</p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-2 px-4 py-1.5 rounded-xl bg-emerald-50 text-[#0e6245] font-bold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedListings.map((item) => {
                  const isFav = favoriteProjects.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200/80 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      {/* Image Thumbnail */}
                      <div className="h-36 w-full relative overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Top Category Badge */}
                        <div className="absolute top-2.5 left-2.5">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs ${item.tagStyle}`}>
                            {item.tag}
                          </span>
                        </div>

                        {/* Favorite Button */}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-xs"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'text-red-500 fill-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 leading-snug">
                            {item.title}
                          </h4>

                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                            <Leaf className="w-3 h-3 text-[#0e6245] shrink-0" />
                            <span className="truncate">{item.category}</span>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-black text-[#0e6245]">₹ {item.price.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-normal"> / ton</span>
                            <p className="text-[10px] text-slate-400 mt-0.5">{item.available}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => navigate(item.link)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#0e6245] hover:text-[#0e6245] text-xs font-bold text-slate-700 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT: WHY BUY CARD & BE PART OF GREENER PLANET (~280px)              */}
          {/* --------------------------------------------------------------------- */}
          <div className="w-full lg:w-72 shrink-0 space-y-6">

            {/* Card 1: Why Buy from CarbonX? */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#0e6245] fill-current" />
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                  Why Buy from CarbonX?
                </h4>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-slate-600 font-medium leading-tight pt-1">
                    Verified & certified projects
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                    <Leaf className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-slate-600 font-medium leading-tight pt-1">
                    Transparent pricing
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-slate-600 font-medium leading-tight pt-1">
                    Real impact tracking
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-slate-600 font-medium leading-tight pt-1">
                    Global project access
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-slate-600 font-medium leading-tight pt-1">
                    Support local communities
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Be Part of a Greener Planet */}
            <div className="rounded-2xl overflow-hidden relative shadow-sm text-white min-h-[220px] flex flex-col justify-end">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${forestCanopyImg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />

              <div className="relative z-10 p-5 space-y-2">
                <h4 className="text-sm sm:text-base font-black leading-snug">
                  Be Part of<br />a Greener Planet
                </h4>
                <p className="text-[11px] text-emerald-200/90 leading-relaxed font-medium">
                  Every credit you purchase helps build a sustainable future.
                </p>

                <button
                  type="button"
                  onClick={() => navigate('/buyer/dashboard')}
                  className="mt-2 bg-white text-slate-900 text-xs font-bold py-1.5 px-3.5 rounded-full hover:bg-emerald-50 transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM HIGHLIGHTS BANNER (4 COLUMNS)                                   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#eaf5ef] border-t border-b border-emerald-100/80 py-6 px-4 sm:px-8 lg:px-12 my-6">
        <div className="max-w-[1536px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Feature 1 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0e6245] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 leading-tight">Verified Projects</h5>
              <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                All projects undergo strict verification and certification.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0e6245] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 leading-tight">Real Climate Impact</h5>
              <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                Support projects that create measurable environmental benefits.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0e6245] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 leading-tight">Trusted Suppliers</h5>
              <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                Work with reliable and transparent project developers.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0e6245] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 leading-tight">A Sustainable Future</h5>
              <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                Together, we can build a cleaner, healthier planet.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200/80 py-5 px-4 sm:px-8 lg:px-12 text-slate-500 text-xs">
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

export default MarketplacePage;
