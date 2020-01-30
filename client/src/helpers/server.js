import axios from 'axios'

const server = axios.create({
  baseURL: `http://3.1.205.251`
  // baseURL: 'http://localhost:3000'
})

export default server
