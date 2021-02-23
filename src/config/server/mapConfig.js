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
    // "http://172.168.3.183:8090/iserver/services/3D-bm/rest/realspace/datas/bm/config",
    "http://172.20.83.228:8090/iserver/services/3D-bm/rest/realspace/datas/bm/config",
  //  影像底图
  SWImage: {
    // 2018: "http://172.168.3.183:8090/iserver/services/map-agscachev2-Layers/rest/maps/Layers",
    2018: "http://10.36.245.203:8090/iserver/services/map-agscachev2-YX2018CGC2000/rest/maps/YX_2018_CGC2000",
    // 2019: "http://172.168.3.183:8090/iserver/services/3D-yx2019/rest/realspace/datas/YX_2019_SW",
    2019: "http://10.36.245.203:8090/iserver/services/map-agscachev2-YJYX2019CGCS2000/rest/maps/YJ_YX_2019_CGCS2000"
  },
  // 影像道路线
  // RoadLine: "http://172.168.3.183:8090/iserver/services/3D-dlallzj_line/rest/realspace/datas/dlallzj_line",
  RoadLine: "http://172.20.83.228:8090/iserver/services/3D-dlallzj_line/rest/realspace/datas/dlallzj_line",
  // 矢量夜景注记
  // BlackMark: "http://172.168.3.183:8090/iserver/services/3D-dlallzjan/rest/realspace/datas/dlallzj_an",
  BlackMark: "http://172.20.83.228:8090/iserver/services/3D-dlallzjan-2/rest/realspace/datas/dlallzj_an",
  //  大数据底图
  DataImage: {
    // white: "http://172.168.3.183:8090/iserver/services/map-agscachev2-TuCeng/rest/maps/图层",
    // white: "http://10.36.245.203:8090/iserver/services/map-agscachev2-YJSGBZB2019CGCS2000/rest/maps/YJ_SG_BZB_2019_CGCS2000",
    white: "http://10.36.245.203:8090/iserver/services/map-agscachev2-YJSGBZBDemD2019CGCS2000/rest/maps/YJ_SG_BZB_DemD_2019_CGCS2000",
    // black: "http://172.168.3.183:8090/iserver/services/3D-dsj/rest/realspace/datas/DSJ_CGCS2000_SW",
    black: "http://10.36.245.203:8090/iserver/services/map-agscachev2-YJDSJCGCS2000/rest/maps/YJ_DSJ_CGCS2000"
  },
  // // 全市域地形
  // YJDem:
  //   "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-DEMLC/rest/realspace/datas/DEM_LC",
  // // mvt矢量服务
  // YJMVT:
  //   "https://ditu.wzcitybrain.com/iserver/services/map-mongodbMvt-SWmap/restjsr/v1/vectortile/maps/SW_map",
  // //  全市区精模
  // WZMODEL:
  //   "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-JMLC20121/rest/realspace/datas/JM_LC_2012_1/config",
  // 三维塘河
  // TANGHE3D: 
  //   "http://172.168.3.183:8090/iserver/services/3D-TangHe3D/rest/realspace/datas/th/config",
  // 二维塘河
  TANGHE2D: 
    // "http://172.168.3.183:8090/iserver/services/3D-th/rest/realspace/datas/th",
    "http://172.20.83.228:8090/iserver/services/3D-th/rest/realspace/datas/th",
  // 塘河发光
  TANGHEFG:
    // "http://172.168.3.183:8090/iserver/services/3D-thmfg/rest/realspace/datas/thmfg",
    "http://172.20.83.228:8090/iserver/services/3D-thmfg/rest/realspace/datas/thmfg",
  // 绿道
  LVDAOImage: {
    // BOLD: "http://172.168.3.183:8090/iserver/services/3D-ldc/rest/realspace/datas/ld1.59t19",
    BOLD: "http://172.20.83.228:8090/iserver/services/3D-ldc/rest/realspace/datas/ld1.59t19",
    // THIN: "http://172.168.3.183:8090/iserver/services/3D-ld1/rest/realspace/datas/ld1"
    THIN: "http://172.20.83.228:8090/iserver/services/3D-ld1/rest/realspace/datas/ld1"
  },
  // 行政区县
  XZJXQX:
    // "http://172.168.3.183:8090/iserver/services/3D-xzqh/rest/realspace/datas/qx",
    "http://172.20.83.228:8090/iserver/services/3D-xzqh/rest/realspace/datas/qx",
  // 行政区县面
  XZJXQXM:
    // "http://172.168.3.183:8090/iserver/services/3D-qxm/rest/realspace/datas/qxm",
    "http://172.20.83.228:8090/iserver/services/3D-qxm/rest/realspace/datas/qxm",
  // 行政街道
  XZJXJD:
    // "http://172.168.3.183:8090/iserver/services/3D-jd/rest/realspace/datas/jd",
    "http://172.20.83.228:8090/iserver/services/3D-jd/rest/realspace/datas/jd",
  // 手绘
  HANDDRAWN: 
    // "http://172.168.3.183:8090/iserver/services/3D-nt_map/rest/realspace/datas/nt_map",
    "http://172.20.83.228:8090/iserver/services/3D-nt_map/rest/realspace/datas/nt_map",
  // 塘河范围面
  TANGHEFWM:
    // "http://172.168.3.183:8090/iserver/services/3D-thfwm/rest/realspace/datas/thfwm",
    "http://172.20.83.228:8090/iserver/services/3D-thfwm/rest/realspace/datas/thfwm",
  // SCENE_WZMODEL: [
  //   { key: "ZGDYP_ZB", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_ZB/config" },
  //   { key: "ZGDYP_DL", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_DL/config" },
  //   { key: "ZGDYP_QT", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_QT/config" },
  //   { key: "ZGDYP_SX", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_SX/config" },
  //   { key: "ZGDYP_JZ", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_JZ/config" },
  //   { key: "ZGDYP_DX", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/ZGDYP_DX/config" },
  //   { key: "MaxShijuJZ", d: 5500, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/MaxShijuJZ/config" },
  //   { key: "MaxShijuQT", d: 1400, url: "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb3/rest/realspace/datas/MaxShijuQT/config" },
  // ],
  // 要素服务
  // FEATUREMVT: "http://172.168.3.183:8090/iserver/services/data-alldata/rest/data",
  FEATUREMVT: "http://172.20.83.228:8090/iserver/services/data-alldata/rest/data"
};

// export const MediaServer = "http://172.168.3.182:8090/static";
export const MediaServer = "http://172.20.83.227:8080/sys/common/static";

// const datasource = "172.168.3.181_thxm_manage:";
const datasource = "thxm:"

// 图层列表
export const LayerList = [{
    id: "十二景",
    label: "十二景",
    dataset: `${datasource}sp_point_resource`,
    icon: '十二景',
    icon2: "十二景",
    type: "mvt",
    saveData: "setSejList",
    param: "resource_type='scenicspot12'",
    check: false,
}, {
    id: "项目",
    label: "项目",
    dataset: `${datasource}th_spatial_project_view`,
    icon: "项目",
    icon2: "项目",
    type: "mvt",
    check: false,
}, {
    id: "绿道断点",
    label: "断点",
    dataset: `${datasource}th_spatial_greenway_view`,
    icon: '断点',
    icon2: "断点",
    type: "mvt",
    param: "resource_type='greenway_all'",
    check: false,
}, {
    id: "绿道",
    label: "绿道",
    // dataset: `${datasource}绿道断点`,
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
