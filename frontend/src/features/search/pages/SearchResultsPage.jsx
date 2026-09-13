import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Grid,
  List,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Leaf,
  ShoppingCart,
  Heart,
  Eye,
  ArrowRight,
  ChevronDown,
  Layers,
  Globe,
  DollarSign,
  Calendar,
  X,
  RotateCcw,
  Check,
  Building2,
  TrendingUp,
  FileCheck,
  ExternalLink,
  Plus,
  Scale,
  Award,
  Zap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Assets
import biocharImg from '@/assets/industry-algae.jpg';
import dacImg from '@/assets/industry-greenhouses.jpg';
import forestImg from '@/assets/forest-canopy.jpg';
import basaltImg from '@/assets/western-ghats-lake.jpg';
import streamImg from '@/assets/western-ghats-stream.jpg';
import sunriseImg from '@/assets/western-ghats-sunrise.jpg';

// Comprehensive Mock Data for Carbon Credits & Projects Search
const ALL_LISTINGS = [
  {
    id: 'CS-BC-904',
    title: 'High-Purity Hardwood Biochar Carbon Removal',
    supplier: 'TerraChar Sequestration Facilities',
    supplierVerified: true,
    location: 'Kodagu, Karnataka, India',
    region: 'India',
    method: 'Biochar (BiCRS)',
    durability: '500+ Years',
    durabilityCategory: '500+ Years',
    pricePerTonne: 145,
    availableTonnes: 12500,
    mrvStandard: 'Puro.earth CORC',
    vintage: '2025/2026',
    rating: 'AAA',
    image: biocharImg,
    sdgGoals: ['SDG 13: Climate Action', 'SDG 15: Life on Land', 'SDG 8: Decent Work'],
    description: 'Engineered pyrolysis converting certified sustainable agricultural residues into high-porosity carbon-fixing biochar for agroforestry soil enhancement.',
    aiMatchScore: 98,
    isSpotAvailable: true
  },
  {
    id: 'CS-DAC-102',
    title: 'Geological Basalt Mineralization DAC',
    supplier: 'GeoCapture Nordics & Deccan',
    supplierVerified: true,
    location: 'Deccan Traps, Maharashtra, India',
    region: 'India',
    method: 'Direct Air Capture (DAC)',
    durability: '10,000+ Years',
    durabilityCategory: '10,000+ Years',
    pricePerTonne: 290,
    availableTonnes: 4500,
    mrvStandard: 'Isometric Certified',
    vintage: '2026',
    rating: 'AAA+',
    image: dacImg,
    sdgGoals: ['SDG 13: Climate Action', 'SDG 9: Industry & Innovation'],
    description: 'Ultra-low energy direct air capture system with automated sub-surface injection and permanent calcium-silicate rock mineralization.',
    aiMatchScore: 96,
    isSpotAvailable: true
  },
  {
    id: 'CS-FOR-701',
    title: 'Western Ghats Native Agroforestry Restoration',
    supplier: 'Sahyadri Biosphere Stewardship Trust',
    supplierVerified: true,
    location: 'Wayanad & Coorg, Western Ghats, India',
    region: 'India',
    method: 'Forestry & Nature',
    durability: '100+ Years',
    durabilityCategory: '100+ Years',
    pricePerTonne: 65,
    availableTonnes: 28000,
    mrvStandard: 'Verra VCS + CCB Gold',
    vintage: '2025',
    rating: 'AA+',
    image: forestImg,
    sdgGoals: ['SDG 15: Life on Land', 'SDG 6: Clean Water', 'SDG 1: No Poverty'],
    description: 'Community-led ecological restoration planting 45 native canopy tree species across degraded riparian corridors, verified by high-res LiDAR satellite telemetry.',
    aiMatchScore: 94,
    isSpotAvailable: true
  },
  {
    id: 'CS-ERW-301',
    title: 'Enhanced Rock Weathering (Basalt Cropland Silicate)',
    supplier: 'Silicate Horizon Earth Labs',
    supplierVerified: true,
    location: 'Indo-Gangetic Plain, Punjab, India',
    region: 'India',
    method: 'Enhanced Rock Weathering',
    durability: '1,000+ Years',
    durabilityCategory: '1,000+ Years',
    pricePerTonne: 95,
    availableTonnes: 18500,
    mrvStandard: 'Isometric Certified',
    vintage: '2025/2026',
    rating: 'AAA',
    image: basaltImg,
    sdgGoals: ['SDG 13: Climate Action', 'SDG 2: Zero Hunger'],
    description: 'Fine-milled volcanic basalt spreading on agricultural farmlands accelerating atmospheric CO2 drawdown through natural chemical carbonation.',
    aiMatchScore: 92,
    isSpotAvailable: true
  },
  {
    id: 'CS-BLU-502',
    title: 'Coastal Mangrove Blue Carbon & Estuary Sequestration',
    supplier: 'Sundarbans Marine Delta Conservation',
    supplierVerified: true,
    location: 'Sundarbans, West Bengal, India',
    region: 'India',
    method: 'Marine / Blue Carbon',
    durability: '100+ Years',
    durabilityCategory: '100+ Years',
    pricePerTonne: 78,
    availableTonnes: 14200,
    mrvStandard: 'Gold Standard / Verra',
    vintage: '2025',
    rating: 'AA',
    image: streamImg,
    sdgGoals: ['SDG 14: Life Below Water', 'SDG 13: Climate Action'],
    description: 'High-density saline mangrove reforestation providing storm surge resilience and deep anaerobic soil carbon storage.',
    aiMatchScore: 89,
    isSpotAvailable: false
  },
  {
    id: 'CS-MET-605',
    title: 'Anaerobic Dairy Biogas & Methane Pyrolysis',
    supplier: 'GreenGrid BioEnergy Cooperative',
    supplierVerified: true,
    location: 'Anand, Gujarat, India',
    region: 'India',
    method: 'Methane Capture & Utilization',
    durability: '500+ Years',
    durabilityCategory: '500+ Years',
    pricePerTonne: 110,
    availableTonnes: 8600,
    mrvStandard: 'Puro.earth CORC',
    vintage: '2026',
    rating: 'AAA',
    image: sunriseImg,
    sdgGoals: ['SDG 7: Affordable Clean Energy', 'SDG 12: Responsible Consumption'],
    description: 'Capturing enteric & agricultural fugitive methane, converting methane into green hydrogen and solid carbon black for circular tire manufacturing.',
    aiMatchScore: 87,
    isSpotAvailable: true
  },
  {
    id: 'CS-IND-408',
    title: 'Direct Point-Source Flue Gas Mineralization',
    supplier: 'EcoCement Carbon Solutions',
    supplierVerified: true,
    location: 'Surat Industrial Corridor, Gujarat, India',
    region: 'India',
    method: 'Industrial Point Source',
    durability: '10,000+ Years',
    durabilityCategory: '10,000+ Years',
    pricePerTonne: 165,
    availableTonnes: 9200,
    mrvStandard: 'Puro.earth CORC',
    vintage: '2025/2026',
    rating: 'AAA',
    image: biocharImg,
    sdgGoals: ['SDG 9: Industry & Infrastructure', 'SDG 11: Sustainable Cities'],
    description: 'Post-combustion CO2 scrubbing with lime kiln waste slurry producing lightweight carbonated concrete aggregates for green construction.',
    aiMatchScore: 85,
    isSpotAvailable: true
  },
  {
    id: 'CS-DAC-209',
    title: 'Solar-Powered Modular Direct Air Capture (Southeast Asia)',
    supplier: 'EquatorAir Clean Tech',
    supplierVerified: true,
    location: 'Sarawak, Malaysia',
    region: 'Southeast Asia',
    method: 'Direct Air Capture (DAC)',
    durability: '10,000+ Years',
    durabilityCategory: '10,000+ Years',
    pricePerTonne: 310,
    availableTonnes: 3200,
    mrvStandard: 'Isometric Certified',
    vintage: '2026',
    rating: 'AAA+',
    image: dacImg,
    sdgGoals: ['SDG 13: Climate Action', 'SDG 7: Clean Energy'],
    description: 'Tropical humidity direct air capture powered 100% by colocated floating solar arrays with ultra-stable saline aquifer injection.',
    aiMatchScore: 84,
    isSpotAvailable: true
  }
];

