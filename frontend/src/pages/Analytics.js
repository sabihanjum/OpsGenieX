import React, { useState } from 'react';
import { DocumentArrowDownIcon, ChartBarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [reportType, setReportType] = useState('summary');

  const alertTrendData = [
    { name: 'Mon', alerts: 12, resolved: 10 },
    { name: 'Tue', alerts: 19, resolved: 16 },
    { name: 'Wed', alerts: 8, resolved: 8 },
    { name: 'Thu', alerts: 15, resolved: 12 },
    { name: 'Fri', alerts: 22, resolved: 18 },
    { name: 'Sat', alerts: 6, resolved: 6 },
    { name: 'Sun', alerts: 9, resolved: 8 },
  ];

  const patchData = [
    { name: 'Critical', deployed: 45, pending: 5 },
    { name: 'Important', deployed: 32, pending: 8 },
    { name: 'Moderate', deployed: 28, pending: 12 },
    { name: 'Low', deployed: 15, pending: 3 },
  ];

  const systemHealthData = [
    { name: 'Healthy', value: 78, color: '#10B981' },
    { name: 'Warning', value: 15, color: '#F59E0B' },
    { name: 'Critical', value: 7, color: '#EF4444' },
  ];

  const handleGenerateReport = () => {
    const reportData = {
      type: reportType,
      timeRange: timeRange,
      generatedAt: new Date().toISOString(),
      data: {
        alerts: alertTrendData,
        patches: patchData,
        systemHealth: systemHealthData
      }
    };
    
    // Simulate report generation
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opsgenieX-report-${reportType}-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Report generated and downloaded successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Report</option>
            <option value="compliance">Compliance Report</option>
            <option value="performance">Performance Report</option>
          </select>
          <button 
            onClick={handleGenerateReport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">91</p>
              <p className="text-xs text-green-600">↓ 12% from last week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-xs text-green-600">↑ 5% from last week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg MTTR</p>
              <p className="text-2xl font-bold text-gray-900">2.3h</p>
              <p className="text-xs text-green-600">↓ 0.5h from last week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Automation Rate</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-xs text-green-600">↑ 3% from last week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alerts" stroke="#3B82F6" strokeWidth={2} name="New Alerts" />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Health Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={systemHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {systemHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {systemHealthData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patch Deployment Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Patch Deployment Status by Severity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={patchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="deployed" fill="#10B981" name="Deployed" />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-4 flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Automated patch deployment completed for 15 systems</span>
            <span className="text-xs text-gray-400">2 minutes ago</span>
          </div>
          <div className="p-4 flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New workflow "Database Backup" created and activated</span>
            <span className="text-xs text-gray-400">15 minutes ago</span>
          </div>
          <div className="p-4 flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">High CPU alert resolved automatically</span>
            <span className="text-xs text-gray-400">1 hour ago</span>
          </div>
          <div className="p-4 flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Critical security patch deployed to production servers</span>
            <span className="text-xs text-gray-400">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;