<template>
  <div id="newest">
    <!-- -->

    <img class="image" :src="item.cover" @click="bofang = true" alt="" />
    <p>
      <span>{{ item.name }}</span>
    </p>
    <span class="count"> {{ item.playCount | people }}</span>

    <div class="vidbg" :style="{ display: bofang ? 'block' : 'none' }">
      <video
        ref="video"
        class="vid"
        controls
        :src="mv"
        :style="{ display: bofang ? 'block' : 'none' }"
      ></video>
      <div class="close-vid">
        <img src="../assets/close.svg" @click="closeVideo" alt="" />
      </div>
      
      <ul>
        <li class="nextlist" v-if="mv">最新评论({{mvComment.length}})</li>
        <li v-for="(item, index) in mvComment" :key="index">
          <new-comment :news="item" v-if="mv"></new-comment>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import NewComment from "../components/NewComment.vue";
export default {
  props: ["item", "itId"],
  data() {
    return {
      mv: [],
      bofang: false,
 mvComment:[],
    };
  },
  created() {
    this.NewMv();
  },
  methods: {
    async NewMv() {
      let re = await this.axios.get(`/mv/url?id=${this.itId}`);
      this.mv = re.data.data.url;

       let re1 = await this.axios.get(`/comment/mv?id=${this.itId}`);
      this.mvComment = re1.data.comments;

    },
    //关闭并停止视频播放
    closeVideo() {
      this.bofang = false;
      this.$refs.video.pause();
    },
  },
  components: {
    NewComment,
  },
};
</script>

<style lang="less" scoped>
#newest {
  width: 100%;
  height: 100%;
  text-align: left;
  margin-bottom: 15px;
  position: relative;
  border-radius: 20px;

  .vidbg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 66;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.2);
    .vid {
      width: 100vw;
      position: fixed;
      top: 0;
      right: 0;
      // z-index: 76;
    }
    .close-vid {
      position: fixed;
      top: 10px;
      right: 2vw;
      z-index: 1;
      img {
        width: 30px;
      }
    }
  
  ul {position: absolute;
    top:32vh;
    background-color:white;
    height: 68vh;
    overflow: scroll;
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
      .nextlist {
      //  width: 100vw;
    padding: 3px 10px;
    font-size: 12px;
    color: rgb(102, 102, 102);
    text-align: left;
    background-color: rgb(238, 239, 240);
   
  }
  }
  }

  .image {
    width: 100%;
    // height:100%;
    height: 102px;
    border-radius: 10px;
    // border: 1px solid #333;
    box-sizing: border-box;
  }
  p {
    color: #333;
    font-size: 12px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    span {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
  .count {
    color: white;
    position: absolute;
    display: inline-block;
    padding: 3px 5px;
    font-size: 12px;
    top: 0;
    right: 0;
    &::before {
      content: "";
      position: absolute;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
      background-repeat: no-repeat;
      width: 12px;
      height: 12px;
      top: 6px;
      left: -10px;
    }
  }
}
</style>