import React, { FC } from 'react';
import { Layout as AntdLayout } from 'antd';

const { Content, Footer } = AntdLayout;

type LayoutProps = {};
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AntdLayout style={{ height: '100vh' }}>
      <Content style={{ margin: '44px 36px 0' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        Spectrum ©2020 Created by taruks
      </Footer>
    </AntdLayout>
  );
};

export default Layout;
