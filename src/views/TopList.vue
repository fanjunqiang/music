<template>
  <div class="toplist">
    <div v-if="!kai" class="toptitle">
      <h2>官方榜</h2>
    </div>
    <ul v-if="!kai">
      <li
        v-for="(item, index) in topLists"
        :key="item.id"
        @click="zhankai(item.id, item.name,item.coverImgUrl)"
      >
        <div class="left">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="right"  :style="{
          background: `url(${item.coverImgUrl})`,
          backgroundPosition: ' 0% 0%',
          opacity:0.7,
        }">
          <ul v-if="qianSanSongs[index]">
            <li class="updataTime">{{item.updateFrequency}}</li>
            <li
              class="songs"
              v-for="(item,ind) in qianSanSongs[index].songs"
              :key="item.id"
            >
            {{ind+1}}.{{ item.name }}
            <span class="ar">&nbsp;- {{ item.ar[0].name}}</span> 
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <transition
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutUp"
    >
      <bandan-music
        @playAll="playAll"
        :bangName="bangName"
        :topSong="topSong"
        :topListbg="topListbg"
        :newBangComments="newBangComments"
        @play="$emit('play', $event)"
        v-if="kai"
        class="bang"
        @backbtn="backbtn"
      >
      </bandan-music>
    </transition>
  </div>
</template>
<script>
import BandanMusic from "../components/BandanMusic.vue";
export default {
  components: { BandanMusic },
  props: {},
  data() {
    return {
      topLists: [],
      topListSongs: {},
      kai: false,
      bangName: "",
      topSong: [],
      topListDetail: [],
      qianSanSongs: [],
      topListbg:"",
      newBangComments:[]
    };
  },
  methods: {
     async comments(id) {
      let re = await this.axios.get(
        `/comment/playlist?id=${id}&limit=10`
      );
      this.newBangComments=re.data.comments;
 
      },
    playAll(val) {
      this.$emit("playAll", val);
    },
    backbtn() {
      // this.zhankai();
      this.kai = !this.kai;
      this.$emit("zhankai", !this.kai);
    },
    zhankai(id, name,bgurl) {
      this.kai = !this.kai;
   
      this.newBangComments=[];
      this.topSong=[];

      this.getTopListSongs(id);
      this.bangName = name;
      this.topListbg=bgurl;
      this.comments(id);
     

      this.$emit("zhankai", !this.kai);
    },
    async getTopList() {
      let re = await this.axios.get("/toplist");
      this.topLists = re.data.list;
     
      for (let i = 0; i < this.topLists.length; i++) {
        await this.getqianSan(this.topLists[i].id);
      }
      // this.getqianSan(this.topLists[])
    },
    async getTopListSongs(id) {
      let re = await this.axios.get(`/playlist/track/all?id=${id}&limit=30`);
      this.topListSongs = re.data;
    
      this.topSong = this.topListSongs.songs;
      for (let i = 0; i < this.topSong.length; i++) {
        this.topSong[i]["maxbr"] = this.topListSongs.privileges[i].maxbr;
      
      }

      let re1 = await this.axios.get(`/toplist/detail?id=${id}`);
      this.topListDetail = re1.data;
      
    },
    async getqianSan(id) {
      let re = await this.axios.get(`/playlist/track/all?id=${id}&limit=3`);
      this.qianSanSongs.push(re.data);
    
    },
  },
  created() {
    this.getTopList();
  },
};
</script>
<style lang="less" scoped>
.toplist {
  position: relative;
  // color:#000;
  .toptitle{
    padding: 10px 0 0 0;
  }
  ul {
    li {
      display: flex;
      padding: 10px;

      overflow: hidden;
      .left {
        width: 150px;
        height: 150px;
        // background-color: aqua;
        img {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .right {
        height: 130px;
        flex: 1;
        // background-color: rgba(255,0,0,0.3);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 10px;
        overflow: hidden;

        ul {
          // width: 100%;
opacity:1;
          .updataTime {
            display: block;
            text-align: right;
            color: #777;
            font-size: 14px;
            border-bottom: 1px solid #fff;
          }
          .songs {
            // background-color: white;
            padding: 5px;
            white-space: nowrap;

            .ar{
              color: #666;
            }
          }
        }
        // .description {
        //   font-size: 14px;
        //   text-align: left;
        //   overflow: hidden;
        //   color: #fff;
        //   z-index: 88;
        // }
      }
    }
  }
  .bang {
    position: fixed;
    top: 0vh;
    width: 100vw;
    height: 100vh;
  }
}
</style>