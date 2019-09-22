import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import memoryUntils from './untils/memory'
import storeUntils from './untils/store'

const user = storeUntils.getUser()
if (user && user._id) {
  memoryUntils.user = user
}

ReactDOM.render(<App />, document.getElementById('root'))
