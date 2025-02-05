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
         className='bg-white shadow-md sticky top-0 z-50'
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
                        className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200'
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
                           <Avatar className='cursor-pointer border border-gray-300 shadow-md hover:shadow-lg transition-shadow'>
                              <AvatarImage
                                 src={'https://github.com/shadcn.png'}
                              />
                              <AvatarFallback>U</AvatarFallback>
                           </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-48 mt-2'>
                           <DropdownMenuLabel>My Account</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem asChild>
                              <NavLink to='/profile'>Profile</NavLink>
                           </DropdownMenuItem>
                           <DropdownMenuItem>Update Account</DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={logOut}
                              className='text-red-500 hover:bg-red-100'
                           >
                              Logout
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  ) : (
                     <Button
                        asChild
                        variant='default'
                        className='bg-black  text-white px-5 py-2 rounded-md text-sm font-medium shadow-md transition-all'
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
