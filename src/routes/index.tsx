import { Route, Routes } from 'react-router';
import App from '../App';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
import Home from '@/pages/home/Home';
import VideoListFeed from '@/pages/VideoListFeed/VideoListFeed';
import UserProfile from '@/pages/userProfile/UserProfile';
import ProtectedRoute from '@/components/Shared/ProtectedRoute';
import { useUser } from '@/hooks/useUser';
import NotFound from '@/pages/notFound/NotFound';

const Routers = () => {
   const { user } = useUser();
   console.log({ user });

   return (
      <Routes>
         <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {user?.id ? (
               <Route
                  path='/reels/:videoId/:userId'
                  element={<VideoListFeed />}
               />
            ) : (
               <Route path='/reels/:videoId/' element={<VideoListFeed />} />
            )}

            <Route
               path='/profile'
               element={
                  <ProtectedRoute>
                     <UserProfile />
                  </ProtectedRoute>
               }
            />
         </Route>
         <Route path='*' element={<NotFound />} />
      </Routes>
   );
};

export default Routers;
