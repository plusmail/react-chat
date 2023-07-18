import axios from 'axios'

const host = window ? window.location.hostname : 'localhost'

const httpClient = axios.create({
  baseURL: `http://chat.yi.or.kr:5281/api/`
})

httpClient.interceptors.response.use(
  response => response,
  error => ({ error })
)

export default httpClient
