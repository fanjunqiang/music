<template>
  <div ref="full" class="full">
    <div
      class="bg-play"
      :style="{
        background: `url(${songs.picUrl || songs.al.picUrl})`,
      }"
    ></div>
    <div class="black" @click="black">
      <img src="../assets/fanhui.png" alt="" />
      <div class="geming">{{ songs.name }}</div>
    </div>
    <div class="body">
      <div class="zheng" :class="b ? 'zheng' : 'zhenghui'">
        <img src="../assets/needle-ab.png" alt="" />
      </div>
      <div class="mid">
        <img
          class="gedie"
          ref="img"
          :src="songs.picUrl || songs.al.picUrl"
          :style="{ animationPlayState: b ? 'running' : 'paused' }"
        />
      </div>
      <!-- 音量，控制audio的volume属性的值（0~1） -->
      <div class="yinliang">
        <input type="range" value="0" min="0" max="100" v-model="yinliang" />
        &nbsp;<span>{{ yinliang }}</span>
        <img
          v-show="yinliang != 0"
          @click="yinliang = 0"
          src="../assets/controls/shengyinkai.svg"
          alt=""
        />
        <img
          v-show="yinliang == 0"
          @click="yinliang = 70"
          src="../assets/controls/jingyin.svg"
          alt=""
        />
      </div>
      <div class="hh">
        <ul
          class="songs-words"
          :style="{ transform: `translateY(${-30 * heightLight}px)` }"
        >
          <!-- {{songsWords}} -->
          <template tag="li" v-for="(items, index) in songsWords">
            <li :class="index == heightLight ? 'active' : ''" :key="index">
              {{ items.words }}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="foot">
      <!-- <div> -->
      <div class="top">
        <span>{{ playTime | filterTime }}</span>
        <input type="range" value="0" min="0" max="100" v-model="jingdu" />
        <span>{{ sumTime | filterTime }}</span>
      </div>

      <div class="bom">
        <div class="playmoshi">
          <!--  列表播放 -->
          <div style="width: 35px" @click="listPlay3" v-if="playmoshi == 0">
            <img src="../assets/6.svg" alt="" />
          </div>
          <!-- 随机播放 -->
          <div
            style="width: 35px"
            @click="listPlay4"
            v-else-if="playmoshi == 1"
          >
            <img src="../assets/controls/suiji.svg" alt="" />
          </div>
          <!-- 单曲循环 -->
          <div @click="listPlay5" v-else-if="playmoshi == 2">
            <img
              style="width: 35px"
              src="../assets/controls/24gl-repeatOnce2.svg"
              alt=""
            />
          </div>
        </div>
        <!-- 上一首 -->
        <div class="shang" @click="listPlay1">
          <img src="../assets/controls/shangyiqu101.svg" alt="" />
        </div>

        <div @click="con">
          <!-- {{ b ? "停止" : "播放" }} -->
          <img
            style="width: 60px"
            v-show="b"
            src="../assets/controls/24gl-pauseCircle.svg"
          />
          <img
            style="width: 60px"
            v-show="!b"
            src="../assets/controls/24gl-playCircle.svg"
          />
        </div>
        <!-- 下一首 -->
        <div class="xia" @click="listPlay2">
          <img src="../assets/controls/xiayiqu101.svg" alt="" />
        </div>
        <!-- 列表 -->
        <div class="liebiao" @click="out">
          <img
            src="../assets/controls/liebiao2.svg"
            style="width: 30px"
            alt=""
          />
        </div>
      </div>
      <transition
        enter-active-class="animate__animated animate__backInUp"
        leave-active-class="animate__animated animate__backOutDown"
      >
        <div class="gebiao" v-show="appear">
          <div class="xiala" @click="out">
            <img src="../assets/controls/xiala.svg" alt="" />
          </div>
          <ul>
            <li>
              <div
                class="cleanAll"
                @click="cleanAll"
                v-show="getsongsList1.length > 5"
              >
                <img
                  style="width: 25px"
                  src="../assets/controls/shanchu.svg"
                  alt=""
                />
              </div>
            </li>
            <li v-for="(item, index) in getsongsList1" :key="item.id">
              <div class="number" @click="del(index)">
                <img src="../assets/close.svg" style="width: 15px" alt="" />
              </div>
              <div
                class="ge-name"
                @click="playthis(item)"
                :class="item.id == songsId ? 'playing' : ''"
              >
                {{ item.name }}
              </div>
              <!-- <music-list
          @play="$emit('play', $event)"
          class="ge-name"
                @click="playthis(item)"
          :class="item.id == songsId ? 'playing' : ''"
          :songIfa="item"
        > -->
              <!-- </music-list> -->
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
// import MusicList from "../components/MusicList.vue"
export default {
  props: {
    songs: Object,
    b: Boolean,
    playTime: {
      type: Number,
      default: 0,
    },
    sumTime: {
      type: Number,
      default: 0,
    },
    geci: [String, Array, Object],
    getsongsList1: Array, //歌单具体数据
    songsId: Number,
    aa: Boolean,
  },
  data() {
    return {
      bla: true,
      getMusicInfor: null,
      index: 0,
      controlsIndex: 0,
      controlsIndex1: 0,
      playmoshi: 0,
      appear: false,
      //   sumTime: 0,
      yinliang: 70, //音量控制，默认70
    };
  },
  components: {
    // MusicList
  },
  methods: {
    cleanAll() {
      this.$emit("cleanAll");
    },
    playthis(song) {
      this.$emit("playthis", song);
    },
    del(index) {

      this.getsongsList1.splice(index, 1);
    },
    out() {
      this.appear = !this.appear;
    },
    listPlay1() {
      this.controlsIndex = 1;
      this.$emit("conPlay", 1);
    },
    listPlay2() {
      this.controlsIndex = 2;
      this.$emit("conPlay", 2);
    },
    listPlay3() {
      this.playmoshi = 1;
      this.controlsIndex1 = 4;
      this.$emit("overPlay", 4);
    },
    listPlay4() {
      this.playmoshi = 2;
      this.controlsIndex1 = 5;
      this.$emit("overPlay", 5);
    },
    listPlay5() {
      this.playmoshi = 0;
      this.controlsIndex1 = 3;
      this.$emit("overPlay", 3);
    },
    black() {

      // this.$refs.full.classList.add("animate__bounceOutDown")
      this.$emit("black", this.bla);
      this.appear = false; //退出全屏时，若收集歌单未关闭，则自动关闭，确保下次进入全屏时不会显示
    },
    con() {
      this.controlsIndex = 6;
      this.$emit("con", !this.b);
    },
  },
  filters: {
    filterTime(value) {
      let min = parseInt(value / 60);
      let sec = parseInt(value % 60);
      let words = sec < 10 ? "0" + sec : sec;
      let words1 = min < 10 ? "0" + min : min;
      let words2 = words1 + ":" + words;
      return words2;
    },
  },
  watch: {
    yinliang: function () {
      this.$emit("changing", this.yinliang);
    },
  },
  computed: {
    jingdu: {
      get() {
        return (this.playTime / this.sumTime) * 100;
      },
      set(value) {
 
        let clickTime = (value / 100) * this.sumTime;
        this.$emit("clickTime", clickTime);
      },
    },
    songsWords() {
      let arr = this.geci.split("\n"); //一定是字符串
      arr.pop();
      let reg = /\[(\d+?):(\d+?\.\d+)\]([.\s\S]*)/;

      return arr.map((item) => {
        if (reg.test(item)) {
          return {
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            words: RegExp.$3 || " ",
          };
        }
      });
    },
    heightLight() {
      let arr2 = this.songsWords;

      for (let i = 0; i < arr2.length; i++) {
        if (i + 1 == arr2.length) {
          return i;
        } else if (
          arr2[i].time <= this.playTime &&
          arr2[i + 1].time > this.playTime
        ) {

          return i;
        }
      }
      return 0;
    },
  },
};
</script>
<style lang="less" scoped>
.full {
  //   width: 100vw;
  //   height: 100vh;
  color: white;
  position: relative;

  .bg-play {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    filter: blur(10px);
    z-index: -1;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .black {
    width: 60px;
    height: 30px;
    margin: 10px;
    // background-color: rgba(211, 189, 189, 0.5);
    border-radius: 5px;
    color: #fff;
    line-height: 30px;
    position: relative;
    .geming {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(18%);
      width: 300px;
      background: linear-gradient(to right, orange, aqua, red);
      -webkit-background-clip: text; //规定背景的绘制区域为文字
      color: transparent; //文字为透明色
      font-weight: 600;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .body {
    position: relative;
    .zheng {
      position: absolute;
      left: 86%;
      top: 0px;
      transform: rotate(20deg);
      transform-origin: 10px 10px;
      animation: zheng 1s linear forwards;

      z-index: 1;
      img {
        width: 100px;
      }
    }
    .zhenghui {
      animation-name: zhenghui;
    }
    .mid {
      .gedie {
        width: 250px;
        height: 250px;
        border-radius: 125px;
        animation: zhuan 10s linear infinite;
        border: 4px solid transparent;
        background: linear-gradient(to right, orange, aqua, red);
        -webkit-background-clip: border; //规定背景的绘制区域为文字
      }
    }
    .yinliang {
      position: absolute;
      right: 50%;
      top: 260px;
      transform: translateX(50%);
      input {
        height: 3px;
        width: 200px;
        // transform:rotate(-90deg);
      }
      img {
        position: absolute;
        left: -38px;
        top: -5px;
      }
      span {
        position: absolute;
        right: -15px;
        top: 5px;
      }
    }
    .hh {
      position: relative;
      margin: 30px 0 0 0;
      width: 100vw;
      height: 200px;
      overflow: hidden;
      .songs-words {
        width: 90vw;
        margin-left: 5vw;
        position: absolute;
        top: 30%;
        left: 0;
        transform: translateY(0px);
        transition: transform 0.5s;
        li {
          //   transform:translateY(200px);
          height: 25px;
          font-size: 18px;
          margin: 5px 0 0 0;
          white-space: nowrap;
          overflow: hidden;
          color: #999;
          font-weight: 500;
        }
        .active {
          //   color: red;
          height: 35px;
          transform: scale(1.2);
          font-weight: 600;
          color: white;
          // background: linear-gradient(to right, orange, aqua, red);
          // -webkit-background-clip: text; //规定背景的绘制区域为文字
          // color: transparent; //文字为透明色
        }
      }
    }
  }

  .foot {
    position: absolute;
    bottom: 0px;
    width: 100vw;
    height: 130px;
    padding: 20px 0;
    background-color: rgba(0, 0, 0, 0.7);

    .top {
      height: 30px;
      margin: 10px 0 0 0;
      input {
        margin: 10px 8px 0 8px;
        width: 70vw;
        height: 5px;
      }
    }

    .bom {
      //   height: 100%;
      padding-top: 10px;
      display: flex;
      justify-content: space-evenly;
      line-height: 50px;
      overflow: hidden;
      .playmoshi {
        margin-top: 12px;
      }
      .shang {
        margin-top: 12px;
      }
      .xia {
        margin-top: 12px;
      }
      .liebiao {
        // position: absolute;
        // top: 0px;
        // right: 0px;
        margin-top: 12px;
        padding: 3px;
        border-radius: 5px;
      }
    }
    .gebiao {
      position: absolute;
      bottom: 0;
      // z-index: 77;
      // bottom: 0;
      // left: 0px;
      height: 50vh;
      width: 100vw;
      // background-color: rgba(0, 0, 0, 0.8);
      background-color: white;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      .xiala {
        margin-top: 10px;
      }
      ul {
        padding: 0 10px;
        overflow: scroll;
        height: 40vh;
        li {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          color: black;
          div {
            font-size: 25px;
            margin: 10px;
            // flex:1;
          }
          .ge-name {
            flex: 1;
            text-align: left;
          }
          .playing {
            color: aqua;
          }
        }
      }
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
@keyframes zheng {
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(60deg);
  }
}
@keyframes zhenghui {
  0% {
    transform: rotate(60deg);
  }
  100% {
    transform: rotate(20deg);
  }
}
</style>