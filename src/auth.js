/* globals localStorage */
import axios from "axios";

export default {
  getToken() {
    return localStorage.getItem("token")
  },

  getUsername() {
    return localStorage.getItem("username")
  },

  logout(cb) {
    delete localStorage.token
    delete localStorage.role
    delete localStorage.username
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  isManager() {
    var user = this.parseJwt(JSON.parse(localStorage.getItem('token')))
    return user.role === "DATA_MANAGER"
  },
  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  },

  onChange() {}
}
