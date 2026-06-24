
<script setup>
defineProps({ movie: { type: Object, required: true } })
</script>

<template>
  <router-link :to="{ name: 'detail', params: { id: movie.id } }"
    class="group block card-base overflow-hidden">
    <div class="relative aspect-[2/3] overflow-hidden bg-cream">
      <img :src="movie.poster_url" :alt="movie.title" loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <span v-if="movie.rating" class="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-brown/80 text-cream text-xs">
        ⭐ {{ movie.rating }}
      </span>
    </div>
    <div class="p-3">
      <h3 class="font-medium text-sm truncate text-brown">{{ movie.title }}</h3>
      <p class="text-xs text-brown-soft mt-0.5">{{ movie.year }}</p>
    </div>
  </router-link>
</template>
