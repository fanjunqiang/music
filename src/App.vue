<template>
  <div id="app">
    <!-- <div class="head">
      <div class="down-app">下载APP</div>
    </div> -->
    <transition enter-active-class="animate__animated animate__backInDown">
      <nav-title v-show="aa"></nav-title>
    </transition>
    <transition enter-active-class="animate__animated animate__backInLeft">
      <router-view
        :style="{ marginTop: '40px' }"
        @play="play"
        :getsongsList1="getsongsList1"
        @stopaudio="stopaudio"
        @listall="listall"
        :songsId="songsId"
        @zhankai="quan"
        @playAll="listall"
      />
    </transition>

    <bottom-play
      class="animate__animated animate__bounceInUp"
      @quan="quan"
      :music="songs"
      @conPlay="conPlay"
      @overPlay="overPlay"
      :getsongsList1="getsongsList1"
      :stop="stop"
      @openaudio="openaudio"
      :songsId="songsId"
      @playthis="playthis"
      @cleanAll="cleanAll"
      :moshi="moshi"
      @playAll="listall"
    ></bottom-play>
  </div>
</template>

<script>
import NavTitle from "./components/NavTitle.vue";
import BottomPlay from "./components/BottomPlay.vue";
export default {
  data() {
    return {
      songs: null,
      a: Boolean,
      bs: Boolean,
      aa: Boolean,
      getsongsList1: [], //要播放的音乐列表
      i: 0,
      ok: null,
      stop: true,
      moshi: 0,
      songsId: 0,
    };
  },
  methods: {
    //清空歌单
    cleanAll(){
      this.getsongsList1=[];
    },
    playthis(val) {
      this.songs = val;
      this.songsId=this.songs.id;
 
    },
    //一键播放全部，默认为列表循环模式
    listall(val) {
      this.getsongsList1 = val;
      this.songs=val[0];
      this.moshi=3;//列表模式
      this.songsId=val[0].id;//高亮
    },
    //关闭视频，传true，手动播放音乐
    openaudio(val) {
      this.stop = val;
    },
    //打开视频，传false，停止音乐
    stopaudio(val) {
      this.stop = val;
    },
    overPlay(val) {
      this.moshi = val;
    },
    conPlay(val) {
      if (this.moshi == 4) {
        if (val == 1) {
          this.songs =
            this.getsongsList1[
              Math.floor(this.getsongsList1.length * Math.random())
            ];
        }
        // 值为2，下一曲
        else if (val == 2) {
          this.songs =
            this.getsongsList1[
              Math.floor(this.getsongsList1.length * Math.random())
            ];
        }
      } else {
        // 值为1，上一曲
        if (val == 1) {
          if (this.i == 0&&this.getsongsList1.length>1) {
            this.i = this.getsongsList1.length - 1;
            this.songs = this.getsongsList1[this.i];
          } 
          else if(this.getsongsList1.length==1){
            this.songs=this.getsongsList1[0];
          }
          else {
            this.i--;
            this.songs = this.getsongsList1[this.i];
          }
        }
        // 值为2，下一曲
        else if (val == 2) {
          if (this.i == this.getsongsList1.length - 1&&this.getsongsList1.length>1) {
            this.i = 0;
            this.songs = this.getsongsList1[this.i];
          }
          else if(this.getsongsList1.length==1){
            this.songs=this.getsongsList1[0];
          }
          else {
            this.i++;
            this.songs = this.getsongsList1[this.i];
          }
        }
      }
      this.songsId = this.songs.id;
    
    },
    getsongsList(value) {
      this.getsongsList1 = value;
    },
    quan(aa) {
      this.aa = aa;
    },
    play(songs) {
      this.songs = songs;
     this.songsId=this.songs.id;
    
      //去重
      for (var i = 0; i < this.getsongsList1.length; i++) {
        if (
          this.getsongsList1[i] == songs ||
          this.getsongsList1[i].name == songs.name
        ) {
          return;
        }
      }
      this.songsId = songs.id;
      this.getsongsList1.unshift(songs);

    },
  },
  components: {
    NavTitle,
    BottomPlay,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-color: rgba(0,255,255,0.8);
}
// .head {
//   height: 84px;
//   width: 100%;
//   background-color: #d43c33;
//   position: fixed;
//   top: 0;
//   .down-app {
//     position: absolute;
//     right: 0;
//     top: 50%-18px;
//     margin-right: 10px;
//     display: inline-block;
//     height: 36px;
//     line-height: 36px;
//     font-size: 16px;
//     width: 100px;
//     text-align: center;
//     color: #d43c33;
//     background-color: #fff;
//     border-radius: 18px;
//   }
// }
</style>
