const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Dashboard
  async fetchDashboardData() {
    return this.request('/dashboard/summary');
  }

  // Alerts
  async fetchAlerts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/alerts?${queryString}`);
  }

  async createAlert(alertData) {
    return this.request('/alerts', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  }

  async updateAlert(alertId, updateData) {
    return this.request(`/alerts/${alertId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async resolveAlert(alertId) {
    return this.request(`/alerts/${alertId}/resolve`, {
      method: 'POST',
    });
  }

  // Patches
  async fetchPatches(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/patches?${queryString}`);
  }

  async deployPatch(patchId) {
    return this.request(`/patches/${patchId}/deploy`, {
      method: 'POST',
    });
  }

  // Workflows
  async fetchWorkflows() {
    return this.request('/workflows');
  }

  async createWorkflow(workflowData) {
    return this.request('/workflows', {
      method: 'POST',
      body: JSON.stringify(workflowData),
    });
  }

  // Analytics
  async fetchAnalytics(timeRange = '7d') {
    return this.request(`/analytics?range=${timeRange}`);
  }
}

const apiClient = new ApiClient();

// Export individual functions for use with React Query
export const fetchDashboardData = () => apiClient.fetchDashboardData();
export const fetchAlerts = (params) => apiClient.fetchAlerts(params);
export const createAlert = (alertData) => apiClient.createAlert(alertData);
export const updateAlert = (alertId, updateData) => apiClient.updateAlert(alertId, updateData);
export const resolveAlert = (alertId) => apiClient.resolveAlert(alertId);
export const fetchPatches = (params) => apiClient.fetchPatches(params);
export const deployPatch = (patchId) => apiClient.deployPatch(patchId);
export const fetchWorkflows = () => apiClient.fetchWorkflows();
export const createWorkflow = (workflowData) => apiClient.createWorkflow(workflowData);
export const fetchAnalytics = (timeRange) => apiClient.fetchAnalytics(timeRange);

export default apiClient;