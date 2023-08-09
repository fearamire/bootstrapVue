<script setup>
import jokes from '../components/Jokes'
// import Card from '../components/Card.vue';
</script>

<script>
console.log(jokes[1].punchLine)



</script>

<template>
<h3>Dad Jokes</h3>

<h4>Todo:</h4>
<ol>
    <li>Add toggle for hiding punchLine</li>
    <li>Create mySQL connection and pull from table</li>
    <li>Add view for all jokes, or select specific joke</li>
    <li>Decide how to include links to source</li>
</ol>

<div>
    <div class="row g-1">
        <div class="col-sm-6 col-12" v-for="joke in jokes" :key="jokes.index">
            <div class="card h-100" tabindex="0">
                <div class="card-body">
                    <h5 class="card-title">{{ joke.setup }}</h5>
                    <p class="card-text">{{ joke.punchLine }}</p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss">

/* .card-container {
    flex-wrap: wrap;
    gap: 1rem;
    .card-text {
        max-width: 100px;
    }
} */

.card:not(:hover):not(:focus) {
    .card-text {
    color: transparent;
    text-shadow: 0 0 7px rgba(var(--bs-emphasis-color-rgb),1);
    }
}

</style>