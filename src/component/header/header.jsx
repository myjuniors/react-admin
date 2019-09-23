import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import moment from 'moment'

import storeUntils from '../../untils/store'
import memoryUntils from '../../untils/memory'
import { reqWeather } from '../../api/common'
import menuList from '../../config/menu-list'

import './header.less'

class Header extends Component {
  state = {
    time: '',
    dayPictureUrl: '',
    weather: ''
  }
  getTime = () => {
    const time = Date.now()
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
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
  handleLogout = () => {
    storeUntils.removeUser()
    memoryUntils.user = {}
    this.props.history.replace('/login')
  }
  componentDidMount () {
    this.timer = setInterval(() => {
      const time = this.getTime()
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