import React from 'react';
import styles from './index.css';
import GlobalHeader from '../components/GlobalHeader/index'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd'

const BasicLayout: React.FC = props => {
  return (
    <LocaleProvider locale={zhCN}>
      <div>
        <GlobalHeader></GlobalHeader>
        <div className={styles.normal}>

          {props.children}
        </div>
      </div >
    </LocaleProvider >
  );
};

export default BasicLayout;
