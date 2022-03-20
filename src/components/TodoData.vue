<template>
  <div class="todo_list">
    <ul class="plan_list" :class="cate">
      <li>
        <label>번호no</label
        ><input
          type="text"
          v-model="listDataP.number"
          :readonly="cate !== 'write' ? true : false"
        />
      </li>
      <li class="what_todo" @click="whatTodo">
        <label>계획</label>
        <div class="work_wrap">
          <div class="input_wrap" v-if="cate === 'write'">
            <input
              type="text"
              @keyup.enter="addTodoWork"
              v-model="insertTodo"
              :readonly="false"
            />
          </div>
          <div class="store_work">
            <input
              v-for="(item, i) in listDataP.work"
              :key="i"
              type="text"
              :value="item"
              @input="editStoreWork($event, i)"
            />
          </div>
        </div>
      </li>
      <li class="what_time">
        <label>시간 </label>
        <VueTimepicker
          :manual-input="true"
          v-model="listDataP.time"
          format="HH:mm"
          ref="timepicker"
        >
        </VueTimepicker>
        <!-- <input
          v-show="props.listData.time === { HH: '', mm: '' }"
          readonly
          placeholder="HH:mm"
        /> -->
      </li>
      <li>
        <label @click="setCalendar">날짜</label
        ><input
          type="text"
          v-model="listDataP.date"
          :readonly="cate !== 'write' ? true : false"
        />
      </li>
    </ul>
    <div class="btn_wrap">
      <button v-if="cate !== 'write'" @click="delTodo" class="del_btn">-</button
      ><button
        v-if="cate !== 'write'"
        style="fontsize: 10px; width: 50px"
        @click="editTodo"
        class="del_btn"
      >
        edit</button
      ><button v-else-if="cate === 'write'" @click="addTodo" class="add_btn">
        +
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import {
  defineComponent,
  reactive,
  PropType,
  ref,
  computed,
  onMounted,
  watch,
  watchEffect,
  toRefs,
  toRef,
} from 'vue';
import type { listDataType } from '../pages/List.vue';
// import VueTimepicker from 'vue3-timepicker';
import VueTimepicker from 'vue3-timepicker';
export default defineComponent({
  props: {
    listData: Object as PropType<listDataType>,
    date: { type: [Date, String] },
    cate: { type: String, default: '' },
    number: { type: Number, default: 0 },
    listTodo: { type: Array },
  },
  components: {
    VueTimepicker,
  },
  setup(props, context) {
    const timepicker = ref(null);
    let listDataP = toRef(props, 'listData');
    let numberDataP = toRef(props, 'number');
    let list = reactive<listDataType>({
      number: numberDataP.value,
      work: listDataP.value?.work,
      time: listDataP.value?.time,
      date:
        listDataP.value?.date || moment(new Date()).format('YY년 MM월 DD일'),
    });
    const delTodo = () => {
      console.log(listDataP.value, '리스트');
      context.emit('delTodo', listDataP.value?.number);
    };
    const insertTodo = ref<string>('');
    const addTodo = () => {
      context.emit('addTodo', listDataP.value);
      insertTodo.value = '';
      timepicker.value?.clearTime();
    };
    const initData = () => {
      if (props.listData) {
        list = { ...props.listData };
      }
    };
    const addTodoWork = () => {
      if (insertTodo.value) {
        listDataP.value?.work!.push('-' + (insertTodo.value as string));
        return (insertTodo.value = '');
      }
    };
    const setCalendar = () => {
      context.emit('setCalendar');
    };
    const editTodo = () => {
      context.emit('editTodo', listDataP.value!.work!);
    };
    const editStoreWork = (e: Event, changeTargetIndex: number) => {
      listDataP.value!.work![changeTargetIndex] = (
        e.target as HTMLInputElement
      ).value;
    };
    onMounted(() => {});
    return {
      list,
      addTodo,
      delTodo,
      initData,
      setCalendar,
      listDataP,
      numberDataP,
      insertTodo,
      editStoreWork,
      editTodo,
      addTodoWork,
      timepicker,
    };
  },
});
</script>

<style lang="scss">
.todo_list {
  display: flex;
  justify-content: center;
  .plan_list {
    width: calc(100% - 20px);
    display: flex;
    font-family: cute;
    li {
      display: inline-block;
      flex-grow: 1;
      &:nth-child(1) {
        flex-basis: 10%;
        flex-grow: 0;
      }
      &:nth-child(2) {
        flex-basis: 50%;
        flex-grow: 0;
      }
      &:nth-child(3) {
        flex-basis: 20%;
        flex-grow: 0;
      }
      &:nth-child(4) {
        flex-basis: 20%;
        flex-grow: 0;
      }
      .vue__time-picker {
        width: 7em;
        flex-grow: 1;
        .vue__time-picker-input {
          width: 100%;
        }
        .dropdown {
          width: 100%;
          top: 23px;
        }
        .select-list {
          li {
            width: 100%;
            font-size: small;
          }
        }
      }
      label {
        width: 30%;
        height: 100%;
        background-color: powderblue;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        vertical-align: middle;
        line-height: 22px;
        font-family: cute;
        text-align: center;
        &.num {
          width: 30%;
        }
      }
      .work_wrap {
        display: flex;
        flex-direction: column;
        flex: 1;
        border: 1px solid red;
        .input_wrap {
          width: 100%;
          input {
            width: 100%;
            position: relative;
            border: none;
            &::before {
              content: '-';
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        }

        .store_work {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          input {
            width: 100%;
            height: 100%;
            display: inline-block;
            border: none;
          }
        }
      }
      input {
        width: 70%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid red;
        vertical-align: middle;
        font-family: cute;
        &.num_value {
          width: 70%;
        }
      }
      &.what_todo,
      &.what_time {
        display: flex;
        label {
          width: 70px;
        }
        input {
          padding: 0 2%;
          flex: 1;
          flex-wrap: nowrap;
        }
      }
    }
    &.write {
      label {
        background-color: blue;
      }
    }
    textarea {
      width: 50%;
      vertical-align: middle;
    }
  }
  .btn_wrap {
    button {
      width: 15px;
      line-height: 15px;
      vertical-align: middle;
      text-align: center;
      background-color: #707070;
      &.add_btn {
        background-color: red;
      }
    }
  }
}
</style>
