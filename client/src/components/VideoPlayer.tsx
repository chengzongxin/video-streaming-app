import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();

  if (!filename) {
    return <div>Error: No filename provided</div>;
  }

  return (
    <div>
      <h1>{decodeURIComponent(filename)}</h1>
      <video width="720" controls>
        <source src={`http://localhost:5000/api/video/${filename}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;