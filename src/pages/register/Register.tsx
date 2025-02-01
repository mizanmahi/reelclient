import React from 'react';

const Register: React.FC = () => {
   return (
      <div className='flex h-[calc(100vh-4.5rem)]'>
         {/* Left Side Image */}
         <div
            className='flex-1 bg-cover bg-center'
            style={{
               backgroundImage:
                  'url(https://i.ibb.co.com/Qv08jKK7/william-bayreuther-Uql-Wfd-Di-EIM-unsplash.jpg)',
            }}
         ></div>

         {/* Right Side Form */}
         <div className='flex-1 flex items-center justify-center bg-white p-8'>
            <form className='w-full max-w-md space-y-6'>
               <h2 className='text-2xl font-bold text-gray-800'>Login</h2>

               {/* Input Fields */}
               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='name'
                  >
                     Name
                  </label>
                  <input
                     type='text'
                     id='name'
                     placeholder='Enter your name'
                     className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                     required
                  />
               </div>

               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='email'
                  >
                     Email
                  </label>
                  <input
                     type='email'
                     id='email'
                     placeholder='Enter your email'
                     className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                     required
                  />
               </div>

               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='password'
                  >
                     Password
                  </label>
                  <input
                     type='password'
                     id='password'
                     placeholder='Enter your password'
                     className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                     required
                  />
               </div>

               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='contact'
                  >
                     Contact Number
                  </label>
                  <input
                     type='tel'
                     id='contact'
                     placeholder='Enter your contact number'
                     className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                     required
                  />
               </div>

               {/* Register Button */}
               <button
                  type='submit'
                  className='w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200'
               >
                  Register
               </button>

               {/* Text for Existing Users */}
               <p className='text-sm text-gray-600'>
                  Already have an account?{' '}
                  <a href='/login' className='text-blue-600 hover:underline'>
                     Login here
                  </a>
               </p>
            </form>
         </div>
      </div>
   );
};

export default Register;
