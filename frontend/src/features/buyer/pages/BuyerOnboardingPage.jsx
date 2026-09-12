import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Leaf, 
  Building2, 
  ShoppingBag, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Link2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  BarChart3, 
  Globe, 
  CheckCircle2, 
  TrendingUp, 
  Sprout, 
  Quote,
  Target
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';
import cleanBg from '@/assets/signup-clean-bg.jpg';

export const BuyerOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      organizationName: '',
      industrySector: 'Heavy Manufacturing & Steel',
      esgTargetYear: '2030',
      contactPerson: '',
      workEmail: '',
      contactPhone: '+91 ',
      procurementTarget: '5,000 - 25,000 tCO2e/yr',
      preferredMethod: 'Direct Air Capture (DAC) & Mineralization',
      budgetRange: '$100k - $500k',
      complianceStandard: 'Gold Standard & Verra VCS'
    }
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleNext = (data) => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete onboarding and enter buyer command center
      login(
        { 
          email: data.workEmail || 'buyer@carbonsphere.io', 
          name: data.organizationName || 'Global Eco Ventures' 
        },
        'mock_jwt_token_buyer',
        USER_ROLES.BUYER
      );
      navigate('/buyer/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/role-selection');
    }
  };

  return (
    <div 
      className="h-screen max-h-screen w-full relative bg-cover bg-center font-sans text-slate-900 selection:bg-[#0e9f6e] selection:text-white flex flex-col justify-between overflow-hidden"
      style={{ backgroundImage: `url(${cleanBg})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-transparent lg:w-[58%] pointer-events-none z-0" />

      {/* TOP BAR */}
      <header className="w-full px-6 sm:px-12 py-3.5 flex items-center justify-between relative z-30 shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10a37f] flex items-center justify-center text-white shadow-md">
            <Leaf className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
              Carbon<span className="text-[#10b981]">Sphere</span>
            </span>
            <span className="text-[9px] font-medium tracking-wide text-emerald-200/80 -mt-1 hidden sm:block">
              Corporate Carbon Offtake & Sustainability Command
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white/85 hover:bg-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-xs font-bold text-slate-700 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/50 shadow-xs">
            Step {currentStep} of 3
          </span>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="max-w-[1536px] w-full mx-auto px-6 sm:px-12 py-2 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20 min-h-0">
        
        {/* LEFT COLUMN: HERO CONTENT */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-3.5 text-white pr-0 lg:pr-6">
          <div className="space-y-1.5 max-w-md">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-emerald-300">
              <span className="w-5 h-[2px] bg-[#10b981]"></span>
              <span>CORPORATE BUYER ONBOARDING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Accelerate<br />
              Your Net-Zero<br />
              <span className="text-[#10b981]">Commitments.</span>
            </h1>

            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm pt-0.5">
              Source verified high-durability carbon removal, trace molecular CO₂ origin with IoT telemetry, and automate ESG reporting.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="space-y-2.5 max-w-md">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Tailored Offtake Contracts</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Spot purchases or multi-year forward streams</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Cryptographic Proof of Removal</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Immutable digital certificates with satellite audit trails</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Automated Scope 1-3 Insetting</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Instant export to CDP, GHG Protocol & SEC standards</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ONBOARDING CARD */}
        <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_16px_50px_rgba(0,0,0,0.12)] p-6 sm:p-7 max-w-md w-full space-y-4 relative z-10">
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-lg font-black text-slate-900 tracking-tight">Buyer Profile Setup</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight pt-1">
                  {currentStep === 1 && 'Organization & ESG Goals'}
                  {currentStep === 2 && 'Carbon Procurement Specs'}
                  {currentStep === 3 && 'Compliance & Review'}
                </h2>
                <p className="text-[11px] text-slate-500">
                  {currentStep === 1 && 'Define your company profile and sustainability timeline'}
                  {currentStep === 2 && 'Specify volumes, removal methods, and budget'}
                  {currentStep === 3 && 'Confirm verification standards and finalize setup'}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#0e6245] font-black text-sm flex items-center justify-center">
                {currentStep}/3
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="flex gap-2">
              <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 1 ? 'bg-[#0e6245]' : 'bg-slate-100'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 2 ? 'bg-[#0e6245]' : 'bg-slate-100'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 3 ? 'bg-[#0e6245]' : 'bg-slate-100'}`} />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleNext)} className="space-y-3 pt-1">
              {currentStep === 1 && (
                <>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Organization / Enterprise Name</label>
                    <div className="border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-[#0e9f6e]">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="e.g. Acme Sustainability Corp" 
                        className="w-full text-xs text-slate-900 outline-none"
                        {...register('organizationName', { required: true })} 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Industry Sector</label>
                    <select 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none bg-white focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('industrySector')}
                    >
                      <option>Heavy Manufacturing & Steel</option>
                      <option>Technology & Data Centers</option>
                      <option>Aviation & Logistics</option>
                      <option>Energy & Utilities</option>
                      <option>Consumer Goods & Retail</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-700">Net-Zero Target</label>
                      <select 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none bg-white focus:ring-2 focus:ring-[#0e9f6e]"
                        {...register('esgTargetYear')}
                      >
                        <option>2030</option>
                        <option>2035</option>
                        <option>2040</option>
                        <option>2050</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-700">Work Email</label>
                      <div className="border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-[#0e9f6e]">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="email" 
                          placeholder="esg@acme.com" 
                          className="w-full text-xs text-slate-900 outline-none"
                          {...register('workEmail', { required: true })} 
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Annual Procurement Volume</label>
                    <select 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none bg-white focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('procurementTarget')}
                    >
                      <option>1,000 - 5,000 tCO2e/yr</option>
                      <option>5,000 - 25,000 tCO2e/yr</option>
                      <option>25,000 - 100,000 tCO2e/yr</option>
                      <option>100,000+ tCO2e/yr</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Preferred Carbon Removal Tech</label>
                    <select 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none bg-white focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('preferredMethod')}
                    >
                      <option>Direct Air Capture (DAC) & Mineralization</option>
                      <option>Biochar & Enhanced Weathering</option>
                      <option>Point-Source Industrial CO2 Reuse</option>
                      <option>Algae & Biological Conversion</option>
                      <option>Hybrid Portfolio</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Estimated Annual Carbon Budget</label>
                    <select 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none bg-white focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('budgetRange')}
                    >
                      <option>$50,000 - $250,000</option>
                      <option>$250,000 - $1,000,000</option>
                      <option>$1,000,000 - $5,000,000</option>
                      <option>$5,000,000+</option>
                    </select>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                      <span>Ready to Deploy Offtake Matching</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Your buyer profile is configured with AI matching enabled. You will immediately access live marketplace batches and predictive supply streams.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Compliance & Registry Preference</label>
                    <select 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none bg-white focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('complianceStandard')}
                    >
                      <option>Gold Standard & Verra VCS</option>
                      <option>Puro.earth Standard</option>
                      <option>American Carbon Registry (ACR)</option>
                      <option>Isometric High-Permanence Standard</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm mt-3"
              >
                <span>{currentStep === 3 ? 'Complete Setup & Launch Dashboard' : 'Continue to Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
};

export default BuyerOnboardingPage;
