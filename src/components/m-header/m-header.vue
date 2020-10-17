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
  z-index: 1;
  width: 100%;
  height: 8vh;
  background-image: linear-gradient(#040d33,rgba(4,13,51,.94) 50%,rgba(4,13,51,0));
  text-align: center;
  .header-img {
    position: relative;
    height: 100%;
    .bg-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    .topLab{
      height: 100%;
    }
    .shadow {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      width: 34vh;
      height: 4vh;
    }
  }
  .info {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 1vh;
    font-family: DIN;
  }
  .route-wrapper {
    z-index: 3;
    position: absolute;
    top: 20%;
    right: 20%;
    color: #fff;
    display: flex;
    .route-item {
      cursor: pointer;
      margin-right: 3vh;
      width: 9vh;
      height: 1vh;
      &.active {
        color: #16EAEA;
      }
    }
  }
}
</style>
