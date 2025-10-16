import React, { useState } from 'react';
import { PlayIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

function Patches() {
  const [patches, setPatches] = useState([
    {
      id: 1,
      title: "Windows Security Update KB5034441",
      description: "Critical security update for Windows 11",
      severity: "critical",
      status: "pending",
      size: "45.2 MB",
      systems: 12,
      releaseDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Microsoft Office Update",
      description: "Monthly security and feature update",
      severity: "important",
      status: "scheduled",
      size: "128.5 MB",
      systems: 8,
      releaseDate: "2024-01-14"
    },
    {
      id: 3,
      title: "Adobe Reader Security Patch",
      description: "Security vulnerability fix",
      severity: "moderate",
      status: "deployed",
      size: "23.1 MB",
      systems: 15,
      releaseDate: "2024-01-13"
    }
  ]);

  const handleDeployPatch = (patchId) => {
    setPatches(patches.map(patch => 
      patch.id === patchId 
        ? { ...patch, status: 'deploying' }
        : patch
    ));
    
    // Simulate deployment process
    setTimeout(() => {
      setPatches(prev => prev.map(patch => 
        patch.id === patchId 
          ? { ...patch, status: 'deployed' }
          : patch
      ));
    }, 3000);
  };

  const handleDeployAll = () => {
    const pendingPatches = patches.filter(p => p.status === 'pending');
    alert(`Deploying ${pendingPatches.length} patches to all systems. This may take several minutes.`);
    
    pendingPatches.forEach(patch => {
      handleDeployPatch(patch.id);
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'deploying':
        return <ClockIcon className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'scheduled':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'important': return 'bg-orange-100 text-orange-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = patches.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patch Management</h1>
        <button 
          onClick={handleDeployAll}
          disabled={pendingCount === 0}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            pendingCount > 0 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <PlayIcon className="w-5 h-5 mr-2" />
          Deploy All Patches ({pendingCount})
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{patches.filter(p => p.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Deployed</p>
              <p className="text-2xl font-bold text-gray-900">{patches.filter(p => p.status === 'deployed').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{patches.filter(p => p.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <PlayIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Systems</p>
              <p className="text-2xl font-bold text-gray-900">35</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Available Patches ({patches.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {patches.map((patch) => (
            <div key={patch.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  {getStatusIcon(patch.status)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{patch.title}</h3>
                    <p className="text-gray-600 mt-1">{patch.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Size: {patch.size}</span>
                      <span>•</span>
                      <span>Systems: {patch.systems}</span>
                      <span>•</span>
                      <span>Released: {patch.releaseDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(patch.severity)}`}>
                    {patch.severity}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    patch.status === 'deployed' ? 'bg-green-100 text-green-800' :
                    patch.status === 'deploying' ? 'bg-blue-100 text-blue-800' :
                    patch.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {patch.status}
                  </span>
                  {patch.status === 'pending' && (
                    <button 
                      onClick={() => handleDeployPatch(patch.id)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors"
                    >
                      Deploy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Patches;