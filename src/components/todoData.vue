<template>
  <div class="todo_list">
    <ul class="plan_list" :class="cate">
      <li><label>번호no</label><input type="text" v-model="listDataP.number" :readonly="cate !== 'write' ? true : false" /></li>
      <li class="what_todo" @click="whatTodo"><label>계획</label><input type="text" v-model="listDataP.work" :readonly="cate !== 'write' ? true : false" /></li>
      <li><label @click="setCalendar">날짜</label><input type="text" v-model="listDataP.date" :readonly="cate !== 'write' ? true : false" /></li>
    </ul>
    <div class="btn_wrap"><button v-if="cate !== 'write'" @click="delTodo" class="del_btn">-</button><button v-else-if="cate === 'write'" @click="addTodo" class="add_btn">+</button></div>
  </div>
</template>

<script lang="ts">
  import moment from 'moment';
  import { defineComponent, reactive, PropType, computed, onMounted, watch, watchEffect, toRefs, toRef } from 'vue';
  import { useStore } from 'vuex';
  import type { listDataType } from '../pages/List.vue';
  export default defineComponent({
    props: {
      listData: Object as PropType<listDataType>,
      date: { type: [Date, String] },
      cate: { type: String, default: '' },
      number: { type: Number, default: 0 },
    },
    setup(props, context) {
      let listDataP = toRef(props, 'listData');
      let numberDataP = toRef(props, 'number');
      let list = reactive<listDataType>({
        number: numberDataP.value,
        work: listDataP.value?.work,
        time: listDataP.value?.time,
        date: listDataP.value?.date || moment(new Date()).format('YY년 MM월 DD일'),
      });
      const delTodo = () => {
        console.log(listDataP.value, '리스트');
        context.emit('delTodo', listDataP.value);
      };
      const addTodo = () => {
        console.log(listDataP.value, '리스트');
        context.emit('addTodo', listDataP.value);
      };
      const initData = () => {
        if (props.listData) {
          list = { ...props.listData };
        }
      };
      const setCalendar = () => {
        context.emit('setCalendar');
      };
      const setStoreList = () => {
        list = listDataP.value as listDataType;
      };
      onMounted(() => {
        setStoreList();
      });
      return { list, addTodo, delTodo, initData, setCalendar, listDataP, numberDataP, setStoreList };
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
          flex-basis: 150px;
          flex-grow: 0;
        }
        &:nth-child(3) {
          flex-basis: 200px;
          flex-grow: 0;
        }
        label {
          width: 50%;
          height: 100%;
          background-color: powderblue;
          display: inline-block;
          color: #fff;
          vertical-align: middle;
          line-height: 22px;
          font-family: cute;
          text-align: center;
          &.num {
            width: 30%;
          }
        }
        input {
          width: 50%;
          height: 100%;
          text-align: center;
          box-sizing: border-box;
          border: 1px solid red;
          border-bottom: none;
          vertical-align: middle;
          font-family: cute;
          &.num_value {
            width: 70%;
          }
        }
        &.what_todo {
          display: flex;
          label {
            width: 150px;
          }
          input {
            flex: 1;
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
