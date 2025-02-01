import { Outlet } from 'react-router';
import './App.css';
import Menubar from './components/Shared/Menubar';

function App() {
   return (
      <>
         <Menubar />
         <Outlet />
      </>
   );
}

export default App;
