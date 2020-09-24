<template>
  <div class="cesiumContainer">
    <div id="cesiumContainer" />
    <div v-if="mapLoaded">
      <TotalTarget ref="totalTarget" v-show="isTotalTarget" />
      <ProjectSummary />
      <!-- <ProjectSummary v-show="isProjectSummary" /> -->
      <!-- <SightSummary v-show="isSightSummary" /> -->
      <!-- <RoadLine ref="roadline" /> -->
      <LayerHub ref="layerhub" />
      <DetailPopup ref="detailPopup" />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
import TotalTarget from "./totalTarget/totalTarget";
import ProjectSummary from "./projectSummary/projectSummary";
import SightSummary from "./sightSummary/sightSummary";
import RoadLine from "./extraModel/PolylineTrailLink/RoadLine";
import LayerHub from "./layerHub/layerHub";
import DetailPopup from "./commonFrame/DetailPopup/DetailPopup";
import { getCurrentExtent, isContainByExtent } from "./commonFrame/mapTool";
import { mapGetters, mapActions } from "vuex";
const Cesium = window.Cesium;

export default {
  components: {
    TotalTarget,
    ProjectSummary,
    SightSummary,
    RoadLine,
    LayerHub,
    DetailPopup,
  },
  data() {
    return {
      mapLoaded: false,
      imagelayer: undefined,
      datalayer: undefined,
      lvdaolayer: undefined,
      handler: undefined,
      isTotalTarget: true,
      isProjectSummary: false,
      isSightSummary: false
    };
  },
  computed: {
    ...mapGetters("map", ["medicalListWithGeometry"]),
  },
  async mounted() {
    this.init3DMap(() => {
      this.mapLoaded = true;
      // this.initPostRender();
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
        console.log("pick", pick);
        if (!pick.id || typeof pick.id != "object") return;
        //  *****[detailPopup]  资源详情点*****
        if (pick && pick.id.extra_data) {
          console.log("gogogo");
          if (~pick.id.id.indexOf("项目_")) {
            this.$bus.$emit("cesium-projectClick", {
              extra_data: pick.id.extra_data,
            });
          }
          if (~pick.id.id.indexOf("绿道断点_")) {
            this.$bus.$emit("cesium-kadianClick", {
              extra_data: pick.id.extra_data,
            });
          }
          this.$refs.layerhub.showHub = false
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    eventRegsiter() {
      this.$bus.$off("cesium-layer-switch");
      this.$bus.$on("cesium-layer-switch", ({ value, year }) => {
        //  底图切换
        console.log("layer-switch");
        if (value == "yx") {
          console.log("yx", year, ServiceUrl.SWImage);
          this.datalayer.show = false;
          this.imagelayer
            ? (this.imagelayer.show = true)
            : (this.imagelayer = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: ServiceUrl.SWImage,
                })
              ));
          // this.lipai();
          // this.quan();
        } else {
          this.removeAll();
          this.imagelayer.show = false;
          this.datalayer
            ? (this.datalayer.show = true)
            : (this.datalayer = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: ServiceUrl.DataImage,
                })
              ));
        }
      });
      this.$bus.$off("cesium-lvdao-switch");
      // this.$bus.$on("cesium-lvdao-switch", ({ value }) => {
      //   //  绿道切换
      //   console.log("lvdao-switch");
      //   if (value) {
      //     this.lvdaolayer
      //       ? (this.lvdaolayer.show = true)
      //       : (this.lvdaolayer = window.earth.imageryLayers.addImageryProvider(
      //           new Cesium.SuperMapImageryProvider({
      //             url: ServiceUrl.LVDAOImage,
      //           })
      //         ));
      //   } else {
      //     this.lvdaolayer ? this.lvdaolayer.show = false : null
      //   }
      // });
      this.$bus.$off("cesium-3d-switch");
      this.$bus.$on("cesium-3d-switch", ({ value }) => {
        console.log('gogogogo', value)
        // 白模切换
        const _LAYER_ = window.earth.scene.layers.find("baimo");
        if (_LAYER_) {
          _LAYER_.visible = value;
        } else {
          const baimoPromise = window.earth.scene.addS3MTilesLayerByScp(
            ServiceUrl.WZBaimo,
            {
              name: "baimo",
            }
          );
          Cesium.when(baimoPromise, async ([forceLayer, ...oLayer]) => {
            const LAYER = window.earth.scene.layers.find("baimo");
            LAYER.style3D.fillForeColor = new Cesium.Color.fromCssColorString(
              "rgba(137,137,137, 1)"
            );
            const hyp = new Cesium.HypsometricSetting();
            const colorTable = new Cesium.ColorTable();
            hyp.MaxVisibleValue = 300;
            hyp.MinVisibleValue = 0;
            colorTable.insert(300, new Cesium.Color(1, 1, 1));
            colorTable.insert(160, new Cesium.Color(0.95, 0.95, 0.95));
            colorTable.insert(76, new Cesium.Color(0.7, 0.7, 0.7));
            colorTable.insert(
              0,
              new Cesium.Color(13 / 255, 24 / 255, 45 / 255)
            );
            hyp.ColorTable = colorTable;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 1;
            //  贴图纹理
            hyp.emissionTextureUrl = "/static/images/area/speedline.png";
            hyp.emissionTexCoordUSpeed = 0.2;
            LAYER.hypsometricSetting = {
              hypsometricSetting: hyp,
              analysisMode:
                Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL,
            };
            // LAYER.visibleDistanceMax = 5000;
          });
        }
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

      // const mapMvt = viewer.scene.addVectorTilesMap({
      //   url: ServiceUrl.YJMVT,
      //   name: "mapMvt",
      //   viewer,
      // });

      // const tanghePromise = viewer.scene.addS3MTilesLayerByScp(
      //   ServiceUrl.TANGHE3D,
      //   {
      //     name: "tanghe3d",
      //   }
      // );
      // Cesium.when(tanghePromise, () => {
      //   const LAYER = viewer.scene.layers.find("tanghe3d");
      //   // LAYER.visibleDistanceMax = 5000;
      // });

      window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.TANGHE2D,
        })
      )

      window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.LVDAOImage,
        })
      )

      this.lipai();
      this.quan();

      // 移除缓冲圈
      $(".cesium-widget-credits").hide();
      viewer.scene.globe.depthTestAgainstTerrain = false;
      this.cameraMove();
      fn && fn();
    },
    cameraMove() {
      window.earth.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          120.66625660935506,
          27.641332018707733,
          16000.0
        ),
        orientation: {
          heading: 0.0033168860454315663,
          pitch: -0.5808830390057396,
          roll: 0,
        },
      });
    },
    lipai() {
      this.lp(120.727729,28.010275,"oj",'static/images/oj.png',65,65);
      this.lp(120.599327,27.789995,"fyj",'static/images/fyj.png',75,75);
      this.lp(120.726, 27.899,"wrth",'static/images/温瑞塘河.png',130,130);
    },
    quan() {
      this.texiao(120.649,27.786,"ruian","static/images/瑞安.png");
      this.texiao(120.720,27.822,"tangxia","static/images/塘下.png");
      this.texiao(120.684,27.880,"xianyan","static/images/仙岩.png");
      this.texiao(120.646,27.921,"liao","static/images/丽岙.png");
      this.texiao(120.700,27.942,"chshan","static/images/茶山.png");
      this.texiao(120.649,27.972,"wenzhoushiqu","static/images/温州市区.png");
    },
    texiao(lon,lat,id,img){
      const viewer = window.earth;
      var rr1 = 0;
      var rr =0;
      var ss1 = 0;
      var ss = 0;
      var deviationR = 20;
      var MaxR = 3000;
      let entity=viewer.entities.add({
        id:id,
        position:Cesium.Cartesian3.fromDegrees(lon,lat,50),
        ellipse:{
          semiMinorAxis:new Cesium.CallbackProperty(function () {
            var r1 = rr;  //指定扩散圆的最小半径，maxR为扩散圆的最大半径
            r1 = r1 + deviationR;//deviationR为每次圆增加的大小
            if (r1 >= MaxR) {
              r1 = 0;
            }
            rr = r1;
            return r1;
          },false),
          semiMajorAxis:new Cesium.CallbackProperty(function () {
            var r1=rr1  //指定扩散圆的最小半径，maxR为扩散圆的最大半径
            r1 = r1 + deviationR;//deviationR为每次圆增加的大小
            if (r1 >= MaxR) {
              r1 = 0;
            }
            rr1 = r1;
            return r1;
          },false),
          height:10,
          material: new Cesium.ImageMaterialProperty({
            image:"static/images/1.png",
            transparent:true,
          }),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000,50000000),
        },
      });
      setTimeout(function () {
        viewer.entities.add({
          id: `${id}1`,
          position:Cesium.Cartesian3.fromDegrees(lon,lat,10),
          ellipse : {
            semiMinorAxis :new Cesium.CallbackProperty(function () {
              var r1 =ss  //指定扩散圆的最小半径，maxR为扩散圆的最大半径
              r1 = r1 + deviationR;//deviationR为每次圆增加的大小
              if (r1 >= MaxR) {
                r1 = 0;
              }
              ss = r1;
              return r1;
            },false),
            semiMajorAxis :new Cesium.CallbackProperty(function () {
              var r1=ss1  //指定扩散圆的最小半径，maxR为扩散圆的最大半径
              r1 = r1 + deviationR;//deviationR为每次圆增加的大小
              if (r1 >= MaxR) {
                r1 = 0;
              }
              ss1 = r1;
              return r1;
            },false),
            height:10,
            material:new Cesium.ImageMaterialProperty({
              image:"static/images/1.png",
              transparent:true,
            }),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000,50000000),
          }
        });
      },5000);

      this.lp(lon,lat,`${id}p`,img,60,60,600);
    },
    lp(lon,lat,id,img,width,height,high){
      const viewer = window.earth;
      viewer.entities.add({
        id: id,
        position: Cesium.Cartesian3.fromDegrees(lon,lat, high||100),
        billboard: {
          image: img,
          width: width,
          height: height,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          translucencyByDistance: new Cesium.NearFarScalar(7000, 0, 8000, 1)
        },
      });
    },
    removeAll() {
      const viewer = window.earth;
      try {
        viewer.entities.removeById("wrth");
        viewer.entities.removeById("oj");
        viewer.entities.removeById("fyj");
        viewer.entities.removeById("ruian");
        viewer.entities.removeById("tangxia");
        viewer.entities.removeById("xianyan");
        viewer.entities.removeById("liao");
        viewer.entities.removeById("chshan");
        viewer.entities.removeById("wenzhoushiqu");
      } catch (e) {
        console.log(e);
      }

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
