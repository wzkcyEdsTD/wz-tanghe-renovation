<template>
  <!-- <div :class="[showLarge?'summary':'summary1']"> -->
  <div class="summary">
    <!-- <div class="ding" v-if="!showLarge"> -->
      <div class="box">
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
      <img src="./img/switch-decorate.png" class="zhuangshi"/>
    <!-- </div> -->
    <!-- <div class="uls" v-if="showLarge" >
      <div id="rightHide">
        <Right/>
      </div>
      <div class="rig">
        <ProjectSummary/>
      </div>
    </div> -->
    <!-- <div v-if="!showLarge">
      <Right v-show="currentType == 'total'" />
      <ProjectSummary v-show="currentType == 'source'" />
    </div> -->
    <Right v-show="currentType == 'total'" />
    <ProjectSummary v-show="currentType == 'source'" />
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
      showLarge:window.showLarge,
    }
  },
  methods:{
    // getKuanGao(){
    //   //4320*1280
    //   console.log(this.showLarge);
    //   // //大屏返回true
    //   // if(this.screenWidth>4000&this.screeHeight>1000){
    //   //   console.log(true);
    //   //   this.showLarge = true;
    //   // }else {
    //   //   console.log(false);
    //   //   this.showLarge = false;
    //   // };
    // },
  },
  created() {
    // this.getKuanGao();
  }
}
</script>

<style lang="less" scoped>
  .tupian{
    width: 9vh;
    height: 4vh;
  }
  .tupianxuanzhong{
    width: 11vh;
    height: 4.5vh;
  }
  .summary {
    position: absolute;
    box-sizing: border-box;
    top: 5vh;
    bottom: 0;
    right: 0;
    padding: 3vh 2vh 0 2vh;
    width: 40vh;
    background-color: #040D33;
    color: white;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
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
      font-size: 1.6vh;
    }
  }
  // .summary1 {
  //   position: absolute;
  //   box-sizing: border-box;
  //   top: 5vh;
  //   bottom: 0;
  //   right: 0px;
  //   width: 40vh;
  //   padding: 3vh 2vh 0 2vh;
  //   background-color: #040D33;
  //   color: white;
  //   -webkit-box-sizing: border-box;
  //   box-sizing: border-box;
  //   z-index: 999;
  //   overflow: hidden;
  //   .ding {
  //     padding-top: 1vh;
  //   }
  //   .box {
  //     display: flex;
  //     flex-direction: row;
  //   }
  //   .buttonpd {
  //     padding-right: 5vh;
  //     cursor: pointer;
  //     &.active {
  //       .button {
  //         top: 40%;
  //       }
  //     }
  //   }
  //   .tp {
  //     position: relative;
  //   }
  //   .button {
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     font-size: 2vh;
  //   }
  // }
  // .uls{
  //   display: flex;
  //   align-items: flex-start;
  // }
  // .rig{
  //   padding-left: 1vh;
  //   padding-right: 1vh;
  // }
  .zhuangshi {
    margin-top: 1vh;
    width: 38vh;
    height: 0.8vh;
    transform: rotateY(180deg);
  }
</style>
