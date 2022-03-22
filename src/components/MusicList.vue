<template>
  <div id="musics">
    <ul>
      <li @click="play(songIfa)">
        <!-- <router-link tag="div" :to="`/playmusic/${songIfa.id}`"> -->
          <div>
          <div class="left">
            <div>{{ songIfa.name }}<span v-for="it in songIfa.alia" :key="it.id" :style="{color:'#999'}">({{it}})</span></div>
            
            <div>
              <span class="sq" v-if="(songIfa.maxbr||songIfa.song.privilege.maxbr)>320000"></span>
            <span
              class="right-art"
              v-for="(its,index) in songIfa.ar||songIfa.song.artists"
              :key="its.id"
              ><span v-if="index%2==1">-</span>
              {{ its.name }}</span
            ></div>
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
  data(){
    return {bb:true}
  },
  methods:{
    play(songs){
 
      this.$emit('play',songs);
    
    }
  }
};
</script>

<style lang="less" scoped>
#musics {
  text-align: left;
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