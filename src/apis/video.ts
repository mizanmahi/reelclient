import { getAccessToken } from '@/utils';
import axios from 'axios';

// Base API URL
export const BASE_API_URL = import.meta.env.VITE_API_URL;

// Helper function for making authenticated requests
const authenticatedRequest = async (
   method: 'get' | 'post',
   url: string,
   data?: any,
   params?: Record<string, any>
) => {
   const accessToken = getAccessToken();

   let fullUrl = `${BASE_API_URL}${url}`;

   if (params) {
      const queryString = new URLSearchParams(params).toString();
      if (queryString) {
         fullUrl += `?${queryString}`;
      }
   }

   try {
      const config = {
         method,
         url: fullUrl,
         headers: accessToken
            ? {
                 Authorization: `Bearer ${accessToken}`,
                 'Content-Type': 'application/json',
              }
            : {
                 'Content-Type': 'application/json',
              },
         ...(method === 'post' && { data }), // Include data only for POST requests
      };

      const res = await axios(config);
      return res.data;
   } catch (error: any) {
      throw new Error(
         error.response?.data?.message || `Request failed: ${error.message}`
      );
   }
};

// Upload video
export const uploadVideo = async (data: FormData) => {
   try {
      const res = await axios.post(`${BASE_API_URL}/video/upload`, data, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });
      return res.data;
   } catch (error: any) {
      throw new Error(
         error.response?.data?.message ||
            `Failed to upload video: ${error.message}`
      );
   }
};

// Get all videos
export const getAllVideos = async (page: number = 1, limit: number = 10) => {
   try {
      // const accessToken = getAccessToken();
      const url = `${BASE_API_URL}/video?page=${page}&limit=${limit}`;

      const res = await axios.get(url, {
         headers: {
            // Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
         },
      });

      return res.data;
   } catch (error: any) {
      throw new Error(
         error.response?.data?.message ||
            `Failed to fetch videos: ${error.message}`
      );
   }
};

// Get single video by ID
export const getVideoById = async (videoId: string, userId?: string) => {
   let url = `${BASE_API_URL}/video/${videoId}`;
   if (userId) {
      url += `/${userId}`;
   }

   try {
      const res = await axios.get(url, {
         headers: { 'Content-Type': 'application/json' },
      });
      return res.data;
   } catch (error: any) {
      throw new Error(
         error.response?.data?.message || `Request failed: ${error.message}`
      );
   }
};

// Handle like/unlike
export const likeUnlike = async (videoId: string) => {
   return await authenticatedRequest('post', `/video/${videoId}`);
};
