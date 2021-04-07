import axios from 'axios'
import { APP_ID, API_KEY } from '../config'

export default axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2/',
  headers: {
    'Content-Type': 'application/json',
    'x-app-id': APP_ID,
    'x-app-key': API_KEY
  }
})
