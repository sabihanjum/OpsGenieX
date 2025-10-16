import React, { useState } from 'react';
import { PlusIcon, PlayIcon, PauseIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function Workflows() {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Auto-Patch Critical Updates",
      description: "Automatically deploy critical security patches during maintenance windows",
      status: "active",
      trigger: "Schedule",
      lastRun: "2024-01-15 02:00",
      nextRun: "2024-01-16 02:00",
      successRate: 95
    },
    {
      id: 2,
      name: "Alert Escalation",
      description: "Escalate unresolved critical alerts to management after 30 minutes",
      status: "active",
      trigger: "Alert Condition",
      lastRun: "2024-01-15 14:30",
      nextRun: "On Trigger",
      successRate: 100
    },
    {
      id: 3,
      name: "System Health Check",
      description: "Daily system health monitoring and reporting",
      status: "paused",
      trigger: "Schedule",
      lastRun: "2024-01-14 06:00",
      nextRun: "Paused",
      successRate: 88
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleToggleWorkflow = (workflowId) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === workflowId 
        ? { 
            ...workflow, 
            status: workflow.status === 'active' ? 'paused' : 'active',
            nextRun: workflow.status === 'active' ? 'Paused' : 'On Trigger'
          }
        : workflow
    ));
  };

  const handleCreateWorkflow = () => {
    setShowCreateForm(true);
  };

  const handleSubmitWorkflow = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newWorkflow = {
      id: workflows.length + 1,
      name: formData.get('name'),
      description: formData.get('description'),
      status: 'active',
      trigger: formData.get('trigger'),
      lastRun: 'Never',
      nextRun: 'On Trigger',
      successRate: 0
    };
    setWorkflows([newWorkflow, ...workflows]);
    setShowCreateForm(false);
    e.target.reset();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Workflow Automation</h1>
        <button 
          onClick={handleCreateWorkflow}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Workflow
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <PlayIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{workflows.filter(w => w.status === 'active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Cog6ToothIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PlayIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Workflow</h3>
          <form onSubmit={handleSubmitWorkflow} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter workflow description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Type</label>
              <select
                name="trigger"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Schedule">Schedule</option>
                <option value="Alert Condition">Alert Condition</option>
                <option value="Manual">Manual</option>
                <option value="API Call">API Call</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Workflow
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
          <h2 className="text-lg font-medium text-gray-900">Active Workflows ({workflows.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Cog6ToothIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
                    <p className="text-gray-600 mt-1">{workflow.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Trigger: {workflow.trigger}</span>
                      <span>•</span>
                      <span>Last Run: {workflow.lastRun}</span>
                      <span>•</span>
                      <span>Success Rate: {workflow.successRate}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                    {workflow.status}
                  </span>
                  <button 
                    onClick={() => handleToggleWorkflow(workflow.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      workflow.status === 'active' 
                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                    title={workflow.status === 'active' ? 'Pause Workflow' : 'Resume Workflow'}
                  >
                    {workflow.status === 'active' ? (
                      <PauseIcon className="w-5 h-5" />
                    ) : (
                      <PlayIcon className="w-5 h-5" />
                    )}
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors">
                    Edit
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

export default Workflows;