import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Filter,
  MapPin,
  Heart,
  ChevronDown,
  X,
  RotateCcw,
  Check,
  CheckCircle2,
  ArrowRight,
  Bell,
  Building2,
  Target,
  Layers,
  Coins,
  ShieldCheck,
  BrainCircuit,
  Wind,
  Sun,
  Droplets,
  Flame,
  Sprout,
  LayoutDashboard,
  Store,
  ShoppingCart,
  Receipt,
  FileText,
  MessageSquare,
  Compass,
  Edit3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Assets
import windImg from '@/assets/project-wind.jpg';
import solarImg from '@/assets/project-solar.jpg';
import hydroImg from '@/assets/western-ghats-lake.jpg';
import methaneImg from '@/assets/project-methane.jpg';
import sproutImg from '@/assets/net-zero-sprout.jpg';
import heroBgImg from '@/assets/western-ghats-sunrise.jpg';
import forestBannerImg from '@/assets/forest-canopy.jpg';

// Initial AI-matched datasets matching the design screenshot
const INITIAL_AI_MATCHES = [
  {
    id: 'TN-WIND-01',
    rankBadge: '#1 Best Match',
    title: 'Tamil Nadu Wind Energy Project',
    location: 'Coimbatore, Tamil Nadu, India',
    region: 'South India',
    category: 'Renewable Energy',
    typeIcon: 'wind',
    description: 'Generates clean electricity through wind turbines, reducing fossil fuel dependence.',
    standard: 'Verra (VCS)',
    sdgs: ['SDG 7', 'SDG 13'],
    coBenefit: 'Local Employment',
    matchScore: 95,
    reasons: [
      'Matches your industry',
      'Aligns with your sustainability goals',
      'Cost-effective option'
    ],
    pricePerTon: 2600,
    availableTons: 1000,
    image: windImg,
    supplier: 'Tamil Nadu Clean Power Corp'
  },
  {
    id: 'WG-FOR-02',
    rankBadge: '#2 High Impact',
    title: 'Western Ghats Afforestation',
    location: 'Kodagu, Karnataka, India',
    region: 'South India',
    category: 'Afforestation / Reforestation',
    typeIcon: 'tree',
    description: 'Restores native forests, enhances biodiversity, and captures long-term carbon.',
    standard: 'Gold Standard',
    sdgs: ['SDG 13', 'SDG 15'],
    coBenefit: 'Biodiversity',
    matchScore: 92,
    reasons: [
      'High environmental impact',
      'Supports biodiversity',
      'Trusted supplier'
    ],
    pricePerTon: 2800,
    availableTons: 500,
    image: hydroImg,
    supplier: 'Sahyadri Biosphere Restoration'
  },
  {
    id: 'RJ-SOLAR-03',
    rankBadge: '#3 Cost Effective',
    title: 'Rajasthan Solar Power',
    location: 'Jodhpur, Rajasthan, India',
    region: 'North India',
    category: 'Renewable Energy',
    typeIcon: 'sun',
    description: 'Utility-scale solar project supplying clean energy to the grid.',
    standard: 'Gold Standard',
    sdgs: ['SDG 7', 'SDG 13'],
    coBenefit: 'Affordable',
    matchScore: 88,
    reasons: [
      'Best value for money',
      'Aligns with your location preference',
      'Quick availability'
    ],
    pricePerTon: 2750,
    availableTons: 750,
    image: solarImg,
    supplier: 'Thar Solar Parks Ltd'
  },
  {
    id: 'PN-METH-04',
    rankBadge: '#4 Emerging',
    title: 'Pune Methane Capture',
    location: 'Pune, Maharashtra, India',
    region: 'West India',
    category: 'Methane Capture',
    typeIcon: 'flame',
    description: 'Captures methane from organic waste, preventing powerful greenhouse gas emissions.',
    standard: 'Verra (VCS)',
    sdgs: ['SDG 13', 'SDG 12'],
    coBenefit: 'Circular Economy',
    matchScore: 85,
    reasons: [
      'Unique impact area',
      'Supports circular economy',
      'Growing demand'
    ],
    pricePerTon: 2500,
    availableTons: 600,
    image: methaneImg || windImg,
    supplier: 'Maharashtra Biogas Bio-Solutions'
  },
  {
    id: 'SB-BLUE-05',
    rankBadge: '#5 Community Focus',
    title: 'Sundarbans Blue Carbon',
    location: 'Sundarbans, West Bengal, India',
    region: 'East India',
    category: 'Mangrove Restoration',
    typeIcon: 'sprout',
    description: 'Protects mangroves, enhances coastal resilience, and captures blue carbon.',
    standard: 'Plan Vivo',
    sdgs: ['SDG 14', 'SDG 15'],
    coBenefit: 'Community Benefit',
    matchScore: 82,
    reasons: [
      'Supports local communities',
      'High long-term impact',
      'Nature-based solution'
    ],
    pricePerTon: 3000,
    availableTons: 400,
    image: sproutImg || forestBannerImg,
    supplier: 'Sundarbans Coastal Delta Trust'
  }
];

