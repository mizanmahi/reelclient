import { useAuth } from '@/providers/useAuth';

function Menubar() {
   const { user, signin, signout } = useAuth();
   console.log('user', user?.access_token);

   return (
      <div>
         {user ? (
            <>
               <h2>Hello {user.profile.name}</h2>
               <button onClick={signout}>Logout</button>
            </>
         ) : (
            <button className='text-2xl text-white p-2' onClick={signin}>
               Login
            </button>
         )}
      </div>
   );
}

export default Menubar;
