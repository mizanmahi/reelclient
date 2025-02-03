import { Button } from '@/components/ui/button'; // Shadcn Button
import { useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'; // Icons for added flair

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center p-6'>
         <div className='max-w-lg text-center space-y-8'>
            {/* Icon */}
            <div className='flex justify-center'>
               <div className='bg-gray-800 p-4 rounded-full'>
                  <AlertCircle className='w-16 h-16 text-gray-400' />
               </div>
            </div>

            {/* Message */}
            <h1 className='text-5xl font-extrabold tracking-tight'>
               404 - Page Not Found
            </h1>
            <p className='text-lg text-gray-400'>
               Oops! It seems like you've stumbled into the void. Let's help you
               find your way back to safety.
            </p>

            {/* Buttons */}
            <div className='flex justify-center gap-4'>
               <Button
                  onClick={() => navigate(-1)}
                  className='bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center gap-2'
               >
                  <ArrowLeft className='w-5 h-5' />
                  Go Back
               </Button>
               <Button
                  onClick={() => navigate('/')}
                  className='bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center gap-2'
               >
                  <Home className='w-5 h-5' />
                  Go Home
               </Button>
            </div>
         </div>
      </div>
   );
}
