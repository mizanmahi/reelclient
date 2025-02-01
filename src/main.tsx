import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import Routers from './routes/index.tsx';
import { Toaster } from '@/components/ui/sonner';
import UserProvider from './providers/userProvider.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <UserProvider>
         <BrowserRouter>
            <Toaster />
            <Routers />
         </BrowserRouter>
      </UserProvider>
   </StrictMode>
);
