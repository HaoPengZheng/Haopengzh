import React, { Component } from 'react';
import { Menu, Input } from 'antd';
import Logo from '../GlobalLogo/index'
import GlobalUser from '../GlobalUser/GlobalUser'
import { connect } from "dva";
import styles from './index.less'
import router from 'umi/router';
import { GlobalState, UmiComponentProps } from "@/common/type";
// import model from '../../models/product.js'
// import {asyncAdd} from '../../models/global'

const Search = Input.Search;

import { ConnectState } from '@/models/connect'
const mapStateToProps = (state:ConnectState)=>{return {...state.global}}
type PageStateProps = ReturnType<typeof mapStateToProps>;
type GlobalHeaderProps = PageStateProps & UmiComponentProps;

class GlobalHeader extends Component<GlobalHeaderProps>{
  state = {
    current: 'mail',
  }

  doSearch = () => {
    this.props.dispatch({ type: 'global/fetchEssay' })
    console.log(this.props)
    console.log(this.state)
  }
  handleClick = (e: any) => {
    this.setState({
      current: e.key,
    });
    router.push(e.key)
  };

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Menu className={styles.menu} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="/">
            🏠网站首页
          </Menu.Item>
          <Menu.Item key="/live">
            💡生活创作
          </Menu.Item>
          <Menu.Item key="/game">
            🎮游戏人生
          </Menu.Item>
        </Menu>
        <div>
          <Search
            placeholder="搜索"
            onSearch={this.doSearch}
            style={{ width: 200 }}
          />
        </div>
        <GlobalUser username="zhp" password="123" remember={false} />
      </div>)
  }
}

export default connect(mapStateToProps)(GlobalHeader);
