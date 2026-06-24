
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push(route.query.redirect || '/')
  } catch (e) { error.value = e.message }
}
</script>

<template>
  <div class="max-w-sm mx-auto px-4 py-16">
    <div class="card-base p-8">
      <h1 class="text-2xl font-bold text-brown text-center">Masuk</h1>
      <p class="text-center text-sm text-brown-soft mt-1">Selamat datang kembali di NontonYuk</p>

      <form @submit.prevent="submit" class="mt-6 space-y-4">
        <input v-model="email" type="email" required placeholder="Email"
          class="w-full px-4 py-2.5 rounded-xl bg-cream border border-accent/20 focus:outline-none focus:border-accent text-sm" />
        <input v-model="password" type="password" required placeholder="Kata sandi"
          class="w-full px-4 py-2.5 rounded-xl bg-cream border border-accent/20 focus:outline-none focus:border-accent text-sm" />
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button :disabled="auth.loading" type="submit"
          class="w-full py-2.5 bg-accent text-white rounded-xl text-sm hover:bg-accent/90 disabled:opacity-60">
          {{ auth.loading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>

      <p class="text-center text-sm text-brown-soft mt-4">
        Belum punya akun?
        <router-link to="/register" class="text-accent hover:underline">Daftar</router-link>
      </p>
    </div>
  </div>
</template>
