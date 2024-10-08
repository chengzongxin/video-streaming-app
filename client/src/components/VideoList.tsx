import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { List, Typography, Breadcrumb } from 'antd';
import { FolderFilled, VideoCameraFilled } from '@ant-design/icons';
import { API_BASE_URL } from '../config';

const { Title } = Typography;

interface FileInfo {
  name: string;
  isDirectory: boolean;
  path: string;
}

type RolePermissions = Record<'admin' | 'user' | 'guest' | 'everyone', string[]>;

const permissions: RolePermissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read'],
    everyone: ['read']
};

const VideoList: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get<FileInfo[]>(`${API_BASE_URL}/api/videos`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const getCurrentFiles = () => {
    return files.filter(file => {
      const filePath = file.path.split('\\');
      return filePath.length === currentPath.length + 1 && 
             filePath.slice(0, -1).every((part, index) => part === currentPath[index]);
    });
  };

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index));
  };

  return (
    <div>
      <Title level={2}>Video List</Title>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/" onClick={() => setCurrentPath([])}>Home</Link>
        </Breadcrumb.Item>
        {currentPath.map((folder, index) => (
          <Breadcrumb.Item key={index}>
            <a onClick={() => handleBreadcrumbClick(index + 1)}>{folder}</a>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <List
        itemLayout="horizontal"
        dataSource={getCurrentFiles()}
        renderItem={file => (
          <List.Item key={file.path}>
            <List.Item.Meta
              avatar={file.isDirectory ? 
                <FolderFilled style={{ fontSize: '24px', color: '#ffd700' }} /> : 
                <VideoCameraFilled style={{ fontSize: '24px', color: '#ff4d4f' }} />
              }
              title={
                file.isDirectory ? 
                  <a onClick={() => handleFolderClick(file.name)}>{file.name}</a> : 
                  <Link to={`/video/${encodeURIComponent(file.path)}`}>{file.name}</Link>
              }
              description={file.isDirectory ? 'Folder' : 'Video'}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default VideoList;