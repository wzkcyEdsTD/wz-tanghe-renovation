<template>
  <div class="rightSummary">
    <div class="frame_">
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">温瑞塘河</span>
        </div>
        <div class="wenzi">
          <div class="jianju">
            <span class="xbt">简介</span>
            <img src="./img/装饰.png" alt="" class="zs" />
          </div>
          <p class="lab">{{ temp || "暂无简介" }}</p>
          <video
            controls
            class="sp"
          >
            <source src="static/video/温瑞塘河/温瑞塘河.mp4">
          </video>
          <div class="jianju">
            <span class="xbt">流域</span>
            <img src="./img/装饰.png" alt="" class="zs" />
          </div>
          <div class="box">
            <div class="left1">
              <div>
                <div class="lywz">塘河长度</div>
                <div class="deh">
                  <span class="lybq">1178.4</span>
                  <span class="lydw"> 千米</span>
                </div>
              </div>
              <div>
                <div class="lywz">蓄水量</div>
                <div class="deh">
                  <span class="lybq">{{ `${lable.xsl}` }}</span>
                  <span class="lydw"> 万立方米</span>
                </div>
              </div>
              <div>
                <div class="lywz">灌溉面积</div>
                <div class="deh">
                  <span class="lybq">48.2</span>
                  <span class="lydw"> 万亩</span>
                </div>
              </div>
            </div>
            <div class="right1">
              <div>
                <div class="lywz">流域面积</div>
                <div class="deh">
                  <span class="lybq">740</span>
                  <span class="lydw"> 平方千米</span>
                </div>
              </div>
              <div>
                <div class="lywz">平均流量</div>
                <div class="deh">
                  <span class="lybq">{{ `${lable.pjll}` }}</span>
                  <span class="lydw"> 亿立方米</span>
                </div>
              </div>
              <div>
                <div class="lywz">源头</div>
                <div class="deh">
                  <span class="ly">瞿溪、雄溪、郭溪</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div >
          <div class="title-wrapper">
            <span class="pre"></span>
            <span class="title">温瑞塘河航道</span>
          </div>
        </div>
        <div class="zsj">
          <div class="ssj">
            <img src="./img/塘河航道(2).svg" class="hangdao"">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        showLarge: false,
        screenWidth: document.body.clientWidth,
        screeHeight: document.body.clientHeight,
        temp:
          "温瑞塘河位于瓯江以南、飞云江以北的温瑞平原，是温州市境内十分重要的河道水系，分属于鹿城、瓯海、龙湾、瑞安等“三区一市”管辖。",
        attributes: {},
        lable: {
          lymj: 740,
          xsl: 6500,
          thcd: 1178.4,
          pjll: 9.13,
        },
        currentType: 'total'
      };
    },
    computed: {
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
    mounted() {
      this.getKuanGao();
    }

  };
</script>

