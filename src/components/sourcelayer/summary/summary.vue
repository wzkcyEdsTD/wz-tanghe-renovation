<template>
  <div>
    <div :class="[showLarge?'summary':'summary1']">
      <div class="ding">
        <div class="box" v-if="!showLarge">
          <div class="buttonpd" :class="{active: currentType=='total'}" @click="currentType='total'">
            <div class="tp">
              <img src="./img/组合.png" alt="" v-if="currentType=='total'" class="tupianxuanzhong"/>
              <img src="./img/button.png" alt="" v-if="currentType=='source'"   class="tupian"/>
              <span class="button">总览</span>
            </div>
          </div>
          <div class="buttonpd" :class="{active: currentType=='source'}" @click="currentType='source'">
            <div class="tp">
              <img src="./img/组合.png" alt="" v-if="currentType=='source'" class="tupianxuanzhong"/>
              <img src="./img/button.png" alt="" v-if="currentType=='total'" class="tupian"/>
              <span class="button">资源</span>
            </div>
          </div>
        </div>
        <div>
          <img src="./img/switch-decorate.png" class="zhuangshi" v-if="!showLarge"/>
<!--          <img src="./img/装饰.png" alt="" v-if="!showLarge"/>-->
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
  .tupian{
    width: 9vh;
    height: 4vh;
  }
  .tupianxuanzhong{
    width: 11vh;
    height: 4.5vh;
  }
  .summary {
    position: fixed;
    box-sizing: border-box;
    top: 1rem;
    bottom: 0;
    overflow: hidden;
    right: 0px;
    width: 80vh;
    // height: 100vh;
    color: white;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    z-index: 999;
    .ding {
      padding-top: 1vh;
    }
    .ssj{
      padding-top: 1.4vh
    }
    .box {
      display: flex;
      flex-direction: row;
    }
    .buttonpd {
      padding-right: 5vh;
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
      font-size: 1vh;
    }
  }
  .summary1 {
    position: fixed;
    box-sizing: border-box;
    top: 1rem;
    bottom: 0;
    overflow: hidden;
    right: 0px;
    width: 38vh;
    // height: 100vh;
    color: white;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 1vh;
    z-index: 999;
    .ding {
      padding-top: 1vh;
    }
    .box {
      display: flex;
      flex-direction: row;
    }
    .buttonpd {
      padding-right: 5vh;
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
      font-size: 2vh;
    }
  }
  .gdkd{
    width: 40vh;
  }
  .mask-right {
    z-index: -2;
    position: fixed;
    top: 1rem;
    right: 0;
    width: 90vh;
    height: 100vh;
    background: linear-gradient(270deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
    // background-image: linear-gradient(270deg, rgba(0, 13, 26, 0.84) 0%, rgba(0, 17, 34, 0.55) 65%, rgba(0, 19, 38, 0) 100%);
  }
  .mask-right1 {
    z-index: -2;
    position: fixed;
    top: 1rem;
    right: 0;
    width: 41vh;
    height: 100vh;
    background: linear-gradient(270deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
    // background-image: linear-gradient(270deg, rgba(0, 13, 26, 0.84) 0%, rgba(0, 17, 34, 0.55) 65%, rgba(0, 19, 38, 0) 100%);
  }
  .uls{
    display: flex;
    align-items: flex-start;
  }
  .lefts1{width: 45vh;}
  .lefts1da{width: 36vh;height: 100vh}
  .rig{flex: 1;padding-left: 1vh}
  .zhuangshi {
    margin-top: 1vh;
    width: 38vh;
    height: 0.8vh;
    transform: rotateY(180deg);
  }
</style>
