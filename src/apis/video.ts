import { getAccessToken } from '@/utils';
import axios from 'axios';

// Base API URL
const BASE_API_URL = import.meta.env.VITE_BASE_API;

// Helper function for making authenticated requests
const authenticatedRequest = async (
   method: 'get' | 'post',
   url: string,
   data?: any
) => {
   const accessToken = getAccessToken();

   try {
      const config = {
         method,
         url: `${BASE_API_URL}${url}`,
         headers: {
            Authorization: `Bearer ${accessToken}`,
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
   return await authenticatedRequest('get', '/video/upload', {
      params: { page, limit },
   });
};

// Get single video by ID
export const getVideoById = async (videoId: string) => {
   return await authenticatedRequest('get', `/video/upload/${videoId}`);
};

// Handle like/unlike
export const likeUnlike = async (videoId: string) => {
   return await authenticatedRequest('post', `/video/upload/${videoId}`);
};
