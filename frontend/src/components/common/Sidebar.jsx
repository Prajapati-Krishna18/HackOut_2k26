import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Cpu, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  ReceiptText, 
  Bell, 
  Settings, 
  BarChart3,
  LogOut,
  Leaf
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';
import { cn } from '@/utils/cn';

export const Sidebar = () => {
  const { role, logout, user } = useAuth();

  const isSupplier = role === USER_ROLES.SUPPLIER;
  const isBuyer = role === USER_ROLES.BUYER;
  const isAdmin = role === USER_ROLES.ADMIN;

  const navLinks = [
    {
      label: 'Overview',
      to: isSupplier ? '/supplier/dashboard' : isBuyer ? '/buyer/dashboard' : '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Carbon Marketplace',
      to: '/marketplace',
      icon: Store,
    },
    {
      label: 'Smart Matching AI',
      to: '/matching-engine',
      icon: Cpu,
    },
    {
      label: 'Opportunity Engine',
      to: '/opportunity-engine',
      icon: Sparkles,
    },
    {
      label: 'Digital Twin Flow',
      to: '/digital-twin',
      icon: Activity,
    },
    {
      label: 'Sustainability ESG',
      to: '/sustainability',
      icon: BarChart3,
    },
    {
      label: 'Trust & Verification',
      to: '/trust-verification',
      icon: ShieldCheck,
    },
    {
      label: 'Transactions & Escrow',
      to: '/transactions',
      icon: ReceiptText,
    },
    {
      label: 'Notifications',
      to: '/notifications',
      icon: Bell,
    },
    {
      label: 'Settings',
      to: '/settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-carbon-900 border-r border-slate-200 dark:border-carbon-800 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 dark:border-carbon-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-eco-forest to-eco-emerald flex items-center justify-center shadow-glow-emerald text-white">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">CarbonSphere</h1>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-eco-emerald">Circular Carbon AI</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-carbon-400">
          {role} Workspace
        </div>
        {navLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-eco-emerald/10 text-eco-emerald dark:text-eco-mint font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-carbon-800 hover:text-slate-900 dark:hover:text-white'
                )
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile & Logout footer */}
      <div className="p-4 border-t border-slate-200 dark:border-carbon-800 flex items-center justify-between">
        <NavLink to="/settings" className="flex items-center gap-3 truncate hover:opacity-80 transition-opacity">
          {user?.avatar_url ? (
            <img 
              src={user.avatar_url} 
              alt={user.name || 'User'} 
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/50 shrink-0" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10b981] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {(user?.name || user?.full_name || 'C')[0].toUpperCase()}
            </div>
          )}
          <div className="truncate">
            <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
              {user?.name || user?.full_name || 'Member'}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase truncate">
              {role || user?.role || 'Supplier'}
            </p>
          </div>
        </NavLink>
        <button
          onClick={logout}
          title="Logout"
          className="p-2 text-slate-400 hover:text-rose-500 rounded-lg transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
