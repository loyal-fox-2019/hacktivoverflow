import axios from 'axios';

const axiosReq = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'http://35.198.230.91:3000'
});

export default axiosReq;