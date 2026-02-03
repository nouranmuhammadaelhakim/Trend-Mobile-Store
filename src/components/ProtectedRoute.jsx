import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isSignedIn, user, isLoaded } = useUser();

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
