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
    axios.post(process.env.SERVER_URL + "/authenticate", userData).then((res) => {
      if (res.data.authenticated) {
        localStorage.setItem('token', JSON.stringify(res.data.token))

        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    }).catch(function(err) {
      console.log(err)
    })
  },

  getToken () {
    return JSON.parse(localStorage.getItem('token'))
  },

  getUsername () {
    return this.parseJwt(JSON.parse(localStorage.getItem('token'))).username
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  isManager () {
    var user = this.parseJwt(JSON.parse(localStorage.getItem('token')))
    return user.role === "DATA_MANAGER"
  },
  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  },

  onChange () {}
}
