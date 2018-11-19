import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
function* helloSaga () {
  console.log('hello saga!')
}

function* INCREMENT_ASYNC () {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

function* WATCH_INCREMENT_ASYNC () {
  yield takeEvery('INCREMENT_ASYNC', INCREMENT_ASYNC)
}

function* DECREMENT_ASYNC () {
  yield delay(1000)
  yield put({ type: 'DECREMENT' })
}

function* WATCH_DECREMENT_ASYNC () {
  yield takeEvery('DECREMENT_ASYNC', DECREMENT_ASYNC)
}

export default function* rootSaga () {
  yield all ([
    helloSaga(),
    WATCH_INCREMENT_ASYNC(),
    WATCH_DECREMENT_ASYNC()
  ])
}
