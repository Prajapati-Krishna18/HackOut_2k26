import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  LayoutDashboard, 
  ListTree, 
  Boxes, 
  ShoppingCart, 
  Receipt, 
  BarChart3, 
  Bell, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  ChevronDown, 
  MoreVertical, 
  Plus, 
  Zap,
  FileText, 
  MessageSquare, 
  Trees, 
  Info, 
  Globe, 
  Quote,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useSocket } from '@/context/SocketContext';
import { Badge } from '@/components/ui/Badge';

// Photographic background & vector graphics
import heroBannerBg from '@/assets/supplier-dashboard-hero.jpg';
import promoIllustration from '@/assets/turn-emissions-promo.jpg';

// Capture & Sales Recharts Data
const salesData = [
  { month: 'Mar', captured: 220, sold: 140 },
  { month: 'Apr', captured: 320, sold: 200 },
  { month: 'May', captured: 390, sold: 270 },
  { month: 'Jun', captured: 480, sold: 330 },
  { month: 'Jul', captured: 550, sold: 370 },
  { month: 'Aug', captured: 670, sold: 460 },
];

// Inventory Pie Data
const inventoryData = [
  { name: 'Available', value: 1050, color: '#10b981', percent: '52%' },
  { name: 'Reserved', value: 600, color: '#60a5fa', percent: '24%' },
  { name: 'In Transit', value: 300, color: '#93c5fd', percent: '15%' },
  { name: 'Sold', value: 500, color: '#1e293b', percent: '9%' },
];

