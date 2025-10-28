<template>
  <div class="min-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
    <header class="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            @click="$router.push('/dashboard')"
            class="text-slate-400 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-md flex items-center"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 class="text-2xl font-bold text-white">Ticket Management</h1>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-slate-400">
            Signed in as <span class="text-slate-200 font-medium">{{ user?.username }}</span>
          </span>
          <button
            @click="handleLogout"
            class="border border-slate-600 text-slate-200 hover:bg-slate-700 px-3 py-2 rounded-md flex items-center"
          >
            <LogOut class="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex-1 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tickets..."
            v-model="searchTerm"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
          />
        </div>
        <button
          @click="showForm = true"
          class="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-4 py-2 rounded-md flex items-center justify-center"
        >
          <Plus class="w-4 h-4 mr-2" />
          New Ticket
        </button>
      </div>

      <div class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-if="filteredTickets.length > 0"
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="p-5 bg-slate-800 border border-slate-700 rounded-lg shadow-md text-white space-y-2"
        >
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">{{ ticket.title }}</h3>
            <span
              :class="[
                'px-2 py-1 rounded text-xs font-medium',
                ticket.status === 'open'
                  ? 'bg-green-600/30 text-green-400'
                  : ticket.status === 'in_progress'
                  ? 'bg-yellow-600/30 text-yellow-400'
                  : 'bg-red-600/30 text-red-400'
              ]"
            >
              {{ ticket.status.toUpperCase().replace('_', ' ') }}
            </span>
          </div>
          <p class="text-slate-400 text-sm">{{ ticket.description }}</p>
          <div class="text-xs text-slate-500">
            Priority: {{ ticket.priority }}
          </div>
          <div class="flex justify-end gap-2 mt-2">
            <button
              @click="editTicket(ticket)"
              class="text-blue-400 hover:text-blue-300"
            >
              <Edit2 class="w-4 h-4" />
            </button>
            <button
              @click="deleteTicket(ticket.id)"
              class="text-red-400 hover:text-red-300"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div v-else class="col-span-full text-center text-slate-400 py-12">
          {{ searchTerm ? "No tickets match your search." : "No tickets yet. Create one to get started!" }}
        </div>
      </div>
    </main>

    <!-- Ticket Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-slate-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          @click="closeForm"
          class="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <X class="w-5 h-5" />
        </button>
        <h2 class="text-2xl font-bold mb-4 text-white">
          {{ editing ? 'Edit Ticket' : 'Create New Ticket' }}
        </h2>
        <form @submit.prevent="handleSave" class="space-y-4">
          <input
            type="text"
            placeholder="Ticket Title"
            v-model="ticketForm.title"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
            required
          />
          <textarea
            placeholder="Ticket Description"
            v-model="ticketForm.description"
            rows="3"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
          />
          <div class="flex justify-between gap-3">
            <select
              v-model="ticketForm.priority"
              class="w-1/2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select
              v-model="ticketForm.status"
              class="w-1/2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div v-if="formError" class="text-red-400 text-sm">{{ formError }}</div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
          >
            {{ editing ? 'Update Ticket' : 'Create Ticket' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="toast"
      :class="[
        'fixed bottom-4 right-4 px-4 py-2 rounded-md text-white shadow-lg transition-opacity',
        toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, LogOut, Plus, X, Trash2, Edit2 } from 'lucide-vue-next'
import { ticketService } from '../services/api'

const router = useRouter()
const user = ref(null)
const tickets = ref([])
const searchTerm = ref('')
const showForm = ref(false)
const editing = ref(false)
const toast = ref(null)
const formError = ref('')

const ticketForm = ref({
  title: '',
  description: '',
  priority: 'Low',
  status: 'open'
})

const filteredTickets = computed(() => {
  return tickets.value.filter(t =>
    t.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const handleLogout = () => {
  sessionStorage.removeItem('ticketapp_session')
  router.push('/')
}

const closeForm = () => {
  showForm.value = false
  editing.value = false
  ticketForm.value = {
    title: '',
    description: '',
    priority: 'Low',
    status: 'open'
  }
  formError.value = ''
}

const handleSave = async () => {
  if (!ticketForm.value.title.trim()) {
    formError.value = 'Title is required.'
    return
  }

  try {
    if (editing.value) {
      await ticketService.update(ticketForm.value.id, ticketForm.value)
      const index = tickets.value.findIndex(t => t.id === ticketForm.value.id)
      tickets.value[index] = { ...ticketForm.value }
      showToast('Ticket updated!', 'success')
    } else {
      const newTicket = {
        ...ticketForm.value,
        id: Date.now()
      }
      const created = await ticketService.create(newTicket)
      tickets.value.push(created)
      showToast('Ticket created!', 'success')
    }
    closeForm()
  } catch (err) {
    formError.value = 'Failed to save ticket'
    console.error('Save error:', err)
  }
}

const editTicket = (ticket) => {
  editing.value = true
  ticketForm.value = { ...ticket }
  showForm.value = true
}

const deleteTicket = async (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    try {
      await ticketService.delete(id)
      tickets.value = tickets.value.filter(t => t.id !== id)
      showToast('Ticket deleted!', 'success')
    } catch (err) {
      showToast('Failed to delete ticket', 'error')
      console.error('Delete error:', err)
    }
  }
}

const showToast = (message, type) => {
  toast.value = { message, type }
  setTimeout(() => {
    toast.value = null
  }, 2500)
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