export const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Search Query
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Active Method Filter Chip
  const [activeMethod, setActiveMethod] = useState('All');

  // Filters State
  const [selectedStandards, setSelectedStandards] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedDurabilities, setSelectedDurabilities] = useState([]);
  const [maxPrice, setMaxPrice] = useState(400);
  const [onlySpotAvailable, setOnlySpotAvailable] = useState(false);
  const [onlyVerifiedSuppliers, setOnlyVerifiedSuppliers] = useState(false);

  // Sort Option
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' | 'price-asc' | 'price-desc' | 'durability' | 'volume'

  // View Mode: 'grid' | 'list' | 'map'
  const [viewMode, setViewMode] = useState('grid');

  // Saved / Favorited Listings (IDs)
  const [savedListingIds, setSavedListingIds] = useState(['CS-BC-904']);

  // Comparison Dock (IDs)
  const [comparedListingIds, setComparedListingIds] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Quick Purchase / Offtake Order Modal State
  const [purchaseModalListing, setPurchaseModalListing] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(100);
  const [beneficiaryName, setBeneficiaryName] = useState(user?.name || 'GreenFuture Solutions');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  // Toast Notification
  const [toastText, setToastText] = useState(null);

  const showToast = (text) => {
    setToastText(text);
    setTimeout(() => setToastText(null), 3500);
  };

  // Available Filter Options
  const methodsList = [
    'All',
    'Biochar (BiCRS)',
    'Direct Air Capture (DAC)',
    'Enhanced Rock Weathering',
    'Forestry & Nature',
    'Marine / Blue Carbon',
    'Methane Capture & Utilization',
    'Industrial Point Source'
  ];

  const standardsList = [
    'Puro.earth CORC',
    'Isometric Certified',
    'Verra VCS + CCB Gold',
    'Gold Standard / Verra'
  ];

  const regionsList = ['India', 'Southeast Asia', 'Global'];
  const durabilitiesList = ['10,000+ Years', '1,000+ Years', '500+ Years', '100+ Years'];

  // Handle Search Submit
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchParams(searchQuery ? { q: searchQuery } : {});
    showToast(`Searching for "${searchQuery || 'all carbon credits'}"...`);
  };

  // Toggle Checkbox in Filters
  const toggleArrayItem = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Reset All Filters
  const resetFilters = () => {
    setSearchQuery('');
    setActiveMethod('All');
    setSelectedStandards([]);
    setSelectedRegions([]);
    setSelectedDurabilities([]);
    setMaxPrice(400);
    setOnlySpotAvailable(false);
    setOnlyVerifiedSuppliers(false);
    setSortBy('relevance');
    setSearchParams({});
    showToast('Filters reset to default.');
  };

  // Toggle Save to Favorites
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setSavedListingIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from Watchlist.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to Watchlist!');
        return [...prev, id];
      }
    });
  };

  // Toggle Compare
  const toggleCompare = (id, e) => {
    if (e) e.stopPropagation();
    setComparedListingIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 listings simultaneously.');
        return prev;
      }
      showToast('Added to Comparison Dock!');
      return [...prev, id];
    });
  };

  // Filtered and Sorted Listings
  const filteredListings = useMemo(() => {
    return ALL_LISTINGS.filter((item) => {
      // 1. Text Query Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.supplier.toLowerCase().includes(q) ||
          item.method.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.mrvStandard.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Method Chip
      if (activeMethod !== 'All' && item.method !== activeMethod) {
        return false;
      }

      // 3. Standards Filter
      if (selectedStandards.length > 0 && !selectedStandards.includes(item.mrvStandard)) {
        return false;
      }

      // 4. Region Filter
      if (selectedRegions.length > 0 && !selectedRegions.includes(item.region)) {
        return false;
      }

      // 5. Durability Filter
      if (
        selectedDurabilities.length > 0 &&
        !selectedDurabilities.includes(item.durabilityCategory)
      ) {
        return false;
      }

      // 6. Max Price
      if (item.pricePerTonne > maxPrice) {
        return false;
      }

      // 7. Spot availability
      if (onlySpotAvailable && !item.isSpotAvailable) {
        return false;
      }

      // 8. Verified Supplier
      if (onlyVerifiedSuppliers && !item.supplierVerified) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerTonne - b.pricePerTonne;
      if (sortBy === 'price-desc') return b.pricePerTonne - a.pricePerTonne;
      if (sortBy === 'volume') return b.availableTonnes - a.availableTonnes;
      if (sortBy === 'durability') {
        const durScore = (d) => (d.includes('10,000') ? 4 : d.includes('1,000') ? 3 : d.includes('500') ? 2 : 1);
        return durScore(b.durability) - durScore(a.durability);
      }
      return b.aiMatchScore - a.aiMatchScore; // default 'relevance'
    });
  }, [
    searchQuery,
    activeMethod,
    selectedStandards,
    selectedRegions,
    selectedDurabilities,
    maxPrice,
    onlySpotAvailable,
    onlyVerifiedSuppliers,
    sortBy
  ]);

  // Open Quick Purchase Modal
  const handleOpenPurchaseModal = (listing, e) => {
    if (e) e.stopPropagation();
    setPurchaseModalListing(listing);
    setOrderQuantity(Math.min(100, listing.availableTonnes));
    setIsOrderSubmitted(false);
  };

  // Complete Order
  const handleConfirmOrder = () => {
    setIsOrderSubmitted(true);
    setTimeout(() => {
      showToast(`Purchase order executed for ${orderQuantity} tCO2e of ${purchaseModalListing.id}!`);
      setTimeout(() => {
        setPurchaseModalListing(null);
        setIsOrderSubmitted(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans text-slate-800 selection:bg-[#10b981] selection:text-white flex flex-col">
      
      {/* Toast Notification */}
      {toastText && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a4833] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastText}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP HEADER SEARCH & FILTER BAR                                         */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-3.5 space-y-3">
          
          {/* Main Search Input Form */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10b981] flex items-center justify-center text-white shadow-xs">
                <Leaf className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 hidden sm:inline">
                Carbon<span className="text-[#10b981]">X</span>
              </span>
            </Link>

            {/* Input Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search credits by method (Biochar, DAC, ERW), MRV standard (Puro, Verra), or project ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-[#0e6245] focus:ring-2 focus:ring-emerald-100 rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                  className="absolute right-16 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Search</span>
              </button>
            </form>

            {/* Right Action Links */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/buyer/onboarding"
                className="text-xs font-bold text-slate-600 hover:text-[#0e6245] px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors hidden md:block"
              >
                My Profile
              </Link>
              <Link
                to="/marketplace"
                className="bg-[#eef8f2] hover:bg-[#e1f3e8] text-[#0e6245] text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Orders</span>
              </Link>
            </div>
          </div>

          {/* Quick Method Filter Chips (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" />
              Category:
            </span>
            {methodsList.map((method) => {
              const isActive = activeMethod === method;
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => setActiveMethod(method)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0e6245] text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SUB-HEADER BAR: RESULTS COUNT, SORTING, VIEW TOGGLES                    */}
      {/* ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60">
        
        {/* Results Counter & Breadcrumbs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900">
            {filteredListings.length} {filteredListings.length === 1 ? 'Listing' : 'Listings'} Found
          </span>
          {searchQuery && (
            <span className="text-xs text-slate-500">
              for <span className="font-semibold text-emerald-800">"{searchQuery}"</span>
            </span>
          )}
          {activeMethod !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
              {activeMethod}
              <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setActiveMethod('All')} />
            </span>
          )}
        </div>

        {/* Right Controls: Sort Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 outline-none cursor-pointer focus:border-[#0e6245]"
            >
              <option value="relevance">AI Best Match (Relevance)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="durability">Highest Durability (10,000+ yrs)</option>
              <option value="volume">Available Volume (tCO2e)</option>
            </select>
          </div>

          {/* Grid / List / Map View Switcher */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-[#0e6245] text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-[#0e6245] text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'map' ? 'bg-[#0e6245] text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Map View"
            >
              <Globe className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE: FILTER SIDEBAR (LEFT) + RESULTS GRID (RIGHT)            */}
      {/* ========================================================================= */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT SIDEBAR: FILTERS PANEL (3 cols)                                  */}
          {/* ===================================================================== */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-5">
            
            {/* Filter Title & Reset */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#0e6245]" />
                <span>Filter Listings</span>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-semibold text-[#0e6245] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Filter Section 1: Price Range ($/tCO2e) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Max Price / Tonne
                </label>
                <span className="text-xs font-black text-[#0e6245]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={50}
                max={400}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0e6245]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>$50/t</span>
                <span>$200/t</span>
                <span>$400/t</span>
              </div>
            </div>

            {/* Filter Section 2: MRV Standards */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                MRV Registry Standards
              </label>
              <div className="space-y-1.5 text-xs text-slate-700">
                {standardsList.map((std) => (
                  <label key={std} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedStandards.includes(std)}
                      onChange={() => toggleArrayItem(selectedStandards, setSelectedStandards, std)}
                      className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                    />
                    <span className="text-[11px]">{std}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section 3: Durability Tier */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Durability / Permanence
              </label>
              <div className="space-y-1.5 text-xs text-slate-700">
                {durabilitiesList.map((dur) => (
                  <label key={dur} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedDurabilities.includes(dur)}
                      onChange={() => toggleArrayItem(selectedDurabilities, setSelectedDurabilities, dur)}
                      className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                    />
                    <span className="text-[11px]">{dur}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section 4: Geographic Region */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Geographic Region
              </label>
              <div className="space-y-1.5 text-xs text-slate-700">
                {regionsList.map((reg) => (
                  <label key={reg} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(reg)}
                      onChange={() => toggleArrayItem(selectedRegions, setSelectedRegions, reg)}
                      className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                    />
                    <span className="text-[11px]">{reg}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section 5: Verification & Spot Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Listing Availability
              </label>
              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlySpotAvailable}
                    onChange={(e) => setOnlySpotAvailable(e.target.checked)}
                    className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                  />
                  <span className="text-[11px] font-semibold text-emerald-800">
                    Immediate Spot Delivery
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyVerifiedSuppliers}
                    onChange={(e) => setOnlyVerifiedSuppliers(e.target.checked)}
                    className="w-3.5 h-3.5 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] accent-[#0e6245]"
                  />
                  <span className="text-[11px]">Verified Registry Suppliers</span>
                </label>
              </div>
            </div>

          </aside>

          {/* ===================================================================== */}
          {/* RIGHT MAIN: SEARCH RESULTS & CARDS (9 cols)                           */}
          {/* ===================================================================== */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* AI Smart Match Callout Card */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-2xl p-4 sm:p-5 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      AI Procurement Assistant
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold">
                      98.4% Match
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Optimized Portfolio Recommendation for India & Asia Decarbonization
                  </h3>
                  <p className="text-xs text-emerald-200/80 leading-relaxed max-w-xl">
                    Combining Biochar (500+ yrs permanence) and Basalt Mineralization achieves maximum durability with an average price of <strong className="text-white">$145/tCO2e</strong>.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveMethod('Biochar (BiCRS)');
                  showToast('Filtered by top AI recommended Biochar portfolio.');
                }}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Apply AI Filter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Empty State */}
            {filteredListings.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="text-base font-bold text-slate-800">No matching carbon credits found</h3>
                  <p className="text-xs text-slate-500">
                    Try loosening your price filters or searching with general terms such as "Biochar", "DAC", or "Western Ghats".
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* =================================================================== */}
            {/* VIEW MODE: GRID VIEW                                                */}
            {/* =================================================================== */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredListings.map((item) => {
                  const isSaved = savedListingIds.includes(item.id);
                  const isCompared = comparedListingIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                    >
                      {/* Card Thumbnail Image & Badges */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

                        {/* Top Left: MRV Standard Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-400/40 text-[10px] font-bold shadow-xs flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>{item.mrvStandard}</span>
                          </span>
                          <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-black">
                            {item.rating}
                          </span>
                        </div>

                        {/* Top Right: Watchlist & Compare Action Icons */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => toggleCompare(item.id, e)}
                            className={`p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                              isCompared
                                ? 'bg-[#0e6245] text-white shadow-xs'
                                : 'bg-white/85 text-slate-700 hover:bg-white'
                            }`}
                            title="Compare"
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(item.id, e)}
                            className={`p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                              isSaved
                                ? 'bg-rose-500 text-white shadow-xs'
                                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-500'
                            }`}
                            title="Save"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                          </button>
                        </div>

                        {/* Bottom Overlay: Location & ID */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                          <div className="flex items-center gap-1 font-medium truncate max-w-[70%]">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>
                          <span className="font-mono text-[10px] text-emerald-300 font-bold">
                            {item.id}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Area */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#0e6245] uppercase tracking-wider">
                              {item.method}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              Vintage {item.vintage}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#0e6245] transition-colors line-clamp-2">
                            {item.title}
                          </h3>

                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Specs Strip */}
                        <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Permanence</span>
                            <span className="font-bold text-emerald-800 text-[11px]">{item.durability}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Available Tonnes</span>
                            <span className="font-bold text-slate-800 text-[11px]">{item.availableTonnes.toLocaleString()} tCO2e</span>
                          </div>
                        </div>

                        {/* Pricing & CTA Buttons */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-0.5">
                              <span className="text-lg font-black text-slate-900">${item.pricePerTonne}</span>
                              <span className="text-[10px] text-slate-400 font-medium">/ tCO2e</span>
                            </div>
                            <span className="text-[9px] text-emerald-600 font-semibold block">
                              {item.isSpotAvailable ? '● Spot Available' : '○ Forward 2026'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/marketplace/listing/${item.id}`}
                              className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-colors"
                            >
                              Details
                            </Link>
                            <button
                              type="button"
                              onClick={(e) => handleOpenPurchaseModal(item, e)}
                              className="bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>Buy</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* =================================================================== */}
            {/* VIEW MODE: LIST VIEW                                                */}
            {/* =================================================================== */}
            {viewMode === 'list' && (
              <div className="space-y-3">
                {filteredListings.map((item) => {
                  const isSaved = savedListingIds.includes(item.id);
                  const isCompared = comparedListingIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-4 shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                    >
                      {/* Left: Thumbnail & Main Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white font-black text-[9px]">
                            {item.rating}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                              {item.mrvStandard}
                            </span>
                            <span className="text-[10px] text-[#0e6245] font-bold uppercase">
                              {item.method}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0e6245] transition-colors">
                            {item.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {item.location}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-emerald-700">{item.durability} Permanence</span>
                            <span>•</span>
                            <span>{item.availableTonnes.toLocaleString()} tCO2e Available</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Pricing & CTA */}
                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <span className="text-xl font-black text-slate-900">${item.pricePerTonne}</span>
                          <span className="text-xs text-slate-400"> / tCO2e</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(item.id, e)}
                            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                              isSaved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                          <Link
                            to={`/marketplace/listing/${item.id}`}
                            className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => handleOpenPurchaseModal(item, e)}
                            className="bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* =================================================================== */}
            {/* VIEW MODE: MAP VIEW (Interactive Geospatial Representation)        */}
            {/* =================================================================== */}
            {viewMode === 'map' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-4">
                <div className="relative w-full h-96 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={biocharImg}
                    alt="Map Backdrop"
                    className="w-full h-full object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent pointer-events-none" />

                  {/* Simulated Map Markers */}
                  <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around">
                    {filteredListings.slice(0, 5).map((listing, i) => (
                      <div
                        key={listing.id}
                        onClick={() => handleOpenPurchaseModal(listing)}
                        className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-emerald-400/50 cursor-pointer hover:scale-110 transition-all max-w-[200px] space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-emerald-800 truncate">{listing.title}</span>
                          <span className="text-[10px] font-black text-slate-900">${listing.pricePerTonne}</span>
                        </div>
                        <div className="text-[9px] text-slate-500 flex items-center gap-1 truncate">
                          <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{listing.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time Satellite Telemetry & Sensor Nodes Active</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Showing 1 to {filteredListings.length} of {filteredListings.length} items</span>
              <div className="flex items-center gap-1">
                <button type="button" disabled className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 font-semibold cursor-not-allowed">
                  Previous
                </button>
                <button type="button" className="px-3 py-1.5 rounded-lg bg-[#0e6245] text-white font-bold shadow-xs">
                  1
                </button>
                <button type="button" disabled className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 font-semibold cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. COMPARISON DOCK (Floating bottom bar when items are selected)           */}
      {/* ========================================================================= */}
      {comparedListingIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/95 text-white backdrop-blur-md border border-emerald-500/40 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-4 animate-slide-up">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold">
              {comparedListingIds.length} {comparedListingIds.length === 1 ? 'Project' : 'Projects'} Selected for Comparison
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Compare Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setComparedListingIds([])}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
              title="Clear Comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SIDE-BY-SIDE COMPARISON MODAL                                          */}
      {/* ========================================================================= */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-4xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Scale className="w-5 h-5 text-[#0e6245]" />
                <span>Side-by-Side Carbon Project Comparison</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {comparedListingIds.map((id) => {
                const item = ALL_LISTINGS.find((l) => l.id === id);
                if (!item) return null;

                return (
                  <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <img src={item.image} alt={item.title} className="w-full h-28 object-cover rounded-xl" />
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                    <div className="space-y-1 text-[11px] text-slate-600 border-t border-slate-200/80 pt-2">
                      <p><strong>Method:</strong> {item.method}</p>
                      <p><strong>Permanence:</strong> {item.durability}</p>
                      <p><strong>Price:</strong> ${item.pricePerTonne} / tCO2e</p>
                      <p><strong>MRV Standard:</strong> {item.mrvStandard}</p>
                      <p><strong>Vintage:</strong> {item.vintage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCompareModalOpen(false);
                        handleOpenPurchaseModal(item);
                      }}
                      className="w-full bg-[#0e6245] text-white text-xs font-bold py-1.5 rounded-lg shadow-xs"
                    >
                      Buy This Credit
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. QUICK PURCHASE / OFFTAKE ORDER MODAL                                   */}
      {/* ========================================================================= */}
      {purchaseModalListing && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Instant Carbon Offtake Order
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPurchaseModalListing(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isOrderSubmitted ? (
              <div className="space-y-4">
                {/* Project Summary */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-[#0e6245] uppercase tracking-wider">
                    {purchaseModalListing.mrvStandard}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{purchaseModalListing.title}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">ID: {purchaseModalListing.id}</p>
                </div>

                {/* Tonnage Selector Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-700">Procurement Volume</label>
                    <span className="font-black text-[#0e6245] text-sm">{orderQuantity.toLocaleString()} tCO2e</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={Math.min(5000, purchaseModalListing.availableTonnes)}
                    step={10}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0e6245]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>10 tCO2e</span>
                    <span>2,500 tCO2e</span>
                    <span>5,000 tCO2e</span>
                  </div>
                </div>

                {/* Retirement Beneficiary */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Retirement Beneficiary Name (For ESG Certificate)
                  </label>
                  <input
                    type="text"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-[#0e6245]"
                  />
                </div>

                {/* Cost Calculation Summary */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Price (${purchaseModalListing.pricePerTonne} × {orderQuantity})</span>
                    <span>${(purchaseModalListing.pricePerTonne * orderQuantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Escrow & Registry Verification Fee (1.5%)</span>
                    <span>${((purchaseModalListing.pricePerTonne * orderQuantity) * 0.015).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-slate-900 pt-1 border-t border-emerald-200 text-sm">
                    <span>Total Settlement Amount</span>
                    <span className="text-[#0e6245]">
                      ${((purchaseModalListing.pricePerTonne * orderQuantity) * 1.015).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Execute Order & Mint Certificate</span>
                </button>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0e6245] flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Order Dispatched to Escrow!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Registry smart contract minted. Certificate assigned to <strong>{beneficiaryName}</strong>.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default SearchResultsPage;
