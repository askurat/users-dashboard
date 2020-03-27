import React, { ReactNode, FC } from 'react';
import { PageHeader as AntdPageHeader } from 'antd';

type PageHeaderTypes = {
  subTitle?: ReactNode;
  extra?: ReactNode;
};

const PageHeader: FC<PageHeaderTypes> = ({ children, subTitle, extra }) => {
  return (
    <AntdPageHeader
      title="Top Users"
      subTitle={subTitle}
      className="site-page-header"
      extra={extra}
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      {children}
    </AntdPageHeader>
  );
};

export default PageHeader;