export const MatchingEnginePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filters State matching the screenshot
  const [selectedTypes, setSelectedTypes] = useState(['Renewable Energy']);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStandards, setSelectedStandards] = useState(['Gold Standard']);
  const [selectedAIPriority, setSelectedAIPriority] = useState('Best Match (Recommended)');

  // Sorting
  const [sortBy, setSortBy] = useState('AI Match Score');

  // Matching Criteria State (Right column)
  const [criteria, setCriteria] = useState({
    industry: 'Manufacturing',
    goal: 'Offset 1,000+ tons CO₂',
    preferredTypes: 'Renewable Energy, Afforestation',
    budgetRange: '₹500 – ₹5,000 / ton',
    location: 'India',
    certPriority: 'Gold Standard, Verra (VCS)'
  });
  const [isEditCriteriaOpen, setIsEditCriteriaOpen] = useState(false);

  // AI Matching Architecture Info Modal
  const [isAiInfoModalOpen, setIsAiInfoModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('algorithm'); // 'algorithm' | 'opportunities' | 'pricing' | 'trust' | 'simulator'

  // Live Simulator State
  const [simPurity, setSimPurity] = useState(96.5);
  const [simQuantity, setSimQuantity] = useState(1200);
  const [simDistance, setSimDistance] = useState(140);
  const [simTrust, setSimTrust] = useState(94);

  // Selected Project for Detail Modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(50);
  const [isOrdered, setIsOrdered] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Handlers
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStandard = (std) => {
    setSelectedStandards((prev) =>
      prev.includes(std) ? prev.filter((s) => s !== std) : [...prev, std]
    );
  };

  const resetFilters = () => {
    setSelectedTypes(['Renewable Energy']);
    setMaxPrice(5000);
    setSelectedRegion('');
    setSelectedStandards(['Gold Standard']);
    setSelectedAIPriority('Best Match (Recommended)');
    setSortBy('AI Match Score');
    showToast('Preferences reset to default.');
  };

  const handleApplyFilters = () => {
    showToast('AI Match filters applied successfully!');
  };

  // Filtered Matches
  const filteredMatches = useMemo(() => {
    return INITIAL_AI_MATCHES.filter((item) => {
      // 1. Types
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.category)) {
        // If type is not checked, still allow display if no type filter active or partial match
        // but for exact interaction we can filter
      }

      // 2. Price
      if (item.pricePerTon > maxPrice) {
        return false;
      }

      // 3. Region
      if (selectedRegion && item.region !== selectedRegion) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'AI Match Score') return b.matchScore - a.matchScore;
      if (sortBy === 'Price: Low to High') return a.pricePerTon - b.pricePerTon;
      if (sortBy === 'Price: High to Low') return b.pricePerTon - a.pricePerTon;
      if (sortBy === 'Available Volume') return b.availableTons - a.availableTons;
      return 0;
    });
  }, [selectedTypes, maxPrice, selectedRegion, selectedStandards, sortBy]);

  const handleConfirmOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      showToast(`Order confirmed for ${purchaseQuantity} tons of ${selectedProject.title}!`);
      setTimeout(() => {
        setSelectedProject(null);
        setIsOrdered(false);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col selection:bg-[#0E6245] selection:text-white">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0E6245] text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0E6245] to-[#22c55e] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4C8 21.5 10 22 12 22c5.5 0 10-4.5 10-10 0-5.5-4.5-10-10-10zm-1 16.5c-3.5 0-6.5-2.5-7-6 .5.5 1.5 1 2.5 1 3 0 5-2 6-4 1 2 3 4 6 4 1 0 2-.5 2.5-1-.5 3.5-3.5 6-7 6z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  Carbon<span className="text-[#0E6245]">X</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">
                  Cleaner Industries. Brighter Tomorrows.
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-4 lg:gap-6 h-full text-xs font-semibold text-slate-600">
            <Link
              to="/buyer/dashboard"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:text-[#0E6245] transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/marketplace"
              className="relative flex items-center gap-1.5 px-2 py-1.5 text-[#0E6245] font-bold h-full border-b-2 border-[#0E6245]"
            >
              <Store className="w-3.5 h-3.5 text-[#0E6245]" />
              <span>Marketplace</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:text-[#0E6245] transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
              <span>Orders</span>
            </Link>

            <Link
              to="/transactions"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:text-[#0E6245] transition-colors"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Transactions</span>
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:text-[#0E6245] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Reports</span>
            </Link>

            <Link
              to="/messages"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:text-[#0E6245] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Messages</span>
            </Link>
          </nav>

          {/* Right User Capsule */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => showToast('You have 3 unread credit updates.')}
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0E4833] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                KP
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  Krishna Prajapati
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Buyer</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 cursor-pointer hidden sm:block" />
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO AI MATCH HEADER                                                   */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-slate-900 overflow-hidden py-10 sm:py-12 border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-teal-900/60 to-emerald-950/80" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Sparkle Icon */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0E6245] shrink-0 shadow-lg border border-emerald-300/40">
                <Sparkles className="w-6 h-6 fill-[#0E6245] text-[#0E6245]" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  AI Match Results
                </h1>
                <p className="text-sm font-semibold text-emerald-100">
                  Personalized carbon credit opportunities, just for you.
                </p>
                <p className="text-xs text-emerald-200/80 font-medium">
                  Our AI analyzes your goals, industry, and preferences to find the best match.
                </p>
              </div>
            </div>

            {/* Right Callouts */}
            <div className="flex items-center gap-4 self-start md:self-auto">
              <div className="hidden lg:block text-right">
                <span className="block text-emerald-200 font-serif italic text-xs tracking-wider">
                  Cleaner Choices
                </span>
                <span className="block text-emerald-100 font-serif italic text-sm font-semibold tracking-wide">
                  Brighter Tomorrows
                </span>
              </div>

              <div className="bg-white/95 backdrop-blur-md border border-emerald-300/40 rounded-2xl px-4 py-2.5 flex items-center gap-3 text-slate-800 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#0E6245] shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0E6245]" stroke="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4C8 21.5 10 22 12 22c5.5 0 10-4.5 10-10 0-5.5-4.5-10-10-10zm-1 16.5c-3.5 0-6.5-2.5-7-6 .5.5 1.5 1 2.5 1 3 0 5-2 6-4 1 2 3 4 6 4 1 0 2-.5 2.5-1-.5 3.5-3.5 6-7 6z" />
                  </svg>
                </div>
                <div className="text-xs font-semibold leading-tight text-slate-800">
                  <span className="font-bold text-slate-900">AI powered</span><br />
                  for a greener future.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THREE-COLUMN WORKSPACE                                                 */}
      {/* ========================================================================= */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: REFINE WITH PREFERENCES (Col span 3)                    */}
          {/* ===================================================================== */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                <Filter className="w-4 h-4 text-[#0E6245]" />
                <span>Refine with Your Preferences</span>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-[#0E6245] hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Project Type */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900">Project Type</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {[
                  'Afforestation / Reforestation',
                  'Renewable Energy',
                  'Methane Capture',
                  'Clean Cookstoves',
                  'Sustainable Agriculture',
                  'Mangrove Restoration'
                ].map((type) => {
                  const isChecked = selectedTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-600 hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 rounded border-slate-300 text-[#0E6245] focus:ring-[#0E6245] accent-[#0E6245] cursor-pointer"
                      />
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Price Range (per ton)</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0E6245]"
                />
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>₹500</span>
                  <span>₹5,000</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Location</h3>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium appearance-none cursor-pointer focus:border-[#0E6245] outline-none"
                >
                  <option value="">Select Region</option>
                  <option value="North India">North India</option>
                  <option value="South India">South India</option>
                  <option value="West India">West India</option>
                  <option value="East India">East India</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Certification Standard */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Certification Standard</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {[
                  'Verra (VCS)',
                  'Gold Standard',
                  'Climate Action Reserve (CAR)',
                  'Plan Vivo'
                ].map((std) => {
                  const isChecked = selectedStandards.includes(std);
                  return (
                    <label
                      key={std}
                      className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-600 hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleStandard(std)}
                        className="w-4 h-4 rounded border-slate-300 text-[#0E6245] focus:ring-[#0E6245] accent-[#0E6245] cursor-pointer"
                      />
                      <span>{std}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* AI Priority */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">AI Priority</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {[
                  'Best Match (Recommended)',
                  'Lowest Price',
                  'Highest Impact',
                  'Nearest Location'
                ].map((priority) => {
                  const isChecked = selectedAIPriority === priority;
                  return (
                    <label
                      key={priority}
                      className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-600 hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setSelectedAIPriority(priority)}
                        className="w-4 h-4 rounded border-slate-300 text-[#0E6245] focus:ring-[#0E6245] accent-[#0E6245] cursor-pointer"
                      />
                      <span>{priority}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleApplyFilters}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0E6245] hover:bg-[#0b5038] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>
            </div>

          </aside>

          {/* ===================================================================== */}
          {/* CENTER COLUMN: TOP MATCHES FOR YOU (Col span 6)                       */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-transparent pb-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Top Matches for You
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Based on your goals, industry, location, and purchase history.
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-500">Sort by</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-800 outline-none cursor-pointer focus:border-[#0E6245] shadow-2xs"
                  >
                    <option value="AI Match Score">AI Match Score</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Available Volume">Available Volume</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 5 AI Matched Cards */}
            <div className="space-y-3.5">
              {filteredMatches.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all p-4 space-y-3"
                >
                  {/* Top Row: Thumbnail + Info + AI Score + Pricing */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    {/* Thumbnail with Rank Badge */}
                    <div className="relative w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#E0F7FA] text-[#0E7490] text-[10px] font-bold border border-cyan-200 shadow-xs">
                          {project.rankBadge}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between space-y-1.5">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                          {project.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
                          <span className="flex items-center gap-1 text-slate-600">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{project.location}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            {project.typeIcon === 'wind' && <Wind className="w-3 h-3 text-[#0E6245]" />}
                            {project.typeIcon === 'sun' && <Sun className="w-3 h-3 text-amber-500" />}
                            {project.typeIcon === 'tree' && <Sprout className="w-3 h-3 text-emerald-600" />}
                            {project.typeIcon === 'flame' && <Flame className="w-3 h-3 text-orange-500" />}
                            {project.typeIcon === 'sprout' && <Sprout className="w-3 h-3 text-teal-600" />}
                            <span>{project.category}</span>
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Standard and SDG Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
                          {project.standard}
                        </span>
                        {project.sdgs.map((sdg) => (
                          <span
                            key={sdg}
                            className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100"
                          >
                            {sdg}
                          </span>
                        ))}
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-semibold border border-teal-100">
                          {project.coBenefit}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Row: AI Score Box + Reason Bullets + Price + Action CTA */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    
                    {/* Left: AI Score & Match Reasons */}
                    <div className="flex items-start gap-3">
                      {/* Score Box */}
                      <div className="bg-[#E6F7F0] border border-emerald-200 rounded-xl px-3 py-2 text-center shrink-0 min-w-[75px]">
                        <span className="block text-lg font-black text-[#0E6245] leading-none">
                          {project.matchScore}%
                        </span>
                        <span className="block text-[9px] font-bold text-emerald-800 uppercase tracking-tight mt-0.5">
                          AI Match Score
                        </span>
                      </div>

                      {/* Reasons */}
                      <div className="space-y-1">
                        {project.reasons.map((r, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6245] shrink-0" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Price + View Details Button */}
                    <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 shrink-0">
                      <div className="text-left md:text-right">
                        <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-none">
                          ₹ {project.pricePerTon.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-normal text-slate-500">/ ton</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {project.availableTons.toLocaleString('en-IN')} tons available
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-1.5 rounded-lg border border-[#0E6245] text-[#0E6245] hover:bg-[#0E6245] hover:text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: CRITERIA + INSIGHTS + PROMO (Col span 3)                 */}
          {/* ===================================================================== */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Card 1: Your Matching Criteria */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Compass className="w-4 h-4 text-[#0E6245]" />
                  <span>Your Matching Criteria</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditCriteriaOpen(true)}
                  className="text-[11px] font-semibold text-[#0E6245] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {/* Industry */}
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#0E6245] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Industry</span>
                    <span className="font-bold text-slate-900">{criteria.industry}</span>
                  </div>
                </div>

                {/* Goal */}
                <div className="flex items-start gap-2.5">
                  <Target className="w-4 h-4 text-[#0E6245] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Goal</span>
                    <span className="font-bold text-slate-900">{criteria.goal}</span>
                  </div>
                </div>

                {/* Preferred Project Type */}
                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-[#0E6245] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Preferred Project Type</span>
                    <span className="font-bold text-slate-900">{criteria.preferredTypes}</span>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="flex items-start gap-2.5">
                  <Coins className="w-4 h-4 text-[#0E6245] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Budget Range</span>
                    <span className="font-bold text-slate-900">{criteria.budgetRange}</span>
                  </div>
                </div>

                {/* Location Preference */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0E6245] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Location Preference</span>
                    <span className="font-bold text-slate-900">{criteria.location}</span>
                  </div>
                </div>

                {/* Certification Priority */}
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0E6245] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Certification Priority</span>
                    <span className="font-bold text-slate-900">{criteria.certPriority}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: AI Insights */}
            <div className="bg-[#E6F7F0]/40 border border-emerald-200/80 rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <BrainCircuit className="w-4 h-4 text-[#0E6245]" />
                <span>AI Insights</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                These projects are ranked using our AI model based on your preferences, past activity, and global impact data. Projects with higher match scores are more aligned with your sustainability goals and offer greater long-term value.
              </p>

              <button
                type="button"
                onClick={() => setIsAiInfoModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 font-bold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
              >
                <span>Learn More About AI Matching</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0E6245]" />
              </button>
            </div>

            {/* Card 3: Smarter Choices Promo */}
            <div className="relative rounded-2xl overflow-hidden text-white p-5 shadow-lg space-y-3 bg-emerald-950">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${forestBannerImg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-transparent" />

              <div className="relative z-10 space-y-2">
                <h3 className="text-base font-extrabold leading-snug text-white">
                  Smarter Choices.<br />Greener Tomorrow.
                </h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Let AI help you make a bigger impact.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/marketplace');
                      showToast('Navigating to marketplace...');
                    }}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-900 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Explore More Projects</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0E6245]" />
                  </button>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" stroke="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4C8 21.5 10 22 12 22c5.5 0 10-4.5 10-10 0-5.5-4.5-10-10-10zm-1 16.5c-3.5 0-6.5-2.5-7-6 .5.5 1.5 1 2.5 1 3 0 5-2 6-4 1 2 3 4 6 4 1 0 2-.5 2.5-1-.5 3.5-3.5 6-7 6z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. DETAIL & PURCHASE MODAL                                                */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="relative h-44 w-full bg-slate-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover opacity-80"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#0E6245] font-bold text-xs shadow-sm">
                  {selectedProject.rankBadge}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-white font-bold text-xs shadow-sm">
                  {selectedProject.matchScore}% Match
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedProject.location}</span>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Price per Tonne</span>
                  <span className="font-bold text-slate-900">
                    ₹ {selectedProject.pricePerTon.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Order Quantity (Tons)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPurchaseQuantity((q) => Math.max(10, q - 10))}
                      className="w-6 h-6 rounded bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-slate-900">
                      {purchaseQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPurchaseQuantity((q) => Math.min(selectedProject.availableTons, q + 10))
                      }
                      className="w-6 h-6 rounded bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>Total Estimated Cost</span>
                  <span className="text-[#0E6245]">
                    ₹ {(selectedProject.pricePerTon * purchaseQuantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isOrdered}
                  className="flex-1 py-2.5 rounded-xl bg-[#0E6245] hover:bg-[#0b5038] text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  {isOrdered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Purchase Credits</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. EDIT CRITERIA MODAL                                                    */}
      {/* ========================================================================= */}
      {isEditCriteriaOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#0E6245]" />
                <span>Edit Matching Criteria</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditCriteriaOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Industry</label>
                <input
                  type="text"
                  value={criteria.industry}
                  onChange={(e) => setCriteria({ ...criteria, industry: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#0E6245]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Goal</label>
                <input
                  type="text"
                  value={criteria.goal}
                  onChange={(e) => setCriteria({ ...criteria, goal: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#0E6245]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Location Preference</label>
                <input
                  type="text"
                  value={criteria.location}
                  onChange={(e) => setCriteria({ ...criteria, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#0E6245]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Certification Priority</label>
                <input
                  type="text"
                  value={criteria.certPriority}
                  onChange={(e) => setCriteria({ ...criteria, certPriority: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#0E6245]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditCriteriaOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditCriteriaOpen(false);
                  showToast('Matching criteria updated.');
                }}
                className="flex-1 py-2 rounded-xl bg-[#0E6245] text-white font-bold text-xs shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* 6. AI MATCHING ENGINE INFO & SIMULATOR MODAL                             */}
      {/* ========================================================================= */}
      {isAiInfoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 border border-emerald-400/30">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>CarbonSphere AI Matching Engine</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wide border border-emerald-400/30">
                      Explainable AI
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-200/80 font-medium">
                    Multi-Variable Compatibility, Opportunity Detection & Price Prediction
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiInfoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 overflow-x-auto shrink-0 no-scrollbar">
              {[
                { id: 'algorithm', label: 'Matching Algorithm', icon: Sparkles },
                { id: 'simulator', label: 'Live Simulator', icon: Target },
                { id: 'opportunities', label: 'Opportunity Engine', icon: Sprout },
                { id: 'pricing', label: 'Price Prediction', icon: Coins },
                { id: 'trust', label: 'Trust Engine', icon: ShieldCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeModalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModalTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap rounded-t-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#0E6245] border-t-2 border-l border-r border-[#0E6245] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-xs flex-1">
              
              {/* TAB 1: MATCHING ALGORITHM */}
              {activeModalTab === 'algorithm' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                      Master Compatibility Formula
                    </span>
                    <div className="text-xs font-mono font-bold text-emerald-900 bg-white/80 p-2.5 rounded-lg border border-emerald-300/60 leading-relaxed">
                      Compatibility Score = (30% × Purity Match) + (25% × Quantity Match) + (20% × Distance Match) + (15% × Trust Score) + (10% × Historical Success Rate)
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">1. Purity Match (30%)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">Weight: 0.30</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        Evaluates biogenic CO₂ concentration against industrial tolerance. 100% awarded if supplier purity exceeds required threshold.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">2. Quantity Match (25%)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Weight: 0.25</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        Fulfillment capacity ratio. Ideal match (100 pts) when supplier can fulfill 100%–150% of buyer batch demand without deficit.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">3. Distance Logistics (20%)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Weight: 0.20</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        Haversine great-circle calculation minimizing transportation emissions. Scores highest (100 pts) within 50 km pipeline corridor.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">4. Trust Score (15%)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">Weight: 0.15</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        Multi-variable supplier rating covering registry verification (40%), historical deliveries (25%), and on-time SLA rates.
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <span className="font-bold text-slate-900 block">Match Classification Tiers</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-emerald-100/70 border border-emerald-300 rounded-lg p-2 font-bold text-emerald-900">
                        Score ≥ 90<br /><span className="text-[10px] font-semibold text-emerald-700">Excellent Match</span>
                      </div>
                      <div className="bg-teal-100/70 border border-teal-300 rounded-lg p-2 font-bold text-teal-900">
                        Score 75 - 89<br /><span className="text-[10px] font-semibold text-teal-700">Good Match</span>
                      </div>
                      <div className="bg-amber-100/70 border border-amber-300 rounded-lg p-2 font-bold text-amber-900">
                        Score 60 - 74<br /><span className="text-[10px] font-semibold text-amber-700">Moderate Match</span>
                      </div>
                      <div className="bg-rose-100/70 border border-rose-300 rounded-lg p-2 font-bold text-rose-900">
                        Score &lt; 60<br /><span className="text-[10px] font-semibold text-rose-700">Low Compatibility</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE SIMULATOR */}
              {activeModalTab === 'simulator' && (
                <div className="space-y-4">
                  <p className="text-slate-600">
                    Test the live scoring engine by adjusting parameters below to see the Compatibility Score and explainable AI reasons update in real-time.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50 border border-slate-200 rounded-xl p-4">
                    {/* Sliders */}
                    <div className="space-y-3.5">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Supplier CO₂ Purity:</span>
                          <span className="text-[#0E6245]">{simPurity}%</span>
                        </div>
                        <input
                          type="range"
                          min={80}
                          max={99.9}
                          step={0.1}
                          value={simPurity}
                          onChange={(e) => setSimPurity(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg accent-[#0E6245]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Available Quantity:</span>
                          <span className="text-[#0E6245]">{simQuantity} tons</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={3000}
                          step={50}
                          value={simQuantity}
                          onChange={(e) => setSimQuantity(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg accent-[#0E6245]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Logistics Distance:</span>
                          <span className="text-[#0E6245]">{simDistance} km</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={600}
                          step={10}
                          value={simDistance}
                          onChange={(e) => setSimDistance(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg accent-[#0E6245]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Supplier Trust Score:</span>
                          <span className="text-[#0E6245]">{simTrust}/100</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={100}
                          step={1}
                          value={simTrust}
                          onChange={(e) => setSimTrust(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg accent-[#0E6245]"
                        />
                      </div>
                    </div>

                    {/* Live Result Box */}
                    {(() => {
                      const pScore = simPurity >= 94.0 ? 100 : Math.max(30, Math.round(100 - (94.0 - simPurity) * 10));
                      const qScore = simQuantity >= 1000 ? 100 : Math.round((simQuantity / 1000) * 100);
                      const dScore = simDistance <= 50 ? 100 : simDistance <= 150 ? 92 : Math.max(30, Math.round(100 - (simDistance / 600) * 70));
                      const tScore = simTrust;
                      const hScore = 90;

                      const calculatedScore = Math.round(
                        pScore * 0.30 + qScore * 0.25 + dScore * 0.20 + tScore * 0.15 + hScore * 0.10
                      );

                      const level =
                        calculatedScore >= 90
                          ? 'Excellent'
                          : calculatedScore >= 75
                          ? 'Good'
                          : calculatedScore >= 60
                          ? 'Moderate'
                          : 'Low';

                      return (
                        <div className="bg-white border border-emerald-200 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 uppercase">Simulated Result</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                              {level} Match
                            </span>
                          </div>

                          <div className="text-center py-2">
                            <div className="text-3xl font-black text-[#0E6245]">{calculatedScore}%</div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                              Compatibility Score
                            </span>
                          </div>

                          <div className="space-y-1 text-[11px] text-slate-600">
                            <div className="flex justify-between">
                              <span>Purity Sub-Score:</span>
                              <strong className="text-slate-800">{pScore}/100</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity Sub-Score:</span>
                              <strong className="text-slate-800">{qScore}/100</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Distance Sub-Score:</span>
                              <strong className="text-slate-800">{dScore}/100</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Trust Sub-Score:</span>
                              <strong className="text-slate-800">{tScore}/100</strong>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* TAB 3: CARBON OPPORTUNITY ENGINE */}
              {activeModalTab === 'opportunities' && (
                <div className="space-y-3">
                  <p className="text-slate-600">
                    If no direct buyer exists, the <strong>Carbon Opportunity Engine</strong> matches raw CO₂ purity streams to viable off-take industries:
                  </p>

                  <div className="space-y-2">
                    {[
                      { name: 'Food & Beverage Carbonation', purity: '≥ 99.5%', price: '₹4,800 - ₹5,600 / ton', desc: 'Liquid CO₂ for beverage bottling, flash freezing, and ISBT-grade food packaging.' },
                      { name: 'Greenhouse Horticulture Enrichment', purity: '≥ 94.0%', price: '₹3,200 - ₹4,000 / ton', desc: 'Accelerates crop growth in automated commercial greenhouses (+22% YoY demand growth).' },
                      { name: 'Synthetic E-Fuels & Power-to-X', purity: '≥ 96.0%', price: '₹4,200 - ₹5,100 / ton', desc: 'Catalytic hydrogenation with green hydrogen to produce e-methanol & SAF (+48% YoY).' },
                      { name: 'Concrete Curing & Mineralization', purity: '≥ 85.0%', price: '₹2,300 - ₹3,100 / ton', desc: 'Direct CO₂ injection during concrete mixing permanently sequestering CaCO₃.' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {item.purity}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        <span className="font-bold text-[#0E6245] shrink-0 text-xs">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PRICE PREDICTION ENGINE */}
              {activeModalTab === 'pricing' && (
                <div className="space-y-3">
                  <p className="text-slate-600">
                    Our <strong>Price Prediction Model</strong> computes dynamic spot prices considering historical deal logs, purity premiums, volume economies, and freight allowances:
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <span className="font-bold text-slate-900 block">Dynamic Pricing Multipliers:</span>
                    <ul className="space-y-1 text-slate-600 text-[11px] list-disc pl-4">
                      <li><strong>Purity Premium:</strong> Streams with &gt; 99% purity command up to a +65% market premium over industrial flue gas.</li>
                      <li><strong>Volume Discounts:</strong> Bulk orders &gt; 1,000 tons automatically receive volume tier discounts (4%–18%).</li>
                      <li><strong>Freight Adjustments:</strong> Accounts for regional logistics distance (~₹1.50 per ton-km over 100 km).</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 5: TRUST ENGINE */}
              {activeModalTab === 'trust' && (
                <div className="space-y-3">
                  <p className="text-slate-600">
                    The <strong>Trust Score Engine</strong> computes an immutable reliability rating from 0 to 100 based on 5 verification vectors:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="border border-slate-200 rounded-xl p-3 space-y-1">
                      <span className="font-bold text-slate-900">40% Verification Status</span>
                      <p className="text-[11px] text-slate-500">Gold Standard, Verra VCS, or Puro.earth CORC registry audit.</p>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3 space-y-1">
                      <span className="font-bold text-slate-900">25% Transaction History</span>
                      <p className="text-[11px] text-slate-500">Ratio of successfully settled smart contracts without disputes.</p>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3 space-y-1">
                      <span className="font-bold text-slate-900">15% On-Time Delivery</span>
                      <p className="text-[11px] text-slate-500">Adherence to scheduled dispatch and IoT custody transfer SLAs.</p>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3 space-y-1">
                      <span className="font-bold text-slate-900">20% Reviews & Consistency</span>
                      <p className="text-[11px] text-slate-500">Verified buyer ratings and telemetry purity consistency.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-400 font-medium">
                CarbonSphere v2.0 • AI Recommendation Engine
              </span>
              <button
                type="button"
                onClick={() => setIsAiInfoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#0E6245] hover:bg-[#0b5038] text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                Got It
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MatchingEnginePage;
