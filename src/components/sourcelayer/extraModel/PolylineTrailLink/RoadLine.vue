<!--
 * @Author: eds
 * @Date: 2020-09-10 10:16:26
 * @LastEditTime: 2020-09-14 15:31:21
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\sourcelayer\extraModel\PolylineTrailLink\RoadLine.vue
-->
<template>
  <div class="TravelLines"></div>
</template>

<script>
const Cesium = window.Cesium;
import PolylineTrailLinkMaterialProperty from "./PolylineTrailLink";
import tangheLine from "mock/tangheLine.json";
import channel from "mock/channel.json";
// import walls from "mock/XZQH_LuCheng_FeaturesTo.json";
export default {
  data() {
    return {
      viewer: undefined,
    };
  },
  async mounted() {
    this.addDynamicLine();
    // this.addHaloLine();
    this.eventRegsiter();
  },
  beforeDestroy() {
    // window.earth.entities.removeAll();
    window.earth.scene.bloomEffect.show = false;
  },
  methods: {
    //  事件绑定
    eventRegsiter() {
      const that = this;
      // window.earth.scene.bloomEffect.show = true;
      // this.$bus.$on("cesium-3d-switch", ({ value }) => {
      //   const _LAYER_ = window.earth.scene.layers.find("baimo");
      //   window.earth.scene.bloomEffect.show = !value ? false : true;
      // });
    },
    //  相机移动
    cameraMove() {
      window.earth.scene.camera.setView({
        destination: {
          x: -2876284.3979956135,
          y: 4845208.573054629,
          z: 2992762.234962943,
        },
        orientation: {
          heading: 0.0030737118735766344,
          pitch: -0.582106282953041,
          roll: 0,
        },
      });
    },
    addHaloLine() {
      const promiseroute_level1 = Cesium.GeoJsonDataSource.load(
        "/mock/channel.json"
      );
      console.log('promiseroute_level1', promiseroute_level1)
      // promiseroute_level1
      //   .then((dataSource) => {
      //     window.earth.dataSources.add(dataSource);
      //     const Routes_level1 = dataSource.entities.values;
      //     for (var i = 0; i < Routes_level1.length; i++) {
      //       var line = Routes_level1[i];
      //       line.polyline.material = new Cesium.PolylineGlowMaterialProperty({
      //         //设置Glow材质
      //         glowPower: 0.06,
      //         color: Cesium.Color.ORANGERED.withAlpha(0.9),
      //       });
      //       line.polyline.width = 20;
      //     }
      //   })
      //   .otherwise((error) => console.log(error));
      // const promiseroute_level2 = Cesium.GeoJsonDataSource.load(
      //   "/static/json/Routes_data_EJ_FeaturesToJSO.json"
      // );

      // promiseroute_level2
      //   .then((dataSource) => {
      //     window.earth.dataSources.add(dataSource);
      //     const Routes_level2 = dataSource.entities.values;
      //     for (var i = 0; i < Routes_level2.length; i++) {
      //       var line = Routes_level2[i];
      //       line.polyline.material = new Cesium.PolylineGlowMaterialProperty({
      //         //设置Glow材质
      //         glowPower: 0.04,
      //         color: Cesium.Color.ORANGERED.withAlpha(0.9),
      //       });
      //       line.polyline.width = 10;
      //     }
      //   })
      //   .otherwise((error) => console.log(error));
    },
    //  初始化路线
    addDynamicLine() {
      const linePoints = tangheLine.geometries.map((v) => v.coordinates);
      console.log("linePoints", linePoints);
      linePoints.map((v, vindex) =>
        v.forEach((c, cindex) => {
          this.drawPolyline(
            c.reduce((a, b) => a.concat(b)),
            cindex
          );
        })
      );
    },
    drawPolyline(linePoints) {
      window.earth.entities.add({
        name: "PolylineTrail",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(linePoints),
          width: 10,
          material: new Cesium.PolylineTrailLinkMaterialProperty(
            Cesium.Color.WHITE,
            2000
          ),
          clampToGround: true,
        },
      });
    },
  },
};
</script>

<style>
</style>
