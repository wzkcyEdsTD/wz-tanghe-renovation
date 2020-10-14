<template>
  <div class="layerhub-wrapper">
    <!-- <div class="sign-wrapper">
      <img src="/static/images/common/sign@2x.png">
    </div> -->
    <div class="switch-menu-wrapper">
      <div class="switch-menu-container">
        <span :class="{active: currentType=='xm'}" @click="currentType='xm'">项目</span>
        <span :class="{active: currentType=='dd'}" @click="currentType='dd'">断点</span>
      </div>
      <div class="switch-menu-decorate"></div>
    </div>
    <div class="left-content">
      <ul class="zrdw-list">
        <li class="zrdw-item" :class="{active: currentZrdw==item}" v-for="(item, index) in zrdwList" :key="index" @click="getData(item)">
          {{ item }}
        </li>
      </ul>
      <div class="xm-container" v-show="currentType=='xm'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">项目</span>
        </div>
        <div class="xm-list">
          <div v-for="(item, index) in currentXmList" :key="index">
            <div class="xm-item" @click="itemClick(item)">
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
        <div class="no-tip" v-show="currentXmList && !currentXmList.length">暂无数据</div>
      </div>
      <div class="dd-container" v-show="currentType=='dd'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">断点</span>
        </div>
        <div class="dd-list">
          <div v-for="(item, index) in currentDdList" :key="index">
            <div class="dd-item" @click="itemClick(item)">
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
        <div class="no-tip" v-show="currentDdList && !currentDdList.length">暂无数据</div>
      </div>
    </div>
    <div class="right-content">
      <div class="kdtj-container" v-show="currentType=='dd'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">断点统计</span>
        </div>
        <div class="base-info">
          <div class="base-item">
            <img src="./images/kd-number.png" alt="" />
            <div class="title" style="color: #2fc8e9">总数</div>
            <div class="text" v-if="ret.pointStat.sum">{{ret.pointStat.sum}}<span class="unit">个</span></div>
            <div class="text" v-if="!ret.pointStat.sum">0<span class="unit">个</span></div>
          </div>
          <div class="base-item">
            <img src="./images/kd-length.png" alt="" />
            <div class="title" style="color: #ff8b4f">总长度</div>
            <div class="text" v-if="ret.pointStat.length">{{ret.pointStat.length}}<span class="unit">米</span></div>
            <div class="text" v-if="!ret.pointStat.length">0<span class="unit">米</span></div>
          </div>
        </div>
        <div class="kdfb-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">卡点分布</div>
            <div class="decorate"></div>
          </div>
          <div style="width: 300px;height: 150px" class="echart" ref="pieEchart"></div>
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
                v-for="(item, index) in questionDdList"
                :key="index"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="content" :title="item.attributes.CZWT">{{ item.attributes.CZWT }}</span>
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
      <div class="xmtj-container" v-show="currentType=='xm'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">项目统计</span>
        </div>
        <div class="base-info">
          <div class="base-item">
            <img src="./images/xm-nuber.png" alt="" />
            <div class="title" style="color: #2fc8e9">总数</div>
            <div class="text">{{ret.project.sum}}<span class="unit">个</span></div>
          </div>
          <div class="base-item">
            <img src="./images/xm-count.png" alt="" />
            <div class="title" style="color: #ff8b4f">投资计划</div>
            <div class="text">{{ret.project.plan}}<span class="unit">亿元</span></div>
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
                v-for="(item, index) in delayXmList"
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
      currentType: 'xm',
      zrdwList: [
        "指挥部",
        "鹿城区政府",
        "瓯海区政府",
        "龙湾区政府",
        "瑞安市政府",
        "温州城发集团",
        "温州现代集团",
        "浙南产业区",
      ],
      currentZrdw: '指挥部',
      list:[
            {   "name":"指挥部",
                "project":{"sum":"67","plan":"275"},
                "situation":{"pre":"4","preLag":"2","finish":"12","build":"26","buildLag":"23"},
                "speed":{"Completion":"2","finish":"18"},
                "pointStat":{"sum":"40","length":"19074"},
                "pointDist":{"east":{"number":"12","length":"2792"},"south":{"number":"9","length":"7030"},"inner":{"number":"6","length":"1652"},"outer":{"number":"10","length":"5410"},"west":{"number":"3","length":"2190"},}
            },
            {   "name":"鹿城区政府",
                "project":{"sum":"18","plan":"50.5"},
                "situation":{"pre":"4","preLag":"2","finish":"3","build":"3","buildLag":"6"},
                "speed":{"Completion":"1.3","finish":"16.7"},
                "pointStat":{"sum":"21","length":"8752"},
                "pointDist":{"east":{"number":"4","length":"1380"},"south":{"number":"","length":""},"inner":{"number":"6","length":"1652"},"outer":{"number":"10","length":"5410"},"west":{"number":"1","length":"310"},}
            },
            {   "name":"瓯海区政府",
                "project":{"sum":"17","plan":"109"},
                "situation":{"pre":"0","preLag":"0","finish":"4","build":"7","buildLag":"6"},
                "speed":{"Completion":"1.5","finish":"23.5"},
                "pointStat":{"sum":"11","length":"8910"},
                "pointDist":{"east":{"number":"","length":""},"south":{"number":"9","length":"7030"},"inner":{"number":"","length":""},"outer":{"number":"","length":""},"west":{"number":"2","length":"1880"},}
            },
            {   "name":"龙湾区政府",
                "project":{"sum":"8","plan":"45"},
                "situation":{"pre":"0","preLag":"0","finish":"2","build":"4","buildLag":"2"},
                "speed":{"Completion":"2.2","finish":"25"},
                "pointStat":{"sum":"8","length":"1412"},
                "pointDist":{"east":{"number":"8","length":"1412"},"south":{"number":"","length":""},"inner":{"number":"","length":""},"outer":{"number":"","length":""},"west":{"number":"","length":""},}
            },
            {   "name":"瑞安市政府",
                "project":{"sum":"7","plan":"18.4"},
                "situation":{"pre":"0","preLag":"0","finish":"0","build":"5","buildLag":"2"},
                "speed":{"Completion":"0","finish":"0"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            {   "name":"温州现代集团",
                "project":{"sum":"4","plan":"6"},
                "situation":{"pre":"0","preLag":"0","finish":"2","build":"2","buildLag":"0"},
                "speed":{"Completion":"32.4","finish":"50"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            {   "name":"温州城发集团",
                "project":{"sum":"12","plan":"3.5"},
                "situation":{"pre":"0","preLag":"0","finish":"1","build":"4","buildLag":"7"},
                "speed":{"Completion":"0.03","finish":"8.3"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            {   "name":"浙南产业区",
                "project":{"sum":"1","plan":"11.5"},
                "situation":{"pre":"0","preLag":"0","finish":"0","build":"1","buildLag":"0"},
                "speed":{"Completion":"0","finish":"0"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            // {   "name":"浙南产业区",
            //     "项目统计":{"总数":"1","投资计划":"11.5"},
            //     "建设情况":{"前期研究":"0","前期(滞后)":"0","完工":"0","在建":"1","在建(滞后)":"0"},
            //     "建设进度":{"投资完成率":"0","项目完工率":"0"},
            //     "卡点统计":{"总数":"","长度":""},
            //     "卡点分布":{"东线":{"个数":"","长度":""},"南线":{"个数":"","长度":""},"内环":{"个数":"","长度":""},"外环":{"个数":"","长度":""},"西线":{"个数":"","长度":""},}
            // }
            ],
      ret:  {   "name":"指挥部",
                "project":{"sum":"67","plan":"275"},
                "situation":{"pre":"4","preLag":"2","finish":"12","build":"26","buildLag":"23"},
                "speed":{"Completion":"2","finish":"18"},
                "pointStat":{"sum":"40","length":"19074"},
                "pointDist":{"east":{"number":"12","length":"2792"},"south":{"number":"9","length":"7030"},"inner":{"number":"6","length":"1652"},"outer":{"number":"10","length":"5410"},"west":{"number":"3","length":"2190"},}
            },
      pieEchart: null,
      barEchart: null,
      shangEchart: null,
      xiaEchart: null,
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
    drawData() {
      return this.$store.state.map.sourceMap;
    },
    currentXmList() {
      let result
      let alldata = this.sourceMap['项目']
      if (this.currentZrdw != '指挥部') {
        result = alldata.filter(item => {
          return item.attributes.ZR_DEPTID == this.currentZrdw
        })
      } else {
        result = alldata
      }
      return result
    },
    currentDdList() {
      let result = []
      let alldata = this.sourceMap['断点']
      if (this.currentZrdw != '指挥部') {
        result = alldata.filter(item => {
          return item.attributes.ZRDW == this.currentZrdw
        })
      } else {
        result = alldata
      }
      return result
    },
    delayXmList() {
      let result
      let alldata = this.sourceMap['项目']
      if (alldata) {
        if (this.currentZrdw != '指挥部') {
          result = alldata.filter(item => {
            return item.attributes.ZR_DEPTID == this.currentZrdw && ~item.attributes.CURRENT_STATE.indexOf('滞后')
          })
        } else {
          result = alldata.filter(item => {
            return ~item.attributes.CURRENT_STATE.indexOf('滞后')
          })
        }
        return result
      }
    },
    questionDdList() {
      let result
      let alldata = this.sourceMap['断点']
      if (alldata) {
        if (this.currentZrdw != '指挥部') {
          result = alldata.filter(item => {
            return item.attributes.ZRDW == this.currentZrdw && item.attributes.CZWT != '无'
          })
        } else {
          result = alldata.filter(item => {
            return item.attributes.CZWT != '无'
          })
        }
        return result
      }
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
      let data1=[],data2=[],lab;
      if(!!this.$data.ret){
        data1.push(parseFloat(this.$data.ret.pointDist.east.number));//东线个数
        data2.push(parseFloat(this.$data.ret.pointDist.east.length));//东线长度
        data1.push(parseFloat(this.$data.ret.pointDist.south.number));//南线个数
        data2.push(parseFloat(this.$data.ret.pointDist.south.length));//南线长度
        data1.push(parseFloat(this.$data.ret.pointDist.west.number));//西线个数
        data2.push(parseFloat(this.$data.ret.pointDist.west.length));//西线长度
        data1.push(parseFloat(this.$data.ret.pointDist.outer.number));//外环个数
        data2.push(parseFloat(this.$data.ret.pointDist.outer.length));//外环长度
        data1.push(parseFloat(this.$data.ret.pointDist.inner.number));//内环个数
        data2.push(parseFloat(this.$data.ret.pointDist.inner.length));//内环长度 
      }
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
              { value: data1[0], name: "东线", itemStyle: { color: "#52D1FE" } },
              { value: data1[2], name: "西环", itemStyle: { color: "#FF9E72" } },
              { value: data1[1], name: "南线", itemStyle: { color: "#047DF6" } },
              { value: data1[3], name: "外环", itemStyle: { color: "#8FEF8B" } },
              { value: data1[4], name: "内环", itemStyle: { color: "#6852FE" } },
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
              { value: data1[0], name: data2[0]+"米", itemStyle: { color: "#52D1FE" } },
              { value: data1[2], name: data2[2]+"米", itemStyle: { color: "#FF9E72" } },
              { value: data1[1], name: data2[1]+"米", itemStyle: { color: "#047DF6" } },
              { value: data1[3], name: data2[3]+"米", itemStyle: { color: "#8FEF8B" } },
              { value: data1[4], name: data2[4]+"米", itemStyle: { color: "#6852FE" } },
            ],
          },
        ],
      });
    },
    drawBars() {
      let data1=[],data2=[],lab;
      if(!!this.$data.ret){
        data1.push(parseFloat(this.$data.ret.situation.build));//在建
        data1.push(parseFloat(this.$data.ret.situation.pre));//前期研究

        data2.push(parseFloat(this.$data.ret.situation.finish));//完工
        data2.push(parseFloat(this.$data.ret.situation.buildLag));//在建滞后
        data2.push(parseFloat(this.$data.ret.situation.preLag));//前期滞后
        //lab = this.$data.ret.project.sum;
      }
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
              { value: data1[0], itemStyle: { color: "#FF0059" } },
              {
                value: data1[1],
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
              { value: data2[0], itemStyle: { color: "#00FF84" } },
              { value: data2[1], itemStyle: { color: "#FF765D" } },
              {
                value: data2[2],
                itemStyle: { color: "#4DAEF8" },
              },
            ],
          },
        ],
      });
    },
    drawXiaLines() {
      let data1,data2,lab;
      if(!!this.$data.ret){
        data1 = parseFloat(this.$data.ret.speed.finish);
        data2 = 100 - 1 - data1;
        lab = this.$data.ret.project.sum;
      }
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
          max: 100,
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
            data: [data1],
            barWidth: 30, //柱图宽度
            itemStyle: {
              color: "#CE4142",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
            label: {
              formatter: "{a|{c}%}",
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
            data: [data2],
            label: {
              formatter: "{a|"+lab+"个}",
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
      let data1,data2,lab;
      if(!!this.$data.ret){
        data1 = parseFloat(this.$data.ret.speed.Completion);
        data2 = 100 - 1 - data1;
        console.log(data2);
        lab = this.$data.ret.project.plan;
      }
      // console.log(data2);
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
          max: 100,
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
            //"speed":{"Completion":"0","finish":"0"},
            data: [data1],
            barWidth: 30, //柱图宽度
            itemStyle: {
              color: "#1A56E2",
              barBorderRadius: [0, 0, 0, 0], // 统一设置四个角的圆角大小
            },
            label: {
              formatter: "{a|{c}%}",
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
            data: [data2],
            label: {
              formatter: "{a|"+lab+"亿元}",
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
    getData(name){
      this.currentZrdw = name
      let rets = [];
      this.list.forEach(function (element) {
        if(element.name==name){
          rets.push(element);
        }
      });
      if(rets.length>0){
        this.ret = rets[0];
      }
      this.drawShangLines();
      this.drawXiaLines();
      this.drawBars();
      this.drawPies();
    },
    itemClick(item) {
      const { x, y } = item.geometry;
      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y - 0.005, 450),
        orientation: {
          heading: 0.003336768850279448,
          pitch: -0.5808830390057418,
          roll: 0.0,
        },
        maximumHeight: 450,
      });
    }
  },
  mounted() {
    const SERVER_HOST = "http://172.168.3.183:8090/iserver/services";
    const SW_DATA = "/data-alldata/rest/data";
    const SW_DATA_NAME = "172.168.3.181_thxm:";
    const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
    const that = this;
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
  watch: {
    drawData(val) {
      console.log("drawData", val);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./layerHub.less");
</style>