<script setup>

const props = defineProps({
    cardTitle: String,
    cardText: String
})

</script>

<template>
<div class="card">
    <div class="card-body">
        <h5 class="card-title">{{ cardTitle || 'Le nom de carte' }}</h5>
        <p class="card-text">{{ cardText || 'Le corps de carte'}}</p>
    </div>
</div>
</template>