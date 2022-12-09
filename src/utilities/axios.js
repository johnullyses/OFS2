import axios from 'axios'


const axiosInstance = axios.create({
  baseURL: 'http://15.235.86.171:10005/ofs_api/public/index.php/api/login',
  timeout: 300000,
  headers: {
    'Accept': 'application/json',
  }
})

export { axiosInstance }
