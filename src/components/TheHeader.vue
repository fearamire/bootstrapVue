<script setup>
import Logo from './icons/IconLogo.vue'
import TheNavigation from './TheNavigation.vue'

</script>

<template>
<header class="container-xxl">
<div class="navbar p-0" >
  <div class="container-fluid">

    <!-- logo -->
    <RouterLink :to="{name: 'home'}" class="navbar-brand"> <Logo /> </RouterLink>
    
    <!-- Hamburger Dropdown Button must be first sibling -->
    <button type="button" class="navbar-toggler d-block" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  </div>
</div>
<TheNavigation/>
</header>
</template>

<style>

/* .navbar-toggler {
  padding: var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);
  font-size: var(--bs-navbar-toggler-font-size);
  line-height: 1;
  color: var(--bs-navbar-color);
  background-color: transparent;
  border: var(--bs-border-width) solid var(--bs-navbar-toggler-border-color);
  border-radius: var(--bs-navbar-toggler-border-radius);
  transition: var(--bs-navbar-toggler-transition);
} */

</style>