<template>
  <div class="ThreeDContainer">
    <div class="tframe">
      <el-form label-width="100px" :rules="toolTypeRules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="测量工具" prop="toolType">
              <el-select
                v-model="toolType"
                popper-class="select-option"
                placeholder="测量类型"
                size="small"
                @change="changeMapType($event)"
              >
                <el-option
                  v-for="item in toolTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item class="elformbtns">
              <el-button class="elformbtn" @click="gaugeDistance"
                >测距</el-button
              >
              <el-button class="elformbtn" @click="gaugeArea">测面</el-button>
              <el-button class="elformbtn" @click="gaugeHeight">测高</el-button>
              <el-button class="elformbtn" @click="clearGauge">清除</el-button>
              <el-button class="elformbtn" @click="closeGauge">关闭</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
const Cesium = window.Cesium;
import { ServiceUrl } from "@/config/server/mapConfig";
export default {
  name: "calTools",
  data() {
    return {
      toolTypeRules: {
        rivername: [
          { required: true, message: "请选择测量类型", trigger: "change" },
        ],
      },
      toolTypes: [
        { label: "空间测量", value: "空间测量" },
        { label: "贴地测量", value: "贴地测量" },
      ],
      toolType: "空间测量",
      clampMode: 0,
      analyzeActive: false,
    };
  },
  created() {
    window.handlerDis = new Cesium.MeasureHandler(
      window.earth,
      Cesium.MeasureMode.Distance,
      this.clampMode
    );
    window.handlerArea = new Cesium.MeasureHandler(
      window.earth,
      Cesium.MeasureMode.Area,
      this.clampMode
    );
    window.handlerAreaAnalyze = new Cesium.MeasureHandler(
      window.earth,
      Cesium.MeasureMode.Area,
      this.clampMode
    );
    window.handlerHeight = new Cesium.MeasureHandler(
      window.earth,
      Cesium.MeasureMode.DVH
    );
  },
  mounted() {
    this.eventRegsiter();
  },
  beforeDestroy() {
    this.deactiveAll();
    this.clearGauge();
  },
  methods: {
    //  事件绑定
    eventRegsiter() {
      window.handlerDis.measureEvt.addEventListener(function (result) {
        var dis = Number(result.distance);
        var positions = result.positions;
        var distance =
          dis > 1000 ? (dis / 1000).toFixed(2) + "km" : dis.toFixed(2) + "m";
        window.handlerDis.disLabel.text = "距离:" + distance;
      });
      window.handlerDis.activeEvt.addEventListener(function (isActive) {
        if (isActive == true) {
          window.earth.enableCursorStyle = false;
          window.earth._element.style.cursor = "";
          $("body").removeClass("measureCur").addClass("measureCur");
        } else {
          window.earth.enableCursorStyle = true;
          $("body").removeClass("measureCur");
        }
      });
      window.handlerArea.measureEvt.addEventListener(function (result) {
        var mj = Number(result.area);
        var positions = result.positions;
        var area =
          mj > 1000000
            ? (mj / 1000000).toFixed(2) + "km²"
            : mj.toFixed(2) + "㎡";
        window.handlerArea.areaLabel.text = "面积:" + area;
      });
      window.handlerArea.activeEvt.addEventListener(function (isActive) {
        if (isActive == true) {
          window.earth.enableCursorStyle = false;
          window.earth._element.style.cursor = "";
          $("body").removeClass("measureCur").addClass("measureCur");
        } else {
          window.earth.enableCursorStyle = true;
          $("body").removeClass("measureCur");
        }
      });
      window.handlerAreaAnalyze.measureEvt.addEventListener(async (result) => {
        if (!this.analyzeActive) {
          var scene = window.earth.scene;
          var ellipsoid = scene.globe.ellipsoid;
          var positions = result.positions;
          var points = [];
          positions.forEach((item) => {
            var cartesian3 = new Cesium.Cartesian3(item.x, item.y, item.z);
            var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            points.push(new SuperMap.Geometry.Point(lng, lat));
          });
          let centerPosition = this.getCenterPoint(points)
          var linearRings = new SuperMap.Geometry.LinearRing(points);
          var region = new SuperMap.Geometry.Polygon([linearRings]);
          let res = await this.fetchFromDataSets(region);
          this.$bus.$emit("areaAnalyze", { position: centerPosition, result: res });
        }
      });
      window.handlerAreaAnalyze.activeEvt.addEventListener((isActive) => {
        if (isActive == true) {
          this.analyzeActive = true;
          window.earth.enableCursorStyle = false;
          window.earth._element.style.cursor = "";
          $("body").removeClass("measureCur").addClass("measureCur");
        } else {
          this.analyzeActive = false;
          window.earth.enableCursorStyle = true;
          $("body").removeClass("measureCur");
        }
      });
      window.handlerHeight.measureEvt.addEventListener(function (result) {
        var distance =
          result.distance > 1000
            ? (result.distance / 1000).toFixed(2) + "km"
            : result.distance + "m";
        var vHeight =
          result.verticalHeight > 1000
            ? (result.verticalHeight / 1000).toFixed(2) + "km"
            : result.verticalHeight + "m";
        var hDistance =
          result.horizontalDistance > 1000
            ? (result.horizontalDistance / 1000).toFixed(2) + "km"
            : result.horizontalDistance + "m";
        window.handlerHeight.disLabel.text = "空间距离:" + distance;
        window.handlerHeight.vLabel.text = "垂直高度:" + vHeight;
        window.handlerHeight.hLabel.text = "水平距离:" + hDistance;
      });
      window.handlerHeight.activeEvt.addEventListener(function (isActive) {
        if (isActive == true) {
          window.earth.enableCursorStyle = false;
          window.earth._element.style.cursor = "";
          $("body").removeClass("measureCur").addClass("measureCur");
        } else {
          window.earth.enableCursorStyle = true;
          $("body").removeClass("measureCur");
        }
      });
    },
    //  改变select
    changeMapType(prov) {
      window.handlerArea.clampMode = prov == "空间测量" ? 0 : 1;
      window.handlerDis.clampMode = prov == "空间测量" ? 0 : 1;
    },
    //  测距
    gaugeDistance() {
      this.deactiveAll();
      window.handlerDis && window.handlerDis.activate();
    },
    //  测面
    gaugeArea() {
      this.deactiveAll();
      window.handlerArea && window.handlerArea.activate();
    },
    //  面分析
    gaugeAreaAnalyze() {
      this.deactiveAll();
      window.handlerAreaAnalyze && window.handlerAreaAnalyze.activate();
    },
    //  测高
    gaugeHeight() {
      this.deactiveAll();
      window.handlerHeight && window.handlerHeight.activate();
    },
    //  关闭地图测量
    closeGauge() {
      this.clearGauge();
      // this.$bus.$emit("cesium-3d-maptool", { value: null });
      // this.$parent.showTool = false;
    },
    //  清除分析结果
    clearGauge() {
      window.handlerDis && window.handlerDis.clear();
      window.handlerArea && window.handlerArea.clear();
      window.handlerAreaAnalyze && window.handlerAreaAnalyze.clear();
      window.handlerHeight && window.handlerHeight.clear();
    },
    deactiveAll() {
      window.handlerDis && window.handlerDis.deactivate();
      window.handlerArea && window.handlerArea.deactivate();
      window.handlerAreaAnalyze && window.handlerAreaAnalyze.deactivate();
      window.handlerHeight && window.handlerHeight.deactivate();
    },
    getCenterPoint(data) {
      var x = 0.0,
        y = 0.0;
      for (var i = 0; i < data.length; i++) {
        x = x + parseFloat(data[i]["x"]);
        y = y + parseFloat(data[i]["y"]);
      }
      x = x / data.length;
      y = y / data.length;
      return { x: x, y: y };
    },
    fetchFromDataSets(geometry) {
      return new Promise((resolve, reject) => {
        const getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(
          ServiceUrl.FEATUREMVT,
          {
            eventListeners: {
              processCompleted: (data) => {
                data && resolve(data);
              },
              processFailed: (err) => reject(err),
            },
          }
        );
        getFeaturesByGeometryService.processAsync(
          new SuperMap.REST.GetFeaturesByGeometryParameters({
            datasetNames: [
              "thxm:th_spatial_query",
            ],
            geometry,
            toIndex: -1,
          })
        );
      })
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./calTools.less");
</style>

