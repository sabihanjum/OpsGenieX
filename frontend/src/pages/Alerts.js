import React, { useState } from 'react';
import { PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function Alerts() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Database Connection Timeout",
      description: "Connection to primary database is timing out",
      severity: "high",
      status: "open",
      source: "Database Monitor",
      timestamp: "2 minutes ago"
    },
    {
      id: 2,
      title: "High CPU Usage",
      description: "CPU usage above 90% for 5 minutes",
      severity: "medium",
      status: "in_progress",
      source: "System Monitor",
      timestamp: "15 minutes ago"
    }
  ]);

  const handleCreateAlert = () => {
    setShowCreateForm(true);
  };

  const handleSubmitAlert = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAlert = {
      id: alerts.length + 1,
      title: formData.get('title'),
      description: formData.get('description'),
      severity: formData.get('severity'),
      status: 'open',
      source: 'Manual',
      timestamp: 'Just now'
    };
    setAlerts([newAlert, ...alerts]);
    setShowCreateForm(false);
    e.target.reset();
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Alert Management</h1>
        <button 
          onClick={handleCreateAlert}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Alert
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Alert</h3>
          <form onSubmit={handleSubmitAlert} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter alert title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter alert description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select
                name="severity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Alert
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Active Alerts ({alerts.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                    <p className="text-gray-600 mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{alert.source}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200 transition-colors">
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;