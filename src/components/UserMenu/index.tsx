import React,{Component} from 'react'
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { connect } from "dva";
import { GlobalState, UmiComponentProps } from "@/common/type";

import { ConnectState } from '@/models/connect'
const mapStateToProps = (state: ConnectState) => { return { ...state.user } }
type PageStateProps = ReturnType<typeof mapStateToProps>;
type GlobalUserProps = PageStateProps & UmiComponentProps;

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
class GlobalUser extends Component<GlobalUserProps>{
  render(){
    return (
      <div>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar size={40} src={this.props.profile.picture} />
        </Dropdown>,
      </div>
    )
  }
}
export default connect(mapStateToProps)(GlobalUser)
