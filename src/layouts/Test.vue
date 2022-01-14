<template>
  <div>
    <header>
      <slot name="header" :msg="msg"></slot>
      {{ injection }}
    </header>
  </div>
</template>

<script>
  import { defineComponent, inject } from 'vue';
  export default defineComponent({
    setup() {
      const msg = 'msg';
      const injection = inject('a');
      return { msg, injection };
    },
  });
</script>

<style></style>
