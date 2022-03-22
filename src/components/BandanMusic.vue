<template>
  <div class="bandan-music">
    <div class="bantop" :style="{ backgroundImage: `url(${topListbg})` }">
      <img class="backbtn" @click="backbtn" src="../assets/fanhui.png" alt="" />
      <img class="pic" :src="topListbg" alt="" />
      <h2>{{ bangName }}</h2>
      <div class="playAll" @click="playAll">播放全部</div>
    </div>
    <div class="banglist">歌曲列表</div>
    <div v-if="topSong.length<1" :style="{height:'25px'}">
      <my-load v-if="topSong.length<1">
    </my-load>
    </div>
    
    <div class="song" v-for="(item, index) in topSong" :key="item.id">
      <div class="num">
        {{ index + 1 }}
      </div>
      <music-list class="list" :songIfa="item" @play="$emit('play', $event)"> </music-list>
    </div>
    <div class="banglist">最新评论</div>
    <my-load v-if="newBangComments.length<1">
    </my-load>
      <ul>
      <li v-for="(item,index) in newBangComments" :key="index">
          <new-comment :news="item"></new-comment>
      </li>
    </ul>
  </div>
</template>

<script>
import MusicList from "./MusicList.vue";
import NewComment from "../components/NewComment.vue";
import MyLoad from "../components/Myload.vue";
export default {
  components: { MusicList,NewComment,MyLoad },
  props: {
    // topListSongs: Object,
    topSong: Array,
    bangName: String,
    topListbg: String,
    newBangComments:Array
  },
  data() {
    return {
      topSong1: [],
    };
  },
  created() {
    this.topSong1 = this.topSong;
  },
  methods: {
    playAll() {
      this.$emit("playAll", this.topSong);
    },
    backbtn() {
      this.$emit("backbtn");
    },
  },
};
</script>

<style lang="less" scoped>
.bandan-music {
  background-color: white;
  text-align: left;
  // ;
  overflow: scroll;

  background-color: rgb(255, 255, 255);
  z-index: 11;
  .bantop {
    height: 30vh;
    position: relative;
    padding: 10px 0 0 10px;
    background-size: 300% 300%;
    &::after {
      content: "";
      background-color: rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
    }
    .backbtn {
      position: absolute;
      z-index: 1;
    }
    .pic {
      position: absolute;
      width: 145px;
      height: 145px;
      top: 45px;
      left: 15px;
      z-index: 1;
    }
    h2 {
      position: absolute;
      bottom: 20px;
      color: white;
      z-index: 1;
      top: 45px;
      left: 180px;
    }
    border-bottom: 1px solid #ccc;
  }
  .banglist {
    height: 23px;
    background-color: #ccc;
    font-size: 13px;
    line-height: 23px;
    padding: 0 10px;
  }
  .playAll {
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 5px;
    border: 1px solid #fff;
    border-radius: 10px;
    color: white;
    z-index: 1;
  }
  .song {
    padding: 0 0 0 10px;
    display: flex;
    .num {
      padding:0 20px 0 10px;
      height: 100%;
      line-height:55px;
      font-size:20px;
    }
    .list{
      flex:1;
    }
  }
}
</style>