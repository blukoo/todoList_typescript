// import Vue from 'vue';
const myMixin = {
  data() {
    return { message: 'hello', foo: 'abc' };
  },
  created() {
    console.log('mixin');
  },
};
export default myMixin;
// const app = Vue.createApp({
//   mixins: [myMixin],
//   data() {
//     return { message: 'goodbye', bar: 'def' };
//   },
//   created() {
//     console.log(this.$data);
//   },
// });
