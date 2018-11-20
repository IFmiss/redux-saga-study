import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'

import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

// const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      isFetch={store.getState().isReq}
      onFetchData={() => store.dispatch({type: 'FETCH_REQUESTED', url: 'http://www.daiwei.org/vue/server/home.php?inAjax=1&do=getImageByBingJson'})}/>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
