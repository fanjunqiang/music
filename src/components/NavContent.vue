<template>
       <div id="nav-content"><slot></slot></div>
</template>

<style lang="less" scoped>
#nav-content {
margin-top:15px ;
  padding-left: 9px;
  font-size: 17px;
  text-align: left;
  margin-bottom: 14px;
  height: 20px;
  line-height: 20px;
  position: relative;
}
#nav-content:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 16px;
  background-color: #d33a31;
}
</style>