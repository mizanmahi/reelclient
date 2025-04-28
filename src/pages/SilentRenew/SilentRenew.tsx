import { userManager } from '@/config/authConfig';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const SilentRenew = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const handleSilentRenew = async () => {
         try {
            console.log('Silent renew started');
            await userManager.signinSilentCallback();
         } catch (error) {
            console.error('Error during silent renew:', error);
            await userManager.removeUser(); // Clear invalid session
         } finally {
            navigate('/');
         }
      };

      handleSilentRenew();
   }, [navigate]);

   return <div>Renewing session...</div>;
};

export default SilentRenew;
