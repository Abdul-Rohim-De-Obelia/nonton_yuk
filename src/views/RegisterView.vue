
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const fullName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)

async function submit() {
  error.value = ''
  try {
    await auth.register(email.value, password.value, fullName.value)
    success.value = true
    setTimeout(() => router.push('/'), 1500)
  } catch (e) { error.value = e.message }
}
</script>

<template>
  <div class="max-w-sm mx-auto px-4 py-16">
    <div class="card-base p-8">
      <h1 class="text-2xl font-bold text-brown text-center">Daftar</h1>
      <p class="text-center text-sm text-brown-soft mt-1">Buat akun NontonYuk gratis</p>

      <p v-if="success" class="mt-6 text-center text-green-600 text-sm">
        Pendaftaran berhasil! Mengalihkan...
      </p>

      <form v-else @submit.prevent="submit" class="mt-6 space-y-4">
        <input v-model="fullName" type="text" required placeholder="Nama lengkap"
          class="w-full px-4 py-2.5 rounded-xl bg-cream border border-accent/20 focus:outline-none focus:border-accent text-sm" />
        <input v-model="email" type="email" required placeholder="Email"
          class="w-full px-4 py-2.5 rounded-xl bg-cream border border-accent/20 focus:outline-none focus:border-accent text-sm" />
        <input v-model="password" type="password" required minlength="6" placeholder="Kata sandi (min. 6 karakter)"
          class="w-full px-4 py-2.5 rounded-xl bg-cream border border-accent/20 focus:outline-none focus:border-accent text-sm" />
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button :disabled="auth.loading" type="submit"
          class="w-full py-2.5 bg-accent text-white rounded-xl text-sm hover:bg-accent/90 disabled:opacity-60">
          {{ auth.loading ? 'Memproses...' : 'Daftar' }}
        </button>
      </form>

      <p class="text-center text-sm text-brown-soft mt-4">
        Sudah punya akun?
        <router-link to="/login" class="text-accent hover:underline">Masuk</router-link>
      </p>
    </div>
  </div>
</template>
