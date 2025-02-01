import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NavLink } from 'react-router';

// Define the login schema
const loginSchema = z.object({
   email: z.string().email({ message: 'Invalid email address.' }),
   password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
});

const Login: React.FC = () => {
   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   function onSubmit(values: z.infer<typeof loginSchema>) {
      // Handle form submission
      console.log(values);
   }

   return (
      <div className='flex h-[calc(100vh-4.5rem)]'>
         {/* Left Side Image */}
         <div
            className='hidden lg:flex flex-1 bg-cover bg-center'
            style={{
               backgroundImage:
                  'url(https://i.ibb.co/Qv08jKK7/william-bayreuther-Uql-Wfd-Di-EIM-unsplash.jpg)',
            }}
         ></div>

         {/* Form Section */}
         <div className='flex-1 flex items-center justify-center p-8 bg-white'>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='flex flex-col lg:space-y-6 space-y-4 w-full max-w-md'
               >
                  {/* Welcome Message */}
                  <div className='text-center mb-6'>
                     <h1 className='text-3xl font-bold text-gray-800'>
                        Welcome Back to ReelShare!
                     </h1>
                     <p className='mt-2 text-gray-600'>
                        Your favorite place for sharing and discovering reel
                        videos.
                     </p>
                  </div>

                  <FormField
                     control={form.control}
                     name='email'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 type='email'
                                 placeholder='Email'
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='password'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 type='password'
                                 placeholder='Password'
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              Your password must be at least 6 characters long.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Submit Button */}
                  <Button type='submit'>Login</Button>

                  {/* Join Now Prompt */}
                  <p className='text-sm text-center my-3'>
                     New to ReelShare?
                     <NavLink
                        to='/register'
                        className='text-primary ml-1 underline'
                     >
                        Join now
                     </NavLink>
                  </p>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default Login;
