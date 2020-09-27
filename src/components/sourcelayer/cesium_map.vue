<template>
  <div class="cesiumContainer">
    <div id="cesiumContainer" />
    <div v-if="mapLoaded">
      <TotalTarget ref="totalTarget" v-show="isTotalTarget" />
<!--      <ProjectSummary></ProjectSummary>-->
<!--            <RightSummary />-->
      <!-- <ProjectSummary v-show="isProjectSummary" /> -->
      <!-- <SightSummary v-show="isSightSummary" /> -->
      <!-- <RoadLine ref="roadline" /> -->
      <LayerHub ref="layerhub" />
      <!-- <DetailPopup ref="detailPopup" /> -->
      <DetailPopup2 ref="detailPopup" />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
import TotalTarget from "./totalTarget/totalTarget";
import ProjectSummary from "./projectSummary/projectSummary";
import SightSummary from "./sightSummary/sightSummary";
import RightSummary from "./rightSummary/rightSummary"
import RoadLine from "./extraModel/PolylineTrailLink/RoadLine";
import LayerHub from "./layerHub/layerHub";
import DetailPopup from "./commonFrame/DetailPopup/DetailPopup";
import DetailPopup2 from "./commonFrame/DetailPopup2/DetailPopup2";
import { getCurrentExtent, isContainByExtent } from "./commonFrame/mapTool";
import { mapGetters, mapActions } from "vuex";
const LAYERS = ServiceUrl.SCENE_WZMODEL;
const Cesium = window.Cesium;

