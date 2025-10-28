<template>
  <div class="min-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <header class="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="text-sm text-slate-400">
            Signed in as <span class="text-slate-200 font-medium">{{ user?.username }}</span>
          </span>
          <button
            @click="handleLogout"
            class="border border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent px-4 py-2 rounded-md flex items-center"
          >
            <LogOut class="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-8">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p class="text-slate-400">Welcome back! Here's an overview of your ticket system.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
            <div class="flex flex-col space-y-1.5 pb-3">
              <h2 class="text-sm font-medium text-slate-400">Total Tickets</h2>
            </div>
            <div class="pt-0">
              <div class="text-3xl font-bold text-white">{{ stats.total }}</div>
              <p class="text-xs text-slate-500 mt-1">All tickets in system</p>
            </div>
          </div>

          <div class="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
            <div class="flex flex-col space-y-1.5 pb-3">
              <h2 class="text-sm font-medium text-slate-400">Open Tickets</h2>
            </div>
            <div class="pt-0">
              <div class="text-3xl font-bold text-yellow-400">{{ stats.open }}</div>
              <p class="text-xs text-slate-500 mt-1">Awaiting resolution</p>
            </div>
          </div>

          <div class="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
            <div class="flex flex-col space-y-1.5 pb-3">
              <h2 class="text-sm font-medium text-slate-400">Resolved Tickets</h2>
            </div>
            <div class="pt-0">
              <div class="text-3xl font-bold text-green-400">{{ stats.resolved }}</div>
              <p class="text-xs text-slate-500 mt-1">Completed tickets</p>
            </div>
          </div>
        </div>

        <div class="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h3 class="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <button
            @click="$router.push('/management')"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Ticket class="w-5 h-5 mr-2" />
            Manage Tickets
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut, Ticket } from 'lucide-vue-next'
import { ticketService } from '../services/api'

const router = useRouter()
const user = ref(null)
const tickets = ref([])

const stats = computed(() => {
  const total = tickets.value.length
  const open = tickets.value.filter(t => t.status === 'open').length
  const resolved = tickets.value.filter(t => t.status === 'resolved').length
  return { total, open, resolved }
})

const handleLogout = () => {
  sessionStorage.removeItem('ticketapp_session')
  router.push('/')
}

onMounted(async () => {
  const currentUser = sessionStorage.getItem('ticketapp_session')
  if (!currentUser) {
    router.push('/login')
    return
  }
  user.value = JSON.parse(currentUser)
  
  try {
    tickets.value = await ticketService.getAll()
  } catch (err) {
    console.error('Error loading tickets:', err)
  }
})
</script>