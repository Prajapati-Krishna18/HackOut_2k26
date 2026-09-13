import React, { useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';
import {
  Leaf,
  ChevronLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Download,
  Star,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Info,
  Globe,
  Trees,
  Users,
  ShoppingCart,
  Check,
  X,
  Send,
  Plus,
  Minus,
  Coins,
  FileCheck,
  BadgeCheck,
  AlertCircle,
  Bell
} from 'lucide-react';

// Photographic Assets
import lakeImg from '@/assets/western-ghats-lake.jpg';
import mapImg from '@/assets/western-ghats-map.jpg';
import streamImg from '@/assets/western-ghats-stream.jpg';
import sunriseImg from '@/assets/western-ghats-sunrise.jpg';
import sproutImg from '@/assets/net-zero-sprout.jpg';
import forestCanopyImg from '@/assets/forest-canopy.jpg';
import heroBannerBg from '@/assets/supplier-dashboard-hero.jpg';

export const ListingDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { user, role, logout } = useAuth();

  const isBuyerMode =
    location.pathname.startsWith('/marketplace') ||
    location.pathname.startsWith('/listings') ||
    (role || '').toUpperCase() === USER_ROLES.BUYER;

  // Navigation & User State
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Purchase Form State
  const [purchaseQuantity, setPurchaseQuantity] = useState(100);
  const pricePerTonINR = 2800;
  const pricePerTonUSD = 34;
  const maxAvailable = 500;

  // Make an Offer Form State
  const [offerPrice, setOfferPrice] = useState('2650');
  const [offerQuantity, setOfferQuantity] = useState('100');
  const [offerNotes, setOfferNotes] = useState('');

  // Contact Support State
  const [supportSubject, setSupportSubject] = useState('Listing Inquiry #CGT-001');
  const [supportMessage, setSupportMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Gallery Images List
  const galleryImages = [
    {
      id: 0,
      url: lakeImg,
      title: 'Pristine Lake & Western Ghats Canopy',
      caption: 'Aerial survey of natural water reservoir inside the conserved afforestation sector.'
    },
    {
      id: 1,
      url: sproutImg,
      title: 'Native Sapling Cultivation',
      caption: 'Community nursery nurturing indigenous Western Ghats saplings before field transplant.'
    },
    {
      id: 2,
      url: forestCanopyImg,
      title: 'Mature Reforestation Sector',
      caption: 'Continuous canopy growth contributing to high-durability carbon sequestration.'
    },
    {
      id: 3,
      url: streamImg,
      title: 'Watershed & River Stream Protection',
      caption: 'Freshwater stream ecosystem restored through riparian zone tree buffers.'
    },
    {
      id: 4,
      url: sunriseImg,
      title: 'Mountain Ridge Dawn Landscape',
      caption: 'High-elevation biodiversity sanctuary spanning Kodagu, Karnataka.'
    }
  ];

  const handleQuantityChange = (val) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1) {
      setPurchaseQuantity(1);
    } else if (num > maxAvailable) {
      setPurchaseQuantity(maxAvailable);
      showToast(`Maximum available credits: ${maxAvailable} tons`);
    } else {
      setPurchaseQuantity(num);
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    showToast(`Added ${purchaseQuantity} tons of Afforestation Credits to cart!`);
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    setIsOfferModalOpen(false);
    showToast(`Offer of ₹${Number(offerPrice).toLocaleString()} / ton for ${offerQuantity} tons submitted to GreenTech Industries!`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsContactModalOpen(false);
    showToast('Inquiry sent to supplier support team. You will receive a response in 24 hours.');
  };

  const savedPhoto = localStorage.getItem('carbonsphere_supplier_photo');

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 font-sans selection:bg-[#0e9f6e] selection:text-white flex flex-col justify-between">

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0e6245] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVIGATION BAR                                              */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 sm:px-8 lg:px-12 py-3">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-4">

          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
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

          {isBuyerMode ? (
            /* Buyer / Marketplace Navigation Links */
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
          ) : (
            /* Supplier Command Center Navigation Links */
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              <Link
                to="/supplier/dashboard"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <Trees className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/supplier/dashboard?tab=listings"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0e6245] text-white shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>My Listings</span>
              </Link>

              <Link
                to="/marketplace"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Marketplace</span>
              </Link>

              <Link
                to="/supplier/dashboard?tab=orders"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Orders</span>
              </Link>

              <Link
                to="/supplier/dashboard?tab=transactions"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Transactions</span>
              </Link>

              <Link
                to="/supplier/dashboard?tab=reports"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Reports</span>
              </Link>
            </nav>
          )}

          {/* Right Header Icons & Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell with Badge */}
            <div className="relative p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                3
              </span>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0e6245] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                KP
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">Krishna Prajapati</span>
                <span className="text-[10px] text-slate-500 leading-tight">{isBuyerMode ? 'Buyer' : 'Supplier'}</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN LISTING DETAILS CONTENT CONTAINER                                 */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 space-y-6 flex-1">

        {/* Back Link to Listings */}
        <div>
          <button
            onClick={() => navigate(isBuyerMode ? '/marketplace' : '/supplier/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0e6245] transition-colors cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{isBuyerMode ? 'Back to Marketplace' : 'Back to My Listings'}</span>
          </button>
        </div>

        {/* ======================================================================= */}
        {/* HERO TITLE & MISTY FOREST HEADER BAR                                    */}
        {/* ======================================================================= */}
        <div
          className="w-full rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden bg-cover bg-right p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 min-h-[140px]"
          style={{ backgroundImage: `url(${heroBannerBg})` }}
        >
          {/* Subtle daylight gradient fade for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:w-[65%] pointer-events-none z-0" />

          {/* Left Title & Status Badges */}
          <div className="relative z-10 space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
              Afforestation Carbon Credits – Western Ghats
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
              {/* Active Badge with pulsing dot */}
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-300/60 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>

              <span>Listed on Jan 12, 2025</span>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-slate-700 font-semibold">Listing ID: #CGT-001</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Developer:</span>
              <Link
                to="/supplier/details"
                className="font-bold text-[#0e6245] hover:underline flex items-center gap-1"
              >
                <span>GreenFuture Solutions Pvt. Ltd.</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">Verified</span>
              </Link>
            </div>
          </div>

          {/* Floating Slanted Stamp Script */}
          <div className="relative z-10 hidden xl:flex flex-col items-end pr-8 pointer-events-none transform -rotate-3">
            <span className="font-serif italic text-slate-800 text-sm font-black leading-tight drop-shadow-sm text-right">
              Trees<br />
              Today<br />
              Cleaner Air<br />
              Tomorrow
            </span>
            <div className="w-16 h-1 bg-[#0e9f6e] rounded-full mt-1" />
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2-COLUMN MAIN CONTENT: LEFT (GALLERY & DETAILS) / RIGHT (PURCHASE CARD) */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ===================================================================== */}
          {/* LEFT 8 COLUMNS: GALLERY SHOWCASE, OVERVIEW & TABBED SPECIFICATIONS    */}
          {/* ===================================================================== */}
          <div className="lg:col-span-8 space-y-6">

            {/* TOP CARD: MEDIA GALLERY & OVERVIEW SUMMARY */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Side: Photo Carousel & Thumbnails (5 cols) */}
                <div className="md:col-span-5 space-y-3">
                  {/* Main Selected Image */}
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xs cursor-zoom-in group bg-slate-100"
                  >
                    <img
                      src={galleryImages[selectedImageIndex].url}
                      alt={galleryImages[selectedImageIndex].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-lg pointer-events-none">
                      {selectedImageIndex + 1} / {galleryImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="grid grid-cols-5 gap-2">
                    {galleryImages.slice(0, 4).map((img, idx) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedImageIndex === idx
                          ? 'border-[#0e9f6e] ring-2 ring-[#0e9f6e]/30 scale-95'
                          : 'border-transparent opacity-75 hover:opacity-100 hover:border-slate-300'
                          }`}
                      >
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      </button>
                    ))}

                    {/* +3 More Badge Thumbnail */}
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent bg-slate-800 text-white flex flex-col items-center justify-center font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer group"
                    >
                      <img
                        src={galleryImages[4].url}
                        alt="More photos"
                        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40"
                      />
                      <span className="relative z-10 text-sm font-black">+3</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Project Overview Content (7 cols) */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">

                  {/* Heading & Paragraph */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                      <span className="text-lg">🌿</span>
                      <h3>Project Overview</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      This project involves large-scale tree plantation in degraded forest land in the Western Ghats.
                      It helps in carbon sequestration, biodiversity conservation, restoration of ecosystems, and supports local communities.
                    </p>
                  </div>

                  {/* 3 Info Mini Boxes */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Location */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-2.5 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                        <MapPin className="w-3 h-3 text-[#0e9f6e]" />
                        <span>Location</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">
                        Kodagu, Karnataka, India
                      </p>
                    </div>

                    {/* Project Type */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-2.5 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                        <Leaf className="w-3 h-3 text-[#0e9f6e]" />
                        <span>Project Type</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">
                        Nature Based
                      </p>
                      <span className="text-[9px] text-slate-400 block leading-none">
                        (Afforestation / Reforestation)
                      </span>
                    </div>

                    {/* Project Duration */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-2.5 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                        <Calendar className="w-3 h-3 text-[#0e9f6e]" />
                        <span>Project Duration</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">
                        Jan 2022 – Dec 2030
                      </p>
                      <span className="text-[9px] text-slate-400 block leading-none">
                        (8 years)
                      </span>
                    </div>
                  </div>

                  {/* 3 Highlighted Metric Pills */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Total Credits */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs space-y-1 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Trees className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">Total Credits</span>
                        <span className="text-xs font-black text-slate-900 leading-tight block">500 tons CO₂</span>
                      </div>
                    </div>

                    {/* Price per Ton */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs space-y-1 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Coins className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">Price per Ton</span>
                        <span className="text-xs font-black text-slate-900 leading-tight block">₹ 2,800</span>
                        <span className="text-[9px] text-slate-400 block">(~ $34 USD)</span>
                      </div>
                    </div>

                    {/* Available Credits */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs space-y-1 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">Available Credits</span>
                        <span className="text-xs font-black text-slate-900 leading-tight block">500 tons</span>
                        <span className="text-[9px] text-emerald-600 font-semibold block">(100%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Attribute Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      Nature Based
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      Verified (VCS)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                      SDG Aligned
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200/80">
                      Biodiversity
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                      Community Impact
                    </span>
                  </div>

                </div>

              </div>
            </div>

            {/* =================================================================== */}
            {/* BOTTOM SECTION: TABBED CONTENT (DETAILS, IMPACT, VERIFY, DOCS, REVIEWS) */}
            {/* =================================================================== */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">

              {/* Tab Navigation Header */}
              <div className="flex items-center gap-6 border-b border-slate-100 overflow-x-auto pb-px">
                {[
                  { id: 'details', label: 'Project Details' },
                  { id: 'impact', label: 'Impact & Benefits' },
                  { id: 'verification', label: 'Verification' },
                  { id: 'documents', label: 'Documents' },
                  { id: 'reviews', label: 'Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all relative cursor-pointer ${activeTab === tab.id
                      ? 'text-[#0e6245]'
                      : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0e6245] rounded-full animate-fade-in" />
                    )}
                  </button>
                ))}
              </div>

              {/* TAB 1: PROJECT DETAILS (DEFAULT VIEW) */}
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">

                  {/* Left Half: Detailed Information Specs Table (7 cols) */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                        i
                      </div>
                      <h4>Detailed Information</h4>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Listing ID</span>
                        <span className="font-bold text-slate-900 font-mono">#CGT-001</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Project Type</span>
                        <span className="font-semibold text-slate-900 text-right">Afforestation / Reforestation</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Standard</span>
                        <span className="font-semibold text-slate-900 text-right">Verified Carbon Standard (VCS)</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Methodology</span>
                        <span className="font-semibold text-slate-900 text-right">VM0047 – Reforestation and Afforestation</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Project Start Date</span>
                        <span className="font-semibold text-slate-900">Jan 2022</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Project End Date</span>
                        <span className="font-semibold text-slate-900">Dec 2030</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Location</span>
                        <span className="font-semibold text-slate-900 text-right">Kodagu, Karnataka, India</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Total Credits</span>
                        <span className="font-bold text-slate-900">500 tons CO₂</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium">Vintage</span>
                        <span className="font-semibold text-slate-900">2022 – 2030</span>
                      </div>

                      <div className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-500 font-medium shrink-0">Co-benefits</span>
                        <span className="font-medium text-slate-800 text-right">
                          Biodiversity conservation, soil restoration, local employment, water security
                        </span>
                      </div>

                      {/* SDG Alignment Row */}
                      <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-slate-500 font-medium shrink-0">SDG Alignment</span>
                        <div className="flex flex-wrap items-center gap-2">

                          {/* SDG 13: Climate Action */}
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#3F7E44] text-white text-[10px] font-bold shadow-2xs">
                            <span className="text-xs">13</span>
                            <div className="flex flex-col text-[8.5px] leading-tight">
                              <span>Climate</span>
                              <span>Action</span>
                            </div>
                          </div>

                          {/* SDG 15: Life on Land */}
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#56C02B] text-white text-[10px] font-bold shadow-2xs">
                            <span className="text-xs">15</span>
                            <div className="flex flex-col text-[8.5px] leading-tight">
                              <span>Life on</span>
                              <span>Land</span>
                            </div>
                          </div>

                          {/* SDG 8: Decent Work & Economic Growth */}
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#A21942] text-white text-[10px] font-bold shadow-2xs">
                            <span className="text-xs">8</span>
                            <div className="flex flex-col text-[8.5px] leading-tight">
                              <span>Decent Work</span>
                              <span>& Economic</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Half: Map Location & Project Gallery Grid (6 cols) */}
                  <div className="md:col-span-6 space-y-5">

                    {/* Location Satellite Map Card */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                          <MapPin className="w-4 h-4 text-[#0e9f6e]" />
                          <h4>Location</h4>
                        </div>

                        <a
                          href="https://www.google.com/maps/search/Kodagu,+Karnataka,+India"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-[#0e9f6e] hover:underline flex items-center gap-1"
                        >
                          <span>View on Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Map Image with Interactive Pin */}
                      <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs bg-slate-100">
                        <img
                          src={mapImg}
                          alt="Western Ghats satellite terrain map"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                        {/* Centered Map Marker Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md text-white border border-white/20 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/40 animate-ping" />
                          <div className="text-[11px] font-bold leading-tight">
                            <p>Project Location</p>
                            <p className="text-[9px] text-slate-300 font-normal">Kodagu, Karnataka</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Gallery Grid */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                          <Trees className="w-4 h-4 text-[#0e9f6e]" />
                          <h4>Project Gallery</h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsLightboxOpen(true)}
                          className="text-xs font-semibold text-[#0e9f6e] hover:underline cursor-pointer"
                        >
                          View All
                        </button>
                      </div>

                      {/* 6 Grid Photos */}
                      <div className="grid grid-cols-3 gap-2">
                        {galleryImages.map((img, idx) => (
                          <div
                            key={img.id}
                            onClick={() => {
                              setSelectedImageIndex(idx);
                              setIsLightboxOpen(true);
                            }}
                            className="relative aspect-video rounded-xl overflow-hidden border border-slate-200/80 cursor-pointer group shadow-2xs"
                          >
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          </div>
                        ))}

                        {/* +3 More Photos Tile */}
                        <div
                          onClick={() => setIsLightboxOpen(true)}
                          className="relative aspect-video rounded-xl overflow-hidden border border-slate-200/80 bg-slate-900 cursor-pointer group flex flex-col items-center justify-center text-white shadow-2xs"
                        >
                          <img
                            src={galleryImages[0].url}
                            alt="Additional"
                            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity"
                          />
                          <span className="relative z-10 font-bold text-sm">+3</span>
                          <span className="relative z-10 text-[9px] text-slate-300 font-medium">More Photos</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: IMPACT & BENEFITS */}
              {activeTab === 'impact' && (
                <div className="space-y-6 pt-2 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 space-y-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                        🌱
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Carbon Sequestration</h4>
                      <p className="text-slate-600 leading-relaxed">
                        High biological density sequestration captures an estimated 500 tonnes of atmospheric carbon dioxide annually with 100+ year durability covenants.
                      </p>
                    </div>

                    <div className="bg-cyan-50/70 border border-cyan-200/70 rounded-2xl p-4 space-y-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                        🐯
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Wildlife Corridors</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Restores continuous migratory forest canopy connecting Brahmagiri and Pushpagiri wildlife sanctuaries for Asian Elephants and endangered hornbills.
                      </p>
                    </div>

                    <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 space-y-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                        👥
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Community Employment</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Employs over 45 indigenous Kodava and tribal families in seed harvesting, organic nursery maintenance, and continuous sensor monitoring.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: VERIFICATION & AUDIT TRAIL */}
              {activeTab === 'verification' && (
                <div className="space-y-4 pt-2 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-5 h-5 text-[#0e9f6e]" />
                        <h4 className="font-bold text-slate-900 text-sm">Verra VCS Third-Party Registry</h4>
                      </div>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                        Audited & Validated
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <span className="text-slate-400 block font-medium">Registry Certificate ID</span>
                        <span className="font-mono font-bold text-slate-900">VCS-IND-2022-4587</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Designated Operating Entity (DOE)</span>
                        <span className="font-semibold text-slate-900">DNV GL Business Assurance India</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Immutable Blockchain Anchor</span>
                        <span className="font-mono text-slate-700">0x71a8...94bf2 (Polygon MRV Network)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Additionality Verification</span>
                        <span className="font-semibold text-emerald-700">100% Fully Additional (Baseline Model VM0047)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DOWNLOADABLE DOCUMENTS */}
              {activeTab === 'documents' && (
                <div className="space-y-3 pt-2 text-xs">
                  {[
                    { name: 'Project_Design_Document_PDD.pdf', size: '4.2 MB', date: 'Jan 2022' },
                    { name: 'Verra_Validation_Certificate_VCS4587.pdf', size: '1.8 MB', date: 'Mar 2022' },
                    { name: 'Third_Party_MRV_Audit_Report.pdf', size: '2.9 MB', date: 'Dec 2024' },
                    { name: 'Community_Ecosystem_Biodiversity_Study.pdf', size: '3.4 MB', date: 'Nov 2024' }
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/90 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{doc.name}</p>
                          <p className="text-[10px] text-slate-400">{doc.size} • Verified {doc.date}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast(`Downloaded ${doc.name}`)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: REVIEWS & ENDORSEMENTS */}
              {activeTab === 'reviews' && (
                <div className="space-y-4 pt-2 text-xs">
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-black text-slate-900">4.9</div>
                      <div>
                        <div className="flex items-center text-amber-500 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-500">Based on 18 verified corporate purchases</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Review modal opened')}
                      className="px-3 py-1.5 rounded-xl bg-[#0e6245] text-white font-semibold hover:bg-[#074732] transition-colors"
                    >
                      Write Review
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT 4 COLUMNS: STICKY PURCHASE CARD, SUPPLIER BIO & SUPPORT WIDGET */}
          {/* ===================================================================== */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">

            {/* CARD 1: PURCHASE CARBON CREDITS */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-5">

              {/* Card Title */}
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
                <ShoppingCart className="w-5 h-5 text-[#0e6245]" />
                <h3>Purchase Carbon Credits</h3>
              </div>

              {/* Price per Ton Highlight */}
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    ₹ {pricePerTonINR.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">/ ton</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  (~ ${pricePerTonUSD} USD)
                </p>
              </div>

              {/* Available Quantity Info */}
              <div className="flex items-center justify-between text-xs py-1 border-y border-slate-100">
                <span className="text-slate-500 font-medium">Available Quantity</span>
                <span className="font-bold text-slate-900">{maxAvailable} tons CO₂</span>
              </div>

              {/* Quantity Stepper Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Quantity (tons)
                </label>
                <div className="flex items-center border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-[#0e6245] focus-within:border-transparent transition-all">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(purchaseQuantity - 10)}
                    disabled={purchaseQuantity <= 1}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="number"
                    min="1"
                    max={maxAvailable}
                    value={purchaseQuantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-full text-center font-bold text-slate-900 text-sm focus:outline-hidden"
                  />

                  <button
                    type="button"
                    onClick={() => handleQuantityChange(purchaseQuantity + 10)}
                    disabled={purchaseQuantity >= maxAvailable}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total Calculated Price */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-slate-600">Total Price</span>
                <div className="text-right">
                  <div className="text-xl font-black text-[#0e6245]">
                    ₹ {(purchaseQuantity * pricePerTonINR).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    (~ ${(purchaseQuantity * pricePerTonUSD).toLocaleString()} USD)
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2.5 pt-2">
                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-[#0e6245] hover:bg-[#074732] active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                {/* Make an Offer Button */}
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(true)}
                  className="w-full bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-800 font-bold py-3 px-4 rounded-2xl border border-slate-200/90 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
                >
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Make an Offer</span>
                </button>
              </div>

            </div>

            {/* CARD 2: SUPPLIER INFORMATION */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">

              {/* Title */}
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span className="text-base">🌿</span>
                <h4>Supplier Information</h4>
              </div>

              {/* Supplier Header */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                  <Leaf className="w-5 h-5 fill-current" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h5 className="text-xs font-bold text-slate-900">GreenTech Industries Pvt. Ltd.</h5>
                    <BadgeCheck className="w-3.5 h-3.5 text-[#0e9f6e] fill-emerald-100" />
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Verified Supplier
                  </span>
                </div>
              </div>

              {/* Supplier Metadata */}
              <div className="space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Pune, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Member since Sep 2025</span>
                </div>
              </div>

              {/* View Profile Button */}
              <Link
                to="/supplier/profile"
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold py-2.5 px-3 rounded-2xl border border-slate-200/80 flex items-center justify-center gap-1.5 transition-colors text-xs"
              >
                <span>View Supplier Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>

            </div>

            {/* CARD 3: NEED HELP? CONTACT SUPPORT */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs">
                  🎧
                </div>
                <h4>Need Help?</h4>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Have questions about this listing? Our team is here to help.
              </p>

              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 font-bold py-2.5 px-3 rounded-2xl border border-slate-200/90 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Contact Support</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* ========================================================================= */}
      {/* 3. MODAL: MAKE AN OFFER                                                   */}
      {/* ========================================================================= */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#0e6245]" />
                <h3 className="font-bold text-slate-900 text-sm">Make an Offer</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleOfferSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Offer Price per Ton (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    required
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0e6245]"
                    placeholder="2650"
                  />
                </div>
                <span className="text-[10px] text-slate-400">Original listed price: ₹2,800 / ton</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Quantity (tons)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={maxAvailable}
                  value={offerQuantity}
                  onChange={(e) => setOfferQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0e6245]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Notes / Terms (Optional)</label>
                <textarea
                  rows="3"
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                  placeholder="e.g., We are purchasing for ESG Q4 retirement and request immediate registry transfer..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0e6245]"
                />
              </div>

              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Proposed Valuation:</span>
                <span className="font-black text-emerald-800 text-sm">
                  ₹ {((Number(offerPrice) || 0) * (Number(offerQuantity) || 0)).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#0e6245] text-white font-bold hover:bg-[#074732] shadow-sm cursor-pointer"
                >
                  Submit Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: CONTACT SUPPORT & INQUIRY                                       */}
      {/* ========================================================================= */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#0e6245]" />
                <h3 className="font-bold text-slate-900 text-sm">Contact Support & Supplier</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Subject</label>
                <input
                  type="text"
                  required
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0e6245]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Your Message</label>
                <textarea
                  rows="4"
                  required
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Ask for customized verification reports, batch delivery schedules, or registry transfer details..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0e6245]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#0e6245] text-white font-bold hover:bg-[#074732] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: FULLSCREEN LIGHTBOX GALLERY                                     */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between text-white pb-4 max-w-5xl w-full mx-auto">
            <div>
              <h3 className="font-bold text-base">{galleryImages[selectedImageIndex].title}</h3>
              <p className="text-xs text-slate-400">{galleryImages[selectedImageIndex].caption}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex items-center justify-center max-w-5xl w-full mx-auto flex-1 my-4">
            <img
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].title}
              className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-auto max-w-5xl w-full mx-auto pt-2">
            {galleryImages.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${selectedImageIndex === idx ? 'border-emerald-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CLEAN MINIMAL FOOTER                                                   */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-100 py-6 px-4 sm:px-8 lg:px-12 text-slate-500 text-xs mt-12">
        <div className="max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand & Links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <Leaf className="w-4 h-4 text-[#0e9f6e] fill-current" />
              <span>Carbon<span className="text-[#0e9f6e]">Sphere</span></span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <a href="#" className="hover:text-slate-900 transition-colors">About</a>
              <span>|</span>
              <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
              <span>|</span>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <span>|</span>
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            </div>
          </div>

          {/* Socials & Tagline */}
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
              A Greener Planet. A Brighter Tomorrow.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default ListingDetailPage;
