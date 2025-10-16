import React from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

function RecentAlerts({ alerts }) {
  const defaultAlerts = [
    {
      id: 1,
      title: 'Database Connection Timeout',
      severity: 'high',
      status: 'open',
      timestamp: '2 minutes ago',
      source: 'Production DB'
    },
    {
      id: 2,
      title: 'High CPU Usage on Web Server',
      severity: 'medium',
      status: 'in_progress',
      timestamp: '15 minutes ago',
      source: 'Web-01'
    },
    {
      id: 3,
      title: 'SSL Certificate Expiring Soon',
      severity: 'low',
      status: 'resolved',
      timestamp: '1 hour ago',
      source: 'Load Balancer'
    },
    {
      id: 4,
      title: 'Disk Space Warning',
      severity: 'medium',
      status: 'open',
      timestamp: '2 hours ago',
      source: 'File Server'
    }
  ];

  const alertData = alerts || defaultAlerts;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {alertData.map((alert) => (
          <div key={alert.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(alert.status)}
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-500">{alert.source} • {alert.timestamp}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all alerts →
        </button>
      </div>
    </div>
  );
}

export default RecentAlerts;