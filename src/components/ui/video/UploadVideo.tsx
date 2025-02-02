import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Progress } from '@/components/ui/progress'; // Adjust the import based on your structure
import { getAccessToken } from '@/utils';

const UploadVideo: React.FC = () => {
   const [uploadProgress, setUploadProgress] = useState<number>(0);
   const [uploading, setUploading] = useState<boolean>(false);
   const [videoFile, setVideoFile] = useState<File | null>(null); // Type for videoFile

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

   const handleUpload = async () => {
      if (!videoFile) return;

      const formData = new FormData();
      formData.append('reelVideo', videoFile);
      formData.append(
         'data',
         JSON.stringify({
            title: 'Arish',
            description: 'Another video of Arish!',
         })
      );

      setUploading(true);

      try {
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
                     setUploadProgress(percentCompleted);
                  }
               },
            }
         );

         console.log('Upload successful:', response.data);
         // Optionally reset the file after successful upload
         setVideoFile(null);
         setUploadProgress(0); // Reset progress
      } catch (error) {
         console.error('Upload failed:', error);
      } finally {
         setUploading(false);
      }
   };

   return (
      <div>
         <div
            {...getRootProps()}
            style={{
               border: '2px dashed #007bff',
               padding: '20px',
               textAlign: 'center',
            }}
         >
            <input {...getInputProps()} />
            <p>Drag & drop a video file here, or click to select one</p>
            {videoFile && <p>Selected file: {videoFile.name}</p>}
         </div>

         {uploading && (
            <div style={{ marginTop: '20px' }}>
               <Progress value={uploadProgress} />
            </div>
         )}

         <button
            onClick={handleUpload}
            disabled={uploading || !videoFile}
            style={{ marginTop: '20px' }}
         >
            {uploading ? 'Uploading...' : 'Upload Video'}
         </button>
      </div>
   );
};

export default UploadVideo;
