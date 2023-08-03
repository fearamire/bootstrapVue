<template>
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNav" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Navigation</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-0">
    
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <RouterLink :to="{name: 'home'}"> Home </RouterLink>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Accordion with links
                </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-item accordion-nested">
                        <RouterLink :to="{name: 'page3'}"> Page 3 </RouterLink>
                    </div>
                    <div class="accordion-item accordion-nested">
                        <RouterLink :to="{name: 'departments'}"> Departments </RouterLink>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Accordion Item #3
                </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-item accordion-nested">
                    <RouterLink to="#"> Placeholder </RouterLink>
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseThree">
                    Accordion Item #4
                </button>
                </h2>
                <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-item accordion-nested">
                    <RouterLink to="#"> Placeholder </RouterLink>
                </div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<style lang="scss">

.accordion-item > a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 1rem 1.25rem;
    text-decoration: none;
    color: var(--bs-body-color);
    &:hover, &:focus {
        text-decoration: underline;
        background-color: var(--bs-secondary-bg);
        outline:none;
    }
}

.accordion-nested > a {
    background-color: var(--bs-secondary-bg-subtle);
}



</style>