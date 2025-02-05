import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function ComingSoon() {
   const [email, setEmail] = useState('');
   const handleNotify = () => {
      if (email) {
         alert(`You will be notified at ${email}!`);
         setEmail('');
      }
   };

   return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-center text-white max-w-lg mx-auto p-6'
         >
            <h1 className='text-5xl font-bold mb-4'>We're Launching Soon!</h1>
            <p className='text-lg mb-8'>
               Our amazing website is on its way. Stay tuned for something
               exciting!
            </p>
            <Card className='bg-white text-black shadow-lg rounded-2xl'>
               <CardContent className='p-6'>
                  <div className='flex items-center space-x-4 mb-4'>
                     <Mail className='text-gray-500' />
                     <Input
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='flex-1'
                     />
                  </div>
                  <Button
                     className='w-full bg-black text-white hover:bg-gray-800'
                     onClick={handleNotify}
                  >
                     Notify Me
                  </Button>
               </CardContent>
            </Card>
            <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.5 }}
            >
               <p className='text-sm text-gray-400 mt-6'>
                  We respect your privacy. No spam, ever.
               </p>
            </motion.div>
         </motion.div>
      </div>
   );
}
