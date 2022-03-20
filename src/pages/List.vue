<template>
  <div class="list-wrap">
    <Search @search="search"></Search>
    <div class="list-container">
      <TodoData
        :listData="newListData"
        :cate="cate.write"
        @setCalendar="setCalendar"
        @addTodo="addTodo"
      ></TodoData>
      <div class="new_plan" ref="new_plan" v-if="storeListFlag">
        <draggable
          class="store_list_wrap"
          @update="changeOrder"
          :list="listStore"
          :sort="true"
          dragable="true"
        >
          <transition-group>
            <div :key="i" class="data" v-for="(e, i) in showListStore">
              <TodoData
                :listData="e"
                :cate="cate.store"
                :number="i + 1"
                @delTodo="delTodo"
                @editTodo="editTodo($event, i)"
              ></TodoData>
            </div>
          </transition-group>
        </draggable>

        <div class="target" ref="target"></div>
      </div>
      <div v-if="loading !== false" class="loading">
        <img src="@/assets/images/loading.png" />
      </div>
    </div>
    <Popup
      v-if="store.state.checkPop"
      :popset="popset"
      @selectDate="selectDate"
    ></Popup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
  watch,
  onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import TodoData from '@/components/TodoData.vue';
import { setItem, getItem } from '@/global/util';
import Popup from '@/components/Popup.vue';
import Search from '@/components/Search.vue';
import moment from 'moment';
import { VueDraggableNext } from 'vue-draggable-next';
export type listDataType = {
  number?: number;
  work?: string[];
  time?: { HH: string; mm: string };
  date?: Date | string;
};
export type popType = {
  context: {
    text: string;
  };
  confirmBtn: {
    flag: boolean;
    text: string;
  };
  confirmType: {
    value: string;
  };
  cancelBtn: {
    flag: boolean;
    text: string;
  };
  calendar: {
    flag: boolean;
  };
};

