<template>
  <div class="cesiumContainer">
    <div id="cesiumContainer" />
    <div v-if="mapLoaded">
      <TotalTarget />
      <Summary />
      <RoadLine ref="roadline" />
      <LayerHub />
      <DetailPopup ref="detailPopup" />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
import TotalTarget from "./totalTarget/totalTarget";
import Summary from "./summary/summary";
import RoadLine from "./extraModel/PolylineTrailLink/RoadLine";
import LayerHub from "./layerHub/layerHub";
import DetailPopup from "./commonFrame/DetailPopup/DetailPopup";
import { getCurrentExtent, isContainByExtent } from "./commonFrame/mapTool";
import { mapGetters, mapActions } from "vuex";
const Cesium = window.Cesium;

export default {
  components: {
    TotalTarget,
    Summary,
    RoadLine,
    LayerHub,
    DetailPopup
  },
  data() {
    return {
      mapLoaded: false,
      imagelayer: undefined,
      datalayer: undefined,
      handler: undefined,
    };
  },
  computed: {
    ...mapGetters("map", ["medicalListWithGeometry"]),
  },
  async mounted() {
    this.init3DMap(() => {
      this.mapLoaded = true;
      this.initPostRender();
      this.initHandler();
    });
    this.eventRegsiter();
  },
  methods: {
    initPostRender() {
      window.earth.scene.postRender.addEventListener(() => {
          if (!window.earth || !this.mapLoaded || !Object.keys(this.$refs).length)
            return;
          //  *****[detailPopup]  详情查看点位*****
          const forceEntity = this.$refs.detailPopup.forceEntity;
          if (forceEntity.extra_data) {
            const pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
              window.earth.scene,
              forceEntity.position
            );
            this.$refs.detailPopup.renderForceEntity(pointToWindow);
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
        console.log('pick', pick)
        if (!pick.id || typeof pick.id != "object") return;
        //  *****[detailPopup]  资源详情点*****
        if (pick.id.extra_data) {
          console.log('gogogo')
          this.$refs.detailPopup.getForceEntity({
            extra_data: pick.id.extra_data,
            fix_data: pick.id.fix_data,
            position: pick.id._position._value,
          });
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    eventRegsiter() {
      this.$bus.$off("cesium-3d-switch");
      this.$bus.$on("cesium-3d-switch", ({ value }) => {
        //  底图切换
        // this.datalayer.show = !value ? false : true;
        // this.imagelayer
        //   ? (this.imagelayer.show = !value ? true : false)
        //   : !value
        //   ? (this.imagelayer = window.earth.imageryLayers.addImageryProvider(
        //       new Cesium.SuperMapImageryProvider({
        //         url: ServiceUrl.SWImage,
        //       })
        //     ))
        //   : undefined;
        this.imagelayer.show = !value ? false : true;
        this.datalayer
          ? (this.datalayer.show = !value ? true : false)
          : !value
          ? (this.datalayer = window.earth.imageryLayers.addImageryProvider(
              new Cesium.SuperMapImageryProvider({
                url: ServiceUrl.DataImage,
              })
            ))
          : undefined;
      });
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

      // this.datalayer = viewer.imageryLayers.addImageryProvider(
      //   new Cesium.SuperMapImageryProvider({
      //     url: ServiceUrl.DataImage,
      //   })
      // );
      this.imagelayer = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.SWImage,
        })
      );
      const mapMvt = viewer.scene.addVectorTilesMap({
        url: ServiceUrl.YJMVT,
        name: "mapMvt",
        viewer,
      });

      // const baimoPromise = viewer.scene.addS3MTilesLayerByScp(
      //   ServiceUrl.WZBaimo,
      //   {
      //     name: "baimo",
      //   }
      // );
      // Cesium.when(baimoPromise, async ([forceLayer, ...oLayer]) => {
      //   const LAYER = viewer.scene.layers.find("baimo");
      //   LAYER.style3D.fillForeColor = new Cesium.Color.fromCssColorString(
      //     "rgba(137,137,137, 1)"
      //   );
      //   const hyp = new Cesium.HypsometricSetting();
      //   const colorTable = new Cesium.ColorTable();
      //   hyp.MaxVisibleValue = 300;
      //   hyp.MinVisibleValue = 0;
      //   colorTable.insert(300, new Cesium.Color(1, 1, 1));
      //   colorTable.insert(160, new Cesium.Color(0.95, 0.95, 0.95));
      //   colorTable.insert(76, new Cesium.Color(0.7, 0.7, 0.7));
      //   colorTable.insert(0, new Cesium.Color(13 / 255, 24 / 255, 45 / 255));
      //   hyp.ColorTable = colorTable;
      //   hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
      //   hyp.Opacity = 1;
      //   hyp.LineInterval = 20.0;
      //   LAYER.hypsometricSetting = {
      //     hypsometricSetting: hyp,
      //     analysisMode:
      //       Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL,
      //   };
      //   LAYER.visibleDistanceMax = 5000;
      // });

      const tanghePromise = viewer.scene.addS3MTilesLayerByScp(
        ServiceUrl.TANGHE3D,
        {
          name: "tanghe3d",
        }
      );
      Cesium.when(tanghePromise, () => {
        const LAYER = viewer.scene.layers.find("tanghe3d");
        LAYER.visibleDistanceMax = 5000;
      })

      // 移除缓冲圈
      $(".cesium-widget-credits").hide();
      viewer.scene.globe.depthTestAgainstTerrain = false;
      this.cameraMove();
      fn && fn();
    },
    cameraMove() {
      window.earth.scene.camera.setView({
        destination : Cesium.Cartesian3.fromDegrees(120.66625660935506, 27.981332018707733, 1000.0),
        orientation: {
          heading: 0.0033168860454315663,
          pitch: -0.5808830390057396,
          roll: 0,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cesiumContainer {
  height: 100%;
  width: 100%;
  #cesiumContainer {
    height: 100%;
    width: 100%;
    // color: rgb(42, 104, 163);
  }
}
</style>
