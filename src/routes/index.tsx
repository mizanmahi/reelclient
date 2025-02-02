import { Route, Routes } from 'react-router';
import App from '../App';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
import Home from '@/pages/home/Home';
import VideoListFeed from '@/components/ui/video/VideoListFeed';
import UserProfile from '@/pages/userProfile/UserProfile';
import ProtectedRoute from '@/components/Shared/ProtectedRoute';

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reels/:videoId' element={<VideoListFeed />} />
            <Route
               path='/profile'
               element={
                  <ProtectedRoute>
                     <UserProfile />
                  </ProtectedRoute>
               }
            />
         </Route>
         <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
   );
};

export default Routers;
