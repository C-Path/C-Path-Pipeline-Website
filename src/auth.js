/* globals localStorage */
import axios from "axios";

export default {
  // login (email, pass, cb) {
  //   cb = arguments[arguments.length - 1]
  //   if (localStorage.token) {
  //     if (cb) cb(true)
  //     this.onChange(true)
  //     return
  //   }
  //   pretendRequest(email, pass, (res) => {
  //     if (res.authenticated) {
  //       localStorage.token = res.token
  //       localStorage.setItem('user', JSON.stringify(res))
  //       if (cb) cb(true)
  //       this.onChange(true)
  //     } else {
  //       if (cb) cb(false)
  //       this.onChange(false)
  //     }
  //   })
  // },
  login (username, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    var userData = {
      usnermae: username,
      password: pass
    }
    axios.post("http://localhost:3000/authenticate", userData).then(function(res) {
      if (res.authenticated) {
        console.log('true')
        localStorage.token = res.token
        localStorage.setItem('user', JSON.stringify(res))
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        console.log('false')
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
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  isManager () {
    var user = JSON.parse(localStorage.getItem('user'))
    return user.role == "DATA_MANAGER"
  },

  onChange () {}
}

function pretendRequest (email, pass, cb) {
  setTimeout(() => {
    if (email === 'isaac@cpath.org' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
        role: 'USER'
      })
    } else if (email === 'merrill@cpath.org' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
        role: 'DATA_MANAGER'
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
