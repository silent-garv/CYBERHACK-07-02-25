import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '../context/ThemeContext';
import { 
  Home,
  LayoutDashboard, 
  Shield, 
  Activity, 
  Search, 
  BarChart2, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Upload
} from 'lucide-react';

const Layout = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout({ 
      logoutParams: { 
        returnTo: window.location.origin + '/login'
      }
    });
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => `
    flex items-center px-4 py-2 rounded-lg
    ${theme.text} ${theme.hover}
    ${isActivePath(path) ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-blue-600') : ''}
    transition-all duration-200
  `;

  return (
    <div className={`flex h-screen ${theme.bg}`}>
      {/* Sidebar */}
      <div className={`w-64 ${theme.cardBg} shadow-lg transition-all duration-200 flex flex-col`}>
        <div className={`p-4 border-b ${theme.border}`}>
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${theme.text}`}>
              Dashboard
            </h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme.hover} transition-all duration-200 ${
                isDarkMode ? 'text-yellow-400' : 'text-gray-600'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          {user && (
            <div className="mt-4">
              <p className={`text-sm ${theme.text} opacity-80`}>{user.email}</p>
            </div>
          )}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/home" className={linkClass('/home')}>
            <Home className="w-5 h-5 mr-3 text-emerald-500" />
            Home
          </Link>
          <Link to="/dashboard" className={linkClass('/dashboard')}>
            <LayoutDashboard className="w-5 h-5 mr-3 text-purple-500" />
            Dashboard
          </Link>
          <Link to="/csam" className={linkClass('/csam')}>
            <Shield className="w-5 h-5 mr-3 text-amber-500" />
            CSAM Cases
          </Link>
          <Link to="/monitoring" className={linkClass('/monitoring')}>
            <Activity className="w-5 h-5 mr-3 text-rose-500" />
            Real-time Monitoring
          </Link>
          <Link to="/investigations" className={linkClass('/investigations')}>
            <Search className="w-5 h-5 mr-3 text-blue-500" />
            Investigations
          </Link>
          <Link to="/metrics" className={linkClass('/metrics')}>
            <BarChart2 className="w-5 h-5 mr-3 text-indigo-500" />
            Metrics
          </Link>
          <Link to="/upload" className={linkClass('/upload')}>
            <Upload className="w-5 h-5 mr-3 text-teal-500" />
            Upload Data
          </Link>
          <Link to="/settings" className={linkClass('/settings')}>
            <Settings className="w-5 h-5 mr-3 text-teal-500" />
            Settings
          </Link>
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${theme.text} ${theme.hover} transition-all duration-200`}
          >
            <LogOut className="w-5 h-5 mr-3 text-red-500" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${theme.bg} transition-all duration-200`}>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;