<template>
  <div class="base_input">
    <input :type="inputType" v-model="payload" :class="failFlag" @input="passValue" />
    <label></label>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, toRef } from 'vue';
  export default defineComponent({
    props: ['inputType', 'regx'],
    setup(props, context) {
      const payload = ref<string | null>(null);
      const failFlag = computed(() => {
        if (payload.value) {
          return props.regx.test(payload.value);
        }
        return false;
      });
      const passValue = () => {
        context.emit('input', payload);
      };
      return { payload, failFlag, passValue };
    },
  });
</script>

<style scoped lang="scss"></style>
