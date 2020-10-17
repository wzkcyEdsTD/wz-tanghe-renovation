<template>
  <div class="rightSummary">
    <div class="frame_">
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
                    <img src="./img/zuo.png" alt="" class="quanquan"/>
                    <span class="xmzs">66</span>
                  </div>
                </div>
                <div class="yxxm">
                  <span class="yxwz">项目总数(个)</span>
                </div>
              </div>
              <div class="right">
                <div >
                  <div class="tp">
                    <img src="./img/you.png" alt="" class="quanquan"/>
                    <span class="xmzje">275.11</span>
                  </div>
                </div>
                <div class="yxxm">
                  <span class="yxwz">项目总金额(亿元)</span>
                </div>
              </div>
            </div>
            <div class="uls1">
              <div>
                <img src="./img/发光圈圈.png" alt="" class="jz1">
              </div>
              <span class="jdt">完成率:12/66</span>
              <div style="height:3vh;flex: 1" class="echart" ref="echartBar"></div>
            </div>
          </div>
        </div>
      </div>
      <div >
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">断点</span>
        </div>
        <div>
          <div class="kdjj">
            <div class="zsj">
              <div class="jianju">
                <div >
                  <span class="xbt">断点预计完成情况</span>
<!--                  <img src="./img/装饰.png" alt="" class="zs" />-->
                </div>
                <div >
                  <div class="dw">
                    <span class="smalls">单位：个(累计)</span>
                  </div>
                  <div  style="height:17vh;width: 35vh;padding-right: 1vh;" class="echart" ref="lineEchart"></div>
                  <div class="ssj">
                    <div class="uls1">
                      <div>
                        <img src="./img/发光圈圈.png" alt="" class="jz1">
                      </div>
                      <span class="jdt">完工率:1/40</span>
                      <div style="height:3vh;flex: 1" class="echart" ref="echartBar1"></div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">十二景</span>
        </div>
        <div></div>
        <img src="./img/装饰1.svg" class="zxp">
        <div class="ssj1">
          <div class="uls">
            <div class="left2" >
              <span class="jz">东线</span>
              <div class="xwz">
                <img src="./img/世纪之光icon.svg" class="jz2">
                <span class="sejdx">世纪之光</span>
              </div>
              <div class="xwz">
                <img src="./img/蒲州新韵icon.svg" class="jz2">
                <span class="sejdx">蒲州新韵</span>
              </div>
            </div>
            <img src="./img/直线12.svg" class="zx">
            <div class="left1">
              <span class="jz">西线</span>
              <div class="uls">
                <div class="xwz">
                  <img src="./img/瞿溪溯源icon.svg" class="jz2">
                  <span class="sejxx">瞿溪溯源</span>
                </div>
                <div class="xwz">
                  <img src="./img/仙门烟柳icon.svg" class="jz2">
                  <span class="sejxx">仙门烟柳</span>
                </div>
              </div>
              <div class="uls">
                <div class="xwz">
                  <img src="./img/镜湖古岸icon.svg" class="jz2">
                  <span class="sejxx">镜湖古岸</span>
                </div>
                <div class="xwz">
                  <img src="./img/会昌竞渡icon.svg" class="jz2">
                  <span class="sejxx">会昌竞渡</span>
                </div>
              </div>
            </div>
          </div>
          <div class="left3">
            <span class="jz">南线</span>
            <div class="uls">
              <div class="xwz1">
                <img src="./img/南塘印象icon.svg" class="jz2">
                <span class="sejnx">南塘印象</span>
              </div>
              <div class="xwz1">
                <img src="./img/南湖月色icon.svg" class="jz2">
                <span class="sejnx">南湖月色</span>
              </div>
              <div class="xwz1">
                <img src="./img/浮岛帆游icon.svg" class="jz2">
                <span class="sejnx">浮岛帆游</span>
              </div>
            </div>
            <div class="uls">
              <div class="xwz1">
                <img src="./img/梧田老街icon.svg" class="jz2">
                <span class="sejnx">梧田老街</span>
              </div>
              <div class="xwz1">
                <img src="./img/白象塔院icon.svg" class="jz2">
                <span class="sejnx">白象塔院</span>
              </div>
              <div class="xwz1">
                <img src="./img/穗丰怀古icon.svg" class="jz2">
                <span class="sejnx">穗丰怀古</span>
              </div>
            </div>
          </div>
        </div>
        <img src="./img/装饰1.svg" class="zxp1">
      </div>

    </div>
  </div>
