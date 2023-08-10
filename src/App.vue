<script setup>
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <TheHeader />

  <div class="container-xxl">
    <RouterView />
    This is a change.
  </div>
</template>

<style>
</style>
