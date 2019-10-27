import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'

import './left-nav.less'
import logo from './images/left-logo.jpg'
import menuList from '../../config/menu-list'
import {
  setHeadTitle
} from '../../redux/actions'
const { SubMenu } = Menu

class LeftNav extends Component {

  hasPremission = (item) => {
    const { key, isPublic } = item
    const menus = this.props.user.role ? this.props.user.role.menus : []
    const username = this.props.user.username
    /*
      1. 如果菜单项标识为公开
      2. 如果当前用户是 admin
      3. 如果菜单项的 key 在用户的 menus 中
   */
    if (isPublic || username==='会飞的鱼' || menus.indexOf(key) !== -1) {
      return true
      // 4. 如果有子节点, 需要判断有没有一个 child 的 key 在 menus 中
    } else if(item.children) {
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    } 
    return false
  }

  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    // 如果当前请求的是根路径, 设置头部标题为首页
    if(path === '/') {
      this.props.setHeadTitle('首页')
    }
    return menuList.reduce((pre, item) => {
      if (this.hasPremission(item)) {
        if (!item.children) {
          if (item.key === path || path.indexOf(item.key) !== -1) {
            this.props.setHeadTitle(item.title)
          }

          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
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

export default connect(
  state => ({user: state.user}),
  { setHeadTitle }
)(withRouter(LeftNav))