<template>
  <div class="summary">
    <div class="ding">
      <!--      <div class="box">-->
      <!--        <div class="buttonpd" :class="{active: currentType=='total'}" @click="currentType='total'">-->
      <!--          <div class="tp">-->
      <!--            <img src="./img/组合.png" alt="" v-show="currentType=='total'" />-->
      <!--            <img src="./img/button.png" alt="" v-show="currentType=='source'" />-->
      <!--            <span class="button">总览</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="buttonpd" :class="{active: currentType=='source'}" @click="currentType='source'">-->
      <!--          <div class="tp">-->
      <!--            <img src="./img/组合.png" alt="" v-show="currentType=='source'" />-->
      <!--            <img src="./img/button.png" alt="" v-show="currentType=='total'" />-->
      <!--            <span class="button">资源</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div>
        <img src="./img/装饰.png" alt="" />
      </div>
    </div>
    <div class="uls">
      <div class="lefts">
        <Right/>
      </div>
      <div class="rig">
        <ProjectSummary/>
      </div>
    </div>
    <div class="mask-right"></div>
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
  },
  data() {
    return {
      currentType: 'total'
    }
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
    width: 620px;
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
  .mask-right {
    z-index: -2;
    position: fixed;
    top: 0;
    right: 0;
    width: 620px;
    height: 100%;
    background: linear-gradient(270deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
    // background-image: linear-gradient(270deg, rgba(0, 13, 26, 0.84) 0%, rgba(0, 17, 34, 0.55) 65%, rgba(0, 19, 38, 0) 100%);
  }
  .uls{
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  .lefts{width: 310px;}
  .rig{flex: 1;padding-left: 2%}
</style>
