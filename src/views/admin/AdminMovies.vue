<!-- File ini diletakkan di: src/views/admin/AdminMovies.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/services/supabase'

const movies = ref([])
const genres = ref([])
const loading = ref(true)
const saving = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const deleteTarget = ref(null)
const search = ref('')
const notification = ref({ show: false, message: '', type: 'success' })

const emptyForm = () => ({
  title: '', description: '', year: new Date().getFullYear(),
  duration: '', rating: '', poster_url: '', backdrop_url: '',
  video_url: '', featured: false, genre_id: ''
})
const form = ref(emptyForm())

const filteredMovies = computed(() =>
  movies.value.filter(m => m.title.toLowerCase().includes(search.value.toLowerCase()))
)

onMounted(fetchAll)

async function fetchAll() {
  loading.value = true
  const [{ data: m }, { data: g }] = await Promise.all([
    supabase.from('movies').select('*, genres(name)').order('created_at', { ascending: false }),
    supabase.from('genres').select('*').order('name')
  ])
  movies.value = m ?? []
  genres.value = g ?? []
  loading.value = false
}

function openAdd() {
  isEdit.value = false
  form.value = emptyForm()
  showModal.value = true
}

function openEdit(movie) {
  isEdit.value = true
  form.value = {
    id: movie.id,
    title: movie.title,
    description: movie.description ?? '',
    year: movie.year,
    duration: movie.duration,
    rating: movie.rating,
    poster_url: movie.poster_url ?? '',
    backdrop_url: movie.backdrop_url ?? '',
    video_url: movie.video_url ?? '',
    featured: movie.featured ?? false,
    genre_id: movie.genre_id ?? ''
  }
  showModal.value = true
}

async function saveMovie() {
  if (!form.value.title) return
  saving.value = true
  try {
    const payload = {
      title: form.value.title,
      description: form.value.description,
      year: Number(form.value.year),
      duration: Number(form.value.duration),
      rating: Number(form.value.rating),
      poster_url: form.value.poster_url,
      backdrop_url: form.value.backdrop_url,
      video_url: form.value.video_url,
      featured: form.value.featured,
      genre_id: form.value.genre_id || null
    }

    if (isEdit.value) {
      const { error } = await supabase.from('movies').update(payload).eq('id', form.value.id)
      if (error) throw error
      notify('Film berhasil diupdate!')
    } else {
      const { error } = await supabase.from('movies').insert(payload)
      if (error) throw error
      notify('Film berhasil ditambahkan!')
    }
    showModal.value = false
    await fetchAll()
  } catch (e) {
    notify(e.message, 'error')
  } finally {
    saving.value = false
  }
}

