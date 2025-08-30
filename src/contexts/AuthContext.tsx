import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = localStorage.getItem('authToken');
      const oauthCompleted = localStorage.getItem('oauth_completed');
      const oauthInProgress = localStorage.getItem('oauth_in_progress');
      
      // Check if we're on a protected route after OAuth redirect
      const isProtectedRoute = window.location.pathname !== '/' && window.location.pathname !== '/login';
      
      if (oauthInProgress && isProtectedRoute) {
        // OAuth just completed successfully
        localStorage.removeItem('oauth_in_progress');
        localStorage.setItem('oauth_completed', 'true');
        localStorage.setItem('authToken', 'oauth-' + Date.now());
        setIsAuthenticated(true);
      } else if (oauthCompleted || authToken) {
        setIsAuthenticated(true);
      } else if (isProtectedRoute) {
        // On a protected route without auth - redirect to login
        navigate('/');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const login = () => {
    localStorage.setItem('oauth_in_progress', 'true');
    window.location.href = 'https://edgeadmin.oneorigin.us/oauth2/start?rd=/dashboard';
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('oauth_completed');
    localStorage.removeItem('oauth_in_progress');
    setIsAuthenticated(false);
    window.location.href = 'https://edgeadmin.oneorigin.us/oauth2/sign_out?rd=https://edgeadmin.oneorigin.us/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
