import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Tree } from 'antd'

import menuList from '../../../config/menu-list'

const Item = Form.Item
const { TreeNode } = Tree

export default class AuthTree extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  }
  state = {
    checkedKeys: [] // 选中的所有树节点
  }
  // 生成treeNodes
  getTressNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          { item.children ? this.getTressNodes(item.children) : null }
        </TreeNode>
      )
      return pre
    }, [])
  }
  getMenus = () => this.state.checkedKeys
  onCheck = (checkedKeys, info) => {
    this.setState({
      checkedKeys
    })
  }
  componentWillMount () {
    this.treeNodes = this.getTressNodes(menuList)
  }
  componentDidMount () {
    const menus = this.props.role.menus
    this.setState({
      checkedKeys: menus
    })
  }
  // 当传入的新的props对象时，某一行
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    // this.state.checkedKeys = menus
    this.setState({
      checkedKeys: menus
    })
  }
  render() {
    // 指定 Item 布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧 label 的宽度
      wrapperCol: { span: 16 }, // 右侧包裹的宽度
    }
    const { checkedKeys } = this.state
    const roleName = this.props.role.name
    return (
      <div className="add-form">
        <Form>
          <Item label="角色名称" {...formItemLayout}>
          <Input value={roleName} disabled/>
          </Item>
        </Form>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            { this.treeNodes }
          </TreeNode>
        </Tree>
      </div>
    )
  }
}