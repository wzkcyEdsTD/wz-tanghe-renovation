<template>
  <div class="cesiumContainer">
    <div id="cesiumContainer" />
    <div v-if="mapLoaded">
      <DetailPopup ref="detailPopup" />
      <LayerHub ref="layerhub" />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
import LayerHub from "./layerHub/layerHub";
import DetailPopup from "./DetailPopup/DetailPopup";
const Cesium = window.Cesium;

export default {
  components: {
    LayerHub,
    DetailPopup,
  },
  data() {
    return {
      mapLoaded: false,
      imagelayer: {
        2018: undefined,
        2019: undefined
      },
      handler: undefined,
    };
  },
  async mounted() {
    this.init3DMap(() => {
      this.mapLoaded = true;
      this.initPostRender();
      this.initHandler();
    });
  },
  methods: {
    initPostRender() {
      window.earth.scene.postRender.addEventListener(() => {
        if (!window.earth || !this.mapLoaded || !Object.keys(this.$refs).length)
          return;
        //  *****[detailPopup]  详情查看点位*****
        if (this.$refs.detailPopup) {
          this.$refs.detailPopup.renderForceEntity();
        }
      });
    },
    initHandler() {
      this.handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      // 监听左键点击事件
      this.handler.setInputAction((e) => {
        const pick = window.earth.scene.pick(e.position);
        console.log("pick", pick);
        if (!pick.id || typeof pick.id != "object") return;
        //  *****[detailPopup]  资源详情点*****
        if (pick && pick.id.extra_data) {
          console.log("gogogo");
          if (pick.id.extra_data) {
            this.$refs.detailPopup.getForceEntity({
              extra_data: pick.id.extra_data,
              fix_data: pick.id.fix_data,
              position: pick.id._position._value,
              type: pick.id.type
            });
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    init3DMap(fn) {
      const that = this;
      const viewer = new Cesium.Viewer("cesiumContainer", {
        infoBox: false,
        selectionIndicator: false,
        shadows: false, //  内存吃不消
      });
      viewer.imageryLayers.get(0).show = false;
      viewer.scene.globe.baseColor = new Cesium.Color.fromCssColorString(
        "rgba(13,24,45, 1)"
      );
      window.earth = viewer;

      this.imagelayer[2019] = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.SWImage[2019],
        })
      );

      // 移除缓冲圈
      $(".cesium-widget-credits").hide();
      viewer.scene.globe.depthTestAgainstTerrain = false;
      this.cameraMove();
      fn && fn();
    },
    cameraMove() {
      window.earth.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          120.67625660935506,
          27.841332018707733,
          10000.0
        ),
        orientation: {
          heading: 0.01768860454315663,
          pitch: -0.5808830390057396,
          roll: 0,
        },
      });
    },
  }
};
</script>

<style lang="less" scoped>
.cesiumContainer {
  height: 100%;
  width: 100%;
  #cesiumContainer {
    height: 100%;
    width: 100%;
  }
}
</style>
