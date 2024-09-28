import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { API_BASE_URL } from '../config';

const { Title } = Typography;

const VideoPlayer: React.FC = () => {
  const { '*': filename } = useParams<{ '*': string }>();

  if (!filename) {
    return <div>Error: No filename provided</div>;
  }

  return (
    <Card style={{ margin: '20px' }}>
      <Title level={2}>{decodeURIComponent(filename.split('\\').pop() || '')}</Title>
      <div style={{ marginBottom: 16 }}>
        <video style={{ width: '100%', maxHeight: '70vh' }} controls>
          <source src={`${API_BASE_URL}/api/video/${filename}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Button type="primary" icon={<ArrowLeftOutlined />}>
        <Link to="/">Back to Video List</Link>
      </Button>
    </Card>
  );
};

export default VideoPlayer;