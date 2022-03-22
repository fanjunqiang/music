<template>
  <div class="hot">
    <div class="hot-head">
      <div class="top-words"></div>
      <div class="mid"></div>
      <div class="box1"></div>
      <div v-if="updataTime" class="updatatime">
        更新时间:{{ updataTime | filterTime("m月d日") }}
      </div>
      <div class="all-list" @click="$emit('listall', music1)">
        <img src="../assets/controls/danlieliebiao.svg" alt="" />
      </div>
    </div>
    <my-load v-if="music1.length < 1"></my-load>
    <ul>
      <li v-for="(item, index) in music1" :key="item.id">
        <div class="number" :style="{ color: index + 1 <= 3 ? 'red' : '#999' }">
          {{ (index + 1) | filterIndex }}
        </div>
        <music-list
          @play="$emit('play', $event)"
          class="number-song"
          :songIfa="item"
        >
        </music-list>
      </li>
    </ul>
    <div class="dianji" ref="foot" @click="dianji" v-if="music1.length >= 1">
      {{ page >= 10 ? "到底了哟" : "点击加载" }}
    </div>
  </div>
</template>

<script>
import MusicList from "../components/MusicList.vue";
import MyLoad from "../components/Myload.vue";
export default {
  data() {
    return {
      music: [],
      updataTime: 0,
      page: 1,
      br: [],
      music1: [], //歌曲列表
    };
  },
  methods: {
    //ES7  axios请求数据写法，async异步，await同步，节省代码量，19723756
    async hotMusic() {
      let re = await this.axios.get("/playlist/detail?id=3778678");
      this.music = re.data.playlist.tracks;
      this.br = re.data.privileges;
      for (let i = 0; i < this.music.length; i++) {
        this.music[i]["maxbr"] = this.br[i].maxbr;
      }
      this.music1 = this.music.slice(0, 20 * this.page);
      this.updataTime = re.data.playlist.trackUpdateTime;

    },
    //点击加载
    dianji() {
      if (this.page < 10) {
        this.page++;
      
        this.music1 = this.music.slice(0, 20 * this.page);
      
      }
      // else {
      // alert("到底了O(∩_∩)O哈哈~");
      // }
    },
    //触底加载
    scrollbar() {
      let el = document.documentElement || document.body;
      let top = el.scrollTop + el.clientHeight; //卷去高度+视口高度
      
      let morTop = this.$refs.foot.offsetTop; //底部提示框距离顶部的高度
      let that = this;
      if (top >= morTop + 21) {
        //top>=底部提示框距离顶部的高度+底部提示框高度
        that.dianji();
      }
    },
  },
  //进入
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.scrollbar);
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.scrollbar);
    next();
  },
  created() {
    //ES7  axios请求数据写法，async异步，await同步，节省代码量
    this.hotMusic();
  },
  components: {
    MusicList,
    MyLoad,
  },
};
</script>
<style lang="less" scoped>
.hot-head {
  padding: 0 0 0 20px;
  height: 144px;
  position: relative;
  background: url(https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=)
    no-repeat;
  background-size: 100% 100%;
  .top-words {
    position: absolute;
    top: 25px;
      background: url("../assets/index_icon_2x.png") no-repeat -28px -30px;
      width: 43px;
      height: 14px;
      background-size: 166px 96px;
  }
  .mid {
    background: url("../assets/index_icon_2x.png") no-repeat -24px -49px;
    background-size: 166px 97px;
    width: 141px;
    height: 47px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .box1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
  .updatatime {
    color: white;
    position: absolute;
    bottom: 20px;
    font-size: 12px;
  }
  .all-list {
    position: absolute;
    bottom: 10px;
    font-size: 20px;
    border-radius: 5px;
    // border: 1px solid #fff;
    // color: white;
    right: 20px;
  }
}
.hot {
  ul {
    li {
      display: flex;
      .number {
        width: 40px;
        line-height: 54px;
      }
      .number-song {
        flex: 1;
      }
    }
  }
}
</style>