// UserProvider.tsx
import { ReactNode, useEffect, useState } from 'react';
import { getLoggedInUserInfo } from '@/apis/user';
import { IUser } from '@/types/user';
import { UserContext } from '@/context/user';

const UserProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<IUser | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   const fetchUser = () => {
      const userInfo = getLoggedInUserInfo() as IUser;

      setUser(userInfo);
      setIsLoading(false);
   };

   useEffect(() => {
      fetchUser();
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
         {children}
      </UserContext.Provider>
   );
};

export default UserProvider;
