import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'

import { getTime } from '../../filter/format-time'
import { reqGetUserList, reqAddOrUpdateUser, reqRemoveUser } from '../../api/user'
import UserForm from '../../component/user/user-form/user-form'
const { confirm } = Modal

export default class User extends Component {
  state = {
    loading: true,
    showModal: false,
    users: [], // 用用户列表
    roles: [] // 角色列表
  }
  initColumns = () => {
    this.columns = [
      { title: '用户名', dataIndex: 'username'},
      { title: '邮箱', dataIndex: 'email'},
      { title: '电话', dataIndex: 'phone'},
      { 
        title: '注册时间', 
        dataIndex: 'createTime',
        render: (createTime) => getTime(createTime)
      },
      { 
        title: '所属角色', 
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      { 
        title: '操作', 
        dataIndex: '',
        render: (user) => (
          <span>
            <Button type="link" onClick={() => {this.handleUpdateUser(user)}}>修改</Button>
            <Button type="link" onClick={() => this.showConfirm(user)}>删除</Button>
          </span>
        )
      }
    ]
  }
  /*
    根据角色的数组生成一个包含所有角色名的对象容器
  */
  initRoleNames = (roles) => {
    this.roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
  }
  showConfirm = (user) => {
    confirm({
      title: '你确定要删除该用户吗？',
      okText: '确定',
      okType: 'warning',
      cancelText: '取消',
      onOk: async () => {
        const result = await reqRemoveUser(user)
        if (result.resultCode === 0) {
          message.success('删除用户成功')
          this.getUserList()
        } else {
          message.error(result.message)
        }
      }
    })
  }
  sendForm = (form) => {
    this.form = form
  }
  handleUpdateUser = (user) => {
    this.user = user
    this.setState({
      showModal: true
    })
  }
  handleAddUser = () => {
    this.user = null
    this.setState({
      showModal: true
    })
  }
  addUser = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const user = values
        if (this.user) {
          user._id = this.user._id
        }
        this.form.resetFields()
        this.setState({
          showModal: false
        })
        const result = await reqAddOrUpdateUser(user)
        if (result.resultCode === 0) {
          this.getUserList()
        }
      }
    })
  }
  getUserList = async () => {
    const result = await reqGetUserList()
    if (result.resultCode === 0) {
      const { users, roles } = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles,
        loading: false
      })
    }
  }
  componentWillMount () {
    this.initColumns()
  }
  componentDidMount () {
    this.getUserList()
  }
  render() {
    const { users, roles } = this.state
    const user = this.user || {}
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddUser}>创建用户</Button>
      </span>
    )
    return (
      <div className="category">
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            columns={this.columns}
            dataSource={users}
          >
          </Table>
        </Card>
        <Modal
          title={!this.user ? '添加用户' : '修改用户'}
          visible={this.state.showModal}
          onOk={this.addUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({
              showModal: false
            })
          }}
          okText="确认"
          cancelText="取消"
        >
          <UserForm user={user} roles={roles} sendForm={this.sendForm} />
        </Modal>
      </div>
    )
  }
}