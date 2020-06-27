import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer, { AppState } from './reducers'

const configureStore = (preloadedState?: AppState) =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

export default configureStore
