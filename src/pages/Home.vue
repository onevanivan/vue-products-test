<template>
    <div class="page home">
        <Catalog/>
    </div>
</template>

<script>
    import Catalog from './../components/Catalog';

    export default {
        name: 'Home',
        components: {
            Catalog
        }
    }
</script>