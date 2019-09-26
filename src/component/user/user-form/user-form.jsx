import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'

const { Option } = Select
const Item = Form.Item

class UserForm extends Component {
  static propTypes = {
    sendForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  }
  componentDidMount () {
    const form = this.props.form
    this.props.sendForm(form)
  }
  render() {
    const { form, roles, user } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 16}
    }
    return (
      <div className="add-form">
        <Form {...formItemLayout}>
          <Item label="用户名">
            {
              getFieldDecorator('username', {
                initialValue: user.username, 
                rules: [
                  { required: true, message: '用户名不能为空' }
                ]
              })(
                <Input type="text" placeholder="请输入用户名"/>
              )
            }
          </Item>
          <Item label="密码">
            {
              getFieldDecorator('password', {
                initialValue: user.password,
                rules: [
                  { required: true, message: '密码不能为空' }
                ]
              })(
                <Input type="password" placeholder="请输入密码"/>
              )
            }
          </Item>
          <Item label="手机号">
            {
              getFieldDecorator('phone', {
                initialValue: user.phone,
                rules: [
                  { required: true, message: '手机号不能为空' }
                ]
              })(
                <Input type="phone" placeholder="请输入手机号"/>
              )
            }
          </Item>
          <Item label="邮箱">
            {
              getFieldDecorator('email', {
                initialValue: user.email,
                rules: [
                  { required: true, message: '邮箱不能为空' }
                ]
              })(
                <Input type="email" placeholder="请输入邮箱"/>
              )
            }
          </Item>
          <Item label="角色">
            {
              getFieldDecorator('role_id', {
                initialValue: user.role_id,
                rules: [
                  { required: true, message: '必须选择一个角色' }
                ]
              })(
                <Select style={{width: 200}} placeholder='请选择角色'>
                  {
                    roles.map(role => (<Option key={role._id} value={role._id}>{role.name}</Option>))
                  }
                </Select>
              )
            }
          </Item>
        </Form>
      </div>
    )
  }
}

// 向AddForm 组件传一个form 对象
const wrapAddFormComponent = Form.create()(UserForm)
// 曝露出去包装后的组件对象，这里有两个知识点：高阶函数 和 高阶组件
export default wrapAddFormComponent