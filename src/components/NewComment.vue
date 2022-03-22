<template>
  <div class="new-comment">
      <div class="dh">
        <img class="user-pic" :src="news.user.avatarUrl" />
        <div class="conent">
          <div>
            <div class="user-name">
              <div>{{ news.user.nickname }}</div>
              <div class="good">
                <p>{{ news.likedCount }}</p>
                <img @click="dian" v-show="!dianzan" src="../assets/good.svg" alt="" />
                <img @click="dian" v-show="dianzan" src="../assets/controls/dianzan_kuai.svg" alt="" />
              </div>
            </div>
            <div class="comment-time">
              {{ news.time | filterTime("YYYY年m月d日") }}
            </div>
            <div class="user-comment">
              <template v-if="news.beReplied.length > 0">
                <span v-for="(it, ind) in news.beReplied" :key="ind">
                  回复<span :style="{ color: 'rgb(80,125,175)' }"
                    >@{{ it.user.nickname }}</span
                  >：
                </span>
              </template>
              {{ news.content }}
            </div>
          </div>
          <template  v-if="news.beReplied.length > 0">
              <div class="bereplied-comment" v-for="(it, ind) in news.beReplied" :key="ind">
              @{{it.user.nickname}}：{{it.content}}
          </div>
          </template>
          
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    news: Object,
  },
  data(){
    return {
      dianzan:false,
    }
  },
  methods:{
    dian(){
      this.dianzan = !this.dianzan;
      if(this.dianzan){
        this.news.likedCount++;
      }
      else{
        this.news.likedCount--;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.new-comment {
  width: 100%;
    .dh {
      display: flex;
      padding: 10px 0 0 0;
      text-align: left;
      
      .user-pic {
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 10px;
        border-radius: 15px;
      }
      .conent {
        padding: 0 10px 15px 0;
        flex: 1;
        border-bottom: 1px solid #f2f2f2;
        div {
          .user-name {
            display: flex;
            color: #666;
            font-size: 14px;
            height: 20px;
            justify-content: space-between;
            .good {
              display: flex;
              color: #999;
              font-size: 9px;
              p {
                line-height: 20px;
              }
              img {
                width: 14px;
                margin-left: 5px;
              }
            }
          }
          .comment-time {
            color: #999;
            font-size: 9px;
            height: 18px;
          }
          .user-comment {
            color: #333;
            font-size: 15px;
            margin-top: 5px;
          }
        }
        .bereplied-comment{
            color:#999;
            font-size:14px;
            margin: 5px 0 0 0;
            border:1px solid #f2f2f2;
            padding:10px;
            line-height:20px
        }

      }
    }
  
}
</style>