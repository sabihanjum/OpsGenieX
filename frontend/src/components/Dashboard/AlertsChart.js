import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AlertsChart({ data }) {
  const defaultData = [
    { name: 'Mon', alerts: 12 },
    { name: 'Tue', alerts: 19 },
    { name: 'Wed', alerts: 8 },
    { name: 'Thu', alerts: 15 },
    { name: 'Fri', alerts: 22 },
    { name: 'Sat', alerts: 6 },
    { name: 'Sun', alerts: 9 },
  ];

  const chartData = data || defaultData;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="alerts" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AlertsChart;