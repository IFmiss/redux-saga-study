import { delay, takeEvery } from 'redux-saga'
// import { takeLatest } from 'redux-saga'
import API from './api'
import { put, all, call, take, select} from 'redux-saga/effects'
function* helloSaga () {
  console.log('hello saga!')
}

function fetchData (url) {
  return API.fetchData(url)
  .then(response => ({ response }))
  .catch(error => ({ error }))
}

function* requestData (actions) {
  yield put({type: 'FETCHING_DATA'})
  const { response, error } = yield call(fetchData, actions.url)
  if (response) {
    // 通过put 去dispath一个action，带类型以及其他参数
    yield put({type: 'FETCH_SUCCESS', data: response})
  } else {
    yield put({type: 'FETCH_FAILED', e: error})
  }
}

function* watchFetchData () {
  yield* takeEvery('FETCH_REQUESTED', requestData)
}

// function* watchAndLog () {
//   yield takeEvery('*', function* logger(action) {
//     const state = yield select()
//     console.log('action -------------------', action)
//     console.log('state after --------------', state)
//   })
// }

// take 实现日志打印
function* watchAndLog () {
  while (true) {
    const action = yield take('*')
    const state = yield select()
    console.log('action -------------------', action)
    console.log('state after --------------', state)
  }
}

export default function* rootSaga () {
  yield all ([
    helloSaga(),
    watchFetchData(),
    watchAndLog()
  ])
}
