import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Target, TrendingDown, ShoppingBag, Sparkles, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSocket } from '@/context/SocketContext';

export const BuyerDashboardPage = () => {
  const { isConnected, marketMetrics, latestMatch } = useSocket();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-white tracking-tight">Corporate Offtake & Insetting Desk</h1>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
              isConnected 
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400' 
                : 'bg-amber-950/80 border-amber-500/50 text-amber-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-cyan-400 animate-ping' : 'bg-amber-400'}`} />
              <span>{isConnected ? 'MARKET TICKER LIVE' : 'CONNECTING...'}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Scope 1, 2, and 3 Net-Zero Insetting Portfolio & Live Spot Exchange
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/marketplace">
            <Button size="sm" className="bg-[#0e6245] hover:bg-[#0b5038] text-white gap-2 text-xs">
              <ShoppingBag className="w-4 h-4" /> Browse Verified Credits
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Spot Index Price"
          value={marketMetrics ? `$${marketMetrics.spotPriceAvg.toFixed(2)}` : '$52.40'}
          unit="/tCO2e"
          change={marketMetrics ? `${marketMetrics.priceChange24h >= 0 ? '+' : ''}${marketMetrics.priceChange24h}%` : '+3.8%'}
          isPositive={marketMetrics ? marketMetrics.priceChange24h >= 0 : true}
          icon={Activity}
          subtitle="Real-time WebSocket price"
        />
        <MetricCard
          title="Available Spot Volume"
          value={marketMetrics ? `${marketMetrics.totalAvailableTons.toLocaleString()}` : '14,250'}
          unit="tCO2e"
          change="+14.2%"
          isPositive={true}
          icon={Target}
          subtitle="Ready for instant procurement"
        />
        <MetricCard
          title="24h Trading Volume"
          value={marketMetrics ? `$${(marketMetrics.activeTradingVolume24h / 1000).toFixed(0)}k` : '$382k'}
          unit="USD"
          change="+24.5%"
          isPositive={true}
          subtitle="Verified batch liquidations"
        />
        <MetricCard
          title="Audit Compliance"
          value="100%"
          unit="Verified"
          icon={ShieldCheck}
          subtitle="Zero double-count guarantee"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Forward Contracts & Offtake</h3>
            <Badge variant="cyan">3 Active Contracts</Badge>
          </div>
          <div className="space-y-3">
            {[
              { project: 'Nordic Biochar Pyrolysis Facility', tonnes: '1,200 tCO2e', status: 'Delivered', price: '$52.40/t' },
              { project: 'Iceland Direct Air Mineralization', tonnes: '850 tCO2e', status: 'Pending MRV', price: '$85.00/t' },
              { project: 'Indo-Gangetic Agroforestry Project', tonnes: '2,200 tCO2e', status: 'In Escrow', price: '$48.50/t' },
            ].map((contract, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-carbon-800/60 border border-slate-200 dark:border-carbon-700/50 text-xs">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{contract.project}</p>
                  <p className="text-slate-400">{contract.tonnes} • {contract.price}</p>
                </div>
                <Badge variant={contract.status === 'Delivered' ? 'emerald' : 'amber'}>
                  {contract.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Smart Match Stream</h3>
            <Badge variant="emerald" className="animate-pulse">Live Socket Matcher</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Real-time multi-variable compatibility engine scanning carbon purity, proximity, and credit permanence.
          </p>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-emerald-400">
                  {latestMatch ? `High Compatibility Match (${latestMatch.compatibilityScore}%)` : 'Live Match Stream Connected (98.4%)'}
                </p>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {latestMatch ? `${latestMatch.buyer} • ${latestMatch.requiredVolume} tCO2e required` : 'Apex Point-Source Facility • 1,500 tCO2e available'}
              </p>
            </div>
            <Link to="/matching-engine">
              <Button size="sm" variant="outline" className="text-xs border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/50">
                View Match
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboardPage;
