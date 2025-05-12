<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50"> 
    <div class="w-full max-w-md flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-4">Say Hello</h1>
      <input v-model="name" type="text" placeholder="Enter your name..." class="border rounded px-2 py-1 mr-2 mb-2 w-full" />
      <button @click="callHealthcheck" class="bg-blue-600 text-white px-4 py-1 rounded w-full">Call API</button>
      <div v-if="result" class="mt-4 p-2 bg-gray-100 rounded w-full text-center">{{ result }}</div>
      <div v-if="error" class="mt-2 text-red-600 w-full text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const result = ref('')
const error = ref('')

async function callHealthcheck() {
  result.value = ''
  error.value = ''
  try {
    const url = `/api/healthcheck?name=${encodeURIComponent(name.value)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('API call failed')
    result.value = await res.text()
  } catch (e) {
    error.value = e.message || 'Unknown error'
  }
}

onMounted(() => {
  document.title = 'Vue + Cloudflare Pages Demo'
})
</script>

<style scoped>
</style> 