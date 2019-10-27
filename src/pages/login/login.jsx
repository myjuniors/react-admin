import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'

import * as Untils from '../../untils'

import './login.less'
// 不能在 import 之前赋值
const Item = Form.Item

class Login extends Component {
  handleRegistry = (e) => {
    e.preventDefault()
    this.props.history.push('/registry')
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const form = this.props.form

    form.validateFields(async (err, values) => {
      if (!err) {
        const {username, password} = values
        this.props.login(username, password)
      } else {
        console.log('校验失败')
      }
    })
  }
  render() {
    // 得到的是一个高级函数，用来验证表单项
    const { getFieldDecorator } = this.props.form
    const user = this.props.user
    if (user && user._id) {
      return <Redirect to='/home' />
    }

    return (
      <div className="login-container">
        <section className="login">
          <header className="login-header">后台管理系统-react版本</header>
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <Item>
              {
                getFieldDecorator('username', {
                  rules: [
                    { 
                      validator: Untils.formValidateDiy('username', '用户名由2-10位汉字组成'),
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    size="large"
                  />
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { 
                      validator: Untils.formValidateDiy('password', '密码由以1开头的11位数字组成'),
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    size="large"
                  />        
                )
              }
            </Item>
            <Item className="btn-container">
              <Button type="primary" htmlType="submit" size="large" className="login-btn">
                登录
              </Button>
              <div className="registry-btn">
                还没有账号？<a href="/registry" onClick={this.handleRegistry}>前往注册</a>
              </div>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
// 向Login 组件传一个form 对象
const wrapLoginComponent = Form.create()(Login)
// 曝露出去包装后的组件对象，这里有两个知识点：高阶函数 和 高阶组件
export default connect(
  state => ({user: state.user}),
  { login }
)(wrapLoginComponent)