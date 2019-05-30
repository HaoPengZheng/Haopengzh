import React from 'react'
import { Menu, Dropdown, Icon, Avatar } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <Icon type="edit" /> 开始写作
    </Menu.Item>
    <Menu.Item>
      <Icon type="copy" /> 草稿箱
    </Menu.Item>
    <Menu.Item>
      <Icon type="logout" />退出登录
    </Menu.Item>
  </Menu>
);

export default () => {

  return (
    <div>
      <Dropdown overlay={menu} placement="bottomRight">
        <Avatar size={40} icon="user" />
      </Dropdown>,
    </div>
  )

}
