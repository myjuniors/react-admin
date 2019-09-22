import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUntils from '../../untils/memory'
import Header from '../../component/header/header.jsx'
import LeftNav from '../../component/left-nav/left-nav.jsx'
import Home from '../home/home.jsx'
import Category from '../products/category.jsx'
import Product from '../products/product.jsx'
import User from '../user/user.jsx'
import Role from '../role/role.jsx'
import Bar from '../charts/bar.jsx'
import Line from '../charts/line.jsx'
import Pie from '../charts/pie.jsx'
const { Footer, Sider, Content } = Layout

export default class Admin extends Component {


  render() {
    const user = memoryUntils.user
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{backgroundColor: '#fff'}}>
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/products/category' component={Category}></Route>
              <Route path='/products/product' component={Product}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/charts/bar' component={Bar}></Route>
              <Route path='/charts/line' component={Line}></Route>
              <Route path='/charts/pie' component={Pie}></Route>
              <Redirect to='/home' />>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>后台管理系统-react版本 copyright @2019</Footer>
        </Layout>
      </Layout>
    )
  }
}