</template>
<script>
    export default {
        name: "right",
      data() {
        return {
          temp:
            "温瑞塘河位于瓯江以南、飞云江以北的温瑞平原，是温州市境内十分重要的河道水系，分属于鹿城、瓯海、龙湾、瑞安等“三区一市”管辖。",
          attributes: {},
          showHub:false,
          screenWidth: document.body.clientWidth,
          screeHeight: document.body.clientHeight,
          lable: {
            lymj: 740,
            xsl: 6500,
            thcd: 1178.4,
            pjll: 9.13,
          },
          currentType: 'total'
        };
      },
      mounted() {
        this.$nextTick(()=>{
          this.drawLine();
          this.initBar();
          this.getKuanGao();
        });
      },
      methods:{
        getKuanGao(){
          //4320*1280
          console.log(this.screenWidth);
          //大屏返回true
          if(this.screenWidth>4000&this.screeHeight>1000){
            console.log(true);
            this.showHub = true;
          }else {
            console.log(false);
            this.showHub = false;
          };
        },
        getFontSize(){
          let e = this.screenWidth;
          if (e>4000){
            e = 16;
          }else {
            e = 12;
          }

          return e;
        },
        drawLine() {
          this.lineEchart = this.$echarts.init(this.$refs.lineEchart);
          const that = this;
          let e = this.getFontSize();
          console.log(e);
          this.lineEchart.setOption({
            legend: {
              orient: "horizontal",
              top: "0",
              left: "24%",
              icon: "rect",
              itemWidth: 6,
              itemHeight: 6,
              textStyle: {
                color: "#fff",
              },
              // selectedMode: false,
              data: ["1"],
            },
            color: ["#077768"],
            grid: {
              left: "5%",
              top: "8%",
              width: '90%',
              height: "90%",
              containLabel: true,
            },
            tooltip : {
              trigger: 'axis',
              axisPointer: {
                // type: 'cross',
                label: {
                  backgroundColor: '#6a7985',
                  textStyle:{
                    fontSize: e,
                  }
                }
              }
            },
            xAxis: {
              boundaryGap: false,
              axisTick: {
                show: true,
              },
              splitLine:{
                show: true,
                lineStyle:{
                  type:'dotted',
                  color:"#5C5C5C"
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },
              axisLabel: {
                rotate: 40,
                interval: 0,
                color: "#fff",
                textStyle:{
                  // fontSize:12
                  fontSize: e,
                }
              },
              data: ["","20年第四季度", "21年第一季度", "21年第二季度", "21年第三季度", "21年第四季度", "22年第一季度", "22年第二季度", "22年第三季度", "22年第四季度"],
            },
            yAxis: {
              splitNumber: 3,
              axisLine: {
                show: false,
                // lineStyle: {
                //   color: "rgba(255, 255, 255, 0.7)",
                // },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: "#fff",
                  fontSize: e,
                },

              },
              splitLine: {
                show: false,
              },
            },
            series: [
              {
                // name: "1",
                type: "line",
                areaStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#008076" },
                      { offset: 1, color: "rgba(0,128,118,0)" }
                    ])
                  }
                },
                // symbol: 'none',
                data: [0,11, 11, 12, 18, 30, 30, 31, 32, 40],
              },
            ],
          });
          window.addEventListener("resize",function () {
            that.lineEchart.resize();
          });
        },
        initBar(){
          const that = this;
          this.echartBar1 = this.$echarts.init(this.$refs.echartBar1);
          this.echartBar1.setOption({
              grid: {
                left: "3%",
                containLabel: false,
              },
              textStyle:{
                color: '#FAFAFA',
                fontSize: 13,
                fontFamily:"PingFang SC",
              },
              yAxis: {
                axisLabel: {
                  textStyle: {
                    color: '#FAFAFA',
                    fontSize: 13,
                    fontFamily:"PingFang SC",
                  }
                },
                data: [''],
                axisTick:{       //x轴刻度线
                  show:false
                },
                splitLine: {     //网格线
                  show: false
                },
                axisLine:{		//坐标轴线
                  show:false
                }

              },
              xAxis: {
                max: 100,
                min:0,
                axisLine:{		//坐标轴线
                  show:false
                },
                splitLine: {     //网格线
                  show: false
                },
                axisTick:{       //x轴刻度线
                  show:false
                },
              },
              series: [
                {
                  name: '已完成',
                  type: 'bar',
                  stack:'完成情况',
                  data:[2.5],
                  barWidth : 10,//柱图宽度
                  itemStyle:{
                    color: function(params) {
                      var colorList = ['#16E8E8','#0CF2DF','#00FFD4'];
                      return colorList[params.dataIndex]
                    },
                    barBorderRadius: [50, 0, 0, 50] // 统一设置四个角的圆角大小
                  },
                  // zlevel:1//柱状图所有图形的 zlevel 值,
                },
                {
                  name: '未完成',
                  type: 'bar',
                  stack:'完成情况',
                  data: [97.5],
                  // barGap: '-100%',
                  itemStyle:{
                    color:"#02364F",
                    barBorderRadius: [0, 50, 50, 0]// 统一设置四个角的圆角大小
                  }
                }
              ]
            });
          window.addEventListener("resize",function () {
            that.echartBar1.resize();
          });
          this.echartBar = this.$echarts.init(this.$refs.echartBar);
          this.echartBar.setOption({
              grid: {
                left: "3%",
                containLabel: false,
              },
              textStyle:{
                color: '#FAFAFA',
                fontSize: 13,
                fontFamily:"PingFang SC",

              },
              yAxis: {
                axisLabel: {
                  textStyle: {
                    color: '#FAFAFA',
                    fontSize: 13,
                    fontFamily:"PingFang SC",
                  }
                },
                data: [''],
                axisTick:{       //x轴刻度线
                  show:false
                },
                splitLine: {     //网格线
                  show: false
                },
                axisLine:{		//坐标轴线
                  show:false
                }

              },
              xAxis: {
                max: 100,
                min:0,
                show:false,
                axisLine:{		//坐标轴线
                  show:false
                },
                splitLine: {     //网格线
                  show: false
                },
                axisTick:{       //x轴刻度线
                  show:false
                },
              },
              series: [
                {
                  name: '已完成',
                  type: 'bar',
                  stack:'完成情况',
                  data:[18.18],
                  barWidth : 10,//柱图宽度
                  itemStyle:{
                    color: function(params) {
                      var colorList = ['#16E8E8','#0CF2DF','#00FFD4'];
                      return colorList[params.dataIndex]
                    },
                    barBorderRadius: [50, 0, 0, 50] // 统一设置四个角的圆角大小
                  },
                  // zlevel:1//柱状图所有图形的 zlevel 值,
                },
                {
                  name: '未完成',
                  type: 'bar',
                  stack:'完成情况',
                  data: [81.82],
                  // barGap: '-100%',
                  itemStyle:{
                    color:"#02364F",
                    barBorderRadius: [0, 50, 50, 0]// 统一设置四个角的圆角大小
                  }
                }
              ]
            });
          window.addEventListener("resize",function () {
            that.echartBar.resize();
          });
        },
      }
    }
