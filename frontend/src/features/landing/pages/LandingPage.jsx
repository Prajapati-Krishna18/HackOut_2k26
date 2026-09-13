import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ArrowRight,
  Play,
  CheckCircle2,
  Globe,
  Leaf,
  Users,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  RotateCw,
  ShieldCheck,
  BarChart3,
  Sprout,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Navigation,
  Eye,
  Mail,
  Phone,
  Send,
  Download,
  Building2,
  Check,
  ExternalLink,
  FileText,
  Award,
  MapPin,
  Maximize2
} from 'lucide-react';

// Imported photographic assets matching the reference photos
import heroBg from '@/assets/hero-bg.jpg';
import stepSupplier from '@/assets/step-supplier.jpg';
import stepTransport from '@/assets/step-transport.jpg';
import stepBuyer from '@/assets/step-buyer.jpg';
import stepReuse from '@/assets/step-reuse.jpg';
import emissionsImg from '@/assets/emissions-challenge.jpg';
import forestCanopy from '@/assets/forest-canopy.jpg';
import greenhousesImg from '@/assets/industry-greenhouses.jpg';
import algaeImg from '@/assets/industry-algae.jpg';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Active Map and Carousel States
  const [activeMapFilter, setActiveMapFilter] = useState('Suppliers');
  const [mapZoom, setMapZoom] = useState(5);
  const [mapType, setMapType] = useState('m'); // 'm' = roadmap, 'k' = satellite, 'p' = terrain
  const [isInteractive, setIsInteractive] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Modal States
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [isOpportunitiesModalOpen, setIsOpportunitiesModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification State
  const [toastMsg, setToastMsg] = useState(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    organization: '',
    role: 'Carbon Supplier',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const resourcesDropdownRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Close modals on Escape key & close dropdown on outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
        setIsContactModalOpen(false);
        setIsImpactModalOpen(false);
        setIsOpportunitiesModalOpen(false);
        setIsSearchModalOpen(false);
        setIsResourcesDropdownOpen(false);
      }
    };

    const handleOutsideClick = (e) => {
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(e.target)) {
        setIsResourcesDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    const isAnyModalOpen = isVideoOpen || isContactModalOpen || isImpactModalOpen || isOpportunitiesModalOpen || isSearchModalOpen;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoOpen, isContactModalOpen, isImpactModalOpen, isOpportunitiesModalOpen, isSearchModalOpen]);

  // Map Filter coordinates
  const getMapQuery = () => {
    switch (activeMapFilter) {
      case 'Suppliers':
        return '22.2587,71.1924'; // Gujarat Industrial Hub, India
      case 'Buyers':
        return '50.1109,8.6821'; // Frankfurt Industrial District, Germany
      case 'Logistics':
        return '51.9244,4.4777'; // Port of Rotterdam Circular Hub
      case 'Active Routes':
        return '25.2048,55.2708'; // Cross-border Middle East trade route
      default:
        return '22.2587,71.1924';
    }
  };

  const handleContactSubmit = (e) => {
    e?.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill in your name, email, and message.');
      return;
    }
    setContactSubmitted(true);
    showToast('Inquiry submitted! Our partnership team will respond within 24 hours.');
    setTimeout(() => {
      setIsContactModalOpen(false);
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', organization: '', role: 'Carbon Supplier', message: '' });
    }, 1200);
  };

  const handleViewEcosystemMap = () => {
    const el = document.getElementById('ecosystem-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsInteractive(true);
      showToast('Ecosystem Map active! You can now zoom, drag, and toggle satellite views.');
    }
  };

  const testimonials = [
    {
      company: 'Tata Steel',
      logoType: 'tata',
      quote: 'CarbonSphere has helped us find reliable buyers for our captured carbon, creating new revenue streams and reducing our environmental impact.',
      author: 'R. Sharma',
      role: 'Sustainability Head, Tata Steel',
    },
    {
      company: 'Reliance Industries',
      logoType: 'reliance',
      quote: 'A game-changing platform for the industry. The matching engine and verification system give us confidence in every transaction.',
      author: 'P. Mehta',
      role: 'Head of Operations, Reliance Industries',
    },
    {
      company: 'Linde',
      logoType: 'linde',
      quote: 'CarbonSphere is building the infrastructure for a circular carbon economy. This is the future we need.',
      author: 'Dr. K. Müller',
      role: 'VP Sustainability, Linde',
    }
  ];

  // Industry Opportunities Data
  const industryOpportunities = [
    {
      title: 'Commercial Greenhouses',
      category: 'Agtech & Indoor Farming',
      image: greenhousesImg,
      demand: '12,500 tCO₂e / quarter',
      impact: '+35% Crop Yield Acceleration',
      valuation: '₹ 1,450 / ton',
      description: 'Controlled enrichment with purified CO₂ enhances photosynthesis, reducing water consumption and speeding harvest times.'
    },
    {
      title: 'Biotech & Algae Cultivation',
      category: 'Biofuels & Animal Feed',
      image: algaeImg,
      demand: '8,200 tCO₂e / quarter',
      impact: 'High-Density Protein Synthesis',
      valuation: '₹ 1,600 / ton',
      description: 'Continuous photobioreactors utilize flue gas carbon to cultivate spirulina and bio-diesel precursor microalgae strains.'
    },
    {
      title: 'Carbon-Cured Concrete',
      category: 'Green Construction Materials',
      image: stepBuyer,
      demand: '25,000 tCO₂e / quarter',
      impact: 'Permanent Mineral Sequestration',
      valuation: '₹ 1,850 / ton',
      description: 'Injecting recycled carbon during batch mixing permanently traps CO₂ as limestone mineral crystals with 15% higher compressive strength.'
    },
    {
      title: 'Synthetic Aviation Fuels (SAF)',
      category: 'Clean Energy & E-Fuels',
      image: stepSupplier,
      demand: '18,000 tCO₂e / quarter',
      impact: 'Net-Zero Kerosene Drop-in',
      valuation: '₹ 2,200 / ton',
      description: 'Fischer-Tropsch catalytic reactors combine captured carbon with green hydrogen to produce certified sustainable jet fuel.'
    },
    {
      title: 'Chemical & Polymer Synthesis',
      category: 'Circular Manufacturing',
      image: emissionsImg,
      demand: '15,000 tCO₂e / quarter',
      impact: 'Non-Fossil Polyols & Plastics',
      valuation: '₹ 1,750 / ton',
      description: 'Replaces fossil petrochemical feedstocks with captured carbon in polyurethane foams, coatings, and biodegradable resins.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbfdfc] text-slate-900 font-sans selection:bg-[#0e9f6e] selection:text-white">

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0e6245] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (ALL BUTTONS FULLY FUNCTIONAL)                              */}
      {/* ========================================================================= */}
      <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
                Carbon<span className="text-[#0e9f6e]">Sphere</span>
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-[#0e9f6e] -mt-1">
                Connect. Carbon. Create Opportunities.
              </span>
            </div>
          </Link>

          {/* Navigation Links with Smooth Scrolling & Actions */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative text-[#0e9f6e] font-semibold py-1 flex items-center gap-1 cursor-pointer"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0e9f6e] rounded-full" />
            </button>

            <button
              type="button"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-[#0e9f6e] transition-colors cursor-pointer"
            >
              About
            </button>

            <Link to="/marketplace" className="hover:text-[#0e9f6e] transition-colors">
              Marketplace
            </Link>

            <button
              type="button"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-[#0e9f6e] transition-colors cursor-pointer"
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => setIsImpactModalOpen(true)}
              className="hover:text-[#0e9f6e] transition-colors cursor-pointer"
            >
              Our Impact
            </button>

            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="hover:text-[#0e9f6e] transition-colors cursor-pointer"
            >
              Contact Us
            </button>

            {/* Resources Interactive Dropdown */}
            <div className="relative" ref={resourcesDropdownRef}>
              <button
                type="button"
                onClick={() => setIsResourcesDropdownOpen(prev => !prev)}
                className="flex items-center gap-1 hover:text-[#0e9f6e] transition-colors cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isResourcesDropdownOpen ? 'rotate-180 text-[#0e9f6e]' : ''}`} />
              </button>

              {isResourcesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fade-in text-xs font-medium text-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      setIsResourcesDropdownOpen(false);
                      setIsImpactModalOpen(true);
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-[#0e9f6e]" />
                    <span>ESG & Verification Dossier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsResourcesDropdownOpen(false);
                      setIsOpportunitiesModalOpen(true);
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0e9f6e]" />
                    <span>Industrial Carbon Opportunities</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsResourcesDropdownOpen(false);
                      handleViewEcosystemMap();
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#0e9f6e]" />
                    <span>Interactive Global Ecosystem Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsResourcesDropdownOpen(false);
                      setIsVideoOpen(true);
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 text-[#0e9f6e]" />
                    <span>Watch Platform Overview Video</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsResourcesDropdownOpen(false);
                      setIsContactModalOpen(true);
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors text-[#0e6245] font-bold"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0e6245]" />
                    <span>Enterprise Partnerships & Inquiries</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Actions: Search, Login, Sign Up */}
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" 
              title="Search CarbonSphere"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link to="/login">
              <button className="px-5 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2 text-sm font-semibold text-white bg-[#0e6245] hover:bg-[#0b5038] rounded-lg shadow-sm transition-all cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH INDUSTRIAL RIVER BACKGROUND                          */}
      {/* ========================================================================= */}
      <section
        className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[82vh] bg-cover bg-center flex flex-col justify-between"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent w-full md:w-[65%] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-10 flex-1 flex flex-col justify-between">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5ed]/90 border border-[#a3d9bc] text-[#0e6245] text-xs font-semibold backdrop-blur-sm shadow-sm w-fit">
              <Leaf className="w-3.5 h-3.5 text-[#0e9f6e]" />
              <span>A Sustainable Future is Within Reach</span>
            </div>

            <div className="hidden md:block text-right pr-4">
              <span className="font-serif italic text-slate-700 text-lg lg:text-xl tracking-wide drop-shadow-sm">
                Cleaner Industries<br />
                Brighter Tomorrow
              </span>
            </div>
          </div>

          <div className="max-w-2xl my-auto py-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Turning Carbon<br />
              <span className="text-[#0e9f6e]">Into Opportunities</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
              A smart marketplace connecting carbon suppliers, buyers, and logistics partners to enable a greener, cleaner and more sustainable tomorrow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/signup">
                <button className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button
                id="watch-video-btn"
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/90 hover:bg-white text-slate-800 font-semibold rounded-lg border border-slate-200 shadow-sm backdrop-blur-sm transition-all cursor-pointer hover:border-[#0e9f6e] hover:shadow-md group"
              >
                <div className="w-5 h-5 rounded-full border border-[#0e6245] flex items-center justify-center text-[#0e6245] group-hover:bg-[#0e6245] group-hover:text-white transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setIsImpactModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-xs font-semibold text-slate-700 backdrop-blur-sm shadow-xs hover:border-[#0e9f6e] cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Verified Partners</span>
              </button>
              <button 
                type="button"
                onClick={() => setIsImpactModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-xs font-semibold text-slate-700 backdrop-blur-sm shadow-xs hover:border-[#0e9f6e] cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Real Impact</span>
              </button>
              <button 
                type="button"
                onClick={handleViewEcosystemMap}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-xs font-semibold text-slate-700 backdrop-blur-sm shadow-xs hover:border-[#0e9f6e] cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Global Reach</span>
              </button>
            </div>
          </div>

          <div className="self-end pb-2">
            <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-xs">
              <div className="w-10 h-10 rounded-xl bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Carbon Reuse</h4>
                <p className="text-[11px] text-slate-600 leading-tight mt-0.5">Real Solutions for a Healthier Planet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEY METRICS STRIP (FLOATING CARD BAR)                                   */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 first:pt-0 first:px-0">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">2.5M+</div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Tons of CO2 Reused</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">500+</div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Verified Partners</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">120+</div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Active Transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">15+</div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Industries Served</p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. THE PROBLEM & CIRCULAR SOLUTION (ID="ABOUT")                           */}
      {/* ========================================================================= */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">ABOUT OUR MISSION</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Industrial Emissions<br />
              Are a <span className="text-[#0e9f6e]">Global Challenge</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Every year, millions of tons of CO2 are released into the atmosphere. But with the right connections, this carbon can become a valuable resource instead of a waste product.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#f8faf9] p-5 rounded-2xl border border-slate-200/70 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-[#0e9f6e] flex items-center justify-center shadow-xs">
                  <Sprout className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">High Industrial Emissions</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Millions of tons of CO2 released annually</p>
              </div>

              <div className="bg-[#f8faf9] p-5 rounded-2xl border border-slate-200/70 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-[#0e9f6e] flex items-center justify-center shadow-xs">
                  <RotateCw className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">Underutilized Resource</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Captured carbon often goes to waste</p>
              </div>

              <div className="bg-[#f8faf9] p-5 rounded-2xl border border-slate-200/70 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-rose-500 flex items-center justify-center shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">Limited Connections</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Suppliers and buyers struggle to find each other</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-200 aspect-[4/3]">
              <img
                src={emissionsImg}
                alt="Industrial Emissions to Opportunities"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 hover:bg-white/40 transition-all"
                  title="Watch Video"
                >
                  <Play className="w-7 h-7 fill-white ml-1" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold tracking-tight">From Emissions<br />to Opportunities</h3>
                <div className="w-16 h-1 bg-[#0e9f6e] rounded-full mt-2" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS SECTION (ID="HOW-IT-WORKS")                                */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto bg-slate-50/50 rounded-3xl my-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A Simple Process. <span className="text-[#0e9f6e]">A Bigger Impact.</span>
          </h2>
          <p className="text-sm text-slate-600">
            We connect suppliers, logistics partners, and buyers through a seamless, intelligent platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 shrink-0">
              <img src={stepSupplier} alt="Supplier" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Supplier</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Industrial facilities capture and list available carbon</p>
          </div>

          <div className="hidden md:flex absolute left-[23%] top-[45%] z-10 text-[#0e9f6e]">
            <ArrowRight className="w-6 h-6" />
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 shrink-0">
              <img src={stepTransport} alt="Transport" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Transport</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Logistics partners ensure safe and efficient delivery</p>
          </div>

          <div className="hidden md:flex absolute left-[48%] top-[45%] z-10 text-[#0e9f6e]">
            <ArrowRight className="w-6 h-6" />
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 shrink-0">
              <img src={stepBuyer} alt="Buyer" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Buyer</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Businesses purchase carbon for valuable applications</p>
          </div>

          <div className="hidden md:flex absolute left-[73%] top-[45%] z-10 text-[#0e9f6e]">
            <ArrowRight className="w-6 h-6" />
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 shrink-0">
              <img src={stepReuse} alt="Reuse" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-slate-900">4. Reuse</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Carbon is reused in industries creating a circular economy</p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CARBON CREATES OPPORTUNITIES ACROSS INDUSTRIES                         */}
      {/* ========================================================================= */}
      <section
        className="py-24 px-6 relative bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(rgba(10, 31, 20, 0.88), rgba(6, 23, 15, 0.94)), url(${forestCanopy})` }}
      >
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Carbon Creates Opportunities<br />Across Industries
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Captured carbon can be reused in multiple industries, creating economic value while reducing environmental impact.
              </p>
            </div>

            {/* Explore Opportunities Button (Opens Interactive Opportunities Modal) */}
            <button 
              type="button"
              onClick={() => setIsOpportunitiesModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 font-semibold text-xs hover:bg-emerald-50 transition-colors shrink-0 shadow-md cursor-pointer"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {industryOpportunities.map((opp, idx) => (
              <div 
                key={idx} 
                onClick={() => setIsOpportunitiesModalOpen(true)}
                className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="h-36 overflow-hidden relative">
                  <img src={opp.image} alt={opp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white text-[9px] font-bold rounded-md backdrop-blur-xs">
                    {opp.valuation}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0e9f6e] transition-colors">{opp.title}</h4>
                  <p className="text-xs text-slate-500 leading-snug">{opp.impact}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GLOBAL REACH & INTERACTIVE ECOSYSTEM MAP (ID="ECOSYSTEM-MAP")          */}
      {/* ========================================================================= */}
      <section id="ecosystem-map" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">GLOBAL REACH</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Growing Ecosystem<br />
              for a <span className="text-[#0e9f6e]">Cleaner Planet</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our platform is building a global network of suppliers, buyers, and logistics partners to maximize the potential of carbon reuse.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Globe className="w-4 h-4 text-[#0e9f6e]" />
                  <span>Global Network</span>
                </div>
                <p className="text-xs text-slate-500">Connect across regions</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <BarChart3 className="w-4 h-4 text-[#0e9f6e]" />
                  <span>Real-time Insights</span>
                </div>
                <p className="text-xs text-slate-500">Market trends and opportunities</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#0e9f6e]" />
                  <span>Trusted Verification</span>
                </div>
                <p className="text-xs text-slate-500">Ensure quality and reliability</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Sprout className="w-4 h-4 text-[#0e9f6e]" />
                  <span>Sustainable Growth</span>
                </div>
                <p className="text-xs text-slate-500">Drive long-term impact</p>
              </div>
            </div>

            {/* View Ecosystem Map Button (Activates & Focuses the Map) */}
            <div className="pt-4 flex items-center gap-3">
              <button 
                type="button"
                onClick={handleViewEcosystemMap}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>View Ecosystem Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsInteractive(p => !p)}
                className="px-4 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {isInteractive ? 'Lock Map' : 'Explore Interactively'}
              </button>
            </div>
          </div>

          {/* Right Column: World Map graphic card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-6">

              {/* Map Filter Pills */}
              <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMapFilter('Suppliers');
                    showToast('Focusing on Verified Indian Industrial Carbon Suppliers.');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${activeMapFilter === 'Suppliers' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>Suppliers</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMapFilter('Buyers');
                    showToast('Focusing on European Industrial Decarbonization Buyers.');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${activeMapFilter === 'Buyers' ? 'bg-blue-50 border-blue-300 text-blue-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                  <span>Buyers</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMapFilter('Logistics');
                    showToast('Focusing on Maritime & Pipeline Carbon Logistics Corridors.');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${activeMapFilter === 'Logistics' ? 'bg-purple-50 border-purple-300 text-purple-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                  <span>Logistics</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMapFilter('Active Routes');
                    showToast('Displaying Active Cross-Border Carbon Transfer Routes.');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${activeMapFilter === 'Active Routes' ? 'bg-amber-50 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  <span>Active Routes</span>
                </button>
              </div>

              {/* Live Google Map Container with Interactive Overlays */}
              <div className="relative rounded-2xl min-h-[360px] h-[360px] flex items-center justify-center overflow-hidden border border-emerald-100 shadow-inner bg-slate-100 group">

                <iframe
                  title="Live Google Map Ecosystem"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(getMapQuery())}&t=${mapType}&z=${mapZoom}&ie=UTF8&iwloc=&output=embed`}
                  className={`absolute inset-0 w-full h-full border-0 transition-all duration-700 ${isInteractive ? 'pointer-events-auto ring-2 ring-[#0e9f6e]' : 'pointer-events-none'}`}
                  style={{
                    filter: mapType === 'm' ? 'saturate(1.25) contrast(1.02)' : 'none'
                  }}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-emerald-900/5 to-white/15 pointer-events-none z-10" />

                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMapType(mapType === 'm' ? 'k' : mapType === 'k' ? 'p' : 'm')}
                    className="bg-white/95 backdrop-blur-md hover:bg-white text-slate-700 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-md flex items-center gap-1 transition-all cursor-pointer"
                    title="Toggle Map View"
                  >
                    <Layers className="w-3 h-3 text-[#0e6245]" />
                    <span>{mapType === 'm' ? 'Satellite' : mapType === 'k' ? 'Terrain' : 'Roadmap'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsInteractive(!isInteractive);
                      showToast(isInteractive ? 'Map interaction locked' : 'Map interaction enabled: drag and pan freely!');
                    }}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border shadow-md flex items-center gap-1 transition-all cursor-pointer ${
                      isInteractive ? 'bg-[#0e6245] text-white border-[#0e6245]' : 'bg-white/95 backdrop-blur-md text-slate-700 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{isInteractive ? 'Interactive ON' : 'Interact'}</span>
                  </button>
                </div>

                {!isInteractive && (
                  <div className="absolute inset-0 pointer-events-none z-20">
                    <svg className="w-full h-full opacity-70" viewBox="0 0 1000 500" fill="none">
                      <path d="M220 180 Q 420 120 660 210" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 6" className="animate-pulse" />
                      <path d="M480 150 Q 560 170 660 210" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                      <path d="M660 210 Q 720 280 820 340" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 5" />
                    </svg>

                    <div className="absolute top-[42%] left-[62%] pointer-events-auto">
                      <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-[#10b981] ring-4 ring-emerald-300 animate-ping absolute" />
                        <div className="w-4 h-4 rounded-full bg-[#10b981] ring-4 ring-white shadow-lg relative flex items-center justify-center text-white text-[8px] font-black">
                          ✓
                        </div>
                      </div>

                      <div className="mt-2 -ml-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 p-3 min-w-[160px] text-xs transition-all hover:scale-105">
                        <div className="flex items-center gap-1.5 text-slate-900 font-black">
                          <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                          <span>Carbon Supplier</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 font-semibold">India (Gujarat Hub)</p>
                        <p className="text-[11px] font-black text-slate-900">50,000 tons/year</p>
                        <p className="text-[10px] text-[#0e9f6e] font-bold flex items-center gap-1 mt-0.5">
                          <span>Verified & Active</span>
                          <span>✓</span>
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-[26%] left-[48%] pointer-events-auto">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#3b82f6] ring-4 ring-blue-200 shadow-md" />
                    </div>

                    <div className="absolute top-[52%] left-[54%] pointer-events-auto">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] ring-4 ring-purple-200 shadow-md" />
                    </div>

                    <div className="absolute top-[62%] left-[78%] pointer-events-auto">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] ring-4 ring-amber-200 shadow-md" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 z-30 flex flex-col bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg overflow-hidden text-slate-700">
                  <button
                    type="button"
                    onClick={() => setMapZoom((prev) => Math.min(prev + 1, 16))}
                    className="p-2 hover:bg-emerald-50 hover:text-[#0e6245] border-b border-slate-100 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapZoom((prev) => Math.max(prev - 1, 2))}
                    className="p-2 hover:bg-emerald-50 hover:text-[#0e6245] transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-slate-100">
                <div>
                  <div className="text-xl font-bold text-slate-900">250+</div>
                  <p className="text-[11px] text-slate-400">Suppliers</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">300+</div>
                  <p className="text-[11px] text-slate-400">Buyers</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">150+</div>
                  <p className="text-[11px] text-slate-400">Logistics Partners</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">30+</div>
                  <p className="text-[11px] text-slate-400">Countries</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. REAL IMPACT: A MORE SUSTAINABLE TOMORROW (ID="IMPACT")                 */}
      {/* ========================================================================= */}
      <section
        id="impact"
        className="py-24 px-6 relative bg-cover bg-center text-white scroll-mt-24"
        style={{ backgroundImage: `linear-gradient(rgba(10, 31, 20, 0.90), rgba(6, 23, 15, 0.95)), url(${forestCanopy})` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Real Impact<br />
                A More Sustainable Tomorrow
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed max-w-md">
                By enabling carbon reuse, we help reduce emissions, support circular economies, and create a cleaner, healthier planet for future generations.
              </p>
              <div className="pt-2 flex items-center gap-3">
                {/* Our Impact Button opens full Impact Modal */}
                <button 
                  type="button"
                  onClick={() => setIsImpactModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold text-xs hover:bg-emerald-50 transition-colors shadow-md cursor-pointer"
                >
                  <span>Our Impact</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Downloading CarbonSphere ESG Impact Dossier (PDF)...');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-white/30 text-white font-semibold text-xs hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ESG Report</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div 
                onClick={() => setIsImpactModalOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5 cursor-pointer hover:bg-white/15 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">2.5M+</div>
                <p className="text-[11px] text-emerald-100/70 font-medium">Tons of CO2 Reused</p>
              </div>

              <div 
                onClick={() => setIsImpactModalOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5 cursor-pointer hover:bg-white/15 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Sprout className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">1.8M+</div>
                <p className="text-[11px] text-emerald-100/70 font-medium">Tons Emissions Reduced</p>
              </div>

              <div 
                onClick={() => setIsImpactModalOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5 cursor-pointer hover:bg-white/15 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">500+</div>
                <p className="text-[11px] text-emerald-100/70 font-medium">Companies Involved</p>
              </div>

              <div 
                onClick={() => setIsImpactModalOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5 cursor-pointer hover:bg-white/15 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl font-black">A Cleaner</div>
                <p className="text-[11px] text-emerald-100/70 font-medium">Greener Future</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TESTIMONIALS: TRUSTED BY INDUSTRY LEADERS                              */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-10">

          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">TESTIMONIALS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Trusted by Industry Leaders
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTestimonialIndex(Math.max(0, testimonialIndex - 1))}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTestimonialIndex(Math.min(testimonials.length - 1, testimonialIndex + 1))}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0f4c81] font-black text-xs flex items-center justify-center border border-blue-100">
                    TATA
                  </div>
                  <span className="font-bold text-sm text-slate-900">Tata Steel</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{testimonials[0].quote}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-xs font-bold text-slate-900">{testimonials[0].author}</h5>
                <p className="text-[11px] text-slate-400">{testimonials[0].role}</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 font-black text-xs flex items-center justify-center border border-amber-100">
                    RIL
                  </div>
                  <span className="font-bold text-sm text-slate-900">Reliance Industries</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{testimonials[1].quote}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-xs font-bold text-slate-900">{testimonials[1].author}</h5>
                <p className="text-[11px] text-slate-400">{testimonials[1].role}</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#005596] font-black text-xs flex items-center justify-center border border-cyan-100">
                    Linde
                  </div>
                  <span className="font-bold text-sm text-slate-900">Linde</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{testimonials[2].quote}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-xs font-bold text-slate-900">{testimonials[2].author}</h5>
                <p className="text-[11px] text-slate-400">{testimonials[2].role}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CALL TO ACTION BANNER: JOIN CARBONSPHERE TODAY (CONTACT US BUTTON)    */}
      {/* ========================================================================= */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="bg-[#eaf5ef] rounded-3xl p-8 sm:p-12 border border-[#d2ecd9] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm">

          <div className="space-y-2 relative z-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#0e6245]">READY TO MAKE A DIFFERENCE?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Join CarbonSphere Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Be part of a global movement turning carbon into opportunities.
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10 shrink-0">
            <Link to="/signup" id="bottom-get-started-btn">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            
            {/* Working Contact Us Button */}
            <button 
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-3 bg-white text-slate-800 font-semibold text-xs rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <div className="absolute -right-8 -bottom-10 pointer-events-none opacity-40">
            <Leaf className="w-56 h-56 text-[#0e9f6e] fill-[#0e9f6e]/20 -rotate-45" />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FOOTER (DARK FOREST GREEN)                                            */}
      {/* ========================================================================= */}
      <footer className="bg-[#071912] text-slate-300 pt-16 pb-12 px-6 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] flex items-center justify-center text-white">
                  <Leaf className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  Carbon<span className="text-[#10b981]">Sphere</span>
                </span>
              </div>
              <p className="text-xs text-emerald-100/60 max-w-sm">
                Connect. Carbon. Create Opportunities.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Links</h5>
              <ul className="space-y-2 text-slate-400">
                <li><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer">Home</button></li>
                <li><button type="button" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer">About</button></li>
                <li><Link to="/marketplace" className="hover:text-emerald-400 transition-colors">Marketplace</Link></li>
                <li><button type="button" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer">How It Works</button></li>
              </ul>
            </div>

            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Resources</h5>
              <ul className="space-y-2 text-slate-400">
                <li><button type="button" onClick={() => setIsImpactModalOpen(true)} className="hover:text-emerald-400 transition-colors cursor-pointer">ESG Reports</button></li>
                <li><button type="button" onClick={() => setIsOpportunitiesModalOpen(true)} className="hover:text-emerald-400 transition-colors cursor-pointer">Carbon Opportunities</button></li>
                <li><button type="button" onClick={handleViewEcosystemMap} className="hover:text-emerald-400 transition-colors cursor-pointer">Ecosystem Map</button></li>
                <li><button type="button" onClick={() => setIsContactModalOpen(true)} className="hover:text-emerald-400 transition-colors cursor-pointer">Contact Us</button></li>
              </ul>
            </div>

            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Legal</h5>
              <ul className="space-y-2 text-slate-400">
                <li><button type="button" onClick={() => showToast('CarbonSphere Privacy Policy version 2.4')} className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</button></li>
                <li><button type="button" onClick={() => showToast('CarbonSphere Terms of Service')} className="hover:text-emerald-400 transition-colors cursor-pointer">Terms of Service</button></li>
                <li><button type="button" onClick={() => showToast('Cookie preferences updated')} className="hover:text-emerald-400 transition-colors cursor-pointer">Cookie Policy</button></li>
              </ul>

              <div className="pt-2">
                <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">Follow Us</h5>
                <div className="flex items-center gap-3 text-slate-400">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors" title="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61Z" /></svg>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors" title="Twitter / X">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors" title="YouTube">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-emerald-950/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© 2026 CarbonSphere Ecosystem. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-emerald-500/80">
              Together for a Cleaner, Greener Tomorrow 🌿
            </p>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 12. CONTACT US MODAL                                                      */}
      {/* ========================================================================= */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#0e6245] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Contact CarbonSphere</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our carbon trading, verification, and industrial logistics team.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setIsContactModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Your Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Work Email *</label>
                  <input 
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Company / Organization</label>
                  <input 
                    type="text"
                    placeholder="e.g. GreenTech Industries"
                    value={contactForm.organization}
                    onChange={(e) => setContactForm(p => ({ ...p, organization: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Your Role / Interest</label>
                  <select 
                    value={contactForm.role}
                    onChange={(e) => setContactForm(p => ({ ...p, role: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] cursor-pointer"
                  >
                    <option value="Carbon Supplier">Carbon Supplier (Emitter / Capture)</option>
                    <option value="Carbon Buyer">Carbon Buyer (Decarbonization / Reuse)</option>
                    <option value="Logistics Partner">Logistics & Pipeline Carrier</option>
                    <option value="Auditor / Verifier">Auditor / Registry Verifier</option>
                    <option value="Enterprise Investor">Enterprise Investor / ESG Fund</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Your Message / Request *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell us about your carbon supply capacity, purchase volumes, or partnership interest..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0e9f6e]" />
                  <span>Enterprise SSL Encrypted Submission</span>
                </span>

                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsContactModalOpen(false)}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-[#0e6245] hover:bg-[#0b5038] text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {contactSubmitted ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                    <span>{contactSubmitted ? 'Sent!' : 'Send Message'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 13. OUR IMPACT DOSSIER MODAL                                              */}
      {/* ========================================================================= */}
      {isImpactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-[#0e6245] text-[10px] font-bold rounded-full uppercase tracking-wider">
                    CarbonSphere ESG Audit 2026
                  </span>
                  <span className="text-xs text-slate-400">• Verified by Verra & Gold Standard</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">Our Cumulative Environmental Impact</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsImpactModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Impact Metric Hero Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#edf8f1] border border-[#a3d9bc] p-5 rounded-2xl text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-white text-[#0e6245] mx-auto flex items-center justify-center shadow-xs">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-[#0e6245]">2.5M+</div>
                <p className="text-xs font-bold text-slate-800">Tons of CO₂ Reused</p>
                <p className="text-[10px] text-slate-500">Across chemical, agtech & concrete sectors</p>
              </div>

              <div className="bg-[#edf8f1] border border-[#a3d9bc] p-5 rounded-2xl text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-white text-[#0e6245] mx-auto flex items-center justify-center shadow-xs">
                  <RotateCw className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-[#0e6245]">1.8M+</div>
                <p className="text-xs font-bold text-slate-800">Tons Net Avoided</p>
                <p className="text-[10px] text-slate-500">Verified through additionality IoT sensors</p>
              </div>

              <div className="bg-[#edf8f1] border border-[#a3d9bc] p-5 rounded-2xl text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-white text-[#0e6245] mx-auto flex items-center justify-center shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-[#0e6245]">500+</div>
                <p className="text-xs font-bold text-slate-800">Industrial Partners</p>
                <p className="text-[10px] text-slate-500">In 30+ countries globally</p>
              </div>
            </div>

            {/* Equivalency Benchmarks */}
            <div className="p-5 border border-slate-200 rounded-2xl space-y-3 bg-slate-50/60 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Real-World Environmental Equivalency</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    🚗
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">543,000 Vehicles</span>
                    <span className="text-[11px] text-slate-500">Annual passenger car emissions eliminated</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    🌲
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">112 Million Trees</span>
                    <span className="text-[11px] text-slate-500">Ten-year carbon sequestering equivalent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                Audited annually under ISO 14064-2 & GHG Protocol Corporate Value Chain.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Official CarbonSphere ESG Impact Dossier downloaded (PDF)!');
                    setIsImpactModalOpen(false);
                  }}
                  className="px-5 py-2.5 bg-[#0e6245] hover:bg-[#0b5038] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ESG Report (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 14. EXPLORE OPPORTUNITIES MODAL                                           */}
      {/* ========================================================================= */}
      {isOpportunitiesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-[#0e6245] text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Marketplace Opportunities
                  </span>
                  <span className="text-xs text-slate-400">• High-Valorization Circular Sectors</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                  Explore Carbon Circularity Opportunities
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsOpportunitiesModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Opportunities List */}
            <div className="space-y-4">
              {industryOpportunities.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-emerald-500 hover:shadow-xs transition-all bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-lg">{item.description}</p>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                        <span>Quarterly Demand: <strong className="text-slate-900">{item.demand}</strong></span>
                        <span>•</span>
                        <span>Benefit: <strong className="text-emerald-700">{item.impact}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <span className="text-base font-black text-[#0e6245] block">{item.valuation}</span>
                    <span className="text-[10px] text-slate-400 block mb-2">Estimated Spot Price</span>
                    <Link to="/signup" onClick={() => setIsOpportunitiesModalOpen(false)}>
                      <button className="px-4 py-2 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1">
                        <span>Trade This Sector</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Are you a carbon producer looking to supply these sectors?
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOpportunitiesModalOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="text-xs font-bold text-[#0e6245] hover:underline cursor-pointer"
              >
                Inquire as Supplier →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 15. SEARCH MODAL                                                          */}
      {/* ========================================================================= */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-20 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSearchModalOpen(false);
                navigate(searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery.trim())}` : '/search');
              }}
              className="flex items-center gap-3 border-b border-slate-100 pb-3"
            >
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text"
                autoFocus
                placeholder="Search credits, standards (Verra, Gold Standard), or industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#0e6245] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs"
              >
                Search
              </button>
              <button 
                type="button" 
                onClick={() => setIsSearchModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-2 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">Popular Categories</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Verra VCS Credits',
                  'Gold Standard GS-ACC',
                  'Direct Air Capture (DAC)',
                  'Biochar (BiCRS)',
                  'Enhanced Rock Weathering',
                  'Marine / Blue Carbon'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      navigate(`/search?q=${encodeURIComponent(tag)}`);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-[#0e6245] rounded-xl text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 16. VIDEO MODAL                                                           */}
      {/* ========================================================================= */}
      {isVideoOpen && (
        <div
          id="video-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            id="video-modal-container"
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    CarbonSphere: Transforming Captured CO₂ into Value
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Platform Overview • Circular Carbon Exchange & Verification
                  </p>
                </div>
              </div>
              <button
                id="close-video-modal-btn"
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                id="landing-video-iframe"
                className="w-full h-full border-0"
                src="https://www.youtube-nocookie.com/embed/XxjIdkO_eK4?autoplay=1&rel=0&modestbranding=1"
                title="CarbonSphere Overview Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="px-6 py-3.5 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Learn how smart matching & telemetry accelerate industrial decarbonization
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link to="/login" onClick={() => setIsVideoOpen(false)}>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;
