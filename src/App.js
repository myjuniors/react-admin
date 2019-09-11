import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './component/login/login.jsx'
import Admin from './component/admin/admin.jsx'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}