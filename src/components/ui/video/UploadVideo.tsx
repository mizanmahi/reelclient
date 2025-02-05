import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Progress } from '@/components/ui/progress'; // Adjust the import based on your structure
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getAccessToken } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Spinner from '@/components/Shared/Spinner';
import { Button } from '../button';
import { BASE_API_URL } from '@/apis/video';

const UploadVideo = ({ refetchVideos }: { refetchVideos: any }) => {
   const [videoFile, setVideoFile] = useState<File | null>(null);
   const [title, setTitle] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [uploadProgress, setUploadProgress] = useState<number>(0);

   const queryClient = useQueryClient();

   const onDrop = (acceptedFiles: File[]) => {
      setVideoFile(acceptedFiles[0]);
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         'video/mp4': [],
      },
      maxFiles: 1,
   });

   const uploadVideoMutation = useMutation({
      mutationFn: async (formData: FormData) => {
         const response = await axios.post(
            `${BASE_API_URL}/video/upload`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${getAccessToken()}`,
               },
               onUploadProgress: (progressEvent) => {
                  if (progressEvent.total) {
                     const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                     );
                     setUploadProgress(percentCompleted);
                  }
               },
            }
         );
         return response.data;
      },
      onMutate: () => {
         setUploadProgress(0);
      },
      onSuccess: (data) => {
         toast.success(data.message || 'Upload successful!');
         setVideoFile(null);
         setTitle('');
         setDescription('');
         setUploadProgress(0);
         refetchVideos();
         queryClient.invalidateQueries({ queryKey: ['videos', 'video'] });
      },
      onError: (error) => {
         console.error('Upload failed:', error);
         toast.error(error.message || 'Upload failed.');
         setUploadProgress(0);
      },
   });

   const handleUpload = async () => {
      if (!videoFile || !title || !description) {
         toast.error('Please provide a title and description for the video.');
         return;
      }

      const formData = new FormData();
      formData.append('reelVideo', videoFile);
      formData.append('data', JSON.stringify({ title, description }));

      uploadVideoMutation.mutate(formData);
   };

   return (
      <div
         className='max-w-full mx-auto my-4 mb-14 p-6 bg-black rounded-lg shadow-sm'
         style={{
            boxShadow:
               'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
         }}
      >
         {/* Dropzone */}
         <div
            {...getRootProps()}
            className={`border-2 border-dashed ${
               isDragActive ? 'border-white' : 'border-gray-600'
            } rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 hover:border-white`}
         >
            <input {...getInputProps()} />
            <p className='text-gray-400'>
               {isDragActive
                  ? 'Drop the video here...'
                  : 'Drag & drop a video file here, or click to select one'}
            </p>
            {videoFile && (
               <p className='mt-2 text-sm text-gray-400'>
                  Selected file:{' '}
                  <span className='font-semibold text-white'>
                     {videoFile.name}
                  </span>
               </p>
            )}
         </div>

         {/* Progress Bar */}
         {uploadVideoMutation.isPending && uploadProgress !== 100 && (
            <div className='mt-6'>
               <Progress
                  value={uploadProgress}
                  className='h-2 bg-gray-500'
                  style={
                     { '--progress-color': '#ffffff' } as React.CSSProperties
                  }
               />
               <p className='mt-2 text-sm text-gray-400'>
                  Uploading... {uploadProgress}%
               </p>
            </div>
         )}

         {/* Processing State */}
         {uploadProgress === 100 && (
            <div className='mt-6 flex items-center justify-center gap-3'>
               <Spinner color='white' height='h-6' width='w-6' />
               <p className='text-gray-400'>Processing video...</p>
            </div>
         )}

         {/* Title and Description Inputs */}
         {videoFile && uploadProgress !== 100 && (
            <div className='mt-6 space-y-4'>
               <Input
                  type='text'
                  placeholder='Enter video title...'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full p-3 border border-gray-600 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400'
                  disabled={uploadVideoMutation.isPending}
               />
               <Textarea
                  placeholder='Enter video description...'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='w-full p-3 border border-gray-600 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400'
                  disabled={uploadVideoMutation.isPending}
               />
            </div>
         )}

         {/* Upload Button */}
         {videoFile && (
            <Button
               onClick={handleUpload}
               disabled={
                  uploadVideoMutation.isPending ||
                  !videoFile ||
                  !title ||
                  !description
               }
               className='w-full mt-6 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
               {uploadVideoMutation.isPending ? (
                  <div className='flex items-center gap-2'>
                     <span>Uploading</span>
                  </div>
               ) : (
                  'Upload Video'
               )}
            </Button>
         )}
      </div>
   );
};

export default UploadVideo;
