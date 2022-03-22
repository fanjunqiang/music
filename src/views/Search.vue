<template>
  <div class="search">
    <!-- 别加form标签，按enter会触发默认事件，会出现一个?,http://localhost:8089/?#/search -->
    <div class="biaodan">
      <img
        class="searchLogo"
        @click="result1"
        :style="{ width: '13px' }"
        src="../assets/search.svg"
        alt=""
      />
      <img
        v-show="words"
        class="closeLogo"
        @click="close1"
        :style="{ width: '13px' }"
        src="../assets/closeLogo.svg"
        alt=""
      />

      <input
        @keydown="inp"
        @keyup.enter="result1"
        v-model="words"
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
      />
    </div>
    <component
      :is="searching"
      :history="historyList"
      @addwords="result2"
      @sou="result3"
      :keywords="words"
      :findresult="findList"
      @play="play"
      @cleanhistroy="cleanhistroy"
      @closeit="closeit"
    ></component>
  </div>
</template>

<script>
import HotSearch from "../components/HotSearch.vue";
import OnSearch from "../components/OnSearch.vue";
import SearchResult from "../components/SearchResult.vue";
import _ from "lodash";
export default {
  data() {
    return {
      searching: "HotSearch",
      words: "",
      historyList: [],
      findList: [],
    };
  },
  methods: {
    closeit(val){
 localStorage.setItem("history", JSON.stringify(val));
    },
    cleanhistroy() {
      this.historyList = [];
      localStorage.setItem("history", JSON.stringify(this.historyList));
    },
    play(val) {
      this.$emit("play", val);
    },
    inp: _.debounce(function () {
      if (this.words.length < 1) {
        this.searching = "HotSearch";
      } else {
        this.searching = "OnSearch";
        if (this.findList) {
          this.findLi();
        }
      }
    }, 50),
    // result1的延时一定要比result的长，不然出bug（按enter，只显示OnSearch组件）
    result1() {
      
      this.searching = "SearchResult";
    
      let num_b = true;
      // 历史记录去重
      for (let i = 0; i < this.historyList.length; i++) {
        if (this.historyList[i] == this.words) {
          num_b = false;
        }
      }
      if (num_b) {
        this.historyList.unshift(this.words); //去重，查询内容加入数组
        localStorage.setItem("history", JSON.stringify(this.historyList));
      }
    },
    result2(val) {
      this.searching = "SearchResult";
      let num_a = true;
      for (let i = 0; i < this.historyList.length; i++) {
        if (this.historyList[i] == val) {
          num_a = false;
        }
      }
      if (num_a) {
        this.historyList.unshift(val);
        localStorage.setItem("history", JSON.stringify(this.historyList));
      }

      this.words = val;
    },
    result3(value) {
      this.searching = "SearchResult";
      let num_a = true;
      for (let i = 0; i < this.historyList.length; i++) {
        if (this.historyList[i] == value) {
          num_a = false;
        }
      }
      if (num_a) {
        this.historyList.unshift(value);
        localStorage.setItem("history", JSON.stringify(this.historyList));
      }
      this.words = value;
    },
    async findLi() {
      let er = await this.axios.get(`/search/suggest?keywords=${this.words}`);
      this.findList = er.data.result || [];

      this.findList.albums = this.findList.albums || [];
      this.findList.songs = this.findList.songs || [];
      this.findList.artists = this.findList.artists || [];
      this.findList.playlists = this.findList.playlists || [];
      this.findList = this.findList.albums
        .concat(this.findList.songs)
        .concat(this.findList.artists)
        .concat(this.findList.playlists);

    },
    close1() {
      this.words = "";

      this.inp();
    },
  },
  components: {
    HotSearch,
    OnSearch,
    SearchResult,
  },
  // 设置历史记录缓存
  // 组件路由，加载历史记录
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.historyList = JSON.parse(localStorage.getItem("history")) || [];
 
    });
  },
  // 离开路由缓存当前历史记录，将历史记录数组存入localStorage
  beforeRouteLeave(to, from, next) {
   
    localStorage.setItem("history", JSON.stringify(this.historyList));
    next();
  },
};
</script>

<style lang="less" scoped>
.search {
  .biaodan {
    padding: 15px 0;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
    .searchLogo {
      position: absolute;
      padding: 10px;
      top: 50%;
      left: 3%;
      transform: translateY(-50%);
    }
    .closeLogo {
      padding: 10px;
      position: absolute;
      top: 50%;
      right: 3%;
      transform: translateY(-50%);
    }
    input {
      width: 78%;
      height: 30px;
      padding: 0 30px;
      font-size: 14px;
      background-color: #f2f2f2;
      outline: none;
      border: 0;
      border-radius: 15px;
      &::-webkit-input-placeholder {
        color: #ccc;
      }
      &::-moz-input-placeholder {
        color: #ccc;
      }
      &::-ms-input-placeholder {
        color: #ccc;
      }
    }
  }
}
</style>