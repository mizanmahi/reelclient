import { useParams } from 'react-router';

const VideoListFeed = () => {
   const { videoId } = useParams();
   console.log(videoId);
   return <div>VideoListFeed</div>;
};

export default VideoListFeed;
