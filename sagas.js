import { delay, takeEvery } from 'redux-saga'
// import { takeLatest } from 'redux-saga'
import API from './api'
import { put, all, call, take, select, race} from 'redux-saga/effects'
function* helloSaga () {
  console.log('hello saga!')
}

function* requestData (actions) {
  yield put({type: 'FETCHING_DATA'})
  const { posts, timeout } = yield race({
    posts: call(API.fetchData, actions.url),
    timeout: call(delay, 1000)
  })
  console.log(posts)
  if (posts) {
    if (posts.data) {
      // 通过put 去dispath一个action，带类型以及其他参数
      yield put({type: 'FETCH_SUCCESS', data: posts.data})
    } else {
      yield put({type: 'FETCH_FAILED', e: posts})
    }
  } else {
    yield put({type: 'FETCH_FAILED', e: '请求超时了哦哦哦哦！！！！！'})
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

export default function* rootSaga () {
  yield all ([
    helloSaga(),
    watchFetchData(),
    watchAndLog()
  ])
}
