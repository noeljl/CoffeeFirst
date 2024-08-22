// npm install axios
import axios from 'axios'

const API = axios.create({
  // baseURL: 'http://localhost:3001/api', // Für lokale Entwicklung
  baseURL: 'http://backend:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
