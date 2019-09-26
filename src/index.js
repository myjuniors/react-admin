import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './reudx/store'
import App from './App'
import memoryUntils from './untils/memory'
import storeUntils from './untils/store'

const user = storeUntils.getUser()
if (user && user._id) {
  memoryUntils.user = user
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
