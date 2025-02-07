import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className={`max-w-md w-full ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-lg p-8 transform transition-all duration-200`}>
        <div className="flex justify-center mb-8">
          <Shield className={`w-12 h-12 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        <h2 className={`text-center text-3xl font-extrabold mb-8 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Sign in to your account
        </h2>
        <button
          onClick={() => loginWithRedirect()}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isDarkMode 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;