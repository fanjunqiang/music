<template>
  <div class="commentlist" v-if="hots.lenght>0">
    <div class="nextlist">精彩评论</div>
    <ul>
      <li v-for="item in hots" :key="item.commentId">
        <img class="user-pic" :src="item.user.avatarUrl" />
        <div class="conent">
          <div>
            <div class="user-name">
              <div>{{ item.user.nickname }}</div>
              <div class="good">
                <p>{{ item.likedCount }}</p>
                <img src="../assets/good.svg" alt="" />
              </div>
            </div>
            <div class="comment-time">
              {{ item.time | filterTime("YYYY年m月d日") }}
            </div>
            <div class="user-comment">{{ item.content }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hots: [Array, Object],
  },
};
</script>

<style lang="less" scoped>
.commentlist {
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
        padding: 0 10px 10px 0;
        flex: 1;
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
              p{
                  line-height:20px;
              }
              img{
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
      }
    }
  }
}
</style>