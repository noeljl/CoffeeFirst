// npm install axios
import axios from 'axios'

const API = axios.create({
  // baseURL: 'http://localhost:3001/api', // Für lokale Entwicklung
  baseURL: 'https://rotaract-district-1866.de/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
