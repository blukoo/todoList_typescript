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
          <span @click="searchWord = word">{{ word }}</span>
          <span @click="delRecentWord(i)" class="recent_delete">X</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, watch, onBeforeMount } from 'vue';
  import { setItem, getItem } from '@/global/util';
  export default defineComponent({
    setup(props, context) {
      const searchWord = ref<string | null>(null);
      const recentWord = ref<string[]>([]);
      const search = () => {
        if (getItem('recent_word')) {
          recentWord.value.map((e: string, i: number) => {
            if (e === searchWord.value) {
              recentWord.value.splice(i, 1);
            }
          });
        }
        if (searchWord.value!) {
          recentWord.value.unshift(searchWord.value!);
          setItem('recent_word', recentWord.value);
        }
        context.emit('search', searchWord.value);
      };
      const delRecentWord = (i: number) => {
        recentWord.value.splice(i, i + 1);
        setItem('recent_word', recentWord.value);
      };
      const recentWordInit = () => {
        getItem('recent_word') ? (recentWord.value = JSON.parse(window.localStorage.getItem('recent_word') as string)) : [];
      };
      onMounted(() => {
        recentWordInit();
      });
      return {
        searchWord,
        recentWord,
        search,
        recentWordInit,
        delRecentWord,
      };
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
    padding-bottom: 0;
    ul {
      display: flex;
      flex-wrap: wrap;
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
        // flex-basis: 5%;
        border-radius: 10px;
        padding: 0 1%;
        margin: 0 1% 1%;
        display: flex;
        gap: 1em;
        align-items: center;
        span {
          text-align: left;
          &.recent_delete {
            width: 10px;
            height: 10px;
            background: red;
            border-radius: 10px;
            display: inline-block;
            color: #fff;
            font-size: 2px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
