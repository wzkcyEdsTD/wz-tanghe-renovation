<template>
  <div class="rightSummary">
    <!-- <div class="ding"> -->
      <!-- <div class="box">
        <div class="buttonpd" :class="{active: currentType=='total'}" @click="currentType='total'">
          <div class="tp">
            <img src="./img/组合.png" alt="" v-show="currentType=='total'" />
            <img src="./img/button.png" alt="" v-show="currentType=='source'" />
            <span class="button">总览</span>
          </div>
        </div>
        <div class="buttonpd" :class="{active: currentType=='source'}" @click="currentType='source'">
          <div class="tp">
            <img src="./img/组合.png" alt="" v-show="currentType=='source'" />
            <img src="./img/button.png" alt="" v-show="currentType=='total'" />
            <span class="button">资源</span>
          </div>
        </div>
        <div>
          <div class="tp">
            <img src="./img/button.png" alt="" />
            <span class="button">卡点</span>
          </div>
        </div>
      </div> -->
      <!-- <div>
        <img src="./img/装饰.png" alt="" />
      </div> -->
    <!-- </div> -->
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
            src="static/images/温瑞塘河/温瑞塘河.mp4"
            controls
            class="sp"
          />
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
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">沿线项目</span>
        </div>
        <div class="zsj">
          <div class="ssj">
            <div class="box">
              <div class="left">
                <div>
                  <div class="tp">
                    <img src="./img/zuo.png" alt="" />
                    <span class="xmzs">105</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>
                  <div class="tp">
                    <img src="./img/you.png" alt="" />
                    <span class="xmzje">5600</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="left">
                <div class="yxxm">
                  <span class="yxwz">项目总数(个)</span>
                </div>
              </div>
              <div class="right">
                <div class="yxxm">
                  <span class="yxwz">项目总金额(万元)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">卡点</span>
        </div>
        <div>
          <div class="kdjj">
            <div class="zsj">
              <div class="box">
                <div class="left">
                  <div>
                    <span class="kdsz">40</span>
                    <span class="kddw">/个</span>
                  </div>
                  <div class="kdwzleft">卡点总数</div>
                </div>
                <!--                <div >-->
                <!--                  <img src="./img/直线.png" alt="">-->
                <!--                </div>-->
                <div class="right">
                  <div>
                    <span class="kdsz">19352</span>
                    <span class="kddw">/米</span>
                  </div>
                  <div class="kdwzright">卡点总长度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="zsj">
        <div class="d1">
          <div class="box">
            <div class="dbz">
              <img src="./img/联合 11.png" alt="" />
            </div>
            <div class="tpjg">
              <div class="tp">
                <img src="./img/数字选中.png" alt="" />
                <span class="tpwz">1</span>
              </div>
            </div>
            <div class="tpjg">
              <div class="tp">
                <img src="./img/椭圆 5.png" alt="" />
                <span class="tpwzls">2</span>
              </div>
            </div>
            <div class="tpjg">
              <div class="tp">
                <img src="./img/椭圆 5.png" alt="" />
                <span class="tpwzls">3</span>
              </div>
            </div>
            <div class="dby">
              <img src="./img/联合 10.png" alt="" />
            </div>
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
    // ...mapGetters("map", ["projectList"]),
  },
  // watch: {
  //   currentType(val) {
  //     this.$bus.$emit("change-summay", { value: val });
  //   }
  // }
};
</script>

<style lang="less" scoped>
@import url("./rightSummary.less");
.left {
  // margin-top: 3%;
  margin-right: 25%;
  height: 100%;
  /*flex-grow:0;*/
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
  /*flex-grow:0;*/
}
.right1 {
  flex-shrink: 0;
  margin-top: 3%;
  height: 100%;
  flex: 1;
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

.xmzs {
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: YouSheBiaoTiHei;
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
  //line-height: 18px;
  //max-height: 140px;
  width: 100%;
  color: #dedede;
  line-height: 21px;
  padding-top: 5px;
  text-indent: 2em;
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
}
.kdsz {
  font-size: 28px;
  font-family: YouSheBiaoTiHei;
  line-height: 26px;
}
.kdwzleft {
  font-size: 14px;
  font-family: PingFang SC;
  line-height: 20px;
  color: #16eaea;
  padding-left: 7px;
}
.kdwzright {
  font-size: 14px;
  font-family: PingFang SC;
  line-height: 20px;
  color: #00ffd4;
  padding-left: 25px;
}
.xbt {
  font-size: 18px;
  font-family: YouSheBiaoTiHei;
  line-height: 16px;
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
.jianju {
  padding-top: 2%;
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
