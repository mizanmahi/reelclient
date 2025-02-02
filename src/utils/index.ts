// Helper function to get the access token
export const getAccessToken = () => {
   const token = localStorage.getItem('accessToken');
   if (!token) {
      throw new Error('Unauthorized: No access token found.');
   }
   return token;
};
