<template>
  <div class="login_wrap">
    <div>스케줄 기록하기</div>
    <div class="insert_wrap">
      <BaseInput v-model="userInfo.id"></BaseInput>
    </div>
  </div>
</template>

<script lang="ts">
  import BaseInput from '@/components/BaseInput.vue';
  import { defineComponent, reactive } from 'vue';
  type userForLogin = {
    id: string;
    password: string;
  };
  export default defineComponent({
    components: { BaseInput },
    setup() {
      const userInfo = reactive<userForLogin>({ id: '', password: '' });
      return { userInfo };
    },
  });
</script>

<style lang="scss" scoped>
  .login_wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>
