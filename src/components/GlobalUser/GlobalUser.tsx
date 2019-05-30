import React, { Component } from 'react'
import { Checkbox, Form, Icon, Input, Button, Modal } from 'antd'
import { FormComponentProps } from 'antd/lib/form';
import UserMenu from '../UserMenu'

interface IGlobalUserProps extends FormComponentProps {
  username: string;
  password: string;
  remember: boolean
}
export type IGlobalUserState = {
  isLogin: Boolean,
  loginModalVisible: Boolean

}

class GlobalUser extends Component<IGlobalUserProps, IGlobalUserState>{
  state = {
    isLogin: true,
    loginModalVisible: false
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
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
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
          <Button type="primary" onClick={this.handleShowLoginModal}>登录</Button>
        </Form.Item>
      </Form>
    </Modal>
      <Button type="primary" onClick={this.handleShowLoginModal}>登录</Button></div>)
  }
  renderWhenLogin = () => {
    return (<UserMenu />)
  }
  render() {
    if (this.state.isLogin) {
      return this.renderWhenLogin()
    } else {
      return this.renderWhenLogout()
    }
  }
}


export default Form.create<IGlobalUserProps>({})(GlobalUser);
