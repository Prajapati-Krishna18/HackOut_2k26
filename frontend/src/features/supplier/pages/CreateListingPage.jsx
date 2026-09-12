import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf,
  Home,
  ChevronRight,
  ClipboardList,
  FileText,
  ShieldCheck,
  MapPin,
  Calendar,
  UploadCloud,
  CheckCircle2,
  Lightbulb,
  Eye,
  HelpCircle,
  FileCheck,
  Headphones,
  Check,
  ChevronDown,
  ArrowRight,
  X,
  Plus,
  Bell,
  LayoutDashboard,
  Boxes,
  ListTree,
  ShoppingCart,
  Receipt,
  BarChart3,
  Bookmark
} from 'lucide-react';

// Photographic Assets matching the reference design
import coverBannerBg from '@/assets/supplier-profile-cover.jpg';
import previewForestBg from '@/assets/forest-canopy.jpg';

export const CreateListingPage = () => {
  const navigate = useNavigate();

  // Current active step in the multi-step stepper
  const [currentStep, setCurrentStep] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State matching the reference values
  const [formData, setFormData] = useState({
    listingTitle: 'Afforestation Carbon Credits – Western Ghats',
    creditType: 'Nature-Based Credit (Afforestation / Reforestation)',
    quantity: '500',
    quantityUnit: 'tons CO₂',
    pricePerTon: '2,800',
    currency: 'INR',
    projectLocation: 'Kodagu, Karnataka, India',
    startDate: 'Jan 2022',
    endDate: 'Dec 2030',
    description: 'This project involves large-scale tree plantation in degraded forest land in the Western Ghats. It helps in carbon sequestration, biodiversity conservation, and supports local communities.',
    standard: 'Verified Carbon Standard (VCS)',
    certificationId: 'VCS-IND-2022-4587'
  });

  // Uploaded files list matching the reference design
  const [files, setFiles] = useState([
    { id: 1, name: 'Project_Report.pdf', size: '2.4 MB', type: 'application/pdf' },
    { id: 2, name: 'Verification_Certificate.pdf', size: '1.8 MB', type: 'application/pdf' },
    { id: 3, name: 'Impact_Assessment.pdf', size: '3.1 MB', type: 'application/pdf' }
  ]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSimulateUpload = () => {
    const newDoc = {
      id: Date.now(),
      name: `Additionality_Audit_${Math.floor(Math.random() * 900 + 100)}.pdf`,
      size: '2.1 MB',
      type: 'application/pdf'
    };
    setFiles((prev) => [...prev, newDoc]);
    showToast('Document uploaded successfully!');
  };

  const [confirmedDeclaration, setConfirmedDeclaration] = useState(true);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveDraft = () => {
    showToast('Listing saved as draft successfully!');
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.listingTitle.trim()) {
        showToast('Please enter a listing title.');
        return;
      }
      if (!formData.quantity || Number(String(formData.quantity).replace(/,/g, '')) <= 0) {
        showToast('Please specify the available volume.');
        return;
      }
      if (!formData.pricePerTon || Number(String(formData.pricePerTon).replace(/,/g, '')) <= 0) {
        showToast('Please set a valid price per unit.');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!formData.projectLocation.trim()) {
        showToast('Please provide a project location.');
        return;
      }
      if (!formData.description.trim()) {
        showToast('Please provide a project description.');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else if (currentStep === 3) {
      if (!formData.certificationId.trim()) {
        showToast('Please enter the Registry Certification ID.');
        return;
      }
      setCurrentStep(4);
      window.scrollTo({ top: 380, behavior: 'smooth' });
      showToast('All parameters verified! Review your listing before publishing.');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleStepClick = (targetStep) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else if (targetStep === currentStep + 1) {
      handleNextStep();
    } else if (targetStep > currentStep) {
      handleNextStep();
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Carbon credit listing published successfully!');
      setTimeout(() => {
        navigate('/supplier/dashboard');
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0e6245] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVIGATION (MATCHING SUPPLIER DASHBOARD & PROFILE)          */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo: CarbonSphere */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e4a36] to-[#10b981] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                CarbonSphere
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight">
                Cleaner Industries. Brighter Tomorrows.
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600">
            <Link 
              to="/supplier/dashboard" 
              className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
              <span>Dashboard</span>
            </Link>

            <Link 
              to="/supplier/dashboard" 
              className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Boxes className="w-3.5 h-3.5 text-slate-400" />
              <span>My Listings</span>
            </Link>

            <Link 
              to="/supplier/create-listing" 
              className="px-3 py-1.5 rounded-lg text-[#0e6245] bg-[#e8f5ed] font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#0e6245]" />
              <span>Create Listing</span>
            </Link>

            <Link 
              to="/supplier/dashboard" 
              className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ListTree className="w-3.5 h-3.5 text-slate-400" />
              <span>Inventory</span>
            </Link>

            <Link 
              to="/supplier/dashboard" 
              className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
              <span>Orders</span>
            </Link>

            <Link 
              to="/transactions" 
              className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Transactions</span>
            </Link>

            <Link 
              to="/digital-twin" 
              className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
              <span>Reports</span>
            </Link>
          </nav>

          {/* Right Controls: Notifications & Profile */}
          <div className="flex items-center gap-3.5">
            <div className="relative cursor-pointer p-1.5 text-slate-600 hover:text-slate-900 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </div>

            <Link 
              to="/supplier/profile" 
              className="flex items-center gap-2.5 pl-2 border-l border-slate-200 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#0e4a36] text-white font-bold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                KP
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">Krishna Prajapati</span>
                <span className="text-[10px] font-semibold text-slate-500 leading-tight">Supplier</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </Link>
          </div>

        </div>
      </header>


      {/* ========================================================================= */}
      {/* 2. SCENIC COVER BANNER WITH TITLE, CURSIVE SCRIPT & PROMO BADGE            */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full h-56 sm:h-64 lg:h-72 bg-cover bg-center overflow-hidden border-b border-slate-200"
        style={{ backgroundImage: `url(${coverBannerBg})` }}
      >
        {/* Soft sunlit overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/20 pointer-events-none" />

        <div className="max-w-[1536px] mx-auto h-full px-4 sm:px-8 lg:px-12 relative flex items-center justify-between py-6">
          
          {/* Left: Main Heading & Subtitle */}
          <div className="space-y-2 max-w-xl text-white">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Create Carbon Listing
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              List your verified carbon credits and connect with buyers worldwide.
            </p>
          </div>

          {/* Right Area: Cursive Slogan & Frosted Glass Impact Card */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            
            {/* Cursive Handwriting script with underline curve */}
            <div className="relative text-white/95 font-serif italic text-right select-none transform -rotate-3">
              <span className="text-base lg:text-lg font-bold block leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                List Today<br />
                For a<br />
                Greener<br />
                Tomorrow
              </span>
              <svg className="w-28 h-4 text-emerald-400 ml-auto mt-1 drop-shadow-sm" viewBox="0 0 100 20" fill="none">
                <path d="M0 12 Q 50 20 100 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Frosted Glass Badge: Every credit you list... */}
            <div className="bg-white/90 hover:bg-white backdrop-blur-md border border-white/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xl max-w-xs transition-all">
              <div className="w-10 h-10 rounded-full bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-[#0e9f6e] fill-[#0e9f6e]/30" />
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-snug">
                Every credit you list helps build a cleaner planet.
              </p>
            </div>

          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 3. BREADCRUMBS & STEPPER PROGRESS BAR                                     */}
      {/* ========================================================================= */}
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-2">
        
        {/* Breadcrumb row */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
          <Link to="/supplier/dashboard" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/supplier/dashboard" className="hover:text-slate-900 transition-colors">
            My Listings
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold">
            Create New Listing
          </span>
        </div>

        {/* Multi-step Stepper Progress */}
        <div className="bg-white border border-slate-200/90 rounded-2xl px-6 py-4 shadow-xs mb-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            
            {/* Step 1: Basic Details */}
            <div 
              onClick={() => handleStepClick(1)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 1 
                  ? 'bg-[#0e6245] text-white shadow-sm ring-4 ring-[#0e6245]/10' 
                  : currentStep > 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}>
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className={`text-xs transition-colors ${
                currentStep === 1 
                  ? 'text-[#0e6245] font-bold' 
                  : currentStep > 1 
                    ? 'text-slate-800 font-bold' 
                    : 'text-slate-500 group-hover:text-slate-700 font-semibold'
              }`}>
                Basic Details
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-4 transition-colors ${currentStep > 1 ? 'bg-emerald-500' : 'bg-slate-200'}`} />

            {/* Step 2: Project Information */}
            <div 
              onClick={() => handleStepClick(2)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 2 
                  ? 'bg-[#0e6245] text-white shadow-sm ring-4 ring-[#0e6245]/10' 
                  : currentStep > 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:border-slate-300'
              }`}>
                {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className={`text-xs transition-colors ${
                currentStep === 2 
                  ? 'text-[#0e6245] font-bold' 
                  : currentStep > 2 
                    ? 'text-slate-800 font-bold' 
                    : 'text-slate-500 group-hover:text-slate-700 font-semibold'
              }`}>
                Project Information
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-4 transition-colors ${currentStep > 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />

            {/* Step 3: Verification & Documents */}
            <div 
              onClick={() => handleStepClick(3)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 3 
                  ? 'bg-[#0e6245] text-white shadow-sm ring-4 ring-[#0e6245]/10' 
                  : currentStep > 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:border-slate-300'
              }`}>
                {currentStep > 3 ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <span className={`text-xs transition-colors ${
                currentStep === 3 
                  ? 'text-[#0e6245] font-bold' 
                  : currentStep > 3 
                    ? 'text-slate-800 font-bold' 
                    : 'text-slate-500 group-hover:text-slate-700 font-semibold'
              }`}>
                Verification & Documents
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-4 transition-colors ${currentStep === 4 ? 'bg-emerald-500' : 'bg-slate-200'}`} />

            {/* Step 4: Review & Publish */}
            <div 
              onClick={() => handleStepClick(4)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 4 
                  ? 'bg-[#0e6245] text-white shadow-sm ring-4 ring-[#0e6245]/10' 
                  : 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:border-slate-300'
              }`}>
                4
              </div>
              <span className={`text-xs transition-colors ${
                currentStep === 4 ? 'text-[#0e6245] font-bold' : 'text-slate-500 group-hover:text-slate-700 font-semibold'
              }`}>
                Review & Publish
              </span>
            </div>

          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* 4. MAIN FORM & SIDEBAR TWO-COLUMN LAYOUT                                  */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 pb-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: MAIN FORM SECTIONS (1, 2, 3) + ACTION BUTTONS            */}
          {/* ===================================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* ----------------------------------------------------------------- */}
            {/* SECTION 1: BASIC DETAILS (STEP 1)                                 */}
            {/* ----------------------------------------------------------------- */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div id="section-1" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center text-[#0e6245] shrink-0">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                          1. Basic Details
                        </h2>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Provide the basic information about your carbon credit listing.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-[#0e6245] text-xs font-bold rounded-full shrink-0">
                      Step 1 of 4
                    </span>
                  </div>

                  {/* Fields */}
                  <div className="space-y-4">
                    
                    {/* Row 1: Title & Credit Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Listing Title */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Listing Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          value={formData.listingTitle}
                          onChange={(e) => handleChange('listingTitle', e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                        />
                        <p className="text-[11px] text-slate-400 font-medium">
                          Give a clear and short title for your listing.
                        </p>
                      </div>

                      {/* Carbon Credit Type */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Carbon Credit Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select 
                            value={formData.creditType}
                            onChange={(e) => handleChange('creditType', e.target.value)}
                            className="w-full appearance-none px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all cursor-pointer pr-9"
                          >
                            <option value="Nature-Based Credit (Afforestation / Reforestation)">
                              Nature-Based Credit (Afforestation / Reforestation)
                            </option>
                            <option value="Industrial Emission Reduction (CCUS / Flue Gas)">
                              Industrial Emission Reduction (CCUS / Flue Gas)
                            </option>
                            <option value="Renewable Energy (Solar / Wind / Green Hydrogen)">
                              Renewable Energy (Solar / Wind / Green Hydrogen)
                            </option>
                            <option value="Biochar & Soil Carbon Sequestration">
                              Biochar & Soil Carbon Sequestration
                            </option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                        </div>
                      </div>

                    </div>

                    {/* Row 2: Quantity Available & Price per Ton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      
                      {/* Quantity Available */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Quantity Available <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <input 
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => handleChange('quantity', e.target.value)}
                            className="w-full pl-3.5 pr-28 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                          />
                          <div className="absolute right-1 top-1 bottom-1 flex items-center">
                            <select 
                              value={formData.quantityUnit}
                              onChange={(e) => handleChange('quantityUnit', e.target.value)}
                              className="h-full px-2.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                            >
                              <option value="tons CO₂">tons CO₂</option>
                              <option value="tCO₂e">tCO₂e</option>
                              <option value="kilo-tons">kilo-tons</option>
                            </select>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Total volume of carbon credits available for sale.
                        </p>
                      </div>

                      {/* Price per Ton (INR/USD) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Price per Ton (INR/USD) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-slate-500 font-bold text-xs pointer-events-none">
                            ₹
                          </span>
                          <input 
                            type="text"
                            value={formData.pricePerTon}
                            onChange={(e) => handleChange('pricePerTon', e.target.value)}
                            className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Set a competitive price based on market rates.
                        </p>
                      </div>

                    </div>

                    {/* Calculated Valuation Widget */}
                    <div className="bg-[#edf8f1] border border-[#a3d9bc] rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#0e6245]">
                          <Receipt className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#0e6245] tracking-wider block">Estimated Total Listing Value</span>
                          <span className="text-xs text-slate-600 font-medium">Calculated as Available Volume × Unit Price</span>
                        </div>
                      </div>
                      <span className="text-base font-black text-[#0e6245]">
                        ₹ {(Number(String(formData.quantity).replace(/,/g, '') || 0) * Number(String(formData.pricePerTon).replace(/,/g, '') || 0)).toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Step 1 Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save as Draft</span>
                  </button>

                  <div className="w-full sm:w-auto flex items-center justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => navigate('/supplier/dashboard')}
                      className="w-1/2 sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Cancel
                    </button>

                    <button 
                      type="button"
                      onClick={handleNextStep}
                      className="w-1/2 sm:w-auto px-6 py-2.5 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                    >
                      <span>Next: Project Info</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}


            {/* ----------------------------------------------------------------- */}
            {/* SECTION 2: PROJECT INFORMATION (STEP 2)                           */}
            {/* ----------------------------------------------------------------- */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div id="section-2" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center text-[#0e6245] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                          2. Project Information
                        </h2>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Tell buyers about the project, crediting timelines, and its environmental impact.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-[#0e6245] text-xs font-bold rounded-full shrink-0">
                      Step 2 of 4
                    </span>
                  </div>

                  {/* Fields */}
                  <div className="space-y-4">
                    
                    {/* 3-Column: Location, Start Date, End Date */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Project Location */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Project Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={formData.projectLocation}
                            onChange={(e) => handleChange('projectLocation', e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                          />
                          <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        </div>
                      </div>

                      {/* Project Start Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Project Start Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={formData.startDate}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                          />
                          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        </div>
                      </div>

                      {/* Project End Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Project End Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={formData.endDate}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                          />
                          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        </div>
                      </div>

                    </div>

                    {/* Project Description */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Project Description <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        maxLength={1000}
                        className="w-full p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all resize-none leading-relaxed"
                      />
                      <div className="text-right text-[10px] text-slate-400 font-semibold">
                        {formData.description.length}/1000
                      </div>
                    </div>

                  </div>

                </div>

                {/* Step 2 Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save as Draft</span>
                  </button>

                  <div className="w-full sm:w-auto flex items-center justify-end gap-3">
                    <button 
                      type="button"
                      onClick={handlePrevStep}
                      className="w-1/2 sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      ← Back: Basic Details
                    </button>

                    <button 
                      type="button"
                      onClick={handleNextStep}
                      className="w-1/2 sm:w-auto px-6 py-2.5 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                    >
                      <span>Next: Verification & Docs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}


            {/* ----------------------------------------------------------------- */}
            {/* SECTION 3: VERIFICATION & DOCUMENTS (STEP 3)                       */}
            {/* ----------------------------------------------------------------- */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div id="section-3" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center text-[#0e6245] shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                          3. Verification & Documents
                        </h2>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Upload official audit reports and verify your carbon registry certification.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-[#0e6245] text-xs font-bold rounded-full shrink-0">
                      Step 3 of 4
                    </span>
                  </div>

                  {/* Standard & Certification ID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Verification Standard */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Verification Standard <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={formData.standard}
                          onChange={(e) => handleChange('standard', e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all cursor-pointer pr-9"
                        >
                          <option value="Verified Carbon Standard (VCS)">Verified Carbon Standard (VCS)</option>
                          <option value="Gold Standard (GS)">Gold Standard (GS)</option>
                          <option value="American Carbon Registry (ACR)">American Carbon Registry (ACR)</option>
                          <option value="Climate Action Reserve (CAR)">Climate Action Reserve (CAR)</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Certification ID */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Certification ID <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        value={formData.certificationId}
                        onChange={(e) => handleChange('certificationId', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all font-mono text-[11px]"
                      />
                    </div>

                  </div>

                  {/* Upload Documents Zone */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Upload Documents <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                      
                      {/* Drag & drop upload area */}
                      <div 
                        onClick={handleSimulateUpload}
                        className="border-2 border-dashed border-slate-200 hover:border-[#0e9f6e] hover:bg-emerald-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#e8f5ed] flex items-center justify-center text-slate-500 group-hover:text-[#0e6245] transition-colors mb-2">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium text-slate-600">
                          Drag & drop files here, or <span className="text-[#0e6245] font-bold underline">click to browse</span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          PDF, DOC, JPG, PNG (Max 10 MB each)
                        </p>
                      </div>

                      {/* Uploaded File Items */}
                      <div className="space-y-2 flex flex-col justify-center">
                        {files.map((file) => (
                          <div 
                            key={file.id} 
                            className="bg-slate-50/70 border border-slate-200/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs"
                          >
                            {/* Red PDF icon + name + size */}
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <div className="w-6 h-6 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                <FileText className="w-3.5 h-3.5" />
                              </div>
                              <div className="truncate text-left">
                                <span className="font-semibold text-slate-800 block truncate">
                                  {file.name}
                                </span>
                              </div>
                            </div>

                            {/* File size + Green Check Circle */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] text-slate-400 font-medium">
                                {file.size}
                              </span>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFile(file.id);
                                }}
                                className="text-slate-300 hover:text-red-500 transition-colors ml-1"
                                title="Remove file"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>

                {/* Step 3 Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save as Draft</span>
                  </button>

                  <div className="w-full sm:w-auto flex items-center justify-end gap-3">
                    <button 
                      type="button"
                      onClick={handlePrevStep}
                      className="w-1/2 sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      ← Back: Project Info
                    </button>

                    <button 
                      type="button"
                      onClick={handleNextStep}
                      className="w-1/2 sm:w-auto px-6 py-2.5 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                    >
                      <span>Next: Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}


            {/* ----------------------------------------------------------------- */}
            {/* SECTION 4: REVIEW & PUBLISH (STEP 4)                              */}
            {/* ----------------------------------------------------------------- */}
            {currentStep === 4 && (
              /* ----------------------------------------------------------------- */
              /* SECTION 4: REVIEW & PUBLISH (STEP 4)                              */
              /* ----------------------------------------------------------------- */
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6 animate-fade-in">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center text-[#0e6245] shrink-0 shadow-xs">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                        4. Review & Publish
                      </h2>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Please review all project details and compliance parameters before publishing to the marketplace.
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-[#0e6245] text-xs font-bold rounded-full shrink-0">
                    Step 4 of 4
                  </span>
                </div>

                {/* Review Overview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Card 1: Basic Details Summary */}
                  <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ClipboardList className="w-3.5 h-3.5 text-[#0e6245]" />
                        <span>Basic Details</span>
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleStepClick(1)}
                        className="text-[11px] font-bold text-[#0e6245] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Listing Title</span>
                        <span className="font-bold text-slate-900">{formData.listingTitle}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Credit Category</span>
                        <span className="font-semibold text-slate-800">{formData.creditType}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Available Volume</span>
                          <span className="font-extrabold text-slate-900 text-sm">{formData.quantity} {formData.quantityUnit}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Price per Unit</span>
                          <span className="font-extrabold text-emerald-700 text-sm">₹ {formData.pricePerTon}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Listing Valuation</span>
                        <span className="font-black text-base text-[#0e6245]">
                          ₹ {(Number(String(formData.quantity).replace(/,/g, '') || 0) * Number(String(formData.pricePerTon).replace(/,/g, '') || 0)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Project Information Summary */}
                  <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#0e6245]" />
                        <span>Project Information</span>
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleStepClick(2)}
                        className="text-[11px] font-bold text-[#0e6245] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Location</span>
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{formData.projectLocation}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Project Crediting Period</span>
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{formData.startDate} – {formData.endDate}</span>
                        </span>
                      </div>
                      <div className="pt-1">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Project Description</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                          {formData.description}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card 3: Verification Standard & Uploaded Documents */}
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0e6245]" />
                      <span>Verification Standard & Documents</span>
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleStepClick(3)}
                      className="text-[11px] font-bold text-[#0e6245] hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Verification Standard</span>
                      <span className="font-bold text-slate-900">{formData.standard}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Registry Certificate ID</span>
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                        {formData.certificationId}
                      </span>
                    </div>
                  </div>

                  {/* Uploaded File Badges */}
                  <div className="pt-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-2">Attached Verification Documents</span>
                    <div className="flex flex-wrap gap-2">
                      {files.map((file) => (
                        <div 
                          key={file.id} 
                          className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs shadow-2xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-medium text-slate-800">{file.name}</span>
                          <span className="text-[10px] text-slate-400">({file.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compliance & Additionality Declaration Checkbox */}
                <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-left">
                  <input 
                    type="checkbox"
                    id="review-declaration"
                    checked={confirmedDeclaration}
                    onChange={(e) => setConfirmedDeclaration(e.target.checked)}
                    className="w-4 h-4 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="review-declaration" className="text-xs text-slate-700 leading-snug cursor-pointer select-none">
                    <span className="font-bold text-slate-900 block">Verification & Additionality Declaration</span>
                    I confirm that this project adheres to Verified Carbon Standard additionality criteria, has been independently verified, and has not been dual-listed or committed on another registry.
                  </label>
                </div>

                {/* Step 4 Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save as Draft</span>
                  </button>

                  <div className="w-full sm:w-auto flex items-center justify-end gap-3">
                    <button 
                      type="button"
                      onClick={handlePrevStep}
                      className="w-1/2 sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      ← Back: Verification & Docs
                    </button>

                    <button 
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !confirmedDeclaration}
                      className="w-1/2 sm:w-auto px-6 py-2.5 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Publishing Listing...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Publish Carbon Listing</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>


          {/* ===================================================================== */}
          {/* RIGHT COLUMN: SIDEBAR WIDGETS (TIPS, LIVE PREVIEW, NEED HELP)         */}
          {/* ===================================================================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* ----------------------------------------------------------------- */}
            {/* WIDGET 1: TIPS FOR A SUCCESSFUL LISTING                           */}
            {/* ----------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 fill-amber-300/40" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  Tips for a Successful Listing
                </h3>
              </div>

              <div className="space-y-3 pt-1 text-xs font-medium text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0 mt-0.5" />
                  <span>Use a clear and specific title</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0 mt-0.5" />
                  <span>Provide accurate project details</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0 mt-0.5" />
                  <span>Upload valid verification documents</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0 mt-0.5" />
                  <span>Set a competitive price</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0 mt-0.5" />
                  <span>Highlight the environmental and social impact</span>
                </div>
              </div>
            </div>


            {/* ----------------------------------------------------------------- */}
            {/* WIDGET 2: PREVIEW (HOW IT WILL LOOK)                              */}
            {/* ----------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              
              {/* Header */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0e6245] flex items-center justify-center shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  Preview (How it will look)
                </h3>
              </div>

              {/* Carbon Credit Listing Card */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow bg-white">
                
                {/* Image Banner with Nature-Based Badge */}
                <div 
                  className="relative h-36 bg-cover bg-center"
                  style={{ backgroundImage: `url(${previewForestBg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-emerald-50/90 backdrop-blur-sm border border-emerald-200 text-[#0e6245] text-[10px] font-bold rounded-full shadow-xs">
                    Nature-Based
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3 text-left">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {formData.listingTitle || 'Afforestation Carbon Credits – Western Ghats'}
                  </h4>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{formData.projectLocation || 'Kodagu, Karnataka, India'}</span>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div>
                      <span className="text-xs font-black text-slate-900 block leading-tight">
                        {formData.quantity || 500} tons
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium block">
                        Available
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-black text-slate-900 block leading-tight">
                        ₹ {formData.pricePerTon || '2,800'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium block">
                        per ton
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-black text-slate-900 block leading-tight">
                        VCS
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium block">
                        Verified
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {formData.description || 'Large-scale tree plantation project in the Western Ghats, supporting carbon sequestration, biodiversity conservation...'}
                  </p>

                  <div className="pt-1">
                    <span className="text-xs font-bold text-[#0e6245] hover:text-[#0b5038] flex items-center gap-1 cursor-pointer transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>

                </div>

              </div>

            </div>


            {/* ----------------------------------------------------------------- */}
            {/* WIDGET 3: NEED HELP?                                              */}
            {/* ----------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 text-[#0e9f6e] fill-[#0e9f6e]/30" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                    Need Help?
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                    Check our supplier guidelines or contact support if you have any questions.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button 
                  type="button"
                  className="w-full sm:w-1/2 px-3 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Guidelines</span>
                </button>

                <button 
                  type="button"
                  className="w-full sm:w-1/2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0e6245] border border-emerald-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#0e6245]" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>


      {/* ========================================================================= */}
      {/* 5. FOOTER (MATCHING REFERENCE DESIGN)                                     */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200/90 py-8 px-4 sm:px-8 lg:px-12 mt-auto">
        <div className="max-w-[1536px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0e4a36] to-[#10b981] flex items-center justify-center text-white">
              <Leaf className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-slate-900 leading-tight">CarbonSphere</span>
              <span className="text-[10px] text-slate-400">Cleaner Industries. Brighter Tomorrows.</span>
            </div>
          </div>

          {/* Links: About | Support | Terms | Privacy */}
          <div className="flex items-center gap-5 font-medium">
            <Link to="/" className="hover:text-slate-900 transition-colors">About</Link>
            <span className="text-slate-300">|</span>
            <Link to="/" className="hover:text-slate-900 transition-colors">Support</Link>
            <span className="text-slate-300">|</span>
            <Link to="/" className="hover:text-slate-900 transition-colors">Terms</Link>
            <span className="text-slate-300">|</span>
            <Link to="/" className="hover:text-slate-900 transition-colors">Privacy</Link>
          </div>

          {/* Social Icons & Mission statement */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 text-slate-400">
              <svg className="w-4 h-4 fill-current hover:text-slate-700 cursor-pointer transition-colors" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
              </svg>
              <span className="text-xs font-bold hover:text-slate-700 cursor-pointer transition-colors">𝕏</span>
              <svg className="w-4 h-4 fill-current hover:text-slate-700 cursor-pointer transition-colors" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              People • Technology • Nature • A Better Tomorrow
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default CreateListingPage;
