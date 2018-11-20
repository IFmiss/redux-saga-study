export default function fetch (state = {}, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return{
        ...state,
        isReq: true
      }
    case 'FETCH_SUCCESS':
      let data = {
        ...state,
        fetchData: action.data,
        isReq: false
      }
      return data
    case 'FETCH_FAILED':
      return {
        ...state,
        err: action.e,
        isReq: false
      }
    default:
      return state
  }
}