import React, { Component } from 'react';
import { Menu, Icon, Input } from 'antd';
import Logo from '../GlobalLogo/index'
import UserMenu from '../UserMenu'
import styles from './index.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import router from 'umi/router';
const Search = Input.Search;
export interface GlobalHeaderProps {

}

class GlobalHeader extends Component<GlobalHeaderProps>{
  state = {
    current: 'mail',
  }

  handleClick = (e: any) => {
    console.log('click ', e);
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
            onSearch={(value:any) => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
        <UserMenu></UserMenu>
      </div>)
  }
}

export default GlobalHeader
