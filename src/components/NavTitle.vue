<template>
  <div id="nav">
    <router-link to="/"><span>推荐音乐</span></router-link>
    <router-link to="/hotMusic"><span>热歌榜</span></router-link>
    <router-link to="/search"><span>搜索</span></router-link>
    <router-link to="/toplist"><span>所有榜单</span></router-link>
  </div>
</template>
<style lang="less" scoped>
#nav {
  z-index:10;
  background-color:white;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 2px solid rgb(230, 230, 230);
  a {
    font-size: 15px;
    color: #2c3e50;
    width: 70px;
    box-sizing: border-box;
    
    &.router-link-exact-active {
      color: rgb(221, 0, 27);

      span {
          padding:0 5px;
        border-bottom: 2px solid rgb(221, 0, 27);
        display: inline-block;
      }
    }
  }
}
</style>