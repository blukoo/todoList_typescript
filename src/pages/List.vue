<template>
  <div class="list-wrap">
    <div class="list-container">
      <todoData :listIndex="listIndex" :date="insertDate" :cate="cate.write" @setCalendar="setCalendar" @addTodo="addTodo"></todoData>
      <ul>
        <li v-for="(e, i) in listStore" :key="i">
          <todoData :listData="e" :cate="cate.store"></todoData>
        </li>
        <li class="loading" v-if="!loading"><img src="@/assets/images/loading.png" /></li>
      </ul>
    </div>
    <Popup v-if="store.state.checkPop" @selectDate="selectDate"></Popup>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
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
      const cate = ref<{ write: string; store: string }>({ write: 'write', store: 'store' });
      const listStore = ref<[listDataType]>([{}]);
      const listIndex: number | undefined = list[list.length - 1].number;
      // const visiblePopup = (flag: boolean) => {
      //   store.state = flag;
      // };
      const selectDate = (date: Date) => {
        insertDate.value = date;
        console.log(date, insertDate.value);
      };
      const addTodo = (newList: listDataType) => {
        console.log(newList);
        listStore.value.push(newList);
      };
      const setCalendar = () => {
        store.commit('SET_POP', true);
      };
      return { list, cate, listIndex, loading, store, insertDate, setCalendar, selectDate, addTodo, listStore };
    },
  });
</script>

<style lang="scss">
  .list-wrap {
    width: 80%;
    background-color: #fff;
    margin: 5vh auto;
    border: 2px dotted blue;
    .list-container {
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
