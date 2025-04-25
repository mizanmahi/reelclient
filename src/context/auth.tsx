import { createContext } from 'react';

type AuthContextType = {
   user: any;
   signin: () => Promise<void>;
   signout: () => Promise<void>;
};

const defaultAuthContext: AuthContextType = {
   user: null,
   signin: async () => {},
   signout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
