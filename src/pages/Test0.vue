<template>
  <div>
    ccccccccccc
    <Test>
      <template v-slot:header="msg">
        <h1>Here might be a pdddddddddddddage title</h1>
        <div>{{ msg.msg }}</div>
      </template>
    </Test>
  </div>
</template>

<script>
  import { defineComponent, provide } from 'vue';
  import Test from '@/layouts/Test.vue';
  export default defineComponent({
    components: { Test },
    setup() {
      const msg = 'msg';
      const a = 'korea';
      provide('a', a);
      return { msg, a };
    },
  });
</script>

<style></style>
