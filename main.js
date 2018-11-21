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
    <div>
      <Counter
      value={store.getState().fetch}
      isFetch={store.getState().fetch.isReq}
      onFetchData={() => store.dispatch({type: 'FETCH_REQUESTED', url: 'http://www.daiwei.org/vue/server/home.php?inAjax=1&do=getImageByBingJson'})}/>
    </div>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
