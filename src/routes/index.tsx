import { Route, Routes } from 'react-router';
import App from '../App';

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<App />}></Route>
      </Routes>
   );
};

export default Routers;
