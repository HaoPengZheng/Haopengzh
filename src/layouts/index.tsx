import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd'

const IndexLayout: React.FC = props => {
  return (
    <LocaleProvider locale={zhCN}>
          {props.children}
    </LocaleProvider >
  );
};

export default IndexLayout;
