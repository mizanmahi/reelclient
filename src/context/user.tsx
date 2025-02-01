// UserContext.ts
import { createContext, Dispatch, SetStateAction } from 'react';
import { IUser } from '@/types/user';

interface IUserProviderValues {
   user: IUser | null;
   setUser: (user: IUser | null) => void;
   setIsLoading: Dispatch<SetStateAction<boolean>>;
   isLoading: boolean;
}

export const UserContext = createContext<IUserProviderValues | undefined>(
   undefined
);
