<template>
  <div class="loading">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.loading {
  width: 100%;
  position: relative;
  z-index: -1;
  ul {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;

    width: 23px;
    display: flex;
    justify-content: space-between;
    li {
      width: 3px;
      height: 15px;
      background-color: #bb0b1b;
      animation: going 1.5s linear infinite;
    }
    li:nth-child(1) {
      animation-delay: -0.5s;
    }
    li:nth-child(2) {
      animation-delay: -0.25s;
    }

    li:nth-child(4) {
      animation-delay: 0.25s;
    }
    li:nth-child(5) {
      animation-delay: 0.5s;
    }
  }
  @keyframes going {
    0% {
      transform: scaleY(0.1);
    }
    50% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0.1);
    }
  }
}
</style>