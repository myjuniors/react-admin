import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const { Option } = Select

class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
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
    const categorys = this.props.categorys
    return (
      <div className="add-form">
        <Form>
          <Item>
            { 
              getFieldDecorator('parentId', {
                initialValue: '0'
              })(
                <Select>
                  <Option key="0" value="0">一级分类</Option>
                  { 
                    categorys.map(category => {
                      return <Option key={category._id} value={category._id}>{category.name}</Option>
                    })
                  }
                </Select>
              )
            }
          </Item>
          <Item>
            { 
              getFieldDecorator('categoryName', {
                initialValue: ''
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

// 向AddForm 组件传一个form 对象
const wrapAddFormComponent = Form.create()(AddForm)
// 曝露出去包装后的组件对象，这里有两个知识点：高阶函数 和 高阶组件
export default wrapAddFormComponent