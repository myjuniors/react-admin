import React, { Component } from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'

const AddBtn = (
  <Button icon='plus' type='primary'>添加</Button>
)

const data = [
  {
    name: '酒水',
    key: 1
  },
  {
    name: '水果',
    key: 2
  }, 
  {
    name: '辣条',
    key: 3
  }, 
  {
    name: '纸巾',
    key: 4
  }, 
  {
    name: '毛巾',
    key: 5
  }
]

const columns = [
  { title: '分类', dataIndex: 'name'},
  {
    title: '操作',
    dataIndex: '',
    key: '2',
    width: 300,
    render: () => (<span>
      <Button type='link'>添加</Button>
      <Button type='link'>删除</Button>
    </span>)
  }
]

export default class Category extends Component {
  render() {
    return (
      <div className="category">
        <Card title="一级分类列表" extra={AddBtn}>
          <Table
            bordered
            columns={columns}
            dataSource={data}
          >

          </Table>

        </Card>
      </div>
    )
  }
}