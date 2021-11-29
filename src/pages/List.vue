<template>
  <div class="list-wrap">
    <div class="list-container">
      <todoData :listIndex="listIndex" :date="insertDate" :cate="insertData" @setCalendar="setCalendar"></todoData>
      <ul>
        <li v-for="(e, i) in list" :key="i">
          <Write :listData="e" :cate="pastData"></Write>
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
  export type listDataType = {
    number?: number;
    work?: string;
    time?: number | string;
    date?: Date | string;
  };

  export default defineComponent({
    components: { todoData, Popup },
    setup() {
      const cate = ref<string>('');
      const loading = ref<boolean>(false);
      const store = useStore();
      const insertDate = ref<Date>(new Date());
      const list = reactive<[listDataType]>([
        {
          number: 1,
          work: '',
          time: '',
          date: '',
        },
      ]);
      const listIndex: number | undefined = list[list.length - 1].number;
      // const visiblePopup = (flag: boolean) => {
      //   store.state = flag;
      // };
      const selectDate = (date: Date) => {
        insertDate.value = date;
        console.log(date, insertDate.value);
      };
      const setCalendar = () => {
        store.commit('SET_POP', true);
      };
      return { list, cate, listIndex, loading, store, insertDate, setCalendar, selectDate };
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
