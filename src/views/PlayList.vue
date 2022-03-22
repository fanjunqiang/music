<template>

  <div class="playlist" v-if="listdata">
    <div class="playlist-top" v-if="musicData.length>1">
      <div
        class="bgimage"
        :style="{
          background: `url(${listdata.coverImgUrl})`,
          backgroundPosition: ' 50% 35%',
        }"
      ></div>
      <div class="top-left">
        <img :src="listdata.coverImgUrl" alt="" />
        <div class="songs-manu">歌单</div>
        <div class="playCount">{{ listdata.playCount | people }}</div>
      </div>
      <div class="top-right">
        <div class="say">
          {{ listdata.name }}
        </div>
        <div class="artor">
          <img class="img-artor" :src="picUrl" />
          <span>{{ artor }}</span>
        </div>
      </div>
    </div>
    <div class="nextlist" v-if="musicData.length > 1">歌曲列表</div>
    <ul>
      <li v-for="(item, index) in musicData" :key="item.id">
        <div class="number" :style="{ color: '#999' }">
          {{ (index + 1) | filterIndex }}
        </div>
        <music-list class="number-song"  @play="$emit('play',$event)" :songIfa="item"> </music-list>
      </li>
    </ul>
    <hot-comment :hots="hotComment" v-if="musicData.length > 1"></hot-comment>
    <div>
      <div class="nextlist" v-if="musicData.length > 1">最新评论</div>
       <ul>
      <li v-for="(item,index) in newComment" :key="index">
          <new-comment :news="item" v-if="musicData.length > 1"></new-comment>
      </li>
    </ul>
  
    </div>
   
  </div>
</template>

<script>
import MusicList from "../components/MusicList.vue";
import HotComment from "../components/HotComment.vue";
import NewComment from "../components/NewComment.vue";
export default {
  data() {
    return {
      listId: this.$route.params.listId,
      listdata: {},
      musicData: [],
      br: [],
      picUrl: "",
      hotComment: [],
      newComment: [],
      artor:""
    };
  },
  methods: {
    async MusicList() {
      let re2 = await this.axios.get(
        `/comment/playlist?id=${this.$route.params.listId}&limit=10`
      );
      let re1 = await this.axios.get(
        `/playlist/detail?id=${this.$route.params.listId}`
      );
 
      this.listdata = re1.data.playlist;
      this.picUrl = this.listdata.creator.avatarUrl;
      this.musicData = re1.data.playlist.tracks;
      this.br = re1.data.privileges;
      this.artor=this.listdata.creator.nickname;


      this.hotComment = re2.data.hotComments;
      this.newComment = re2.data.comments;


      for (let i = 0; i < this.musicData.length; i++) {
        this.musicData[i]["maxbr"] = this.br[i].maxbr;
      }
    },
  },
  created() {
    this.MusicList();
  },
  components: {
    MusicList,
    HotComment,
    NewComment,

  },
};
</script>

<style lang="less" scoped>
.playlist {
  position: relative;
  .playlist-top {
    // width: 100%;
    padding: 30px 10px 30px 15px;
    display: flex;
    .bgimage {
      position: absolute;
      z-index:-5;
      top: 0;
      left: 0;
      width: 100%;
      height: 190px;
      filter:blur(10px);
    }
    &::after {
      content: " ";
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 190px;
      position: absolute;
      top: 0px;
      left: 0;
      z-index: -3;
    }
    .top-left {
      z-index: -1;
      position: relative;
      img {
        width: 126px;
      }
      .songs-manu {
        position: absolute;
        top: 10px;
        left: 0;
        width: 40px;
        line-height: 17px;
        color: white;
        font-size: 12px;
        background-color: rgb(186, 51, 55);
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;
      }
      .playCount {
        padding: 3px;
        position: absolute;
        right: 0;
        top: 0;
        
        font-size: 11px;
        color: #fff;
        &::before {
          content: "";
          position: absolute;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
          background-repeat: no-repeat;
          width: 11px;
          height: 11px;
          top: 7px;
          left: -12px;
        }
      }
    }
    .top-right {
      padding-left: 20px;
      z-index: 10;
      text-align: left;
      flex: 1;
      .say {
        font-size: 17px;
        color: white;
      }
      .artor {
        padding:20px 0;
        display: flex;
        .img-artor {
          width: 30px;
          border-radius: 50%;
        }
        span {
          display: block;
          padding-left: 5px;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          color: rgb(184, 185, 191);
        }
      }
    }
  }
  .nextlist {
    padding: 3px 10px;
    font-size: 12px;
    color: rgb(102, 102, 102);
    text-align: left;
    background-color: rgb(238, 239, 240);
  }
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
  div{
      .nextlist {
    padding: 3px 10px;
    font-size: 12px;
    color: rgb(102, 102, 102);
    text-align: left;
    background-color: rgb(238, 239, 240);
  
    }
  }
}
</style>