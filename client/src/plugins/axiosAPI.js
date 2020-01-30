import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000/',
    haeders: {
        token: localStorage.getItem('token')
    }
})