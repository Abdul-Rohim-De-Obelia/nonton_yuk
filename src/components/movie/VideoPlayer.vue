<!-- File ini diletakkan di: src/components/movie/VideoPlayer.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  poster: { type: String, default: '' }
})

// Gunakan computed agar reaktif ketika src berubah
const isEmbed = computed(() => /youtube|youtu\.be|vimeo|embed/i.test(props.src ?? ''))

// Untuk YouTube, pastikan URL menggunakan format /embed/
const embedSrc = computed(() => {
  if (!props.src) return ''
  // Konversi URL youtube.com/watch?v=ID ke youtube.com/embed/ID
  const ytMatch = props.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
  return props.src
})
</script>

<template>
  <div class="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
    <!-- Tampilkan pesan jika video_url kosong -->
    <div v-if="!src" class="w-full h-full flex items-center justify-center text-white/50 text-sm">
      Video tidak tersedia
    </div>
    <iframe v-else-if="isEmbed" :src="embedSrc" class="w-full h-full" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <video v-else :src="src" :poster="poster" controls autoplay class="w-full h-full">
      Browser Anda tidak mendukung pemutar video.
    </video>
  </div>
</template>
