<template>
    <div class="page favorite">
        <Catalog favorites/>
    </div>
</template>

<script>
    import Catalog from './../components/Catalog';

    export default {
        name: 'Favorite',
        components: {
            Catalog
        }
    }
</script>