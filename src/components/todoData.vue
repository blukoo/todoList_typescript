<template>
  <div>
    <ul>
      <label>번호</label
      ><input type="text" :value="list.number" readonly />
      <label>계획</label
      ><input type="text" v-model="list.number" />

      <label>계획</label
      ><input type="text" v-model="list.time" />
      <label @click="setCalendar">날짜</label
      ><input type="text" v-model="list.date" />
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, PropType, computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  import type { listDataType } from '../pages/List.vue';
  export default defineComponent({
    props: {
      listIndex: { type: Number, default: 0 },
      listData: Object as PropType<listDataType>,
      date: { type: [Date, String] },
      // default: () => {
      // number: 0,
      // work: '',
      // time: '',
      // date: ''},

      cate: { type: String, default: '' },
    },
    setup(props, context) {
      let list = reactive<listDataType>({
        number: props.listIndex,
        work: '',
        time: '',
        date: '',
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
      const setDate =
        (props.date,
        () => {
          alert();
          list.date = props.date;
        });
      onMounted(() => {
        // if (props.date) {
        list.date = props.date;
        // }
      });
      return { list, initData, setCalendar, setDate };
    },
  });
</script>

<style lang="scss"></style>
