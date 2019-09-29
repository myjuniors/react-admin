import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item

class AddForm extends Component {
  static propTypes = {
    sendForm: PropTypes.func.isRequired
  }
  componentDidMount () {
    const form = this.props.form
    this.props.sendForm(form)
  }
  render() {
    const form = this.props.form
    const { getFieldDecorator } = form
    return (
      <div className="add-form">
        <Form>
          <Item>
            { 
              getFieldDecorator('roleName', {
                initialValue: '',
                rules: [
                  { required: true, message: '角色名称不能为空' }
                ]
              })(
                <Input
                  placeholder="请输入要添加的角色名称" 
                />
              )
            }
          </Item>
        </Form>
      </div>
    )
  }
}

// 向AddForm 组件传一个form 对象
const wrapAddFormComponent = Form.create()(AddForm)
// 曝露出去包装后的组件对象，这里有两个知识点：高阶函数 和 高阶组件
export default wrapAddFormComponent
