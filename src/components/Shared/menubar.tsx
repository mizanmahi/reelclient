import { useAuth } from '@/providers/authProvider';

function Menubar() {
   const { user, isLoading, login, logout } = useAuth();

   if (isLoading) return <div>Loading...</div>;

   return (
      <div>
         {user ? (
            <>
               <h1>Welcome {user.profile.name}</h1>
               <p>Email: {user.profile.email}</p>
               <button onClick={logout}>Logout</button>

               {/* Access tokens */}
               <div style={{ marginTop: '20px' }}>
                  <h3>Access Token:</h3>
                  <p style={{ wordBreak: 'break-all' }}>{user.access_token}</p>

                  <h3>ID Token:</h3>
                  <p style={{ wordBreak: 'break-all' }}>{user.id_token}</p>
               </div>
            </>
         ) : (
            <button onClick={login}>Login</button>
         )}
      </div>
   );
}

export default Menubar;
