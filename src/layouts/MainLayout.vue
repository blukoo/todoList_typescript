<template>
  <div class="back">
    <main-header />
    <main class="main">
      <slot></slot>
    </main>
    <main-footer />
  </div>
</template>
<script lang="ts">
  import MainFooter from '@/components/MainFooter.vue';
  import MainHeader from '@/components/MainHeader.vue';
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    components: { MainFooter, MainHeader },
  });
</script>

<style lang="scss" scoped>
  .back {
    background-image: url('../assets/images/background_image.jpg');
    background-size: cover;
    .main {
      position: relative;
    }
  }
</style>
