import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import * as Untils from '../../untils'

import './login.less'
// 不能在 import 之前赋值
const Item = Form.Item

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    const form = this.props.form

    form.validateFields(async (err, values) => {
      if (!err) {
        console.log('提交表单成功了', values)
        this.props.history.push('/admin')
      } else {
        console.log(err)
      }
    })
  }
  render() {
    // 得到的是一个高级函数，用来验证表单项
    const { getFieldDecorator } = this.props.form

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
export default wrapLoginComponent