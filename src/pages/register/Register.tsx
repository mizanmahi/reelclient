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
import { NavLink, useNavigate } from 'react-router';
import { register } from '@/apis/user';
import { toast } from 'sonner';
import Spinner from '@/components/Shared/Spinner';

// Define the registration schema
const registerSchema = z.object({
   name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .max(50, { message: 'Name must be at most 50 characters long.' }),

   email: z.string().email({ message: 'Invalid email address.' }),

   password: z
      .string()
      .min(8, {
         message: 'Password must be at least 8 characters long.',
      })
      .max(100, { message: 'Password must be at most 100 characters long.' }),

   contact: z
      .string()
      .min(11, { message: 'Contact number must be at least 11 digits.' })
      .max(15, { message: 'Contact number must be at most 15 digits.' })
      .regex(/^\d+$/, { message: 'Contact number must contain only digits.' }), // Ensures only numbers are allowed
});

const Register: React.FC = () => {
   const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         name: '',
         email: '',
         password: '',
         contact: '',
      },
   });

   const {
      formState: { isSubmitting },
   } = form;

   const navigate = useNavigate();

   async function onSubmit(values: z.infer<typeof registerSchema>) {
      // Handle form submission
      console.log(values);

      try {
         const res = await register(values);

         if (res.success) {
            toast.success(res.message);
            navigate('/login');
         } else {
            toast.error(res.message);
         }
      } catch (err: any) {
         console.error(err);
      }
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
                  <div className='text-center mb-6'>
                     <h1 className='text-3xl font-bold text-gray-800'>
                        Welcome to ReelShare!
                     </h1>
                     <p className='mt-2 text-gray-600'>
                        Please fill in the details below to create your account.
                     </p>
                  </div>
                  <FormField
                     control={form.control}
                     name='name'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>User Name</FormLabel>
                           <FormControl>
                              <Input placeholder='User Name' {...field} />
                           </FormControl>
                           <FormDescription>
                              This is your public display name.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

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
                              Your password must be at least 8 characters long
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='contact'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Contact Number</FormLabel>
                           <FormControl>
                              <Input
                                 type='tel'
                                 placeholder='Contact Number'
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              Enter your contact number (digits only).
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Submit Button */}
                  {/* <Button type='submit'>Register</Button> */}

                  <Button
                     type='submit'
                     className='mt-5 w-full flex items-center justify-center'
                  >
                     {isSubmitting ? (
                        <>
                           <Spinner /> {/* Show spinner */}
                           Registering...
                        </>
                     ) : (
                        'Register'
                     )}
                  </Button>

                  <p className='text-sm text-center my-3'>
                     Already have an account?
                     <NavLink
                        to='/login'
                        className='text-primary ml-1 underline'
                     >
                        Login
                     </NavLink>
                  </p>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default Register;
