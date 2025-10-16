import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Alerts', href: '/alerts', icon: ExclamationTriangleIcon },
  { name: 'Patches', href: '/patches', icon: ArrowPathIcon },
  { name: 'Workflows', href: '/workflows', icon: Cog6ToothIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <h1 className="text-xl font-bold text-white">OpsGenieX</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AU</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@company.com</p>
            </div>
          </div>
          <Link
            to="/signin"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Sign Out"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;