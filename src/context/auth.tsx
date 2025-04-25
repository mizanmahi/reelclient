import { createContext } from 'react';

type AuthContextType = {
   user: any;
   signin: () => Promise<void>;
   signout: () => Promise<void>;
} | null;

export const AuthContext = createContext<AuthContextType | null>(null);
