<template>
  <div class="popWrap" :style="{ height: popInnerHeight + 'px' }" @click="blurCalendar">
    <div class="popInner">
      <div class="calendarWrap" v-if="popset.calendar.flag">
        <div>
          <v-calendar :attributes="attr" @dayclick="onDayClick" :is-expanded="true"><DatePicker v-model="date" :attruibutes="attr"></DatePicker></v-calendar>
        </div>
      </div>
      <div class="contextWrap" v-if="popset.context">
        <div>{{ popset.context.text }}</div>
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
  import { DatePicker } from 'v-calendar';
  import { useStore } from 'vuex';
  import type { listDataType, popType } from '../pages/List.vue';
  import moment from 'moment';
  export default defineComponent({
    components: { DatePicker },
    props: {
      popset: Object as PropType<popType>,
    },
    setup(props, context) {
      const store = useStore();
      const date = ref<Date | string>(new Date());
      const onDayClick = (e: any) => {
        console.log(e);
        date.value = e.date;
        console.log(date.value);
      };

      const attr = computed(() => {
        return [
          {
            highlight: true,
            dates: date.value,
          },
        ];
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
        if (props.popset?.confirmType.value === 'calendar') {
          if (!date.value) {
            // context.emit('emptyDate', '날짜를 선택해주세요');
          } else if (date.value) {
            context.emit('selectDate', todoDate(date.value as Date));
            closePop();
          } else {
            closePop();
          }
        } else if (props.popset?.confirmType.value === 'empty') {
          closePop();
        }
      };
      const popInnerHeight = computed(() => {
        return window.innerHeight;
      });
      const todoDate = (dateData: Date) => {
        return moment(dateData).format('YY년 MM월 DD일');
      };
      return { date, blurCalendar, onDayClick, popInnerHeight, attr, todoDate, closePop, confirmPop };
    },
  });
</script>

<style lang="scss" scoped>
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
    .contextWrap {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btnWrap {
      width: 100%;
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
  .vc-container::v-deep {
    border: none;
  }
</style>
