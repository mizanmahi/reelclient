import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';

// Base API URL
const BASE_API_URL = import.meta.env.VITE_API_URL;

// Helper function to handle API requests
const apiRequest = async (method: 'post', url: string, data?: FieldValues) => {
   try {
      const response = await axios({
         method,
         url: `${BASE_API_URL}${url}`,
         data,
         headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
   } catch (error: any) {
      throw new Error(error.response?.data?.message || 'An error occurred');
   }
};

// Register user
export const register = async (userData: FieldValues) => {
   const result = await apiRequest('post', '/auth/register', userData);
   return result;
};

// Login user
export const login = async (userData: FieldValues) => {
   const result = await apiRequest('post', '/auth/login', userData);

   if (result.success) {
      localStorage.setItem('accessToken', result.data.token);
   }

   return result;
};

export const getLoggedInUserInfo = () => {
   const accessToken = localStorage.getItem('accessToken');

   if (!accessToken) return null;

   try {
      return jwtDecode(accessToken);
   } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
   }
};

// Logout user
export const logout = () => {
   localStorage.removeItem('accessToken');
};

export const UserApis = {
   register,
   login,
   getLoggedInUserInfo,
   logout,
};
