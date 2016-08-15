import { applyMiddleware, combineReducers, createStore } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import * as reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  collapsed: true
})

const createStoreWithMiddleware = applyMiddleware(
  logger,
  sagaMiddleware,
)(createStore)

const rootReducer = combineReducers(reducers)

const store = createStoreWithMiddleware(rootReducer)

sagaMiddleware.run(sagas)

export default store

