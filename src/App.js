import React, { Component } from 'react'
import { Button, message } from 'antd'

export default class App extends Component {
  tipsHandle = () => {
    message.success('点击成功了。。。')
  }
  render () {
    return (
      <div>
        <Button type="primary" onClick={ this.tipsHandle }>测试代码</Button>
      </div>
    )
  }
}