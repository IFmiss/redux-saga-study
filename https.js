import axios from 'axios'
let https = axios.create({
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})
export default https