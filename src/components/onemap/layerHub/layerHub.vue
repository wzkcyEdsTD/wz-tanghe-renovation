<template>
  <div class="layerhub-wrapper">
    <!-- <div class="sign-wrapper">
      <img src="/static/images/common/sign@2x.png">
    </div> -->
    <div class="left-content">
      <ul class="zrdw-list">
        <li class="zrdw-item" v-for="(item, index) in zrdwList" :key="index">
          {{ item }}
        </li>
      </ul>
      <div class="xm-container">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">项目</span>
        </div>
        <div class="xm-list">
          <div v-for="(item, index) in sourceMap['项目']" :key="index">
            <div class="xm-item">
              <div class="name">{{ index + 1 }}.{{ item.attributes.NAME }}</div>
              <div class="info-container">
                <div class="info-item">
                  <div class="key">建设状态</div>
                  <div class="value">{{ item.attributes.CURRENT_STATE }}</div>
                </div>
                <div class="split"></div>
                <div class="info-item">
                  <div class="key">投资计划</div>
                  <div class="value">{{ item.attributes.TOTALAMOUNT }}万元</div>
                </div>
                <div class="split"></div>
                <div class="info-item jcsj">
                  <div class="key">计划建成时间</div>
                  <div class="value">{{ item.attributes.CONSYEARE }}</div>
                </div>
              </div>
            </div>
            <div class="split-line"></div>
          </div>
        </div>
      </div>
      <div class="dd-container">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">断点</span>
        </div>
        <div class="dd-list">
          <div v-for="(item, index) in sourceMap['断点']" :key="index">
            <div class="dd-item">
              <img
                :src="`/static/images/断点/${
                  item.attributes.PHOTO.split(';')[0]
                }`"
              />
              <div class="info-container">
                <div class="name">
                  {{ index + 1 }}.{{ item.attributes.NAME }}
                </div>
                <div class="info-item">
                  <div class="key">计划贯穿时间</div>
                  <div class="value">{{ item.attributes.JHGTSJ }}</div>
                </div>
                <div class="info-item">
                  <div class="key">长度（米）</div>
                  <div class="value">{{ item.attributes.LENGTH }}</div>
                </div>
              </div>
            </div>
            <div class="split-line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="kdtj-container">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">卡点统计</span>
        </div>
        <div class="base-info">
          <div class="base-item">
            <img src="./images/kd-number.png" alt="" />
            <div class="title" style="color: #2fc8e9">总数</div>
            <div class="text">40<span class="unit">个</span></div>
          </div>
          <div class="base-item">
            <img src="./images/kd-length.png" alt="" />
            <div class="title" style="color: #ff8b4f">总长度</div>
            <div class="text">19352<span class="unit">米</span></div>
          </div>
        </div>
        <div class="kdfb-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">卡点分布</div>
            <div class="decorate"></div>
          </div>
          <div style="height: 150px" class="echart" ref="pieEchart"></div>
        </div>
        <div class="czwt-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">
              存在问题<span class="number">(21个)</span>
            </div>
            <div class="decorate"></div>
          </div>
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">断点位置</span>
                <span class="content">存在问题</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in sourceMap['断点']"
                :key="index"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="content">{{ item.attributes.CZWT }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="jh-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">计划贯通时间轴</div>
            <div class="decorate"></div>
          </div>
          <div class="gif-wrapper">
            <img src="./images/timegif.gif" alt="" />
          </div>
        </div>
      </div>
      <div class="xmtj-container">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">项目统计</span>
        </div>
        <div class="base-info">
          <div class="base-item">
            <img src="./images/xm-nuber.png" alt="" />
            <div class="title" style="color: #2fc8e9">总数</div>
            <div class="text">67<span class="unit">个</span></div>
          </div>
          <div class="base-item">
            <img src="./images/xm-count.png" alt="" />
            <div class="title" style="color: #ff8b4f">投资计划</div>
            <div class="text">275<span class="unit">亿元</span></div>
          </div>
        </div>
        <div class="jsqk-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">建设情况</div>
            <div class="decorate"></div>
          </div>
          <div style="height: 150px" class="echart" ref="barEchart"></div>
        </div>
        <div class="czwt-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">
              滞后项目<span class="number">(21个)</span>
            </div>
            <div class="decorate"></div>
          </div>
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">名称</span>
                <span class="content">建设状态</span>
                <span class="content">责任单位</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in sourceMap['项目']"
                :key="index"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="flex-2 content">{{
                  item.attributes.CURRENT_STATE
                }}</span>
                <span class="flex-2 content">{{
                  item.attributes.ZR_DEPTID
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="jd-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">建设进度</div>
            <div class="decorate"></div>
          </div>
          <div class="chart-wrapper">
            <div class="rate-item">
              <p>投资完成率</p>
              <div style="height: 50px" class="echart" ref="shangEchart"></div>
            </div>
            <div class="rate-item">
              <p>项目完成率</p>
              <div style="height: 50px" class="echart" ref="xiaEchart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "../../sourcelayer/layerHub/TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
export default {
  data() {
    return {
      zrdwList: [
        "指挥部",
        "鹿城区政府",
        "瓯海区政府",
        "龙湾区政府",
        "瑞安区政府",
        "温州城发集团",
        "温州现代集团",
        "浙南产业区",
      ],
      pieEchart: null,
      barEchart: null,
      shangEchart: null,
      xiaEchart: null,
      // sourceData: {
      //   zhb: {
      //     kdTotalNumber: 40,
      //     kdTotalLength: 19074,
      //     kdfb: {
      //       east: [12, 2792],
      //       south: [9, 7030],
      //       inner: [6, 1652],
      //       outer: [10, 5410],
      //       west: [3, 2190]
      //     },
      //     xmTotalNumber: 67,
      //     xmTotalamount: 275,
      //     jsqk: {
      //       qqyj: [2, 4],
      //       zj: [23, 26],
      //       wg: []
      //     }
      //   }
      // }
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
    drawData() {
      return this.$store.state.map.sourceMap;
    },
  },
  methods: {
    ...mapActions("map", ["setSourceMap"]),
    getPOIPickedFeature(node, fn) {
      const { newdataset, url } = node;
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: `SMID <= 1000`,
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: [newdataset],
      });
      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
          processCompleted: async (res) => {
            const fields = await getIserverFields(url, newdataset);
            console.log(119, fields);
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    drawPies() {
      this.pieEchart = this.$echarts.init(this.$refs.pieEchart);
      this.pieEchart.setOption({
        series: [
          {
            name: "",
            type: "pie",
            selectedMode: "single",
            radius: ["20%", "25%"],
            label: {
              position: "inner",
            },

            data: [
              {
                value: 335,
                name: "",
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0.5,
                    0,
                    0.5,
                    1,
                    [
                      { offset: 0, color: "#2374F5" },
                      { offset: 0.5, color: "#7BBDFF" },
                      { offset: 1, color: "#064E96" },
                    ]
                  ),
                },
              },
            ],
          },
          {
            name: "",
            type: "pie",
            radius: ["25%", "90%"],
            label: {
              position: "inner",
              formatter: " {b}：{c}个 ",
              textStyle: {
                color: "#040C32",
              },
            },

            data: [
              { value: 12, name: "东线", itemStyle: { color: "#52D1FE" } },
              { value: 2, name: "西环", itemStyle: { color: "#FF9E72" } },
              { value: 10, name: "南线", itemStyle: { color: "#047DF6" } },
              { value: 6, name: "外环", itemStyle: { color: "#8FEF8B" } },
              { value: 10, name: "内环", itemStyle: { color: "#6852FE" } },
            ],
          },
          {
            name: "",
            type: "pie",
            radius: ["25%", "90%"],
            label: {
              formatter: " {b}",
              textStyle: {
                color: "#FFFFFF",
              },
            },
            labelLine: {
              show: true,
              normal: {
                length: 5, // 改变标示线的长度
                lineStyle: {
                  color: "#A4EEFF", // 改变标示线的颜色
                },
              },
            },
            data: [
              { value: 12, name: "2800米", itemStyle: { color: "#52D1FE" } },
              { value: 2, name: "1652米", itemStyle: { color: "#FF9E72" } },
              { value: 10, name: "8330米", itemStyle: { color: "#047DF6" } },
              { value: 6, name: "5410米", itemStyle: { color: "#8FEF8B" } },
              { value: 10, name: "1652米", itemStyle: { color: "#6852FE" } },
            ],
          },
        ],
      });
    },
    drawBars() {
      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        grid: {
          left: 100,
          top: 10,
          bottom: 15,
        },
        xAxis: {
          type: "value",
          splitLine: {
            //网格线
            show: false,
          },
          max: 50,
          axisTick: {
            //x轴刻度线
            show: false,
          },
          axisLine: {
            //坐标轴线
            lineStyle: {
              color: "#ffffff",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 9,
              color: "#ffffff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["完工项目", "在建项目", "前期研究项目"],
          // nameLocation: 'middle',
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 10,
              color: "#ffffff",
            },
            formatter: function (name) {
              return name === "在建项目"
                ? name + " {b|(滞后)}"
                : name === "完工项目"
                ? "完工项目 "
                : name + " {a|(滞后)}";
            },
            rich: {
              a: {
                color: "#FF21D4",
                fontSize: 10,
              },
              b: {
                color: "#FF0059",
                fontSize: 10,
              },
            },
          },
          axisTick: {
            //x轴刻度线
            show: false,
          },
        },
        series: [
          {
            name: "第一部分",
            type: "bar",
            stack: "总量",
            barWidth: 25, //柱图宽度
            // barWidth : 40,
            label: {
              show: true,
              formatter: "{c}个",
              textStyle: {
                fontSize: 12,
                color: "#fff",
                fontFamily: "PingFang SC",
              },
            },
            data: [
              { value: "", itemStyle: { color: "#00FF84" } },
              { value: 20, itemStyle: { color: "#FF0059" } },
              {
                value: 2,
                itemStyle: { color: "#FF21D4" },
              },
            ],
          },
          {
            name: "第二部分",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              formatter: "{c}个",
              position: "right",
              textStyle: {
                fontSize: 12,
                color: "#fff",
                fontFamily: "PingFang SC",
              },
            },
            data: [
              { value: 7, itemStyle: { color: "#00FF84" } },
              { value: 20, itemStyle: { color: "#FF765D" } },
              {
                value: 18,
                itemStyle: { color: "#4DAEF8" },
              },
            ],
          },
        ],
      });
    },
    drawXiaLines() {
      this.xiaEchart = this.$echarts.init(this.$refs.xiaEchart);
      this.xiaEchart.setOption({
        grid: {
          right: 100,
        },
        yAxis: {
          data: [""],
          axisTick: {
            //x轴刻度线
            show: false,
          },
          splitLine: {
            //网格线
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            //坐标轴线
            show: false,
          },
        },
        xAxis: {
          max: 50,
          min: 0,
          axisLabel: {
            show: false,
          },
          axisLine: {
            //坐标轴线
            show: false,
          },
          axisLable: {
            //坐标轴线
            show: false,
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
        series: [
          {
            name: "已完成",
            type: "bar",
            stack: "完成情况",
            data: [16.5],
            barWidth: 30, //柱图宽度
            itemStyle: {
              color: "#CE4142",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
            label: {
              formatter: "{a|33%}",
              show: true,
              textStyle: {
                rich: {
                  a: {
                    fontSize: "16",
                    fontFamily: "PingFang SC",
                    color: "#ffffff",
                  },
                },
              },
            },
          },
          {
            name: "渐变",
            type: "bar",
            stack: "完成情况",
            data: [1],
            // barGap: '-100%',
            itemStyle: {
              color: "#FF2729",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
          },
          {
            name: "未完成",
            type: "bar",
            stack: "完成情况",
            data: [32.5],
            label: {
              formatter: "{a|67个}",
              show: true,
              position: "right",
              textStyle: {
                rich: {
                  a: {
                    fontSize: "16",
                    fontFamily: "PingFang SC",
                    color: "#ffffff",
                  },
                },
              },
            },
            itemStyle: {
              color: "#361B23",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
          },
        ],
      });
    },
    drawShangLines() {
      this.shangEchart = this.$echarts.init(this.$refs.shangEchart);
      this.shangEchart.setOption({
        grid: {
          right: 100,
          // containLabel: false,
        },
        textStyle: {
          color: "#FAFAFA",
          fontSize: 13,
          fontFamily: "PingFang SC",
        },
        yAxis: {
          data: [""],
          axisTick: {
            //x轴刻度线
            show: false,
          },
          splitLine: {
            //网格线
            show: false,
          },
          axisLine: {
            //坐标轴线
            show: false,
          },
        },
        xAxis: {
          max: 50,
          min: 0,
          axisLine: {
            //坐标轴线
            show: false,
          },
          splitLine: {
            //网格线
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            //x轴刻度线
            show: false,
          },
        },
        series: [
          {
            name: "已完成",
            type: "bar",
            stack: "完成情况",
            data: [30],
            barWidth: 30, //柱图宽度
            itemStyle: {
              color: "#1A56E2",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
            label: {
              formatter: "{a|60%}",
              show: true,
              textStyle: {
                rich: {
                  a: {
                    fontSize: "16",
                    fontFamily: "PingFang SC",
                  },
                },
              },
            },
          },
          {
            name: "渐变",
            type: "bar",
            stack: "完成情况",
            data: [1],
            // barGap: '-100%',
            itemStyle: {
              color: "#729CFF",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
          },
          {
            name: "未完成",
            type: "bar",
            stack: "完成情况",
            data: [28],
            label: {
              formatter: "{a|275亿元}",
              show: true,
              position: "right",
              textStyle: {
                rich: {
                  a: {
                    fontSize: "16",
                    fontFamily: "PingFang SC",
                  },
                },
              },
            },
            itemStyle: {
              color: "#122F76",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
          },
        ],
      });
    },
  },
  mounted() {
    const SERVER_HOST = "http://172.168.3.183:8090/iserver/services";
    const SW_DATA = "/data-alldata/rest/data";
    const SW_DATA_NAME = "172.168.3.181_thxm:";
    const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
    this.getPOIPickedFeature({
      id: "项目",
      label: "项目",
      url: SERVER_DEFAULT_DATA,
      newdataset: `${SW_DATA_NAME}项目`,
      icon: false,
    });
    this.getPOIPickedFeature({
      id: "断点",
      label: "断点",
      url: SERVER_DEFAULT_DATA,
      newdataset: `${SW_DATA_NAME}绿道断点`,
      icon: "断点",
      iconSize: "small",
    });
    this.drawPies();
    this.drawBars();
    this.drawShangLines();
    this.drawXiaLines();
  },
  // watch: {
  //   drawData(val) {
  //     console.log("drawData", val);
  //   },
  // },
};
</script>

<style lang="less" scoped>
@import url("./layerHub.less");
</style>