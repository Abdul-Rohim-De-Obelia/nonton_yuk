<!-- File ini diletakkan di: src/components/common/AppNavbar.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const q = ref('')
const open = ref(false)

function doSearch() {
  if (q.value.trim()) router.push({ name: 'search', query: { q: q.value.trim() } })
}
async function handleLogout() {
  await auth.logout(); router.push('/')
}

  import { ref, onMounted, onUnmounted } from 'vue'

// State untuk mendeteksi apakah halaman sudah di-scroll
const isScrolled = ref(false)

// Fungsi untuk mengecek posisi scroll
const handleScroll = () => {
  // Jika scroll lebih dari 20px, aktifkan efek glassmorphism
  isScrolled.value = window.scrollY > 20
}

// Pasang event listener saat komponen dimuat
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// Hapus event listener saat komponen dihancurkan (best practice)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>



<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
      isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
      
      <a href="#" class="text-2xl font-bold text-[#4A4036] tracking-wide">
        Nonton<span class="text-[#827364] font-medium">Yuk</span>
      </a>

      <ul class="hidden md:flex space-x-8 text-[#6B5E50] font-medium">
        <li><a href="#" class="hover:text-[#4A4036] transition-colors">Beranda</a></li>
        <li><a href="#" class="hover:text-[#4A4036] transition-colors">Film</a></li>
        <li><a href="#" class="hover:text-[#4A4036] transition-colors">Kategori</a></li>
      </ul>

      <div class="hidden md:flex items-center space-x-5">
        <button class="text-[#4A4036] hover:text-[#827364] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <button class="bg-[#4A4036] text-[#FDFBF7] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#2D2A26] transition-colors shadow-md hover:shadow-lg">
          Masuk
        </button>
      </div>

      <button class="md:hidden text-[#4A4036] hover:text-[#827364]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

    </div>
  </nav>
</template>

<style scoped>
/* CSS khusus untuk efek Glassmorphism bernuansa Cream */
.glass-nav {
  background: rgba(253, 251, 247, 0.75); /* Warna cream semi-transparan */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Dukungan untuk Safari */
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 30px rgba(74, 64, 54, 0.05); /* Shadow cokelat yang sangat soft */
}
</style>
