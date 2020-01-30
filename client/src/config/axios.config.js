import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://52.221.236.249:3000'
})

export default instance