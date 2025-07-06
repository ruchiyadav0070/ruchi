import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import OpsUserDashboard from './components/Dashboard/OpsUser';
import ClientUserDashboard from './components/Dashboard/ClientUser';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  // Handle the register link click
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#register') {
        setShowRegister(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showRegister) {
      return <RegisterForm onBack={() => setShowRegister(false)} />;
    }
    return <LoginForm />;
  }

  // Render appropriate dashboard based on user role
  if (user?.role === 'ops') {
    return <OpsUserDashboard />;
  } else {
    return <ClientUserDashboard />;
  }
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;