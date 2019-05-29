import React from 'react';
import styles from './index.css';
import GlobalHeader from '../components/GlobalHeader/index'

const BasicLayout: React.FC = props => {
  return (
    <div>
    <GlobalHeader></GlobalHeader>
    <div className={styles.normal}>
     
      {props.children}
    </div>
    </div>
  );
};

export default BasicLayout;
