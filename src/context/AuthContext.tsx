import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'admin' | 'user';

interface AuthUser {
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: Role) => void;
  logout: () => void;
  isAdmin: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('endeavour_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const login = (role: Role) => {
    const newUser = { role };
    setUser(newUser);
    localStorage.setItem('endeavour_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('endeavour_user');
  };

  if (!isLoaded) return null; // Or a loading spinner

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.role === 'admin',
        isUser: user?.role === 'user',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