export default defineComponent({
  components: {
    TodoData,
    Popup,
    draggable: VueDraggableNext,
    Search,
  },
  setup() {
    const loading = ref<boolean>(true);
    const store = useStore();
    const newListData = reactive<listDataType>({
      number: 1,
      work: [],
      time: { HH: '', mm: '' },
      date: moment(new Date()).format('YY년 MM월 DD일'),
    });
    const emptyMsg = ref<string>('');
    const listStore = reactive<[listDataType?]>([]);
    let showListStore = reactive<[listDataType?]>([]);
    const popset = reactive<popType>({
      context: {
        text: '',
      },
      confirmType: {
        value: '',
      },
      confirmBtn: {
        flag: false,
        text: '',
      },
      cancelBtn: {
        flag: false,
        text: '',
      },
      calendar: {
        flag: false,
      },
    });
    const searchResult = reactive<listDataType[]>([]);
    const target = ref<HTMLElement | Element | null>(null);
    const new_plan = ref<HTMLElement | null>(null);
    const cate = ref<{
      write: string;
      store: string;
    }>({
      write: 'write',
      store: 'store',
    });
    const changeOrder = (event: Event) => {
      let passData: listDataType[] = [];
      listStore.forEach((e, i) => {
        (e as listDataType).number = i + 1;
        passData.push(e as listDataType);
      });
      setItem('plan_list', passData);
      listStore.splice(0);
      showListStore.splice(0);
      listStore.push(...passData);
      showListStore.push(...passData);

      console.log(passData, showListStore, listStore);
    };
    const selectDate = (date: Date) => {
      newListData.date = date;
    };
    const emptyInsert = (msg: string) => {
      popset.context.text = msg;
      popset.confirmBtn.text = '확인';
      popset.confirmType.value = 'empty';
      popset.confirmBtn.flag = true;
      popset.cancelBtn.flag = true;
      popset.cancelBtn.text = '취소';
      popset.calendar.flag = false;
      store.commit('SET_POP', true);
    };
    const addTodo = (list: listDataType) => {
      console.log(list);
      newListData.date = list.date;
      newListData.time = list.time;
      newListData.work = list.work;
      const values = Object.values(newListData);
      const keys = Object.keys(newListData);
      if (values.includes('')) {
        emptyMsg.value = '';
        values.filter((e, i) => {
          if (e === '') {
            let emptyValue;
            keys[i] === 'work' ? (emptyValue = '계획') : (emptyValue = '시간');
            emptyMsg.value = emptyMsg.value + ', ' + emptyValue;
            return keys[i];
          }
        });
        emptyMsg.value = emptyMsg.value.substr(1);
        emptyInsert(`${emptyMsg.value} 내용이 비어있습니다.`);
        return;
      }
      listStore.push({
        ...newListData,
      });
      showListStore.push({
        ...newListData,
      });
      setItem('plan_list', listStore);
      newListData.work = [];
      newListData.time = { HH: '', mm: '' };
      newListData.date = moment(new Date()).format('YY년 MM월 DD일');
      newListData.number = (newListData.number as number) + 1;
    };
    const editTodo = (value: string[], index: number) => {
      console.log(value, index);
      listStore[index]!.work! = value;
      setItem('plan_list', listStore);
    };
    const delTodo = (i: number) => {
      listStore.splice(i - 1, 1);
      showListStore.splice(i - 1, 1);
      console.log(i);
      listStore.map((e, i) => {
        if (e) {
          e.number = i + 1;
        }
      });
      setItem('plan_list', listStore);
    };
    const showListStoreStartIndex = ref<number>(0);
    const showListStoreEndIndex = ref<number>(10);
    const setShowListStore = (startIndex: number, endIndex: number) => {
      showListStore.push(...listStore.slice(startIndex, endIndex));
      listStore.map((e, i) => {
        if (e) {
          e.number = i + 1;
        }
      });
    };
    const setStoreList = () => {
      if (getItem('plan_list')) {
        const plan = getItem('plan_list') as listDataType[];
        plan.forEach((e: listDataType, i: number) => {
          listStore?.push({
            ...e,
          });
        });
        newListData.number = listStore.length + 1;
      }
    };
    const search = (word: string) => {
      let searchWord;
      word ? (searchWord = word.trim()) : (searchWord = word);
      if (!searchWord) {
        emptyInsert('검색어를 입력해주세요');
        return;
      }
      if (window.localStorage.getItem('plan_list')) {
        const plan = getItem('plan_list') as listDataType[];
        searchResult.splice(0);
        plan.map((e: listDataType, i: number) => {
          let index = (e.work as string[]).join('').indexOf(word);
          console.log(e.work, word, Object.values(e), index);
          if ((index as number) >= 0) {
            plan[i].number = searchResult.length + 1;
            searchResult.push(...plan.slice(i, i + 1));
          }
        });
        listStore.splice(0, listStore.length);
        listStore.push(...searchResult);
        showListStore.splice(0, showListStore.length);
        showListStore.push(...searchResult);
        console.log(showListStore);
        showListStoreStartIndex.value = 0;
        showListStoreEndIndex.value = 10;
        // setShowListStore(
        //   showListStoreStartIndex.value,
        //   showListStoreEndIndex.value
        // );
      }
    };

    const setCalendar = () => {
      popset.confirmBtn.flag = true;
      popset.confirmBtn.text = '확인';
      popset.context.text = '';
      popset.confirmType.value = 'calendar';
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
    const onScroll = () => {
      const options = {
        root: document.getElementsByClassName('new_plan')[0],
        rootMargin: '10px',
        threshold: 0,
      };
      const callback = async (
        entries: IntersectionObserverEntry[],
        observe: IntersectionObserver
      ) => {
        setTimeout(() => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setShowListStore(
                showListStoreStartIndex.value,
                showListStoreEndIndex.value
              );
              showListStoreStartIndex.value =
                showListStoreStartIndex.value + 10;
              showListStoreEndIndex.value = showListStoreEndIndex.value + 10;
              loading.value = false;
            } else {
              console.log('bye');
            }
          });
          console.log(119);
        }, 1000);
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(target.value!);
    };
    onBeforeMount(() => {
      setStoreList();
    });
    onMounted(() => {
      onScroll();
    });
    return {
      cate,
      loading,
      store,
      popset,
      newListData,
      listStore,
      storeListFlag,
      new_plan,
      target,
      showListStoreStartIndex,
      showListStoreEndIndex,
      showListStore,
      searchResult,
      changeOrder,
      setStoreList,
      setCalendar,
      selectDate,
      addTodo,
      delTodo,
      editTodo,
      emptyInsert,
      onScroll,
      setShowListStore,
      search,
    };
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

.new_plan {
  &::-webkit-scrollbar {
    display: none;
  }
}
.target {
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
