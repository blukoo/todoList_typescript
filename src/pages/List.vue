<template>
  <div class="list-wrap">
    <div class="list-container">
      <TodoData :listData="newListData" :cate="cate.write" @setCalendar="setCalendar" @addTodo="addTodo"></TodoData>
      <div class="new_plan" v-if="storeListFlag">
        <draggable class="store_list_wrap" @update="changeOrder" :list="listStore" :sort="true" dragable="true">
          <transition-group>
            <div class="data" v-for="(e, i) in listStore" :key="i">
              <TodoData :listData="e" :cate="cate.store" :number="i + 1" @delTodo="delTodo"></TodoData>
            </div>
          </transition-group>
        </draggable>
        <div class="loading">
          <transition-group name="fade" tag="div"><img v-if="!loading" src="@/assets/images/loading.png" /></transition-group>
        </div>
      </div>
    </div>
    <draggable v-model="listStore">
      <div>dd</div>
    </draggable>
    <Popup v-if="store.state.checkPop" :popset="popset" @selectDate="selectDate"></Popup>
    <pagination></pagination>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, watch, onBeforeMount } from 'vue';
  import { useStore } from 'vuex';
  import TodoData from '@/components/TodoData.vue';
  import Popup from '@/components/Popup.vue';
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
    components: { TodoData, Popup, draggable: VueDraggableNext },
    setup() {
      const loading = ref<boolean>(false);
      const store = useStore();
      const newListData = reactive<listDataType>({
        number: 1,
        work: '',
        time: '',
        date: moment(new Date()).format('YY년 MM월 DD일'),
      });
      const emptyMsg = ref<string>('');
      const listStore = reactive<[listDataType?]>([]);
      const popset = reactive<popType>({
        context: { text: '' },
        confirmBtn: { flag: false, text: '' },
        cancelBtn: { flag: false, text: '' },
        calendar: { flag: false },
      });
      const cate = ref<{ write: string; store: string }>({ write: 'write', store: 'store' });
      const changeOrder = (event: Event) => {
        let passData: listDataType[] = [];
        listStore.forEach((e, i) => {
          (e as listDataType).number = i + 1;
          passData.push(e as listDataType);
        });
        window.localStorage.setItem('plan_list', JSON.stringify(passData));
      };
      const selectDate = (date: Date) => {
        newListData.date = date;
      };

      const emptyInsert = (msg: string) => {
        popset.context.text = msg;
        popset.confirmBtn.text = '확인';
        popset.confirmBtn.flag = true;
        popset.cancelBtn.flag = true;
        popset.cancelBtn.text = '취소';
        popset.calendar.flag = false;
        store.commit('SET_POP', true);
      };
      const addTodo = (list: listDataType) => {
        newListData.date = list.date;
        newListData.time = list.time;
        newListData.work = list.work;
        const values = Object.values(newListData);
        const keys = Object.keys(newListData);
        if (values.includes('')) {
          emptyMsg.value = '';
          values.filter((e, i) => {
            if (e === '') {
              console.log(i, keys[i], '?');
              let emptyValue;
              keys[i] === 'work' ? (emptyValue = '계획') : (emptyValue = '날짜');
              emptyMsg.value = emptyMsg.value + ', ' + emptyValue;
              return keys[i];
            }
          });
          emptyMsg.value = emptyMsg.value.substr(1);
          emptyInsert(`${emptyMsg.value} 내용이 비어있습니다.`);
          return;
        }
        listStore.push({ ...newListData });
        window.localStorage.setItem('plan_list', JSON.stringify(listStore));
        newListData.number = (newListData.number as number) + 1;
      };
      const setStoreList = () => {
        if (window.localStorage.getItem('plan_list')) {
          const plan = JSON.parse(window.localStorage.getItem('plan_list') as string);
          plan.forEach((e: listDataType, i: number) => {
            listStore?.push({ ...e });
          });
          newListData.number = listStore.length + 1;
        }
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
      onBeforeMount(() => {
        setStoreList();
      });
      return { cate, loading, store, popset, newListData, listStore, storeListFlag, changeOrder, setStoreList, setCalendar, selectDate, addTodo, emptyInsert };
    },
  });
</script>

<style lang="scss">
  @import '../assets/css/_mixin';
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

  .store_list_wrap {
    .data:last-child {
      input {
        border-bottom: 1px solid red !important;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: background;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    background: red;
  }
</style>
