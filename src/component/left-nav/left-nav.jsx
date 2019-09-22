import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './left-nav.less'
import logo from './images/left-logo.jpg'
const { SubMenu } = Menu

export default class LeftNav extends Component {

  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="header">
          <img src={logo} className="logo" />
        </Link>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>首页</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <span>
                <Icon type="mail" />
                <span>品类管理</span>
              </span>
            </Menu.Item>
            <Menu.Item key="6">
            <span>
              <Icon type="mail" />
              <span>商品管理</span>
            </span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}