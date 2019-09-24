import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import AddForm from '../../component/add-form/add-form'
import UpdateForm from '../../component/update-form/update-form'
import { reqAddCategory, reqCategoryList, reqUpdateCategory } from '../../api/category'

export default class Category extends Component {
  state = {
    showModal: 0, // 是否显示模态框 0 添加和修改模态框都不显示 1 添加模态框显示  2 修改模态框显示
    loading: true,
    form: {},
    parentId: '0',  // 查询分类id
    categoryName: '', // 分类名称
    categorys: [], //  分类列表
    columns: []
  }
  sendForm = (form) => {
    this.setState({
      form
    })
  }
  addCategory = async () => {
    const form = this.state.form
    const parentId = form.getFieldValue('parentId')
    const categoryName = form.getFieldValue('categoryName')
    const result = await reqAddCategory({parentId, categoryName})
    if (result.resultCode === 0) {
      message.success(result.message)
      this.setState({
        showModal: 0,
        loading: true
      })
      form.resetFields()
      this.fetchCategoryList()
    }
  }
  updateCategory = async () => {
    const form = this.state.form
    const parentId = this.state.parentId
    const categoryName = form.getFieldValue('categoryName')
    const result = await reqUpdateCategory({parentId, categoryName})
    if (result.resultCode === 0) {
      message.success('修改成功了')
      this.setState({
        showModal: 0,
        loading: true
      })
      form.resetFields()
      this.fetchCategoryList()
    }
  }
  handleAddCategory = () => {
    this.setState({
      showModal: 1
    })
  }
  handleUpdateCategory = (category) => {
    this.setState({
      showModal: 2,
      categoryName: category.name
    })
  }
  initColumns = () => {
    this.columns = [
      { title: '分类名称', dataIndex: 'name'},
      {
        title: '操作',
        dataIndex: '',
        key: '2',
        width: 300,
        render: (category) => (<span>
          <Button type='link' onClick={() => this.handleUpdateCategory(category)}>修改分类</Button>
          <Button type='link'>查看子分类</Button>
        </span>)
      }
    ]
  }
  fetchCategoryList = async () => {
    const parentId = this.state.parentId
    const result = await reqCategoryList({parentId})
    if (result.resultCode === 0) {
      const categorys = result.data
      this.setState({
        categorys,
        loading: false
      })
    }
  }
  componentWillMount () {
    this.initColumns()
  }
  componentDidMount () {
    this.fetchCategoryList()
  }
  render() {
    const AddBtn = (
      <Button icon='plus' type='primary' onClick={this.handleAddCategory}>添加</Button>
    )
    const title = '一级分类列表'
    const categorys = this.state.categorys || []
    const categoryName = this.state.categoryName
    const loading = this.state.loading

    return (
      <div className="category">
        <Card title={title} extra={AddBtn}>
          <Table
            bordered
            loading={loading}
            rowKey='_id'
            columns={this.columns}
            dataSource={categorys}
          >
          </Table>
        </Card>
        <Modal
          title="分类添加"
          visible={this.state.showModal === 1}
          onOk={this.addCategory}
          onCancel={() => {
            this.state.form.resetFields()
            this.setState({
              showModal: 0
            })
          }}
          okText="确认"
          cancelText="取消"
        >
          <AddForm categorys={categorys} sendForm={this.sendForm} />
        </Modal>
        <Modal
          title="分类修改"
          visible={this.state.showModal === 2}
          onOk={this.updateCategory}
          onCancel={() => {
            this.state.form.resetFields()
            this.setState({
              showModal: 0
            })
          }}
          okText="确认"
          cancelText="取消"
        >
          <UpdateForm categoryName={categoryName} sendForm={this.sendForm} />
        </Modal>
      </div>
    )
  }
}