<style lang="less" scoped>
  @import url("./rightSummary.less");
  .left {
    // margin-top: 3%;
    margin-right: 25%;
    height: 100%;
    padding-left: 3%;
    /*flex-grow:0;*/
  }
  .ssjda1 {
    padding-top: 5%;
    /*padding-bottom: 5%;*/
  }
  .right {
    flex-shrink: 0;
    // margin-top: 3%;
    height: 100%;
    /*flex-grow:0;*/
  }

  .left1 {
    margin-top: 1vh;
    margin-right: 10vh;
    height: 18vh;
    flex: 1;
    text-align: left;
    padding-left: 1vh;
  }
  .hangdao{
    width:35vh;
    height: 25vh;
  }
  .right1 {
    flex-shrink: 0;
    margin-top: 1vh;
    height: 18vh;
    flex: 1;
    text-align:left
    /*flex-grow:0;*/
  }
  .cellDiv {
    width: 350px;
    height: 40 px;
    display: table-cell;
  }
  .lybq {
    font-size: 2vh;
    color: #2acbfe;
    font-family: DIN;
    line-height: 2vh;
  }
  .deh {
    // padding-bottom: 15%;
    padding-bottom: 1.2vh;
  }
  .dehda {
    // padding-bottom: 15%;
    padding-bottom: 15%;
  }
  .lydw {
    font-size: 1.2vh;
    color: #2acbfe;
    font-family: DIN;
    line-height: 1.8vh;
  }
  .ly {
    font-size: 1.3vh;
    color: #2acbfe;
    font-family: DIN;
    line-height: 1.8vh;
    opacity: 1;
  }
  .lywz {
    font-size: 1.7vh;
    font-family: PingFang SC;
    line-height: 2vh;
    color: #ffffff;
    margin-bottom: 1vh;
  }
  .lywzda {
    font-size: 14px;
    font-family: PingFang SC;
    line-height: 20px;
    color: #ffffff;
    // margin-bottom: 5%;
    margin-bottom: 15%;
  }

  .xmzs {
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    color: #FFFFFF;
  }
  .xmzje {
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 47%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    color: #26bce5;
  }
  .button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }

  .lab {
    font-family: PingFang SC;
    font-size: 1.5vh;
    width: 35vh;
    color: #dedede;
    line-height: 2vh;
    padding-top: 0.5vh;
    text-indent: 2em;
    text-align:left;
    padding-left: 1vh;
  }
  .labda {
    font-family: PingFang SC;
    font-size: 1.6vh;
    width: 35vh;
    color: #dedede;
    line-height: 2vh;
    padding-top: 0.5vh;
    text-indent: 2em;
    text-align: left;
    padding-left: 1vh;
  }
  .yxwz {
    font-family: PingFang SC;
    font-size: 11px;
    //line-height: 18px;
    //max-height: 140px;
    color: #ffffff;
    line-height: 10px;
    width: 100%;
    padding-left: 8px;
    display: flex;
    align-items: center;
  }
  .kddw {
    font-size: 20px;
    font-family: YouSheBiaoTiHei;
    line-height: 26px;
    color: #ffffff;
  }
  .kdsz {
    font-size: 28px;
    font-family: YouSheBiaoTiHei;
    line-height: 26px;
    color: #ffffff;
  }
  .kdwzleft {
    font-size: 14px;
    font-family: PingFang SC;
    line-height: 20px;
    color: #16eaea;
    /*padding-left: 4px;*/
  }
  .kdwzright {
    font-size: 14px;
    font-family: PingFang SC;
    line-height: 20px;
    color: #00ffd4;
    /*padding-left: 25px;*/
  }
  .xbt {
    font-size: 2vh;
    font-family: YouSheBiaoTiHei;
    line-height: 2vh;
    color: #ffffff;
    overflow-y: auto;
    letter-spacing: 1.5vh;
  }
  .xbtda {
    font-size: 22px;
    font-family: YouSheBiaoTiHei;
    line-height: 22px;
    color: #ffffff;
    overflow-y: auto;
    letter-spacing: 15px;
  }
  .zs {
    width: 70%;
  }
  .wenzi {
    padding-left: 1vh;
  }
  .jianju{
    padding-top: 1vh;
    text-align: left;
    padding-left: 1vh;
  }
  .jianjuda {
    padding-top: 3%;
    text-align: left;
    padding-left: 3%;
    /*padding-bottom: 5%;*/
  }
  .jianjuda1 {
    padding-top: 3%;
    text-align: left;
    padding-left: 3%;
    /*padding-bottom: 5%;*/
  }
  .kdjj {
    // padding-top: 7%;
    // padding-bottom: 7%;
    padding: 15px 0;
  }
  .box {
    display: flex;
    flex-direction: row;
  }
  .yxxm {
    padding-top: 15%;
    padding-bottom: 10%;
  }
  .zsj {
    padding-left: 1vh;
  }
  .tp {
    position: relative;
  }
  .ssj {
    padding-top: 1vh;
  }
  .tpwz {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .tpwzls {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #215dde;
  }
  .tpjg {
    padding-right: 15px;
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
  // .buttonpd1 {
  //   padding-right: 20px;
  // }
  .ding {
    // padding-bottom: 7px;
    padding-top: 5%;
  }
  .sp {
    width: 35vh;
    padding-right: 1vh;
  }
  .spda {
    width: 100%;
    /*padding-right: 10px;*/
    /*padding-bottom: 5%;*/
  }
  .dbz {
    display: flex;
    align-items: center;
    padding-right: 30px;
  }
  .dby {
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }
  .d1 {
    // padding-top: 5%;
    padding-top: 10px;
  }
</style>
