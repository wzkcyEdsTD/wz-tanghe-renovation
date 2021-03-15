<template>
  <div id="forcePopUp" v-show="forcePosition.x && forcePosition.y">
    <div
      id="forcePopUpContent"
      class="analyze-popup"
      :style="{
        transform: `translate3d(${forcePosition.x}px,${forcePosition.y}px, 0)`,
      }"
    >
      <a class="analyze-popup-close-button" href="#" @click="closePopup"></a>
      <div class="analyze-popup-content-wrapper">
        <div id="forcePopUpLink" class="analyze-popup-content">
          <div class="title">空间分析结果</div>
          <div class="top">
            <div class="left">
              <div class="content">
                <span class="xm-number">{{ analyzeData.projectTotal }}</span>
                <span class="unit">总数(个)</span>
              </div>
              <div class="content">
                <span class="xm-number">{{
                  (analyzeData.projectAmount / 10000).toFixed(1)
                }}</span>
                <span class="unit">金额(亿元)</span>
              </div>
              <div class="tag xm-tag">项目</div>
            </div>
            <div class="right">
              <div class="content">
                <span class="kd-number">{{ analyzeData.pointTotal }}</span>
                <span class="unit">总数(个)</span>
              </div>
              <div class="content">
                <span class="kd-number">{{
                  parseInt(analyzeData.pointLength)
                }}</span>
                <span class="unit">长度(米)</span>
              </div>
              <div class="tag kd-tag">卡点</div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <div class="header">
                <div class="sub-title">统计结果</div>
                <el-select v-model="districtValue" class="area-select">
                  <el-option
                    v-for="item in districtOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                ref="pieEchart"
                style="width: 24vh; height: 20vh"
                class="pieEchart"
              ></div>
            </div>
            <div class="right">
              <div class="header">
                <div class="sub-title">各责任单位</div>
                <el-select v-model="orgValue" class="area-select">
                  <el-option
                    v-for="item in orgOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="zrdw-list" v-show="orgValue == 'project'">
                <div
                  class="zrdw-item"
                  v-for="(item, index) in analyzeData.projectOrg"
                  :key="index"
                >
                  <span class="name">{{ orgData[item.name] }}</span>
                  <span class="number">{{
                    item.value > 9 ? item.value : `0${item.value}`
                  }}</span>
                  <span class="unit">个</span>
                </div>
              </div>
              <div class="zrdw-list" v-show="orgValue == 'point'">
                <div
                  class="zrdw-item"
                  v-for="(item, index) in analyzeData.pointOrg"
                  :key="index"
                >
                  <span class="name">{{ orgData[item.name] }}</span>
                  <span class="number">{{
                    item.value > 9 ? item.value : `0${item.value}`
                  }}</span>
                  <span class="unit">个</span>
                </div>
              </div>
            </div>
          </div>
          <div id="side-wrapper" class="side-wrapper">
            <div class="side-item" @click="sideValue = 'district'">区县</div>
            <div class="side-item" @click="sideValue = 'street'">街道</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orgData: {
        A02A01: '鹿城区政府',
        A02A02: '瓯海区政府',
        A02A03: '龙湾区政府',
        A02A04: '瑞安市政府',
        A02A05: '浙南产业区',
        A02A06: '市现代集团',
        A02A07: '市城发集团',
      },
      position: {},
      forcePosition: {},
      analyzeData: {
        projectTotal: 0,
        projectAmount: 0,
        pointTotal: 0,
        pointLength: 0,
        projectDistrict: [],
        pointDistrict: [],
        projectOrg: [],
        pointOrg: [],
        projectStreet: [],
        pointStreet: []
      },
      pieEchart: null, // 饼状图
      orgOptions: [
        {
          value: "project",
          label: "项目",
        },
        {
          value: "point",
          label: "断点",
        },
      ],
      orgValue: "project",
      districtOptions: [
        {
          value: "project",
          label: "项目",
        },
        {
          value: "point",
          label: "断点",
        },
      ],
      districtValue: "project",
      sideValue: 'district',
      sideBg1: require('./images/side1-1.png'),
      sideBg2: require('./images/side1-2.png'),
    }
  },
  methods: {
    eventRegsiter() {
      this.$bus.$off("areaAnalyze");
      this.$bus.$on("areaAnalyze", ({ position, result }) => {
        this.initData(result);
        this.drawProjectCircle(position, new Date().getTime());
        // 经纬度转世界坐标
        this.position = Cesium.Cartesian3.fromDegrees(
          position.x,
          position.y,
          1200
        );
      });
    },
    renderForceEntity() {
      // const forceEntity = this.forceEntity;
      const pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        window.earth.scene,
        this.position
      );
      if (
        this.forcePosition.x !== pointToWindow.x ||
        this.forcePosition.y !== pointToWindow.y
      ) {
        this.forcePosition = pointToWindow;
      }
    },
    initData(res) {
      this.orgValue = "project"
      this.districtValue = "project"
      this.analyzeData = {
        projectTotal: 0,
        projectAmount: 0,
        pointTotal: 0,
        pointLength: 0,
        projectDistrict: [],
        pointDistrict: [],
        projectOrg: [],
        pointOrg: [],
        projectStreet: [],
        pointStreet: []
      };
      res.result.features.forEach((feature) => {
        if (feature.attributes.RESOURCE_TYPE == "project_all") {
          this.analyzeData.projectTotal += 1;
          this.analyzeData.projectAmount += Number(feature.attributes.TOTALAMOUNT);

          let districtIndex = this.analyzeData.projectDistrict.findIndex(item => {
            return item.name == feature.attributes.DISTRICT
          })
          if (districtIndex>=0) {
            this.analyzeData.projectDistrict[districtIndex].value += 1
          } else {
            this.analyzeData.projectDistrict.push({name: feature.attributes.DISTRICT, value: 1})
          }

          let streetIndex = this.analyzeData.projectStreet.findIndex(item => {
            return item.name == feature.attributes.STREET
          })
          if (streetIndex>=0) {
            this.analyzeData.projectStreet[streetIndex].value += 1
          } else {
            this.analyzeData.projectStreet.push({name: feature.attributes.STREET, value: 1})
          }
          
          let orgArr = ~feature.attributes.XM_ORG_CODE.indexOf(",") ? feature.attributes.XM_ORG_CODE.split(",") : [feature.attributes.XM_ORG_CODE]
          orgArr.forEach(org => {
            let orgIndex = this.analyzeData.projectOrg.findIndex(item => {
              return item.name == org
            })
            if (orgIndex>=0) {
              this.analyzeData.projectOrg[orgIndex].value += 1
            } else {
              this.analyzeData.projectOrg.push({name: org, value: 1})
            }
          })
          this.analyzeData.projectOrg.sort((a, b) => {
            if (a.value < b.value) {
              return 1
            } else if (a.value > b.value) {
              return -1
            } else {
              return 0
            }
          })
        }
        if (feature.attributes.RESOURCE_TYPE == "greenway_all") {
          this.analyzeData.pointTotal += 1;
          this.analyzeData.pointLength += Number(feature.attributes.LENGTH);

          let districtIndex = this.analyzeData.pointDistrict.findIndex(item => {
            return item.name == feature.attributes.DISTRICT
          })
          if (districtIndex>=0) {
            this.analyzeData.pointDistrict[districtIndex].value += 1
          } else {
            this.analyzeData.pointDistrict.push({name: feature.attributes.DISTRICT, value: 1})
          }

          let streetIndex = this.analyzeData.pointStreet.findIndex(item => {
            return item.name == feature.attributes.STREET
          })
          if (streetIndex>=0) {
            this.analyzeData.pointStreet[streetIndex].value += 1
          } else {
            this.analyzeData.pointStreet.push({name: feature.attributes.STREET, value: 1})
          }

          let orgArr = ~feature.attributes.LD_ORG_CODE.indexOf(",") ? feature.attributes.LD_ORG_CODE.split(",") : [feature.attributes.LD_ORG_CODE]
          orgArr.forEach(org => {
            let orgIndex = this.analyzeData.pointOrg.findIndex(item => {
              return item.name == org
            })
            if (orgIndex>=0) {
              this.analyzeData.pointOrg[orgIndex].value += 1
            } else {
              this.analyzeData.pointOrg.push({name: org, value: 1})
            }
          })
          this.analyzeData.pointOrg.sort((a, b) => {
            if (a.value < b.value) {
              return 1
            } else if (a.value > b.value) {
              return -1
            } else {
              return 0
            }
          })
        }
      });
      this.drawPie();
    },
    // 创建datasource
    createEntityCollection() {
      const ProjectCircleEntityCollection = new Cesium.CustomDataSource(
        "analyze"
      );
      window.earth.dataSources.add(ProjectCircleEntityCollection);
    },
    drawProjectCircle(geometry, id) {
      // 清除原有图形
      const datasource = window.earth.dataSources.getByName("analyze")[0];
      datasource.entities.removeAll();
      const { x, y } = geometry;

      const circleEntity = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(x, y, 0),
        billboard: {
          image: `/static/images/map-ico/analyze.png`,
          width: 34,
          height: 34,
          scaleByDistance: new Cesium.NearFarScalar(3000, 1.5, 6000, 1.2),
          // pixelOffset: new Cesium.Cartesian2(0, -15),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        id,
      });
      datasource.entities.add(circleEntity);
    },
    fixPopup() {
      if (this.position.x && this.position.y) {
        this.renderForceEntity();
      }
    },
    closePopup() {
      this.$parent.$refs.SpaceTool.currentTool = 0;
      this.$parent.$refs.SpaceTool.$refs.measureTools.clearGauge();
      this.position = {};
      this.forcePosition = {};
      const datasource = window.earth.dataSources.getByName("analyze")[0];
      datasource.entities.removeAll();
    },
    drawPie() {
      let data
      if (this.sideValue == 'district') {
        if (this.districtValue == 'project') {
          data = this.analyzeData.projectDistrict
        }
        if (this.districtValue == 'point') {
          data = this.analyzeData.pointDistrict
        }
      }
      if (this.sideValue == 'street') {
        if (this.districtValue == 'project') {
          data = this.analyzeData.projectStreet
        }
        if (this.districtValue == 'point') {
          data = this.analyzeData.pointStreet
        }
      }
      let nameList = data.map(item => {
        return item.name
      })
      this.pieEchart = this.$echarts.init(this.$refs.pieEchart);
      this.pieEchart.setOption({
        legend: {
          selectedMode: false,
          orient: "horizontal",
          icon: "rect",
          itemWidth: 14,
          itemHeight: 14,
          textStyle: {
            color: "#fff",
          },
          data: nameList,
        },
        color:['#00b1ff', '#baffff', '#4e4eff', '#AC88FF'],
        series: [
          {
            name: "项目构成",
            type: "pie",
            center: ["50%", "55%"],
            radius: "65%",
            // avoidLabelOverlap: false,
            label: {
              formatter: "{b}: \n{d}%",
              position: "outer",
              alignTo: "none",
              bleedMargin: 5,
            },
            labelLine: {
              length: 1,
            },
            left: "15%",
            right: "15%",
            // emphasis: {
            //   label: {
            //     show: false,
            //   },
            // },
            data: data,
            animation: false,
          },
        ],
      });
    },
  },
  mounted() {
    this.eventRegsiter();
    this.createEntityCollection();
  },
  watch: {
    districtValue(val) {
      this.drawPie()
    },
    sideValue(val) {
      this.drawPie()
      if (val == 'district') {
        document.getElementById('side-wrapper').style.backgroundImage = "url('" + this.sideBg1 + "')";
      }
      if (val == 'street') {
        document.getElementById('side-wrapper').style.backgroundImage = "url('" + this.sideBg2 + "')";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/AnalyzePopup.less");
</style>
<style lang="less">
.area-select {
  .el-input__inner {
    width: 55px;
    height: 20px;
    line-height: 20px;
    padding: 0;
    padding-left: 5px;
    background: #000514 !important;
    border: none !important;
    color: white !important;
  }
  .el-input__icon {
    line-height: 20px !important;
  }
  .el-select-dropdown {
    background-color: rgba(0, 28, 146, 0.6) !important;
    border: 1px solid #165fea !important;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.hover {
    background: none !important;
  }
  .el-select-dropdown__item.selected {
    color: #69fee5;
  }
}
</style>