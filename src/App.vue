<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SiteNav from './components/SiteNav.vue'
</script>

<template>
  <header>
    <SiteNav />
  </header>

  <RouterView />
</template>

<style>
</style>
