import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
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
  UploadCloud,
  LogOut,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  ImageIcon
} from 'lucide-react';

// Photographic Assets matching the reference design
import coverBannerBg from '@/assets/supplier-profile-cover.jpg';
import sproutGraphic from '@/assets/net-zero-sprout.jpg';

// Curated Gallery Avatars
import galleryAvatar1 from '@/assets/role-supplier.jpg';
import galleryAvatar2 from '@/assets/forest-canopy.jpg';
import galleryAvatar3 from '@/assets/industry-greenhouses.jpg';
import galleryAvatar4 from '@/assets/industry-algae.jpg';
import galleryAvatar5 from '@/assets/step-supplier.jpg';
import galleryAvatar6 from '@/assets/net-zero-sprout.jpg';
import galleryAvatar7 from '@/assets/step-reuse.jpg';
import galleryAvatar8 from '@/assets/turn-emissions-promo.jpg';

const CURATED_GALLERY = [
  { id: 'supplier-portrait', title: 'Industrialist Executive', src: galleryAvatar1 },
  { id: 'forest-canopy', title: 'Verra Forest Canopy', src: galleryAvatar2 },
  { id: 'smart-greenhouse', title: 'Precision Agtech', src: galleryAvatar3 },
  { id: 'algae-biotech', title: 'Algae Carbon Capture', src: galleryAvatar4 },
  { id: 'clean-engineer', title: 'Plant Field Engineer', src: galleryAvatar5 },
  { id: 'net-zero-sprout', title: 'Circular Eco-Sprout', src: galleryAvatar6 },
  { id: 'circular-tech', title: 'Industrial Clean-Tech', src: galleryAvatar7 },
  { id: 'solar-facility', title: 'Solar Array Facility', src: galleryAvatar8 }
];

