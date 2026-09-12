import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf,
  Camera,
  CheckCircle2,
  MapPin,
  Building2,
  Calendar,
  ExternalLink,
  MoreHorizontal,
  User,
  Phone,
  ShieldCheck,
  CreditCard,
  FileText,
  Sprout,
  Lock,
  Bell,
  Trash2,
  ChevronDown,
  LayoutDashboard,
  Boxes,
  ListTree,
  ShoppingCart,
  Receipt,
  BarChart3,
  Check,
  Link as LinkIcon
} from 'lucide-react';

// Photographic Assets matching the reference design
import coverBannerBg from '@/assets/supplier-profile-cover.jpg';
import sproutGraphic from '@/assets/net-zero-sprout.jpg';

export const SupplierProfilePage = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('profile');
  const [savedToast, setSavedToast] = useState(false);

  // Form State matching the reference values
  const [formData, setFormData] = useState({
    companyName: 'GreenTech Industries Pvt. Ltd.',
    industryType: 'Manufacturing',
    tagline: 'Sustainable Manufacturing for a Cleaner Tomorrow',
    yearEstablished: '2018',
    companySize: '201-500 employees',
    aboutCompany: 'GreenTech Industries is committed to sustainable manufacturing with a focus on reducing carbon emissions and promoting clean energy across our operations. We aim to create innovative solutions for a greener and healthier planet.',
    website: 'https://www.greentechindustries.com',
    linkedin: 'https://linkedin.com/company/greentech',
    twitter: 'https://x.com/greentech',
    youtube: 'https://youtube.com/@greentech'
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e?.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const sidebarMenuItems = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'company', label: 'Company Details', icon: Building2 },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'payment', label: 'Bank & Payment', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'sustainability', label: 'Sustainability Info', icon: Sprout },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 font-sans selection:bg-[#0e9f6e] selection:text-white flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 px-4 sm:px-8 lg:px-12 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Slogan */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] flex items-center justify-center text-white shadow-sm">
              <Leaf className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Carbon<span className="text-[#0e9f6e]">Sphere</span>
              </span>
              <span className="text-[8.5px] font-medium text-slate-500 -mt-1 hidden sm:block">
                Cleaner Industries. Brighter Tomorrows.
              </span>
            </div>
          </Link>

          {/* Center Navigation Tabs (Horizontal Pills) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            
            <button 
              onClick={() => navigate('/supplier/dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>My Listings</span>
            </button>

            <button 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Inventory</span>
            </button>

            <button 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Orders</span>
            </button>

            <button 
              onClick={() => navigate('/transactions')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Transactions</span>
            </button>

            <button 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Reports</span>
            </button>

          </nav>

          {/* Right Controls: Notifications & User Profile Chip */}
          <div className="flex items-center gap-3.5">
            
            {/* Bell Icon with Red Badge "3" */}
            <div className="relative cursor-pointer p-1.5 text-slate-600 hover:text-slate-900 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0e4a36] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                KP
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">Krishna Prajapati</span>
                <span className="text-[10px] font-semibold text-slate-500 leading-tight">Supplier</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </div>

          </div>

        </div>
      </header>


      {/* ========================================================================= */}
      {/* 2. COVER BANNER WITH FACTORY, HILLS & TEXT OVERLAYS                       */}
      {/* ========================================================================= */}
      <div className="relative w-full h-64 sm:h-72 lg:h-80 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${coverBannerBg})` }}>
        {/* Soft sunlight gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 pointer-events-none" />

        <div className="max-w-[1536px] mx-auto h-full px-4 sm:px-8 lg:px-12 relative flex flex-col justify-between py-6">
          
          {/* Top Row inside Cover: Left Script & Right Frosted Glass Box */}
          <div className="flex items-start justify-between gap-4">
            
            {/* Floating Cursive Script on left */}
            <div className="pt-2 pl-2">
              <span className="font-serif italic text-white text-base sm:text-lg lg:text-xl font-bold block leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide">
                Sustainable<br />
                Growth<br />
                Stronger<br />
                Tomorrow
              </span>
            </div>

            {/* Right Dark Frosted Glass Badge */}
            <div className="bg-slate-950/70 hover:bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-xl transition-all">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10b981] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                  Turning<br />Emissions into<br />Opportunities
                </h4>
              </div>
            </div>

          </div>

          {/* Bottom Right: Change Cover Button */}
          <div className="self-end mb-4">
            <button className="bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-white/80 shadow-md backdrop-blur-sm flex items-center gap-2 cursor-pointer transition-all hover:shadow-lg">
              <Camera className="w-3.5 h-3.5 text-slate-600" />
              <span>Change Cover</span>
            </button>
          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 3. PROFILE HEADER ROW (OVERLAPPING THE COVER BANNER)                      */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-slate-200/90 shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative z-10">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            {/* Left: Big Circular Avatar + Company Title & Metadata */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left">
              
              {/* Avatar Circle with negative top margin so only avatar overlaps banner */}
              <div className="relative group shrink-0 -mt-20 sm:-mt-24">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-[#e8f5ed] shadow-xl overflow-hidden flex items-center justify-center p-4 ring-1 ring-slate-100">
                  <Leaf className="w-14 h-14 sm:w-18 sm:h-18 text-[#0e9f6e] fill-[#0e9f6e]/30 group-hover:scale-105 transition-transform" />
                </div>
                {/* Camera edit badge */}
                <button 
                  className="absolute bottom-1.5 right-1.5 w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md border-2 border-white cursor-pointer transition-colors"
                  title="Update profile photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1.5 py-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                    {formData.companyName}
                  </h1>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                </div>
                
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {formData.tagline}
                </p>

                {/* 3 Pills: Location, Industry, Member Since */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formData.industryType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Member since Sep 2025</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right: Actions Buttons */}
            <div className="flex items-center justify-center sm:justify-end gap-2.5 shrink-0">
              <button className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-all cursor-pointer">
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>View Public Profile</span>
              </button>

              <button className="w-9 h-9 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-slate-700 flex items-center justify-center shadow-xs transition-all cursor-pointer">
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </button>
            </div>

          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 4. MAIN BODY: TWO-COLUMN LAYOUT (SIDEBAR + PROFILE FORM)                   */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: VERTICAL NAVIGATION MENU & NET ZERO PROMO CARD           */}
          {/* ===================================================================== */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sidebar Navigation Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-3 space-y-1">
              {sidebarMenuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#eaf5ef] text-[#0e6245] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#0e6245]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Promo Card: "Together for a Net Zero Future" */}
            <div className="bg-[#edf8f1] border border-[#d7eee0] rounded-2xl p-5 relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                {/* Sprout Illustration */}
                <div className="w-10 h-10 flex items-center justify-start">
                  <svg className="w-9 h-9 text-[#0e9f6e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 20h10" />
                    <path d="M12 20v-8" />
                    <path d="M12 12c-2.5-3-6-3-8 0 2 3 5.5 3 8 0z" fill="#0e9f6e" fillOpacity="0.3" />
                    <path d="M12 12c2.5-3 6-3 8 0-2 3-5.5 3-8 0z" fill="#10b981" fillOpacity="0.4" />
                    <path d="M12 8c0-3 2-5 5-5 0 3-2 5-5 5z" fill="#059669" fillOpacity="0.3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">
                    Together for a<br />
                    <span className="text-[#0e6245]">Net Zero Future</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                    Your commitment<br />makes a real difference.
                  </p>
                </div>
              </div>

              {/* Decorative leaf watermark in bottom right */}
              <div className="absolute -right-3 -bottom-4 text-[#a7f3d0]/50 pointer-events-none">
                <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4C8 18 10 15 11 11c1-4 1-9 1-9s0 5 1 9c1 4 3 7 4.4 9.4 2.8-1.8 4.6-4.9 4.6-8.4 0-5.5-4.5-10-10-10z" />
                </svg>
              </div>
            </div>

          </div>


          {/* ===================================================================== */}
          {/* RIGHT COLUMN: MAIN FORM CARD (PROFILE INFORMATION)                    */}
          {/* ===================================================================== */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
            
            {/* Header with Cancel and Save Changes */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Profile Information
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Manage your personal and company information.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => navigate('/supplier/dashboard')}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {savedToast ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{savedToast ? 'Changes Saved!' : 'Save Changes'}</span>
                </button>
              </div>
            </div>

            {/* Profile Photo Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 tracking-tight">Profile Photo</h3>
              
              <div className="flex flex-wrap items-center gap-5">
                {/* Photo Thumbnail */}
                <div className="w-16 h-16 rounded-full bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center shrink-0 shadow-xs">
                  <Leaf className="w-8 h-8 text-[#0e9f6e] fill-[#0e9f6e]/30" />
                </div>

                {/* Upload & Remove Buttons */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5 text-slate-500" />
                      <span>Upload New Photo</span>
                    </button>

                    <button 
                      type="button"
                      className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Recommended size: 400 × 400 px (JPG, PNG)
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-slate-800 tracking-tight">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                  />
                </div>

                {/* Industry Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Industry Type
                  </label>
                  <div className="relative">
                    <select
                      value={formData.industryType}
                      onChange={(e) => handleChange('industryType', e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all cursor-pointer"
                    >
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Power Generation">Power Generation</option>
                      <option value="Chemical & Fertilizers">Chemical & Fertilizers</option>
                      <option value="Cement Production">Cement Production</option>
                      <option value="Steel & Metallurgy">Steel & Metallurgy</option>
                      <option value="Biochar & Agro-Forestry">Biochar & Agro-Forestry</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Tagline / Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Tagline / Short Description
                </label>
                <input 
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                />
              </div>

              {/* Year of Establishment & Company Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Year */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Year of Establishment
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={formData.yearEstablished}
                      onChange={(e) => handleChange('yearEstablished', e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Company Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Company Size
                  </label>
                  <div className="relative">
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleChange('companySize', e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all cursor-pointer"
                    >
                      <option value="1-50 employees">1–50 employees</option>
                      <option value="51-200 employees">51–200 employees</option>
                      <option value="201-500 employees">201–500 employees</option>
                      <option value="500+ employees">500+ employees</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* About Company */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  About Company
                </label>
                <textarea 
                  rows={4}
                  value={formData.aboutCompany}
                  onChange={(e) => handleChange('aboutCompany', e.target.value)}
                  maxLength={500}
                  className="w-full p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all resize-none leading-relaxed"
                />
                <div className="text-right text-[10px] text-slate-400 font-semibold">
                  {formData.aboutCompany.length}/500
                </div>
              </div>

            </div>


            {/* Website & Social Links Section */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 tracking-tight">Website & Social Links</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Website */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Website
                  </label>
                  <div className="relative">
                    <input 
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <input 
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleChange('linkedin', e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
                    </svg>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Twitter / X */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Twitter / X
                  </label>
                  <div className="relative flex items-center">
                    <input 
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => handleChange('twitter', e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                    />
                    <span className="w-3.5 h-3.5 absolute left-3 text-slate-400 font-bold text-xs flex items-center justify-center pointer-events-none">
                      𝕏
                    </span>
                  </div>
                </div>

                {/* YouTube (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    YouTube (Optional)
                  </label>
                  <div className="relative">
                    <input 
                      type="url"
                      value={formData.youtube}
                      onChange={(e) => handleChange('youtube', e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all"
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
};

export default SupplierProfilePage;
