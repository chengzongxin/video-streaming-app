import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    axios.get<string[]>('http://localhost:5000/api/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div>
      <h1>Video List</h1>
      <ul>
        {videos.map(video => (
          <li key={video}>
            <Link to={`/video/${encodeURIComponent(video)}`}>{video}</Link>
            <a href={`http://localhost:5000/api/download/${encodeURIComponent(video)}`} download> Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;