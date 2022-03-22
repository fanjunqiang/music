<template>
  <div class="on-search">
    <div class="keywords">
      <div>搜索"{{ keywords }}"</div>
    </div>

    <!-- <div v-if="findresult.length <1">无法查找到结果</div> -->
    <ul v-if="findresult.length >= 1">
      <template v-for="(item, index) in findresult">
        <li v-if="item" :key="index" @click="clickme">
          <img :style="{ width: '15px' }" src="../assets/search.svg" alt="" />
          {{ item.name }}
        </li>
      </template>
    </ul>
    <!-- <div v-else-if="findresult.length<1">
      {{ 1>this.findresult.length ? "暂无相关结果" : "" }}
    </div> -->
    <my-load v-else></my-load>
  </div>
</template>
<script>
import MyLoad from "./Myload.vue";
export default {
  props: {
    keywords: [String, Number],
    findresult: [Array, Object],
  },
  data() {
    return {};
  },
  created() {

  },
  methods: {
    clickme(event) {
      let souWords = event.target.innerText;
      this.$emit("sou", souWords);
    },
  },
  components: {
    MyLoad,
  },
};
</script>
<style lang="less" scoped>
.on-search {
  padding: 0px 10px;
  .keywords {
    text-align: left;
    div {
      color: rgb(80, 125, 175);
      font-size: 15px;
      line-height: 50px;
      border-bottom: 1px solid rgb(238, 239, 240);
    }
  }
  ul {
    color: rgb(51, 51, 51);
    font-size: 15px;
    padding: 0 10px;
    li {
      padding: 10px 0 10px 10px;
      text-align: left;
      border-bottom: 1px solid rgb(238, 239, 240);
      position: relative;
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -10px;
      }
    }
  }
}
</style>
