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

// Define the registration schema
const registerSchema = z.object({
   name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .max(50, { message: 'Name must be at most 50 characters long.' }),

   email: z.string().email({ message: 'Invalid email address.' }),

   password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' })
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

   function onSubmit(values: z.infer<typeof registerSchema>) {
      // Handle form submission
      console.log(values);
   }

   return (
      <div className='flex h-[calc(100vh-4.5rem)]'>
         {/* Left Side Image */}
         <div
            className='flex-1 bg-cover bg-center'
            style={{
               backgroundImage:
                  'url(https://i.ibb.co/Qv08jKK7/william-bayreuther-Uql-Wfd-Di-EIM-unsplash.jpg)',
            }}
         ></div>

         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className='flex-1 flex flex-col justify-center p-8 space-y-8 bg-white'
            >
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
                           <Input type='email' placeholder='Email' {...field} />
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
               <Button type='submit'>Register</Button>
            </form>
         </Form>
      </div>
   );
};

export default Register;
