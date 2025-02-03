import { getAllVideos } from '@/apis/video';
import Container from '@/components/Shared/Container';
import UploadVideo from '@/components/ui/video/UploadVideo';
import { IVideo } from '@/types/video';
import { useQuery } from '@tanstack/react-query';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; // shadcn Avatar
import { Skeleton } from '@/components/ui/skeleton'; // shadcn Skeleton for loading state
import { useUser } from '@/hooks/useUser';

const Home = () => {
   const { user } = useUser();

   const [page, setPage] = useState(1);
   const limit = 5;
   const [videos, setVideos] = useState<IVideo[]>([]);
   const [hasMore, setHasMore] = useState(true);
   const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null); // Track hovered video

   const { data, isLoading, isSuccess, isFetching, refetch } = useQuery({
      queryKey: ['videos', page, limit],
      queryFn: () => getAllVideos(page, limit),
      enabled: !!page && hasMore, // Stop fetching when hasMore is false
   });

   useEffect(() => {
      if (isSuccess && data) {
         const newVideos = data?.data?.data || [];

         if (newVideos.length < limit) {
            setHasMore(false); // No more videos to fetch
         }

         // remove duplicate videos based on their IDs
         setVideos((prevVideos) => {
            const existingIds = new Set(prevVideos.map((v) => v.id));
            const uniqueNewVideos = newVideos.filter(
               (video: IVideo) => !existingIds.has(video.id)
            );
            return [...prevVideos, ...uniqueNewVideos];
         });
      }
   }, [isSuccess, data]);

   const fetchMoreVideos = () => {
      if (!isFetching && hasMore) {
         setPage((prev) => prev + 1);
      }
   };

   const handleVideoUpload = () => {
      // Reset the videos array and page state
      setVideos([]);
      setPage(1);
      setHasMore(true);

      // Refetch the videos starting from the first page
      refetch();
   };

   if (isLoading && videos.length === 0) {
      return (
         <Container>
            <UploadVideo refetchVideos={handleVideoUpload} />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
               {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                     key={i}
                     className='aspect-[9/16] w-full rounded-lg'
                  />
               ))}
            </div>
         </Container>
      );
   }

   return (
      <Container>
         {user && <UploadVideo refetchVideos={handleVideoUpload} />}

         {/* Infinite Scroll Component */}
         {videos?.length > 0 ? (
            <InfiniteScroll
               dataLength={videos.length}
               next={fetchMoreVideos}
               hasMore={hasMore}
               loader={<h4>Loading more videos...</h4>}
               endMessage={
                  <p className='text-center text-gray-400 mt-5'>
                     You have reached the end
                  </p>
               }
            >
               {/* Reels Feed */}
               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {videos.map((video: IVideo, i: number) => (
                     <NavLink
                        to={
                           user?.id
                              ? `/reels/${video?.id}/${user?.id}`
                              : `/reels/${video?.id}`
                        }
                        key={i}
                     >
                        <div
                           className='relative aspect-[9/16] w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
                           onMouseEnter={() => setHoveredVideoId(video.id)} // Set hovered video ID
                           onMouseLeave={() => setHoveredVideoId(null)} // Clear hovered video ID
                        >
                           {/* Video Player */}
                           <ReactPlayer
                              url={video.videoUrl}
                              width='100%'
                              height='100%'
                              controls={false} // Hide controls for a cleaner look
                              playing={hoveredVideoId === video.id} // Play only if hovered
                              loop={true}
                              muted={true}
                              style={{ position: 'absolute', top: 0, left: 0 }}
                           />

                           {/* Dark Overlay for Text Visibility */}
                           <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none' />

                           {/* Avatar at the Top */}
                           <div className='absolute top-2 left-2 flex items-center space-x-2'>
                              <Avatar className='h-8 w-8 border-2 border-white'>
                                 <AvatarImage
                                    src={'n/a'}
                                    alt={video.uploader.name}
                                 />
                                 <AvatarFallback>
                                    {video.uploader.name[0]}
                                 </AvatarFallback>
                              </Avatar>
                              <span className='text-white text-sm font-semibold'>
                                 {video.uploader.name}
                              </span>
                           </div>

                           {/* Uploader Name at Bottom Left */}
                           <div className='absolute bottom-2 left-2 text-white text-sm font-semibold'>
                              {video.title}
                           </div>

                           {/* Views Count at Bottom Right */}
                           <div className='absolute bottom-2 right-2 text-white text-sm font-semibold'>
                              {video.viewCount} views
                           </div>
                        </div>
                     </NavLink>
                  ))}
               </div>
            </InfiniteScroll>
         ) : (
            <div className='text-center p-2 text-xl'>No Video Yet😊</div>
         )}
      </Container>
   );
};

export default Home;
