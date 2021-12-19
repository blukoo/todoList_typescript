<template>
  <div>
    <main-header />
    <main>
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

<style></style>
