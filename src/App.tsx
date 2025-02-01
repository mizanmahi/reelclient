import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Shared/Menubar';

function App() {
   return (
      <>
         <Navbar />
         <div className='container mx-auto px-4'>
            <Outlet />
         </div>
      </>
   );
}

export default App;
