import React, { FC } from 'react';
import { Layout as AntdLayout } from 'antd';
import Footer from '@/components/Footer/Footer';

const { Content } = AntdLayout;

type LayoutProps = {};
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AntdLayout>
      <Content style={{ margin: '44px 36px 0' }}>
        <div style={{ height: 'calc(100vh - 125px)' }}>{children}</div>
      </Content>
      <Footer />
    </AntdLayout>
  );
};

export default Layout;