export default {
  components: {
    TotalTarget,
    ProjectSummary,
    SightSummary,
    RoadLine,
    LayerHub,
    DetailPopup,
    DetailPopup2,
    RightSummary
  },
  data() {
    return {
      mapLoaded: false,
      imagelayer: {
        2018: undefined,
        2019: undefined
      },
      datalayer: {
        white: undefined,
        black: undefined
      },
      lvdaolayer: undefined,
      thfwmlayer: undefined,
      handler: undefined,
      isTotalTarget: true,
      isProjectSummary: false,
      isSightSummary: false,
      sceneLayers: []
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
    this.hide(this);
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
          // if (~pick.id.id.indexOf("项目_")) {
          //   this.$bus.$emit("cesium-projectClick", {
          //     extra_data: pick.id.extra_data,
          //   });
          // }
          // if (~pick.id.id.indexOf("断点_")) {
          //   this.$bus.$emit("cesium-kadianClick", {
          //     extra_data: pick.id.extra_data,
          //   });
          // }
          // this.$bus.$emit("cesium-kadianClick", {
          //     extra_data: pick.id.extra_data,
          //   });
          if (pick.id.extra_data) {
            this.$refs.detailPopup.getForceEntity({
              extra_data: pick.id.extra_data,
              fix_data: pick.id.fix_data,
              position: pick.id._position._value,
            });
          }
          this.$refs.layerhub.showHub = false
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    eventRegsiter() {
      this.$bus.$off("cesium-layer-switch");
      this.$bus.$on("cesium-layer-switch", ({ type, value }) => {
        //  底图切换
        console.log("layer-switch");
        if (type == "yx") {
          console.log("yx", value, ServiceUrl.SWImage);
          this.imagelayer[2018] && (this.imagelayer[2018].show = false);
          this.imagelayer[2019] && (this.imagelayer[2019].show = false);
          this.datalayer.white && (this.datalayer.white.show = false);
          this.datalayer.black && (this.datalayer.black.show = false);
          this.imagelayer[value]
            ? (this.imagelayer[value].show = true)
            : (this.imagelayer[value] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: ServiceUrl.SWImage[value],
                })
              ));
          // this.lipai();
          // this.quan();
        } else {
          // this.removeAll();
          console.log("vector", value, ServiceUrl.DataImage);
          this.imagelayer[2018] && (this.imagelayer[2018].show = false);
          this.imagelayer[2019] && (this.imagelayer[2019].show = false);
          this.datalayer.white && (this.datalayer.white.show = false);
          this.datalayer.black && (this.datalayer.black.show = false);
          this.datalayer[value]
            ? (this.datalayer[value].show = true)
            : (this.datalayer[value] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: ServiceUrl.DataImage[value],
                })
              ));
        }
      });
      // this.$bus.$off("cesium-lvdao-switch");
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
          // Cesium.when(baimoPromise, async ([forceLayer, ...oLayer]) => {
          //   const LAYER = window.earth.scene.layers.find("baimo");
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
          //   colorTable.insert(
          //     0,
          //     new Cesium.Color(13 / 255, 24 / 255, 45 / 255)
          //   );
          //   hyp.ColorTable = colorTable;
          //   hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
          //   hyp.Opacity = 1;
          //   //  贴图纹理
          //   hyp.emissionTextureUrl = "/static/images/area/speedline.png";
          //   hyp.emissionTexCoordUSpeed = 0.2;
          //   LAYER.hypsometricSetting = {
          //     hypsometricSetting: hyp,
          //     analysisMode:
          //       Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL,
          //   };
          //   // LAYER.visibleDistanceMax = 5000;
          // });
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

      this.imagelayer[2019] = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.SWImage[2019],
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

      this.lvdaolayer = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.LVDAOImage,
        })
      )

      this.thfwmlayer = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.TANGHEFWM,
        })
      )
      this.thfwmlayer.alpha = 0.5;

      // const PROMISES = LAYERS.map((v) => {
      //   return window.earth.scene.addS3MTilesLayerByScp(v.url, {
      //     name: v.key,
      //   });
      // });
      // //  精模服务暂有问题，先用setTimeout代替promise处理可见
      // setTimeout(() => {
      //   LAYERS.map((v) => {
      //     const V_LAYER = window.earth.scene.layers.find(v.key);
      //     V_LAYER.visibleDistanceMax = v.d || 1400;
      //   });
      // }, 4000);

      // window.earth.scene.open("http://172.168.3.183:8090/iserver/services/3D-ldplus_xi/rest/realspace")
      var promise = window.earth.scene.open('http://172.168.3.183:8090/iserver/services/3D-all/rest/realspace');
      Cesium.when(promise, async (layers) => {
        this.sceneLayers = layers.slice(1)
      });


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
      this.lp(120.727729,28.010275,"oj",'static/images/瓯江.png',65,65);
      this.lp(120.599327,27.789995,"fyj",'static/images/飞云江.png',75,75);
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
      const entitys = viewer.entities.getById(id);
      if (!!entitys){
        return;
      }
      var rr1 = 0;
      var rr =0;
      var ss1 = 0;
      var ss = 0;
      var deviationR = 20;
      var MaxR = 3000;
      // debugger;
      this.$nextTick(()=>{
        viewer.entities.add({
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
            // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000,Number.MAX_VALUE),
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
              // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(20000,Number.MAX_VALUE),
            },
          });
        },5000);
      });
      this.lp(lon,lat,`${id}p`,img,60,60,600);

    },
    lp(lon,lat,id,img,width,height,high){
      const viewer = window.earth;
      const entity = viewer.entities.getById(id);
      if (!!entity){
        return;
      }
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
    removeAll(value) {
      const viewer = window.earth;
      const id = ["ruian","tangxia","liao","chshan","wenzhoushiqu","xianyan"];
      const idOther = ["wrth","oj","fyj"];
      // const temp = !this.biaoshi;
      // console.log(temp);
      try {
        id.forEach(function (element) {
          viewer.entities.getById(element).show = value;
          viewer.entities.getById(`${element}1`).show=value;
          viewer.entities.getById(`${element}p`).show=value;
        });
        idOther.forEach(function (element) {
          viewer.entities.getById(element).show=value;
        });
        // this.biaoshi = temp;
        // console.log(this.biaoshi);
      } catch (e) {
        console.log(e);
      }
    },
    hide(self){
      const viewer = window.earth;
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function(wheelment) {
        var height=viewer.camera.positionCartographic.height;
        if (height<10000){
          self.removeAll(false)
        }else {
          self.removeAll(true);
        }
      }, Cesium.ScreenSpaceEventType.WHEEL);
    },
    switchLvdao(value) {
      this.lvdaolayer.show = value
    },
    switchThfwmlayer(value) {
      this.thfwmlayer.show = value
    },
    switchThyx(value) {
      console.log('switchThyx')
      var layer = window.earth.scene.layers.find('十二景@th_zy#1_1')
      layer && (layer.visible = value)
      this.sceneLayers.forEach(item => {
        item.show = value
      })
    }
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
