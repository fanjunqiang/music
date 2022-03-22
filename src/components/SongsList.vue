<template>
  <div id="songs">
    <ul>
      <li @click="play(songIfa)">
        <!-- <router-link tag="div" :to="{ path: `./playmusic/${songIfa.id}` }"> -->
          <div>
             <div class="left">
            <div>
              {{ songIfa.name
              }}<span
                v-for="(it, index) in songIfa.song.alias"
                :key="index"
                :style="{ color: '#999' }"
                >({{ it }})</span
              >
            </div>
            <div>
              <span class="sq" v-if="songIfa.song.privilege.maxbr>=320000"></span>
              <span
                class="right-art"
                v-for="its in songIfa.song.artists"
                :key="its.id"
                >{{ its.name }}</span
              >
            </div>
          </div>
          </div>
         
          <!-- </router-link> -->
        <div class="right">
          <span> </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songIfa: Object || Array,
  },
  methods: {
     play(songs){

      this.$emit('play',songs);
    }
  },
};
</script>

<style lang="less" scoped>
#songs {
  text-align: left;
  ul {
    li {
      margin-left: 10px;
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
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          // overflow: hidden;
        }
      }

      .right {
        flex: 2;
        text-align: center;
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
}
</style>