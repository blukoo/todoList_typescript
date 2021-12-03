<template>
  <div class="list-wrap">
    <div class="list-container">
      <todoData :listIndex="listIndex" :date="insertDate" :cate="cate.write" @setCalendar="setCalendar" @addTodo="addTodo"></todoData>
      <ul class="new_plan" v-if="storeListFlag">
        <li v-for="(e, i) in listStore" :key="i">
          <todoData :listData="e" :cate="cate.store"></todoData>
        </li>
        <li class="loading" v-if="!loading"><img src="@/assets/images/loading.png" /></li>
      </ul>
    </div>
    <Popup v-if="store.state.checkPop" :popset="popset" @selectDate="selectDate" @emptyDate="emptyDate"></Popup>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  import todoData from '../components/todoData.vue';
  import Popup from '../components/Popup.vue';
  import moment from 'moment';
  export type listDataType = {
    number?: number;
    work?: string;
    time?: number | string;
    date?: Date | string;
  };
  export type popType = {
    context: { text: string };
    confirmBtn: { flag: boolean; text: string };
    cancelBtn: { flag: boolean; text: string };
    calendar: { flag: boolean };
  };

  export default defineComponent({
    components: { todoData, Popup },
    setup() {
      const loading = ref<boolean>(false);
      const store = useStore();
      const insertDate = ref<string | Date>(moment(new Date()).format('YY년 MM월 DD일'));
      const list = reactive<[listDataType]>([
        {
          number: 1,
          work: '',
          time: '',
          date: '',
        },
      ]);
      const popset = reactive<popType>({
        context: { text: '' },
        confirmBtn: { flag: false, text: '' },
        cancelBtn: { flag: false, text: '' },
        calendar: { flag: false },
      });
      const cate = ref<{ write: string; store: string }>({ write: 'write', store: 'store' });
      const listStore = ref<[listDataType]>([{}]);
      const listIndex: number | undefined = list[list.length - 1].number;
      const selectDate = (date: Date) => {
        insertDate.value = date;
        console.log(date, insertDate.value);
      };
      const addTodo = (newList: listDataType) => {
        console.log(JSON.stringify(listStore.value), listStore.value, JSON.parse(localStorage.getItem('plan_list') as string));
        if (window.localStorage.getItem('plan_list') === null) {
          window.localStorage.setItem('plan_list', JSON.stringify(listStore.value));
        } else {
          if (localStorage.getItem('plan_list') !== null) {
            JSON.parse(localStorage.getItem('plan_list') as string).push(listStore.value);
          }
        }
        listStore.value.push(newList);
        console.log(newList, listStore.value);
      };
      const emptyDate = (msg: string) => {
        popset.context.text = msg;
        popset.confirmBtn.text = '확인';
        popset.cancelBtn.flag = true;
        popset.cancelBtn.text = '취소';
        popset.cancelBtn.flag = true;
        popset.cancelBtn.text = '취소';
        popset.calendar.flag = false;
        store.commit('SET_POP', true);
      };
      const setCalendar = () => {
        popset.confirmBtn.flag = true;
        popset.confirmBtn.text = '확인';
        popset.cancelBtn.flag = true;
        popset.cancelBtn.text = '취소';
        popset.calendar.flag = true;
        store.commit('SET_POP', true);
      };
      const storeListFlag = computed(() => {
        if (localStorage.getItem('plan_list')) {
          return true;
        } else {
          return false;
        }
      });
      return { list, cate, listIndex, loading, store, insertDate, popset, setCalendar, selectDate, addTodo, listStore, storeListFlag };
    },
  });
</script>

<style lang="scss">
  .list-wrap {
    width: 85%;
    background-color: #fff;
    margin: 5vh auto;
    border: 2px dotted blue;
    .list-container {
      padding: 10px 5px;
    }
    .loading {
      width: 100%;
      height: 15vh;
      position: relative;
      img {
        width: 5%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: rotateLoading 4s 0s infinite linear;
        @keyframes rotateLoading {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
</style>
<style></style>
