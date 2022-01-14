<template>
  <div>
    <div class="search_wrap">
      <div class="search">
        <label class="close" v-if="searchWord" @click="searchWord = null">X</label>
        <input type="text" placeholder="검색어를 입력해주세요!" v-model="searchWord" @keyup.enter="search" />
      </div>
      <button @click="search">검색</button>
    </div>
    <div class="recent_search_wrap">
      <ul>
        <li v-for="(word, i) in recentWord" :key="i">
          <span @click="searchWord = word" class="recent_text">{{ word }}</span>
          <span class="close" @click="recentWord.splice(i, i + 1)">X</span>
        </li>
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
        if (searchWord.value) {
          recentWord.value.push(searchWord.value);
          window.localStorage.setItem('recent_word', JSON.stringify(recentWord.value));
        }
        context.emit('search', searchWord.value);
      };
      const recentWordInit = () => {
        window.localStorage.getItem('recent_word') ? (recentWord.value = JSON.parse(window.localStorage.getItem('recent_word') as string)) : [];
      };
      onMounted(() => {
        recentWordInit();
      });
      return { searchWord, recentWord, search, recentWordInit };
    },
  });
</script>

<style lang="scss" scoped>
  .search_wrap {
    display: flex;
    padding: 1%;
    .search {
      position: relative;
      input {
        width: 300px;
        font-family: cute;
        text-indent: 16px;
        border: 2px rgba(38, 117, 131, 0.5) solid;
        &::placeholder {
          font-family: cute;
          text-indent: 16px;
        }
      }
    }
    button {
      width: 100px;
      margin-left: 15px;
      font-family: cute;
      background-color: blue;
      color: coral;
    }
    .close {
      font-size: 2px;
      position: absolute;
      right: 2%;
      top: 50%;
      transform: translate(0, -50%);
      cursor: pointer;
    }
  }
  .recent_search_wrap {
    width: 100%;
    background-color: #eee;
    padding: 1%;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: wrap;
      li {
        display: flex;
        text-align: center;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: nowrap;
        cursor: pointer;
        background-color: antiquewhite;
        border: 1px solid brown;
        border-radius: 10px;
        margin-left: 1%;
        margin-right: 1%;
        margin-bottom: 1%;
        padding: 1%;
        .recent_text {
          display: inline-block;
          margin-right: 2%;
        }
        .close {
          font-size: 1px;
        }
      }
    }
  }
</style>
