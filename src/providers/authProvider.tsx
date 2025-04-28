import { AuthContext } from '@/context/auth';
import userManager from '@/lib/authservice';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<any>(null);

   useEffect(() => {
      userManager.getUser().then((user) => {
         if (user && !user.expired) {
            setUser(user);
         }
      });

      // 🔥 After successful silent renew
      userManager.events.addAccessTokenExpiring(() => {
         console.log('Access token is expiring soon, starting silent renew...');
      });

      userManager.events.addAccessTokenExpired(() => {
         console.warn('Access token expired!');
         userManager.signinSilent().then((user) => {
            console.log('Silent renew success! New user:', user);
            setUser(user);
         });
      });

      userManager.events.addUserLoaded((user) => {
         console.log('New user loaded after silent renew:', user);
      });

      userManager.events.addUserLoaded((user) => setUser(user));
      userManager.events.addUserUnloaded(() => setUser(null));

      return () => {
         userManager.events.removeUserLoaded((user) => setUser(user));
         userManager.events.removeUserUnloaded(() => setUser(null));
         userManager.events.removeAccessTokenExpiring(console.log);
         userManager.events.removeAccessTokenExpired(console.warn);
         userManager.events.removeUserLoaded(console.log);
      };
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
