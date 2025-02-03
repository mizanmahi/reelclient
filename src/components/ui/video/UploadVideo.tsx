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
   const [videoFile, setVideoFile] = useState<File | null>(null); // Type for videoFile
   const [title, setTitle] = useState<string>(''); // State for title
   const [description, setDescription] = useState<string>(''); // State for description
   const [uploadProgress, setUploadProgress] = useState<number>(0);

   const queryClient = useQueryClient(); // State for upload progress

   const onDrop = (acceptedFiles: File[]) => {
      setVideoFile(acceptedFiles[0]);
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         'video/mp4': [], // Accept only MP4 files
      },
      maxFiles: 1,
   });

   // Define the mutation for uploading video
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
                     setUploadProgress(percentCompleted); // Update progress
                  }
               },
            }
         );
         return response.data;
      },
      onMutate: () => {
         setUploadProgress(0); // Reset progress when the mutation starts
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
         setUploadProgress(0); // Reset progress on error
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
         className='max-w-full mx-auto my-4 mb-14 p-6 bg-white rounded-lg shadow-sm'
         style={{
            boxShadow:
               'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
         }}
      >
         {/* Dropzone */}
         <div
            {...getRootProps()}
            className={`border-2 border-dashed ${
               isDragActive ? 'border-blue-500' : 'border-gray-300'
            } rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 hover:border-blue-500`}
         >
            <input {...getInputProps()} />
            <p className='text-gray-600'>
               {isDragActive
                  ? 'Drop the video here...'
                  : 'Drag & drop a video file here, or click to select one'}
            </p>
            {videoFile && (
               <p className='mt-2 text-sm text-gray-500'>
                  Selected file:{' '}
                  <span className='font-semibold'>{videoFile.name}</span>
               </p>
            )}
         </div>

         {/* Progress Bar */}
         {uploadVideoMutation.isPending && uploadProgress !== 100 && (
            <div className='mt-6'>
               <Progress value={uploadProgress} className='h-2 bg-gray-200' />
               <p className='mt-2 text-sm text-gray-600'>
                  Uploading... {uploadProgress}%
               </p>
            </div>
         )}

         {/* Processing State */}
         {uploadProgress === 100 && (
            <div className='mt-6 flex items-center justify-center gap-3'>
               <Spinner color='blue' height='h-6' width='w-6' />
               <p className='text-gray-600'>Processing video...</p>
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
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={uploadVideoMutation.isPending} // Disable during upload
               />
               <Textarea
                  placeholder='Enter video description...'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={uploadVideoMutation.isPending} // Disable during upload
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
               className='w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
               {uploadVideoMutation.isPending ? (
                  <div className='flex items-center gap-2'>
                     {/* <Spinner color='white' height='h-4' width='w-4' /> */}
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
