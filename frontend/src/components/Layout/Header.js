import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function Header() {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    localStorage.removeItem('opsgenieX_token');
    localStorage.removeItem('opsgenieX_user');
    navigate('/signin');
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            IT Operations Dashboard
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>
          
          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Cog6ToothIcon className="w-6 h-6" />
          </button>
          
          {/* Sign Out */}
          <button 
            onClick={handleSignOut}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Sign Out"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
          </button>
          
          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">System Administrator</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AU</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;