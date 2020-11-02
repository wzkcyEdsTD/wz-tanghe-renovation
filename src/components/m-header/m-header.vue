<template>
  <div id="header" class="header-wrapper">
    <div class="header-img">
      <img class="bg-img" src="./images/top1.png" alt="">
      <img class="topLab" src="./images/topLab.png" alt="">
      <img class="shadow" src="./images/shadow.png" alt="">
    </div>
    <div class="logoGroup">
      <div class="xd">
        <img src="./images/现代集团logo.png" class="xdlogo">
        <span class="logoText">现代集团</span>
      </div>
      <div class="sj">
        <img src="./images/设计集团logo.png" class="sjlogo">
        <span class="logoText">设计集团</span>
      </div>
    </div>
    <div class="info">
      <p class="time">{{date}}</p>
      <p class="time">{{times}}</p>
    </div>
    <div class="route-wrapper">
      <div class="route-item" :class="{active: currentPage=='sourcelayer'}" @click="goRoute('sourcelayer')">
        资源一张图
      </div>
      <div class="route-item" :class="{active: currentPage=='compare'}" @click="goRoute('compare')">互学互比</div>
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
        // vue中获取当前路由name
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
        // if (name == 'compare') {
        //   this.showLarge && this.$bus.$emit("change-screen", { value: false });
        // } else {
        //   this.showLarge && this.$bus.$emit("change-screen", { value: true });
        // }
        this.currentPage = name
        this.$router.push({name})
      }
    }
  },
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
    .xd{
      position: absolute;
      top: 0.5vh;
      left: 2vh;
      .xdlogo{
        width: 3.5vh;
        height: 3.2vh;
      }
      .logoText{
        color: #ffffff;
        font-family: DIN-Regular;
        font-size: 2vh;
        position: absolute;
        top: 0.4vh;
        width: 9vh;
      }
    }
    .sj{
      position: absolute;
      top: 0.8vh;
      left: 16vh;
      .sjlogo{
        width: 2.5vh;
        height: 2.5vh;
      }
      .logoText{
        color: #ffffff;
        font-family: DIN-Regular;
        font-size: 2vh;
        position: absolute;
        width: 8vh;
        left: 3.5vh;
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
    font-family: DIN-Regular;
  }
  .route-wrapper {
    z-index: 3;
    position: absolute;
    top: 10%;
    right: 20%;
    color: #fff;
    display: flex;
    .route-item {
      cursor: pointer;
      margin-right: 3vh;
      width: 13vh;
      height: 2.5vh;
      font-size: 2.3vh;
      font-family: YouSheBiaoTiHei;
      color:#0E5AF2;
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
