<template>
  <div class="cesiumContainer">
    <div id="cesiumContainer" />
    <div v-if="mapLoaded">
      <Summary />
      <LayerHub ref="layerhub" />
      <CommonDetailPopup ref="commonDetailPopup" />
      <ProjectDetailPopup ref="projectDetailPopup" />
      <searchDetail ref="searchDetail" />
      <SejPopup ref="SejPopup" />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
import TotalTarget from "./totalTarget/totalTarget";
import Summary from "./summary/summary"
import RoadLine from "./extraModel/PolylineTrailLink/RoadLine";
import LayerHub from "./layerHub/layerHub";
import CommonDetailPopup from "./commonFrame/CommonDetailPopup/CommonDetailPopup";
import ProjectDetailPopup from "./commonFrame/ProjectDetailPopup/ProjectDetailPopup";
import SejPopup from "./commonFrame/SejPopup/SejPopup";
import searchDetail from "./commonFrame/CommonDetailPopup/searchDetail";
import { getCurrentExtent, isContainByExtent } from "./commonFrame/mapTool";
import { mapGetters, mapActions } from "vuex";
const LAYERS = ServiceUrl.SCENE_WZMODEL;
const Cesium = window.Cesium;

export default {
  components: {
    TotalTarget,
    RoadLine,
    LayerHub,
    CommonDetailPopup,
    ProjectDetailPopup,
    SejPopup,
    Summary,
    searchDetail
  },
  data() {
    return {
      mapLoaded: false,
      imagelayer: {
        2018: undefined,
        2019: undefined,
        mark: undefined
      },
      datalayer: {
        white: undefined,
        black: undefined
      },
      lvdaoShow: true,
      tanghe: undefined,
      tangheFG: undefined,
      lvdaolayerThin: undefined,
      lvdaolayerBold: undefined,
      thfwmlayer: undefined,
      xzjxqxlayer: undefined,
      xzjxjdlayer: undefined,
      handdrawnlayer: undefined,
      handler: undefined,
      isTotalTarget: true,
      showSummary: 'total',
      sceneLayers: [],
      cameraHeight: 3000,
      showLarge: window.showLarge,
    };
  },
  computed: {
    ...mapGetters("map", ["bufferQueryData"]),
  },
  created() {
    // this.getKuanGao();
    //  点位信息 hash
    window.featureMap = {};
    //  点位icon hash
    window.billboardMap = {};
    //  点位浅色label hash
    window.whiteLabelMap = {};
    //  点位深色label hash
    window.blackLabelMap = {};
    // 当前底图
    window.currentMapType = 'vectorwhite'
  },
  async mounted() {
    this.init3DMap(() => {
      this.mapLoaded = true;
      this.initPostRender();
      this.initHandler();
    });
    this.eventRegsiter();
    this.hide(this);

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
      this.handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      // 监听左键点击事件
      this.handler.setInputAction((e) => {
        const pick = window.earth.scene.pick(e.position);
        console.log("pick", pick);
        if (!pick || !pick.id) return;
        if (typeof pick.id == "string") {
          const [_TYPE_, _SMID_, _NODEID_] = pick.id.split("@");
          // *****[detailPopup]  资源详情点*****
          if (~["label", "billboard"].indexOf(_TYPE_)) {

            // 定位图标
            const geometry = window.featureMap[_NODEID_][_SMID_].geometry;
            this.addLocationIcon(geometry);

            if (~_NODEID_.indexOf('项目') || _NODEID_ == '断点') {

              // 画圆查询
              this.drawProjectCircle({
                ...window.featureMap[_NODEID_][_SMID_]
              }, pick.id);

              this.$refs.projectDetailPopup.getForceEntity({
                ...window.featureMap[_NODEID_][_SMID_],
                position: pick.primitive.position,
              });
              setTimeout(()=>{
                this.$refs.projectDetailPopup.getdata(this.bufferQueryData);
              },500);
              this.$refs.commonDetailPopup.closePopup()
            } else {

              // 跳过查看详情步骤
              this.$refs.commonDetailPopup.goDetail({
                ...window.featureMap[_NODEID_][_SMID_],
                position: pick.primitive.position,
              });

              if(~_NODEID_.indexOf('视频') || _NODEID_ == '全景'){
                this.drawProjectCircle({
                  ...window.featureMap[_NODEID_][_SMID_]
                }, pick.id);
                this.$refs.searchDetail.getForceEntity({
                  ...window.featureMap[_NODEID_][_SMID_],
                  position: pick.primitive.position,
                });
                setTimeout(()=>{
                  this.$refs.searchDetail.getdata(this.bufferQueryData);
                  console.log("bufferQueryData",this.bufferQueryData);
                },500);
              }

              this.$refs.projectDetailPopup.closeInfo()
            }
          }
        }
        // this.$refs.layerhub.showHub = false
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    eventRegsiter() {
      this.$bus.$off("cesium-layer-switch");
      this.$bus.$on("cesium-layer-switch", ({ type, value }) => {
        //  底图切换
        // console.log("layer-switch", window.whiteLabelMap, window.blackLabelMap);
        if (type == "yx") {
          console.log("yx", value, ServiceUrl.SWImage,this.imagelayer);
          this.imagelayer[2018] && (this.imagelayer[2018].show = false);
          this.imagelayer[2019] && (this.imagelayer[2019].show = false);

          this.imagelayer["mark"] && (this.imagelayer["mark"].show = false);
          this.datalayer.white && (this.datalayer.white.show = false);
          this.datalayer.black && (this.datalayer.black.show = false);
          this.imagelayer[value]
            ? (this.imagelayer[value].show = true)
            : (this.imagelayer[value] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: ServiceUrl.SWImage[value],
                })
              ));

          // 影像注记
          this.imagelayer["mark"]
            ? (this.imagelayer["mark"].show = true)
            : (this.imagelayer["mark"] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: ServiceUrl.ImageMark,
                })
              ));

          window.earth.imageryLayers.lowerToBottom(this.imagelayer[value])
          window.currentMapType = 'yx'
        } else {
          // this.removeAll();
          console.log("vector", value, ServiceUrl.DataImage);
          this.imagelayer[2018] && (this.imagelayer[2018].show = false);
          this.imagelayer[2019] && (this.imagelayer[2019].show = false);
          this.imagelayer["mark"] && (this.imagelayer["mark"].show = false);
          this.datalayer.white && (this.datalayer.white.show = false);
          this.datalayer.black && (this.datalayer.black.show = false);
          this.datalayer[value]
            ? (this.datalayer[value].show = true)
            : (this.datalayer[value] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: ServiceUrl.DataImage[value],
                })
              ));
          window.earth.imageryLayers.lowerToBottom(this.datalayer[value])
          window.currentMapType = `vector${value}`
        }
        if (window.currentMapType == 'vectorwhite') {
          for (let key in window.whiteLabelMap) {
            if (window.whiteLabelMap[key]._labels[0].show) {
              window.blackLabelMap[key].setAllLabelsVisible(true)
            }
            window.whiteLabelMap[key].setAllLabelsVisible(false)
          }
        } else {
          for (let key in window.whiteLabelMap) {
            if (window.blackLabelMap[key]._labels[0].show) {
              window.whiteLabelMap[key].setAllLabelsVisible(true)
            }
            window.blackLabelMap[key].setAllLabelsVisible(false)
          }
        }
      });
      this.$bus.$off("cesium-3d-switch");
      this.$bus.$on("cesium-3d-switch", ({ type, value }) => {
        // 白模切换
        if (type === 'baimo') {
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
            })
          }
        }
        if (type === 'jingmo') {
          const _LAYER_ = window.earth.scene.layers.find(LAYERS[0].key);
          if (_LAYER_) {
            LAYERS.map((v) => {
              const V_LAYER = window.earth.scene.layers.find(v.key);
              V_LAYER.visible = value;
            });
          } else {
            const PROMISES = LAYERS.map((v) => {
              return window.earth.scene.addS3MTilesLayerByScp(v.url, {
                name: v.key,
              });
            });
            //  精模服务暂有问题，先用setTimeout代替promise处理可见
            setTimeout(() => {
              LAYERS.map((v) => {
                const V_LAYER = window.earth.scene.layers.find(v.key);
                V_LAYER.visibleDistanceMax = v.d || 1400;
              });
            }, 4000);
          }
        }
      });

      this.$bus.$off("remove-texiao");
      this.$bus.$on("remove-texiao", ({ value }) => {
        this.removeAll(value)
      })

      this.$bus.$off("switch-lvdao");
      this.$bus.$on("switch-lvdao", ({ value }) => {
        this.lvdaoShow = value
        if (value) {
          if (this.cameraHeight >= 3000) {
            this.lvdaolayerThin.show = true
            this.lvdaolayerBold.show = false
          } else {
            this.lvdaolayerThin.show = false
            this.lvdaolayerBold.show = true
          }
        } else {
          this.lvdaolayerThin.show = false
          this.lvdaolayerBold.show = false
        }
      })

      this.$bus.$off("switch-thfwm");
      this.$bus.$on("switch-thfwm", ({ value }) => {
        this.thfwmlayer.show = value
      })

      // this.$bus.$off("switch-thyx");
      // this.$bus.$on("switch-thyx", ({ value }) => {
      //   const layer = window.earth.scene.layers.find('十二景@th_zy#1_1')
      //   layer && (layer.visible = value)
      //   this.sceneLayers.forEach(item => {
      //     item.show = value
      //   })
      // })

      this.$bus.$off("switch-xzjxqx");
      this.$bus.$on("switch-xzjxqx", ({ value }) => {
        this.xzjxqxlayer.show = value
      })

      this.$bus.$off("switch-xzjxjd");
      this.$bus.$on("switch-xzjxjd", ({ value }) => {
        this.xzjxjdlayer.show = value
      })
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

      // this.imagelayer[2019] = window.earth.imageryLayers.addImageryProvider(
      //   new Cesium.SuperMapImageryProvider({
      //     url: ServiceUrl.SWImage[2019],
      //   })
      // );

      this.datalayer.white = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.DataImage.white,
        })
      );


      /* this.datalayer.white = window.earth.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: "http://61.164.104.154:80/iserver/services/3dmap/wmts/3dmap/default/Custom_3dmap/{TileMatrix}/{TileRow}/{TileCol}.png",
          layer: "3dmap",
          style: "default",
          format: "image/png",
          tileMatrixSetID: "Custom_3dmap",
          tilingScheme: new Cesium.GeographicTilingScheme({
            numberOfLevelZeroTilesX: 1,
            numberOfLevelZeroTilesY: 1

          }),
          // subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          // maximumLevel: 18,
        })
      ); */


      // window.earth.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      //     url: "http://t0.tianditu.gov.cn/vec_w/wmts?tk=5c8b939368cb51f494b9472cd6ad74cc&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=vec&tilematrix={TileMatrix}&tilerow={TileRow}&tilecol={TileCol}",
      //     layer: "vec",
      //     style: "default",
      //     format: "tiles",
      //     tileMatrixSetID: "w",
      //     // credit: new Cesium.Credit("天地图全球影像服务"),
      //     subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      //     maximumLevel: 18,
      //   })
      // )
      // window.earth.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      //     url: "http://t0.tianditu.gov.cn/cva_w/wmts?tk=5c8b939368cb51f494b9472cd6ad74cc&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=cva&tilematrix={TileMatrix}&tilerow={TileRow}&tilecol={TileCol}",
      //     layer: "cva",
      //     style: "default",
      //     format: "tiles",
      //     tileMatrixSetID: "w",
      //     subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      //     maximumLevel: 18,
      //   })
      // )

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

      this.xzjxjdlayer = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.XZJXJD,
        })
      )
      this.xzjxjdlayer.alpha = 0.5;
      this.xzjxjdlayer.show = false

      this.thfwmlayer = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.TANGHEFWM,
        })
      )
      this.thfwmlayer.alpha = 0.7;
      this.thfwmlayer.show = false

      this.xzjxqxlayer = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.XZJXQX,
        })
      )
      this.xzjxqxlayer.show = false

      this.tanghe = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.TANGHE2D,
        })
      )
      this.tanghe.show = false

      this.tangheFG = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.TANGHEFG,
        })
      )

      this.lvdaolayerBold = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.LVDAOImage.BOLD,
        })
      )
      this.lvdaolayerBold.show = false  // 粗绿道默认隐藏

      this.lvdaolayerThin = window.earth.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: ServiceUrl.LVDAOImage.THIN,
        })
      )

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
    fly() {
      const routes = new Cesium.RouteCollection(window.earth.entities);
      routes.fromFile("./static/fpf/首页飞行.fpf");
      //初始化飞行管理
      const flyManager = new Cesium.FlyManager({
        scene: window.earth.scene,
        routes: routes
      });
      flyManager.readyPromise.then(function () { // 飞行路线就绪
        flyManager.play();
      });
    },
    lipai() {
      this.lp(120.707729,28.010275,"oj",'static/images/瓯江.png',65,65);
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
      var deviationR = 4;
      var MaxR = 900;
      // debugger;
      this.$nextTick(()=>{
        viewer.entities.add({
          id:id,
          position:Cesium.Cartesian3.fromDegrees(lon,lat,50),
          show:false,
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
            show:false,
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
        },4000);
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
        show:false,
        billboard: {
          image: img,
          width: width,
          height: height,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          // translucencyByDistance: new Cesium.NearFarScalar(7000, 0, 8000, 1)
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
      handler.setInputAction((wheelment) => {
        this.cameraHeight = viewer.camera.positionCartographic.height;
        if (this.lvdaoShow) {
          if (this.cameraHeight >= 4000) {
            this.tangheFG.show = true
            this.tanghe.show = false
            this.lvdaolayerThin.show = true
            this.lvdaolayerBold.show = false
          } else {
            this.tangheFG.show = false
            this.tanghe.show = true
            this.lvdaolayerThin.show = false
            this.lvdaolayerBold.show = true
          }
        }
        // self.removeAll(false);
      }, Cesium.ScreenSpaceEventType.WHEEL);
      handler.setInputAction(function(event) {
        // self.removeAll(false);
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      handler.setInputAction(function(event) {
        // self.removeAll(false);
      }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
    },
    switchHanddrawn(value) {
      if (value) {
        this.handdrawnlayer
          ? (this.handdrawnlayer.show = true)
          : (this.handdrawnlayer = window.earth.imageryLayers.addImageryProvider(
              new Cesium.SuperMapImageryProvider({
                url: ServiceUrl.HANDDRAWN,
              })
            ));
      } else {
        this.handdrawnlayer.show = false
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
      const locationEntityCollection = new Cesium.CustomDataSource(
        "location"
      );
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
          image: `/static/images/map-ico/定位.gif`,
          width: 24,
          height: 25,
          scaleByDistance:new Cesium.NearFarScalar(3000, 1.7, 6000, 1.5),
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
          semiMinorAxis: 500,
          semiMajorAxis: 500,
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

      this.SetBufferQueryData({})
      // 查询
      this.singleQuery(geometryArgs, "项目");
      this.singleQuery(geometryArgs, "绿道断点");
      this.singleQuery(geometryArgs, "quanjin");

      // 延时获取异步数据
      setTimeout(() => {
        console.log("bufferQueryData", this.bufferQueryData)
      }, 30);
    },


    // 单个查询
    singleQuery(geometryArgs, dataset) {
      const baseUrl = "http://172.168.3.183:8090/iserver/services/data-alldata/rest/data";
      let getFeatureParameter, getFeatureService;
      getFeatureParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
        // 缓冲距离单位疑似十万米！！！图形单位米！！！
        bufferDistance: 0.005,
        toIndex: -1,
        datasetNames: [`172.168.3.181_thxm:${dataset}`],
        returnContent: true,
        geometry: geometryArgs
      });
      getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(baseUrl, {
          eventListeners: {
            processCompleted: async (res) => {
              if(res.result && res.result.features && res.result.features.length) {
                const obj = this.bufferQueryData;
                obj[dataset] = res.result.features;
                this.SetBufferQueryData(obj)
              }
            },
            processFailed: (msg) => console.log(msg),
          }
      });
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
