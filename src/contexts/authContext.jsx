import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user?.sub && !roleLoading) {
        setRoleLoading(true);
        try {
          const response = await api.post('/api/auth/sync-user', {
            sub: user.sub,
            name: user.name
          });

          console.log('User synced:', response.data);
          
          if (response.data?.role) {
            setUserRole(response.data.role);
          }
        } catch (error) {
          console.error('Error syncing user:', error);
        } finally {
          setRoleLoading(false);
        }
      }
    };

    syncUser();
  }, [isAuthenticated, user?.sub]);

  const value = {
    userRole,
    roleLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
