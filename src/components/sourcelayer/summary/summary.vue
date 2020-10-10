<template>
  <div>
    <div :class="[showLarge?'summary':'summary1']">
      <div class="ding">
        <div class="box" v-if="!showLarge">
          <div class="buttonpd" :class="{active: currentType=='total'}" @click="currentType='total'">
            <div class="tp">
              <img src="./img/组合.png" alt="" v-if="currentType=='total'" />
              <img src="./img/button.png" alt="" v-if="currentType=='source'" />
              <span class="button">总览</span>
            </div>
          </div>
          <div class="buttonpd" :class="{active: currentType=='source'}" @click="currentType='source'">
            <div class="tp">
              <img src="./img/组合.png" alt="" v-if="currentType=='source'" />
              <img src="./img/button.png" alt="" v-if="currentType=='total'" />
              <span class="button">资源</span>
            </div>
          </div>
        </div>
        <div>
          <img src="./img/装饰.png" alt=""/>
        </div>
      </div>
      <div v-if="showLarge" >
        <div class="ssj">
          <div class="uls" >
            <div :class="[!showLarge?'lefts1':'lefts1da']">
              <Right/>
            </div>
            <div class="rig">
              <ProjectSummary/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!showLarge" class="gdkd">
        <Right v-if="currentType == 'total'" />
        <ProjectSummary v-if="currentType == 'source'" />
      </div>
      <div class="mask-right" v-if="showLarge"></div>
      <div class="mask-right1" v-if="!showLarge"></div>
    </div>
  </div>
</template>

<script>
import ProjectSummary from "./projectSummary/projectSummary";
import SightSummary from "./sightSummary/sightSummary";
import Right from "./rightSummary/right"
import RightSummary from "./rightSummary/rightSummary"
export default {
  components: {
    ProjectSummary,
    SightSummary,
    Right,
    RightSummary
  },
  data() {
    return {
      currentType: 'total',
      screenWidth: document.body.clientWidth,
      screeHeight: document.body.clientHeight,
      showLarge: false,
    }
  },
  methods:{
    getKuanGao(){
      //4320*1280
      console.log(this.screenWidth);
      //大屏返回true
      if(this.screenWidth>4000&this.screeHeight>1000){
        console.log(true);
        this.showLarge = true;
      }else {
        console.log(false);
        this.showLarge = false;
      };
    },
  },
  created() {
    this.getKuanGao();
  }
}
</script>

<style lang="less">
  .summary {
    position: fixed;
    box-sizing: border-box;
    top: 6vh;
    bottom: 40px;
    overflow: hidden;
    right: 0px;
    width: 1020px;
    height: 100%;
    color: white;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    z-index: 999;
    .ding {
      padding-top: 5%;
    }
    .ssj{
      padding-top: 4%
    }
    .box {
      display: flex;
      flex-direction: row;
    }
    .buttonpd {
      padding-right: 30px;
      cursor: pointer;
      &.active {
        .button {
          top: 40%;
        }
      }
    }
    .tp {
      position: relative;
    }
    .button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
  }
  .summary1 {
    position: fixed;
    box-sizing: border-box;
    top: 6vh;
    bottom: 40px;
    overflow: hidden;
    right: 0px;
    width: 370px;
    height: 100%;
    color: white;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    z-index: 999;
    .ding {
      padding-top: 5%;
    }
    .box {
      display: flex;
      flex-direction: row;
    }
    .buttonpd {
      padding-right: 30px;
      cursor: pointer;
      &.active {
        .button {
          top: 40%;
        }
      }
    }
    .tp {
      position: relative;
    }
    .button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
  }
  .gdkd{
    width: 410px;
  }
  .mask-right {
    z-index: -2;
    position: fixed;
    top: 0;
    right: 0;
    width: 1020px;
    height: 100%;
    background: linear-gradient(270deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
    // background-image: linear-gradient(270deg, rgba(0, 13, 26, 0.84) 0%, rgba(0, 17, 34, 0.55) 65%, rgba(0, 19, 38, 0) 100%);
  }
  .mask-right1 {
    z-index: -2;
    position: fixed;
    top: 0;
    right: 0;
    width: 410px;
    height: 100%;
    background: linear-gradient(270deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
    // background-image: linear-gradient(270deg, rgba(0, 13, 26, 0.84) 0%, rgba(0, 17, 34, 0.55) 65%, rgba(0, 19, 38, 0) 100%);
  }
  .uls{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
  }
  .lefts1{width: 450px;}
  .lefts1da{width: 480px;height: 1280px}
  .rig{flex: 1;padding-left: 5%}
</style>
