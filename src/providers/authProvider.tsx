// src/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'oidc-client-ts';
import { userManager } from '@/config/authConfig';

interface AuthContextType {
   user: User | null;
   isLoading: boolean;
   login: () => Promise<void>;
   logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const loadUser = async () => {
         try {
            const user = await userManager.getUser();
            setUser(user);
         } catch (error) {
            console.error('Error loading user:', error);
         }
         setIsLoading(false);
      };

      loadUser();

      // Add event listeners
      userManager.events.addUserLoaded(handleUserLoaded);
      userManager.events.addUserUnloaded(handleUserUnloaded);

      return () => {
         userManager.events.removeUserLoaded(handleUserLoaded);
         userManager.events.removeUserUnloaded(handleUserUnloaded);
      };
   }, []);

   const handleUserLoaded = (user: User) => {
      setUser(user);
   };

   const handleUserUnloaded = () => {
      setUser(null);
   };

   const login = async () => {
      await userManager.signinRedirect();
   };

   const logout = async () => {
      await userManager.signoutRedirect();
   };

   return (
      <AuthContext.Provider value={{ user, isLoading, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
