<template>
  <div class="rightSummary">
    <div class="frame_">
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span :class="!showLarge?'title':'titleda'">温瑞塘河</span>
        </div>
        <div class="wenzi">
          <div :class="!showLarge?'jianju':'jianjuda'">
            <span :class="!showLarge?'xbt':'xbtda'">简介</span>
            <img src="./img/装饰.png" alt="" class="zs" />
          </div>
          <p :class="!showLarge?'lab':'labda'">{{ temp || "暂无简介" }}</p>
          <video
            src="static/images/温瑞塘河/温瑞塘河.mp4"
            controls
            :class="!showLarge?'sp':'spda'"
          />
          <div :class="!showLarge?'jianju':'jianjuda'">
            <span :class="!showHub?'xbt':'xbtda'">流域</span>
            <img src="./img/装饰.png" alt="" class="zs" />
          </div>
          <div class="box">
            <div class="left1">
              <div>
                <div :class="!showLarge?'lywz':'lywzda'">塘河长度</div>
                <div :class="!showLarge?'deh':'dehda'">
                  <span class="lybq">1178.4</span>
                  <span class="lydw"> 千米</span>
                </div>
              </div>
              <div>
                <div :class="!showLarge?'lywz':'lywzda'">蓄水量</div>
                <div :class="!showLarge?'deh':'dehda'">
                  <span class="lybq">{{ `${lable.xsl}` }}</span>
                  <span class="lydw"> 万立方米</span>
                </div>
              </div>
              <div>
                <div :class="!showLarge?'lywz':'lywzda'">灌溉面积</div>
                <div :class="!showLarge?'deh':'dehda'">
                  <span class="lybq">48.2</span>
                  <span class="lydw"> 万亩</span>
                </div>
              </div>
            </div>
            <div class="right1">
              <div>
                <div :class="!showLarge?'lywz':'lywzda'">流域面积</div>
                <div :class="!showLarge?'deh':'dehda'">
                  <span class="lybq">740</span>
                  <span class="lydw"> 平方千米</span>
                </div>
              </div>
              <div>
                <div :class="!showLarge?'lywz':'lywzda'">平均流量</div>
                <div :class="!showLarge?'deh':'dehda'">
                  <span class="lybq">{{ `${lable.pjll}` }}</span>
                  <span class="lydw"> 亿立方米</span>
                </div>
              </div>
              <div>
                <div :class="!showLarge?'lywz':'lywzda'">源头</div>
                <div :class="!showLarge?'deh':'dehda'">
                  <span class="ly">瞿溪、雄溪、郭溪</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div :class="!showLarge?'ssj':'ssjda1'">
          <div class="title-wrapper">
            <span class="pre"></span>
            <span :class="!showLarge?'title':'titleda'">温瑞塘河航道</span>
          </div>
        </div>
        <div class="zsj">
          <div class="ssj">
            <img src="./img/塘河航道(2).svg" style="width: 100%">
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
    margin-top: 3%;
    margin-right: 20%;
    height: 100%;
    flex: 1;
    text-align:left;
    padding-left: 3%;
    /*flex-grow:0;*/
  }
  .right1 {
    flex-shrink: 0;
    margin-top: 3%;
    height: 100%;
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
    font-size: 18px;
    color: #2acbfe;
    font-family: DIN;
    line-height: 18px;

  }
  .deh {
    // padding-bottom: 15%;
    padding-bottom: 10px;
  }
  .dehda {
    // padding-bottom: 15%;
    padding-bottom: 15%;
  }
  .lydw {
    font-size: 10px;
    color: #2acbfe;
    font-family: DIN;
    line-height: 18px;
  }
  .ly {
    font-size: 13px;
    color: #2acbfe;
    font-family: DIN;
    line-height: 18px;
    opacity: 1;
  }
  .lywz {
    font-size: 14px;
    font-family: PingFang SC;
    line-height: 20px;
    color: #ffffff;
    // margin-bottom: 5%;
    margin-bottom: 5px;
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
    font-size: 14px;
    width: 100%;
    color: #dedede;
    line-height: 21px;
    padding-top: 5px;
    text-indent: 2em;
    text-align:left;
    padding-left: 3%;
  }
  .labda {
    font-family: PingFang SC;
    font-size: 16px;
    width: 100%;
    color: #dedede;
    line-height: 30px;
    padding-top: 5px;
    text-indent: 2em;
    text-align:left;
    padding-left: 3%;
    padding-bottom: 3%;
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
    font-size: 18px;
    font-family: YouSheBiaoTiHei;
    line-height: 16px;
    color: #ffffff;
    overflow-y: auto;
    letter-spacing: 15px;
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
    padding-left: 3%;
  }
  .jianju{
    padding-top: 2%;
    text-align: left;
    padding-left: 3%;
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
    padding-left: 3%;
  }
  .tp {
    position: relative;
  }
  .ssj {
    padding-top: 5%;
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
    width: 100%;
    padding-right: 10px;
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
