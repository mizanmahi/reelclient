import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';
import Logo from './Logo';

const Navbar: React.FC = () => {
   return (
      <nav className='flex items-center justify-between p-4 bg-white shadow-sm'>
         <div className='flex items-center'>
            <NavLink to='/'>
               <Logo />
            </NavLink>
         </div>

         <div className='flex items-center space-x-6'>
            <NavLink
               to='/'
               className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
            >
               Home
            </NavLink>
            <NavLink
               to='/about'
               className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
            >
               About
            </NavLink>
            <NavLink
               to='/services'
               className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
            >
               Services
            </NavLink>
            <NavLink
               to='/contact'
               className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
            >
               Contact
            </NavLink>

            {/* Login Button */}
            <Button
               asChild
               variant='default'
               className={cn(
                  'bg-blue-600 hover:bg-blue-700 text-white',
                  'px-4 py-2 rounded-md text-sm font-medium'
               )}
            >
               <NavLink to='/login'>Login</NavLink>
            </Button>
         </div>
      </nav>
   );
};

export default Navbar;
