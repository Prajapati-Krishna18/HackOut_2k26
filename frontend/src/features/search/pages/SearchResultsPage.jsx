import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Heart,
  ChevronDown,
  X,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Bell,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Wind,
  Sun,
  Droplets,
  Layers,
  LayoutDashboard,
  Store,
  ShoppingCart,
  Receipt,
  FileText,
  MessageSquare,
  Globe
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Assets
import windImg from '@/assets/project-wind.jpg';
import solarImg from '@/assets/project-solar.jpg';
import hydroImg from '@/assets/western-ghats-lake.jpg';
import heroBgImg from '@/assets/western-ghats-sunrise.jpg';
import forestBannerImg from '@/assets/forest-canopy.jpg';
import mapBgImg from '@/assets/western-ghats-map.jpg';

// Initial Project Dataset matching the exact design
const INITIAL_PROJECTS = [
  {
    id: 'TN-WIND-01',
    title: 'Tamil Nadu Wind Energy Project',
    badge: 'Verified',
    badgeType: 'verified',
    category: 'Renewable Energy',
    typeIcon: 'wind',
    location: 'Coimbatore, Tamil Nadu, India',
    region: 'South India',
    country: 'India',
    description: 'Generates clean electricity through wind turbines, reducing fossil fuel dependence.',
    standard: 'Verra (VCS)',
    sdgs: ['SDG 7', 'SDG 13'],
    coBenefit: 'Community Benefit',
    pricePerTon: 2600,
    availableTons: 1000,
    image: windImg,
    coordinates: { top: '78%', left: '46%' },
    vintage: '2025/2026',
    supplier: 'Tamil Nadu Clean Power Corp'
  },
  {
    id: 'RJ-SOLAR-02',
    title: 'Rajasthan Solar Power',
    badge: 'Gold Standard',
    badgeType: 'gold',
    category: 'Renewable Energy',
    typeIcon: 'sun',
    location: 'Jodhpur, Rajasthan, India',
    region: 'North India',
    country: 'India',
    description: 'Utility-scale solar project supplying clean energy to the grid.',
    standard: 'Gold Standard',
    sdgs: ['SDG 7', 'SDG 13'],
    coBenefit: 'Job Creation',
    pricePerTon: 2750,
    availableTons: 750,
    image: solarImg,
    coordinates: { top: '35%', left: '32%' },
    vintage: '2025',
    supplier: 'Thar Solar Parks Ltd'
  },
  {
    id: 'UK-HYDRO-03',
    title: 'Himalayan Hydro Power',
    badge: 'Verified',
    badgeType: 'verified',
    category: 'Renewable Energy',
    typeIcon: 'hydro',
    location: 'Uttarakhand, India',
    region: 'North India',
    country: 'India',
    description: 'Run-of-river hydro project generating clean and reliable energy.',
    standard: 'Verra (VCS)',
    sdgs: ['SDG 7', 'SDG 6'],
    coBenefit: 'Biodiversity',
    pricePerTon: 2900,
    availableTons: 500,
    image: hydroImg,
    coordinates: { top: '24%', left: '42%' },
    vintage: '2026',
    supplier: 'Himalayan Eco-Hydel Grid'
  },
  {
    id: 'MH-WIND-04',
    title: 'Maharashtra Wind Farm',
    badge: 'Verified',
    badgeType: 'verified',
    category: 'Renewable Energy',
    typeIcon: 'wind',
    location: 'Satara, Maharashtra, India',
    region: 'West India',
    country: 'India',
    description: "Large-scale wind farm contributing to India's clean energy goals.",
    standard: 'Climate Action Reserve (CAR)',
    sdgs: ['SDG 7', 'SDG 13'],
    coBenefit: 'Local Employment',
    pricePerTon: 2500,
    availableTons: 1200,
    image: windImg,
    coordinates: { top: '56%', left: '36%' },
    vintage: '2025/2026',
    supplier: 'Sahyadri Wind Energy Co'
  },
  {
    id: 'GJ-SOLAR-05',
    title: 'Gujarat Solar Initiative',
    badge: 'Verified',
    badgeType: 'verified',
    category: 'Renewable Energy',
    typeIcon: 'sun',
    location: 'Kutch, Gujarat, India',
    region: 'West India',
    country: 'India',
    description: 'Solar project helping industrial consumers transition to clean energy.',
    standard: 'Verra (VCS)',
    sdgs: ['SDG 7', 'SDG 9'],
    coBenefit: 'Community Development',
    pricePerTon: 2650,
    availableTons: 900,
    image: solarImg,
    coordinates: { top: '44%', left: '26%' },
    vintage: '2025',
    supplier: 'Rann Green Power Ltd'
  }
];

