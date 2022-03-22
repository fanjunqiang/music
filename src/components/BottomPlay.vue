<template>
  <div class="bottom-play" v-if="music">
    <div class="bot" v-show="aa">
      <div class="left-img">
        <img :src="music.picUrl || music.al.picUrl" ref="img" alt="" />
      </div>
      <div class="big" @click="quan">
        <div class="song-name" ref="name">
          {{ music.name || music.al.name }}
        </div>
      </div>
      <div class="right-button" @click="controls">
        <div class="btn">
          <canvas height="50px" width="50px" ref="btn"></canvas>
        </div>
        <img class="my-tu" v-show="b" src="../assets/4.png" />
        <img class="my-tu" v-show="!b" src="../assets/5.png" />
      </div>

      <audio
        @timeupdate="updata"
        autoplay
        ref="audio1"
        class="listen"
        :src="`https://music.163.com/song/media/outer/url?id=${music.id}.mp3`"
        controls
      ></audio>
    </div>
    <transition
      enter-active-class=" animate__animated animate__bounceInUp"
      leave-active-class=" animate__animated animate__backOutUp"
    >
      <full-sceen
        v-show="!aa"
        @con="con"
        class="fulling"
        @black="black"
        :songs="music"
        :b="b"
        :playTime="playTime"
        :sumTime="sumTime"
        @clickTime="clickTime"
        :geci="geci"
        :gedan="gedan"
        @conPlay="conPlay"
        @overPlay="overPlay"
        :getsongsList1="getsongsList1"
        :songsId="songsId"
        @playthis="playthis"
        @changing="changing"
        :aa="aa"
        @cleanAll="cleanAll"
      >
      </full-sceen>
    </transition>
  </div>
</template>

