<template>
  <div class="wave-background bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[80vh] text-white overflow-hidden flex items-center justify-center relative">
    <div class="decorative-circle decorative-circle-large top-10 left-10"></div>
    <div class="decorative-circle decorative-circle-medium bottom-20 right-20 animation-delay-2000"></div>
    <div class="decorative-circle decorative-circle-small top-1/2 left-1/4 animation-delay-4000"></div>

    <div class="max-w-[1200px] mx-auto text-center relative z-10 px-6">
      <h1 class="text-5xl font-bold mb-4">Welcome to TicketApp</h1>
      <p class="text-lg mb-8 max-w-2xl mx-auto">
        Manage your support tickets seamlessly — track, update, and resolve issues faster with our intuitive platform.
      </p>
      <div class="flex justify-center gap-4 flex-wrap">
        <router-link 
          to="/signup" 
          class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
        >
          Get Started
        </router-link>
        <router-link 
          to="/login" 
          class="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
        >
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>