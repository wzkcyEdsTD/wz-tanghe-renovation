<template>
  <div class="projectSummary">
    <div class="search-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">项目进程</span>
        <span class="desc">截至2020年5月15日</span>
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
            <span class="speed">进度</span>
          </li>
          <li class="result-item" v-for="(item,index) in projectList" :key="index">
            <span class="index">{{index}}</span>
            <span class="name" :title="item.attributes.NAME">{{item.attributes.NAME}}</span>
            <span class="speed">{{item.attributes.REMARK}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="composition-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">项目构成</span>
        <span class="desc">截至2020年5月15日</span>
      </div>
      <div style="height:180px;" class="echart" ref="pieEchart"></div>
    </div>
    <div class="composition-container">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">项目分布</span>
        <span class="desc">截至2020年5月15日</span>
      </div>
      <span class="small">单位：个</span>
      <div  style="height:180px;" class="echart" ref="barEchart"></div>
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
      pieEchart: null, // 饼状图
      barEchart: null, // 树状图
      lineEchart: null, // 折线图
    };
  },
  computed: {
    ...mapGetters("map", ["projectList"]),
  },
  mounted() {
    this.drawPie();
    this.drawBar();
    // this.drawLine();
  },
  // watch:{
  //   '$store.state.projectList':function(newFlag, oldFlag){
  //     // 需要执行的代码
  //   }
  // },
  methods: {
    drawPie() {
      const pieData = [
        { value: 2.3, name: "卫生项目", itemStyle: { color: "#FB0062" } },
        { value: 3.3, name: "教育项目", itemStyle: { color: "#0B11FF" } },
        { value: 4.2, name: "农林水电项目", itemStyle: { color: "#1DA358" } },
        { value: 5.2, name: "园林绿化项目", itemStyle: { color: "#D8FF00" } },
        { value: 7.3, name: "环境保护项目", itemStyle: { color: "#2BCFFF" } },
        { value: 8.3, name: "公共服务项目", itemStyle: { color: "#D810FF" } },
        { value: 11.3, name: "产业类项目", itemStyle: { color: "#782FED" } },
        {
          value: 22.9,
          name: "保障性安居工程项目",
          itemStyle: { color: "#FEEC00" },
        },
        {
          value: 12.3,
          name: "公园、滨水绿道及景观绿化项目",
          itemStyle: { color: "#34FF84" },
        },
        {
          value: 42.3,
          name: "市政道路及配套设施",
          itemStyle: { color: "#ED8E2F" },
        },
      ];
      this.pieEchart = this.$echarts.init(this.$refs.pieEchart);
      this.pieEchart.setOption({
        legend: {
          orient: "horizontal",
          top: "5%",
          left: "34%",
          icon: "rect",
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#fff",
            fontSize: 11,
          },
          data: [
            "卫生项目",
            "教育项目",
            "农林水电项目",
            "园林绿化项目",
            "环境保护项目",
            "公共服务项目",
            "产业类项目",
            "保障性安居工程项目",
            "公园、滨水绿道及景观绿化项目",
            "市政道路及配套设施",
          ],
          formatter: function (name) {
            let target;
            for (let i = 0; i < pieData.length; i++) {
              if (pieData[i].name === name) {
                target = pieData[i].value;
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
            data: pieData,
            hoverAnimation: false,
          },
        ],
      });
    },
    drawBar() {
      var dataAxis = [
        "南郊街道",
        "广化街道",
        "南汇街道",
        "松台街道",
        "滨江街道",
        "蒲鞋市街道",
        "大南街道",
        "永中街道",
        "海滨街道",
        "南白象街道",
        "梧田街道",
        "新桥街道",
        "景山街道",
      ];
      var data = [20, 82, 91, 34, 90, 30, 10, 23, 42, 21, 90, 49, 10];
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
    searchClear() {},
    searchFilter() {},
  },
};
</script>

<style lang="less">
@import url("./projectSummary.less");
</style>