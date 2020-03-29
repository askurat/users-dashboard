import React, { FC } from 'react';
import { Layout as AntdLayout } from 'antd';
import Footer from '@/components/Footer/Footer';

const { Content } = AntdLayout;

type LayoutProps = {};
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '44px 36px 0' }}>{children}</Content>
      <Footer />
    </AntdLayout>
  );
};

export default Layout;
