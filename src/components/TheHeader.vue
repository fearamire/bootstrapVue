<script setup>
import Logo from './icons/IconLogo.vue'
import TheNavigation from './TheNavigation.vue'

</script>

<template>
<header>
<div class="navbar navbar-expand-lg" >
  <div class="container-fluid">
    <!-- Hamburger Dropdown Button must be first sibling -->
    <button type="button" class="navigation-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- logo -->
    <RouterLink :to="{name: 'home'}" class="navbar-brand"> <Logo /> </RouterLink>
  </div>
</div>
<TheNavigation/>
</header>
</template>

<style>
.navbar {
  padding: 0;
}

.navigation-toggler {
  padding: var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);
  font-size: var(--bs-navbar-toggler-font-size);
  line-height: 1;
  color: var(--bs-navbar-color);
  background-color: transparent;
  border: var(--bs-border-width) solid var(--bs-navbar-toggler-border-color);
  border-radius: var(--bs-navbar-toggler-border-radius);
  transition: var(--bs-navbar-toggler-transition);
}

</style>