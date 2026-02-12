import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    let isSignedIn = false;
    let user = null;
    let isLoaded = true;

    try {
        const clerkUser = useUser();
        isSignedIn = clerkUser.isSignedIn;
        user = clerkUser.user;
        isLoaded = clerkUser.isLoaded;
    } catch {
        // Clerk not configured - show message
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                textAlign: 'center',
                padding: '2rem',
                background: '#f5f5f5'
            }}>
                <h1 style={{ color: '#333', marginBottom: '1rem' }}>Authentication Required</h1>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    This page requires authentication. Please configure Clerk to enable sign-in functionality.
                </p>
                <p style={{ 
                    background: '#fff3cd', 
                    padding: '1rem', 
                    borderRadius: '6px',
                    color: '#856404',
                    maxWidth: '500px'
                }}>
                    <strong>Setup Instructions:</strong><br/>
                    Add your Clerk publishable key to the .env.local file to enable authentication.
                </p>
                <a href="/" style={{ marginTop: '1.5rem', color: '#007bff', textDecoration: 'none' }}>
                    ← Go back to home
                </a>
            </div>
        );
    }

    // Wait for Clerk to load
    if (!isLoaded) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Check if user is signed in
    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    // Check if admin is required
    if (requireAdmin) {
        // Check if user has admin role
        // You can customize this based on how you store admin info in Clerk
        const isAdmin = user?.publicMetadata?.role === 'admin' || 
                       user?.emailAddresses?.[0]?.emailAddress?.includes('admin');
        
        if (!isAdmin) {
            return (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '100vh',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <h1>Access Denied</h1>
                    <p>You don't have permission to access this page.</p>
                    <a href="/" style={{ marginTop: '1rem', color: '#007bff' }}>
                        Go back to home
                    </a>
                </div>
            );
        }
    }

    return children;
};

export default ProtectedRoute;
