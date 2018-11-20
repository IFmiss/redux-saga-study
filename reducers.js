import {combineReducers} from 'redux'
let initFetchState = {
  isReq: false,
  fetchData: {},
  err: ''
}
function fetch (state = initFetchState, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return Object.assign({}, state, {
        isReq: true
      })
    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        fetchData: action.data,
        isReq: false,
      })
    case 'FETCH_FAILED':
      return Object.assign({}, state, {
        fetchData: action.data,
        isReq: false,
        err: action.e
      })
    default:
      return state
  }
}

let initLoginState = {
  isReq: false,
  detail: {},
  err: ''
}
function loginRequest (state=initLoginState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state, {
        isReq: true
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isReq: false,
        detail: action.token.data
      })
    case 'LOGIN_ERROR':
      return Object.assign({}, state, {
        isReq: false,
        err: action.error
      })
    case 'LOGIN_OUT':
      return Object.assign({}, state, {
        isReq: false,
        detail: {}
      })
    default:
      return state
  }
}

export default combineReducers ({
  fetch: fetch,
  loginRequest: loginRequest
})