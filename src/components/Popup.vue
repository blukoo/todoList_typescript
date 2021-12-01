<template>
  <div class="popWrap" :style="{ height: popInnerHeight + 'px' }" @click="blurCalendar">
    <div class="popInner">
      <div class="calendarWrap" v-if="popset.calendar.flag">
        <div><DatePicker v-model="date" @dayclick="onDayClick" :attruibutes="attr" /></div>
      </div>
      <div class="contextWrap" v-if="popset.context">
        <div>{{ popset.context }}</div>
      </div>
      <div class="btnWrap">
        <button v-if="popset.cancelBtn.flag" @click="closePop">{{ popset.cancelBtn.text }}</button>
        <button class="active" @click="confirmPop" v-if="popset.confirmBtn.flag">{{ popset.confirmBtn.text }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, reactive, PropType, onMounted } from 'vue';
  import { Calendar, DatePicker } from 'v-calendar';
  import { useStore } from 'vuex';
  import type { listDataType } from '../pages/List.vue';
  import moment from 'moment';
  export default defineComponent({
    components: { DatePicker },
    props: {
      popset: Object as PropType<listDataType>,
    },
    setup(props, context) {
      const store = useStore();
      const date = ref<any>(new Date());
      const onDayClick = (e: any) => {
        context.emit('selectDate', todoDate(e.date));
      };

      const attr = reactive({
        style: {
          backgroundColor: 'brown',
        },
      });
      const blurCalendar = (e?: Event) => {
        if (e && e.currentTarget === e.target) {
          closePop();
        }
      };
      const closePop = () => {
        store.commit('SET_POP', false);
      };
      const confirmPop = () => {
        if (props.popset.calendar.flag) {
          if (!date.value) {
            context.emit('emptyDate', '날짜를 선택해주세요');
          } else {
            closePop();
          }
        }
      };
      const popInnerHeight = computed(() => {
        return window.innerHeight;
      });
      const todoDate = (dateData: Date) => {
        date.value = moment(dateData).format('YY년 MM월 DD일');
        return date.value;
      };
      return { date, blurCalendar, onDayClick, popInnerHeight, attr, todoDate, closePop, confirmPop };
    },
  });
</script>

<style lang="scss">
  .popWrap {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    left: 0;
    top: 0;
  }
  .popInner {
    width: 50%;
    min-height: 50vh;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 5px 5px 5px 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .btnWrap {
      width: 100%;
      position: absolute;
      bottom: 0;
      button {
        width: 50%;
        line-height: 40px;
        text-align: center;
        color: black;
        border-radius: 0 0 5px 5px;
        &.active {
          background-color: greenyellow;
        }
      }
    }
  }
  .calendarWrap {
    width: 300px;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
</style>

function onMounted(arg0: () => void) { throw new Error('Function not implemented.'); }
