<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div class="max-w-md w-full space-y-8 p-8 bg-slate-800 rounded-lg shadow-md border border-slate-700">
      <h2 class="text-center text-3xl font-bold text-white">Sign Up</h2>
      
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
          <div>
            <label class="block text-sm font-medium text-slate-400">Confirm Password:</label>
            <input
              type="password"
              v-model="formData.confirm_password"
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
            Sign Up
          </button>
        </div>
        <div class="text-center">
          <router-link to="/login" class="text-sm text-slate-400 hover:text-slate-300">
            Already have an account? Login
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
  password: '',
  confirm_password: ''
})
const error = ref('')

const handleSubmit = async () => {
  if (formData.value.password !== formData.value.confirm_password) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: formData.value.username,
      password: formData.value.password
    }

    await userService.register(newUser)
    console.log('User registered successfully:', newUser)
    
    formData.value = {
      username: '',
      password: '',
      confirm_password: ''
    }
    error.value = ''
    
    router.push('/login')
  } catch (err) {
    error.value = 'Registration failed. Please try again.'
    console.error('Registration error:', err)
  }
}
</script>