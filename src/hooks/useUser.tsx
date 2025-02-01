import { UserContext } from '@/context/user';
import { useContext } from 'react';

export const useUser = () => {
   const context = useContext(UserContext);

   if (context === undefined) {
      throw new Error('User context not found!');
   }

   return context;
};
