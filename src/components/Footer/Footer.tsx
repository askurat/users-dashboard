import React, { useContext } from 'react';
import { Layout, Tooltip, Switch, Divider } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { ThemeContext } from '@/components/App';

const { Footer: AntdFooter } = Layout;
const ThemeChangerIcons = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1713133_narhhn3kifm.js',
});

const year = new Date().getFullYear();

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const backgroundColor = theme === 'dark' ? '#2B2B2B' : '#D2D2D2';
  return (
    <AntdFooter style={{ textAlign: 'center' }}>
      <Tooltip placement="top" title={theme === 'dark' ? 'Light' : 'Dark'}>
        <Switch
          className="theme-switcher"
          checkedChildren={<ThemeChangerIcons type="icon-sunset" />}
          unCheckedChildren={<ThemeChangerIcons type="icon-moonset" />}
          defaultChecked={theme === 'dark'}
          onClick={toggleTheme}
        />
      </Tooltip>
      <Divider type="vertical" style={{ backgroundColor }} />
      Spectrum ©{year} Created by taruks
    </AntdFooter>
  );
};

export default Footer;
