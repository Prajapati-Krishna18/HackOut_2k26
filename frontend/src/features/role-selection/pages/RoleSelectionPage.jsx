import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Leaf, 
  HelpCircle, 
  ChevronDown, 
  Check, 
  ArrowRight, 
  UploadCloud, 
  BarChart3, 
  IndianRupee, 
  Search, 
  ShoppingCart, 
  Footprints, 
  Users, 
  ShieldCheck, 
  Settings,
  Info
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';

// Photographic background & 3D vector role illustrations
import roleSelectBg from '@/assets/role-select-bg.jpg';
import supplierArt from '@/assets/role-supplier.jpg';
import buyerArt from '@/assets/role-buyer.jpg';
import adminArt from '@/assets/role-admin.jpg';

export const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState(USER_ROLES.SUPPLIER);
  const { selectRole, user } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    selectRole(selectedRole);
    if (selectedRole === USER_ROLES.SUPPLIER) {
      navigate('/supplier/onboarding');
    } else if (selectedRole === USER_ROLES.BUYER) {
      navigate('/buyer/dashboard');
    } else if (selectedRole === USER_ROLES.ADMIN) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative bg-cover bg-center font-sans text-slate-900 selection:bg-[#0e9f6e] selection:text-white flex flex-col justify-between"
      style={{ backgroundImage: `url(${roleSelectBg})` }}
    >
      {/* Soft atmospheric overlay for clear contrast on wide screens */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-white/10 pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVIGATION BAR                                              */}
      {/* ========================================================================= */}
      <header className="w-full bg-white border-b border-slate-200/80 px-6 sm:px-12 py-3 flex items-center justify-between relative z-30 shrink-0">
        
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Carbon<span className="text-[#0e9f6e]">Sphere</span>
            </span>
            <span className="text-[9px] font-medium text-slate-500 -mt-1 hidden sm:block">
              Cleaner Industries. Brighter Tomorrows.
            </span>
          </div>
        </Link>

        {/* Right Controls: Need Help & User Avatar Badge */}
        <div className="flex items-center gap-5">
          <a 
            href="#help" 
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Need Help?</span>
          </a>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-[#072b1e] text-emerald-300 font-bold text-xs flex items-center justify-center shadow-xs">
              KP
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

      </header>


      {/* ========================================================================= */}
      {/* 2. MAIN LAYOUT: LEFT CALLOUT STORY & RIGHT ROLE SELECTION CARD             */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-6 sm:px-12 py-4 lg:py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: BRAND STORY & FROSTED REALISM CARD                         */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between h-full py-2 space-y-6">
          
          {/* Main Left Headline */}
          <div className="space-y-3 pt-2">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.08]">
              A Cleaner<br />
              Tomorrow<br />
              Starts with<br />
              <span className="text-[#0e9f6e]">You</span>
            </h1>

            <div className="w-10 h-1 bg-[#0e9f6e] rounded-full" />

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Connect. Trade. Reuse.<br />
              For a Sustainable Planet.
            </p>
          </div>

          {/* Bottom Left Frosted Glass Card: People. Technology. A Greener Future. */}
          <div className="bg-emerald-950/70 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg text-white max-w-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-[#34d399] shadow-xs">
              <Leaf className="w-4 h-4 fill-current" />
            </div>
            <div className="text-xs font-semibold leading-snug">
              People.<br />
              Technology.<br />
              A Greener Future.
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="w-7 h-1 bg-white rounded-full" />
              <div className="w-2 h-1 bg-white/40 rounded-full" />
            </div>
          </div>

        </div>


        {/* ======================================================================= */}
        {/* RIGHT COLUMN: MAIN WHITE ROLE SELECTION CARD                            */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 xl:col-span-8 flex justify-center lg:justify-end">
          
          <div className="bg-white rounded-3xl sm:rounded-[2rem] border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-6 sm:p-8 max-w-4xl w-full space-y-5">
            
            {/* =================================================================== */}
            {/* 5-STEP PROGRESS STEPPER                                             */}
            {/* =================================================================== */}
            <div className="max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between relative">
                
                {/* Connecting Lines */}
                <div className="absolute left-6 right-6 top-3 h-[1.5px] bg-slate-200 -z-0">
                  <div className="h-full bg-[#0e6245] w-[50%] transition-all duration-300" />
                </div>

                {/* Step 1: Sign Up (Completed) */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#0e6245] text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-4 ring-emerald-50">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 mt-1">Sign Up</span>
                </div>

                {/* Step 2: Verify OTP (Completed) */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#0e6245] text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-4 ring-emerald-50">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 mt-1">Verify OTP</span>
                </div>

                {/* Step 3: Select Role (Active) */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#0e6245] text-white flex items-center justify-center text-[11px] font-bold shadow-xs ring-4 ring-emerald-100">
                    3
                  </div>
                  <span className="text-[10px] font-bold text-[#0e6245] mt-1">Select Role</span>
                </div>

                {/* Step 4: Setup Profile (Pending) */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center text-[11px] font-medium">
                    4
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">Setup Profile</span>
                </div>

                {/* Step 5: Get Started (Pending) */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center text-[11px] font-medium">
                    5
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">Get Started</span>
                </div>

              </div>
            </div>

            {/* =================================================================== */}
            {/* CARD TITLE & SUBTITLE                                               */}
            {/* =================================================================== */}
            <div className="text-center space-y-1 pt-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Select Your Role
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                Choose how you want to be a part of CarbonSphere
              </p>
              <p className="text-[11px] text-slate-400">
                You can't change this later, so choose the role that best fits you.
              </p>
            </div>

            {/* =================================================================== */}
            {/* 3 ROLE SELECTION CARDS                                              */}
            {/* =================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              
              {/* Role 1: Supplier */}
              <div 
                onClick={() => setSelectedRole(USER_ROLES.SUPPLIER)}
                className={`rounded-2xl p-4 cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                  selectedRole === USER_ROLES.SUPPLIER 
                    ? 'border-2 border-[#0e9f6e] bg-[#f4faf6] shadow-xs' 
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Radio Circle Checkmark in Top Right */}
                <div className="absolute top-3.5 right-3.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    selectedRole === USER_ROLES.SUPPLIER 
                      ? 'bg-[#0e6245] text-white shadow-xs' 
                      : 'border-2 border-slate-300 bg-white'
                  }`}>
                    {selectedRole === USER_ROLES.SUPPLIER && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Circular Illustration */}
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-xs border border-slate-100 bg-slate-50">
                    <img 
                      src={supplierArt} 
                      alt="Supplier Role" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="text-center space-y-1">
                    <h3 className={`text-base font-black tracking-tight ${
                      selectedRole === USER_ROLES.SUPPLIER ? 'text-[#0e9f6e]' : 'text-slate-900'
                    }`}>
                      Supplier
                    </h3>
                    <p className="text-[10.5px] text-slate-500 leading-tight">
                      List and sell your captured carbon credits to verified buyers.
                    </p>
                  </div>

                  {/* 4 Feature Items */}
                  <div className="space-y-2 pt-1 border-t border-slate-100/80">
                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <UploadCloud className="w-3.5 h-3.5 text-[#0e9f6e] shrink-0" />
                      <span>List carbon credits</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <BarChart3 className="w-3.5 h-3.5 text-[#0e9f6e] shrink-0" />
                      <span>Manage inventory</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <IndianRupee className="w-3.5 h-3.5 text-[#0e9f6e] shrink-0" />
                      <span>Track sales & transactions</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <Leaf className="w-3.5 h-3.5 text-[#0e9f6e] shrink-0" />
                      <span>Showcase your sustainability impact</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role 2: Buyer */}
              <div 
                onClick={() => setSelectedRole(USER_ROLES.BUYER)}
                className={`rounded-2xl p-4 cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                  selectedRole === USER_ROLES.BUYER 
                    ? 'border-2 border-[#0e9f6e] bg-[#f4faf6] shadow-xs' 
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Radio Circle Checkmark in Top Right */}
                <div className="absolute top-3.5 right-3.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    selectedRole === USER_ROLES.BUYER 
                      ? 'bg-[#0e6245] text-white shadow-xs' 
                      : 'border-2 border-slate-300 bg-white'
                  }`}>
                    {selectedRole === USER_ROLES.BUYER && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Circular Illustration */}
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-xs border border-slate-100 bg-slate-50">
                    <img 
                      src={buyerArt} 
                      alt="Buyer Role" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="text-center space-y-1">
                    <h3 className={`text-base font-black tracking-tight ${
                      selectedRole === USER_ROLES.BUYER ? 'text-[#0e9f6e]' : 'text-slate-900'
                    }`}>
                      Buyer
                    </h3>
                    <p className="text-[10.5px] text-slate-500 leading-tight">
                      Discover and purchase verified carbon credits to offset emissions.
                    </p>
                  </div>

                  {/* 4 Feature Items */}
                  <div className="space-y-2 pt-1 border-t border-slate-100/80">
                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <Search className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Search verified suppliers</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <ShoppingCart className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Purchase carbon credits</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <Footprints className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Track your carbon footprint</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <BarChart3 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Generate impact reports</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role 3: Admin */}
              <div 
                onClick={() => setSelectedRole(USER_ROLES.ADMIN)}
                className={`rounded-2xl p-4 cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                  selectedRole === USER_ROLES.ADMIN 
                    ? 'border-2 border-[#0e9f6e] bg-[#f4faf6] shadow-xs' 
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Radio Circle Checkmark in Top Right */}
                <div className="absolute top-3.5 right-3.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    selectedRole === USER_ROLES.ADMIN 
                      ? 'bg-[#0e6245] text-white shadow-xs' 
                      : 'border-2 border-slate-300 bg-white'
                  }`}>
                    {selectedRole === USER_ROLES.ADMIN && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Circular Illustration */}
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-xs border border-slate-100 bg-slate-50">
                    <img 
                      src={adminArt} 
                      alt="Admin Role" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="text-center space-y-1">
                    <h3 className={`text-base font-black tracking-tight ${
                      selectedRole === USER_ROLES.ADMIN ? 'text-[#0e9f6e]' : 'text-slate-900'
                    }`}>
                      Admin
                    </h3>
                    <p className="text-[10.5px] text-slate-500 leading-tight">
                      Manage the platform, users and ensure a transparent ecosystem.
                    </p>
                  </div>

                  {/* 4 Feature Items */}
                  <div className="space-y-2 pt-1 border-t border-slate-100/80">
                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Manage users & verifications</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Monitor transactions</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <Settings className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Maintain platform settings</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-700">
                      <BarChart3 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>View overall impact & reports</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* =================================================================== */}
            {/* CTA CONTINUE BUTTON                                                 */}
            {/* =================================================================== */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm group"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Verification Info Subtext */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>All roles go through a verification process to ensure trust and transparency.</span>
              </div>
            </div>

            {/* =================================================================== */}
            {/* BOTTOM 3 TRUST PILL BADGES                                          */}
            {/* =================================================================== */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Trust 1: Secure & Verified */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Secure & Verified</h4>
                  <p className="text-[10px] text-slate-500">Trusted participants only</p>
                </div>
              </div>

              {/* Trust 2: Real Climate Impact */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Real Climate Impact</h4>
                  <p className="text-[10px] text-slate-500">Contribute to a greener planet</p>
                </div>
              </div>

              {/* Trust 3: Growing Community */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Growing Community</h4>
                  <p className="text-[10px] text-slate-500">Industries, innovators, changemakers</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default RoleSelectionPage;
