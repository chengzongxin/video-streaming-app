import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="min-h-screen">
        <Header style={{ padding: '0 16px' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 16px' }}>
          <div className="site-layout-content" style={{ padding: 24, minHeight: 380 }}>
            <Routes>
              <Route path="/" element={<VideoList />} />
              <Route path="/video/*" element={<VideoPlayer />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Video Streaming App ©2023 Created by You</Footer>
      </Layout>
    </Router>
  );
}

export default App;