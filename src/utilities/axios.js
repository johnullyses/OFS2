import axios from 'axios'


const axiosInstance = axios.create({
  baseURL: 'http://localhost/ofs_api/public/index.php',
  timeout: 300000,
  headers: {
    'Accept': 'application/json',
  }
})

export { axiosInstance }
