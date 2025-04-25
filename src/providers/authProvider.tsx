// AuthProvider.tsx
import { AuthContext } from '@/context/auth';
import userManager from '@/lib/authservice';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<any>(null);

   useEffect(() => {
      userManager.getUser().then((user) => {
         if (user && !user.expired) setUser(user);
      });

      userManager.events.addUserLoaded(setUser);
      userManager.events.addUserUnloaded(() => setUser(null));
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            signin: () => userManager.signinRedirect(),
            signout: () => userManager.signoutRedirect(),
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
