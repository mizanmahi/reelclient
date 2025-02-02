// import { getVideoById } from '@/apis/video';
// import Spinner from '@/components/Shared/Spinner';
// import { useQuery } from '@tanstack/react-query';
// import ReactPlayer from 'react-player';
// import { useParams } from 'react-router';

// const VideoListFeed = () => {
//    const { videoId } = useParams();

//    const {
//       data: video,
//       isLoading,
//       isError,
//       error,
//    } = useQuery({
//       queryKey: ['video', videoId],
//       queryFn: () => getVideoById(videoId as string),
//       enabled: !!videoId,
//       staleTime: 0,
//       refetchOnWindowFocus: false,
//    });

//    return (
//       <div className='flex justify-center items-center h-screen bg-gray-900'>
//          <div className='w-full max-w-md p-4 rounded-lg shadow-lg'>
//             {isLoading ? (
//                <div className='flex justify-center items-center'>
//                   <Spinner />
//                </div>
//             ) : isError ? ( // Show error message
//                <div className='bg-red-500 text-white p-4 rounded-lg text-center'>
//                   Error: {error.message}
//                </div>
//             ) : video ? ( // Show video player if video data is available
//                <div className='relative aspect-[9/16] w-full overflow-hidden rounded-lg'>
//                   <ReactPlayer
//                      url={video.data?.videoUrl}
//                      width='100%'
//                      height='100%'
//                      controls={true} // Show video controls
//                      playing={true} // Autoplay the video
//                      light={video?.data?.thumbnailUrl} // Show thumbnail before playing
//                      loop={false} // Do not loop the video
//                      muted={false} // Unmute the video
//                      style={{ position: 'absolute', top: 0, left: 0 }}
//                   />
//                </div>
//             ) : (
//                <p className='text-white text-center'>No video found.</p>
//             )}
//          </div>
//       </div>
//    );
// };

// export default VideoListFeed;

import { getVideoById, likeUnlike } from '@/apis/video';
import Spinner from '@/components/Shared/Spinner';
import { useQuery, useMutation } from '@tanstack/react-query';
import ReactPlayer from 'react-player';
import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';

const VideoListFeed = () => {
   const { videoId } = useParams();
   const navigate = useNavigate();
   const [isLiked, setIsLiked] = useState(false);

   const {
      data: video,
      isLoading,
      isError,
      error,
   } = useQuery({
      queryKey: ['video', videoId],
      queryFn: () => getVideoById(videoId as string),
      enabled: !!videoId,
      staleTime: 0,
      refetchOnWindowFocus: false,
   });

   const { mutate: toggleLike, isPending: liking } = useMutation({
      mutationFn: () => likeUnlike(videoId as string),
      onSuccess: () => {
         setIsLiked((prev) => !prev); // Toggle like state on success
      },
   });

   return (
      <div className='flex justify-center items-center h-screen bg-gray-900'>
         <div className='w-full max-w-md p-4 rounded-lg shadow-lg'>
            {isLoading ? (
               <div className='flex justify-center items-center'>
                  <Spinner />
               </div>
            ) : isError ? (
               <div className='bg-red-500 text-white p-4 rounded-lg text-center'>
                  Error: {error.message}
               </div>
            ) : video ? (
               <>
                  {/* Video Player */}
                  <div className='relative aspect-[9/16] w-full overflow-hidden rounded-lg'>
                     <ReactPlayer
                        url={video.data?.videoUrl}
                        width='100%'
                        height='100%'
                        controls={true}
                        playing={true}
                        light={video?.data?.thumbnailUrl}
                        loop={false}
                        muted={false}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                     />
                  </div>

                  {/* Like Button */}
                  <div className='mt-4 flex justify-center'>
                     <button
                        className={`px-4 py-2 rounded-lg text-white ${
                           isLiked ? 'bg-red-500' : 'bg-gray-700'
                        }`}
                        onClick={() => toggleLike()}
                        disabled={liking}
                     >
                        {liking
                           ? 'Processing...'
                           : isLiked
                           ? 'Liked ❤️'
                           : 'Like 🤍'}
                     </button>
                  </div>

                  {/* Prev & Next Buttons */}
                  <div className='mt-4 flex justify-between'>
                     <button
                        className={`px-4 py-2 rounded-lg text-white ${
                           video?.data?.prevVideoId
                              ? 'bg-blue-500 hover:bg-blue-600'
                              : 'bg-gray-700 cursor-not-allowed'
                        }`}
                        onClick={() =>
                           video?.data?.prevVideoId &&
                           navigate(`/reels/${video.data.prevVideoId}`)
                        }
                        disabled={!video?.data?.prevVideoId}
                     >
                        Prev
                     </button>

                     <button
                        className={`px-4 py-2 rounded-lg text-white ${
                           video?.data?.nextVideoId
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'bg-gray-700 cursor-not-allowed'
                        }`}
                        onClick={() =>
                           video?.data?.nextVideoId &&
                           navigate(`/reels/${video.data.nextVideoId}`)
                        }
                        disabled={!video?.data?.nextVideoId}
                     >
                        Next
                     </button>
                  </div>
               </>
            ) : (
               <p className='text-white text-center'>No video found.</p>
            )}
         </div>
      </div>
   );
};

export default VideoListFeed;
