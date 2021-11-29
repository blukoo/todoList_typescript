<template>
  <div class="popWrap" :style="{ height: popInnerHeight + 'px' }" @click="blurCalendar">
    <div class="popInner">
      <!-- <Calendar /> -->
      <div><DatePicker v-model="date" class="calendarWrap" @dayclick="onDayClick" :attruibutes="attr" /></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, reactive, PropType, onMounted } from 'vue';
  import { Calendar, DatePicker } from 'v-calendar';
  import { useStore } from 'vuex';
  import moment from 'moment';
  export default defineComponent({
    components: { DatePicker },
    setup(props, context) {
      const store = useStore();
      const date = ref<any>(new Date());
      const onDayClick = (e: any) => {
        context.emit('selectDate', todoDate(e.date));
        console.log(e.currentTarget, e.target, e, todoDate(new Date()));

        closePop();
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
      const popInnerHeight = computed(() => {
        return window.innerHeight;
      });
      const todoDate = (dateData: Date) => {
        date.value = moment(dateData).format('yy년 MM월 DD일');
        return date.value;
      };
      onMounted(() => {
        // if(date.value!==undefined){
        //   date.value=moment(date.value)).format('MM월 DD일');
        // }
      });
      return { date, blurCalendar, onDayClick, popInnerHeight, attr, todoDate };
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
    // width: 30%;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .calendarWrap {
    width: 300px;
    margin: 0 auto;
  }
</style>

function onMounted(arg0: () => void) { throw new Error('Function not implemented.'); }
