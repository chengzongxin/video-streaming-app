import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, VideoCameraOutlined, InfoCircleOutlined } from '@ant-design/icons';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="min-h-screen">
        <Header style={{ padding: '0 16px', backgroundColor: '#001529' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/videos">Videos</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<InfoCircleOutlined />}>
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 16px', backgroundColor: '#f0f2f5' }}>
          <div className="site-layout-content" style={{ padding: 24, minHeight: 380 }}>
            <Routes>
              <Route path="/" element={<VideoList />} />
              <Route path="/video/*" element={<VideoPlayer />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
          Video Streaming App ©2023 Created by You
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;