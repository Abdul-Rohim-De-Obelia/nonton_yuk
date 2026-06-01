<!-- File ini diletakkan di: src/views/admin/AdminGenres.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'

const genres = ref([])
const loading = ref(true)
const saving = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const deleteTarget = ref(null)
const notification = ref({ show: false, message: '', type: 'success' })
const form = ref({ id: null, name: '' })

onMounted(fetchGenres)

async function fetchGenres() {
  loading.value = true
  const { data } = await supabase
    .from('genres')
    .select('*, movies(count)')
    .order('name')
  genres.value = data ?? []
  loading.value = false
}

function openAdd() {
  isEdit.value = false
  form.value = { id: null, name: '' }
  showModal.value = true
}

function openEdit(genre) {
  isEdit.value = true
  form.value = { id: genre.id, name: genre.name }
  showModal.value = true
}

async function saveGenre() {
  if (!form.value.name.trim()) return
  saving.value = true
  try {
    if (isEdit.value) {
      const { error } = await supabase.from('genres').update({ name: form.value.name }).eq('id', form.value.id)
      if (error) throw error
      notify('Genre berhasil diupdate!')
    } else {
      const { error } = await supabase.from('genres').insert({ name: form.value.name })
      if (error) throw error
      notify('Genre berhasil ditambahkan!')
    }
    showModal.value = false
    await fetchGenres()
  } catch (e) {
    notify(e.message, 'error')
  } finally {
    saving.value = false
  }
}

async function deleteGenre() {
  if (!deleteTarget.value) return
  const { error } = await supabase.from('genres').delete().eq('id', deleteTarget.value.id)
  if (error) { notify(error.message, 'error'); return }
  notify('Genre berhasil dihapus!')
  deleteTarget.value = null
  await fetchGenres()
}

function notify(message, type = 'success') {
  notification.value = { show: true, message, type }
  setTimeout(() => notification.value.show = false, 3000)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-brown">Kelola Genre</h2>
      <button @click="openAdd"
        class="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        + Tambah Genre
      </button>
    </div>

    <!-- Notifikasi -->
    <transition name="fade">
      <div v-if="notification.show"
        :class="['mb-4 px-4 py-3 rounded-lg text-sm font-medium', notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
        {{ notification.message }}
      </div>
    </transition>

    <!-- Tabel -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div v-if="loading" class="p-6 space-y-3">
        <div v-for="i in 5" :key="i" class="h-10 bg-gray-100 rounded animate-pulse"></div>
      </div>
      <table class="w-full text-sm" v-else>
        <thead class="bg-cream-light">
          <tr class="text-left text-brown-soft border-b">
            <th class="px-4 py-3 font-medium">Nama Genre</th>
            <th class="px-4 py-3 font-medium">Jumlah Film</th>
            <th class="px-4 py-3 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="genre in genres" :key="genre.id" class="border-b last:border-0 hover:bg-cream-light/50 transition-colors">
            <td class="px-4 py-3 font-medium text-brown">{{ genre.name }}</td>
            <td class="px-4 py-3 text-brown-soft">
              <span class="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">
                {{ genre.movies?.[0]?.count ?? 0 }} film
              </span>
            </td>
            <td class="px-4 py-3 text-right space-x-2">
              <button @click="openEdit(genre)"
                class="text-accent hover:underline text-xs font-medium">Edit</button>
              <button @click="deleteTarget = genre"
                class="text-red-500 hover:underline text-xs font-medium">Hapus</button>
            </td>
          </tr>
          <tr v-if="genres.length === 0">
            <td colspan="3" class="px-4 py-8 text-center text-brown-soft">Belum ada genre.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Tambah/Edit -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm">
          <div class="px-6 py-4 border-b flex items-center justify-between">
            <h3 class="font-bold text-brown text-lg">{{ isEdit ? 'Edit Genre' : 'Tambah Genre' }}</h3>
            <button @click="showModal = false" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
          <form @submit.prevent="saveGenre" class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-brown mb-1">Nama Genre <span class="text-red-500">*</span></label>
              <input v-model="form.name" type="text" required placeholder="Contoh: Action, Drama, Comedy..."
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="showModal = false"
                class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-brown-soft hover:bg-cream transition-colors">
                Batal
              </button>
              <button type="submit" :disabled="saving"
                class="px-4 py-2 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors disabled:opacity-50">
                {{ saving ? 'Menyimpan...' : (isEdit ? 'Simpan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Modal Konfirmasi Hapus -->
    <transition name="fade">
      <div v-if="deleteTarget" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
          <h3 class="font-bold text-brown text-lg mb-2">Hapus Genre?</h3>
          <p class="text-sm text-brown-soft mb-6">
            Genre <strong>{{ deleteTarget.name }}</strong> akan dihapus. Film yang menggunakan genre ini tidak akan terhapus, namun genre-nya akan menjadi kosong.
          </p>
          <div class="flex justify-end gap-3">
            <button @click="deleteTarget = null"
              class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-brown-soft hover:bg-cream transition-colors">
              Batal
            </button>
            <button @click="deleteGenre"
              class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
