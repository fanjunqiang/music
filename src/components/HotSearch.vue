<template>
  <div class="hot-search">
    <div class="title">热门搜索</div>
    <my-load v-if="searchList.length<1"></my-load>
    <ul class="search-nav">
      <li @click="sea" v-for="(item, index) in searchList" :key="index">
        {{ item.first }}
      </li>
    </ul>
    <div v-show="history.length>0">
      <div class="clall" @click="cleanhistroy">一键清理</div>
    </div>
    <ul class="search-history">
      <li v-for="(item, index) in history" :key="index">
        <img class="clock" src="../assets/clock.svg" alt="" />
        <div @click="sea">
          {{ item }} <img  :id="index" class="close" @click.stop="closeIt" src="../assets/close.svg" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MyLoad from "../components/Myload.vue";
export default {
  props: {
    history: [Array],
  },
  data() {
    return {
      searchList: [],
     
    };
  },
  methods: {
    cleanhistroy(){
      this.$emit('cleanhistroy');
    },
    async getList() {
      let er = await this.axios.get("/search/hot");
      this.searchList = er.data.result.hots;

    },
    sea(event){
      let wor=event.target.innerText;
      this.$emit("addwords",wor)
    },
    closeIt(event){

        this.history.splice(event.target.id,1);

        this.$emit("closeit",this.history)
    },
  },
  components:{
      MyLoad
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.hot-search {
  text-align: left;
  color: #666;
  font-size: 12px;
  padding: 0 20px 0 10px;
  .title {
    padding: 10px 0;
  }
  .search-nav {
    color: rgb(51, 51, 51);
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 0 10px 10px 0;
      padding: 5px 10px;
      border-radius: 20px;
      border: 1px solid #ccc;
    }
  }
  .search-history {
    margin-top: 10px;
    li {
      display: flex;
      .clock {
        width: 17px;
        margin:10px 10px;
      }
      div {
        color: rgb(51, 51, 51);
        font-size: 16px;
        line-height:37px;
        flex: 1;
        position: relative;
        .close {
          padding:10px 0 10px 10px;
          position: absolute;
          right: 0;
          top:50%;
          transform: translateY(-50%);
          width: 15px;
        }
      }
    }
  }
}
</style>