// npm install axios
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Für lokale Entwicklung
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
