import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const oauthCompleted = localStorage.getItem('oauth_completed');
      const oauthInProgress = localStorage.getItem('oauth_in_progress');
      
      // Check if we're on a protected route after OAuth redirect
      const isProtectedRoute = location.pathname !== '/' && location.pathname !== '/login';
      
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
  }, [navigate, location]);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('oauth_completed');
    localStorage.removeItem('oauth_in_progress');
    setIsAuthenticated(false);
    window.location.href = 'https://edgeadmin.oneorigin.us/oauth2/sign_out?rd=https://edgeadmin.oneorigin.us/';
  };

  return { isAuthenticated, isLoading, logout };
};
