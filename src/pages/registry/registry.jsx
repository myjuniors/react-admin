import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'

import * as Untils from '../../untils'
import { reqRegistry } from '../../api/common'

import '../login/login.less'
// 不能在 import 之前赋值
const Item = Form.Item

class Registry extends Component {
  handleLogin = (e) => {
    e.preventDefault()
    this.props.history.push('/login')
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const form = this.props.form

    form.validateFields(async (err, values) => {
      if (!err) {
        const {username, password} = values
        const result = await reqRegistry({username, password})
        if (result.resultCode === 0) {
          message.success('注册成功了')
          this.props.history.replace('/login')
        } else {
          message.error('登录错误：' + result.message)
        }
      } else {
        console.log('校验失败')
      }
    })
  }
  render() {
    // 得到的是一个高级函数，用来验证表单项
    const { getFieldDecorator } = this.props.form

    return (
      <div className="login-container">
        <section className="login">
          <header className="login-header">注册账号-后台管理系统</header>
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
                    placeholder="用户名由2-10位汉字组成"
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
                    placeholder="密码由以1开头的11位数字组成"
                    size="large"
                  />        
                )
              }
            </Item>
            <Item className="btn-container">
              <Button type="primary" htmlType="submit" size="large" className="login-btn">
                注册
              </Button>
              <div className="registry-btn">
                已有账号？<a href="" onClick={this.handleLogin}>前往登录</a>
              </div>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
// 向Login 组件传一个form 对象
const wrapRegistryComponent = Form.create()(Registry)
// 曝露出去包装后的组件对象，这里有两个知识点：高阶函数 和 高阶组件
export default wrapRegistryComponent