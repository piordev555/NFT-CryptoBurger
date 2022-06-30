import axios from 'axios'
import { appConfig } from '../config'

axios.defaults.baseURL = appConfig.API_URL || '/api'

export default axios
