import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import memoryUntils from '../../untils/memory'

export default class Admin extends Component {


  render() {
    const user = memoryUntils.user
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        Hello {user.username}
      </div>
    )
  }
}