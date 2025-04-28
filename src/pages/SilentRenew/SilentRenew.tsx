import userManager from '@/lib/authservice';
import { useEffect } from 'react';

const SilentRenewPage = () => {
   useEffect(() => {
      const renew = async () => {
         try {
            // Silent renew theke user update kora
            const user = await userManager.signinSilentCallback();
            console.log('Silent renew success', user);

            // Updated user pawa
            const updatedUser = await userManager.getUser();
            console.log('Updated user:', updatedUser);

            // Check if new tokens are available
            console.log('New access token:', updatedUser?.access_token);
         } catch (err) {
            console.error('Silent renew error:', err);
         }
      };

      renew();

      // Optional: make sure this continues to run after every interval
      const interval = setInterval(renew, 5 * 60 * 1000); // Every 5 minutes

      return () => clearInterval(interval);
   }, []);

   return <div>Loading...</div>;
};

export default SilentRenewPage;
