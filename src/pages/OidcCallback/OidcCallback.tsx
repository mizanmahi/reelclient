import { userManager } from '@/config/authConfig';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Callback = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const handleCallback = async () => {
         try {
            await userManager.signinRedirectCallback();
            navigate('/');
         } catch (error) {
            console.error('Error handling callback:', error);
            navigate('/login');
         }
      };

      handleCallback();
   }, [navigate]);

   return <div>Loading...</div>;
};

export default Callback;
