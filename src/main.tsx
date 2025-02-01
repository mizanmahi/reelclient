import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import Routers from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <Routers />
      </BrowserRouter>
   </StrictMode>
);