async function deleteMovie() {
  if (!deleteTarget.value) return
  const { error } = await supabase.from('movies').delete().eq('id', deleteTarget.value.id)
  if (error) { notify(error.message, 'error'); return }
  notify('Film berhasil dihapus!')
  deleteTarget.value = null
  await fetchAll()
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
      <h2 class="text-2xl font-bold text-brown">Kelola Film</h2>
      <button @click="openAdd"
        class="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
        + Tambah Film
      </button>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <input v-model="search" type="text" placeholder="Cari film..."
        class="w-full max-w-sm px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-accent" />
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
            <th class="px-4 py-3 font-medium">Poster</th>
            <th class="px-4 py-3 font-medium">Judul</th>
            <th class="px-4 py-3 font-medium">Genre</th>
            <th class="px-4 py-3 font-medium">Tahun</th>
            <th class="px-4 py-3 font-medium">Rating</th>
            <th class="px-4 py-3 font-medium">Featured</th>
            <th class="px-4 py-3 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in filteredMovies" :key="movie.id" class="border-b last:border-0 hover:bg-cream-light/50 transition-colors">
            <td class="px-4 py-3">
              <img v-if="movie.poster_url" :src="movie.poster_url" :alt="movie.title"
                class="w-10 h-14 object-cover rounded" />
              <div v-else class="w-10 h-14 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">N/A</div>
            </td>
            <td class="px-4 py-3 font-medium text-brown max-w-[200px] truncate">{{ movie.title }}</td>
            <td class="px-4 py-3 text-brown-soft">{{ movie.genres?.name ?? '-' }}</td>
            <td class="px-4 py-3 text-brown-soft">{{ movie.year }}</td>
            <td class="px-4 py-3">
              <span class="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">⭐ {{ movie.rating }}</span>
            </td>
            <td class="px-4 py-3">
              <span :class="movie.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                class="px-2 py-0.5 rounded-full text-xs font-medium">
                {{ movie.featured ? 'Ya' : 'Tidak' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right space-x-2">
              <button @click="openEdit(movie)"
                class="text-accent hover:underline text-xs font-medium">Edit</button>
              <button @click="deleteTarget = movie"
                class="text-red-500 hover:underline text-xs font-medium">Hapus</button>
            </td>
          </tr>
          <tr v-if="filteredMovies.length === 0">
            <td colspan="7" class="px-4 py-8 text-center text-brown-soft">Belum ada film.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Tambah/Edit -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="px-6 py-4 border-b flex items-center justify-between">
            <h3 class="font-bold text-brown text-lg">{{ isEdit ? 'Edit Film' : 'Tambah Film' }}</h3>
            <button @click="showModal = false" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
          <form @submit.prevent="saveMovie" class="px-6 py-4 space-y-4">
            <!-- Judul -->
            <div>
              <label class="block text-sm font-medium text-brown mb-1">Judul <span class="text-red-500">*</span></label>
              <input v-model="form.title" type="text" required
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
            </div>

            <!-- Deskripsi -->
            <div>
              <label class="block text-sm font-medium text-brown mb-1">Deskripsi</label>
              <textarea v-model="form.description" rows="3"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent resize-none"></textarea>
            </div>

            <!-- Tahun & Durasi -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-brown mb-1">Tahun</label>
                <input v-model="form.year" type="number" min="1900" max="2099"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label class="block text-sm font-medium text-brown mb-1">Durasi (menit)</label>
                <input v-model="form.duration" type="number" min="1"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
              </div>
            </div>

            <!-- Rating & Genre -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-brown mb-1">Rating (0-10)</label>
                <input v-model="form.rating" type="number" min="0" max="10" step="0.1"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label class="block text-sm font-medium text-brown mb-1">Genre</label>
                <select v-model="form.genre_id"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent bg-white">
                  <option value="">-- Pilih Genre --</option>
                  <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
                </select>
              </div>
            </div>

            <!-- Poster URL -->
            <div>
              <label class="block text-sm font-medium text-brown mb-1">URL Poster</label>
              <input v-model="form.poster_url" type="url" placeholder="https://..."
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
              <img v-if="form.poster_url" :src="form.poster_url" class="mt-2 h-24 rounded object-cover" />
            </div>

            <!-- Backdrop URL -->
            <div>
              <label class="block text-sm font-medium text-brown mb-1">URL Backdrop</label>
              <input v-model="form.backdrop_url" type="url" placeholder="https://..."
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
            </div>

            <!-- Video URL -->
            <div>
              <label class="block text-sm font-medium text-brown mb-1">URL Video (Google Drive) https://drive.google.com/file/d/FILE_ID/preview</label>
              <input v-model="form.video_url" type="url" placeholder="https://drive.google.com/file/d/FILE_ID/preview"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
            </div>

            <!-- Featured -->
            <div class="flex items-center gap-3">
              <input v-model="form.featured" type="checkbox" id="featured"
                class="w-4 h-4 accent-accent" />
              <label for="featured" class="text-sm font-medium text-brown">Tampilkan sebagai film featured</label>
            </div>

            <!-- Tombol -->
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="showModal = false"
                class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-brown-soft hover:bg-cream transition-colors">
                Batal
              </button>
              <button type="submit" :disabled="saving"
                class="px-4 py-2 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors disabled:opacity-50">
                {{ saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Film') }}
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
          <h3 class="font-bold text-brown text-lg mb-2">Hapus Film?</h3>
          <p class="text-sm text-brown-soft mb-6">
            Film <strong>{{ deleteTarget.title }}</strong> akan dihapus secara permanen.
          </p>
          <div class="flex justify-end gap-3">
            <button @click="deleteTarget = null"
              class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-brown-soft hover:bg-cream transition-colors">
              Batal
            </button>
            <button @click="deleteMovie"
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