</script>

<style lang="less" scoped>
  @import url("./rightSummary.less");
  .quanquan{
    width: 9vh;
    height: 9vh;
  }
  .left {
    margin-right: 8vh;
    padding-left: 0.5vh;
  }
  .right {
    flex-shrink: 0;

  }
  .left1 {
    text-align:center;
  }
  .left2 {
    text-align:right;
  }
  .left3 {
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
    text-align:center;
  }
  .zx{
    padding-left: 4vh;
    height: 11vh;
    padding-right: 1vh;
  }
  .xwz{
    width: 10vh;
    padding-top: 1vh;
  }
  .zxp{
    padding-top: 1vh;
    width: 2vh;
  }
  .zxp1{
    // position: absolute;
    /*top: 1vh;*/
    // right: 1vh;
    float: right;
    width: 2vh;
    transform: rotate(-180deg);
  }
  .xwz1{
    width: 14vh;
    padding-top: 1vh;
  }
  .dw{
    padding-bottom:1vh;
    padding-top: 1vh;
  }

  .sejdx{
    color:#16EAEA;
    font-size: 1.6vh;
    font-family: PingFang SC;
    /*padding-left: 3%;*/
  }
  .sejxx{
    font-size: 1.6vh;
    font-family: PingFang SC;
    color:#00FFD4;
  }
  .sejnx{
    font-size: 1.6vh;
    font-family: PingFang SC;
    color:#A2F6B6;
  }
  .jz1{
    vertical-align:middle;
    /*flex: 1;*/
    width: 3vh;
    height: 3vh;
    /*width:50%;*/
  }
  .jz2{
    /*vertical-align:middle;*/
    /*flex: 1;*/
    width: 2vh;
    height: 2vh;
    /*padding-right: 5px;*/
    /*width:50%;*/
  }
  .jz{
    /*vertical-align:middle;*/
    text-align:center;
    font-family: YouSheBiaoTiHei;
    font-size: 3vh;
  }

  .xmzs {
    font-size: 2vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    color: #FFFFFF;
  }
  .uls {
    /*width: 100%;*/
    // background: red;
    display: flex;
    // margin: auto;
    // margin-top: 100px;
    // padding: 0 10px;
    align-items: center;
    justify-content: center;
    /*flex-shrink:0;*/
  }
  .uls1 {
    /*width: 100%;*/
    // background: red;
    display: flex;
    // margin: auto;
    // margin-top: 100px;
    // padding: 0 10px;
    align-items: center;
    /*justify-content: center;*/
    /*flex-shrink:0;*/
  }
  .jdt{
    font-size: 1vh;
    color: #FAFAFA;
    line-height: 1vh;
    font-family: PingFang SC;
    align-self:center;
    width:9vh;
    /*padding-right: 10px*/
  }
  .xmzje {
    font-size: 2vh;
    position: absolute;
    top: 50%;
    left: 47%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    color: #26bce5;
  }
  .yxwz {
    font-family: PingFang SC;
    font-size: 1vh;
    //line-height: 18px;
    //max-height: 140px;
    color: #ffffff;
    line-height: 1vh;
    /*width: 100%;*/
    /*padding-left: 1vh;*/
    display: flex;
    align-items: center;
    justify-content:center;
  }
  .smalls{
    font-size: 1vh;
    font-family: PingFang SC;
    line-height: 1vh;
    color: #ffffff;
  }
  .xbt {
    font-size: 2vh;
    font-family: YouSheBiaoTiHei;
    line-height: 1.6vh;
    color: #ffffff;
    padding-bottom: 1vh;
    /*overflow-y: auto;*/
    /*letter-spacing: 15px;*/
  }
  .jianju {
    /*padding-top: 2%;*/
  }
  .kdjj {
    // padding-top: 7%;
    // padding-bottom: 7%;
    padding: 1.5vh 0;
  }
  .box {
    display: flex;
    flex-direction: row;
    align-items:center;
  }
  .yxxm {
    padding-top: 1vh;
    padding-bottom: 1vh;
  }
  .zsj {
    padding-left: 2vh;
  }
  .tp {
    position: relative;
  }
  .ssj {
    padding-top: 1vh;
  }
  .ssj1 {
    /*padding-top: 1%;*/
  }
  .tpwz {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .buttonpd {
    padding-right: 3vh;
    cursor: pointer;
    &.active {
      .button {
        top: 40%;
      }
    }
  }
  .ding {
    padding-top: 5%;
  }
  .sp {
    width: 100%;
    padding-right: 10px;
  }
</style>