<script>
import FullSceen from "./FullSceen.vue";
export default {
  props: {
    music: Object,
    getsongsList1: Array, //歌单具体数据
    stop: Boolean,
    songsId: Number,
    moshi:Number
  },
  data() {
    return {
      songs: null, //单曲信息
      // playMusic: false,
      playbtn: null, //this.$refs.btn按键
      b: true, //音乐播放判定值
      aa: true, //全屏显示判定值
      playTime: 0, //当前歌曲播放进度时间
      sumTime: 0, //歌曲总时长
      geci: "", //一定是'' (String,字符串)，不能写成[](Array,数组)，不然（数据能用）出错，出bug（致命）
      overOne: null,
      gedan: [], //歌单数组只有名字，暂时没用
    };
  },
  // created() {
  //   this.getWords();
  // },
  methods: {
    cleanAll() {
      this.$emit("cleanAll");
    },
    changing(val) {
      this.$refs.audio1.volume = (val / 100).toFixed(1);
    },
    playthis(val) {
      this.$emit("playthis", val);
    },
    //判别循环播放或列表循环
    overPlay(val) {
      this.overOne = val;
      this.$emit("overPlay", val);
    },
    //控制上下一曲
    conPlay(val) {
      this.$emit("conPlay", val);
    },
    clickTime(val) {
      this.$refs.audio1.currentTime = val;
    },
    con(val) {
      this.b = !val;
      this.controls();
    },
    //全屏
    quan() {
      this.aa = !this.aa;
      this.$emit("quan", this.aa);
      this.getWords();
    },
    async getWords() {
      let re = await this.axios.get("/lyric?id=" + this.music.id);
      this.geci = re.data.lrc.lyric;

    },
    black(bla) {
      this.aa = bla;
 
      this.$emit("quan", this.aa);
    },
    updata() {
      this.playbtn = this.$refs.btn;
      // let nowTime = this.$refs.audio1.currentTime;
      this.playTime = this.$refs.audio1.currentTime;
      this.sumTime = this.$refs.audio1.duration;
      this.draw(this.playTime, this.sumTime);
      //播放视频，停止音乐
      if (!this.stop) {
        // this.b = false;
    
        this.$refs.audio1.pause();
        this.$refs.img.style.animationPlayState = "paused";
        this.$refs.name.style.animationPlayState = "paused";
      }
      //关闭视频，添加底部栏动画
      else {
        this.$refs.img.style.animationPlayState = "running";
        this.$refs.name.style.animationPlayState = "running";
      }
      //根据播放状态改变b的值，作出状态响应
      if (this.$refs.audio1.paused) {
        this.b = false;
        this.$refs.img.style.animationPlayState = "paused";
        this.$refs.name.style.animationPlayState = "paused";
      } else if (this.$refs.audio1.played) {
        this.b = true;
      }

      //5,单曲循环
      if (this.overOne == 5) {
        if (this.playTime >= this.sumTime) {
          this.$refs.audio1.currentTime = 0;
          this.$refs.audio1.play();
        }
        //或者this.$refs.audio1.loop=true
      }
      //3 列表循环
      else if (this.overOne == 3||this.moshi==3) {
        if (this.playTime >= this.sumTime) {
          this.$emit("conPlay", 2);
        }
      }
      // 4 随机
      else if (this.overOne == 4) {
        if (this.playTime >= this.sumTime) {
          //取随机歌曲
          this.music =
            this.getsongsList1[
              Math.floor(this.getsongsList1.length * Math.random())
            ];
          this.$refs.audio1.play();
        }
      }
    },
    draw(n, s) {
 
      let hua = this.playbtn.getContext("2d");
      hua.clearRect(0, 0, 50, 50);
      hua.beginPath();
      hua.strokeStyle = "#333";
      hua.lineWidth = "4";
      hua.arc(25, 25, 20, 0, 2 * Math.PI);
      hua.stroke();
      hua.closePath();

      hua.beginPath();
      hua.strokeStyle = "#fff";
      hua.lineWidth = "4";
      hua.arc(25, 25, 20, 0, (2 * Math.PI * n) / s);
      hua.stroke();
      hua.closePath();
    },
    //图标点击事件，控制音乐播放
    controls() {
      if (!this.b) {
        this.$emit("openaudio", true);
        this.$refs.audio1.play();
        this.b = true;
        this.$refs.img.style.animationPlayState = "running";
        this.$refs.name.style.animationPlayState = "running";
      } else {
        this.$refs.audio1.pause();
        this.b = false;
        this.$refs.img.style.animationPlayState = "paused";
        this.$refs.name.style.animationPlayState = "paused";
      }
    },
  },
  //侦听歌曲数据是否改变，变，则请求一次歌词数据
  watch: {
    music: function () {

      this.gedan.unshift(this.music.name);
      this.getWords();

    },
  },
  components: {
    FullSceen,
  },
  // mounted() {

  // },
};
</script>
<style lang="less" scoped>
.bottom-play {
  // padding: 5px;
  position: fixed;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  // font-weight:700;

  width: 100vw;
  // width:100%;
  z-index: 88;
  // overflow:hidden;
  .fulling {
    // position: fixed;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    // top:0;
    z-index: 99;
  }
  .bot {
    display: flex;
    .left-img {
      img {
        margin: 7px 0 0 5px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        animation: zhuan 10s linear infinite;
      }
    }
    .big {
      // width: 250px;
      flex: 1;
      overflow: hidden;
      margin: 0 20px;
      .song-name {
        font-size: 22px;
        // margin-top: 5px;
        white-space: nowrap;
        text-align: left;
        line-height: 54px;
        animation: zou 5s linear infinite;
      }
    }
    .right-button {
      position: relative;
      width: 50px;
      .btn {
        position: absolute;
        right: 8px;
        top: 2px;
        width: 50px;
        height: 50px;
        // background-color: #000;
      }
      .my-tu {
        width: 28px;
        position: absolute;
        top: 50%;
        left: 50%-15px;
        transform: translate(-50%, -50%);
      }
    }

    audio {
      display: none;
    }
  }
}
@keyframes zhuan {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes zou {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(150%);
  }
}
</style>