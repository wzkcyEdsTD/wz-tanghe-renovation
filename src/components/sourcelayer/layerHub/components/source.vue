<template>
  <div class="projectSummary">
    <div class="composition-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">资源区县</span>
        <!-- <span class="desc">截至2020年5月15日</span> -->
      </div>
      <div style="height:16vh;" class="echart" ref="pieEchart"></div>
    </div>
    <div class="composition-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">资源街道</span>
        <!-- <span class="desc">截至2020年5月15日</span> -->
      </div>
      <span class="small">单位：个</span>
      <div  style="height:18vh;" class="echart" ref="barEchart"></div>
    </div>
    <div class="search-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">资源列表</span>
        <!-- <span class="desc">截至2020年5月15日</span> -->
      </div>
      <div class="search-header">
        <el-input
          v-model="searchText"
          class="searchFilterInput"
          placeholder="请输入想要搜索的关键字"
          size="small"
          @keyup.enter.native="searchFilter"
        />
        <div class="button-container">
          <div class="button-item">
            <i class="icon-common icon-clear" @click="searchClear"></i>
          </div>
          <div class="button-item">
            <i class="icon-common icon-search" @click="searchFilter"></i>
          </div>
        </div>
      </div>
      <div class="result-wrapper">
        <ul class="result-list">
          <li class="result-item header">
            <span class="index">序号</span>
            <span class="name">名称</span>
            <!-- <span class="speed">进度</span> -->
          </li>
          <li class="result-item" v-for="(item,index) in searchList" :key="index" @click="itemClick(item)">
            <span class="index">{{index+1}}</span>
            <span class="name" :title="item.attributes.NAME">{{item.attributes.NAME}}</span>
            <!-- <span class="speed">{{item.attributes.REMARK}}</span> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showLarge:window.showLarge,
      searchText: "",
      searchList: [],
      pieEchart: null, // 饼状图
      barEchart: null, // 树状图
      lineEchart: null, // 折线图
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap", "currentSource"]),
    drawScouce() {
      return this.$store.state.map.currentSource
    }
  },
  mounted() {
    // console.log('mounted???', this.currentSource)
  },
  created() {
  },
  watch:{
    'drawScouce'(val) {
      this.drawPie()
      this.drawBar()
      this.searchFilter()
    }
  },
  methods: {
    drawPie() {
      // let e = this.screeHeight;
      // e = (e/1000*12);
      let e = this.getFontSize();
      let data = {}
      let legendData = []
      let resultList = []
      let colorList = ["#52D1FE", "#047DF6", "#8FEF8B", "#6852FE"]
      let list = this.sourceMap[this.currentSource]
      // console.log('drawPie', this.currentSource, this.sourceMap, list)
      list.forEach((item, index) => {
        let district = item.attributes.DISTRICT
        if(data[district]) {
          data[district].number++
        } else {
          data[district] = {
            name: district,
            number: 1,
            itemStyle: {color: colorList[index]}
          }
        }
      })
      for (let key in data) {
        legendData.push(key)
        resultList.push({
          ...data[key],
          value: (data[key].number/list.length*100).toFixed(2),
        })
      }
      const that = this;
      this.pieEchart = this.$echarts.init(this.$refs.pieEchart);
      this.pieEchart.setOption({
        legend: {
          orient: "horizontal",
          top: "25%",
          left: "34%",
          icon: "rect",
          itemWidth: 14,
          itemHeight: 14,
          textStyle: {
            color: "#fff",
            fontSize: e
          },
          data: legendData,
          formatter: function (name) {
            let target;
            for (let i = 0; i < resultList.length; i++) {
              if (resultList[i].name === name) {
                target = resultList[i].value;
              }
            }
            return name + target + "%";
          },
        },
        series: [
          {
            name: "项目构成",
            type: "pie",
            center: ["17%", "45%"],
            radius: ["60%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data: resultList,
            hoverAnimation: false,
          },
        ],
      });
      window.addEventListener("resize",function () {
        that.pieEchart.resize();
      });
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
    drawBar() {
      let list = this.sourceMap[this.currentSource]
      let tempobj = {}
      let dataAxis = []
      var data = []
      let e = this.getFontSize();
      list.forEach((item, index) => {
        let street = item.attributes.STREET
        if(tempobj[street]) {
          tempobj[street]++
        } else {
          tempobj[street] = 1
        }
      })
      for (let key in tempobj) {
        dataAxis.push(key)
        data.push(tempobj[key])
      }
      const that = this;
      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        grid: {
          left: "0%",
          top: "8%",
          bottom:'20%',
          // bottom: "8%",
          width: "100%",
          height: "80%",
          containLabel: true,
        },
        xAxis: {
          data: dataAxis,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
            color: "#fff",
            textStyle:{
              fontSize: e,
            }
          },
        },
        yAxis: {
          axisLine: {
            show: false,
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
        dataZoom : [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 30,
            width: "95%",
            height: "10%",
            right:'1%',
            left:'1%',
            bottom:0,
            xAxisIndex: [0],
          },
        ],
        series: [
          {
            name: "分布",
            type: "bar",
            barWidth: "11",
            data: data,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#16EAEA" },
                  { offset: 1, color: "rgba(19,94,115,0)" },
                ]),
              },
            },
          },
        ],
      });
      window.addEventListener("resize",function () {
        that.barEchart.resize();
      });
    },
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
            fontSize: e
          },
          // selectedMode: false,
          data: ["公益性项目", "基础类项目", "产业发展项目"],
        },
        color: ["#FC5453", "#FEEC00", "#16EAEA"],
        grid: {
          left: "10%",
          top: "8%",
          width: '85%',
        },
        xAxis: {
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#fff",
            textStyle:{
              fontSize: e
            }
          },
          data: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        },
        yAxis: {
          splitNumber: 3,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: e
            },
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "公益性项目",
            type: "line",
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#770F0F" },
                  { offset: 1, color: "rgba(252,84,83,0)" }
                ])
              }
            },
            // symbol: 'none',
            data: [720, 132, 101, 134, 90, 230, 210, 542],
          },
          {
            name: "基础类项目",
            type: "line",
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FEEC00" },
                  { offset: 1, color: "rgba(255,255,255,0)" }
                ])
              }
            },
            // symbol: 'none',
            data: [620, 182, 191, 234, 290, 330, 310, 678],
          },
          {
            name: "产业发展项目",
            type: "line",
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#0A6589" },
                  { offset: 1, color: "rgba(0,255,235,0)" }
                ])
              }
            },
            // symbol: 'none',
            data: [550, 232, 201, 154, 190, 330, 410, 721],
          }
        ],
      });
    },
    searchClear() {
      this.searchText = "";
      this.searchList = [];
      this.searchFilter();
    },
    searchFilter() {
      // console.log('searchFilter111', this.sourceMap)
      // console.log('searchFilter222', this.currentSource)
      let allSearchList = this.sourceMap[this.currentSource]
      allSearchList = allSearchList.filter(item => {
        return item.attributes.NAME.length
      })
      this.searchList = this.searchText
        ? allSearchList.filter((item) => {
            return item.attributes.NAME.indexOf(this.searchText) >= 0;
          })
        : allSearchList;
    },
    itemClick(item) {
      const { x, y } = item.geometry;

      // 定位图标，详情变换
      this.$parent.$parent.addLocationIcon(item.geometry, item.id);
      this.$parent.$parent.$refs.projectDetailPopup.getForceEntity(item);
      this.$parent.$parent.$refs.commonDetailPopup.closePopup();  

      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, 450),
        orientation: {
          heading: 0.01768860454315663,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        maximumHeight: 450,
        complete: () => {
          this.$bus.$emit('clickFly');
        }
      }); 
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./source.less");
</style>
<style lang="less">
.searchFilterInput {
  width: 31vh;
  .el-input__inner {
    background: none;
    border    : none;
    color     : white;
  }
}
</style>
