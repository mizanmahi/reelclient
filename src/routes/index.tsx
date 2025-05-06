import { Route, Routes } from 'react-router';
import App from '../App';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
// import Home from '@/pages/home/Home';
// import VideoListFeed from '@/pages/VideoListFeed/VideoListFeed';
import UserProfile from '@/pages/userProfile/UserProfile';
import ProtectedRoute from '@/components/Shared/ProtectedRoute';
// import { useUser } from '@/hooks/useUser';
import NotFound from '@/pages/notFound/NotFound';
import ComingSoon from '@/pages/comingSoon/ComingSoon';
import CallbackPage from '@/pages/OidcCallback/OidcCallback';
import SilentRenewPage from '@/pages/SilentRenew/SilentRenew';
import { useAuth } from '@/providers/authProvider';
import Home from '@/pages/home/Home';
import ExamplePage from '@/pages/examplePage/ExamplePage';

const Routers = () => {
   const { user } = useAuth();
   console.log({ user });

   return (
      <Routes>
         <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='/example' element={<ExamplePage />} />
            <Route path='/callback' element={<CallbackPage />} />
            <Route path='/silent-renew' element={<SilentRenewPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/services' element={<ComingSoon />} />
            <Route path='/connect' element={<ComingSoon />} />
            {/* {user?.id ? (
               <Route
                  path='/reels/:videoId/:userId'
                  element={<VideoListFeed />}
               />
            ) : (
               <Route path='/reels/:videoId/' element={<VideoListFeed />} />
            )} */}

            <Route
               path='/profile'
               element={
                  <ProtectedRoute>
                     <UserProfile />
                  </ProtectedRoute>
               }
            />
            <Route path='/profile/:userId' element={<UserProfile />} />
         </Route>
         <Route path='*' element={<NotFound />} />
      </Routes>
   );
};

export default Routers;
