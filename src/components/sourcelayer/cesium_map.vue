<template>
  <div class="cesiumContainer">
    <div id="cesiumContainer" />
    <div v-if="mapLoaded && currentPage == 'sourcelayer'">
      <SourceLayerHub ref="sourceLayerHub" />
      <CommonDetailPopup ref="commonDetailPopup" />
      <ProjectDetailPopup ref="projectDetailPopup" />
      <SearchDetail ref="searchDetail" />
      <SejPopup ref="SejPopup" />
    </div>
    <div v-if="mapLoaded && currentPage == 'compare'">
      <CompareLayerHub ref="compareLayerHub" />
      <CommonDetailPopup ref="commonDetailPopup" />
      <ProjectDetailPopup ref="projectDetailPopup" />
      <SearchDetail ref="searchDetail" />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
// import RoadLine from "./extraModel/PolylineTrailLink/RoadLine";
import SourceLayerHub from "./layerHub/layerHub";
import CompareLayerHub from "../compare/layerHub/layerHub";
import CommonDetailPopup from "./commonFrame/CommonDetailPopup/CommonDetailPopup";
import ProjectDetailPopup from "./commonFrame/ProjectDetailPopup/ProjectDetailPopup";
import SejPopup from "./commonFrame/SejPopup/SejPopup";
import SearchDetail from "./commonFrame/CommonDetailPopup/searchDetail";
import { getCurrentExtent, isContainByExtent } from "./commonFrame/mapTool";
import {
  initMapConfig,
  mapImageLayerInit,
  mapBaimoLayerInit,
  mapWmtsLayerInit,
} from "./cesium_map_init";
import { addWhiteLabel, addBlackLabel } from "./layerHub/TreeDrawTool";
import { mapGetters, mapActions } from "vuex";
const LAYERS = ServiceUrl.SCENE_WZMODEL;
const Cesium = window.Cesium;

