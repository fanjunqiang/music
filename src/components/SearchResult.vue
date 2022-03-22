<template>
  <div class="search-result">
    <my-load v-if="kong && musList2.length < 1"></my-load>
    <div v-else-if="!kong">"暂无相关结果"</div>
    <ul>
      <li v-for="item in musList2" :key="item.id" @click="play(item)">
        <!-- <router-link tag="div" :to="`./playmusic/${item.id}`"> -->
        <div>
          <div class="left">
            <div>
              <span
                v-html="$options.filters.filterKey(item.name, keywords)"
              ></span
              ><span
                v-for="(it, index) in item.alia"
                :key="index"
                :style="{ color: '#999' }"
                >({{ it }})</span
              >
            </div>

            <div>
              <span class="sq" v-if="item.privilege.maxbr > 320000"></span>
              <span class="right-art" v-for="its in item.ar" :key="its.id">
                <span
                  v-html="$options.filters.filterKey(its.name, keywords)"
                ></span
              ></span>
            </div>
          </div>
        </div>
        <!-- </router-link> -->
        <div class="right">
          <span> </span>
        </div>
      </li>
    </ul>
    <div class="dianji" style="height:21px" ref="foot" @click="dianji">
      {{ offset >= 3 || musList.length >= 40 ? "到底了哟" : "." }}
    </div>
  </div>
</template>
<script>
import MyLoad from "../components/Myload.vue";
export default {
  props: {
    keywords: [String, Number],
  },
  data() {
    return {
      musList: {},
      musList1: [],
      musList2: [],
      offset: 1,
      kong: true,
    };
  },
  methods: {
    async seaRrsult() {
      //输入内容不能全为“ ”
      // if(this.keywords==true){
      this.musList = await this.axios.get(
        `/cloudsearch?keywords= ${this.keywords}&limit=40`
      );

      // if(this.musList=)
      this.musList1 = this.musList.data.result.songs;

      if (this.musList.data.result.songCount == 0) {
        this.kong = false;
      } else {
        this.kong = true;
        if (this.musList.data.result.songs.length > 20) {
          this.musList2 =
            this.musList.data.result.songs.slice(0, 20 * this.offset) || [];
      
        } else {
          this.musList2 = this.musList.data.result.songs || [];
        }
      }

      // }
   
    },

    dianji() {
      if (this.offset < 3) {
        this.offset++;
        this.musList2 = this.musList1.slice(0, 20 * this.offset);
      }
      // else {
      //   alert("到底了O(∩_∩)O哈哈~");
      // }
    },
    scrollbar() {
      let el = document.documentElement || document.body;
      let top = el.scrollTop + el.clientHeight;

      let morTop = this.$refs.foot.offsetTop;

      if (top >= morTop + 21) {
      this.dianji();
      }
    },

    play(songs) {

      this.$emit("play", songs);
    },
  },
  //关键词高亮
  filters: {
    filterKey(value, key) {
      let reg = new RegExp(key, "gi");
      return value.replace(
        reg,
        `<span style="color:rgb(80,125,175)">${key}</span>`
      );
    },
  },
  created() {
    this.seaRrsult();
    window.addEventListener("scroll", this.scrollbar);
  },
  //移出事件
  destroyed() {
    window.removeEventListener("scroll", this.scrollbar);
  },
  components: {
    MyLoad,
  },
};
</script>
<style lang="less" scoped>
.search-result {
  text-align: left;
  padding: 0 10px;
  ul {
    li {
      // padding-left: 10px;
      display: flex;
      height: 55px;
      box-sizing: border-box;
      border-bottom: 1px solid #f2f2f2;
      div {
        flex: 10;
        .left {
          padding: 6px 0;
          div {
            font-size: 17px;
            display: -webkit-box;
            /* 显示多少行 */
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .sq {
            display: inline-block;
            background: url("../assets/index_icon_2x.png") no-repeat 0 0;
            background-size: 166px 97px;
            width: 12px;
            height: 8px;
          }
          .right-art {
            padding-left: 5px;
            font-size: 12px;
            color: #888;
          }
          // overflow: hidden;
        }
      }

      .right {
        flex: 2;
        text-align: right;
        line-height: 54px;
        span {
          transform: translateY(25%);
          display: inline-block;
          background: url("../assets/index_icon_2x.png") no-repeat -24px 0;
          background-size: 166px 97px;
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  .dianji {
    text-align: center;
  }
}
</style>