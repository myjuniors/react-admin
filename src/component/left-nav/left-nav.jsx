import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './left-nav.less'
import logo from './images/left-logo.jpg'
import menuList from '../../config/menu-list'
const { SubMenu } = Menu

class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        // 在这里给组件对象添加 openKey的属性
        const cItem = item.children.find(cItem => {
          return cItem.key === path
        })
        if (cItem) {
          this.openKey = item.key
        }
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            { this.getMenuNodes(item.children) }
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }
  // 可以放同步的代码，只执行一次
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    const path = this.props.location.pathname
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="header">
          <img src={logo} className="logo" alt='logo'/>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          { this.menuNodes }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)