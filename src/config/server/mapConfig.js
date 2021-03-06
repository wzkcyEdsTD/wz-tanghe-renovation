/*
 * @Author: eds
 * @Date: 2020-08-11 20:39:44
 * @LastEditTime: 2020-09-11 16:46:13
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\config\server\mapConfig.js
 */
export const ServiceUrl = {
  // 温州白模
  WZBaimo:
    // "http://172.168.3.183:8090/iserver/services/3D-bm_repair/rest/realspace/datas/thbm@bm_repair/config",
    "http://172.168.3.183:8090/iserver/services/3D-bm/rest/realspace/datas/bm/config",
  //  影像底图
  SWImage: {
    // "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-YX2019SW/rest/realspace/datas/YX_2019_SW",
    // "http://172.20.83.223:8098/iserver/services/3D-YX_2019_SW/rest/realspace/datas/YX_2019_SW",
    2018: "http://172.168.3.183:8090/iserver/services/map-agscachev2-Layers/rest/maps/Layers",
    2019: "http://172.168.3.183:8090/iserver/services/3D-yx2019/rest/realspace/datas/YX_2019_SW",
  },
  // 影像注记
  ImageMark: "http://172.168.3.183:8090/iserver/services/3D-dlyzj/rest/realspace/datas/dlyzj",
  RoadLine: "http://172.168.3.183:8090/iserver/services/3D-dlallzj_line/rest/realspace/datas/dlallzj_line",
  // 矢量夜景注记
  BlackMark: "http://172.168.3.183:8090/iserver/services/3D-dlallzjan/rest/realspace/datas/dlallzj_an",
  //  大数据底图
  DataImage: {
    // "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-DSJCGS2000SW/rest/realspace/datas/DSJ_CGS2000_SW",
    // "http://172.20.83.223:8091/iserver/services/map-agscachev2-YJDSJCGCS2000/rest/maps/YJ_DSJ_CGCS2000",
    // "http://172.168.3.183:8090/iserver/services/3D-dsj/rest/realspace/datas/DSJ_CGCS2000_SW",
    white: "http://172.168.3.183:8090/iserver/services/map-agscachev2-TuCeng/rest/maps/图层",
    // white: "http://172.168.3.183:8090/iserver/services/3D-cs/rest/realspace/datas/TDT",
    black: "http://172.168.3.183:8090/iserver/services/3D-dsj/rest/realspace/datas/DSJ_CGCS2000_SW",
  },
  // 十二景标注
  // SEJBZ: 
  //   "http://172.168.3.183:8090/iserver/services/3D-sej/rest/realspace/datas/sej_bz",
  // 全市域地形
  YJDem:
    "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-DEMLC/rest/realspace/datas/DEM_LC",
  // mvt矢量服务
  YJMVT:
    "https://ditu.wzcitybrain.com/iserver/services/map-mongodbMvt-SWmap/restjsr/v1/vectortile/maps/SW_map",
  //  全市区精模
  WZMODEL:
    "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-JMLC20121/rest/realspace/datas/JM_LC_2012_1/config",
  // SCENE_WZMODEL: {
  //   BUILDING:
  //     "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb2/rest/realspace/datas/MAXShiQu2012JZ/config",
  //   OTHERS:
  //     "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb2/rest/realspace/datas/MAXShiQu2012QT/config"
  // },
  // 三维塘河
  TANGHE3D: 
    // "http://172.20.83.223:8098/iserver/services/3D-TangHe3D/rest/realspace/datas/th/config",
    "http://172.168.3.183:8090/iserver/services/3D-TangHe3D/rest/realspace/datas/th/config",
  // 二维塘河
  TANGHE2D: 
    // "http://172.20.83.223:8098/iserver/services/3D-TangHe3D/rest/realspace/datas/th/config",
    // "http://172.168.3.183:8090/iserver/services/3D-thmplus/rest/realspace/datas/thmplus",
    "http://172.168.3.183:8090/iserver/services/3D-th/rest/realspace/datas/th",
  // 塘河发光
  TANGHEFG:
    "http://172.168.3.183:8090/iserver/services/3D-thmfg/rest/realspace/datas/thmfg",
  // 绿道
  LVDAOImage: {
    BOLD: "http://172.168.3.183:8090/iserver/services/3D-ldc/rest/realspace/datas/ld1.59t19",
    // THIN: "http://172.168.3.183:8090/iserver/services/3D-ld_0-55t19/rest/realspace/datas/ld_0.55t19",
    THIN: "http://172.168.3.183:8090/iserver/services/3D-ld1/rest/realspace/datas/ld1"
  },
  // 行政区县
  XZJXQX:
    "http://172.168.3.183:8090/iserver/services/3D-xzqh/rest/realspace/datas/qx",
  // 行政区县面
  XZJXQXM:
    "http://172.168.3.183:8090/iserver/services/3D-qxm/rest/realspace/datas/qxm",
  // 行政街道
  XZJXJD:
    // "http://172.168.3.183:8090/iserver/services/3D-xzqh/rest/realspace/datas/jd",
    "http://172.168.3.183:8090/iserver/services/3D-jd/rest/realspace/datas/jd",
  HANDDRAWN: 
    "http://172.168.3.183:8090/iserver/services/3D-nt_map/rest/realspace/datas/nt_map",
  // 绿道场景
  // LVDAOScene:
  //   "http://172.168.3.183:8090/iserver/services/3D-ldplus_xi/rest/realspace"
  // 塘河范围面
  TANGHEFWM:
    "http://172.168.3.183:8090/iserver/services/3D-thfwm/rest/realspace/datas/thfwm",
  SCENE_WZMODEL: [
    { key: "ZGDYP_ZB", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_ZB/config" },
    { key: "ZGDYP_DL", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_DL/config" },
    { key: "ZGDYP_QT", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_QT/config" },
    { key: "ZGDYP_SX", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_SX/config" },
    { key: "ZGDYP_JZ", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_JZ/config" },
    { key: "ZGDYP_DX", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_DX/config" },
    { key: "MaxShijuJZ", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/MaxShijuJZ/config" },
    { key: "MaxShijuQT", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/MaxShijuQT/config" },
  ],
  // 要素服务
  FEATUREMVT: "http://172.168.3.183:8090/iserver/services/data-alldata/rest/data",
};

export const MediaServer = "http://172.168.3.182:8090/static";

const datasource = "172.168.3.181_thxm:";

// 图层列表
export const LayerList = [{
    id: "十二景",
    label: "十二景",
    dataset: `${datasource}十二景`,
    icon: '十二景',
    icon2: "十二景",
    type: "mvt",
    saveData: "setSejList",
    check: false,
}, {
    id: "项目",
    label: "项目",
    dataset: `${datasource}项目`,
    icon: false,
    icon2: "项目",
    type: "mvt",
    check: false,
}, {
    id: "绿道断点",
    label: "断点",
    dataset: `${datasource}绿道断点`,
    icon: '断点',
    icon2: "断点",
    type: "mvt",
    check: false,
}, {
    id: "绿道",
    label: "绿道",
    dataset: `${datasource}绿道断点`,
    icon: '绿道',
    icon2: "绿道",
    check: false,
}]

export const BimSourceURL = {
  SCENE_URL:
    "http://172.20.83.223:8098/iserver/services/3D-Placement_house_0728/rest/realspace",
  SCENE_DATA_URL:
    "http://172.20.83.223:8098/iserver/services/data-Placement_house_0728/rest/data",
  SCENE_SQL_URL:
    "http://172.20.83.223:8098/iserver/services/data-SW_Data/rest/data/featureResults.rjson?returnContent=true",
  STATION_SCENE_URL:
    "http://172.20.83.223:8098/iserver/services/3D-Airport_Station/rest/realspace",
  STATION_DATA_URL:
    "http://172.20.83.223:8098/iserver/services/data-Airport_Station/rest/data",
  UNDERGROUND_SCENE_URL:
    "http://172.20.83.223:8098/iserver/services/3D-GSLINE/rest/realspace"
};
