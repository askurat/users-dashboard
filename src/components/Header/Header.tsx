import React, { ReactNode, FC } from 'react';
import { PageHeader } from 'antd';

type PropTypes = {
  subTitle?: ReactNode;
  extra?: ReactNode;
};

const Header: FC<PropTypes> = ({ children, subTitle, extra }) => {
  return (
    <PageHeader
      title="Top Users"
      subTitle={subTitle}
      className="site-page-header"
      extra={extra}
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      {children}
    </PageHeader>
  );
};

export default Header;
