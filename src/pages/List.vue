<template>
  <div class="list-wrap">
    <div class="list-container">
      <todoData :listData="newListData" :date="insertDate" :cate="cate.write" @setCalendar="setCalendar" @addTodo="addTodo"></todoData>
      <!-- <draggable v-model="listStore" class="dragable">
        <transition-group name="fade"> -->
      <ul class="new_plan" v-if="storeListFlag">
        <li v-for="(e, i) in listStore" :key="i">
          <todoData :listData="e" :cate="cate.store"></todoData>
          <button @click="loading = !loading">버튼</button>
        </li>
        <li class="loading">
          <transition-group name="fade" tag="div"><img v-if="!loading" src="@/assets/images/loading.png" /></transition-group>
        </li>
      </ul>
      <!-- </transition-group>
      </draggable> -->
    </div>
    <draggable>
      <div>dd</div>
    </draggable>
    <Popup v-if="store.state.checkPop" :popset="popset" @selectDate="selectDate" @emptyDate="emptyDate"></Popup>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  import todoData from '../components/todoData.vue';
  import Popup from '../components/Popup.vue';
  import moment from 'moment';
  import { VueDraggableNext } from 'vue-draggable-next';
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
    components: { todoData, Popup, draggable: VueDraggableNext },
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
      const newListData = reactive<listDataType>({
        number: 1,
        work: '',
        time: '',
        date: '',
      });
      const listStore = reactive<[listDataType?]>([]);
      const popset = reactive<popType>({
        context: { text: '' },
        confirmBtn: { flag: false, text: '' },
        cancelBtn: { flag: false, text: '' },
        calendar: { flag: false },
      });
      const cate = ref<{ write: string; store: string }>({ write: 'write', store: 'store' });
      const selectDate = (date: Date) => {
        insertDate.value = date;
        console.log(date, insertDate.value);
      };
      const addTodo = (newList: listDataType) => {
        console.log(listStore, newList, { ...newList }, typeof listStore, '에드');
        listStore.push({ ...newList });
        window.localStorage.setItem('plan_list', JSON.stringify(listStore));
        newListData.number = (newListData.number as number) + 1;
        console.log(listStore, '애드3');
      };
      const setStoreList = () => {
        if (window.localStorage.getItem('plan_list')) {
          console.log(JSON.parse(window.localStorage.getItem('plan_list') as string));
          const plan = JSON.parse(window.localStorage.getItem('plan_list') as string);
          console.log(plan, '플랜ㅇ');
          plan.forEach((e: listDataType, i: number) => {
            listStore?.push({ ...e });
          });
          newListData.number = listStore.length + 1;
          console.log(typeof listStore, listStore);
          // listStore = [JSON.parse(window.localStorage.getItem('plan_list') as string)];
        }
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
        if (listStore) {
          return true;
        } else {
          return false;
        }
      });
      // watch(listStore, () => setStoreList());
      onMounted(() => {
        setStoreList();
      });
      return { list, cate, loading, store, insertDate, popset, newListData, setStoreList, setCalendar, selectDate, addTodo, listStore, storeListFlag };
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
<style></style>
