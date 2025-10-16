import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Patches from './pages/Patches';
import Workflows from './pages/Workflows';
import Analytics from './pages/Analytics';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('opsgenieX_token') !== null
  );

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  const AuthLayout = ({ children }) => {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    );
  };

  const MainLayout = ({ children }) => {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route 
            path="/signin" 
            element={
              <AuthLayout>
                <SignIn setIsAuthenticated={setIsAuthenticated} />
              </AuthLayout>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/alerts" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Alerts />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patches" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Patches />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/workflows" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Workflows />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Analytics />
                </MainLayout>
              </ProtectedRoute>
            } 
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;