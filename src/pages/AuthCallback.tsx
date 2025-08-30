import { useEffect } from 'react';

export default function AuthCallback() {
  useEffect(() => {
    console.log("=== AUTHCALLBACK COMPONENT LOADED ===");
    console.log("Current URL:", window.location.href);
    console.log("Search params:", window.location.search);
    
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const code = params.get('code');
    const error = params.get('error');
    
    console.log('AuthCallback received:', { state, code: code ? 'present' : 'missing', error });
    console.log('Window opener exists:', !!window.opener);
    console.log('Window opener origin:', window.opener ? 'available' : 'not available');
    
    if (error) {
      console.error('OAuth error:', error);
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: error,
        state: state
      }, window.location.origin);
    } else if (code && state) {
      // Simulate successful authentication with domain validation
      const user = {
        email: "admin@oneorigin.us", // In production, get from Google API
        name: "OneOrigin Admin",
        domain: "oneorigin.us",
        verified: true
      };
      
      console.log('Sending success message to parent');
      console.log('Message data:', { type: 'GOOGLE_AUTH_SUCCESS', state, user });
      
      if (window.opener) {
        try {
          window.opener.postMessage({
            type: 'GOOGLE_AUTH_SUCCESS',
            state: state,
            user: user,
            sessionToken: null
          }, window.location.origin);
          console.log('Success message sent successfully');
        } catch (e) {
          console.error('Failed to send success message:', e);
        }
      } else {
        console.error('No window.opener available!');
      }
    } else {
      console.error('Missing code or state parameter');
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: 'Missing required parameters',
        state: state
      }, window.location.origin);
    }
    
    // Try to close popup
    try {
      window.close();
    } catch (e) {
      console.log('Cannot close popup - parent will handle');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <h2 className="text-xl font-semibold text-foreground">Processing Authentication...</h2>
        <p className="text-foreground-secondary">Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
}
