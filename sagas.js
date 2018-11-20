// import { delay, takeEvery } from 'redux-saga'
import { takeLatest } from 'redux-saga'
import API from './api'
import { put, all, apply, take} from 'redux-saga/effects'
function* helloSaga () {
  console.log('hello saga!')
}

function* fetchData (actions) {
  yield put({type: 'FETCHING_DATA'})
  try {
    const data = yield apply(API, API.fetchData, [actions.url])
    // 通过put 去dispath一个action，带类型以及其他参数
    yield put({type: 'FETCH_SUCCESS', data})
  } catch (e) {
    yield put({type: 'FETCH_FAILED', e})
  }
}


function* watchFetchData () {
  yield* takeLatest('FETCH_REQUESTED', fetchData)
}

export default function* rootSaga () {
  yield all ([
    helloSaga(),
    watchFetchData()
  ])
}
