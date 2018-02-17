/* globals localStorage */
import axios from "axios";

export default {
  login (username, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    var userData = {
      username: username,
      password: pass
    }
    axios.post("http://localhost:3000/authenticate", userData).then((res) => {
      if (res.data.authenticated) {
        localStorage.token = res.token
        localStorage.setItem('user', JSON.stringify(res.data))
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    }).catch(function(err) {
      console.log(err)
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
  },

  loggedIn () {
    return !!localStorage.token
  },

  isManager () {
    var user = JSON.parse(localStorage.getItem('user'))
    return user.role === "DATA_MANAGER"
  }
}
