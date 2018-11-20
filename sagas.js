// import { delay, takeEvery } from 'redux-saga'
import { takeLatest } from 'redux-saga'
import API from './api'
import { put, all, call, take} from 'redux-saga/effects'
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
  yield* takeLatest('FETCH_REQUESTED', requestData)
}

export default function* rootSaga () {
  yield all ([
    helloSaga(),
    watchFetchData()
  ])
}
