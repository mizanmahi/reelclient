import { getAllVideos } from '@/apis/video';
import Container from '@/components/Shared/Container';
import UploadVideo from '@/components/ui/video/UploadVideo';
import { IVideo } from '@/types/video';
import { useQuery } from '@tanstack/react-query';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { NavLink } from 'react-router';

const Home = () => {
   const page = 1;
   const limit = 10;

   const { data: videos, isLoading } = useQuery({
      queryKey: ['videos', 'video', page, limit],
      queryFn: () => getAllVideos(page, limit),
   });

   const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <Container>
         <div className='text-2xl font-bold mb-4'>Home</div>

         <UploadVideo />

         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {videos?.data?.map((video: IVideo, i: number) => (
               <NavLink to={`/reels/${video?.id}`} key={i}>
                  <div
                     className='bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative'
                     onMouseEnter={() => setHoveredVideo(video.id)}
                     onMouseLeave={() => setHoveredVideo(null)}
                  >
                     {/* Video Player */}
                     <div className='w-full h-48 overflow-hidden'>
                        <ReactPlayer
                           url={video.videoUrl}
                           width='100%'
                           height='100%'
                           controls={false} // Hide controls for a cleaner look
                           playing={hoveredVideo === video.id} // Play on hover
                           light={
                              hoveredVideo !== video.id
                                 ? video.thumbnail
                                 : false
                           } // Show thumbnail when not playing
                           loop={true} // Loop the video
                           muted={true} // Mute the video for autoplay
                        />
                     </div>

                     {/* Video Views Count */}
                     <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
                        {video.viewCount} views
                     </div>

                     {/* Video Details */}
                     <div className='p-4'>
                        <h3 className='text-lg font-semibold text-white'>
                           {video.title}
                        </h3>
                        <p className='text-sm text-gray-400'>
                           {video.description}
                        </p>
                     </div>
                  </div>
               </NavLink>
            ))}
         </div>
      </Container>
   );
};

export default Home;
