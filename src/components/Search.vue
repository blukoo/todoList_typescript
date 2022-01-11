<template>
  <div>
    <div class="search_wrap">
      <label></label>
      <input type="text" placeholder="검색어를 입력해주세요!" v-model="searchWord" @keyup.enter="search" />
      <button @click="search">검색</button>
    </div>
    <div class="recent_search_wrap">
      <ul>
        <li v-for="(word, i) in recentWord" :key="i">{{ word }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, watch, onBeforeMount } from 'vue';
  export default defineComponent({
    setup(props, context) {
      const searchWord = ref<string | null>(null);
      const recentWord = ref<string[]>([]);
      const search = () => {
        console.log(searchWord.value);
        context.emit('search', searchWord.value);
      };
      return { searchWord, recentWord, search };
    },
  });
</script>

<style></style>
