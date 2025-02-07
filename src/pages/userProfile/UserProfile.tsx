import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { getStatistics } from '@/apis/statistics';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import Modal from '@/components/Shared/Modal';
import { useState } from 'react';
import ReactPlayer from 'react-player';

export default function UserProfile() {
   const { data, isLoading, error } = useQuery({
      queryKey: ['statistics'],
      queryFn: () => getStatistics(),
   });

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedVideo, setSelectedVideo] = useState<{
      url: string;
      title: string;
   } | null>(null);

   if (isLoading) {
      return (
         <div className='h-[calc(100vh-4.5rem)] flex items-center flex-col justify-center gap-4 bg-gray-900'>
            <Skeleton className='max-w-4xl h-[200px] bg-gray-800' />
            <Skeleton className='max-w-4xl h-[200px] bg-gray-800' />
            <Skeleton className='max-w-4xl h-[200px] bg-gray-800' />
            <Skeleton className='max-w-4xl h-[500px] bg-gray-800' />
         </div>
      );
   }

   if (error) {
      return (
         <div className='min-h-screen bg-gray-900 p-6 flex items-center justify-center'>
            <p className='text-red-500'>
               Error loading data: {`${error.message}`}
            </p>
         </div>
      );
   }

   const {
      totalVideos,
      totalViews,
      totalLikes,
      mostPopularVideo,
      engagementRate,
      averageViews,
      engagementBreakdown,
      profile,
   } = data.data || {};

   const handleWatchVideo = (videoUrl: string, videoTitle: string) => {
      setSelectedVideo({ url: videoUrl, title: videoTitle });
      setIsModalOpen(true);
   };

   return (
      <div className='min-h-screen bg-gray-900 p-6'>
         {/* Profile Header */}
         <div className='max-w-4xl mx-auto'>
            <Card className='mb-6 bg-gray-800 border-gray-700'>
               <CardHeader>
                  <div className='flex items-center space-x-4'>
                     <Avatar>
                        <AvatarImage
                           src='https://github.com/shadcn.png'
                           alt={profile.name}
                        />
                        <AvatarFallback className='bg-gray-700 text-white'>
                           {profile.name[0]}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <CardTitle className='text-2xl text-white'>
                           {profile.name}
                        </CardTitle>
                        <CardDescription className='text-gray-400'>
                           {profile.email}
                        </CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                     <div>
                        <p className='text-sm text-gray-400'>Contact</p>
                        <p className='font-medium text-white'>
                           {profile.contact}
                        </p>
                     </div>
                     <div>
                        <p className='text-sm text-gray-400'>Joined</p>
                        <p className='font-medium text-white'>
                           {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                     </div>
                     <div>
                        <p className='text-sm text-gray-400'>Total Videos</p>
                        <p className='font-medium text-white'>{totalVideos}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Most Popular Video Section */}
            {mostPopularVideo && (
               <Card className='mb-6 bg-gray-800 border-gray-700'>
                  <CardHeader>
                     <CardTitle className='text-white'>
                        Most Popular Video 🔥
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6'>
                        <img
                           src={mostPopularVideo.thumbnail.replace(
                              'http://localhost:9000',
                              'https://devsskills.com/files'
                           )}
                           alt={mostPopularVideo.title}
                           className='w-full md:w-48 h-32 object-cover rounded-lg'
                        />
                        <div className='flex-1'>
                           <p className='font-medium text-white'>
                              {mostPopularVideo.title}
                           </p>
                           <p className='text-sm text-gray-400'>
                              Views: {mostPopularVideo.viewCount} | Likes:{' '}
                              {mostPopularVideo.likeCount}
                           </p>
                           <button
                              onClick={() =>
                                 handleWatchVideo(
                                    mostPopularVideo.videoUrl,
                                    mostPopularVideo.title
                                 )
                              }
                              className='text-sm text-blue-400 hover:underline mt-2 inline-block'
                           >
                              Watch Video
                           </button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )}

            {/* Statistics Section */}
            <Card className='mb-6 bg-gray-800 border-gray-700'>
               <CardHeader>
                  <CardTitle className='text-white'>
                     Video Statistics 🧮
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                     <div>
                        <p className='text-sm text-gray-400'>Total Views</p>
                        <p className='font-medium text-white'>{totalViews}</p>
                     </div>
                     <div>
                        <p className='text-sm text-gray-400'>Total Likes</p>
                        <p className='font-medium text-white'>{totalLikes}</p>
                     </div>
                     <div>
                        <p className='text-sm text-gray-400'>Engagement Rate</p>
                        <p className='font-medium text-white'>
                           {engagementRate}
                        </p>
                     </div>
                  </div>
                  <div className='mt-6'>
                     <Progress
                        value={engagementRate.replace('%', '')}
                        className='h-2'
                     />
                     <p className='text-sm text-gray-400 mt-2'>
                        {averageViews.toFixed(2)} views/video
                     </p>
                  </div>
               </CardContent>
            </Card>

            {/* Engagement Breakdown */}
            <Card className='bg-gray-800 border-gray-700'>
               <CardHeader>
                  <CardTitle className='text-white'>
                     Engagement Breakdown
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='space-y-4'>
                     {engagementBreakdown.map((video: any) => (
                        <div
                           key={video.id}
                           className='flex items-center justify-between p-4 border rounded-lg bg-gray-700 border-gray-600'
                        >
                           <div>
                              <p className='font-medium text-white'>
                                 {video.title}
                              </p>
                              <p className='text-sm text-gray-400'>
                                 Views: {video.viewCount} | Likes:{' '}
                                 {video.likeCount}
                              </p>
                           </div>
                           <button
                              onClick={() =>
                                 handleWatchVideo(video.videoUrl, video.title)
                              }
                              className='text-sm text-blue-400 hover:underline'
                           >
                              Watch Video
                           </button>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Video Modal */}
         <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedVideo?.title || 'Video Player'}
         >
            <div className='w-full h-full flex justify-center items-center bg-gray-900'>
               {selectedVideo && (
                  <ReactPlayer
                     url={selectedVideo.url.replace(
                        'http://localhost:9000',
                        'https://devsskills.com/files'
                     )}
                     controls={true}
                     playing={true}
                     width='100%'
                     height='100%'
                     config={{
                        file: {
                           attributes: {
                              controlsList: 'nodownload', // Disable download option
                           },
                        },
                     }}
                  />
               )}
            </div>
         </Modal>
      </div>
   );
}
