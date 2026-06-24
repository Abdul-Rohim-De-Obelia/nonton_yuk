
<script setup>
// Komponen root: navbar + konten halaman + footer
import { onMounted } from 'vue'
import AppNavbar from '@/components/common/AppNavbar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
// Pulihkan sesi user saat aplikasi dimuat
onMounted(() => auth.init())
</script>

<template>
  <div class="min-h-screen flex flex-col bg-cream">
    <AppNavbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.fade-enter-active,.fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from,.fade-leave-to { opacity: 0; }
</style>
