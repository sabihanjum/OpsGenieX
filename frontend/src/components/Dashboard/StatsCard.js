import React from 'react';

function StatsCard({ title, value, change, changeType, icon }) {
  const changeColor = changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  const changeBg = changeType === 'increase' ? 'bg-green-100' : 'bg-red-100';

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${changeBg} ${changeColor}`}>
            {change}
          </span>
          <span className="ml-2 text-sm text-gray-500">from last month</span>
        </div>
      )}
    </div>
  );
}

export default StatsCard;