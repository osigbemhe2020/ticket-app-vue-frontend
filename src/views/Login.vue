<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div class="max-w-md w-full space-y-8 p-8 bg-slate-800 rounded-lg shadow-md border border-slate-700">
      <h2 class="text-center text-3xl font-bold text-white">Login</h2>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="rounded-md space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-400">Username:</label>
            <input
              type="text"
              v-model="formData.username"
              required
              class="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-400">Password:</label>
            <input
              type="password"
              v-model="formData.password"
              required
              class="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div v-if="error" class="text-red-400 text-sm">{{ error }}</div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
        <div class="text-center">
          <router-link to="/signup" class="text-sm text-slate-400 hover:text-slate-300">
            Don't have an account? Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userService } from '../services/api'

const router = useRouter()
const formData = ref({
  username: '',
  password: ''
})
const error = ref('')

const handleSubmit = async () => {
  try {
    const user = await userService.login(formData.value.username, formData.value.password)
    
    if (user) {
      console.log('Login successful!', user)
      error.value = ''
      sessionStorage.setItem('ticketapp_session', JSON.stringify(user))
      formData.value = { username: '', password: '' }
      router.push('/dashboard')
    } else {
      error.value = 'Invalid username or password'
    }
  } catch (err) {
    error.value = 'Invalid username or password'
    console.error('Login error:', err)
  }
}
</script>