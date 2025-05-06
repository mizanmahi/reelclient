import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/providers/authProvider';

const ExamplePage = () => {
   const { user } = useAuth();

   const { data, isLoading, error } = useQuery({
      queryKey: ['protected-data'],
      queryFn: async () => {
         const response = await fetch('/api/protected', {
            headers: {
               Authorization: `Bearer ${user?.access_token}`,
            },
         });

         if (!response.ok) throw new Error('Request failed');
         return response.json();
      },
      enabled: !!user?.access_token, // Only run if token exists
   });

   if (!user) return <div>Please login</div>;
   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;

   return (
      <div>
         <h2>Protected Data</h2>
         <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
   );
};

export default ExamplePage;
