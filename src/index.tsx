import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App/index'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
