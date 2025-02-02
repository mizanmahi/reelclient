import axios from 'axios';

export const getStatistics = async () => {
   const accessToken = localStorage.getItem('accessToken');

   if (!accessToken) {
      console.warn('Unauthorized: No access token found.');
      throw new Error('Unauthorized: No access token found.');
   }

   const url = `${import.meta.env.VITE_API_URL}/statistics`;

   try {
      const { data } = await axios.get(url, {
         headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
   } catch (error: any) {
      const errorMessage =
         error.response?.data?.message || 'Failed to fetch stats.';
      console.error(
         'Error fetching statistics:',
         error.response?.data || error.message
      );
      throw new Error(errorMessage);
   }
};
