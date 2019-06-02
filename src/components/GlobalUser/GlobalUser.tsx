import React, { Component, FormEvent } from 'react'
import { Checkbox, Form, Icon, Input, Button, Modal, notification } from 'antd'
import { FormComponentProps } from 'antd/lib/form';
import { connect } from "dva";
import { GlobalState, UmiComponentProps } from "@/common/type";
import UserMenu from '../UserMenu'

interface IGlobalUserProps extends FormComponentProps {
  email: string;
  password: string;
  remember: boolean
}
export type IGlobalUserState = {
  loginModalVisible: Boolean
}

import { ConnectState } from '@/models/connect'
const mapStateToProps = (state: ConnectState) => { return { ...state.login } }
type PageStateProps = ReturnType<typeof mapStateToProps>;
type GlobalUserProps = IGlobalUserProps & PageStateProps & UmiComponentProps;


const loginSuccessNotification = () => {
  notification.open({
    message: '登录成功',
    type:'success',
    description:
      '欢迎你',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};


class GlobalUser extends Component<GlobalUserProps, IGlobalUserState>{
  state = {
    loginModalVisible: false
  }

  handleLogin = async (values:any) => {
    await this.props.dispatch({ type: 'login/login', payload: values })
    if(this.props.status.isLogin){
      loginSuccessNotification()
      this.props.dispatch({type:'user/fetchUserInfo'})
      this.setState({loginModalVisible:false})
    }
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: IGlobalUserProps) => {
      if (!err) {
        this.handleLogin(values)
      }
    })
  }

  handleShowLoginModal = () => {
    this.setState({ loginModalVisible: true })
  }
  handleLoginModalCancel = () => {
    this.setState({ loginModalVisible: false })
  }
  renderWhenLogout = () => {
    const { getFieldDecorator } = this.props.form;
    return (<div> <Modal
      title="登录"
      visible={this.state.loginModalVisible}
      onCancel={this.handleLoginModalCancel}
      footer={null}
    >
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your Password!' }], })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true, })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>

        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleShowLoginModal}>登录</Button>
        </Form.Item>
      </Form>
    </Modal>
      <Button type="primary" onClick={this.handleShowLoginModal}>登录</Button></div>)
  }
  renderWhenLogin = () => {
    return (<UserMenu />)
  }
  render() {
    if (this.props.status.isLogin) {
      return this.renderWhenLogin()
    } else {
      return this.renderWhenLogout()
    }
  }
}

export default connect(mapStateToProps)(Form.create<IGlobalUserProps>({})(GlobalUser));

