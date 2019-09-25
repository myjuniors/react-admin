import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal } from 'antd'

import storeUntils from '../../untils/store'
import memoryUntils from '../../untils/memory'
import { reqWeather } from '../../api/common'
import menuList from '../../config/menu-list'
import { getTime } from '../../filter/format-time'

import './header.less'

const { confirm } = Modal

class Header extends Component {
  state = {
    time: '',
    dayPictureUrl: '',
    weather: ''
  }
  getWeather = async (city) => {
    const { dayPictureUrl, weather } = await reqWeather(city)
    this.setState({ dayPictureUrl, weather })
  }
  getPageTitle = () => {
    let title
    const path = this.props.location.pathname
    menuList.forEach(menu => {
      if (menu.key === path) {
        title = menu.title
      } else {
        if (menu.children) {
          const child = menu.children.find(child => {
            return child.key === path
          })
          if (child) {
            title = child.title
          }
        }
      }
    })
    return title
  }
  showConfirm = () => {
    confirm({
      title: '你确定要退出登录吗？',
      okText: '确定',
      okType: 'warning',
      cancelText: '取消',
      onOk: () => {
        storeUntils.removeUser()
        memoryUntils.user = {}
        this.props.history.replace('/login')
      }
    })
  }
  handleLogout = () => {
    this.showConfirm()
  }
  componentDidMount () {
    this.timer = setInterval(() => {
      const time = getTime(Date.now())
      this.setState({time})
    }, 1000)
    this.getWeather('北京')
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render() {
    const username = memoryUntils.user.username
    const title = this.getPageTitle()
    const { time, dayPictureUrl, weather } = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎 {username}</span>
          <Button type="link" onClick={this.handleLogout}>
          退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{time}</span>
            <img src={dayPictureUrl} alt='weather' />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)