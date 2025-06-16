import { useState } from "react";
import { useStats } from "@/hooks/useStats";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import GaugeChart from "@/components/GaugeChart";
import TrendingSection from "@/components/TrendingSection";
import ProjectsTable from "@/components/ProjectsTable";
import FearGreedIndex from "@/components/FearGreedIndex";
import { Users, Gamepad2, Coins, DollarSign } from "lucide-react";

export default function Index() {
  const { 
    loading, 
    stats, 
    engagementData, 
    retention, 
    trending, 
    analytics, 
    refreshData 
  } = useStats();
  
  // Format large numbers for display
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onRefresh={refreshData} isLoading={loading} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatsCard 
                title="Total Users" 
                value={formatNumber(stats.totalUsers)} 
                change={stats.dailyChange} 
                icon={<Users size={20} className="text-chart-blue" />}
                colorClass="from-blue-500/20 to-blue-600/5"
                animationDelay="0ms"
              />
              
              <StatsCard 
                title="Daily Active Users" 
                value={formatNumber(stats.dailyActiveUsers)} 
                change={5.8} 
                icon={<Gamepad2 size={20} className="text-chart-green" />}
                colorClass="from-green-500/20 to-green-600/5"
                animationDelay="50ms"
              />
              
              <StatsCard 
                title="Coins Distributed" 
                value={formatNumber(stats.totalCoinsDistributed)} 
                change={15.2} 
                icon={<Coins size={20} className="text-chart-yellow" />}
                colorClass="from-yellow-500/20 to-yellow-600/5"
                animationDelay="100ms"
              />
              
              <StatsCard 
                title="Monthly Revenue" 
                value={formatCurrency(stats.monthlyRevenue)} 
                change={8.4} 
                icon={<DollarSign size={20} className="text-chart-purple" />}
                colorClass="from-purple-500/20 to-purple-600/5"
                animationDelay="150ms"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GaugeChart 
                value={engagementData.current} 
                dailyChange={engagementData.dailyChange} 
                weeklyChange={engagementData.weeklyChange} 
              />
              
              <FearGreedIndex 
                value={retention.value} 
                indicator={retention.indicator} 
                previousValue={retention.previousValue} 
                previousChange={retention.previousChange} 
              />
            </div>
            
            <TrendingSection tokens={trending} />
            
            <ProjectsTable projects={analytics} />
          </div>
        </main>
      </div>
    </div>
  );
}
