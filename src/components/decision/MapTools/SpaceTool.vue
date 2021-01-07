<template>
  <div class="space-tool">
    <div class="tool-wrapper">
      <div
        class="tool-item"
        :class="{ active: currentTool == item.value }"
        v-for="item in toolList"
        :key="item.value"
        @click="toolClick(item)"
      >
        <img
          class="dot"
          v-show="currentTool == item.value"
          src="./images/space-dot.png"
        />
        {{ item.label }}
      </div>
    </div>
    <calTools ref="tools" v-show="false" />
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
                  <span class="xm-number">{{analyzeData.projectTotal}}</span>
                  <span class="unit">总数(个)</span>
                </div>
                <div class="content">
                  <span class="xm-number">{{(analyzeData.projectAmount/10000).toFixed(1)}}</span>
                  <span class="unit">金额(亿元)</span>
                </div>
                <div class="tag xm-tag">项目</div>
              </div>
              <div class="right">
                <div class="content">
                  <span class="kd-number">{{analyzeData.pointTotal}}</span>
                  <span class="unit">总数(个)</span>
                </div>
                <div class="content">
                  <span class="kd-number">{{parseInt(analyzeData.pointLength)}}</span>
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
                  style="width: 24vh; height: 18vh"
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
                <div class="zrdw-list" v-show="orgValue=='project'">
                  <div class="zrdw-item" v-for="(value,key,index) in analyzeData.projectOrg" :key="index">
                    <span class="name">{{key}}</span>
                    <span class="number">{{value}}</span>
                    <span class="unit">个</span>
                  </div>
                </div>
                <div class="zrdw-list" v-show="orgValue=='point'">
                  <div class="zrdw-item" v-for="(value,key,index) in analyzeData.pointOrg" :key="index">
                    <span class="name">{{key}}</span>
                    <span class="number">{{value}}</span>
                    <span class="unit">个</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="side-wrapper">
              <div class="side-item">区县</div>
              <div class="side-item">街道</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import calTools from "../../sourcelayer/commonFrame/calTool/calTools";

export default {
  name: "spaceTool",
  components: { calTools },
  data() {
    return {
      toolList: [
        {
          label: "空间标绘",
          value: 1,
        },
        {
          label: "空间量算",
          value: 2,
        },
        {
          label: "空间分析",
          value: 3,
        },
      ],
      currentTool: 0,
      clampMode: 0,
      position: {},
      forcePosition: {},
      analyzeData: {
        projectTotal: 0,
        projectAmount: 0,
        pointTotal: 0,
        pointLength: 0,
        projectDistrict: {},
        pointDistrict: {},
        projectOrg: {},
        pointOrg: {}
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
    };
  },
  methods: {
    eventRegsiter() {
      this.$bus.$off("areaAnalyze");
      this.$bus.$on("areaAnalyze", ({ position, result }) => {
        // console.log("haha", position);
        this.initData(result);
        this.drawProjectCircle(position, new Date().getTime());
        // 经纬度转世界坐标
        this.position = Cesium.Cartesian3.fromDegrees(
          position.x,
          position.y,
          1200
        );
        // console.log("hehe", this.position);
        this.drawPie();
      });
    },
    toolClick(item) {
      if (this.currentTool == item.value) {
        return;
      }
      this.currentTool = item.value;
      if (this.currentTool == 3) {
        this.$refs.tools.gaugeAreaAnalyze();
      }
    },
    renderForceEntity() {
      // const forceEntity = this.forceEntity;
      // if (forceEntity.fix_data) {
      const pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        window.earth.scene,
        this.position
      );
      // console.log('pointToWindow', pointToWindow)
      if (
        this.forcePosition.x !== pointToWindow.x ||
        this.forcePosition.y !== pointToWindow.y
      ) {
        // console.log('nonono')
        this.forcePosition = pointToWindow;
      }
      // }
    },
    initData(res) {
      this.analyzeData = {
        projectTotal: 0,
        projectAmount: 0,
        pointTotal: 0,
        pointLength: 0,
        projectDistrict: {},
        pointDistrict: {},
        projectOrg: {},
        pointOrg: {}
      };
      res.result.features.forEach((feature) => {
        if (feature.attributes.RESOURCE_TYPE == "project_all") {
          this.analyzeData.projectTotal += 1;
          this.analyzeData.projectAmount += Number(feature.attributes.TOTALAMOUNT);
          this.analyzeData.projectDistrict[feature.attributes.DISTRICT]
            ? (this.analyzeData.projectDistrict[feature.attributes.DISTRICT] += 1)
            : (this.analyzeData.projectDistrict[feature.attributes.DISTRICT] = 1);
          
          let orgArr = ~feature.attributes.XM_ORG_CODE.indexOf(",") ? feature.attributes.XM_ORG_CODE.split(",") : [feature.attributes.XM_ORG_CODE]
          orgArr.forEach(item => {
            this.analyzeData.projectOrg[item]
            ? (this.analyzeData.projectOrg[item] += 1)
            : (this.analyzeData.projectOrg[item] = 1);
          })
        }
        if (feature.attributes.RESOURCE_TYPE == "greenway_all") {
          this.analyzeData.pointTotal += 1;
          this.analyzeData.pointLength += Number(feature.attributes.LENGTH);
          this.analyzeData.pointDistrict[feature.attributes.DISTRICT]
            ? (this.analyzeData.pointDistrict[feature.attributes.DISTRICT] += 1)
            : (this.analyzeData.pointDistrict[feature.attributes.DISTRICT] = 1);

          let orgArr = ~feature.attributes.LD_ORG_CODE.indexOf(",") ? feature.attributes.LD_ORG_CODE.split(",") : [feature.attributes.LD_ORG_CODE]
          orgArr.forEach(item => {
            this.analyzeData.pointOrg[item]
            ? (this.analyzeData.pointOrg[item] += 1)
            : (this.analyzeData.pointOrg[item] = 1);
          })
        }
      });
      console.log('gogogo', this.analyzeData)
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
      console.log("888");
      this.currentTool = 0;
      this.$refs.tools.clearGauge();
      this.position = {};
      this.forcePosition = {};
      const datasource = window.earth.dataSources.getByName("analyze")[0];
      datasource.entities.removeAll();
    },
    drawPie() {
      var data = [
        {
          name: "瓯海区",
          value: 25,
        },
        {
          name: "龙湾区",
          value: 15,
        },
        {
          name: "鹿城区",
          value: 69,
        },
      ];
      console.log("11111");
      this.pieEchart = this.$echarts.init(this.$refs.pieEchart);
      console.log("22222", this.pieEchart);
      this.pieEchart.setOption({
        legend: {
          orient: "horizontal",
          // top: "25%",
          // left: "34%",
          icon: "rect",
          itemWidth: 14,
          itemHeight: 14,
          textStyle: {
            color: "#fff",
          },
          data: ["瓯海区", "龙湾区", "鹿城区"],
          // formatter: function (name) {
          //   let target;
          //   for (let i = 0; i < resultList.length; i++) {
          //     if (resultList[i].name === name) {
          //       target = resultList[i].value;
          //     }
          //   }
          //   return name + target + "%";
          // },
        },
        series: [
          {
            name: "项目构成",
            type: "pie",
            center: ["50%", "50%"],
            // radius: ["60%", "75%"],
            radius: "50%",
            // avoidLabelOverlap: false,
            label: {
              // show: false,
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
            emphasis: {
              label: {
                show: false,
              },
            },
            // labelLine: {
            //   show: false,
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
};
</script>

<style lang="less" scoped>
@import url("./SpaceTool.less");
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