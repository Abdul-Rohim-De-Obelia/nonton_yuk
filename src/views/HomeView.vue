<!-- File ini diletakkan di: src/views/HomeView.vue -->
<script setup>
import { onMounted, computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import MovieGrid from '@/components/movie/MovieGrid.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const store = useMoviesStore()
onMounted(() => { if (!store.movies.length) store.fetchAll() })

// Film unggulan pertama untuk hero
const hero = computed(() => store.featured[0])
</script>

<template>
  <!-- Area utama menangkap gerakan mouse untuk efek parallax -->
  <div class="min-h-screen relative overflow-hidden bg-[#FDFBF7]" @mousemove="handleMouseMove">
    
    <!-- Latar Belakang Aurora Gradient -->
    <div class="absolute top-0 left-0 w-full h-[70vh] overflow-hidden -z-10 pointer-events-none">
      <!-- Blob 1 (Krem Hangat / Amber) -->
      <div
        class="absolute top-[-10%] left-[5%] w-[40vw] h-[40vw] bg-amber-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 transition-transform duration-300 ease-out"
        :style="{ transform: `translate(${mouseX * 0.03}px, ${mouseY * 0.03}px)` }"
      ></div>
      <!-- Blob 2 (Oranye Lembut) -->
      <div
        class="absolute top-[10%] right-[-5%] w-[35vw] h-[35vw] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 transition-transform duration-300 ease-out"
        :style="{ transform: `translate(${mouseX * -0.04}px, ${mouseY * -0.04}px)` }"
      ></div>
    </div>

    <!-- Hero Section (Banner Pencarian) -->
    <section class="relative pt-28 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div class="p-10 md:p-16 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/60 shadow-2xl w-full max-w-4xl relative overflow-hidden group">
        
        <!-- Efek pantulan cahaya pada ujung atas "kaca" -->
        <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent"></div>

        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 drop-shadow-sm relative z-10 tracking-tight">
          Temukan Tontonan Favoritmu
        </h1>
        <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
          Jelajahi koleksi film terbaik dengan antarmuka yang bersih dan pengalaman visual yang memanjakan mata.
        </p>
        
        <!-- Search Bar bergaya Neumorphism/Glass -->
        <div class="relative max-w-xl mx-auto z-10 flex">
          <input 
            type="text" 
            placeholder="Ketik judul film, genre, atau aktor..." 
            class="w-full pl-8 pr-32 py-4 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 focus:outline-none focus:ring-4 focus:ring-amber-500/20 text-gray-800 shadow-inner placeholder-gray-500 transition-all font-medium" 
          />
          <button class="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full font-bold shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 active:scale-95">
            Cari
          </button>
        </div>
      </div>
    </section>

    <!-- Bagian Grid Film -->
    <section class="relative z-10 pb-24">
      <MovieGrid>
        <template #title>Rekomendasi Hari Ini</template>
        
        <!-- Render MovieCard -->
        <MovieCard 
          v-for="(movie, index) in featuredMovies" 
          :key="index" 
          :movie="movie" 
        />
      </MovieGrid>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue';
// Sesuaikan path import jika komponen ada di dalam folder tertentu
import MovieGrid from '@/components/movie/MovieGrid.vue';
import MovieCard from '@/components/movie/MovieCard.vue';

// State untuk posisi Mouse Parallax
const mouseX = ref(0);
const mouseY = ref(0);

// Fungsi untuk menangkap kordinat mouse
const handleMouseMove = (e) => {
  // Hitung posisi kursor relatif terhadap titik tengah layar
  mouseX.value = e.clientX - window.innerWidth / 2;
  mouseY.value = e.clientY - window.innerHeight / 2;
};

// Data dummy untuk diuji coba bersama MovieCard
const featuredMovies = ref([
  { title: 'The Grand Adventure', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=300&h=450', description: 'Sebuah perjalanan epik melintasi benua.', year: '2026', rating: '8.8' },
  { title: 'Silent Cosmos', poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300&h=450', description: 'Misteri di luar angkasa yang belum terpecahkan.', year: '2025', rating: '8.6' },
  { title: 'Neon Nights', poster: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=300&h=450', description: 'Aksi kejar-kejaran di kota futuristik.', year: '2026', rating: '9.0' },
  { title: 'Vintage Memories', poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=300&h=450', description: 'Kisah klasik dari era 80-an yang penuh nostalgia.', year: '2024', rating: '7.9' },
  { title: 'The Architect', poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=300&h=450', description: 'Seseorang yang merancang ulang realitas.', year: '2026', rating: '8.4' },
]);
</script>
