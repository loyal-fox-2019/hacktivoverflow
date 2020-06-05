import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: `http://18.219.119.178:55554`
});

export default instance