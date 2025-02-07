import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';
import Logo from './Logo';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';
import { logout } from '@/apis/user';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const navLinks = [
   { path: '/', label: 'Home' },
   { path: '/services', label: 'Services' },
   { path: '/connect', label: 'Connect' },
];

const Menubar: React.FC = () => {
   const { user, setUser } = useUser();
   const loggedIn = user?.email;

   const logOut = () => {
      logout();
      setUser(null);
      toast.info('Logged out');
   };

   return (
      <motion.div
         className='bg-gray-900 shadow-lg sticky top-0 z-50'
         initial={{ opacity: 0, y: -100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
      >
         <div className='max-w-7xl mx-auto px-6'>
            <nav className='flex items-center justify-between py-4'>
               {/* Logo */}
               <NavLink to='/'>
                  <Logo />
               </NavLink>

               {/* Navigation Links */}
               <div className='hidden md:flex space-x-6'>
                  {navLinks.map((navLink) => (
                     <NavLink
                        key={navLink.path}
                        to={navLink.path}
                        className='text-sm font-medium text-gray-300 hover:text-gray-50 transition-colors duration-200'
                     >
                        {navLink.label}
                     </NavLink>
                  ))}
               </div>

               {/* User Dropdown or Login Button */}
               <div>
                  {loggedIn ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger>
                           <Avatar className='cursor-pointer border border-gray-700 shadow-md hover:shadow-lg transition-shadow'>
                              <AvatarImage
                                 src={'https://github.com/shadcn.png'}
                              />
                              <AvatarFallback>U</AvatarFallback>
                           </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-48 mt-2 bg-gray-800 border border-gray-700'>
                           <DropdownMenuLabel className='text-gray-400'>
                              My Account
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator className='bg-gray-700' />
                           <DropdownMenuItem asChild>
                              <NavLink
                                 to='/profile'
                                 className='text-gray-300 hover:bg-gray-700 hover:text-white'
                              >
                                 Profile
                              </NavLink>
                           </DropdownMenuItem>
                           <DropdownMenuItem className='text-gray-300 hover:bg-gray-700 hover:text-white'>
                              Update Account
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={logOut}
                              className='text-red-500 hover:bg-red-600'
                           >
                              Logout
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  ) : (
                     <Button
                        asChild
                        variant='default'
                        className='bg-gray-800 text-gray-300 px-5 py-2 rounded-md text-sm font-medium shadow-md hover:bg-gray-700 hover:text-white transition-all'
                     >
                        <NavLink to='/login'>Login</NavLink>
                     </Button>
                  )}
               </div>
            </nav>
         </div>
      </motion.div>
   );
};

export default Menubar;
