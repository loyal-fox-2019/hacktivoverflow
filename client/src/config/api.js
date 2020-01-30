const axios = require('axios')

const instance = axios.create({
  // baseURL: 'https://hoverflowserver.amilhasbala.com'
  baseURL: 'http://localhost:80'
})

export default instance
