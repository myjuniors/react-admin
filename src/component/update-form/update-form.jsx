import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const { Option } = Select

class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    sendForm: PropTypes.func.isRequired
  }
  componentDidMount () {
    const form = this.props.form
    console.log(form)
    this.props.sendForm(form)
  }
  render() {
    const form = this.props.form
    const { getFieldDecorator } = form
    const categoryName = this.props.categoryName
    return (
      <div className="add-form">
        <Form>
          <Item>
            { 
              getFieldDecorator('categoryName', {
                initialValue: categoryName
              })(
                <Input
                  placeholder="请输入要添加的分类名称" 
                />
              )
            }
          </Item>
        </Form>
      </div>
    )
  }
}

const wrapUpdateFormComponent = Form.create()(UpdateForm)
// 曝露出去包装后的组件对象，这里有两个知识点：高阶函数 和 高阶组件
export default wrapUpdateFormComponent