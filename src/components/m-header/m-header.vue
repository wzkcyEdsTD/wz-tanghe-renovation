<template>
  <div id="header" class="header-wrapper">
    <div class="header-img">
      <img class="bg-img" src="./images/top1.png" alt="">
      <img class="topLab" src="./images/topLab.png" alt="">
      <img class="shadow" src="./images/shadow.png" alt="">
    </div>
    <div class="logoGroup">
      <div class="logo-item">
        <img src="./images/xdjt.png" class="xdlogo">
        <!-- <span class="logoText">现代集团</span> -->
      </div>
      <div class="logo-item">
        <img src="./images/sjjt.png" class="sjlogo">
        <!-- <span class="logoText">设计集团</span> -->
      </div>
    </div>
    <div class="info">
      <p class="time">{{date}}</p>
      <p class="time">{{times}}</p>
    </div>
    <div class="route-wrapper">
      <div class="route-item" :class="{active: currentPage=='sourcelayer'}" @click="goRoute('sourcelayer')">资源一张图</div>
      <div class="route-item" :class="{active: currentPage=='compare'}" @click="goRoute('compare')">互学互比</div>
      <div class="route-item" :class="{active: currentPage=='decision'}" @click="goRoute('decision')">辅助决策</div>
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
      times:"",
      showLarge: window.showLarge,
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.$route.name
      },
      set(val) {}
    }
  },
  mounted() {
    const temp = getDate();
    this.date = temp.split("data")[0];
    this.times = temp.split("data")[1];
    console.log("时间",this.date,this.times);
    setInterval(() => {
      const temp = getDate();
      this.date = temp.split("data")[0];
      this.times = temp.split("data")[1];
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
};
</script>

<style lang="less" scoped>
.header-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 8vh;
  background-image: linear-gradient(#040d33,rgba(4,13,51,.94) 50%,rgba(4,13,51,0));
  text-align: center;
  // transition: width 1s linear;
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
  .logoGroup {
    position: absolute;
    left: 0;
    top: 0;
    height: 60%;
    z-index: 2;
    display: flex;
    align-items: center;
    .logo-item {
      margin-left: 2vh;
      >img {
        height: 3vh;
      }
    }
  }
  .info {
    position: absolute;
    top: 0.3vh;
    right: 1vh;
    transform: translateX(-50%);
    color: #fff;
    font-size: 1.5vh;
    /*text-align: left;*/
    line-height: 1.8vh;
    z-index: 3;
    // font-family: DIN-Regular;
    .time {
      font-family: YouSheBiaoTiHei;
    }
  }
  .route-wrapper {
    z-index: 3;
    position: absolute;
    top: 10%;
    right: 10%;
    color: #fff;
    display: flex;
    .route-item {
      cursor: pointer;
      margin-right: 3vh;
      width: 13vh;
      height: 2.5vh;
      font-size: 2.3vh;
      font-family: YouSheBiaoTiHei;
      color:#A5C3FF;
      background: url("./images/非选中光.png");
      background-size: 13vh 2.5vh;
      &.active {
        color: #FFFFFF;
        background: url("./images/选中光.png");
        background-size: 13vh 2.5vh;
        z-index: 10;
      }
    }
  }
}
</style>
