import userManager from '@/lib/authservice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const CallbackPage = () => {
   const navigate = useNavigate();

   useEffect(() => {
      console.log('CallbackPage useEffect triggered');
      userManager.signinRedirectCallback().then((user) => {
         console.log('Signin redirect callback success', user);
         navigate('/');
      });
   }, [navigate]);

   return <div>Signing in...</div>;
};

export default CallbackPage;
