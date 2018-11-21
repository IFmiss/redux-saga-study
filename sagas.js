import { delay, takeEvery } from 'redux-saga'
// import { takeLatest } from 'redux-saga'
import API from './api'
import { put, all, call, take, select, fork, cancel, cancelled} from 'redux-saga/effects'
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

// take 实现日志打印
function* watchAndLog () {
  while (true) {
    const action = yield take('*')
    const state = yield select()
    console.log('action -------------------', action)
    console.log('state after --------------', state)
  }
}

function* sub (username, pwd) {
  try{
    const req = yield call(API.subLogin, username, pwd)
    console.log(req)
    yield put({type: 'LOGIN_SUCCESS', token: req})
    yield call(API.storeItem, 'token', JSON.stringify(req))
    return req
  } catch (e) {
    yield put({type: 'LOGIN_ERROR', error: e})
  } finally {
    if (yield cancelled()) {
      alert('执行loginout导致登陆时候的action被取消')
      // ... put special cancellation handling code here
    }
  }
}

function* loginFlow () {
  while (true) {
    const {username, pwd} = yield take('LOGIN_REQUEST')
    const tesk = yield fork(sub, username, pwd)
  
    const action = yield take(['LOGIN_OUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGIN_OUT') {
      yield cancel(tesk)
    }
    yield call(API.clearItem, 'token')
  }
}

export default function* rootSaga () {
  yield all ([
    helloSaga(),
    watchFetchData(),
    watchAndLog(),
    loginFlow()
  ])
}
