import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000/'
})

// export default axios.create({
//   baseURL: 'http://3.17.138.170/'
// })
