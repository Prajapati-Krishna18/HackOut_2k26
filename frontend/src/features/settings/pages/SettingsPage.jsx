import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Building2, 
  Key, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  Factory,
  ShoppingBag,
  SlidersHorizontal
} from 'lucide-react';

export const SettingsPage = () => {
  const { user, role, updateProfile, selectRole } = useAuth();
  
  const [fullName, setFullName] = useState(user?.full_name || user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [company, setCompany] = useState(user?.company || 'Apex Carbon Operations Ltd');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [apiKey, setApiKey] = useState('cs_live_sec_994b29f0e1a84218_production');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      name: fullName,
      email,
      company,
      avatar_url: avatarUrl || null
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRotateKey = () => {
    const newKey = `cs_live_sec_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}_production`;
    setApiKey(newKey);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Enterprise Profile & Workspace Settings</h1>
        <p className="text-xs text-slate-500 dark:text-carbon-300 mt-1">
          Manage dynamic user credentials, active workspace role, and real-time IoT integration keys.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
          <span>Profile updated successfully! All workspace headers & sidebars updated dynamically.</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <Card className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-4 border-b border-slate-200 dark:border-carbon-800">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={fullName} 
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10b981] text-white flex items-center justify-center font-black text-2xl shadow-md">
              {(fullName || 'C')[0]?.toUpperCase()}
            </div>
          )}

          <div className="space-y-1 text-center sm:text-left flex-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{fullName || 'Authorized Member'}</h2>
            <p className="text-xs text-slate-500">{email || 'member@carbonsphere.io'}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-[#0e6245] dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                {role || 'SUPPLIER'} WORKSPACE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-carbon-800 text-slate-600 dark:text-slate-300">
                Verified Enterprise Account
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Personal & Organization Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="border border-slate-200 dark:border-carbon-700 rounded-xl px-3 py-2 flex items-center gap-2 bg-white dark:bg-carbon-800">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name" 
                  className="w-full text-xs text-slate-900 dark:text-white outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="border border-slate-200 dark:border-carbon-700 rounded-xl px-3 py-2 flex items-center gap-2 bg-white dark:bg-carbon-800">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address" 
                  className="w-full text-xs text-slate-900 dark:text-white outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Organization / Facility Name</label>
              <div className="border border-slate-200 dark:border-carbon-700 rounded-xl px-3 py-2 flex items-center gap-2 bg-white dark:bg-carbon-800">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enterprise name" 
                  className="w-full text-xs text-slate-900 dark:text-white outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Profile Picture / Avatar URL</label>
              <div className="border border-slate-200 dark:border-carbon-700 rounded-xl px-3 py-2 flex items-center gap-2 bg-white dark:bg-carbon-800">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg" 
                  className="w-full text-xs text-slate-900 dark:text-white outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm" className="bg-[#0e6245] hover:bg-[#0b5038] text-white">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Role Switcher Mode */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Switch Active Workspace Mode</h3>
            <p className="text-xs text-slate-400">Toggle between ecosystem participant modes on the fly</p>
          </div>
          <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div 
            onClick={() => selectRole(USER_ROLES.SUPPLIER)}
            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
              role === USER_ROLES.SUPPLIER 
                ? 'border-[#0e6245] bg-emerald-50/50 dark:bg-emerald-950/20' 
                : 'border-slate-200 dark:border-carbon-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Factory className="w-4 h-4 text-[#0e6245]" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Supplier Mode</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Capture facility telemetry & credit issuance</p>
          </div>

          <div 
            onClick={() => selectRole(USER_ROLES.BUYER)}
            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
              role === USER_ROLES.BUYER 
                ? 'border-cyan-600 bg-cyan-50/50 dark:bg-cyan-950/20' 
                : 'border-slate-200 dark:border-carbon-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Buyer Mode</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Offtake contracts & scope insetting desk</p>
          </div>

          <div 
            onClick={() => selectRole(USER_ROLES.ADMIN)}
            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
              role === USER_ROLES.ADMIN 
                ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20' 
                : 'border-slate-200 dark:border-carbon-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Auditor / Admin</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">MRV telemetry audit & clearance hub</p>
          </div>
        </div>
      </Card>

      {/* Telemetry API Keys */}
      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Telemetry & IoT Ingestion API Key</h3>
        <p className="text-xs text-slate-400">
          Use this cryptographic token in your chimney sensor gateway or DAC IoT controller to stream live telemetry to CarbonSphere.
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 border border-slate-200 dark:border-carbon-700 rounded-xl px-3 py-2 bg-slate-50 dark:bg-carbon-800 flex items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <Key className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{apiKey}</span>
          </div>
          <Button type="button" onClick={handleRotateKey} variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rotate Key</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
