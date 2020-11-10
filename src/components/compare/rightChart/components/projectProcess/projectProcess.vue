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
                data: [20, 20, 20, 20, 20, 20, 20]
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
                data: [30, 30, 30, 30, 30, 30, 30]
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
                data: [34, 34, 34, 34, 34, 34, 34]
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
                data: [6, 6, 6, 6, 6, 6, 6]
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
                data: [10, 10, 10, 10, 10, 10, 10]
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
