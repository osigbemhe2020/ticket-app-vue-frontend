import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ticket-app-vue-backend-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const userService = {
  async register(userData) {
    const response = await api.post('/users', userData)
    return response.data
  },
  
  async login(username, password) {
    const response = await api.get('/users')
    const user = response.data.find(
      u => u.username === username && u.password === password
    )
    return user
  },
  
  async getAll() {
    const response = await api.get('/users')
    return response.data
  }
}

export const ticketService = {
  // Get all tickets (for admin purposes)
  async getAll() {
    const response = await api.get('/tickets')
    return response.data
  },
  
  // Get tickets for specific user only
  async getByUser(userId) {
    const response = await api.get(`/tickets?userId=${userId}`)
    return response.data
  },
  
  async create(ticket) {
    const response = await api.post('/tickets', ticket)
    return response.data
  },
  
  async update(id, ticket) {
    const response = await api.put(`/tickets/${id}`, ticket)
    return response.data
  },
  
  async delete(id) {
    await api.delete(`/tickets/${id}`)
  }
}

export default api