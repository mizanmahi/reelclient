interface VideoMetadata {
   filename: string;
   nb_streams: number;
   nb_programs: number;
   format_name: string;
   format_long_name: string;
   start_time: number;
   duration: number;
   size: number;
   bit_rate: number;
   probe_score: number;
   tags: {
      major_brand: string;
      minor_version: string;
      compatible_brands: string;
      encoder: string;
   };
}

interface Uploader {
   name: string;
   email: string;
}

export interface IVideo {
   id: string; // Unique identifier for the video
   videoUrl: string; // URL of the video
   title: string; // Title of the video
   description: string; // Description of the video
   thumbnail: string; // URL of the video's thumbnail
   uploaderId: string; // ID of the uploader
   viewCount: number; // Number of views
   likeCount: number; // Number of likes
   createdAt: string; // Creation timestamp in ISO format
   updatedAt: string; // Update timestamp in ISO format
   metadata: VideoMetadata; // Metadata about the video
   uploader: Uploader; // Information about the uploader
}
