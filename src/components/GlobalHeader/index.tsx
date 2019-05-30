import React, { Component } from 'react';
import { Menu, Input } from 'antd';
import Logo from '../GlobalLogo/index'
import GlobalUser from '../GlobalUser/GlobalUser'
import styles from './index.less'
import router from 'umi/router';
const Search = Input.Search;
export interface GlobalHeaderProps {

}

class GlobalHeader extends Component<GlobalHeaderProps>{
  state = {
    current: 'mail',
  }

  doSearch = () =>{

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
          <Logo></Logo>
        </div>
        <Menu className={styles.menu} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="/home">
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

export default GlobalHeader
