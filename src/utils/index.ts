import { clsx } from 'clsx';

export const getAccessToken = () => {
   const token = localStorage.getItem('accessToken');
   if (!token) {
      throw new Error('Unauthorized: No access token found.');
   }
   return token;
};

export function cn(...inputs: any[]) {
   return clsx(inputs);
}
