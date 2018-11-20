import axios from 'axios'
export default {
  fetchData (url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}