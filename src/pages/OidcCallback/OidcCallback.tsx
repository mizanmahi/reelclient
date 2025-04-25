// CallbackPage.tsx
import userManager from '@/lib/authservice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const CallbackPage = () => {
   const navigate = useNavigate();

   useEffect(() => {
      userManager.signinRedirectCallback().then(() => {
         navigate('/');
      });
   }, [navigate]);

   return <div>Signing in...</div>;
};

export default CallbackPage;
