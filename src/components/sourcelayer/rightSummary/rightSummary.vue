<template>
  <div class="rightSummary">
    <div style="padding-bottom:7px">
      <div style="padding-top: 5%">

      <div style="padding-left:3%">
        <div style="padding-right:15%">
            <div style="position:relative;">
              <img src="./img/组合.png" alt="" style="position:absolute;">
              <span style="position:absolute;left:11%;top:5px;font-size: 20px;">总览</span>

          </div>

        </div>
        <div style="padding-left:35%">
          <div class = "cellDiv" style="padding-buttom:15%">
          <div >
            <div style="position:relative;">
              <img src="./img/button.png" alt="">
              <span style="position:absolute;top:18%; left:20%;font-size: 20px;">项目</span>
            </div>
          </div>

        </div>
        <div class = "cellDiv">
          <div style="position:relative" >
            <img src="./img/button.png" alt="">
            <span style="position:absolute;top:18%; left:20%;font-size: 20px;">卡点</span>
          </div>
        </div>
        </div>
      </div>
      </div>
      <div style="padding-top:2%">
        <img src="./img/装饰.png" alt="" >
      </div>

      </div>
    <div class="_bimframe_">
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">温瑞塘河</span>
        </div>
        <div style="position:relative;">
          <span class="summary" style="position:absolute;left:3%">简介</span>
          <img src="./img/装饰.png" alt="" style="padding-left:25%;width:350px;height:40 px;" >
        </div>

        <div style="padding-left:3%">
          <p class="lab" style="padding-top: 5px;text-indent: 2em;">{{ temp || "暂无简介" }}</p>
          <video
            src="static/images/温瑞塘河/温瑞塘河.mp4"
            controls
            autoplay
            muted
            loop
            style="width: 100%;padding-right: 10px"
          />
        <div style="position:relative;">
          <span class="summary" style="position:absolute;bottom:4px">流域</span>
          <img src="./img/装饰.png" alt="" style="padding-left:25%;width:350px;padding-bottom:7px" >
        </div>
          <!-- <span class="summary" style="padding-bottom:4px">流域</span>
          <img src="./img/装饰.png" alt=""> -->
          <div class="parent">
            <div class="left">
              <div style="padding-bottom:5px;">
                <div style="padding-bottom:7px;">塘河长度</div>
                <span style="font-size: 18px;color: #2ACBFE;font-family:DIN-Bold;">1178.4</span>
                <span style="color: #26BCE5;"> 千米</span>
              </div>
              <div style="padding-bottom:5px;">
                <div style="padding-bottom:7px">蓄水量</div>
                <span style="font-size: 18px;color: #2ACBFE;font-family:DIN-Bold;">{{`${lable.xsl}`}}</span>
                <span style="color: #26BCE5;"> 万立方米</span>
              </div>
              <div>
                <div style="padding-bottom:7px">灌溉面积</div>
                <span style="font-size: 18px;color: #2ACBFE;font-family:DIN-Bold;">48.2</span>
                <span style="color: #26BCE5;"> 万亩</span>
              </div>
            </div>
            <div class="right">
              <div style="padding-bottom:7px;">
                <div style="padding-bottom:5px">流域面积</div>
                <span style="font-size: 20px;color: #26BCE5;">740</span>
                <span style="color: #26BCE5;"> 平方千米</span>
              </div>
              <div style="padding-bottom:5px">
                <div style="padding-bottom:7px">平均流量</div>
                <span style="font-size: 20px;color: #26BCE5;">{{`${lable.pjll}`}}</span>
                <span style="color: #26BCE5;"> 亿立方米</span>
              </div>
              <div>
                <div style="padding-bottom:7px">源头</div>
                <span style="font-size: 20px;color: #26BCE5;">瞿溪、雄溪、郭溪</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="title-wrapper" style="padding-bottom:15px;padding-top:10px">
          <span class="pre"></span>
          <span class="title" >沿线项目</span>
        </div>
        <div class="parent" style="padding-left:8%;padding-bottom:10px;text-align:center">
          <div class="left" style="text-align:center">
            <div style="padding-bottom:15%;">
              <div style="position:relative">
                <img src="./img/zuo.png" alt="">
                <span style="font-size: 20px;position:absolute;top:37%; left:33%;font-family:YouSheBiaoTiHei">105</span>
              </div>

            </div>
            <span style="">项目总数(个)</span>
          </div>
          <div class="right" style="text-align:center">
            <div style="padding-bottom:10%">
              <div style="position:relative" >
                <img src="./img/you.png" alt="">
                <span style="font-size: 20px;position:absolute;top:37%; left:32%;font-family:YouSheBiaoTiHei;color:#26BCE5">5600</span>
              </div>

            </div>
            <span>项目总金额(万元)</span>
          </div>
        </div>
      </div>
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">卡点</span>
        </div>
        <div>
        <div class="parent" style="padding-top:5%;padding-bottom:5%">
          <div style="text-align:center;padding-left:15%;float:left;margin-right:10%;">
            <div>
              <span style="font-size: 28px;font-family:YouSheBiaoTiHei">40</span>
              <span style="font-size: 20px;font-family:YouSheBiaoTiHei">/个</span>
            </div>
            <div style="font-size: 14px;font-family:PingFang SC;color:#16EAEA;">卡点总数</div>
          </div>
          <div class="right" style="text-align:center">
            <div style="">
              <span style="font-size: 28px;font-family:YouSheBiaoTiHei">19352</span>
              <span style="font-size: 20px;font-family:YouSheBiaoTiHei">/米</span>
            </div>
            <div style="font-size: 14px;font-family:PingFang SC;color:#16EAEA;">卡点总长度</div>
          </div>
        </div>
        </div>
      </div>

      <div style="padding-left:5%">
        <div class = "cellDiv" style="padding-right:30px">
          <img src="./img/联合 11.png" alt="" style="padding-bottom:5%;">
        </div>
        <div class = "cellDiv">
          <div style="position:relative">
            <img src="./img/数字选中.png" alt="">
            <span style="position:absolute;top:15%; left:18%;">1</span>
          </div>
        </div>
        <div class = "cellDiv">
          <div style="position:relative">
            <img src="./img/椭圆 5.png" alt="">
            <span style="position:absolute;top:15%; left:18%;color:#215DDE ">2</span>
          </div>
        </div>
        <div class = "cellDiv">
          <div style="position:relative">
            <img src="./img/椭圆 5.png" alt="">
            <span style="position:absolute;top:15%; left:18%;color:#215DDE">3</span>
          </div>

        </div>
        <div class = "cellDiv" style="padding-left:15px">
          <img src="./img/联合 10.png" alt="" style="padding-bottom:5%;">
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
        temp:"温瑞塘河位于瓯江以南、飞云江以北的温瑞平原，是温州市境内十分重要的河道水系，分属于鹿城、瓯海、龙湾、瑞安等“三区一市”管辖。",
        attributes: {},
        lable:{
          lymj:740,
          xsl:6500,
          thcd:1178.4,
          pjll:9.13
        }
      };
    },
    computed: {
      // ...mapGetters("map", ["projectList"]),
    },

  }
</script>

<style lang="less">
  @import url("./rightSummary.less");
.parent {
overflow: hidden;
zoom: 1;
width: 100%;
  .left {
    float: left;
    margin-right: 15%;
  }
  .right {
    overflow: hidden;
    zoom: 1;

  }
}
.cellDiv
{
    width:350px;
    height:40 px;
    display:table-cell;

}

</style>
