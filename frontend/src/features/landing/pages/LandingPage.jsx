import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronRight
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
  const [activeTab, setActiveTab] = useState('Home');
  const [activeMapFilter, setActiveMapFilter] = useState('Suppliers');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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

  return (
    <div className="min-h-screen bg-[#fbfdfc] text-slate-900 font-sans selection:bg-[#0e9f6e] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
                Carbon<span className="text-[#0e9f6e]">X</span>
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-[#0e9f6e] -mt-1">
                Connect. Carbon. Create Opportunities.
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link 
              to="/" 
              className="relative text-[#0e9f6e] font-semibold py-1 flex items-center gap-1"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0e9f6e] rounded-full"></span>
            </Link>
            <a href="#about" className="hover:text-[#0e9f6e] transition-colors">About</a>
            <Link to="/marketplace" className="hover:text-[#0e9f6e] transition-colors">Marketplace</Link>
            <a href="#how-it-works" className="hover:text-[#0e9f6e] transition-colors">How It Works</a>
            <a href="#impact" className="hover:text-[#0e9f6e] transition-colors">Impact</a>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#0e9f6e] transition-colors">
              <span>Resources</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0e9f6e]" />
            </div>
          </nav>

          {/* Actions: Search, Login, Sign Up */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors" title="Search">
              <Search className="w-4 h-4" />
            </button>
            <Link to="/login">
              <button className="px-5 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2 text-sm font-semibold text-white bg-[#0e6245] hover:bg-[#0b5038] rounded-lg shadow-sm transition-all">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>


      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH INDUSTRIAL RIVER BACKGROUND (FULL SCREEN EDGE-TO-EDGE) */}
      {/* ========================================================================= */}
      <section 
        className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[82vh] bg-cover bg-center flex flex-col justify-between"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Subtle natural sunlight gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent w-full md:w-[65%] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-10 flex-1 flex flex-col justify-between">
          {/* Top Row inside Hero: Pill Badge & Floating Cursive text */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5ed]/90 border border-[#a3d9bc] text-[#0e6245] text-xs font-semibold backdrop-blur-sm shadow-sm w-fit">
              <Leaf className="w-3.5 h-3.5 text-[#0e9f6e]" />
              <span>A Sustainable Future is Within Reach</span>
            </div>

            {/* Handwritten style tagline on right */}
            <div className="hidden md:block text-right pr-4">
              <span className="font-serif italic text-slate-700 text-lg lg:text-xl tracking-wide drop-shadow-sm">
                Cleaner Industries<br />
                Brighter Tomorrow
              </span>
            </div>
          </div>

          {/* Main Hero Content: Headlines & CTAs */}
          <div className="max-w-2xl my-auto py-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Turning Carbon<br />
              <span className="text-[#0e9f6e]">Into Opportunities</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
              A smart marketplace connecting carbon suppliers, buyers, and logistics partners to enable a greener, cleaner and more sustainable tomorrow.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/signup">
                <button className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold rounded-lg shadow-md transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/90 hover:bg-white text-slate-800 font-semibold rounded-lg border border-slate-200 shadow-sm backdrop-blur-sm transition-all">
                <div className="w-5 h-5 rounded-full border border-[#0e6245] flex items-center justify-center text-[#0e6245]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* 3 Pills: Verified Partners, Real Impact, Global Reach */}
            <div className="mt-10 flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-xs font-semibold text-slate-700 backdrop-blur-sm shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Verified Partners</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-xs font-semibold text-slate-700 backdrop-blur-sm shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Real Impact</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-xs font-semibold text-slate-700 backdrop-blur-sm shadow-xs">
                <Globe className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Global Reach</span>
              </div>
            </div>
          </div>

          {/* Floating Glassmorphic Card (Bottom Right over river) */}
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
          
          {/* Stat 1 */}
          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 first:pt-0 first:px-0">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">2.5M+</div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Tons of CO2 Reused</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">500+</div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Verified Partners</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">120+</div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Active Transactions</p>
            </div>
          </div>

          {/* Stat 4 */}
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
      {/* 4. THE PROBLEM SECTION                                                     */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Problem details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">THE PROBLEM</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Industrial Emissions<br />
              Are a <span className="text-[#0e9f6e]">Global Challenge</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Every year, millions of tons of CO2 are released into the atmosphere. But with the right connections, this carbon can become a valuable resource instead of a waste product.
            </p>

            {/* 3 Challenge Cards Grid */}
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

          {/* Right Column: Industrial Emissions Video Banner */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-200 aspect-[4/3]">
              <img 
                src={emissionsImg} 
                alt="Industrial Emissions to Opportunities" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 hover:bg-white/40 transition-all">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
              </div>

              {/* Bottom Card Title */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold tracking-tight">From Emissions<br />to Opportunities</h3>
                <div className="w-16 h-1 bg-[#0e9f6e] rounded-full mt-2" />
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS SECTION (4 CIRCULAR PROCESS STEPS)                         */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto bg-slate-50/50 rounded-3xl my-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A Simple Process. <span className="text-[#0e9f6e]">A Bigger Impact.</span>
          </h2>
          <p className="text-sm text-slate-600">
            We connect suppliers, logistics partners, and buyers through a seamless, intelligent platform.
          </p>
        </div>

        {/* 4 Process Step Cards with Connecting Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1: Supplier */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 shrink-0">
              <img src={stepSupplier} alt="Supplier" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Supplier</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Industrial facilities capture and list available carbon</p>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:flex absolute left-[23%] top-[45%] z-10 text-[#0e9f6e]">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Step 2: Transport */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 shrink-0">
              <img src={stepTransport} alt="Transport" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Transport</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Logistics partners ensure safe and efficient delivery</p>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex absolute left-[48%] top-[45%] z-10 text-[#0e9f6e]">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Step 3: Buyer */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 shrink-0">
              <img src={stepBuyer} alt="Buyer" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Buyer</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Businesses purchase carbon for valuable applications</p>
          </div>

          {/* Arrow 3 */}
          <div className="hidden md:flex absolute left-[73%] top-[45%] z-10 text-[#0e9f6e]">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Step 4: Reuse */}
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
      {/* 6. CARBON CREATES OPPORTUNITIES ACROSS INDUSTRIES (DARK FOREST CANOPY)     */}
      {/* ========================================================================= */}
      <section 
        className="py-24 px-6 relative bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(rgba(10, 31, 20, 0.88), rgba(6, 23, 15, 0.94)), url(${forestCanopy})` }}
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row: Title on left, Explore button on right */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Carbon Creates Opportunities<br />Across Industries
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Captured carbon can be reused in multiple industries, creating economic value while reducing environmental impact.
              </p>
            </div>

            <Link to="/marketplace">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 font-semibold text-xs hover:bg-emerald-50 transition-colors shrink-0 shadow-md">
                <span>Explore Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          {/* 5 Industry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            
            {/* Industry 1 */}
            <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
              <div className="h-36 overflow-hidden">
                <img src={greenhousesImg} alt="Greenhouses" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Greenhouses</h4>
                <p className="text-xs text-slate-500">Enhances plant growth</p>
              </div>
            </div>

            {/* Industry 2 */}
            <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
              <div className="h-36 overflow-hidden">
                <img src={algaeImg} alt="Algae Farms" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Algae Farms</h4>
                <p className="text-xs text-slate-500">Supports algae cultivation</p>
              </div>
            </div>

            {/* Industry 3 */}
            <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
              <div className="h-36 overflow-hidden">
                <img src={stepBuyer} alt="Concrete Curing" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Concrete Curing</h4>
                <p className="text-xs text-slate-500">Improves durability</p>
              </div>
            </div>

            {/* Industry 4 */}
            <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
              <div className="h-36 overflow-hidden">
                <img src={stepSupplier} alt="Synthetic Fuels" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Synthetic Fuels</h4>
                <p className="text-xs text-slate-500">Enables clean energy</p>
              </div>
            </div>

            {/* Industry 5 */}
            <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
              <div className="h-36 overflow-hidden">
                <img src={emissionsImg} alt="Chemical Manufacturing" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Chemical Manufacturing</h4>
                <p className="text-xs text-slate-500">Used in chemical processes</p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 7. GLOBAL REACH & INTERACTIVE ECOSYSTEM MAP                                */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Global Reach Overview */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">GLOBAL REACH</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Growing Ecosystem<br />
              for a <span className="text-[#0e9f6e]">Cleaner Planet</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our platform is building a global network of suppliers, buyers, and logistics partners to maximize the potential of carbon reuse.
            </p>

            {/* 4 Feature Items Grid */}
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

            <div className="pt-4">
              <Link to="/marketplace">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold text-xs rounded-lg shadow-sm transition-all">
                  <span>View Ecosystem Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: World Map graphic card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-6">
              
              {/* Map Filter Pills */}
              <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4 text-xs font-semibold">
                <button 
                  onClick={() => setActiveMapFilter('Suppliers')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${activeMapFilter === 'Suppliers' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>Suppliers</span>
                </button>

                <button 
                  onClick={() => setActiveMapFilter('Buyers')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${activeMapFilter === 'Buyers' ? 'bg-blue-50 border-blue-300 text-blue-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                  <span>Buyers</span>
                </button>

                <button 
                  onClick={() => setActiveMapFilter('Logistics')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${activeMapFilter === 'Logistics' ? 'bg-purple-50 border-purple-300 text-purple-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                  <span>Logistics</span>
                </button>

                <button 
                  onClick={() => setActiveMapFilter('Active Routes')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${activeMapFilter === 'Active Routes' ? 'bg-amber-50 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  <span>Active Routes</span>
                </button>
              </div>

              {/* Styled World Map Container with SVG graphic, route paths, and tooltips */}
              <div className="relative rounded-2xl bg-[#eff7f4] min-h-[320px] p-4 flex items-center justify-center overflow-hidden border border-emerald-100/60">
                
                {/* Stylized vector map background representation */}
                <svg className="w-full h-full opacity-60 max-h-[320px]" viewBox="0 0 1000 500" fill="none">
                  {/* North America */}
                  <path d="M150 120 C 180 80, 260 80, 280 140 C 270 200, 200 240, 160 210 Z" fill="#c3e4d5" />
                  {/* South America */}
                  <path d="M280 260 C 330 280, 340 370, 300 430 C 260 410, 250 330, 280 260 Z" fill="#c3e4d5" />
                  {/* Europe */}
                  <path d="M480 110 C 530 90, 560 140, 530 180 C 490 170, 470 140, 480 110 Z" fill="#c3e4d5" />
                  {/* Africa */}
                  <path d="M490 200 C 560 210, 580 320, 530 380 C 480 340, 460 250, 490 200 Z" fill="#c3e4d5" />
                  {/* Asia */}
                  <path d="M580 90 C 720 70, 850 130, 820 250 C 730 250, 680 180, 580 160 Z" fill="#c3e4d5" />
                  {/* Australia */}
                  <path d="M780 340 C 850 330, 870 410, 810 430 C 760 410, 760 360, 780 340 Z" fill="#c3e4d5" />

                  {/* Connecting Curved Route Lines */}
                  <path d="M250 160 Q 400 120 720 220" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                  <path d="M520 140 Q 620 170 720 220" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                  <path d="M720 220 Q 760 300 810 370" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                </svg>

                {/* Pins on the Map */}
                <div className="absolute top-[32%] left-[25%] w-3 h-3 rounded-full bg-[#10b981] ring-4 ring-emerald-200 animate-ping" />
                <div className="absolute top-[32%] left-[25%] w-3 h-3 rounded-full bg-[#10b981]" />

                <div className="absolute top-[28%] left-[52%] w-3 h-3 rounded-full bg-[#3b82f6] ring-4 ring-blue-200" />
                <div className="absolute top-[68%] left-[81%] w-3 h-3 rounded-full bg-[#f59e0b] ring-4 ring-amber-200" />
                <div className="absolute top-[48%] left-[54%] w-3 h-3 rounded-full bg-[#8b5cf6] ring-4 ring-purple-200" />

                {/* Interactive Tooltip over India / South Asia (Matches photo perfectly!) */}
                <div className="absolute top-[40%] left-[64%] z-20">
                  <div className="w-3 h-3 rounded-full bg-[#10b981] ring-4 ring-emerald-300" />
                  <div className="mt-2 -ml-16 bg-white rounded-xl shadow-xl border border-slate-200 p-3 min-w-[150px] text-xs">
                    <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      <span>Carbon Supplier</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">India</p>
                    <p className="text-[11px] font-bold text-slate-800">50,000 tons/year</p>
                    <p className="text-[10px] text-[#0e9f6e] font-semibold flex items-center gap-1 mt-0.5">
                      <span>Verified</span>
                      <span>✓</span>
                    </p>
                  </div>
                </div>

                {/* Zoom Controls bottom right */}
                <div className="absolute bottom-4 right-4 flex flex-col bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden text-slate-600">
                  <button className="p-1.5 hover:bg-slate-50 border-b border-slate-100">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-50">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Metrics Bar inside Map Card */}
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
      {/* 8. REAL IMPACT: A MORE SUSTAINABLE TOMORROW (FOREST CANOPY)                */}
      {/* ========================================================================= */}
      <section 
        id="impact"
        className="py-24 px-6 relative bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(rgba(10, 31, 20, 0.90), rgba(6, 23, 15, 0.95)), url(${forestCanopy})` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Button */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Real Impact<br />
                A More Sustainable Tomorrow
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed max-w-md">
                By enabling carbon reuse, we help reduce emissions, support circular economies, and create a cleaner, healthier planet for future generations.
              </p>
              <div className="pt-2">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold text-xs hover:bg-emerald-50 transition-colors shadow-md">
                  <span>Our Impact</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: 4 Translucent Metric Cards */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">2.5M+</div>
                <p className="text-[11px] text-emerald-100/70 font-medium">Tons of CO2 Reused</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Sprout className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">1.8M+</div>
                <p className="text-[11px] text-emerald-100/70 font-medium">Tons of Emissions Reduced</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">500+</div>
                <p className="text-[11px] text-emerald-100/70 font-medium">Companies Involved</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5">
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
          
          {/* Section Header with Carousel Arrows */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">TESTIMONIALS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Trusted by Industry Leaders
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setTestimonialIndex(Math.max(0, testimonialIndex - 1))}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTestimonialIndex(Math.min(testimonials.length - 1, testimonialIndex + 1))}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Testimonial 1: Tata Steel */}
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

            {/* Testimonial 2: Reliance Industries */}
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

            {/* Testimonial 3: Linde */}
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
      {/* 10. CALL TO ACTION BANNER: JOIN CARBONSPHERE TODAY                        */}
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
            <Link to="/signup">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold text-xs rounded-lg shadow-sm transition-all">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <button className="px-6 py-3 bg-white text-slate-800 font-semibold text-xs rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors shadow-xs">
              Contact Us
            </button>
          </div>

          {/* Decorative Corner Foliage Element */}
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
            
            {/* Brand column */}
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

            {/* Quick Links */}
            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Links</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About</a></li>
                <li><Link to="/marketplace" className="hover:text-emerald-400 transition-colors">Marketplace</Link></li>
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Resources</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Reports</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal & Socials */}
            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Legal</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
              </ul>

              <div className="pt-2">
                <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">Follow Us</h5>
                <div className="flex items-center gap-3 text-slate-400">
                  <a href="#" className="hover:text-emerald-400 transition-colors" title="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61Z"/></svg>
                  </a>
                  <a href="#" className="hover:text-emerald-400 transition-colors" title="Twitter / X">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="hover:text-emerald-400 transition-colors" title="YouTube">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="#" className="hover:text-emerald-400 transition-colors" title="Instagram">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom copyright row */}
          <div className="border-t border-emerald-950/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© 2025 CarbonSphere. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-emerald-500/80">
              Together for a Cleaner, Greener Tomorrow 🌿
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
