import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@redux'
import { ViewportProvider } from '@hook/useViewport'
import AppList from './pages/AppList'
import 'lib-flexible'
import 'normalize.css/normalize.css'
import './style/common.scss'

ReactDOM.render(
  <Provider store={store}>
    <ViewportProvider>
      <AppList />
    </ViewportProvider>
  </Provider>,
  document.getElementById('root')
)
