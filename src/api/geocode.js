import axios from 'axios'
import { GOOGLE_API_KEY } from '../config'

export default axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode',
  params: { key: GOOGLE_API_KEY }
})
