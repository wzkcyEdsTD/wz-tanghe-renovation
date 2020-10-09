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
                    <img src="./img/zuo.png" alt="" />
                    <span class="xmzs">66</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>
                  <div class="tp">
                    <img src="./img/you.png" alt="" />
                    <span class="xmzje">275.11</span>
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
                  <span class="yxwz">项目总金额(亿元)</span>
                </div>
              </div>
            </div>
            <div class="uls">
              <div>
                <img src="./img/发光圈圈.png" alt="" class="jz1">
              </div>
              <span class="jdt">完成率:12/66</span>
              <div style="height:30px;width: 200px;" class="echart" ref="echartBar"></div>
            </div>
          </div>
        </div>
      </div>
      <div >
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">卡点</span>
        </div>
        <div>
          <div class="kdjj">
            <div class="zsj">
              <div class="jianju">
                <div>
                  <span class="xbt">卡点预计完成情况</span>
<!--                  <img src="./img/装饰.png" alt="" class="zs" />-->
                </div>
                <div >
                  <div class="dw">
                    <span class="smalls">单位：个(累计)</span>
                  </div>
                  <div  style="height:160px;padding-right: 3%;" class="echart" ref="lineEchart"></div>
                  <div class="uls">
                    <div>
                      <img src="./img/发光圈圈.png" alt="" class="jz1">
                    </div>
                    <span class="jdt">完工率:1/40</span>
                    <div style="height:30px;width: 200px;" class="echart" ref="echartBar1"></div>
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

      </div>
      <img src="./img/装饰1.svg" class="zxp1">
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

        });
      },
      methods:{
        drawLine() {
          this.lineEchart = this.$echarts.init(this.$refs.lineEchart);
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
                fontSize: 11,
              },
              // selectedMode: false,
              data: ["1"],
            },
            color: ["#077768"],
            grid: {
              left: "10%",
              top: "8%",
              width: '80%',
            },
            tooltip : {
              trigger: 'axis',
              axisPointer: {
                // type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
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
                rotate: 45,
                interval: 0,
                color: "#fff",
                textStyle:{
                  fontSize:7
                }
              },
              data: ["","2020年第四季度", "2021年第一季度", "2021年第二季度", "2021年第三季度", "2021年第四季度", "2022年第一季度", "2022年第二季度", "2022年第三季度", "2022年第四季度"],
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
        },
        initBar(){
          this.echartBar1 = this.$echarts.init(this.$refs.echartBar1);
          this.echartBar1.setOption(
            {
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
            }
          );

          this.echartBar = this.$echarts.init(this.$refs.echartBar);
          this.echartBar.setOption(// 通过setOption来生成柱状图
            {
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
            }
          );
        },
      }
    }
</script>

<style lang="less" scoped>
  @import url("./rightSummary.less");
  .left {
    /*padding-top: 5%;*/
    margin-right: 25%;
    height: 100%;
    padding-left: 3%;

    /*flex-grow:0;*/
  }
  .right {
    flex-shrink: 0;
    // margin-top: 3%;
    height: 100%;
    /*padding-top: 5%;*/
    /*flex-grow:0;*/
  }
  .left1 {
    /*margin-top: 3%;*/
    /*margin-right: 20%;*/
    /*height: 100%;*/
    /*flex: 1;*/
    text-align:center;
    /*padding-left: 3%;*/
    /*flex-grow:0;*/
  }
  .left2 {
    /*margin-top: 3%;*/
    /*margin-right: 20%;*/
    /*height: 100%;*/
    /*flex: 1;*/
    text-align:right;
    /*padding-left: 3%;*/
    /*flex-grow:0;*/
  }
  .left3 {
    margin-top: 4%;
    margin-bottom: 4%;
    margin-right: 2%;
    /*margin-right: 20%;*/
    /*height: 100%;*/
    /*flex: 1;*/
    width: 100%;
    text-align:center;
    /*padding-left: 3%;*/
    /*flex-grow:0;*/
  }
  .zx{
    padding-left: 25px;
    height: 100px;
    /*width: 30px;*/
    padding-right: 10px;
  }
  .xwz{
    width: 90px;
    padding-top: 10px;
  }
  .zxp{
    padding-top: 5%;
    width: 35px;
    height: 35px;
  }
  .zxp1{
    /*padding-top: 5%;*/
    width: 20px;
    height: 20px;
    position: absolute;
    top:10;
    right: 0;
    /*align:"right";*/
    transform: rotate(-180deg);
  }
  .xwz1{
    width: 110px;
    padding-top: 10px;
  }
  .right1 {
    flex-shrink: 0;
    margin-top: 3%;
    height: 100%;
    flex: 1;
    text-align:left
    /*flex-grow:0;*/
  }
  .dw{
    padding-bottom:4%;
    padding-top: 5%;
  }
  .cellDiv {
    width: 350px;
    height: 40 px;
    display: table-cell;
  }
  .sejdx{
    color:#16EAEA;
    font-size: 14px;
    font-family: PingFang SC;
    /*padding-left: 3%;*/
  }
  .sejxx{
    font-size: 14px;
    font-family: PingFang SC;
    color:#00FFD4;
  }
  .sejnx{
    font-size: 14px;
    font-family: PingFang SC;
    color:#A2F6B6;
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
  .jz1{
    vertical-align:middle;
    /*flex: 1;*/
    width: 30px;
    height: 30px;
    /*width:50%;*/
  }
  .jz2{
    /*vertical-align:middle;*/
    /*flex: 1;*/
    width: 20px;
    height: 20px;
    /*padding-right: 5px;*/
    /*width:50%;*/
  }
  .jz{
    /*vertical-align:middle;*/
    text-align:center;
    width: 100%;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
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
    color: #FFFFFF;
  }
  .uls {
    width: 100%;
    // background: red;
    display: flex;
    // margin: auto;
    // margin-top: 100px;
    // padding: 0 10px;
    align-items: center;
    justify-content: center;
    /*flex-shrink:0;*/
  }
  .jdt{
    font-size: 6px;
    color: #FAFAFA;
    line-height: 8px;
    font-family: PingFang SC;
    align-self:center;
    width:86px;
    /*padding-right: 10px*/
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
    text-align:left;
    padding-left: 3%;
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
  .smalls{
    font-size: 8px;
    font-family: PingFang SC;
    line-height: 8px;
    color: #ffffff;
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
    padding-left: 4px;
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
    padding-bottom: 5%;
    /*overflow-y: auto;*/
    /*letter-spacing: 15px;*/
  }
  .zs {
    width: 50%;
  }
  .wenzi {
    padding-left: 3%;
  }
  .jianju {
    /*padding-top: 2%;*/
  }
  .kdjj {
    // padding-top: 7%;
    // padding-bottom: 7%;
    padding: 15px 0;
  }
  .box {
    display: flex;
    flex-direction: row;
    align-items:center;
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
  .ssj1 {
    /*padding-top: 1%;*/
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