export default {
  name: "CesiumMap",
  components: {
    // RoadLine,
    SourceLayerHub,
    CompareLayerHub,
    CommonDetailPopup,
    ProjectDetailPopup,
    SejPopup,
    SearchDetail,
  },
  data() {
    return {
      mapLoaded: false,
      imagelayer: {
        2018: undefined,
        2019: undefined,
        // mark: undefined,
        roadLine: undefined,
      },
      datalayer: {
        white: undefined,
        black: undefined,
      },
      lvdaoShow: true,
      tanghe: undefined,
      tangheFG: undefined,
      lvdaolayerThin: undefined,
      lvdaolayerBold: undefined,
      thfwmlayer: undefined,
      xzjxqxlayer: undefined,
      xzjxqxmlayer: undefined,
      xzjxjdlayer: undefined,
      blackMark: undefined,
      handdrawnlayer: undefined,
      wmtsLC: undefined,
      sceneLayers: [],
      cameraHeight: 5000,
      showLarge: window.showLarge,
    };
  },
  computed: {
    ...mapGetters("map", ["bufferQueryData"]),
    currentPage() {
      // vue中获取当前路由name
      return this.$route.name;
    },
  },
  created() {
    //  点位信息 hash
    window.featureMap = {};
    //  点位icon hash
    window.billboardMap = {};
    //  点位浅色label hash
    window.whiteLabelMap = {};
    //  点位深色label hash
    window.blackLabelMap = {};
    // 当前底图
    window.currentMapType = "vectorwhite";
  },
  async mounted() {
    this.init3DMap(() => {
      this.mapLoaded = true;
      this.initPostRender();
      this.initHandler();
    });
    this.eventRegsiter();

    this.createEntityCollection();
  },
  methods: {
    ...mapActions("map", ["SetBufferQueryData"]),
    initPostRender() {
      window.earth.scene.postRender.addEventListener(() => {
        if (!window.earth || !this.mapLoaded || !Object.keys(this.$refs).length)
          return;
        //  *****[detailPopup]  详情查看点位*****
        // if (this.$refs.commonDetailPopup) {
        // this.$refs.commonDetailPopup.renderForceEntity();
        // }
        //  *****[bayonetList] 十二景名称点位*****
        if (this.$refs.SejPopup) {
          this.$refs.SejPopup.fixPopup();
        }
      });
    },
    initHandler() {
      const handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      // 监听左键点击事件
      handler.setInputAction((e) => {
        const pick = window.earth.scene.pick(e.position);
        console.log("pick", pick);
        if (!pick || !pick.id) return;
        if (typeof pick.id == "string") {
          const [_TYPE_, _SMID_, _NODEID_] = pick.id.split("@");
          // *****[detailPopup]  资源详情点*****
          if (~["label", "billboard"].indexOf(_TYPE_)) {
            // 定位图标
            const geometry = window.featureMap[_NODEID_][_SMID_].geometry;
            this.addLocationIcon(geometry, _NODEID_);

            this.$refs.searchDetail && (this.$refs.searchDetail.showZB = false);

            if (~_NODEID_.indexOf("项目") || _NODEID_ == "绿道断点") {
              this.$refs.projectDetailPopup.getForceEntity({
                ...window.featureMap[_NODEID_][_SMID_],
                position: pick.primitive.position,
                id: pick.id,
              });

              // 关闭详情的查看周边面板
              this.$refs.projectDetailPopup.closeCollapse();
              this.$refs.commonDetailPopup.closePopup();
            } else {
              // 跳过查看详情步骤
              this.$refs.commonDetailPopup.goDetail({
                ...window.featureMap[_NODEID_][_SMID_],
                position: pick.primitive.position,
              });

              if (
                _NODEID_ == "shipin" ||
                _NODEID_ == "quanjin" ||
                _NODEID_ == "jiankong"
              ) {
                this.drawProjectCircle(
                  {
                    ...window.featureMap[_NODEID_][_SMID_],
                  },
                  pick.id
                );
                this.$refs.searchDetail.getForceEntity({
                  ...window.featureMap[_NODEID_][_SMID_],
                  position: pick.primitive.position,
                });
                setTimeout(() => {
                  this.$refs.searchDetail.getdata(this.bufferQueryData);
                  console.log("bufferQueryData", this.bufferQueryData);
                }, 500);
              }

              this.$refs.projectDetailPopup.closeInfo();
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 监听鼠标滚轮事件
      handler.setInputAction((wheelment) => {
        this.cameraHeight = window.earth.camera.positionCartographic.height;
        if (this.lvdaoShow) {
          if (this.cameraHeight >= 5000) {
            this.tangheFG.show = true;
            this.tanghe && (this.tanghe.show = false);
            this.lvdaolayerThin.show = true;
            this.lvdaolayerBold && (this.lvdaolayerBold.show = false);
          } else {
            this.tangheFG.show = false;
            this.tanghe
              ? (this.tanghe.show = true)
              : (this.tanghe = mapImageLayerInit(ServiceUrl.TANGHE2D));
            this.lvdaolayerThin.show = false;
            this.lvdaolayerBold
              ? (this.lvdaolayerBold.show = true)
              : (this.lvdaolayerBold = mapImageLayerInit(
                  ServiceUrl.LVDAOImage.BOLD
                ));
          }
        }
      }, Cesium.ScreenSpaceEventType.WHEEL);
    },
    eventRegsiter() {
      this.$bus.$off("cesium-layer-switch");
      this.$bus.$on("cesium-layer-switch", ({ type, value }) => {
        //  底图切换
        if (type == "yx") {
          console.log("yx", value, ServiceUrl.SWImage, this.imagelayer);
          this.imagelayer[2018] && (this.imagelayer[2018].show = false);
          this.imagelayer[2019] && (this.imagelayer[2019].show = false);
          this.datalayer.white && (this.datalayer.white.show = false);
          this.datalayer.black && (this.datalayer.black.show = false);
          this.blackMark && (this.blackMark.show = false);
          this.imagelayer[value]
            ? (this.imagelayer[value].show = true)
            : (this.imagelayer[value] = mapImageLayerInit(
                ServiceUrl.SWImage[value]
              ));

          // 深色注记
          this.blackMark
            ? (this.blackMark.show = true)
            : (this.blackMark = mapImageLayerInit(ServiceUrl.BlackMark));
          this.blackMark.alpha = 0.8;
          // 影像道路线
          this.imagelayer["roadLine"]
            ? (this.imagelayer["roadLine"].show = true)
            : (this.imagelayer["roadLine"] = mapImageLayerInit(
                ServiceUrl.RoadLine
              ));
          this.imagelayer["roadLine"].alpha = 0.3;

          window.earth.imageryLayers.lowerToBottom(this.imagelayer[value]);
          window.currentMapType = "yx";
        } else {
          // this.removeAll();
          console.log("vector", value, ServiceUrl.DataImage);
          this.imagelayer[2018] && (this.imagelayer[2018].show = false);
          this.imagelayer[2019] && (this.imagelayer[2019].show = false);
          this.imagelayer["roadLine"] &&
            (this.imagelayer["roadLine"].show = false);
          this.datalayer.white && (this.datalayer.white.show = false);
          this.datalayer.black && (this.datalayer.black.show = false);
          this.blackMark && (this.blackMark.show = false);
          this.datalayer[value]
            ? (this.datalayer[value].show = true)
            : (this.datalayer[value] = mapImageLayerInit(
                ServiceUrl.DataImage[value]
              ));
          if (value == "black") {
            this.blackMark
              ? (this.blackMark.show = true)
              : (this.blackMark = mapImageLayerInit(ServiceUrl.BlackMark));
            this.blackMark.alpha = 0.8;
          }
          window.earth.imageryLayers.lowerToBottom(this.datalayer[value]);
          window.currentMapType = `vector${value}`;
        }
        // 切换底图时，地图上label颜色切换
        if (window.currentMapType == "vectorwhite") {
          for (let key in window.blackLabelMap) {
            if (window.blackLabelMap[key]._labels.length) {
              window.blackLabelMap[key].setAllLabelsVisible(true);
            } else {
              for (let innerkey in window.featureMap[key]) {
                addBlackLabel(key, window.featureMap[key][innerkey]);
              }
            }
            window.whiteLabelMap[key].setAllLabelsVisible(false);
          }
        } else {
          for (let key in window.whiteLabelMap) {
            if (window.whiteLabelMap[key]._labels.length) {
              window.whiteLabelMap[key].setAllLabelsVisible(true);
            } else {
              for (let innerkey in window.featureMap[key]) {
                addWhiteLabel(key, window.featureMap[key][innerkey]);
              }
            }
            window.blackLabelMap[key].setAllLabelsVisible(false);
          }
        }
      });
      this.$bus.$off("cesium-3d-switch");
      this.$bus.$on("cesium-3d-switch", ({ type, value }) => {
        // 白模切换
        if (type === "baimo") {
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
            });
          }
        }
        // if (type === "jingmo") {
        //   const _LAYER_ = window.earth.scene.layers.find(LAYERS[0].key);
        //   if (_LAYER_) {
        //     LAYERS.map((v) => {
        //       const V_LAYER = window.earth.scene.layers.find(v.key);
        //       V_LAYER.visible = value;
        //     });
        //   } else {
        //     const PROMISES = LAYERS.map((v) => {
        //       return window.earth.scene.addS3MTilesLayerByScp(v.url, {
        //         name: v.key,
        //       });
        //     });
        //     //  精模服务暂有问题，先用setTimeout代替promise处理可见
        //     setTimeout(() => {
        //       LAYERS.map((v) => {
        //         const V_LAYER = window.earth.scene.layers.find(v.key);
        //         V_LAYER.visibleDistanceMax = v.d || 1400;
        //       });
        //     }, 4000);
        //   }
        // }
      });

      // this.$bus.$off("remove-texiao");
      // this.$bus.$on("remove-texiao", ({ value }) => {
      //   this.removeAll(value);
      // });

      this.$bus.$off("switch-lvdao");
      this.$bus.$on("switch-lvdao", ({ value }) => {
        this.lvdaoShow = value;
        if (value) {
          if (this.cameraHeight >= 5000) {
            this.lvdaolayerThin.show = true;
            this.lvdaolayerBold && (this.lvdaolayerBold.show = false);
          } else {
            this.lvdaolayerThin.show = false;
            this.lvdaolayerBold
              ? (this.lvdaolayerBold.show = true)
              : (this.lvdaolayerBold = mapImageLayerInit(
                  ServiceUrl.LVDAOImage.BOLD
                ));
          }
        } else {
          this.lvdaolayerThin.show = false;
          this.lvdaolayerBold && (this.lvdaolayerBold.show = false);
        }
      });

      // 塘河范围面
      this.$bus.$off("switch-thfwm");
      this.$bus.$on("switch-thfwm", ({ value }) => {
        if (value) {
          this.thfwmlayer
            ? (this.thfwmlayer.show = true)
            : (this.thfwmlayer = mapImageLayerInit(ServiceUrl.TANGHEFWM));
          this.thfwmlayer.alpha = 0.7;
        } else {
          this.thfwmlayer.show = false;
        }
      });

      // 行政区县
      this.$bus.$off("switch-xzjxqx");
      this.$bus.$on("switch-xzjxqx", ({ value }) => {
        if (value) {
          this.xzjxqxmlayer
            ? (this.xzjxqxmlayer.show = true)
            : (this.xzjxqxmlayer = mapImageLayerInit(ServiceUrl.XZJXQXM));
          this.xzjxqxmlayer.alpha = 0.5;
          this.xzjxqxlayer
            ? (this.xzjxqxlayer.show = true)
            : (this.xzjxqxlayer = mapImageLayerInit(ServiceUrl.XZJXQX));
        } else {
          this.xzjxqxlayer.show = false;
          this.xzjxqxmlayer.show = false;
        }
      });

      // 行政街道
      this.$bus.$off("switch-xzjxjd");
      this.$bus.$on("switch-xzjxjd", ({ value }) => {
        if (value) {
          this.xzjxjdlayer
            ? (this.xzjxjdlayer.show = true)
            : (this.xzjxjdlayer = mapImageLayerInit(ServiceUrl.XZJXJD));
        } else {
          this.xzjxjdlayer.show = false;
        }
      });

      this.$bus.$off("clickFly");
      this.$bus.$on("clickFly", () => {
        this.tangheFG && (this.tangheFG.show = false);
        this.tanghe
          ? (this.tanghe.show = true)
          : (this.tanghe = mapImageLayerInit(ServiceUrl.TANGHE2D));
        this.lvdaolayerThin && (this.lvdaolayerThin.show = false);
        this.lvdaolayerBold && (this.lvdaolayerBold.show = true);
      });
    },
    init3DMap(fn) {
      const that = this;
      const viewer = new Cesium.Viewer("cesiumContainer", {
        skyBox: false,
        infoBox: false,
        selectionIndicator: false,
        shadows: false, //  内存吃不消
      });
      window.earth = viewer;

      // 地图初始配置
      initMapConfig();

      if (this.currentPage == "sourcelayer") {
        // 矢量日景
        this.datalayer.white = mapImageLayerInit(ServiceUrl.DataImage.white);
      }
      if (this.currentPage == "compare") {
        // 2019影像图
        this.imagelayer[2019] = mapImageLayerInit(ServiceUrl.SWImage[2019]);
      }

      // 塘河发光
      this.tangheFG = mapImageLayerInit(ServiceUrl.TANGHEFG);

      // 绿道细
      this.lvdaolayerThin = mapImageLayerInit(ServiceUrl.LVDAOImage.THIN);

      // window.earth.scene.open("http://172.168.3.183:8090/iserver/services/3D-ldplus_xi/rest/realspace")
      // var promise = window.earth.scene.open('http://172.168.3.183:8090/iserver/services/3D-all/rest/realspace');
      // Cesium.when(promise, async (layers) => {
      //   this.sceneLayers = layers.slice(1)
      // });

      // 移除缓冲圈
      $(".cesium-widget-credits").hide();
      viewer.scene.globe.depthTestAgainstTerrain = false;
      this.cameraMove();
      // this.fly();
      fn && fn();
    },
    cameraMove() {
      window.earth.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          120.67625660935506,
          27.990332018707733,
          15000.0
        ),
        orientation: {
          heading: 0.01768860454315663,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0,
        },
      });
    },
    // fly() {
    //   const routes = new Cesium.RouteCollection(window.earth.entities);
    //   routes.fromFile("./static/fpf/首页飞行.fpf");
    //   //初始化飞行管理
    //   const flyManager = new Cesium.FlyManager({
    //     scene: window.earth.scene,
    //     routes: routes,
    //   });
    //   flyManager.readyPromise.then(function () {
    //     // 飞行路线就绪
    //     flyManager.play();
    //   });
    // },
    // lipai() {
    //   this.lp(120.707729, 28.010275, "oj", "static/images/瓯江.png", 65, 65);
    //   this.lp(120.599327, 27.789995, "fyj", "static/images/飞云江.png", 75, 75);
    //   this.lp(120.726, 27.899, "wrth", "static/images/温瑞塘河.png", 130, 130);
    // },
    // quan() {
    //   this.texiao(120.649, 27.786, "ruian", "static/images/瑞安.png");
    //   this.texiao(120.72, 27.822, "tangxia", "static/images/塘下.png");
    //   this.texiao(120.684, 27.88, "xianyan", "static/images/仙岩.png");
    //   this.texiao(120.646, 27.921, "liao", "static/images/丽岙.png");
    //   this.texiao(120.7, 27.942, "chshan", "static/images/茶山.png");
    //   this.texiao(
    //     120.649,
    //     27.972,
    //     "wenzhoushiqu",
    //     "static/images/温州市区.png"
    //   );
    // },
    // texiao(lon, lat, id, img) {
    //   const viewer = window.earth;
    //   const entitys = viewer.entities.getById(id);
    //   if (!!entitys) {
    //     return;
    //   }
    //   var rr1 = 0;
    //   var rr = 0;
    //   var ss1 = 0;
    //   var ss = 0;
    //   var deviationR = 4;
    //   var MaxR = 900;
    //   // debugger;
    //   this.$nextTick(() => {
    //     viewer.entities.add({
    //       id: id,
    //       position: Cesium.Cartesian3.fromDegrees(lon, lat, 50),
    //       show: false,
    //       ellipse: {
    //         semiMinorAxis: new Cesium.CallbackProperty(function () {
    //           var r1 = rr; //指定扩散圆的最小半径，maxR为扩散圆的最大半径
    //           r1 = r1 + deviationR; //deviationR为每次圆增加的大小
    //           if (r1 >= MaxR) {
    //             r1 = 0;
    //           }
    //           rr = r1;
    //           return r1;
    //         }, false),
    //         semiMajorAxis: new Cesium.CallbackProperty(function () {
    //           var r1 = rr1; //指定扩散圆的最小半径，maxR为扩散圆的最大半径
    //           r1 = r1 + deviationR; //deviationR为每次圆增加的大小
    //           if (r1 >= MaxR) {
    //             r1 = 0;
    //           }
    //           rr1 = r1;
    //           return r1;
    //         }, false),
    //         height: 10,
    //         material: new Cesium.ImageMaterialProperty({
    //           image: "static/images/1.png",
    //           transparent: true,
    //         }),
    //         // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000,Number.MAX_VALUE),
    //       },
    //     });
    //     setTimeout(function () {
    //       viewer.entities.add({
    //         id: `${id}1`,
    //         position: Cesium.Cartesian3.fromDegrees(lon, lat, 10),
    //         show: false,
    //         ellipse: {
    //           semiMinorAxis: new Cesium.CallbackProperty(function () {
    //             var r1 = ss; //指定扩散圆的最小半径，maxR为扩散圆的最大半径
    //             r1 = r1 + deviationR; //deviationR为每次圆增加的大小
    //             if (r1 >= MaxR) {
    //               r1 = 0;
    //             }
    //             ss = r1;
    //             return r1;
    //           }, false),
    //           semiMajorAxis: new Cesium.CallbackProperty(function () {
    //             var r1 = ss1; //指定扩散圆的最小半径，maxR为扩散圆的最大半径
    //             r1 = r1 + deviationR; //deviationR为每次圆增加的大小
    //             if (r1 >= MaxR) {
    //               r1 = 0;
    //             }
    //             ss1 = r1;
    //             return r1;
    //           }, false),
    //           height: 10,
    //           material: new Cesium.ImageMaterialProperty({
    //             image: "static/images/1.png",
    //             transparent: true,
    //           }),
    //           // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(20000,Number.MAX_VALUE),
    //         },
    //       });
    //     }, 4000);
    //   });
    //   this.lp(lon, lat, `${id}p`, img, 60, 60, 600);
    // },
    // lp(lon, lat, id, img, width, height, high) {
    //   const viewer = window.earth;
    //   const entity = viewer.entities.getById(id);
    //   if (!!entity) {
    //     return;
    //   }
    //   viewer.entities.add({
    //     id: id,
    //     position: Cesium.Cartesian3.fromDegrees(lon, lat, high || 100),
    //     show: false,
    //     billboard: {
    //       image: img,
    //       width: width,
    //       height: height,
    //       disableDepthTestDistance: Number.POSITIVE_INFINITY,
    //       // translucencyByDistance: new Cesium.NearFarScalar(7000, 0, 8000, 1)
    //     },
    //   });
    // },
    // removeAll(value) {
    //   const viewer = window.earth;
    //   const id = [
    //     "ruian",
    //     "tangxia",
    //     "liao",
    //     "chshan",
    //     "wenzhoushiqu",
    //     "xianyan",
    //   ];
    //   const idOther = ["wrth", "oj", "fyj"];
    //   try {
    //     id.forEach(function (element) {
    //       viewer.entities.getById(element).show = value;
    //       viewer.entities.getById(`${element}1`).show = value;
    //       viewer.entities.getById(`${element}p`).show = value;
    //     });
    //     idOther.forEach(function (element) {
    //       viewer.entities.getById(element).show = value;
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    // 切换手绘地图
    switchHanddrawn(show) {
      if (show) {
        this.handdrawnlayer
          ? (this.handdrawnlayer.show = true)
          : (this.handdrawnlayer = mapImageLayerInit(ServiceUrl.HANDDRAWN));
      } else {
        this.handdrawnlayer.show = false;
      }
    },

    // 切换2.5维底图
    switchWmts(show, value) {
      if (show) {
        if (value == "2.5DLC") {
          this.wmtsLC
            ? (this.wmtsLC.show = true)
            : (this.wmtsLC = mapWmtsLayerInit(
                "wmtsLC",
                "http://61.164.104.154:80/iserver/services/3dmap/wmts"
              ));
        }
        // 图层排序，防止被覆盖
        this.tanghe && window.earth.imageryLayers.raiseToTop(this.tanghe);
        this.tangheFG && window.earth.imageryLayers.raiseToTop(this.tangheFG);
        this.lvdaolayerThin &&
          window.earth.imageryLayers.raiseToTop(this.lvdaolayerThin);
        this.lvdaolayerBold &&
          window.earth.imageryLayers.raiseToTop(this.lvdaolayerBold);
      } else {
        this.wmtsLC && (this.wmtsLC.show = false);
      }
    },

    // 创建datasource
    createEntityCollection() {
      // 项目
      const ProjectCircleEntityCollection = new Cesium.CustomDataSource(
        "project"
      );
      window.earth.dataSources.add(ProjectCircleEntityCollection);

      // 定位
      const locationEntityCollection = new Cesium.CustomDataSource("location");
      window.earth.dataSources.add(locationEntityCollection);
    },

    // 添加定位图标
    addLocationIcon(geometry, id) {
      const datasource = window.earth.dataSources.getByName("location")[0];
      datasource.entities.removeAll();

      const { x, y } = geometry;
      const locationEntity = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(x, y, 4),
        billboard: {
          image: `/static/images/map-ico/location.png`,
          width: 34,
          height: 35,
          scaleByDistance: new Cesium.NearFarScalar(3000, 1.5, 6000, 1.2),
          pixelOffset: new Cesium.Cartesian2(0, -15),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        id,
      });

      datasource.entities.add(locationEntity);
    },

    // 画缓冲区
    async drawProjectCircle({ geometry }, id) {
      // 清除原有图形
      this.removeProjectCircle();
      const { x, y } = geometry;

      const datasource = window.earth.dataSources.getByName("project")[0];
      const circleEntity = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(x, y, 0),
        ellipse: {
          semiMinorAxis: 200,
          semiMajorAxis: 200,
          height: 0,
          material: Cesium.Color.YELLOW.withAlpha(0.2),
          outline: true,
          outlineWidth: 3,
          outlineColor: Cesium.Color.WHITE,
        },
        id,
      });
      datasource.entities.add(circleEntity);

      const point = new SuperMap.Geometry.Point(x, y);
      this.bufferQuery(point);
    },

    // 删除缓冲区，无id删除全部
    removeProjectCircle(id) {
      const datasource = window.earth.dataSources.getByName("project")[0];
      id ? datasource.entities.removeById(id) : datasource.entities.removeAll();
    },

    // 缓冲查询
    bufferQuery(geometryArgs) {
      this.SetBufferQueryData({});
      // 查询
      this.singleQuery(geometryArgs, "项目");
      this.singleQuery(geometryArgs, "绿道断点");
      this.singleQuery(geometryArgs, "quanjin");
      this.singleQuery(geometryArgs, "shipin");
      this.singleQuery(geometryArgs, "scenic_spot");
      this.singleQuery(geometryArgs, "jiaotong");
      this.singleQuery(geometryArgs, "toilet");
      this.singleQuery(geometryArgs, "wharf");
      this.singleQuery(geometryArgs, "bridge");

      // 延时获取异步数据
      setTimeout(() => {
        this.$refs.projectDetailPopup.getdata(this.bufferQueryData);
      }, 500);
    },

    // 单个查询
    singleQuery(geometryArgs, dataset) {
      const baseUrl =
        "http://172.168.3.183:8090/iserver/services/data-alldata/rest/data";
      let getFeatureParameter, getFeatureService;
      getFeatureParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
        // 缓冲距离单位疑似十万米！！！图形单位米！！！
        bufferDistance: 0.002,
        toIndex: -1,
        datasetNames: [`172.168.3.181_thxm:${dataset}`],
        returnContent: true,
        geometry: geometryArgs,
      });
      getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(
        baseUrl,
        {
          eventListeners: {
            processCompleted: async (res) => {
              if (
                res.result &&
                res.result.features &&
                res.result.features.length
              ) {
                const obj = this.bufferQueryData;
                res.result.features.map((v) => {
                  return Object.assign(v, { type: dataset });
                });
                obj[dataset] = res.result.features;
                this.SetBufferQueryData(obj);
              }
            },
            processFailed: (msg) => console.log(msg),
          },
        }
      );
      getFeatureService.processAsync(getFeatureParameter);
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
