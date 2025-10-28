<template>
  <div class="min-h-screen bg-slate-900 text-white flex flex-col">
    <header class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700">
      <div class="max-w-4xl mx-4 px-4 py-3 flex items-center gap-3 justify-start">
        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center px-3">
          <Ticket class="w-6 h-6 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-white">TicketApp</h1>
      </div>
    </header>

    <main class="max-w-[1440px] mx-auto w-full flex-1">
      <router-view />
    </main>

    <footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full px-4 py-6 text-center text-xs text-white border-t border-slate-700">
      &copy; TicketApp
    </footer>
  </div>
</template>

<script setup>
import { Ticket } from 'lucide-vue-next'
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #0f172a;
}
</style>