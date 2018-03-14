'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_URL: '"http://localhost:3000"',
  CLIENT_ID: '"444399542573-802e5tggcegcc20ei5idq9h9q6sqaurg"'
})