export const SearchResultsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Search Query
  const [searchQuery, setSearchQuery] = useState('renewable energy');

  // Filter States
  const [selectedTypes, setSelectedTypes] = useState(['Renewable Energy']);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStandards, setSelectedStandards] = useState(['Verra (VCS)']);
  const [selectedCoBenefits, setSelectedCoBenefits] = useState([]);

  // Sorting
  const [sortBy, setSortBy] = useState('Relevance');

  // Favorites
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Active Map Pin highlight
  const [activePinId, setActivePinId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Modal Detail State
  const [selectedProject, setSelectedProject] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(50);
  const [isOrdered, setIsOrdered] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Toggle Helpers
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

  const toggleCoBenefit = (benefit) => {
    setSelectedCoBenefits((prev) =>
      prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]
    );
  };

  const resetFilters = () => {
    setSearchQuery('renewable energy');
    setSelectedTypes(['Renewable Energy']);
    setMinPrice(500);
    setMaxPrice(5000);
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedStandards(['Verra (VCS)']);
    setSelectedCoBenefits([]);
    setSortBy('Relevance');
    showToast('Filters reset to default.');
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setMinPrice(500);
    setMaxPrice(5000);
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedStandards([]);
    setSelectedCoBenefits([]);
    showToast('All filters cleared.');
  };

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from favorites.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to favorites!');
        return [...prev, id];
      }
    });
  };

  // Search Filter Calculation
  const filteredProjects = useMemo(() => {
    return INITIAL_PROJECTS.filter((project) => {
      // 1. Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          project.title.toLowerCase().includes(q) ||
          project.category.toLowerCase().includes(q) ||
          project.location.toLowerCase().includes(q) ||
          project.standard.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Project Types
      if (selectedTypes.length > 0 && !selectedTypes.includes(project.category)) {
        return false;
      }

      // 3. Standards
      if (selectedStandards.length > 0 && !selectedStandards.includes(project.standard)) {
        return false;
      }

      // 4. Region
      if (selectedRegion && project.region !== selectedRegion) {
        return false;
      }

      // 5. Country
      if (selectedCountry && project.country !== selectedCountry) {
        return false;
      }

      // 6. Price Range
      if (project.pricePerTon < minPrice || project.pricePerTon > maxPrice) {
        return false;
      }

      // 7. Co-Benefits
      if (selectedCoBenefits.length > 0 && !selectedCoBenefits.includes(project.coBenefit)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.pricePerTon - b.pricePerTon;
      if (sortBy === 'Price: High to Low') return b.pricePerTon - a.pricePerTon;
      if (sortBy === 'Available Volume') return b.availableTons - a.availableTons;
      return 0; // Default Relevance
    });
  }, [
    searchQuery,
    selectedTypes,
    selectedStandards,
    selectedRegion,
    selectedCountry,
    minPrice,
    maxPrice,
    selectedCoBenefits,
    sortBy
  ]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    showToast(`Showing results for "${searchQuery}"`);
  };

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
      
      {/* Floating Toast Notification */}
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
          
          {/* Logo & Slogan */}
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

          {/* Center Navigation Links */}
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

          {/* Right User & Notification Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notification Bell */}
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

            {/* User Capsule */}
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
      {/* 2. HERO SEARCH HEADER                                                     */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-slate-900 overflow-hidden py-10 sm:py-12 border-b border-slate-200">
        {/* Mountain Forest Background with gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-teal-900/60 to-emerald-950/80" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
          
          {/* Header Texts & Right Callout */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Search Results
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                Find verified carbon credits that match your needs.
              </p>
            </div>

            {/* Right Aesthetic Badges */}
            <div className="flex items-center gap-4 self-start md:self-auto">
              {/* Slant script styling */}
              <div className="hidden lg:block text-right">
                <span className="block text-emerald-200 font-serif italic text-xs tracking-wider">
                  Cleaner Choices
                </span>
                <span className="block text-emerald-100 font-serif italic text-sm font-semibold tracking-wide">
                  Brighter Tomorrows
                </span>
              </div>

              {/* Translucent Green Pill */}
              <div className="bg-[#0e6245]/60 backdrop-blur-md border border-emerald-400/30 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 text-white shadow-lg">
                <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" stroke="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4C8 21.5 10 22 12 22c5.5 0 10-4.5 10-10 0-5.5-4.5-10-10-10zm-1 16.5c-3.5 0-6.5-2.5-7-6 .5.5 1.5 1 2.5 1 3 0 5-2 6-4 1 2 3 4 6 4 1 0 2-.5 2.5-1-.5 3.5-3.5 6-7 6z" />
                  </svg>
                </div>
                <div className="text-[11px] leading-tight font-medium text-emerald-100">
                  Together<br />
                  <span className="font-bold text-white">for a Low Carbon Future.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Big Integrated Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl w-full">
            <div className="bg-white rounded-xl shadow-xl p-1.5 flex items-center gap-2 border border-white/20">
              <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search credits (e.g., renewable energy, solar, wind)..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none px-2 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#0E6245] hover:bg-[#0b5038] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
              >
                Search
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THREE-COLUMN MAIN WORKSPACE                                            */}
      {/* ========================================================================= */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: FILTERS (Col span 3)                                    */}
          {/* ===================================================================== */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-6">
            
            {/* Header: Filters + Clear All */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Filter className="w-4 h-4 text-[#0E6245]" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#0E6245] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Filter Section: Project Type */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900">Project Type</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {[
                  'Afforestation / Reforestation',
                  'Renewable Energy',
                  'Methane Capture',
                  'Clean Cookstoves',
                  'Sustainable Agriculture'
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

            {/* Filter Section: Price Range (per ton) */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900">Price Range (per ton)</h3>
              </div>
              
              {/* Green Slider Bar */}
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
                  <span className="text-[#0E6245] font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
                  <span>₹5,000</span>
                </div>
              </div>
            </div>

            {/* Filter Section: Location */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Location</h3>
              <div className="space-y-2">
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

                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium appearance-none cursor-pointer focus:border-[#0E6245] outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Global">Global</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Filter Section: Certification Standard */}
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

            {/* Filter Section: Co-benefits */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Co-benefits</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {[
                  'Biodiversity',
                  'Community Development',
                  'Clean Water',
                  'Air Quality',
                  'Job Creation',
                  'Local Employment',
                  'Community Benefit'
                ].map((benefit) => {
                  const isChecked = selectedCoBenefits.includes(benefit);
                  return (
                    <label
                      key={benefit}
                      className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-600 hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCoBenefit(benefit)}
                        className="w-4 h-4 rounded border-slate-300 text-[#0E6245] focus:ring-[#0E6245] accent-[#0E6245] cursor-pointer"
                      />
                      <span>{benefit}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Reset Filters Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Filters</span>
              </button>
            </div>

          </aside>

          {/* ===================================================================== */}
          {/* CENTER COLUMN: SEARCH RESULTS (Col span 6)                             */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Header: Results Info & Sort By */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-transparent pb-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Showing results for "{searchQuery || 'all carbon credits'}"
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  124 carbon credits found
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
                    <option value="Relevance">Relevance</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Available Volume">Available Volume</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Cards List */}
            <div className="space-y-3.5">
              {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">No matching credits found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try relaxing your filters or search for another term like "solar", "wind", or "hydro".
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#0E6245] text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => {
                  const isFavorited = favoriteIds.includes(project.id);
                  return (
                    <div
                      key={project.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all p-3.5 sm:p-4 flex flex-col sm:flex-row gap-4 relative group"
                    >
                      {/* Left: Thumbnail with Verified / Gold Standard Badge */}
                      <div className="relative w-full sm:w-44 h-36 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Top-Left Badge */}
                        <div className="absolute top-2 left-2">
                          {project.badgeType === 'gold' ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold border border-amber-200 shadow-xs">
                              Gold Standard
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-[#E0F7FA] text-[#0E7490] text-[10px] font-bold border border-cyan-200 shadow-xs">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Details */}
                      <div className="flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          {/* Title */}
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0E6245] transition-colors leading-tight">
                            {project.title}
                          </h3>

                          {/* Subheading: Category & Location */}
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
                            <span className="flex items-center gap-1 text-slate-600">
                              {project.typeIcon === 'wind' && <Wind className="w-3 h-3 text-[#0E6245]" />}
                              {project.typeIcon === 'sun' && <Sun className="w-3 h-3 text-amber-500" />}
                              {project.typeIcon === 'hydro' && <Droplets className="w-3 h-3 text-cyan-600" />}
                              <span>{project.category}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{project.location}</span>
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                            {project.description}
                          </p>
                        </div>

                        {/* Badges / SDG Tags Row */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {/* Standard Pill */}
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
                            {project.standard}
                          </span>

                          {/* SDG Tags */}
                          {project.sdgs.map((sdg) => (
                            <span
                              key={sdg}
                              className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100"
                            >
                              {sdg}
                            </span>
                          ))}

                          {/* Co-Benefit Tag */}
                          <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-semibold border border-teal-100">
                            {project.coBenefit}
                          </span>
                        </div>
                      </div>

                      {/* Right: Pricing, Tons, Favorite & View Details */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 shrink-0 sm:min-w-[125px]">
                        
                        {/* Top Right Heart Icon */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(project.id, e)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors self-start sm:self-end cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {/* Price & Volume */}
                        <div className="text-right">
                          <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-none">
                            ₹ {project.pricePerTon.toLocaleString('en-IN')}{' '}
                            <span className="text-xs font-normal text-slate-500">/ ton</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                            {project.availableTons.toLocaleString('en-IN')} tons available
                          </div>
                        </div>

                        {/* View Details Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="w-full sm:w-auto px-4 py-1.5 rounded-lg border border-[#0E6245] text-[#0E6245] hover:bg-[#0E6245] hover:text-white font-bold text-xs transition-colors cursor-pointer text-center"
                        >
                          View Details
                        </button>

                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Pagination */}
            <div className="flex items-center justify-center gap-1.5 pt-4 pb-6">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Previous</span>
              </button>

              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#0E6245] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <span className="text-xs text-slate-400 font-bold px-1">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(25)}
                className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  currentPage === 25
                    ? 'bg-[#0E6245] text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                25
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(25, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <span>Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: WIDGETS (Col span 3)                                    */}
          {/* ===================================================================== */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Widget 1: Project Locations Map Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#0E6245]" />
                  <span>Project Locations</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Displaying full interactive map view.')}
                  className="text-[11px] font-semibold text-[#0E6245] hover:underline cursor-pointer"
                >
                  View Map
                </button>
              </div>

              {/* Map Canvas with Green Cluster Bubble Pins */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={mapBgImg}
                  alt="Project Locations Map"
                  className="w-full h-full object-cover opacity-85"
                />

                {/* Cluster Bubble 1: North India (12) */}
                <div
                  onClick={() => {
                    setSelectedRegion('North India');
                    showToast('Filtered: North India projects');
                  }}
                  className="absolute top-[28%] left-[42%] w-7 h-7 rounded-full bg-[#0E6245] text-white font-bold text-xs flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                  title="12 North India Projects"
                >
                  12
                </div>

                {/* Cluster Bubble 2: East India (8) */}
                <div
                  onClick={() => {
                    setSelectedRegion('East India');
                    showToast('Filtered: East India projects');
                  }}
                  className="absolute top-[42%] left-[64%] w-6 h-6 rounded-full bg-[#0E6245] text-white font-bold text-[11px] flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                  title="8 East India Projects"
                >
                  8
                </div>

                {/* Cluster Bubble 3: West India (15) */}
                <div
                  onClick={() => {
                    setSelectedRegion('West India');
                    showToast('Filtered: West India projects');
                  }}
                  className="absolute top-[52%] left-[30%] w-7 h-7 rounded-full bg-[#0E6245] text-white font-bold text-xs flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                  title="15 West India Projects"
                >
                  15
                </div>

                {/* Cluster Bubble 4: South India (6) */}
                <div
                  onClick={() => {
                    setSelectedRegion('South India');
                    showToast('Filtered: South India projects');
                  }}
                  className="absolute top-[72%] left-[48%] w-6 h-6 rounded-full bg-[#0E6245] text-white font-bold text-[11px] flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                  title="6 South India Projects"
                >
                  6
                </div>

                {/* Map Zoom Controls */}
                <div className="absolute bottom-2 right-2 flex flex-col bg-white rounded-md shadow-md border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => showToast('Zoomed in')}
                    className="p-1 hover:bg-slate-100 text-slate-700 border-b border-slate-200"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Zoomed out')}
                    className="p-1 hover:bg-slate-100 text-slate-700"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>

            {/* Widget 2: Related Searches */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Search className="w-3.5 h-3.5 text-[#0E6245]" />
                <span>Related Searches</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  'solar energy',
                  'wind energy',
                  'hydro power',
                  'renewable energy india',
                  'verified carbon credits',
                  'gold standard projects'
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      showToast(`Searching for "${term}"`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-[#0E6245] hover:border-emerald-200 border border-slate-200 text-slate-600 text-[11px] font-medium transition-all cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 3: Impact Banner Card */}
            <div className="relative rounded-2xl overflow-hidden text-white p-5 shadow-lg space-y-3 bg-emerald-950">
              {/* Forest Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${forestBannerImg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-transparent" />

              <div className="relative z-10 space-y-2">
                <h3 className="text-base font-extrabold leading-snug text-white">
                  Every Search Supports a Cleaner Tomorrow.
                </h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Choose verified projects. Make a real impact.
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
                    <span>Start Investing</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0E6245]" />
                  </button>

                  {/* Leaf Icon Decoration */}
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
      {/* 4. DETAIL & QUICK ORDER MODAL                                             */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Image Header */}
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
              <div className="absolute bottom-3 left-4">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#0E6245] font-bold text-xs shadow-sm">
                  {selectedProject.standard}
                </span>
              </div>
            </div>

            {/* Modal Body */}
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

              {/* Price & Quantity Calculation */}
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

              {/* Action Buttons */}
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

    </div>
  );
};

export default SearchResultsPage;
