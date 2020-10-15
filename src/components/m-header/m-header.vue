<template>
  <div class="header-wrapper">
    <div class="header-img">
      <img class="bg-img" src="./images/top1.png" alt="">
      <img class="topLab" src="./images/topLab.png" alt="">
      <img class="shadow" src="./images/shadow.png" alt="">
    </div>
    <div class="info">
      <span class="time">{{date}}</span>
    </div>
    <div class="route-wrapper">
      <div class="route-item" :class="{active: currentPage=='sourcelayer'}" @click="goRoute('sourcelayer')">资源一张图</div>
      <div class="route-item" :class="{active: currentPage=='onemap'}" @click="goRoute('onemap')">互学互比</div>
    </div>
  </div>
</template>

<script>
import { getDate } from 'common/js/util'
export default {
  name: "MHeader",
  data() {
    return {
      date: '',
      currentPage: this.$route.name
    };
  },
  mounted() {
    console.log('currentPage', this.currentPage)
    this.date = getDate()
    setInterval(() => {
      this.date = getDate()
    }, 1000)
  },
  methods: {
    goRoute(name) {
      if (this.currentPage != name) {
        this.currentPage = name
        this.$router.push({name})
      }
    }
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
  height: ;
  background-image: linear-gradient(#040D33 0%, rgba(4, 13, 51, 0.94) 50%, rgba(4, 13, 51, 0) 100%);
  text-align: center;
  .header-img {
    position: relative;
    height: 0.9rem;
    .bg-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1rem;
      z-index: 2;
    }
    .shadow {
      position: absolute;
       left: 50%;
      transform: translateX(-50%);
      top: 4vh;
      z-index: 1;
      width: 34vh;
      height: 4vh;
    }
  }
  .info {
    position: absolute;
    top: 7.5vh;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 1.5vh;
    font-family: DIN;
    z-index: 3;
  }
  .route-wrapper {
    z-index: 3;
    position: absolute;
    top: 20px;
    right: 20%;
    color: #fff;
    display: flex;
    .route-item {
      cursor: pointer;
      margin-right: 30px;
      &.active {
        color: #16EAEA;
      }
    }
  }
}
.topLab{
  clear: both;
  display: block;
  margin:auto;
  width: 23vh;
}
</style>
