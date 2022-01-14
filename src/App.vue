<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<script>
  import myMixin from './mixin';
  export default { mixins: [myMixin] };
</script>
<style lang="scss">
  @import 'assets/css/init.scss';
  :root {
    --bg-color: rgba(100, 100, 100, 0.5);
  }
  #App {
    // font-family: Rock3D-Reqular;
    background: var(--bg-color);
  }
</style>
