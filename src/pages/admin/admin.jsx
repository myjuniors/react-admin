import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import memoryUntils from '../../untils/memory'

export default class Admin extends Component {


  render() {
    const user = memoryUntils.user
    if (!user || !user.id) {
      return <Redirect to='/logiin' />
    }
    return (
      <div>
        Hello {user.username}
      </div>
    )
  }
}