export const SupplierDashboardPage = () => {
  const { isConnected, telemetry, simulateSpike } = useSocket();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const [metricsPeriod, setMetricsPeriod] = useState('Aug 2025');
  const navigate = useNavigate();

  // Mini Sparkline Generator
  const Sparkline = ({ strokeColor, points }) => (
    <svg className="w-16 h-7 overflow-visible" viewBox="0 0 70 30" fill="none">
      <path 
        d={points} 
        stroke={strokeColor} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 font-sans selection:bg-[#0e9f6e] selection:text-white flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION BAR                                                     */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 px-4 sm:px-8 lg:px-12 py-3">
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
            
            {/* Dashboard Tab */}
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-[#0e6245] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* My Listings */}
            <button 
              onClick={() => setActiveTab('listings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'listings' 
                  ? 'bg-[#0e6245] text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>My Listings</span>
            </button>

            {/* Inventory */}
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'inventory' 
                  ? 'bg-[#0e6245] text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Inventory</span>
            </button>

            {/* Orders */}
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'orders' 
                  ? 'bg-[#0e6245] text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Orders</span>
            </button>

            {/* Transactions */}
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'transactions' 
                  ? 'bg-[#0e6245] text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Transactions</span>
            </button>

            {/* Reports */}
            <button 
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'reports' 
                  ? 'bg-[#0e6245] text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Reports</span>
            </button>

          </nav>

          {/* Right Action Profile & Notifications */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Notification Bell with Badge */}
            <div className="relative cursor-pointer p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                2
              </span>
            </div>

            {/* User Profile Header */}
            <Link to="/supplier/profile" className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-[#072b1e] text-emerald-300 font-bold text-xs flex items-center justify-center shadow-xs">
                KP
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0e9f6e] transition-colors leading-tight">Krishna Prajapati</span>
                <span className="text-[10px] text-slate-500 leading-tight">Supplier</span>
              </div>
            </Link>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN DASHBOARD CONTENT AREA                                            */}
      {/* ========================================================================= */}
      <main className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 space-y-6 flex-1">

              {/* ======================================================================= */}
              {/* HERO GREETING BANNER WITH FACTORY & HILLS AMBIENCE                      */}
              {/* ======================================================================= */}
              <div
                className="w-full rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden bg-cover bg-right p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 min-h-[165px]"
                style={{ backgroundImage: `url(${heroBannerBg})` }}
              >
                {/* Subtle daylight gradient fade on the left for crisp text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:w-[60%] pointer-events-none z-0" />

                {/* Left Greeting Content */}
                <div className="relative z-10 space-y-2 max-w-xl">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                    <span>Good Morning, <span className="text-[#0e9f6e]">Krishna!</span></span>
                    <span>🌿</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Every ton you capture today builds a cleaner, greener tomorrow.
                  </p>

                  {/* Translucent Quote Pill */}
                  <div className="pt-2">
                    <div className="bg-white/85 backdrop-blur-md border border-white/70 rounded-xl px-3.5 py-2 shadow-xs flex items-center gap-2 max-w-md">
                      <Quote className="w-3.5 h-3.5 text-slate-700 fill-slate-700 shrink-0 opacity-70" />
                      <p className="text-[11px] font-serif italic text-slate-800 leading-snug">
                        "Small actions in industry create big changes for our planet."
                      </p>
                    </div>
                  </div>
                </div>
                <Badge variant="emerald" className="animate-pulse">Live Socket Synced</Badge>

                {/* Floating Cursive Script over the mountain landscape */}
                <div className="absolute left-[54%] top-6 hidden xl:block pointer-events-none transform -rotate-6 z-10">
                  <span className="font-serif italic text-slate-800 text-xs font-bold block leading-tight drop-shadow-sm">
                    From<br />Emissions<br />to<br />Opportunities
                  </span>
                  <div className="w-10 h-0.5 bg-[#0e9f6e] rounded-full mt-0.5" />
                </div>

                {/* Right Action CTA Glass Card */}
                <div className="relative z-10 shrink-0">
                  <div
                    onClick={() => navigate('/sustainability')}
                    className="bg-white/90 hover:bg-white backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-sm flex items-center gap-3 cursor-pointer group transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0e6245] to-[#10b981] flex items-center justify-center text-white shadow-xs">
                      <Leaf className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Cleaner Industries</h4>
                      <p className="text-[11px] text-slate-600 font-medium">Brighter Tomorrows</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:translate-x-1 transition-transform ml-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>


              {/* ======================================================================= */}
              {/* 3. SECTION: KEY METRICS (4 CARDS WITH SPARKLINE WAVES)                  */}
              {/* ======================================================================= */}
              <section className="space-y-3">

                {/* Section Header with Date Filter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">Key Metrics</h3>
                      <p className="text-[11px] text-slate-500">A quick snapshot of your impact and business performance.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <button className="border border-slate-200 bg-white hover:bg-slate-50 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-colors">
                      <span>{metricsPeriod}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* 4 Metrics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Metric 1: Total CO2 Captured */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-xl bg-[#e8f5ed] text-[#0e9f6e] flex items-center justify-center mb-2">
                        <Leaf className="w-4 h-4 fill-current" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Total CO₂ Captured</span>
                      <div className="text-xl font-black text-slate-900 tracking-tight">2,450 tons</div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <span>↑ 12%</span>
                        <span className="text-slate-400 font-normal">vs last month</span>
                      </div>
                    </div>
                    <Sparkline strokeColor="#10b981" points="M 2 25 Q 18 20, 35 12 T 68 8" />
                  </div>

                  {/* Metric 2: Active Listings */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-xl bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center mb-2">
                        <Boxes className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Active Listings</span>
                      <div className="text-xl font-black text-slate-900 tracking-tight">6</div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                        <span>↑ 2 new</span>
                        <span className="text-slate-400 font-normal">this month</span>
                      </div>
                    </div>
                    <Sparkline strokeColor="#3b82f6" points="M 2 22 Q 22 28, 40 16 T 68 6" />
                  </div>

                  {/* Metric 3: Total Sales */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center mb-2">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Total Sales</span>
                      <div className="text-xl font-black text-slate-900 tracking-tight">1,280 tons</div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <span>↑ 18%</span>
                        <span className="text-slate-400 font-normal">vs last month</span>
                      </div>
                    </div>
                    <Sparkline strokeColor="#059669" points="M 2 26 Q 25 18, 45 22 T 68 8" />
                  </div>

                  {/* Metric 4: Verified Buyers */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-xl bg-[#f5f3ff] text-[#8b5cf6] flex items-center justify-center mb-2">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Verified Buyers</span>
                      <div className="text-xl font-black text-slate-900 tracking-tight">12</div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-purple-600">
                        <span>↑ 3 new</span>
                        <span className="text-slate-400 font-normal">this month</span>
                      </div>
                    </div>
                    <Sparkline strokeColor="#8b5cf6" points="M 2 24 Q 22 14, 45 24 T 68 6" />
                  </div>

                </div>
              </section>


              {/* ======================================================================= */}
              {/* 4. SECTION: CAPTURE & SALES OVERVIEW (CHART + IMPACT EQUIVALENCY)       */}
              {/* ======================================================================= */}
              <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">

                {/* Header & Legend */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">Capture & Sales Overview</h3>
                      <p className="text-[11px] text-slate-500">Track your carbon credits capture and sales performance over time.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Legend Dots */}
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0e6245]" />
                        <span className="text-slate-600 text-[11px]">CO₂ Captured (tons)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#93c5fd]" />
                        <span className="text-slate-600 text-[11px]">Sold (tons)</span>
                      </div>
                    </div>

                    {/* Timeframe Dropdown */}
                    <button className="border border-slate-200 bg-white hover:bg-slate-50 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-colors">
                      <span>{timeRange}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Chart Split Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                  {/* Double Bar Chart */}
                  <div className="lg:col-span-8 h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748b', fontSize: 11 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748b', fontSize: 11 }}
                          domain={[0, 800]}
                          ticks={[0, 200, 400, 600, 800]}
                        />
                        <Tooltip
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                        />
                        <Bar dataKey="captured" fill="#0e6245" radius={[4, 4, 0, 0]} barSize={24} />
                        <Bar dataKey="sold" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Right Impact Callout Card (2,450 tons = 3,200 trees) */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-[#eaf5ef] via-[#dff2e6] to-[#d2ecd9] rounded-2xl p-5 border border-[#c1e6cc] flex flex-col justify-between h-full space-y-4 relative overflow-hidden shadow-xs">

                    {/* Top Section */}
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-slate-900 tracking-tight">2,450</div>
                      <div className="text-xs font-semibold text-slate-700">tons of CO₂ captured this month!</div>
                    </div>

                    {/* Foliage decoration */}
                    <div className="absolute right-2 top-2 pointer-events-none opacity-40">
                      <Leaf className="w-20 h-20 text-[#0e6245] fill-[#0e6245]/20 -rotate-12" />
                    </div>

                    {/* Tree Equivalency Indicator Pill */}
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/80 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center shrink-0">
                          <Trees className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[11px] font-bold text-slate-800">
                          That's equivalent to <span className="text-[#0e6245]">planting 3,200 trees</span>
                        </div>
                      </div>
                      <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                    </div>

                  </div>

                </div>

              </section>


              {/* ======================================================================= */}
              {/* 5. SECTION: INVENTORY STATUS & PROMO CARD                              */}
              {/* ======================================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Inventory Donut Chart Card */}
                <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                      <Boxes className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">Inventory Status</h3>
                      <p className="text-[11px] text-slate-500">Current status of your carbon credits inventory.</p>
                    </div>
                  </div>

                  {/* Donut & Legend Split */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">

                    {/* Donut Chart with Center Text */}
                    <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={inventoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={76}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {inventoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                        <span className="text-base font-black text-slate-900 leading-tight">1,050</span>
                        <span className="text-[10px] font-bold text-slate-500">tons</span>
                        <span className="text-[8.5px] font-semibold text-[#0e6245]">Available</span>
                      </div>
                    </div>

                    {/* Legend List */}
                    <div className="space-y-2.5 w-full max-w-xs text-xs">
                      {inventoryData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-slate-600 text-[11px]">{item.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-900">
                            <span className="font-bold">{item.value.toLocaleString()} tons</span>{' '}
                            <span className="text-slate-500">({item.percent})</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

                {/* Turn Emissions into Opportunities Promo Card */}
                <div className="lg:col-span-6 bg-gradient-to-r from-[#eef8f2] via-[#e6f4eb] to-[#d8efe2] border border-[#d2ecd9] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6 justify-between relative overflow-hidden">

                  {/* 3D Eco Factory Graphic */}
                  <div className="w-40 sm:w-48 shrink-0 rounded-2xl overflow-hidden shadow-xs border border-white/60 bg-white/40">
                    <img
                      src={promoIllustration}
                      alt="Turn Emissions into Opportunities"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right Copy & Button */}
                  <div className="space-y-2.5 text-left relative z-10">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                      Turn Emissions<br />into Opportunities
                    </h3>
                    <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                      Manage your inventory, list credits, and connect with verified buyers.
                    </p>
                    <button
                      onClick={() => navigate('/marketplace')}
                      className="bg-[#0e6245] hover:bg-[#0b5038] text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2 text-xs shadow-xs hover:shadow-md transition-all group mt-2"
                    >
                      <span>Manage Inventory</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>


              {/* ======================================================================= */}
              {/* 6. SECTION: RECENT LISTINGS TABLE                                       */}
              {/* ======================================================================= */}
              <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">Recent Listings</h3>
                      <p className="text-[11px] text-slate-500">Your latest carbon credit listings.</p>
                    </div>
                  </div>

                  <Link to="/marketplace" className="text-xs font-bold text-[#0e6245] hover:underline flex items-center gap-1">
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                        <th className="pb-3 font-semibold">ID</th>
                        <th className="pb-3 font-semibold">CO₂ Type</th>
                        <th className="pb-3 font-semibold">Quantity</th>
                        <th className="pb-3 font-semibold">Price (per ton)</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Listed On</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">

                      {/* Row 1 */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-bold text-slate-900">#CL-001</td>
                        <td className="py-3 text-slate-700">Captured CO₂</td>
                        <td className="py-3 text-slate-700">500 tons</td>
                        <td className="py-3 font-medium text-slate-900">₹2,800</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Active
                          </span>
                        </td>
                        <td className="py-3 text-slate-500">10 Sep 2025</td>
                        <td className="py-3 text-right text-slate-400 cursor-pointer hover:text-slate-600">
                          <MoreVertical className="w-4 h-4 ml-auto" />
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-bold text-slate-900">#CL-002</td>
                        <td className="py-3 text-slate-700">Industrial CO₂</td>
                        <td className="py-3 text-slate-700">300 tons</td>
                        <td className="py-3 font-medium text-slate-900">₹2,500</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Active
                          </span>
                        </td>
                        <td className="py-3 text-slate-500">8 Sep 2025</td>
                        <td className="py-3 text-right text-slate-400 cursor-pointer hover:text-slate-600">
                          <MoreVertical className="w-4 h-4 ml-auto" />
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-bold text-slate-900">#CL-003</td>
                        <td className="py-3 text-slate-700">Bio-based CO₂</td>
                        <td className="py-3 text-slate-700">200 tons</td>
                        <td className="py-3 font-medium text-slate-900">₹2,700</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        </td>
                        <td className="py-3 text-slate-500">5 Sep 2025</td>
                        <td className="py-3 text-right text-slate-400 cursor-pointer hover:text-slate-600">
                          <MoreVertical className="w-4 h-4 ml-auto" />
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-bold text-slate-900">#CL-004</td>
                        <td className="py-3 text-slate-700">Captured CO₂</td>
                        <td className="py-3 text-slate-700">450 tons</td>
                        <td className="py-3 font-medium text-slate-900">₹2,900</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Active
                          </span>
                        </td>
                        <td className="py-3 text-slate-500">2 Sep 2025</td>
                        <td className="py-3 text-right text-slate-400 cursor-pointer hover:text-slate-600">
                          <MoreVertical className="w-4 h-4 ml-auto" />
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </section>


              {/* ======================================================================= */}
              {/* 7. SECTION: RECENT ACTIVITY & QUICK ACTIONS (SPLIT)                     */}
              {/* ======================================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left: Recent Activity Timeline */}
                <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">Recent Activity</h3>
                        <p className="text-[11px] text-slate-500">Stay updated with your latest activities.</p>
                      </div>
                    </div>

                    <button className="text-xs font-bold text-[#0e6245] hover:underline flex items-center gap-1">
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Timeline Items */}
                  <div className="space-y-4 pt-1 relative">
                    <div className="absolute left-3.5 top-3 bottom-3 w-[1.5px] bg-slate-100 -z-0" />

                    {/* Item 1 */}
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">New inquiry from GreenTech Ltd.</h4>
                          <span className="text-[10px] text-slate-400">2 hours ago</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Looking for 200 tons of Industrial CO₂.</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">500 tons sold to EcoFuel Corp.</h4>
                          <span className="text-[10px] text-slate-400">1 day ago</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Transaction completed successfully.</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">Listing #CL-003 is now active</h4>
                          <span className="text-[10px] text-slate-400">2 days ago</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Your listing is live on the marketplace.</p>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
                        <BarChart3 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">Your impact report was generated</h4>
                          <span className="text-[10px] text-slate-400">3 days ago</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Check your latest environmental impact.</p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Right: Quick Actions Grid */}
                <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#e8f5ed] text-[#0e6245] flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">Quick Actions</h3>
                      <p className="text-[11px] text-slate-500">Common tasks to grow your business.</p>
                    </div>
                  </div>

                  {/* 2x2 Quick Actions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">

                    {/* Action 1 */}
                    <div
                      onClick={() => navigate('/marketplace')}
                      className="bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#0e6245] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">List New Carbon Credits</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Create a new listing</p>
                      </div>
                    </div>

                    {/* Action 2 */}
                    <div
                      onClick={() => navigate('/marketplace')}
                      className="bg-blue-50/60 hover:bg-blue-50 border border-blue-100 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Boxes className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Manage Inventory</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Update storage details</p>
                      </div>
                    </div>

                    {/* Action 3 */}
                    <div
                      onClick={() => navigate('/matching-engine')}
                      className="bg-purple-50/60 hover:bg-purple-50 border border-purple-100 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">View Buyer Requests</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Check and respond to inquiries</p>
                      </div>
                    </div>

                    {/* Action 4 */}
                    <div
                      onClick={() => navigate('/sustainability')}
                      className="bg-amber-50/60 hover:bg-amber-50 border border-amber-100 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Generate Impact Report</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Showcase your environmental impact</p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </main>


            {/* ========================================================================= */}
            {/* 8. IMPACT STRIP (DARK FOREST GREEN)                                       */}
            {/* ========================================================================= */}
            <div className="bg-[#081e15] border-t border-emerald-950 text-white py-4 px-4 sm:px-8 lg:px-12 mt-8">
              <div className="max-w-[1536px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Left Title */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e6245] to-[#10b981] flex items-center justify-center text-white shrink-0">
                    <Leaf className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-tight">Together for a Net Zero Future</h4>
                    <p className="text-[10px] text-emerald-300/80">Cleaner Industries. Brighter Tomorrows.</p>
                  </div>
                </div>

                {/* Middle 3 Metrics */}
                <div className="flex items-center gap-6 sm:gap-10 text-xs">
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-[#10b981]" />
                    <div>
                      <span className="font-black text-sm">2.5M+</span>
                      <p className="text-[9px] text-emerald-200/70">Tons of CO₂ Reused</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#10b981]" />
                    <div>
                      <span className="font-black text-sm">500+</span>
                      <p className="text-[9px] text-emerald-200/70">Verified Partners</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#10b981]" />
                    <div>
                      <span className="font-black text-sm">120+</span>
                      <p className="text-[9px] text-emerald-200/70">Active Industries</p>
                    </div>
                  </div>
                </div>

                {/* Right White Button */}
                <button
                  onClick={() => navigate('/role-selection')}
                  className="bg-white hover:bg-emerald-50 text-slate-900 text-xs font-bold py-2 px-4 rounded-full flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>Make Change Real</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>


            {/* ========================================================================= */}
            {/* 9. FOOTER (WHITE / CLEAN MINIMAL)                                         */}
            {/* ========================================================================= */}
            <footer className="bg-white border-t border-slate-100 py-6 px-4 sm:px-8 lg:px-12 text-slate-500 text-xs">
              <div className="max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Brand & Links */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                    <Leaf className="w-4 h-4 text-[#0e9f6e] fill-current" />
                    <span>Carbon<span className="text-[#0e9f6e]">Sphere</span></span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500">
                    <a href="#" className="hover:text-slate-900 transition-colors">About</a>
                    <span>|</span>
                    <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
                    <span>|</span>
                    <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
                    <span>|</span>
                    <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                  </div>
                </div>

                {/* Socials & Tagline */}
                <div className="flex items-center gap-6">
                  {/* Social Icons */}
                  <div className="flex items-center gap-3 text-slate-400">
                    <a href="#" className="hover:text-slate-700 transition-colors" title="LinkedIn">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61Z" /></svg>
                    </a>
                    <a href="#" className="hover:text-slate-700 transition-colors" title="Twitter / X">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a href="#" className="hover:text-slate-700 transition-colors" title="YouTube">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    </a>
                  </div>

                  <span className="text-[11px] text-slate-400 font-serif italic">
                    People • Technology • Nature • A Better Tomorrow
                  </span>
                </div>

              </div>
            </footer>

          </div>
          );
};

          export default SupplierDashboardPage;
