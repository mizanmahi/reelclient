import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Routers from './routes/index.tsx';
import UserProvider from './providers/userProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <UserProvider>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <Toaster />
               <Routers />
            </BrowserRouter>
         </QueryClientProvider>
      </UserProvider>
   </StrictMode>
);
