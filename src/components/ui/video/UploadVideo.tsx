import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Progress } from '@/components/ui/progress'; // Adjust the import based on your structure
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getAccessToken } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import Spinner from '@/components/Shared/Spinner';
import { Button } from '../button';

const UploadVideo: React.FC = () => {
   const [videoFile, setVideoFile] = useState<File | null>(null); // Type for videoFile
   const [title, setTitle] = useState<string>(''); // State for title
   const [description, setDescription] = useState<string>(''); // State for description
   const [uploadProgress, setUploadProgress] = useState<number>(0); // State for upload progress
   // State for processing

   console.log({ uploadProgress });

   const onDrop = (acceptedFiles: File[]) => {
      setVideoFile(acceptedFiles[0]);
   };

   const { getRootProps, getInputProps } = useDropzone({
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
            'http://localhost:5000/api/v1/video/upload',
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
         setUploadProgress(0); // Reset progress after successful upload
      },
      onError: (error) => {
         console.error('Upload failed:', error);
         toast.error(error.message || 'Upload failed.');
         setUploadProgress(0); // Reset progress on error
      },
   });

   const handleUpload = async () => {
      if (!videoFile || !title || !description) {
         alert('Please provide a title and description for the video.');
         return;
      }

      const formData = new FormData();
      formData.append('reelVideo', videoFile);
      formData.append('data', JSON.stringify({ title, description }));

      uploadVideoMutation.mutate(formData);
   };

   return (
      <div className='max-w-2xl mx-auto my-4'>
         {/* Dropzone */}
         <div
            {...getRootProps()}
            style={{
               border: '2px dashed #000000',
               padding: '30px',
               textAlign: 'center',
            }}
         >
            <input {...getInputProps()} />
            <p>Drag & drop a video file here, or click to select one</p>
            {videoFile && <p>Selected file: {videoFile.name}</p>}
         </div>

         {/* Progress Bar */}
         {uploadVideoMutation.isPending && uploadProgress !== 100 && (
            <div style={{ marginTop: '20px' }}>
               <Progress value={uploadProgress} />
            </div>
         )}

         {uploadProgress === 100 && (
            <div className='mt-5 flex items-center gap-4'>
               <Spinner color='blue' height='h-10' width='w-10' />
               <p>Processing video...</p>
            </div>
         )}

         {/* Title and Description Inputs */}
         {videoFile && uploadProgress !== 100 && (
            <div className='mt-4'>
               <Input
                  type='text'
                  placeholder='Enter video title...'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='mb-3'
                  disabled={uploadVideoMutation.isPending} // Disable during upload
               />
               <Textarea
                  placeholder='Enter video description...'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='mb-3'
                  disabled={uploadVideoMutation.isPending} // Disable during upload
               />
            </div>
         )}

         {/* Upload Button */}
         <Button
            onClick={handleUpload}
            disabled={
               uploadVideoMutation.isPending ||
               !videoFile ||
               !title ||
               !description
            }
            className='bg-black mt-4'
         >
            {uploadVideoMutation.isPending ? 'Uploading...' : 'Upload Video'}
         </Button>
      </div>
   );
};

export default UploadVideo;
