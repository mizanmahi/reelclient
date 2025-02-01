import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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

const navLinks = [
   { path: '/', label: 'Home' },
   { path: '/about', label: 'About' },
   { path: '/services', label: 'Services' },
   { path: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
   const loggedIn = true;

   return (
      <nav className='flex items-center justify-between p-4 bg-gray-50 shadow-sm'>
         <div className='flex items-center'>
            <NavLink to='/'>
               <Logo />
            </NavLink>
         </div>

         <div className='flex items-center space-x-6'>
            {navLinks.map((navLink) => (
               <NavLink
                  to={navLink.path}
                  className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
               >
                  {navLink.label}
               </NavLink>
            ))}

            {/* Login Button */}
            {loggedIn ? (
               <DropdownMenu>
                  <DropdownMenuTrigger>
                     <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>Profile</DropdownMenuItem>
                     <DropdownMenuItem>Update Account</DropdownMenuItem>
                     <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            ) : (
               <Button
                  asChild
                  variant='default'
                  className={cn(
                     ' text-white',
                     'px-4 py-2 rounded-md text-sm font-medium'
                  )}
               >
                  <NavLink to='/login'>Login</NavLink>
               </Button>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
