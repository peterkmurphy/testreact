import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
const meetupelem = document.getElementById('meetuplist')
const groupname = meetupelem.attributes['data-groupname'].value
const apikey = meetupelem.attributes['data-apikey'].value
render(
  <Provider store={store}>
    <App groupname={groupname} apikey={apikey} />
  </Provider>, meetupelem
)

registerServiceWorker();
