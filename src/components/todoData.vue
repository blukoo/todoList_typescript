<template>
  <div class="todo_list">
    <ul class="plan_list">
      <li><label>번호no</label><input type="text" v-model="listDataP.number" readonly /></li>
      <li><label>계획</label><input type="text" v-model="listDataP.work" readonly /></li>
      <li><label>계획</label><input type="text" v-model="listDataP.time" readonly /></li>
      <li><label @click="setCalendar">날짜</label><input type="text" v-model="listDataP.date" readonly /></li>
    </ul>
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
      date: { type: [Date, String] },
      cate: { type: String, default: '' },
      number: { type: Number, default: 0 },
    },
    setup(props, context) {
      let listDataP = toRef(props, 'listData');
      let numberDataP = toRef(props, 'number');
      let list = reactive<listDataType>({
        number: numberDataP.value,
        work: listDataP.value?.work,
        time: listDataP.value?.time,
        date: listDataP.value?.date || moment(new Date()).format('YY년 MM월 DD일'),
      });
      const store = useStore();
      const initData = () => {
        if (props.listData) {
          list = { ...props.listData };
        }
      };
      const setCalendar = () => {
        context.emit('setCalendar');
      };
      const setStoreList = () => {
        list = listDataP.value as listDataType;
      };
      onMounted(() => {
        setStoreList();
      });
      return { list, initData, setCalendar, listDataP, numberDataP, setStoreList };
    },
  });
</script>

<style lang="scss">
  .todo_list {
    display: flex;
    .plan_list {
      display: inline-block;
      li {
        display: inline-block;
      }
      label {
        width: 30%;
        background-color: aquamarine;
        display: inline-block;
      }
      input {
        width: 70%;
      }
    }
    .btn_wrap {
    }
  }
</style>
