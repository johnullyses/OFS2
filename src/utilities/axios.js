import axios from 'axios'


const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 300000,
  headers: {
    'Accept': 'application/json',
  }
})

export { axiosInstance }
