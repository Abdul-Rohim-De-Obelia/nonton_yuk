<!-- File ini diletakkan di: src/components/movie/VideoPlayer.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  poster: { type: String, default: '' }
})

// Konversi berbagai format URL Google Drive ke format /preview
const resolvedSrc = computed(() => {
  if (!props.src) return ''

  // Format 1: https://drive.google.com/file/d/FILE_ID/view
  // Format 2: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Format 3: https://drive.google.com/open?id=FILE_ID
  // Format 4: https://drive.google.com/uc?id=FILE_ID
  // Semua dikonversi ke: https://drive.google.com/file/d/FILE_ID/preview

  const driveFileId =
    props.src.match(/drive\.google\.com\/file\/d\/([^\/\?]+)/)?.[1] ||
    props.src.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([^&]+)/)?.[1]

  if (driveFileId) {
    return `https://drive.google.com/file/d/${driveFileId}/preview`
  }

  // Konversi YouTube watch?v= ke embed
  const ytMatch = props.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
  }

  return props.src
})

// Video langsung jika berekstensi file video
const isDirectVideo = computed(() => /\.(mp4|mkv|webm|ogg|avi|mov)(\?.*)?$/i.test(props.src ?? ''))
const isEmbed = computed(() => !!props.src && !isDirectVideo.value)
</script>

<template>
  <div class="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
    <div v-if="!src" class="w-full h-full flex items-center justify-center text-white/50 text-sm">
      Video tidak tersedia
    </div>
    <iframe v-else-if="isEmbed" :src="resolvedSrc" class="w-full h-full" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <video v-else :src="resolvedSrc" :poster="poster" controls autoplay class="w-full h-full">
      Browser Anda tidak mendukung pemutar video.
    </video>
  </div>
</template>
