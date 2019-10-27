import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Modal } from 'antd'

import { reqWeather } from '../../api/common'
import menuList from '../../config/menu-list'
import { getTime } from '../../filter/format-time'
import { logout } from '../../redux/actions'

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
        this.props.logout()
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
    const username = this.props.user.username
    // const title = this.getPageTitle()
    // 从props里面接收要显示的headTitle
    const title = this.props.headTitle
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

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  { logout }
)(withRouter(Header))