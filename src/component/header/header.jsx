import React, { Component } from 'react'
import { Avatar, Menu, Dropdown, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import storeUntils from '../../untils/store'

import './header.less'

const onClick = ({ key }) => {
  if (key === '0') {
    storeUntils.removeUser()
    window.location.reload()
  }
}

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="0">退出登录</Menu.Item>
  </Menu>
)

class Header extends Component {
  

  render() {
    return (
      <div className="header">
        <div className="left-title"></div>
        <div className="user-info">
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="/">
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)