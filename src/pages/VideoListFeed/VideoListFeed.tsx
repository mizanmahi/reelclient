import { useEffect, useState } from 'react';
import { getVideoById, likeUnlike } from '@/apis/video';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button'; // shadcn Button
import { Heart, ChevronLeft, ChevronRight, Eye } from 'lucide-react'; // Icons from Lucide
import { useUser } from '@/hooks/useUser';
import Spinner from '@/components/Shared/Spinner';

const VideoListFeed = () => {
   const { videoId, userId } = useParams();
   const navigate = useNavigate();
   const { user } = useUser();
   const [isLiked, setIsLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(0);

   const {
      data: video,
      isLoading,
      isError,
      error,
   } = useQuery({
      queryKey: ['video', videoId, userId],
      queryFn: () => getVideoById(videoId as string, userId as string),
      enabled: !!videoId,
      staleTime: 0,
      refetchOnWindowFocus: false,
   });

   useEffect(() => {
      if (video?.data?.isLiked !== undefined) {
         setIsLiked(video.data.isLiked);
         setLikeCount(video.data.likeCount);
      }
   }, [video]);

   const { mutate: toggleLike, isPending: liking } = useMutation({
      mutationFn: () => likeUnlike(videoId as string),
      onSuccess: () => {
         setIsLiked((prev) => !prev); // Toggle like state
         setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1)); // Update count
      },
   });

   return (
      <div className='flex justify-center items-center h-[calc(100vh-4.5rem)] bg-black'>
         <div className='relative w-full max-w-md h-full flex justify-center items-center'>
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
                        controls
                        playing
                        light={video?.data?.thumbnailUrl}
                        loop={false}
                        muted={false}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                     />
                  </div>

                  {/* Prev Button */}
                  {video?.data?.prevVideoId && (
                     <button
                        className='absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300'
                        onClick={() =>
                           navigate(
                              user?.id
                                 ? `/reels/${video.data.prevVideoId}/${user?.id}`
                                 : `/reels/${video.data.prevVideoId}`
                           )
                        }
                     >
                        <ChevronLeft className='w-6 h-6 text-white' />
                     </button>
                  )}

                  {/* Next Button */}
                  {video?.data?.nextVideoId && (
                     <button
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300'
                        onClick={() =>
                           navigate(
                              user?.id
                                 ? `/reels/${video.data.nextVideoId}/${user?.id}`
                                 : `/reels/${video.data.nextVideoId}`
                           )
                        }
                     >
                        <ChevronRight className='w-6 h-6 text-white' />
                     </button>
                  )}

                  {/* Video Info Section */}
                  <div
                     className='absolute right-4 flex flex-col items-end gap-3'
                     style={{ bottom: '150px' }}
                  >
                     {/* Like Button and Count */}
                     <div className='flex items-center'>
                        <Button
                           variant='ghost'
                           size='icon'
                           // className='p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300'
                           onClick={() => toggleLike()}
                           disabled={!userId || liking}
                        >
                           {liking ? (
                              <Spinner className='w-5 h-5' />
                           ) : isLiked ? (
                              <Heart className='w-5 h-5 text-red-500 fill-red-500' />
                           ) : (
                              <Heart className='w-5 h-5 text-white' />
                           )}
                        </Button>
                        <span className='text-white text-sm'>{likeCount}</span>
                     </div>

                     {/* View Count */}
                     <div className='flex items-center gap-2'>
                        <Eye className='w-5 h-5 text-white' />
                        <span className='text-white text-sm'>
                           {video.data?.viewCount}
                        </span>
                     </div>

                     {/* Uploader Name */}
                     <span className='text-white text-sm font-semibold'>
                        {video.data?.uploader.name}
                     </span>
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
