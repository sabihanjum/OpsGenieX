import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StatsCard from '../components/Dashboard/StatsCard';
import AlertsChart from '../components/Dashboard/AlertsChart';
import RecentAlerts from '../components/Dashboard/RecentAlerts';
import PatchStatus from '../components/Dashboard/PatchStatus';
import { fetchDashboardData } from '../services/api';

function Dashboard() {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading dashboard data</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'Active Alerts',
      value: dashboardData?.activeAlerts || 0,
      change: '+12%',
      changeType: 'increase',
      icon: '🚨',
    },
    {
      title: 'Patches Deployed',
      value: dashboardData?.patchesDeployed || 0,
      change: '+8%',
      changeType: 'increase',
      icon: '🔄',
    },
    {
      title: 'Automation Rate',
      value: `${dashboardData?.automationRate || 0}%`,
      change: '+5%',
      changeType: 'increase',
      icon: '🤖',
    },
    {
      title: 'MTTR',
      value: `${dashboardData?.mttr || 0}h`,
      change: '-15%',
      changeType: 'decrease',
      icon: '⏱️',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsChart data={dashboardData?.alertsChart} />
        <PatchStatus data={dashboardData?.patchStatus} />
      </div>

      {/* Recent Alerts */}
      <RecentAlerts alerts={dashboardData?.recentAlerts} />
    </div>
  );
}

export default Dashboard;