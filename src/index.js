import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import PersonPage from './containers/person/person-props-map'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css'
import configureStore from './redux/store/configure-store'

const store = configureStore()

render(
  <Provider store={store}>
    <PersonPage />
  </Provider>,
  document.getElementById('root')
)
