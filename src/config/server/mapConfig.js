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
    // "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-BaiMoLuCheng/rest/realspace/datas/BaiMo_LuCheng/config",
    // "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb/rest/realspace/datas/RES_LC_Model@baimo/config",
    "http://10.36.234.83:8090/iserver/services/3D-RES_PY_LC_Z1-SW_BM/rest/realspace/datas/RES_PY_SQ@Baimo/config",
    // "http://10.36.234.83:8098/iserver/services/3D-SW_RA/rest/realspace/datas/RES_RA_Z_EraseMax_Model@Baimo/config",
  //  影像底图
  SWImage:
    // "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-YX2019SW/rest/realspace/datas/YX_2019_SW",
    "http://172.20.83.223:8098/iserver/services/3D-YX_2019_SW/rest/realspace/datas/YX_2019_SW",
  //  大数据底图
  DataImage:
    // "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-DSJCGS2000SW/rest/realspace/datas/DSJ_CGS2000_SW",
    // "http://172.20.83.223:8091/iserver/services/map-agscachev2-YJDSJCGCS2000/rest/maps/YJ_DSJ_CGCS2000",
    "http://172.168.3.183:8090/iserver/services/3D-dsj/rest/realspace/datas/DSJ_CGCS2000_SW",
  // 全市域地形
  YJDem:
    "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-DEMLC/rest/realspace/datas/DEM_LC",
  // mvt矢量服务
  YJMVT:
    "https://ditu.wzcitybrain.com/iserver/services/map-mongodbMvt-SWmap/restjsr/v1/vectortile/maps/SW_map",
  //  全市区精模
  WZMODEL:
    "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb-JMLC20121/rest/realspace/datas/JM_LC_2012_1/config",
  SCENE_WZMODEL: {
    BUILDING:
      "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb2/rest/realspace/datas/MAXShiQu2012JZ/config",
    OTHERS:
      "https://ditu.wzcitybrain.com/iserver/services/3D-mongodb2/rest/realspace/datas/MAXShiQu2012QT/config"
  },
  // 三维塘河
  TANGHE3D: "http://172.20.83.223:8098/iserver/services/3D-TangHe3D/rest/realspace/datas/th/config",
  // 绿道
  LVDAOImage: "http://172.20.83.223:8098/iserver/services/3D-ld/rest/realspace/datas/ld",
};

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
