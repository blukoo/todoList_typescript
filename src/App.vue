<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  @import 'assets/css/init.scss';
  :root {
    --bg-color: rgba(100, 100, 100, 0.5);
  }
  #App {
    background: var(--bg-color);
  }
</style>
