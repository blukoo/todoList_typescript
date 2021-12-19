<template>
  <main-layout>
    <router-view></router-view>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/MainLayout.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { MainLayout },
  });
</script>

<style></style>
