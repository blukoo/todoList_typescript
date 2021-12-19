<template>
  <div class="insert_wrap">
    <ul class="plan_list">
      <li><label>번호writ</label><input type="text" v-model="listDataP.number" readonly /></li>
      <li><label>계획</label><input type="text" v-model="listDataP.work" /></li>
      <li><label>계획</label><input type="text" v-model="listDataP.time" /></li>
      <li><label @click="setCalendar">날짜</label><input type="text" :value="listDataP.date" /></li>
    </ul>
    <div class="btn_wrap"><button @click="addTodo" class="add_btn">+</button></div>
  </div>
</template>

<script lang="ts">
  import moment from 'moment';
  import { defineComponent, reactive, PropType, computed, onMounted, watch, watchEffect, toRefs, toRef } from 'vue';
  import { useStore } from 'vuex';
  import type { listDataType } from '../pages/List.vue';
  export default defineComponent({
    props: {
      listData: Object as PropType<listDataType>,
      cate: { type: String, default: '' },
    },
    setup(props, context) {
      let listDataP = toRef(props, 'listData');
      const setCalendar = () => {
        context.emit('setCalendar');
      };
      const addTodo = () => {
        console.log(listDataP.value, '리스트');
        context.emit('addTodo', listDataP.value);
      };
      return { setCalendar, addTodo, listDataP };
    },
  });
</script>

<style lang="scss">
  .insert_wrap {
    display: flex;
    .plan_list {
      display: inline-block;
      li {
        display: inline-block;
      }
      label {
        width: 30%;
        background-color: blue;
        display: inline-block;
        color: #fff;
      }
      input {
        width: 70%;
      }
    }
    .btn_wrap {
      button {
        background-color: red;
      }
    }
  }
</style>