export const SupplierProfilePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Active Navigation & Dropdown States
  const [activeMenu, setActiveMenu] = useState('profile');
  const [toastMsg, setToastMsg] = useState(null);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // Photo & Cover States (with localStorage persistence)
  const [profilePhoto, setProfilePhoto] = useState(() => {
    return localStorage.getItem('carbonsphere_supplier_photo') || null;
  });
  const [coverPhoto, setCoverPhoto] = useState(() => {
    return localStorage.getItem('carbonsphere_supplier_cover') || coverBannerBg;
  });

  // Edit Mode Toggles for Individual Tabs
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingVerification, setIsEditingVerification] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [isEditingSustainability, setIsEditingSustainability] = useState(false);
  const [showAccountNum, setShowAccountNum] = useState(false);

  // ---------------------------------------------------------------------------
  // 1. PROFILE INFORMATION STATE
  // ---------------------------------------------------------------------------
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
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
    };
  });

  // ---------------------------------------------------------------------------
  // 2. COMPANY DETAILS STATE
  // ---------------------------------------------------------------------------
  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_company');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      legalName: 'GreenTech Industries Private Limited',
      cin: 'U24100MH2018PTC309812',
      gstin: '27AABCG1234D1ZP',
      primaryFacility: 'Plot D-24, Chakan MIDC Phase II, Pune, Maharashtra 410501',
      secondaryFacility: 'Plot 15-B, Sanand Industrial Estate, Ahmedabad, Gujarat 382170',
      carbonCaptureCapacity: '50,000',
      iotSensorsCount: '6',
      telemetryEndpoint: 'https://telemetry.carbonsphere.io/v1/sensors/greentech',
      state: 'Maharashtra',
      city: 'Pune',
      pincode: '410501',
      country: 'India'
    };
  });

  // ---------------------------------------------------------------------------
  // 3. CONTACT INFORMATION STATE
  // ---------------------------------------------------------------------------
  const [contactData, setContactData] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_contact');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      primaryManager: 'Krishna Prajapati',
      primaryRole: 'VP of Industrial Operations',
      primaryPhone: '+91 98231 45678',
      primaryEmail: 'krishna@greentechindustries.com',
      complianceLead: 'Dr. Ananya Sharma',
      complianceRole: 'Registry Verification & ESG Officer',
      compliancePhone: '+91 98230 11223',
      complianceEmail: 'compliance@greentechindustries.com',
      financeLead: 'Rajesh Nair',
      financeRole: 'Escrow & Settlements Lead',
      financePhone: '+91 98230 99887',
      financeEmail: 'accounts@greentechindustries.com',
      hqAddress: 'GreenTech Tower, 5th Floor, Senapati Bapat Road, Shivaji Nagar, Pune, Maharashtra 411016, India'
    };
  });

  // ---------------------------------------------------------------------------
  // 4. VERIFICATION & REGISTRIES STATE
  // ---------------------------------------------------------------------------
  const [registriesList, setRegistriesList] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_registries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 1,
        standard: 'Verra VCS Registry',
        accountId: 'VCS-ID-98214',
        status: 'Active',
        auditor: 'SGS India Pvt. Ltd.',
        lastAuditDate: '2025-06-15',
        nextAuditDate: '2026-06-15',
        notes: 'Annual additionality and biomass boiler baseline verification audit passed.'
      },
      {
        id: 2,
        standard: 'Gold Standard Registry',
        accountId: 'GS-ACC-4109',
        status: 'Linked',
        auditor: 'TÜV NORD Cert GmbH',
        lastAuditDate: '2025-03-10',
        nextAuditDate: '2026-03-10',
        notes: 'Micro-scale solar replacement project eligible for Article 6.4 ITMO transfer.'
      }
    ];
  });
  const [newRegistry, setNewRegistry] = useState({
    standard: 'Puro.earth CORC',
    accountId: '',
    status: 'Active',
    auditor: 'DNV GL Business Assurance',
    lastAuditDate: '',
    nextAuditDate: '',
    notes: ''
  });
  const [showAddRegistryForm, setShowAddRegistryForm] = useState(false);

  // ---------------------------------------------------------------------------
  // 5. BANK & PAYMENT STATE
  // ---------------------------------------------------------------------------
  const [paymentData, setPaymentData] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_payment');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      bankName: 'HDFC Bank Ltd.',
      accountHolder: 'GreenTech Industries Pvt. Ltd.',
      accountNumber: '50200034984211',
      ifsc: 'HDFC0001234',
      branch: 'Senapati Bapat Road Branch, Pune',
      payoutCurrency: 'INR (₹)',
      autoDisbursement: 'Automatic upon verified buyer receipt',
      minThreshold: '25,000'
    };
  });

  // ---------------------------------------------------------------------------
  // 6. DOCUMENTS & COMPLIANCE STATE
  // ---------------------------------------------------------------------------
  const [documentsList, setDocumentsList] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_documents');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      { id: 1, name: 'Pollution Control Board Consent to Operate (CTO).pdf', size: '2.4 MB', date: 'Jul 2025', status: 'Approved' },
      { id: 2, name: 'ISO 14064 Carbon Footprint Baseline Verification.pdf', size: '4.8 MB', date: 'May 2025', status: 'Verified' },
      { id: 3, name: 'Verra Project Design Document (PDD)_Final.pdf', size: '6.1 MB', date: 'Aug 2025', status: 'Active' },
      { id: 4, name: 'Factory Inspectorate Safety & Boiler Certificate.pdf', size: '1.9 MB', date: 'Jan 2026', status: 'Valid' }
    ];
  });

  // ---------------------------------------------------------------------------
  // 7. SUSTAINABILITY GOALS STATE
  // ---------------------------------------------------------------------------
  const [sustainabilityData, setSustainabilityData] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_sustainability');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      targetYear: '2030',
      renewableMixPercent: '68',
      totalMitigated: '142,500',
      scope1Emissions: '12,400',
      scope2Emissions: '4,800',
      scope3Goal: '35',
      technologies: [
        'Solar Rooftop (2.5 MW)',
        'Flue Gas CO₂ Scrubber',
        'Biomass Co-firing',
        'Waste Heat Recovery',
        'IoT Telemetry Continuous Monitoring'
      ]
    };
  });
  const [newTechInput, setNewTechInput] = useState('');

  // ---------------------------------------------------------------------------
  // 8. SECURITY SETTINGS STATE
  // ---------------------------------------------------------------------------
  const [securitySettings, setSecuritySettings] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_security');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      twoFactorEnabled: true,
      sessionTimeout: '30 minutes',
      apiKey: 'cs_live_98ab43e71029c01f',
      loginAlerts: true
    };
  });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  // ---------------------------------------------------------------------------
  // 9. NOTIFICATIONS STATE
  // ---------------------------------------------------------------------------
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('carbonsphere_supplier_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      orderAlerts: true,
      marketInsights: true,
      creditRetirement: true,
      escrowPayout: true,
      auditReminders: true,
      frequency: 'Instant'
    };
  });

  // Helper Toast Notification
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('#user-dropdown-container')) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // ---------------------------------------------------------------------------
  // Photo Upload & Gallery Handlers
  // ---------------------------------------------------------------------------
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        showToast('Image size should be less than 8 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setProfilePhoto(result);
        localStorage.setItem('carbonsphere_supplier_photo', result);
        showToast('Profile photo updated successfully from device gallery!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectGalleryAvatar = (avatarSrc) => {
    setProfilePhoto(avatarSrc);
    localStorage.setItem('carbonsphere_supplier_photo', avatarSrc);
    setShowGalleryModal(false);
    showToast('Avatar selected from CarbonSphere Industrial Gallery!');
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem('carbonsphere_supplier_photo');
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Profile photo reset to default.');
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setCoverPhoto(result);
        localStorage.setItem('carbonsphere_supplier_cover', result);
        showToast('Cover banner photo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // ---------------------------------------------------------------------------
  // Document Upload Handler
  // ---------------------------------------------------------------------------
  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const newDoc = {
        id: Date.now(),
        name: file.name,
        size: `${sizeMB} MB`,
        date: 'Sep 2026',
        status: 'Uploaded'
      };
      const updated = [newDoc, ...documentsList];
      setDocumentsList(updated);
      localStorage.setItem('carbonsphere_supplier_documents', JSON.stringify(updated));
      showToast(`Document "${file.name}" uploaded successfully!`);
    }
  };

  const handleDeleteDocument = (id, name) => {
    const updated = documentsList.filter(doc => doc.id !== id);
    setDocumentsList(updated);
    localStorage.setItem('carbonsphere_supplier_documents', JSON.stringify(updated));
    showToast(`Removed "${name}" from compliance records.`);
  };

  // ---------------------------------------------------------------------------
  // Log Out Handler
  // ---------------------------------------------------------------------------
  const handleLogout = () => {
    showToast('Logging out from CarbonSphere...');
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 600);
  };

  // Common Input Styles
  const getInputClass = (editing) =>
    editing
      ? "w-full bg-white border border-slate-300 text-slate-900 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0e9f6e]/20 focus:border-[#0e9f6e] transition-all shadow-xs"
      : "w-full bg-slate-50/70 border border-slate-200/80 text-slate-800 rounded-xl text-xs font-medium cursor-default transition-all select-text";

  // Sidebar Menu Definitions
  const sidebarMenuItems = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'company', label: 'Company Details', icon: Building2 },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'verification', label: 'Verification & Audits', icon: ShieldCheck },
    { id: 'payment', label: 'Bank & Payment', icon: CreditCard },
    { id: 'documents', label: 'Documents & Compliance', icon: FileText },
    { id: 'sustainability', label: 'Sustainability Goals', icon: Sprout },
    { id: 'security', label: 'Security & Credentials', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 font-sans selection:bg-[#0e9f6e] selection:text-white flex flex-col justify-between">
      
      {/* Hidden File Input for Profile Photo Upload (From User's Gallery / Computer) */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Hidden File Input for Cover Banner Upload */}
      <input 
        type="file" 
        ref={coverInputRef} 
        onChange={handleCoverUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Hidden File Input for Real Document Upload */}
      <input 
        type="file" 
        ref={docInputRef} 
        onChange={handleDocumentUpload} 
        accept=".pdf,.docx,.doc,.xlsx,.xls,.png,.jpg,.jpeg" 
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
      {/* 1. TOP NAVBAR WITH LOGOUT & ACCOUNT POPUP                                 */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 sm:px-8 lg:px-12 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
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

          {/* Center Navigation Links */}
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

          {/* Right User & Log Out Dropdown */}
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                setActiveMenu('notifications');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="relative cursor-pointer p-1.5 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {/* User Account Popover Dropdown */}
            <div id="user-dropdown-container" className="relative">
              <button
                type="button"
                onClick={() => setShowUserDropdown(prev => !prev)}
                className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-1 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#0e4a36] text-white font-bold text-xs flex items-center justify-center shadow-xs overflow-hidden border border-emerald-600/30">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>KP</span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {contactData.primaryManager || 'Krishna Prajapati'}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 leading-tight">
                    Verified Supplier
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Popover Menu with Log Out */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 z-50 animate-fade-in text-xs">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0e4a36] text-white font-bold text-sm flex items-center justify-center overflow-hidden shrink-0">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>KP</span>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-slate-900 truncate">{contactData.primaryManager || 'Krishna Prajapati'}</p>
                      <p className="text-[11px] text-slate-500 truncate">{contactData.primaryEmail || 'krishna@greentech.com'}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.2 bg-emerald-50 text-[#0e6245] text-[9px] font-bold rounded-full border border-emerald-200">
                        {formData.companyName || 'GreenTech Industries'}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenu('profile');
                        setShowUserDropdown(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-left text-slate-700 font-medium cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Manage Supplier Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate('/supplier/dashboard');
                        setShowUserDropdown(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-left text-slate-700 font-medium cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                      <span>Supplier Dashboard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate('/supplier/create-listing');
                        setShowUserDropdown(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-left text-slate-700 font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-400" />
                      <span>Create Carbon Listing</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenu('security');
                        setShowUserDropdown(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-left text-slate-700 font-medium cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Security & Credentials</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 my-1" />

                  {/* Explicit Log Out Option */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 hover:bg-red-50 text-red-600 flex items-center gap-2.5 text-left font-bold cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. COVER BANNER WITH FACTORY & HILLS                                      */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full h-64 sm:h-72 lg:h-80 bg-cover bg-center overflow-hidden transition-all duration-300" 
        style={{ backgroundImage: `url(${coverPhoto})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10 pointer-events-none" />

        <div className="max-w-[1536px] mx-auto h-full px-4 sm:px-8 lg:px-12 relative flex flex-col justify-between py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] font-medium border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Industrial Telemetry Online • Sensor Link 100%</span>
            </div>

            {/* Change Cover Banner Button */}
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="bg-white/80 hover:bg-white text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-slate-600" />
              <span>Change Cover</span>
            </button>
          </div>

          {/* White Bottom Strip */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700 shadow-lg border border-white/60">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>CIN: <strong className="text-slate-900 font-mono">{companyData.cin}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Registry: <strong className="text-slate-900">{registriesList[0]?.accountId || 'VCS-ID-98214'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 hidden md:flex">
                <Sprout className="w-3.5 h-3.5 text-[#0e9f6e]" />
                <span>Annual Capture: <strong className="text-emerald-700">{companyData.carbonCaptureCapacity} tCO₂e</strong></span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              ESG Compliance Rating: <strong className="text-[#0e6245]">AAA Gold Tier</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PROFILE HEADER CARD WITH DYNAMIC AVATAR & EDIT PROFILE TOGGLE          */}
      {/* ========================================================================= */}
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 -mt-14 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          {/* Left: Dynamic Avatar + Title */}
          <div className="flex items-center gap-5">
            
            {/* Round Avatar with Gallery / Camera Upload */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#e8f5ed] border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-[#0e9f6e] fill-[#0e9f6e]/20" />
                )}
              </div>

              {/* Camera Icon triggers device photo gallery */}
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0e6245] text-white flex items-center justify-center shadow-md hover:bg-[#093c2a] transition-all cursor-pointer border-2 border-white"
                title="Upload Photo from Gallery"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Company Title & Details */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
                  {formData.companyName}
                </h1>
                <CheckCircle2 className="w-5 h-5 text-[#0e9f6e] fill-[#0e9f6e]/20 shrink-0" />
              </div>

              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {formData.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {companyData.city}, {companyData.state}, {companyData.country}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {formData.industryType}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Member since Sep 2025
                </span>
              </div>
            </div>

          </div>

          {/* Right: Actions Buttons (Single Primary Edit Profile Button) */}
          <div className="relative flex items-center justify-center sm:justify-end gap-2.5 shrink-0 w-full sm:w-auto">
            
            {/* Single Primary Edit Profile Toggle */}
            <button 
              type="button"
              onClick={() => {
                if (activeMenu === 'profile') setIsEditingProfile(p => !p);
                else if (activeMenu === 'company') setIsEditingCompany(p => !p);
                else if (activeMenu === 'contact') setIsEditingContact(p => !p);
                else if (activeMenu === 'verification') setIsEditingVerification(p => !p);
                else if (activeMenu === 'payment') setIsEditingPayment(p => !p);
                else if (activeMenu === 'sustainability') setIsEditingSustainability(p => !p);
                else setIsEditingProfile(p => !p);
                showToast('Editing mode toggled for active page.');
              }}
              className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Details</span>
            </button>

            {/* View Public Profile Modal Trigger */}
            <button 
              type="button"
              onClick={() => setShowPublicModal(true)}
              className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Public Profile</span>
            </button>

            {/* Three Dots More Menu */}
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
                        setShowGalleryModal(true);
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Choose Avatar from Gallery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        showToast('Generating official ESG Dossier PDF...');
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
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 hover:bg-red-50 flex items-center gap-2.5 text-left cursor-pointer transition-colors text-red-600 font-bold"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN BODY: SIDEBAR + ALL DYNAMIC INTERACTIVE TABS                      */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: SIDEBAR MENU + PROMO CARD + LOGOUT BUTTON                */}
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

              {/* Divider & Dedicated Sidebar Log Out Button */}
              <div className="border-t border-slate-100 my-2 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Promo Card: "Together for a Net Zero Future" */}
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

              <div className="absolute -right-3 -bottom-4 text-[#a7f3d0]/50 pointer-events-none">
                <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4C8 18 10 15 11 11c1-4 1-9 1-9s0 5 1 9c1 4 3 7 4.4 9.4 2.8-1.8 4.6-4.9 4.6-8.4 0-5.5-4.5-10-10-10z" />
                </svg>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: FULLY DYNAMIC PAGES FOR EVERY SINGLE SIDEBAR TAB        */}
          {/* ===================================================================== */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8 animate-fade-in">
            
            {/* ----------------------------------------------------------------- */}
            {/* TAB 1: PROFILE INFORMATION (DYNAMIC & EDITABLE)                   */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'profile' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        Profile Information
                      </h2>
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border ${
                        isEditingProfile ? 'bg-emerald-50 text-[#0e6245] border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {isEditingProfile ? 'Editing Mode' : 'View Mode'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Manage your personal and company information.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {isEditingProfile ? (
                      <>
                        <button 
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            localStorage.setItem('carbonsphere_supplier_profile', JSON.stringify(formData));
                            setIsEditingProfile(false);
                            showToast('Profile information saved successfully!');
                          }}
                          className="px-5 py-2 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(true)}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0e6245] border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Photo Section (Taking from Device Gallery or Predefined Gallery) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">Profile Photo</h3>
                  
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-[#e8f5ed] border border-[#a3d9bc] flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Thumbnail" className="w-full h-full object-cover" />
                      ) : (
                        <Leaf className="w-8 h-8 text-[#0e9f6e] fill-[#0e9f6e]/30" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Device Gallery / File Picker */}
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-slate-500" />
                          <span>Upload from Gallery</span>
                        </button>

                        {/* Curated Industrial Avatar Picker Modal */}
                        <button 
                          type="button"
                          onClick={() => setShowGalleryModal(true)}
                          className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-[#0e6245] rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Choose from Avatars</span>
                        </button>

                        {/* Remove Photo */}
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
                        Recommended size: 400 × 400 px. Supports JPG, PNG, WEBP from your local gallery or camera roll.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Fields for Profile Information */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Company Name</label>
                      <input 
                        type="text"
                        disabled={!isEditingProfile}
                        value={formData.companyName}
                        onChange={(e) => setFormData(p => ({ ...p, companyName: e.target.value }))}
                        className={`${getInputClass(isEditingProfile)} px-3.5 py-2.5`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Industry Type</label>
                      <div className="relative">
                        <select 
                          disabled={!isEditingProfile}
                          value={formData.industryType}
                          onChange={(e) => setFormData(p => ({ ...p, industryType: e.target.value }))}
                          className={`${getInputClass(isEditingProfile)} appearance-none px-3.5 py-2.5 pr-9 ${isEditingProfile ? 'cursor-pointer' : ''}`}
                        >
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Renewable Energy">Renewable Energy</option>
                          <option value="Forestry & Carbon Removal">Forestry & Carbon Removal</option>
                          <option value="Agriculture & Biochar">Agriculture & Biochar</option>
                          <option value="Waste Management">Waste Management</option>
                          <option value="Direct Air Capture (DAC)">Direct Air Capture (DAC)</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Company Tagline</label>
                    <input 
                      type="text"
                      disabled={!isEditingProfile}
                      value={formData.tagline}
                      onChange={(e) => setFormData(p => ({ ...p, tagline: e.target.value }))}
                      className={`${getInputClass(isEditingProfile)} px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Year Established</label>
                      <input 
                        type="text"
                        disabled={!isEditingProfile}
                        value={formData.yearEstablished}
                        onChange={(e) => setFormData(p => ({ ...p, yearEstablished: e.target.value }))}
                        className={`${getInputClass(isEditingProfile)} px-3.5 py-2.5`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Company Size</label>
                      <div className="relative">
                        <select 
                          disabled={!isEditingProfile}
                          value={formData.companySize}
                          onChange={(e) => setFormData(p => ({ ...p, companySize: e.target.value }))}
                          className={`${getInputClass(isEditingProfile)} appearance-none px-3.5 py-2.5 pr-9 ${isEditingProfile ? 'cursor-pointer' : ''}`}
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

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-slate-700 block">About Company</label>
                    <textarea 
                      rows={4}
                      disabled={!isEditingProfile}
                      value={formData.aboutCompany}
                      onChange={(e) => setFormData(p => ({ ...p, aboutCompany: e.target.value }))}
                      className={`${getInputClass(isEditingProfile)} p-3.5 resize-none leading-relaxed`}
                    />
                    <div className="text-right text-[10px] text-slate-400 font-medium">
                      {formData.aboutCompany.length}/500 characters
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">Social & Web Links</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Official Website</label>
                      <div className="relative">
                        <input 
                          type="url"
                          disabled={!isEditingProfile}
                          value={formData.website}
                          onChange={(e) => setFormData(p => ({ ...p, website: e.target.value }))}
                          className={`${getInputClass(isEditingProfile)} pl-9 pr-3.5 py-2.5`}
                        />
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">LinkedIn Profile</label>
                      <div className="relative">
                        <input 
                          type="url"
                          disabled={!isEditingProfile}
                          value={formData.linkedin}
                          onChange={(e) => setFormData(p => ({ ...p, linkedin: e.target.value }))}
                          className={`${getInputClass(isEditingProfile)} pl-9 pr-3.5 py-2.5`}
                        />
                        <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">in</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Twitter / X</label>
                      <div className="relative">
                        <input 
                          type="url"
                          disabled={!isEditingProfile}
                          value={formData.twitter}
                          onChange={(e) => setFormData(p => ({ ...p, twitter: e.target.value }))}
                          className={`${getInputClass(isEditingProfile)} pl-9 pr-3.5 py-2.5`}
                        />
                        <span className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400 font-bold text-xs">𝕏</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">YouTube Channel</label>
                      <div className="relative">
                        <input 
                          type="url"
                          disabled={!isEditingProfile}
                          value={formData.youtube}
                          onChange={(e) => setFormData(p => ({ ...p, youtube: e.target.value }))}
                          className={`${getInputClass(isEditingProfile)} pl-9 pr-3.5 py-2.5`}
                        />
                        <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">▶</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 2: COMPANY DETAILS (DYNAMIC & EDITABLE)                       */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'company' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        Company Details & Industrial Operations
                      </h2>
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border ${
                        isEditingCompany ? 'bg-emerald-50 text-[#0e6245] border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {isEditingCompany ? 'Editing Mode' : 'View Mode'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Official legal identity, industrial plant locations, and operational capacities.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {isEditingCompany ? (
                      <>
                        <button 
                          type="button"
                          onClick={() => setIsEditingCompany(false)}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            localStorage.setItem('carbonsphere_supplier_company', JSON.stringify(companyData));
                            setIsEditingCompany(false);
                            showToast('Company details saved successfully!');
                          }}
                          className="px-5 py-2 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditingCompany(true)}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0e6245] border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit Company Details</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Legal Entity Name</label>
                    <input 
                      type="text"
                      disabled={!isEditingCompany}
                      value={companyData.legalName}
                      onChange={(e) => setCompanyData(p => ({ ...p, legalName: e.target.value }))}
                      className={`${getInputClass(isEditingCompany)} px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">CIN / Registration Number</label>
                    <input 
                      type="text"
                      disabled={!isEditingCompany}
                      value={companyData.cin}
                      onChange={(e) => setCompanyData(p => ({ ...p, cin: e.target.value }))}
                      className={`${getInputClass(isEditingCompany)} font-mono font-bold px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">GSTIN / Tax ID</label>
                    <input 
                      type="text"
                      disabled={!isEditingCompany}
                      value={companyData.gstin}
                      onChange={(e) => setCompanyData(p => ({ ...p, gstin: e.target.value }))}
                      className={`${getInputClass(isEditingCompany)} font-mono font-bold px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Annual Carbon Capture Capacity (tCO₂e / year)</label>
                    <input 
                      type="text"
                      disabled={!isEditingCompany}
                      value={companyData.carbonCaptureCapacity}
                      onChange={(e) => setCompanyData(p => ({ ...p, carbonCaptureCapacity: e.target.value }))}
                      className={`${getInputClass(isEditingCompany)} font-bold text-emerald-700 px-3.5 py-2.5`}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">Facility & Plant Locations</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Primary Manufacturing Facility Address</label>
                    <textarea 
                      rows={2}
                      disabled={!isEditingCompany}
                      value={companyData.primaryFacility}
                      onChange={(e) => setCompanyData(p => ({ ...p, primaryFacility: e.target.value }))}
                      className={`${getInputClass(isEditingCompany)} p-3`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Secondary Plant / Storage Facility</label>
                    <textarea 
                      rows={2}
                      disabled={!isEditingCompany}
                      value={companyData.secondaryFacility}
                      onChange={(e) => setCompanyData(p => ({ ...p, secondaryFacility: e.target.value }))}
                      className={`${getInputClass(isEditingCompany)} p-3`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">City</label>
                      <input 
                        type="text"
                        disabled={!isEditingCompany}
                        value={companyData.city}
                        onChange={(e) => setCompanyData(p => ({ ...p, city: e.target.value }))}
                        className={`${getInputClass(isEditingCompany)} px-3 py-2`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">State</label>
                      <input 
                        type="text"
                        disabled={!isEditingCompany}
                        value={companyData.state}
                        onChange={(e) => setCompanyData(p => ({ ...p, state: e.target.value }))}
                        className={`${getInputClass(isEditingCompany)} px-3 py-2`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">PIN Code</label>
                      <input 
                        type="text"
                        disabled={!isEditingCompany}
                        value={companyData.pincode}
                        onChange={(e) => setCompanyData(p => ({ ...p, pincode: e.target.value }))}
                        className={`${getInputClass(isEditingCompany)} px-3 py-2`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">Country</label>
                      <input 
                        type="text"
                        disabled={!isEditingCompany}
                        value={companyData.country}
                        onChange={(e) => setCompanyData(p => ({ ...p, country: e.target.value }))}
                        className={`${getInputClass(isEditingCompany)} px-3 py-2`}
                      />
                    </div>
                  </div>
                </div>

                {/* Industrial IoT Telemetry Card */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#0e6245]" />
                      <h4 className="font-bold text-slate-900 text-sm">Industrial IoT Integration Status</h4>
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-black rounded-full uppercase">
                      Telemetry Active
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-slate-500 font-semibold block">Connected Flue Gas Sensors</label>
                      <input 
                        type="number"
                        disabled={!isEditingCompany}
                        value={companyData.iotSensorsCount}
                        onChange={(e) => setCompanyData(p => ({ ...p, iotSensorsCount: e.target.value }))}
                        className={`${getInputClass(isEditingCompany)} px-3 py-2 mt-1 font-bold`}
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 font-semibold block">Digital Twin Endpoint</label>
                      <input 
                        type="text"
                        disabled={!isEditingCompany}
                        value={companyData.telemetryEndpoint}
                        onChange={(e) => setCompanyData(p => ({ ...p, telemetryEndpoint: e.target.value }))}
                        className={`${getInputClass(isEditingCompany)} px-3 py-2 mt-1 font-mono text-[11px]`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 3: CONTACT INFORMATION (DYNAMIC & EDITABLE)                   */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'contact' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        Contact Information & Authorized Signatories
                      </h2>
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border ${
                        isEditingContact ? 'bg-emerald-50 text-[#0e6245] border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {isEditingContact ? 'Editing Mode' : 'View Mode'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Official channels for buyer communications, contract executions, and escrows.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {isEditingContact ? (
                      <>
                        <button 
                          type="button"
                          onClick={() => setIsEditingContact(false)}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            localStorage.setItem('carbonsphere_supplier_contact', JSON.stringify(contactData));
                            setIsEditingContact(false);
                            showToast('Contact details updated successfully!');
                          }}
                          className="px-5 py-2 bg-[#0e6245] hover:bg-[#0b5038] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditingContact(true)}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0e6245] border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit Contacts</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  
                  {/* Primary Manager */}
                  <div className="p-4 border border-slate-200/90 rounded-2xl space-y-3 bg-slate-50/50">
                    <span className="text-[10px] uppercase font-bold text-[#0e6245] tracking-wider block">
                      Primary Account Executive
                    </span>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Full Name</label>
                      <input 
                        type="text"
                        disabled={!isEditingContact}
                        value={contactData.primaryManager}
                        onChange={(e) => setContactData(p => ({ ...p, primaryManager: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2 font-bold`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Designation</label>
                      <input 
                        type="text"
                        disabled={!isEditingContact}
                        value={contactData.primaryRole}
                        onChange={(e) => setContactData(p => ({ ...p, primaryRole: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Direct Phone</label>
                      <input 
                        type="tel"
                        disabled={!isEditingContact}
                        value={contactData.primaryPhone}
                        onChange={(e) => setContactData(p => ({ ...p, primaryPhone: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Corporate Email</label>
                      <input 
                        type="email"
                        disabled={!isEditingContact}
                        value={contactData.primaryEmail}
                        onChange={(e) => setContactData(p => ({ ...p, primaryEmail: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2`}
                      />
                    </div>
                  </div>

                  {/* Compliance Lead */}
                  <div className="p-4 border border-slate-200/90 rounded-2xl space-y-3 bg-slate-50/50">
                    <span className="text-[10px] uppercase font-bold text-[#0e6245] tracking-wider block">
                      Registry & Compliance Lead
                    </span>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Full Name</label>
                      <input 
                        type="text"
                        disabled={!isEditingContact}
                        value={contactData.complianceLead}
                        onChange={(e) => setContactData(p => ({ ...p, complianceLead: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2 font-bold`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Designation</label>
                      <input 
                        type="text"
                        disabled={!isEditingContact}
                        value={contactData.complianceRole}
                        onChange={(e) => setContactData(p => ({ ...p, complianceRole: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Direct Phone</label>
                      <input 
                        type="tel"
                        disabled={!isEditingContact}
                        value={contactData.compliancePhone}
                        onChange={(e) => setContactData(p => ({ ...p, compliancePhone: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-600 block">Corporate Email</label>
                      <input 
                        type="email"
                        disabled={!isEditingContact}
                        value={contactData.complianceEmail}
                        onChange={(e) => setContactData(p => ({ ...p, complianceEmail: e.target.value }))}
                        className={`${getInputClass(isEditingContact)} px-3 py-2`}
                      />
                    </div>
                  </div>

                </div>

                {/* Headquarters Address */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700 block">Official Corporate Headquarters</label>
                  <textarea 
                    rows={2}
                    disabled={!isEditingContact}
                    value={contactData.hqAddress}
                    onChange={(e) => setContactData(p => ({ ...p, hqAddress: e.target.value }))}
                    className={`${getInputClass(isEditingContact)} p-3`}
                  />
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 4: VERIFICATION & AUDITS (DYNAMIC & EDITABLE)                 */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'verification' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Carbon Registry Verifications & Audits
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Third-party verified standards supporting issued carbon credits.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddRegistryForm(p => !p)}
                      className="px-3.5 py-1.5 bg-[#0e6245] hover:bg-[#093c2a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showAddRegistryForm ? 'Close Form' : 'Add New Registry'}</span>
                    </button>
                  </div>
                </div>

                {/* Add Registry Form */}
                {showAddRegistryForm && (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 animate-fade-in text-xs">
                    <h4 className="font-bold text-slate-900 text-sm">Link New Carbon Standard</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Standard</label>
                        <select 
                          value={newRegistry.standard} 
                          onChange={(e) => setNewRegistry(p => ({ ...p, standard: e.target.value }))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-medium"
                        >
                          <option value="Verra VCS Registry">Verra VCS Registry</option>
                          <option value="Gold Standard Registry">Gold Standard Registry</option>
                          <option value="Puro.earth CORC">Puro.earth CORC</option>
                          <option value="American Carbon Registry (ACR)">American Carbon Registry (ACR)</option>
                          <option value="Plan Vivo Foundation">Plan Vivo Foundation</option>
                          <option value="Clean Development Mechanism (CDM)">CDM Registry</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Registry Account / Project ID</label>
                        <input 
                          type="text" 
                          placeholder="e.g. PURO-CORC-10928"
                          value={newRegistry.accountId} 
                          onChange={(e) => setNewRegistry(p => ({ ...p, accountId: e.target.value }))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Auditor Body</label>
                        <input 
                          type="text" 
                          placeholder="e.g. DNV GL / TÜV"
                          value={newRegistry.auditor} 
                          onChange={(e) => setNewRegistry(p => ({ ...p, auditor: e.target.value }))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddRegistryForm(false)}
                        className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newRegistry.accountId.trim()) {
                            showToast('Please enter an Account ID.');
                            return;
                          }
                          const updated = [...registriesList, { ...newRegistry, id: Date.now() }];
                          setRegistriesList(updated);
                          localStorage.setItem('carbonsphere_supplier_registries', JSON.stringify(updated));
                          setShowAddRegistryForm(false);
                          setNewRegistry({ standard: 'Puro.earth CORC', accountId: '', status: 'Active', auditor: 'DNV GL Business Assurance', lastAuditDate: '', nextAuditDate: '', notes: '' });
                          showToast('New registry linked successfully!');
                        }}
                        className="px-4 py-1.5 bg-[#0e6245] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                      >
                        Save Registry
                      </button>
                    </div>
                  </div>
                )}

                {/* Registry Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {registriesList.map((reg) => (
                    <div key={reg.id} className="p-4 border border-emerald-200 bg-emerald-50/30 rounded-2xl space-y-2.5 text-xs relative group">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-950 text-sm">{reg.standard}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            {reg.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = registriesList.filter(r => r.id !== reg.id);
                              setRegistriesList(updated);
                              localStorage.setItem('carbonsphere_supplier_registries', JSON.stringify(updated));
                              showToast(`Removed registry ${reg.standard}.`);
                            }}
                            className="text-slate-400 hover:text-red-500 cursor-pointer p-1"
                            title="Delete Registry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-slate-800 font-bold">Account ID: {reg.accountId}</p>
                      <p className="text-slate-600 text-[11px]">Accredited Auditor: <strong className="text-slate-800">{reg.auditor}</strong></p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-emerald-200/50">
                        <span>Last Audit: <strong>{reg.lastAuditDate}</strong></span>
                        <span>Next Audit: <strong>{reg.nextAuditDate}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 5: BANK & PAYMENT (DYNAMIC & EDITABLE)                        */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'payment' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Bank & Escrow Settlement Account
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Direct settlement accounts for marketplace carbon credit trade disbursements.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (isEditingPayment) {
                        localStorage.setItem('carbonsphere_supplier_payment', JSON.stringify(paymentData));
                        setIsEditingPayment(false);
                        showToast('Bank & settlement details saved!');
                      } else {
                        setIsEditingPayment(true);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                      isEditingPayment
                        ? 'bg-[#0e6245] text-white shadow-xs'
                        : 'bg-emerald-50 text-[#0e6245] border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {isEditingPayment ? <Check className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                    <span>{isEditingPayment ? 'Save Bank Settings' : 'Edit Bank Details'}</span>
                  </button>
                </div>

                {/* Real-time Credit/Settlement Card Visualization */}
                <div className="bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 space-y-5 max-w-lg shadow-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span className="font-bold uppercase tracking-wider text-emerald-400">CarbonSphere Escrow Settlement</span>
                    <CreditCard className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-mono text-xl sm:text-2xl tracking-widest font-bold text-white">
                      {showAccountNum 
                        ? paymentData.accountNumber 
                        : `•••• •••• •••• ${paymentData.accountNumber.slice(-4) || '9842'}`
                      }
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAccountNum(p => !p)}
                      className="text-slate-400 hover:text-white cursor-pointer p-1"
                      title={showAccountNum ? 'Hide account' : 'Show account'}
                    >
                      {showAccountNum ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex justify-between text-xs text-slate-300 pt-3 border-t border-slate-800">
                    <div>
                      <span className="text-[9px] uppercase block text-slate-400 font-bold">Account Holder</span>
                      <span className="font-bold text-white text-sm">{paymentData.accountHolder}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase block text-slate-400 font-bold">Bank & IFSC</span>
                      <span className="font-bold text-white text-sm">{paymentData.bankName} ({paymentData.ifsc})</span>
                    </div>
                  </div>
                </div>

                {/* Editable Bank Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Bank Name</label>
                    <input 
                      type="text"
                      disabled={!isEditingPayment}
                      value={paymentData.bankName}
                      onChange={(e) => setPaymentData(p => ({ ...p, bankName: e.target.value }))}
                      className={`${getInputClass(isEditingPayment)} px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Account Holder Name</label>
                    <input 
                      type="text"
                      disabled={!isEditingPayment}
                      value={paymentData.accountHolder}
                      onChange={(e) => setPaymentData(p => ({ ...p, accountHolder: e.target.value }))}
                      className={`${getInputClass(isEditingPayment)} px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Bank Account Number</label>
                    <input 
                      type="text"
                      disabled={!isEditingPayment}
                      value={paymentData.accountNumber}
                      onChange={(e) => setPaymentData(p => ({ ...p, accountNumber: e.target.value }))}
                      className={`${getInputClass(isEditingPayment)} font-mono px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">IFSC / SWIFT Code</label>
                    <input 
                      type="text"
                      disabled={!isEditingPayment}
                      value={paymentData.ifsc}
                      onChange={(e) => setPaymentData(p => ({ ...p, ifsc: e.target.value }))}
                      className={`${getInputClass(isEditingPayment)} font-mono px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Branch Name</label>
                    <input 
                      type="text"
                      disabled={!isEditingPayment}
                      value={paymentData.branch}
                      onChange={(e) => setPaymentData(p => ({ ...p, branch: e.target.value }))}
                      className={`${getInputClass(isEditingPayment)} px-3.5 py-2.5`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Payout Currency</label>
                    <select
                      disabled={!isEditingPayment}
                      value={paymentData.payoutCurrency}
                      onChange={(e) => setPaymentData(p => ({ ...p, payoutCurrency: e.target.value }))}
                      className={`${getInputClass(isEditingPayment)} px-3.5 py-2.5`}
                    >
                      <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                      <option value="USD ($)">USD ($) - US Dollar</option>
                      <option value="EUR (€)">EUR (€) - Euro</option>
                      <option value="GBP (£)">GBP (£) - British Pound</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 6: DOCUMENTS & COMPLIANCE (DYNAMIC & REAL UPLOADER)           */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'documents' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Compliance & Regulatory Documents
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Official environmental certifications, audit sheets, and legal consents.
                    </p>
                  </div>
                  
                  {/* Real File Upload from User's Computer */}
                  <button 
                    type="button"
                    onClick={() => docInputRef.current?.click()}
                    className="px-4 py-2 bg-[#0e6245] hover:bg-[#093c2a] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload New Document</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {documentsList.map((doc) => (
                    <div 
                      key={doc.id} 
                      className="p-4 border border-slate-200/90 rounded-2xl flex items-center justify-between text-xs hover:border-slate-300 transition-all bg-white hover:shadow-xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{doc.name}</p>
                          <span className="text-[10px] text-slate-400">
                            {doc.size} • Uploaded {doc.date} • <strong className="text-emerald-700">{doc.status}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => showToast(`Downloading "${doc.name}"...`)}
                          className="text-xs font-semibold text-[#0e6245] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" /> 
                          <span className="hidden sm:inline">Download</span>
                        </button>

                        <button 
                          type="button"
                          onClick={() => handleDeleteDocument(doc.id, doc.name)}
                          className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 7: SUSTAINABILITY GOALS (DYNAMIC & EDITABLE)                   */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'sustainability' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Sustainability Commitments & ESG Goals
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Our roadmap to net-zero and circular carbon utilization.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (isEditingSustainability) {
                        localStorage.setItem('carbonsphere_supplier_sustainability', JSON.stringify(sustainabilityData));
                        setIsEditingSustainability(false);
                        showToast('Sustainability goals saved!');
                      } else {
                        setIsEditingSustainability(true);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                      isEditingSustainability
                        ? 'bg-[#0e6245] text-white shadow-xs'
                        : 'bg-emerald-50 text-[#0e6245] border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {isEditingSustainability ? <Check className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                    <span>{isEditingSustainability ? 'Save ESG Goals' : 'Edit ESG Goals'}</span>
                  </button>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-[#edf8f1] border border-[#a3d9bc] p-4 rounded-2xl space-y-1">
                    <span className="text-2xl font-black text-[#0e6245]">{sustainabilityData.targetYear}</span>
                    <p className="text-xs font-bold text-slate-800">Net-Zero Target Year</p>
                    <p className="text-[10px] text-slate-500">Committed under SBTI framework</p>
                  </div>
                  <div className="bg-[#edf8f1] border border-[#a3d9bc] p-4 rounded-2xl space-y-1">
                    <span className="text-2xl font-black text-[#0e6245]">{sustainabilityData.renewableMixPercent}%</span>
                    <p className="text-xs font-bold text-slate-800">Renewable Energy Mix</p>
                    <p className="text-[10px] text-slate-500">Solar rooftop + wind PPA</p>
                  </div>
                  <div className="bg-[#edf8f1] border border-[#a3d9bc] p-4 rounded-2xl space-y-1">
                    <span className="text-2xl font-black text-[#0e6245]">{sustainabilityData.totalMitigated}k</span>
                    <p className="text-xs font-bold text-slate-800">tCO₂e Mitigated</p>
                    <p className="text-[10px] text-slate-500">Across all active facilities</p>
                  </div>
                </div>

                {/* Editable Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Target Year</label>
                    <input 
                      type="text"
                      disabled={!isEditingSustainability}
                      value={sustainabilityData.targetYear}
                      onChange={(e) => setSustainabilityData(p => ({ ...p, targetYear: e.target.value }))}
                      className={`${getInputClass(isEditingSustainability)} px-3.5 py-2.5 font-bold`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Renewable Mix (%)</label>
                    <input 
                      type="text"
                      disabled={!isEditingSustainability}
                      value={sustainabilityData.renewableMixPercent}
                      onChange={(e) => setSustainabilityData(p => ({ ...p, renewableMixPercent: e.target.value }))}
                      className={`${getInputClass(isEditingSustainability)} px-3.5 py-2.5 font-bold`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Scope 3 Reduction Target (%)</label>
                    <input 
                      type="text"
                      disabled={!isEditingSustainability}
                      value={sustainabilityData.scope3Goal}
                      onChange={(e) => setSustainabilityData(p => ({ ...p, scope3Goal: e.target.value }))}
                      className={`${getInputClass(isEditingSustainability)} px-3.5 py-2.5 font-bold`}
                    />
                  </div>
                </div>

                {/* Clean Technologies Chips */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">Adopted Clean Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {sustainabilityData.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-[#0e6245] border border-emerald-200 text-xs font-bold rounded-xl flex items-center gap-2">
                        <span>{tech}</span>
                        {isEditingSustainability && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = sustainabilityData.technologies.filter((_, i) => i !== idx);
                              setSustainabilityData(p => ({ ...p, technologies: updated }));
                            }}
                            className="text-emerald-700 hover:text-red-500 cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>

                  {isEditingSustainability && (
                    <div className="flex items-center gap-2 pt-2">
                      <input 
                        type="text" 
                        placeholder="Add technology (e.g. Biochar Pyrolysis Unit)"
                        value={newTechInput}
                        onChange={(e) => setNewTechInput(e.target.value)}
                        className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-medium w-72"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newTechInput.trim()) {
                            setSustainabilityData(p => ({
                              ...p,
                              technologies: [...p.technologies, newTechInput.trim()]
                            }));
                            setNewTechInput('');
                            showToast('Clean technology added!');
                          }
                        }}
                        className="px-4 py-2 bg-[#0e6245] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Add Tech
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 8: SECURITY & CREDENTIALS (DYNAMIC & EDITABLE)               */}
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
                  
                  {/* 2FA Toggle */}
                  <div className="p-4 border border-slate-200/90 rounded-2xl flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h4 className="font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                      <p className="text-slate-500 mt-0.5">Enforces TOTP code for listing approvals and escrow fund release.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        const updated = { ...securitySettings, twoFactorEnabled: !securitySettings.twoFactorEnabled };
                        setSecuritySettings(updated);
                        localStorage.setItem('carbonsphere_supplier_security', JSON.stringify(updated));
                        showToast(`Two-factor authentication ${updated.twoFactorEnabled ? 'enabled' : 'disabled'}`);
                      }}
                      className={`px-4 py-1.5 rounded-full font-bold text-xs cursor-pointer transition-colors ${
                        securitySettings.twoFactorEnabled ? 'bg-[#0e6245] text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  {/* API Key */}
                  <div className="p-4 border border-slate-200/90 rounded-2xl space-y-2 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">CarbonSphere Marketplace API Key</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const newKey = `cs_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
                          const updated = { ...securitySettings, apiKey: newKey };
                          setSecuritySettings(updated);
                          localStorage.setItem('carbonsphere_supplier_security', JSON.stringify(updated));
                          showToast('Fresh API Key generated!');
                        }}
                        className="text-xs text-[#0e6245] font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Regenerate Key</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={securitySettings.apiKey}
                        className="bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs text-slate-700 w-full"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(securitySettings.apiKey);
                          showToast('API Key copied to clipboard!');
                        }}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Change Password Form */}
                  <div className="p-4 border border-slate-200/90 rounded-2xl space-y-3 bg-slate-50/50">
                    <h4 className="font-bold text-slate-900">Change Account Password</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-slate-500 font-medium block mb-1">Current Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={passwordForm.current}
                          onChange={(e) => setPasswordForm(p => ({ ...p, current: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="text-slate-500 font-medium block mb-1">New Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={passwordForm.newPass}
                          onChange={(e) => setPasswordForm(p => ({ ...p, newPass: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="text-slate-500 font-medium block mb-1">Confirm Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm(p => ({ ...p, confirm: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!passwordForm.current || !passwordForm.newPass) {
                          showToast('Please enter both current and new password.');
                          return;
                        }
                        if (passwordForm.newPass !== passwordForm.confirm) {
                          showToast('New passwords do not match.');
                          return;
                        }
                        setPasswordForm({ current: '', newPass: '', confirm: '' });
                        showToast('Password changed successfully!');
                      }}
                      className="px-4 py-2 bg-[#0e6245] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* TAB 9: NOTIFICATIONS (DYNAMIC & EDITABLE)                         */}
            {/* ----------------------------------------------------------------- */}
            {activeMenu === 'notifications' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Notification & Alert Preferences
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Choose what real-time trade, registry, and audit alerts you want to receive.
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('carbonsphere_supplier_notifications', JSON.stringify(notificationSettings));
                      showToast('Notification preferences saved!');
                    }}
                    className="px-4 py-2 bg-[#0e6245] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                  >
                    Save Preferences
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { key: 'orderAlerts', title: 'New Buyer Purchase Orders', desc: 'Instant notification when an enterprise buyer places an order for your carbon credits.' },
                    { key: 'marketInsights', title: 'Weekly Carbon Market Price Index', desc: 'Spot price changes, demand spikes, and pricing recommendations across classes.' },
                    { key: 'creditRetirement', title: 'Credit Retirement Proof Generated', desc: 'On-chain immutable cryptographic receipt when credits are officially retired.' },
                    { key: 'escrowPayout', title: 'Escrow Settlement Payout Confirmation', desc: 'Immediate notification when escrow proceeds are deposited into your registered bank account.' },
                    { key: 'auditReminders', title: 'Registry Audit & Renewal Reminders', desc: 'Alerts 60 days and 30 days prior to third-party verification expiry.' }
                  ].map((item) => (
                    <div key={item.key} className="p-4 border border-slate-200/90 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="pr-4">
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={notificationSettings[item.key]}
                        onChange={() => {
                          const updated = { ...notificationSettings, [item.key]: !notificationSettings[item.key] };
                          setNotificationSettings(updated);
                          localStorage.setItem('carbonsphere_supplier_notifications', JSON.stringify(updated));
                          showToast('Notification preference updated.');
                        }}
                        className="w-5 h-5 text-[#0e6245] rounded-md border-slate-300 focus:ring-[#0e6245] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Delivery Frequency */}
                <div className="p-4 border border-slate-200/90 rounded-2xl space-y-3 text-xs bg-slate-50/50">
                  <h4 className="font-bold text-slate-900">Email Digest Delivery Frequency</h4>
                  <div className="flex gap-4">
                    {['Instant', 'Daily Summary', 'Weekly Digest'].map((freq) => (
                      <label key={freq} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="frequency"
                          checked={notificationSettings.frequency === freq}
                          onChange={() => {
                            const updated = { ...notificationSettings, frequency: freq };
                            setNotificationSettings(updated);
                            localStorage.setItem('carbonsphere_supplier_notifications', JSON.stringify(updated));
                            showToast(`Delivery frequency set to ${freq}`);
                          }}
                          className="text-[#0e6245] focus:ring-[#0e6245]"
                        />
                        <span className="font-semibold text-slate-700">{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. CURATED AVATAR GALLERY MODAL                                           */}
      {/* ========================================================================= */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Choose Avatar from Gallery</h3>
                <p className="text-xs text-slate-500">Pick an official industrial, forestry, or clean-tech visual identity.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowGalleryModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CURATED_GALLERY.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => handleSelectGalleryAvatar(avatar.src)}
                  className="group flex flex-col items-center gap-2 p-2 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-emerald-500 shadow-xs">
                    <img src={avatar.src} alt={avatar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                    {avatar.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowGalleryModal(false);
                  fileInputRef.current?.click();
                }}
                className="text-xs text-[#0e6245] font-bold hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Custom Image from Device Instead</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PUBLIC PROFILE PREVIEW MODAL                                           */}
      {/* ========================================================================= */}
      {showPublicModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 overflow-hidden relative">
            
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

            <div className="p-6 space-y-6">
              
              {/* Cover & Dynamic Avatar */}
              <div 
                className="relative rounded-2xl overflow-hidden h-36 bg-cover bg-center border border-slate-200" 
                style={{ backgroundImage: `url(${coverPhoto})` }}
              >
                <div className="absolute inset-0 bg-black/45" />
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
                  {sustainabilityData.totalMitigated}k tCO₂e Mitigated
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 font-medium">
                  Verified by {registriesList[0]?.standard || 'Verra VCS'}
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
