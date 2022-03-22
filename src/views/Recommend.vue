<template>
  <div class="recommend">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in lunbotu" :key="item.bannerId"
        ><img :src="item.pic" alt="" :style="{ width: '100vw' }"
      /></swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <nav-content>编辑推荐</nav-content>
    <my-load v-if="recMusic.length < 1"></my-load>
    <div class="rec1">
      <div v-for="list in recMusic" :key="list.id">
        <!-- 调用组件 -->
        <rec-music :item="list"> </rec-music>
      </div>
    </div>

    <nav-content>最新音乐</nav-content>

    <div class="new-songs">
      <div v-for="list in songInfor" :key="list.id">
        <!-- 调用组件 -->
        <songs-list :songIfa="list" @play="play"> </songs-list>
      </div>
    </div>
    <my-load v-if="songInfor.length < 3"></my-load>

    <nav-content>最新MV</nav-content>
    <my-load v-if="newMv.length < 1"></my-load>
    <div class="rec1">
      <div v-for="list in newMv" :key="list.id" @click="stopaudio">
        
        <newest-mv :item="list" :itId="list.id"> </newest-mv>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import NavContent from "../components/NavContent.vue";
import RecMusic from "../components/RecMusic.vue";
import SongsList from "../components/SongsList.vue";
import MyLoad from "../components/Myload.vue";
import NewestMv from "../components/NewestMv.vue";
export default {
  name: "Recommend",
  data() {
    return {
      recMusic: [],
      songInfor: [],
      b: false,
      lunbotu: [],
      newMv: [],//不能为null,null为对象没有length
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods: {
    play(val){
this.$emit("play",val);
    },
    stopaudio(){
    this.$emit("stopaudio",false);
  },},
  
  //请求数据https://apis.netstart.cn/music/personalized?limit=6，/personalized推荐歌单，limit请求个数
  created() {
    this.axios.get("/personalized?limit=6").then((re) => {
      this.recMusic = re.data.result;
    
    });
    this.axios.get("/personalized/newsong?limit=20").then((re) => {
      this.songInfor = re.data.result;
     
    });
    this.axios.get("/banner?type=2").then((re) => {
      this.lunbotu = re.data.banners;
     
    });
    this.axios.get("/mv/first?limit=6").then((re) => {
      this.newMv = re.data.data;
     
    });
  },
  components: {
    NavContent,
    RecMusic,
    SongsList,
    MyLoad,
    Swiper,
    SwiperSlide,
    NewestMv,
  },
};
</script>

<style lang="less" scoped>
.recommend {
  overflow: hidden;
  .swiper{
    z-index:0;
  }
}
.rec1 {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 18px;
  justify-content: space-between;
  div {
    width: 33%;
  }
}
</style>
