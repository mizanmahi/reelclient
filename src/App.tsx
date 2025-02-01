import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Shared/Menubar';

function App() {
   return (
      <>
         <Navbar />
         <Outlet />
      </>
   );
}

export default App;
