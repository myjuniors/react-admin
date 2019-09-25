import React, { Component } from 'react'
import { Card, Table, Button, message, Modal, Icon } from 'antd'
import AddForm from '../../component/category/add-form/add-form'
import UpdateForm from '../../component/category/update-form/update-form'
import { reqAddCategory, reqCategoryList, reqUpdateCategory } from '../../api/category'

export default class Category extends Component {
  state = {
    showModal: 0, // 是否显示模态框 0 添加和修改模态框都不显示 1 添加模态框显示  2 修改模态框显示
    loading: true,
    parentId: '0',  // 查询分类id
    categoryId: '', // 分类id
    categoryName: '', // 分类名称
    categorys: [], //  一级分类列表
    subCategorys: [], // 二级分类列表
    columns: []
  }
  sendForm = (form) => {
    this.form = form
  }
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const categoryId = this.form.getFieldValue('categoryId')
        const { categoryName } = values
        const result = await reqAddCategory({categoryId, categoryName})
        if (result.resultCode === 0) {
          message.success(result.message)
          this.setState({
            showModal: 0
          })
          this.form.resetFields()
          if (categoryId === this.state.parentId) {
            this.fetchCategoryList()
          }
        }
      }
    })
  }
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const categoryId = this.state.categoryId
        const { categoryName } = values
        const result = await reqUpdateCategory({categoryId, categoryName})
        if (result.resultCode === 0) {
          message.success('修改成功了')
          this.setState({
            showModal: 0,
            loading: true
          })
          this.form.resetFields()
          this.fetchCategoryList()
        }
      }
    })
  }
  handleAddCategory = () => {
    this.setState({
      showModal: 1
    })
  }
  handleUpdateCategory = (category) => {
    this.setState({
      showModal: 2,
      categoryId: category._id,
      categoryName: category.name
    })
  }
  hanleWatchCategorys = () => {
    this.setState({
      parentId: '0',
      categorys: [],
      categoryName: ''
    }, () => {
      this.fetchCategoryList()
    })
  }
  handleWatchSubCategory = (category) => {
    this.setState({
      parentId: category._id,
      categoryName: category.name
    }, () => {
      const parentId = this.state.parentId
      this.fetchCategoryList(parentId)
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
          {category.parentId === '0' ? (<Button type='link' onClick={() => this.handleWatchSubCategory(category)}>查看子分类</Button>) : null}
        </span>)
      }
    ]
  }
  fetchCategoryList = async (parentId) => {
    parentId = parentId || this.state.parentId
    const result = await reqCategoryList({parentId})
    if (result.resultCode === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.setState({
          categorys,
          loading: false
        })
      } else {
        this.setState({
          subCategorys: categorys,
          loading: false
        })
      }
    }
  }
  componentWillMount () {
    this.initColumns()
  }
  componentDidMount () {
    this.fetchCategoryList()
  }
  render() {
    const parentId = this.state.parentId
    const categorys = this.state.categorys || []
    const subCategorys = this.state.subCategorys || []
    const categoryName = this.state.categoryName
    const loading = this.state.loading

    const AddBtn = (
      <Button icon='plus' type='primary' onClick={this.handleAddCategory}>添加</Button>
    )
    const title = (
      parentId === '0' ? '一级分类列表' : (
        <span>
          <span style={{color: '#1DA57A', cursor: 'pointer'}} onClick={this.hanleWatchCategorys}>一级分类列表</span>
          <Icon type='arrow-right' style={{margin: '0 20px'}}></Icon>
          <span>{categoryName}</span>
        </span>
      )
    )
    return (
      <div className="category">
        <Card title={title} extra={AddBtn}>
          <Table
            bordered
            loading={loading}
            rowKey='_id'
            columns={this.columns}
            dataSource={parentId === '0' ? categorys : subCategorys}
          >
          </Table>
        </Card>
        <Modal
          title="分类添加"
          visible={this.state.showModal === 1}
          onOk={this.addCategory}
          onCancel={() => {
            this.form.resetFields()
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
            this.form.resetFields()
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