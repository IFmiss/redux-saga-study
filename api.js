import https from './https'
export default {
  fetchData (url) {
    return new Promise((resolve, reject) => {
      https.get(url).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },

  storeItem (name, value) {
    window.localStorage.setItem(name, value)
  },
  clearItem (name) {
    window.localStorage.removeItem(name)
  },
  // 登陆
  subLogin (username, pwd) {
    return https.post('http://www.daiwei.org/vue/server/user.php?inAjax=1&do=login', {
      username: username,
      passworld: pwd,
      lastlogin: '2018-11-20 15:49:34',
      path: 'production'
    })
  }
}