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
        document.cookie = "username=" + JSON.parse(localStorage.getItem('user')).username
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
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    delete document.cookie
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  isManager () {
    var user = JSON.parse(localStorage.getItem('user'))
    return user.role === "DATA_MANAGER"
  },
<<<<<<< HEAD
  
  onChange () {}
=======

  onChange() {}
>>>>>>> saving comments and file name working
}
