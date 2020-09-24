<template>
  <div class="header-wrapper">
    <div class="header-img">
      <img class="bg-img" src="./images/top.png" alt="">
      <img class="shadow" src="./images/shadow.png" alt="">
    </div>
    <div class="info">
      <span class="time">{{date}}</span>
    </div>
  </div>
</template>

<script>
import { getDate } from 'common/js/util'
export default {
  name: "MHeader",
  data() {
    return {
      date: ''
    };
  },
  mounted() {
    this.date = getDate()
    setInterval(() => {
      this.date = getDate()
    }, 1000)
  },
  methods: {
  },
  // watch: {
  //   $route(to) {
  //     this.$nextTick(() => {
  //       this.routerUrl = to.fullPath;
  //     });
  //   },
  // },
};
</script>

<style scoped lang="less">
.header-wrapper {
  position: relative;
  z-index: 999;
  width: 100%;
  background-image: linear-gradient(#040D33 0%, rgba(4, 13, 51, 0.94) 50%, rgba(4, 13, 51, 0) 100%);
  text-align: center;
  .header-img {
    position: relative;
    .bg-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 2;
    }
    .shadow {
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
  .info {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 12px;
    font-family: DIN;
    z-index: 3;
  }
}
</style>
