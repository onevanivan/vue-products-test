<template>
  <div class="loading" v-if="loading">
    <img class="loading-icon" :src="require('/src/assets/img/loading.jpg')" alt="">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }

  .loading-icon {
    display: block;
    width: 50px;
    height: 50px;

    @media screen and (min-width: 768px) {
      width: 100px;
      height: 100px;
    }
  }
</style>