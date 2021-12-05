<template>
  <div class="todo_list">
    <ul class="plan_list" v-if="cate === 'write'">
      <li><label>번호writ</label><input type="text" v-model="list.number" readonly /></li>
      <li><label>계획</label><input type="text" v-model="list.work" :readonly="readonlyFlag" /></li>
      <li><label>계획</label><input type="text" v-model="list.time" :readonly="readonlyFlag" /></li>
      <li><label @click="setCalendar">날짜</label><input type="text" :value="date" :readonly="readonlyFlag" /></li>
    </ul>
    <ul class="plan_list" v-if="cate !== 'write'">
      <li><label>번호no</label><input type="text" v-model="list.number" readonly /></li>
      <li><lasbel>계획</lasbel><input type="text" v-model="list.work" :readonly="readonlyFlag" /></li>
      <li><label>계획</label><input type="text" v-model="list.time" :readonly="readonlyFlag" /></li>
      <li><label @click="setCalendar">날짜</label><input type="text" v-model="list.date" :readonly="readonlyFlag" /></li>
    </ul>
    <div class="btn_wrap"><button v-if="cate === 'write'" @click="addTodo">+</button></div>
  </div>
</template>

<script lang="ts">
  import moment from 'moment';
  import { defineComponent, ref, reactive, PropType, computed, onMounted, watch, watchEffect, toRefs } from 'vue';
  import { useStore } from 'vuex';
  import type { listDataType } from '../pages/List.vue';
  export default defineComponent({
    props: {
      listData: Object as PropType<listDataType>,
      date: { type: [Date, String] },
      cate: { type: String, default: '' },
    },
    setup(props, context) {
      let list = reactive<listDataType>({
        number: props.listData?.number,
        work: props.listData?.work,
        time: props.listData?.time,
        date: moment(new Date()).format('YY년 MM월 DD일'),
      });
      const store = useStore();
      const initData = (cate: string) => {
        if (cate !== 'insertData' && props.listData) {
          list = { ...props.listData };
        }
      };
      const setCalendar = () => {
        context.emit('setCalendar');
      };
      const addTodo = () => {
        if (props.cate === 'write') {
          // let { date } = toRefs(props);
          // list.date = date.value;
          // console.log(date.value, list.date);
          context.emit('addTodo', list);
        }
        // if (props.cate === 'write') {
        //   list.number = (list.number as number) + 1;
        // }
      };
      const setNewNumber = () => {
        const plan = JSON.parse(window.localStorage.getItem('plan_list') as string);
        if (props.cate !== 'write') return;
        if (plan !== null) {
          list.number = props.listData?.number;
        }
      };
      const setStoreList = () => {
        if (props.cate === 'write') return;
        if (props.cate !== 'write') {
          let { listData } = toRefs(props);
          list.date = props.listData?.date;
          console.log({ ...props.listData }, list);
        }
      };
      watch(props.listData as listDataType, () => {
        if (props.cate === 'write') {
          setNewNumber();
        } else {
          // setStoreList();
        }
      });
      // return (list.date = props.date), (window.localStorage.getItem('plan_list') = setNewNumber);
      const readonlyFlag = computed(() => {
        return props.cate === 'write' ? false : true;
      });
      onMounted(() => {
        if (props.cate === 'write') {
          setNewNumber();
        } else {
          setStoreList();
        }
      });
      return { list, initData, setCalendar, addTodo, setNewNumber, setStoreList, readonlyFlag };
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
