<template>
  <div class="todo_list">
    <ul class="plan_list">
      <li><label>번호</label><input type="text" :value="list.number" readonly /></li>
      <li><label>계획</label><input type="text" v-model="list.work" :readonly="readonlyFlag" /></li>
      <li><label>계획</label><input type="text" v-model="list.time" :readonly="readonlyFlag" /></li>
      <li><label @click="setCalendar">날짜</label><input type="text" v-model="list.date" :readonly="readonlyFlag" /></li>
    </ul>
    <div class="btn_wrap"><button v-if="cate === 'write'" @click="addTodo">+</button></div>
  </div>
</template>

<script lang="ts">
  import moment from 'moment';
  import { defineComponent, ref, reactive, PropType, computed, onMounted, watch, watchEffect } from 'vue';
  import { useStore } from 'vuex';
  import type { listDataType } from '../pages/List.vue';
  export default defineComponent({
    props: {
      listIndex: { type: Number, default: 0 },
      listData: Object as PropType<listDataType>,
      date: { type: [Date, String] },
      cate: { type: String, default: '' },
    },
    setup(props, context) {
      let list = reactive<listDataType>({
        number: props.listIndex,
        work: '',
        time: '',
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
        console.log(list);
        context.emit('addTodo', list);
      };
      watchEffect(() => {
        return (list.date = props.date);
      });
      const readonlyFlag = computed(() => {
        return props.cate === 'write' ? false : true;
      });
      onMounted(() => {
        // if (props.date) {
        // }
      });
      return { list, initData, setCalendar, addTodo, readonlyFlag };
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
