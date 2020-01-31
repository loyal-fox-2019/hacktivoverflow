import axios from 'axios'

const base = axios.create({
  baseURL: 'http://34.67.170.173/',
  headers: {'access_token': localStorage.getItem('access_token')}
})

export default base;