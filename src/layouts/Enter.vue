<template>
  <div class="user_wrap">
    <Main><router-view /></Main>
  </div>
</template>

<script>
  import Main from '@/layouts/MainLayout.vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: { Main },
  });
</script>

<style scoped lang="scss">
  .user_wrap {
    width: 100%;
  }
</style>
