<template>
  <transition name="slide">
    <div class="info-container" v-show="isShow">
      <span class="close-btn"></span>
      <ul class="header">
        <li class="header-item">基本信息</li>
        <li class="header-item">现场记录</li>
        <li class="header-item">视频</li>
        <li class="header-item">全景</li>
      </ul>
    </div>
    <!-- <div class="mask-right"></div> -->
  </transition>
</template>

<script>
export default ({
  props: {
    isShow: Boolean
  }
})
</script>

<style lang="less">
.info-container {
  width: 4rem;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 8vh;
  z-index: 999999;
  padding: 1vh;
  color: #fff;
  .close-btn {
    position: absolute;
    right: 3vh;
    width: 1.5vh;
    height: 1.5vh;
    .bg-image("./images/close-info");
  }
  .header {
    display: flex;
    align-items: center;
    .header-item {
      margin-right: 2vh;
      font-family: PingFang;
      font-size: 1.8vh;
      color: #165CE2;
    }
  }
}
.mask-right {
  z-index: -2;
  position: fixed;
  top: 0;
  right: 0;
  width: 25vw;
  height: 100%;
  background-image: linear-gradient(270deg, rgba(0, 13, 26, 0.84) 0%, rgba(0, 17, 34, 0.55) 65%, rgba(0, 19, 38, 0) 100%);
}
</style>
