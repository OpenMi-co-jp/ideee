import axios from 'axios'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }, // CSRF 対策
  withCredentials: true,
})

export default client
