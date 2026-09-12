import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Leaf, 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Layers,
  Activity,
  Server
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';
import cleanBg from '@/assets/signup-clean-bg.jpg';

export const AdminOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      auditorName: '',
      organization: 'Global Carbon Registry & Standards Council',
      mrvRole: 'Lead Verification Auditor',
      telemetryEndpoint: 'https://mrv-node-01.carbonsphere.io',
      verificationMethodology: 'ISO 14064-2 & GHG Protocol'
    }
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleNext = (data) => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete onboarding and enter admin command center
      login(
        { 
          email: 'admin@carbonsphere.io', 
          name: data.auditorName || 'Lead Auditor' 
        },
        'mock_jwt_token_admin',
        USER_ROLES.ADMIN
      );
      navigate('/admin/dashboard');
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
              MRV, Registry Governance & Ecosystem Clearance
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
            Step {currentStep} of 2
          </span>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="max-w-[1536px] w-full mx-auto px-6 sm:px-12 py-2 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20 min-h-0">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-3.5 text-white pr-0 lg:pr-6">
          <div className="space-y-1.5 max-w-md">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-emerald-300">
              <span className="w-5 h-[2px] bg-[#10b981]"></span>
              <span>GOVERNANCE & AUDITOR ONBOARDING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Verify.<br />
              Audit.<br />
              <span className="text-[#10b981]">Guarantee Trust.</span>
            </h1>

            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm pt-0.5">
              Supervise cryptographic batch minting, monitor real-time chimney IoT sensor telemetry, and execute escrow clearances.
            </p>
          </div>

          <div className="space-y-2.5 max-w-md">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Live MRV Telemetry Stream</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Continuous verification of flow meters and purity sensors</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-[#10b981]/40 text-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Audit & Batch Minting Authority</h4>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">Approve or flag industrial carbon credit batches</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_16px_50px_rgba(0,0,0,0.12)] p-6 sm:p-7 max-w-md w-full space-y-4 relative z-10">
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-lg font-black text-slate-900 tracking-tight">Admin & Auditor Setup</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight pt-1">
                  {currentStep === 1 ? 'Auditor Credentials' : 'Node & Escrow Permissions'}
                </h2>
                <p className="text-[11px] text-slate-500">
                  {currentStep === 1 ? 'Verify authority and institutional affiliation' : 'Confirm governance access keys and telemetry node'}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#0e6245] font-black text-sm flex items-center justify-center">
                {currentStep}/2
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="flex gap-2">
              <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 1 ? 'bg-[#0e6245]' : 'bg-slate-100'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 2 ? 'bg-[#0e6245]' : 'bg-slate-100'}`} />
            </div>

            <form onSubmit={handleSubmit(handleNext)} className="space-y-3 pt-1">
              {currentStep === 1 && (
                <>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Lead Auditor / Officer Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dr. Eleanor Vance" 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('auditorName', { required: true })} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Accredited Organization / Registry</label>
                    <input 
                      type="text" 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('organization')} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">Audit Standards Framework</label>
                    <select 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none bg-white focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('verificationMethodology')}
                    >
                      <option>ISO 14064-2 & GHG Protocol</option>
                      <option>Verra VCS Certified Auditor</option>
                      <option>Gold Standard Approved VVB</option>
                    </select>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Lock className="w-4 h-4 text-amber-600" />
                      <span>Privileged Node Authority</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      You are granting cryptographic verification permissions for smart contracts and credit minting.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">MRV Telemetry Ingestion Node</label>
                    <input 
                      type="text" 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#0e9f6e]"
                      {...register('telemetryEndpoint')} 
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm mt-3"
              >
                <span>{currentStep === 2 ? 'Authorize & Launch Admin Hub' : 'Proceed to Permissions'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminOnboardingPage;
