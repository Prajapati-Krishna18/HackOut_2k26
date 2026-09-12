import React, { useState, useRef } from 'react';
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
  Pencil,
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
  Plus,
  Link as LinkIcon,
  X,
  Copy,
  Download,
  Share2,
  Award,
  Globe,
  Sliders,
  Key,
  UploadCloud
} from 'lucide-react';

// Photographic Assets matching the reference design
import coverBannerBg from '@/assets/supplier-profile-cover.jpg';
import sproutGraphic from '@/assets/net-zero-sprout.jpg';

export const SupplierProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState('profile');
  const [toastMsg, setToastMsg] = useState(null);
  const [savedToast, setSavedToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

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

  const [backupFormData, setBackupFormData] = useState({ ...formData });

  // Security & Notification Preferences states
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: '30 minutes',
    apiAccessEnabled: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderAlerts: true,
    marketInsights: true,
    creditRetirement: true,
    weeklyDigest: false
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartEdit = () => {
    setBackupFormData({ ...formData });
    setIsEditing(true);
    showToast('Edit mode activated. Update your profile information.');
  };

  const handleCancelEdit = () => {
    setFormData({ ...backupFormData });
    setIsEditing(false);
    showToast('Edits discarded.');
  };

  const handleSave = (e) => {
    e?.preventDefault();
    setSavedToast(true);
    setBackupFormData({ ...formData });
    showToast('Profile information saved successfully!');
    setTimeout(() => {
      setSavedToast(false);
      setIsEditing(false);
    }, 900);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size should be less than 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        showToast('Profile photo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Profile photo removed.');
  };

  const inputBaseClass = isEditing
    ? "w-full bg-white border border-slate-300 text-slate-900 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all shadow-xs"
    : "w-full bg-slate-50/70 border border-slate-200/80 text-slate-800 rounded-xl text-xs font-medium cursor-default transition-all select-text";

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
      
      {/* Hidden File Input for Profile Photo Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoUpload} 
        accept="image/png,image/jpeg,image/webp,image/jpg" 
        className="hidden" 
      />

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0e6245] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 sm:px-8 lg:px-12 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
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
              type="button"
              onClick={() => navigate('/supplier/dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate('/supplier/create-listing')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>My Listings</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate('/supplier/create-listing')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#0e6245] hover:bg-emerald-100 border border-emerald-200 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Listing</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate('/supplier/dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Inventory</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate('/supplier/dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Orders</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate('/transactions')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Transactions</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate('/digital-twin')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Reports</span>
            </button>

          </nav>

          {/* Right Action Profile & Notifications */}
          <div className="flex items-center gap-3.5">
            <div className="relative cursor-pointer p-1.5 text-slate-600 hover:text-slate-900 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </div>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0e4a36] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                KP
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">Krishna Prajapati</span>
                <span className="text-[10px] font-semibold text-slate-500 leading-tight">Supplier</span>
              </div>
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
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-white/80 shadow-md backdrop-blur-sm flex items-center gap-2 cursor-pointer transition-all hover:shadow-lg"
            >
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
              
              {/* Avatar Circle */}
              <div className="relative group shrink-0 -mt-20 sm:-mt-24">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-[#e8f5ed] shadow-xl overflow-hidden flex items-center justify-center ring-1 ring-slate-100">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt={formData.companyName} className="w-full h-full object-cover" />
                  ) : (
                    <Leaf className="w-14 h-14 sm:w-18 sm:h-18 text-[#0e9f6e] fill-[#0e9f6e]/30 group-hover:scale-105 transition-transform" />
                  )}
                </div>
                {/* Camera edit badge */}
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
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

            {/* Right: Actions Buttons (ONLY ONE EDIT BUTTON ON PAGE!) */}
            <div className="relative flex items-center justify-center sm:justify-end gap-2.5 shrink-0">
              
              {/* Single Primary Edit Profile / Cancel Button */}
              <button 
                type="button"
                onClick={isEditing ? handleCancelEdit : handleStartEdit}
                className={`px-4 py-2 border rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
                  isEditing 
                    ? 'border-emerald-600 bg-emerald-50 text-[#0e6245] hover:bg-emerald-100' 
                    : 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              {/* View Public Profile Button */}
              <button 
                type="button"
                onClick={() => setShowPublicModal(true)}
                className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>View Public Profile</span>
              </button>

              {/* Three Dots More Actions Menu */}
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => setShowMoreMenu(prev => !prev)}
                  className="w-9 h-9 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-slate-700 flex items-center justify-center shadow-xs transition-all cursor-pointer"
                  title="More actions"
                >
                  <MoreHorizontal className="w-4 h-4 text-slate-500" />
                </button>

                {showMoreMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-20 cursor-default"
                      onClick={() => setShowMoreMenu(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-30 animate-fade-in text-xs font-medium text-slate-700">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href);
                          showToast('Public profile link copied to clipboard!');
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                      >
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Public Link</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setShowPublicModal(true);
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Share Profile</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          showToast('Downloading supplier ESG dossier (PDF)...');
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                        <span>Export ESG Dossier (PDF)</span>
                      </button>

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenu('security');
                          setShowMoreMenu(false);
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors text-slate-600"
                      >
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Account & Security</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 4. MAIN BODY: TWO-COLUMN LAYOUT (SIDEBAR + ACTIVE TAB CONTENT)            */}
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
                    type="button"
                    onClick={() => {
                      setActiveMenu(item.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
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

              {/* Decorative leaf watermark */}
              <div className="absolute -right-3 -bottom-4 text-[#a7f3d0]/50 pointer-events-none">
                <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4C8 18 10 15 11 11c1-4 1-9 1-9s0 5 1 9c1 4 3 7 4.4 9.4 2.8-1.8 4.6-4.9 4.6-8.4 0-5.5-4.5-10-10-10z" />
                </svg>
              </div>
            </div>

          </div>


          {/* ===================================================================== */}
          {/* RIGHT COLUMN: DYNAMIC PANEL ACCORDING TO SIDEBAR SELECTION            */}
          {/* ===================================================================== */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8 animate-fade-in">
            
            {/* ----------------------------------------------------------------- */}
            {/* TAB 1: PROFILE INFORMATION                                        */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'profile' && (
              <>
                {/* Header with Cancel and Save Changes (NO SECOND EDIT BUTTON!) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        Profile Information
                      </h2>
                      {!isEditing ? (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md border border-slate-200">
                          View Mode
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-emerald-50 text-[#0e6245] text-[10px] font-bold rounded-md border border-emerald-200">
                          Editing Mode
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Manage your personal and company information.
                    </p>
                  </div>

                  <div>
                    {isEditing && (
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={handleCancelEdit}
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
                    )}
                  </div>
                </div>

                {/* Profile Photo Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">Profile Photo</h3>
                  
                  <div className="flex flex-wrap items-center gap-5">
                    {/* Photo Thumbnail */}
                    <div className="w-16 h-16 rounded-full bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Thumbnail" className="w-full h-full object-cover" />
                      ) : (
                        <Leaf className="w-8 h-8 text-[#0e9f6e] fill-[#0e9f6e]/30" />
                      )}
                    </div>

                    {/* Upload & Remove Buttons */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-slate-500" />
                          <span>Upload New Photo</span>
                        </button>

                        <button 
                          type="button"
                          onClick={handleRemovePhoto}
                          disabled={!profilePhoto}
                          className={`px-3 py-1.5 border rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors ${
                            profilePhoto
                              ? 'border-red-200 hover:bg-red-50 text-red-600 cursor-pointer' 
                              : 'border-slate-200 text-slate-300 bg-slate-50/50 cursor-not-allowed opacity-60'
                          }`}
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
                        Company Name
                      </label>
                      <input 
                        type="text"
                        disabled={!isEditing}
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className={`${inputBaseClass} px-3.5 py-2.5`}
                      />
                    </div>

                    {/* Industry Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Industry Type
                      </label>
                      <div className="relative">
                        <select 
                          disabled={!isEditing}
                          value={formData.industryType}
                          onChange={(e) => handleChange('industryType', e.target.value)}
                          className={`${inputBaseClass} appearance-none px-3.5 py-2.5 pr-9 ${isEditing ? 'cursor-pointer' : ''}`}
                        >
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Renewable Energy">Renewable Energy</option>
                          <option value="Forestry & Carbon Removal">Forestry & Carbon Removal</option>
                          <option value="Agriculture & Biochar">Agriculture & Biochar</option>
                          <option value="Waste Management">Waste Management</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Company Tagline */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Company Tagline
                    </label>
                    <input 
                      type="text"
                      disabled={!isEditing}
                      value={formData.tagline}
                      onChange={(e) => handleChange('tagline', e.target.value)}
                      className={`${inputBaseClass} px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Year Established */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Year Established
                      </label>
                      <input 
                        type="text"
                        disabled={!isEditing}
                        value={formData.yearEstablished}
                        onChange={(e) => handleChange('yearEstablished', e.target.value)}
                        className={`${inputBaseClass} px-3.5 py-2.5`}
                      />
                    </div>

                    {/* Company Size */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Company Size
                      </label>
                      <div className="relative">
                        <select 
                          disabled={!isEditing}
                          value={formData.companySize}
                          onChange={(e) => handleChange('companySize', e.target.value)}
                          className={`${inputBaseClass} appearance-none px-3.5 py-2.5 pr-9 ${isEditing ? 'cursor-pointer' : ''}`}
                        >
                          <option value="1-50 employees">1-50 employees</option>
                          <option value="51-200 employees">51-200 employees</option>
                          <option value="201-500 employees">201-500 employees</option>
                          <option value="500+ employees">500+ employees</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* About Company */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      About Company
                    </label>
                    <textarea 
                      rows={4}
                      disabled={!isEditing}
                      value={formData.aboutCompany}
                      onChange={(e) => handleChange('aboutCompany', e.target.value)}
                      className={`${inputBaseClass} p-3.5 resize-none leading-relaxed`}
                    />
                    <div className="text-right text-[10px] text-slate-400 font-medium">
                      {formData.aboutCompany.length}/500 characters
                    </div>
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">Social Links</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Website */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Website
                      </label>
                      <div className="relative">
                        <input 
                          type="url"
                          disabled={!isEditing}
                          value={formData.website}
                          onChange={(e) => handleChange('website', e.target.value)}
                          className={`${inputBaseClass} pl-9 pr-3.5 py-2.5`}
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
                          disabled={!isEditing}
                          value={formData.linkedin}
                          onChange={(e) => handleChange('linkedin', e.target.value)}
                          className={`${inputBaseClass} pl-9 pr-3.5 py-2.5`}
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
                          disabled={!isEditing}
                          value={formData.twitter}
                          onChange={(e) => handleChange('twitter', e.target.value)}
                          className={`${inputBaseClass} pl-9 pr-3.5 py-2.5`}
                        />
                        <span className="w-3.5 h-3.5 absolute left-3 text-slate-400 font-bold text-xs flex items-center justify-center pointer-events-none">
                          𝕏
                        </span>
                      </div>
                    </div>

                    {/* YouTube */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        YouTube (Optional)
                      </label>
                      <div className="relative">
                        <input 
                          type="url"
                          disabled={!isEditing}
                          value={formData.youtube}
                          onChange={(e) => handleChange('youtube', e.target.value)}
                          className={`${inputBaseClass} pl-9 pr-3.5 py-2.5`}
                        />
                        <svg className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 2: COMPANY DETAILS                                            */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'company' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Company Details & Industrial Operations
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Official legal identity, industrial plant locations, and operational capacities.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-[#0e6245] font-bold text-xs rounded-full border border-emerald-200">
                    Active Supplier
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">CIN / Registration No.</span>
                    <p className="font-mono font-bold text-slate-800 text-sm">U24100MH2018PTC309812</p>
                  </div>
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">GSTIN</span>
                    <p className="font-mono font-bold text-slate-800 text-sm">27AABCG1234D1ZP</p>
                  </div>
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Primary Manufacturing Facility</span>
                    <p className="font-semibold text-slate-800">Plot D-24, Chakan MIDC Phase II, Pune, Maharashtra 410501</p>
                  </div>
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Annual Carbon Capture Capacity</span>
                    <p className="font-bold text-emerald-700 text-sm">50,000 tCO₂e / year</p>
                  </div>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3.5">
                  <Building2 className="w-5 h-5 text-[#0e6245] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-slate-900">Industrial IoT Integration Status</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Continuous telemetry is active. 6 flue gas sensors are linked directly to CarbonSphere Digital Twin for real-time additionality monitoring.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 3: CONTACT INFORMATION                                        */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'contact' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Contact Information & Authorized Signatories
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Official channels for buyer communications and contract verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Account Manager</span>
                    <p className="font-bold text-slate-900 text-sm">Krishna Prajapati</p>
                    <p className="text-slate-600 flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> +91 98231 45678</p>
                    <p className="text-slate-600 flex items-center gap-1.5"><User className="w-3 h-3 text-slate-400" /> krishna@greentechindustries.com</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Compliance & Registry Lead</span>
                    <p className="font-bold text-slate-900 text-sm">Dr. Ananya Sharma</p>
                    <p className="text-slate-600 flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> +91 98230 11223</p>
                    <p className="text-slate-600 flex items-center gap-1.5"><User className="w-3 h-3 text-slate-400" /> compliance@greentechindustries.com</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Corporate Headquarters</span>
                  <p className="font-medium text-slate-800">
                    GreenTech Tower, 5th Floor, Senapati Bapat Road, Shivaji Nagar, Pune, Maharashtra, 411016, India
                  </p>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 4: VERIFICATION & REGISTRIES                                  */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'verification' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Carbon Registry Verifications
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Third-party verified standards supporting issued carbon credits.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-[#0e6245] text-xs font-bold rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Tier 1 Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-emerald-200 bg-emerald-50/40 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">Verra VCS Registry</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded">Active</span>
                    </div>
                    <p className="font-mono text-xs text-slate-700 font-semibold">Account ID: VCS-ID-98214</p>
                    <p className="text-slate-500 text-[11px]">Last annual additionality audit passed: June 2025 by SGS India Pvt. Ltd.</p>
                  </div>

                  <div className="p-4 border border-slate-200 bg-slate-50/70 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Gold Standard Registry</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Linked</span>
                    </div>
                    <p className="font-mono text-xs text-slate-700 font-semibold">GS-ACC-4109</p>
                    <p className="text-slate-500 text-[11px]">Renewable energy substitution projects verified under GS micro-scale protocol.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 5: BANK & PAYMENT                                             */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'payment' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Bank & Escrow Settlement Account
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Settlement accounts for marketplace carbon credit disbursements.
                  </p>
                </div>

                <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-2xl p-6 space-y-4 max-w-md shadow-lg">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span className="font-semibold">Current Escrow Payout Account</span>
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="font-mono text-lg tracking-widest font-bold">
                    •••• •••• •••• 9842
                  </div>
                  <div className="flex justify-between text-xs text-slate-300 pt-2 border-t border-slate-700">
                    <div>
                      <span className="text-[9px] uppercase block text-slate-400">Account Holder</span>
                      <span className="font-bold text-white">GreenTech Industries Pvt. Ltd.</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase block text-slate-400">Bank & IFSC</span>
                      <span className="font-bold text-white">HDFC Bank (HDFC0001234)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Payouts from fulfilled orders are held securely in smart-contract escrow and released upon buyer receipt or retirement verification.
                </p>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 6: DOCUMENTS                                                  */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'documents' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Compliance & Regulatory Documents
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Official environmental certifications, audit sheets, and legal consents.
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => showToast('Uploading document simulation...')}
                    className="px-3.5 py-1.5 bg-[#0e6245] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Doc</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Pollution Control Board Consent to Operate (CTO).pdf', size: '2.4 MB', date: 'Jul 2025' },
                    { name: 'ISO 14064 Carbon Footprint Baseline Verification.pdf', size: '4.8 MB', date: 'May 2025' },
                    { name: 'Verra Project Design Document (PDD)_Final.pdf', size: '6.1 MB', date: 'Aug 2025' }
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between text-xs hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="font-bold text-slate-800">{doc.name}</p>
                          <span className="text-[10px] text-slate-400">{doc.size} • Uploaded {doc.date}</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => showToast(`Downloading ${doc.name}...`)}
                        className="text-xs font-semibold text-[#0e6245] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 7: SUSTAINABILITY INFO                                        */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'sustainability' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Sustainability Commitments & ESG Goals
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Our roadmap to net-zero and circular carbon utilization.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-[#edf8f1] border border-[#a3d9bc] p-4 rounded-2xl space-y-1">
                    <span className="text-2xl font-black text-[#0e6245]">2030</span>
                    <p className="text-xs font-bold text-slate-800">Net-Zero Target Year</p>
                    <p className="text-[10px] text-slate-500">Committed under SBTI framework</p>
                  </div>
                  <div className="bg-[#edf8f1] border border-[#a3d9bc] p-4 rounded-2xl space-y-1">
                    <span className="text-2xl font-black text-[#0e6245]">68%</span>
                    <p className="text-xs font-bold text-slate-800">Renewable Energy Mix</p>
                    <p className="text-[10px] text-slate-500">Solar rooftop + wind PPA</p>
                  </div>
                  <div className="bg-[#edf8f1] border border-[#a3d9bc] p-4 rounded-2xl space-y-1">
                    <span className="text-2xl font-black text-[#0e6245]">142.5k</span>
                    <p className="text-xs font-bold text-slate-800">tCO₂e Mitigated</p>
                    <p className="text-[10px] text-slate-500">Across all active facilities</p>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 8: SECURITY                                                   */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'security' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Account Security & Authentication
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Protect your registry credentials, payout escrow, and marketplace API access.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                      <p className="text-slate-500 mt-0.5">Enforces TOTP code for listing approvals and escrow fund release.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
                        showToast(`Two-factor authentication ${!securitySettings.twoFactorEnabled ? 'enabled' : 'disabled'}`);
                      }}
                      className={`px-4 py-1.5 rounded-full font-bold text-xs cursor-pointer transition-colors ${
                        securitySettings.twoFactorEnabled ? 'bg-[#0e6245] text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">Account Password</h4>
                      <p className="text-slate-500 mt-0.5">Last updated 45 days ago.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => showToast('Password reset instructions sent to your email.')}
                      className="px-3.5 py-1.5 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 9: NOTIFICATIONS                                              */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'notifications' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Notification & Alert Preferences
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Choose what email and in-app alerts you want to receive.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { key: 'orderAlerts', title: 'New Buyer Purchase Orders', desc: 'Instant notification when an enterprise buyer places an order for your credits.' },
                    { key: 'marketInsights', title: 'Weekly Carbon Market Price Index', desc: 'Summary of spot price changes and demand spikes across carbon credit classes.' },
                    { key: 'creditRetirement', title: 'Credit Retirement Proof Generated', desc: 'Get on-chain immutable receipt when a buyer retires your carbon credits.' }
                  ].map((item) => (
                    <div key={item.key} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div className="pr-4">
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={notificationSettings[item.key]}
                        onChange={() => {
                          setNotificationSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }));
                          showToast('Notification preference updated.');
                        }}
                        className="w-4 h-4 text-[#0e6245] rounded border-slate-300 focus:ring-[#0e6245] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>


      {/* ========================================================================= */}
      {/* 5. PUBLIC PROFILE PREVIEW MODAL                                           */}
      {/* ========================================================================= */}
      {showPublicModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 overflow-hidden relative">
            
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-[#0e6245] text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Public Buyer View
                </span>
                <span className="text-xs font-semibold text-slate-400">• Verified Supplier</span>
              </div>
              <button 
                type="button"
                onClick={() => setShowPublicModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Public Profile Content */}
            <div className="p-6 space-y-6">
              
              {/* Cover & Avatar */}
              <div className="relative rounded-2xl overflow-hidden h-36 bg-cover bg-center border border-slate-200" style={{ backgroundImage: `url(${coverBannerBg})` }}>
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full border-2 border-white bg-[#e8f5ed] flex items-center justify-center overflow-hidden shadow-md">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Leaf className="w-8 h-8 text-[#0e9f6e]" />
                    )}
                  </div>
                  <div className="text-white">
                    <h3 className="font-extrabold text-base leading-tight flex items-center gap-1.5">
                      {formData.companyName}
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-100/20" />
                    </h3>
                    <p className="text-[11px] text-slate-200">{formData.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-emerald-50 text-[#0e6245] font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Tier-1 Audited Supplier
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 font-medium rounded-lg">
                  142,500 tCO₂e Mitigated
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 font-medium">
                  Verified by Verra VCS
                </span>
              </div>

              {/* About */}
              <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">About Organization</h4>
                <p>{formData.aboutCompany}</p>
              </div>

              {/* Active Listings Preview */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Available Marketplace Listings</h4>
                <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900">Western Ghats Reforestation & Agroforestry</h5>
                    <p className="text-slate-500 text-[10px]">Verra VCS • 10,000 tons available</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#0e6245] text-sm">₹ 1,400</span>
                    <span className="text-[10px] text-slate-400 block">/ ton</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Public profile link copied to clipboard!');
                  }}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Public URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPublicModal(false)}
                  className="px-5 py-2 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SupplierProfilePage;
