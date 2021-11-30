<template>
  <div>
    <div>
      <label>번호</label><input type="text" :value="list.number" readonly /> <label>계획</label><input type="text" v-model="list.work" :readonly="readonlyFlag" /> <label>계획</label
      ><input type="text" v-model="list.time" :readonly="readonlyFlag" /> <label @click="setCalendar">날짜</label><input type="text" v-model="list.date" :readonly="readonlyFlag" />
    </div>
    <button v-if="cate === 'write'" @click="addTodo">+</button>
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

<style lang="scss"></style>
