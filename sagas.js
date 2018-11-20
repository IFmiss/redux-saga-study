// import { delay, takeEvery } from 'redux-saga'
import { takeLatest } from 'redux-saga'
import API from './api'
import { put, all, call} from 'redux-saga/effects'
function* helloSaga () {
  console.log('hello saga!')
}

function* fetchData (actions) {
  yield put({type: 'FETCHING_DATA'})
  try {
    const data = yield call(API.fetchData, actions.url)
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
