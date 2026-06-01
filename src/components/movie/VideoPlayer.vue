<!-- File ini diletakkan di: src/components/movie/VideoPlayer.vue -->
<script setup>
const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' }
})
// Deteksi apakah sumber berupa embed (YouTube/iframe) atau file video langsung
const isEmbed = /youtube|youtu\.be|vimeo|embed/i.test(props.src)
</script>

<template>
  <div class="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
    <iframe v-if="isEmbed" :src="src" class="w-full h-full" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <video v-else :src="src" :poster="poster" controls class="w-full h-full">
      Browser Anda tidak mendukung pemutar video.
    </video>
  </div>
</template>
