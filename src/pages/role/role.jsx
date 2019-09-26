import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'

import AddForm from '../../component/role/add-form/add-form'
import AuthTree from '../../component/role/auth-tree/auth-tree'
import { getTime } from '../../filter/format-time'
import memoryUntils from '../../untils/memory'
import storeUntils from '../../untils/store'
import { reqAddRole, reqGetRoles, reqSetPremission } from '../../api/role'

export default class Role extends Component {
  state = {
    showRoleModal: false,
    showPremissionModal: false,
    loading: true,
    roles: [], // 角色列表
    role: {} // 选中的当前角色
  }

  constructor (props) {
    super(props)
    this.premission = React.createRef()
  }
  sendForm = (form) => {
    this.form = form
  }
  addRole = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const { roleName } = values
        const result = await reqAddRole(roleName)
        if (result.resultCode === 0) {
          this.setState({
            showRoleModal: false
          })
          this.form.resetFields()
          const role = result.data
          // 下面这种方式来更新状态数据： 当向原始数据添加或者删除数据时，操作的是原始数据用下面这种方式，其他用对象的方式
          this.setState(state => ({
            roles: [...state.roles, role]
          }))
          message.success('添加角色成功')
        } else {
          message.error('添加角色失败')
        }
      }
    })
  }
  addPremission = async () => {
    const { role } = this.state
    const name = memoryUntils.user.username
    role.menus = this.premission.current.getMenus()
    role.authName = name
    role.meta.authTime = Date.now()
    const result = await reqSetPremission(role)

    if (result.resultCode === 0) {
      if (memoryUntils.user.role_id === role._id) {
        memoryUntils.user = {}
        storeUntils.removeUser()
        this.props.history.replace('/login')
      }
      this.setState({
        showPremissionModal: false,
        roles: [...this.state.roles]
      })
      message.success('权限设置成功了，请重新登录')
    }
  }
  handleAddRole = () => {
    this.setState({
      showRoleModal: true
    })
  }
  handleAddPremission = () => {
    this.setState({
      showPremissionModal: true
    })
  }
  fetchRoleList = async () => {
    const result = await reqGetRoles()
    if (result.resultCode === 0) {
      const roles = result.data
      this.setState({
        loading: false,
        roles
      })
    }
  }
  initColumns = () => {
    this.columns = [
      { title: '角色名称', dataIndex: 'name'},
      { 
        title: '创建时间', 
        dataIndex: 'meta.createTime',
        render: (createTime) => {
          return getTime(createTime)
        }
      },
      { 
        title: '授权时间', 
        dataIndex: 'meta.authTime',
        render: (authTime) => {
          return getTime(authTime)
        }
      },
      { title: '授权人', dataIndex: 'authName'}
    ]
  }
  componentWillMount () {
    this.initColumns()
  }
  componentDidMount () {
    this.fetchRoleList()
  }
  render() {
    const { loading, roles, role } = this.state

    const title = (
      <span>
        <Button type="primary" style={{marginRight: 30}} onClick={this.handleAddRole}>创建角色</Button>
        <Button type="primary" disabled={!role._id} onClick={this.handleAddPremission}>设置角色权限</Button>
      </span>
    )
    return (
      <div className="category">
        <Card title={title}>
          <Table
            bordered
            loading={loading}
            rowKey='_id'
            columns={this.columns}
            dataSource={roles}
            rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
            onRow={role => {
              return {
                onClick: event => {
                  this.setState({
                    role
                  })
                }
              }
            }}
          >
          </Table>
        </Card>
        <Modal
          title="角色添加"
          visible={this.state.showRoleModal}
          onOk={this.addRole}
          onCancel={() => {
            this.form.resetFields()
            this.setState({
              showRoleModal: false
            })
          }}
          okText="确认"
          cancelText="取消"
        >
          <AddForm sendForm={this.sendForm} />
        </Modal>
        <Modal
          title="权限添加"
          visible={this.state.showPremissionModal}
          onOk={this.addPremission}
          onCancel={() => {
            this.setState({
              showPremissionModal: false
            })
          }}
          okText="确认"
          cancelText="取消"
        >
          <AuthTree ref={this.premission} role={role} />
        </Modal>
      </div>
    )
  }
}
