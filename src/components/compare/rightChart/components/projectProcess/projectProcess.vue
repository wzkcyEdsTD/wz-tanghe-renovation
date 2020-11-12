<template>
  <div class="projectProcess">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">项目全过程分析占比</span>
    </div>
    <div style="height: 32vh; width: 100%;padding-top: 2vh;" ref="barEchart"></div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          barEchart: null,
        };
      },
      methods:{
        drawBars() {
          const that = this;
          this.barEchart = this.$echarts.init(this.$refs.barEchart);
          this.barEchart.setOption({
            legend: {
              data: ['前期研究', '前期滞后', '正在建设', '在建滞后', '完工建设'],
              textStyle: {
                color: "#fff",
              },
              // itemWidth: 14,
              // itemHeight: 14,
              // padding:[0,30],
            },
            grid: {
              left:0,
              right:0,
              bottom: '3%',
              containLabel: true
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                color:"#fff"
              },
              axisLine:{
                lineStyle:{
                  type:'dashed',
                  color:"#fff"
                },
              },
              splitLine: {
                //网格线
                show: false,
              },
              axisTick: {
                //x轴刻度线
                show: false,
              },
            },
            xAxis: {
              type: 'category',
              data: ['鹿城区政府', '瓯海区政府', '龙湾区政府', '瑞安市政府', '浙南产业区', '市现代集团', '市城发集团'],
              axisLabel: {
                rotate: 40,
                color:"#fff"
              },
              axisTick: {
                //x轴刻度线
                show: false,
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:"#fff"
                },
              },
            },
            series: [
              {
                name: '前期研究',
                type: 'bar',
                stack: '总量',
                color:'#A2F6B6',
                label: {
                  show: true,
                  formatter: "{c}%",
                },
                data: [18.18, 0, 0, 0, 0, 0, 0.69]
              },
              {
                name: '前期滞后',
                type: 'bar',
                stack: '总量',
                color:'#16E8E8',
                label: {
                  show: true,
                  formatter: "{c}%",
                },
                data: [9.09, 0, 0, 0, 0, 0, 0]
              },
              {
                name: '正在建设',
                type: 'bar',
                stack: '总量',
                color:'#52D1FE',
                label: {
                  show: true,
                  formatter: "{c}%",
                },
                data: [31.82, 56.52, 70, 81.82, 100, 71.43, 6.25]
              },
              {
                name: '在建滞后',
                type: 'bar',
                stack: '总量',
                color:'#5286FE',
                label: {
                  show: true,
                  formatter: "{c}%",
                },
                data: [27.27, 26.09, 20, 18.18, 0, 0, 0.69]
              },
              {
                name: '完工建设',
                type: 'bar',
                stack: '总量',
                color:'#6852FE',
                label: {
                  show: true,
                  formatter: "{c}%",
                },
                data: [13.64, 17.39, 10, 0, 10, 28.57, 0.69]
              }
            ]
          });
          window.addEventListener("resize",function () {
            that.barEchart.resize();
          });
        },
      },
      mounted() {
        this.drawBars();
      }
    }
</script>

<style lang="less" scoped>
  @import url("./projectProcess.less");
</style>
