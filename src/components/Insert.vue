<template>
  <div class="insert_wrap">
    <ul class="plan_list">
      <li><label class="num">번호writ</label><input class="num_value" type="text" v-model="listDataP.number" readonly /></li>
      <li><label>계획</label><textarea type="text" v-model="listDataP.work" /></li>
      <li><label @click="setCalendar">날짜</label><input type="text" :value="listDataP.date" /></li>
    </ul>
    <div class="btn_wrap"><button @click="addTodo" class="add_btn">+</button></div>
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
      cate: { type: String, default: '' },
    },
    setup(props, context) {
      let listDataP = toRef(props, 'listData');
      const setCalendar = () => {
        context.emit('setCalendar');
      };
      const addTodo = () => {
        console.log(listDataP.value, '리스트');
        context.emit('addTodo', listDataP.value);
      };
      return { setCalendar, addTodo, listDataP };
    },
  });
</script>

<style lang="scss">
  .insert_wrap {
    display: flex;
    justify-content: center;
    .plan_list {
      width: calc(100% - 20px);
      display: flex;
      li {
        display: inline-block;
        flex-grow: 1;
        &:nth-child(1) {
          flex-basis: 150px;
          flex-grow: 0;
        }
      }
      label {
        width: 50%;
        height: 100%;
        background-color: blue;
        display: inline-block;
        color: #fff;
        vertical-align: middle;
        line-height: 22px;
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
        vertical-align: middle;
        &.num_value {
          width: 70%;
        }
      }
      textarea {
        width: 50%;
        vertical-align: middle;
      }
    }
    .btn_wrap {
      button {
        width: 20px;
        padding: 0;
        height: 20px;
        line-height: 19px;
        vertical-align: middle;
        text-align: center;
        background-color: red;
      }
    }
  }
</style>
