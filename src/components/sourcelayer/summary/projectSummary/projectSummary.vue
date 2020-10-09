<template>
  <div class="projectSummary">
    <div class="composition-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">资源区县</span>
        <!-- <span class="desc">截至2020年5月15日</span> -->
      </div>
      <div style="height:180px;" class="echart" ref="pieEchart"></div>
    </div>
    <div class="composition-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">资源街道</span>
        <!-- <span class="desc">截至2020年5月15日</span> -->
      </div>
      <span class="small">单位：个</span>
      <div  style="height:180px;" class="echart" ref="barEchart"></div>
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
          <li class="result-item" v-for="(item,index) in searchList" :key="index">
            <span class="index">{{index+1}}</span>
            <span class="name" :title="item.attributes.NAME">{{item.attributes.NAME}}</span>
            <!-- <span class="speed">{{item.attributes.REMARK}}</span> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="composition-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">项目趋势</span>
        <span class="desc">2015-2022年</span>
      </div>
      <span class="small">单位：个</span>
      <div style="height:160px;" class="echart" ref="lineEchart"></div>
    </div> -->
    <!-- <div class="mask-right"></div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchText: "",
      searchList: [],
      // currentSource: '断点',
      pieEchart: null, // 饼状图
      barEchart: null, // 树状图
      lineEchart: null, // 折线图
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap", "currentSource"]),
    drawData() {
      return this.$store.state.map.sourceMap
    }
  },
  mounted() {
    console.log('mounted???')
    this.eventRegsiter()
    this.drawPie()
    this.drawBar()
    this.searchFilter()
  },
  watch:{
    'drawData'(val) {
      this.drawPie()
      this.drawBar()
      this.searchFilter()
    }
  },
  methods: {
    eventRegsiter() {
      this.$bus.$off("source-change");
      this.$bus.$on("source-change", ({value}) => {
        // this.currentSource = value
        this.searchFilter()
        this.drawPie()
        this.drawBar()
      });
    },
    drawPie() {
      let data = {}
      let legendData = []
      let resultList = []
      let colorList = ["#52D1FE", "#047DF6", "#8FEF8B", "#6852FE"]
      let list = this.sourceMap[this.currentSource]
      console.log('drawPie', this.currentSource, this.sourceMap, list)
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

      this.pieEchart = this.$echarts.init(this.$refs.pieEchart);
      this.pieEchart.setOption({
        legend: {
          orient: "horizontal",
          top: "25%",
          left: "34%",
          icon: "rect",
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#fff",
            fontSize: 11,
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
            center: ["17%", "40%"],
            radius: ["40%", "55%"],
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
    },
    drawBar() {
      let list = this.sourceMap[this.currentSource]
      let tempobj = {}
      let dataAxis = []
      var data = []

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

      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        grid: {
          left: "0%",
          top: "8%",
          width: "100%",
          height: "75%",
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
            },
          },
          splitLine: {
            show: false,
          },
        },
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
            fontSize: 11,
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
      let allSearchList = this.sourceMap[this.currentSource]
      this.searchList = this.searchText
        ? allSearchList.filter((item) => {
            return item.attributes.NAME.indexOf(this.searchText) >= 0;
          })
        : allSearchList;
    },
  },
};
</script>

<style lang="less">
@import url("./projectSummary.less");
</style>