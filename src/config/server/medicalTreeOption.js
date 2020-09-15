/*
 * @Author: eds
 * @Date: 2020-07-29 16:10:06
 * @LastEditTime: 2020-09-10 10:12:50
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\config\server\medicalTreeOption.js
 */
const SERVER_HOST = "https://ditu.wzcitybrain.com/iserver/services";
const SW_DATA = "/data-SW_DATA/rest/data";
const SW_DATA_NAME = "172.20.83.196_swdata:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
// 医疗专题
const MEDICAL_TOPIC = [
  {
    label: "医疗场所",
    icon_size: "large",
    dataset: "JZJZNL_YLJH_JHCS",
    withExtraData: "medicalList",
    withExtraDataGeometry: "medicalListWithGeometry",
    saveExtraDataByGeometry: "setMedicalListWithGeometry"
  }
];

const TOUR_TOPIC = [
  { label: "精品农家乐", dataset: "温州农家乐" },
  { label: "旅游景点", dataset: "永嘉旅游景点地图" },
  { label: "温州民宿", dataset: "温州民宿" },
  { label: "百姓健身房", dataset: "百姓健身房" },
  { label: "森林康养基地", dataset: "温州市森林康养基地" },
  { label: "夜光经济", dataset: "夜景" },
  // {
  //   label: "精品旅游路线",
  //   componentEvent: "cesium-3d-event",
  //   componentKey: "line1"
  // }
];

// 基础设施
const BASIC_TOPIC = [
  {
    label: "公厕",
    icon_size: "large",
    dataset: "PublicToilet"
  }
];
// 文化专题
const CULTURE_TOPIC = [
  { label: "爱国义务教育基地", dataset: "爱国主义教育基地" },
  { label: "市区阅读", dataset: "温州市阅读" },
  { label: "文化礼堂", dataset: "文化礼堂" },
  { label: "文化生活", dataset: "温州文化生活" }
];
//  应急专题
const EMERGENCY_TOPIC = [
  {
    label: "非煤矿山",
    icon_size: "large",
    dataset: "D_HARAZDS_NONCOALMINE"
  },
  {
    label: "烟花爆竹经营单位",
    icon_size: "large",
    dataset: "D_HARAZDS_FIREWORKS"
  },
  {
    label: "应急避灾场所",
    icon_size: "large",
    dataset: "JZJZNL_BZAZCS"
  },
  {
    label: "应急队伍",
    icon_size: "large",
    dataset: "JZJZNL_YJDW"
  },
  {
    label: "加油站",
    icon_size: "large",
    dataset: "D_HAZARDS_GasStation"
  }
];

//  农贸专题
const SOURCE_TOPIC = [
  {
    label: "农贸市场面",
    polygon: true,
    dataset: "FarmersMarket_SiQu_M"
  },
  {
    label: "农贸市场点",
    icon_size: "large",
    dataset: "FarmersMarket_SiQu_P"
  },
  {
    label: "市场商场",
    icon_size: "large",
    dataset: "market_mall"
  },
  {
    label: "学校",
    icon_size: "large",
    dataset: "school"
  },
  {
    label: "社会福利机构",
    icon_size: "large",
    dataset: "D_HAZARDS_BEADHOUSESHP"
  },
  {
    label: "高层建筑",
    icon_size: "large",
    dataset: "high_buildings_P"
  },
  {
    label: "娱乐场所",
    icon_size: "large",
    dataset: "entertainment_place"
  },
  {
    label: "文化场所",
    icon_size: "large",
    dataset: "D_HAZARDS_CULTURALPLACE"
  },
  {
    label: "体育运动场馆",
    icon_size: "large",
    dataset: "sports_gymnasium"
  },
  {
    label: "客运单位",
    icon_size: "large",
    dataset: "passenger_trans_unit"
  }
];

const MODEL_3D_FINE = [
  {
    label: "精细三维",
    componentEvent: "cesium-3d-event",
    componentKey: "3d1",
    action: "SetIsInfoFrame"
  }
];
const KG_INFO = [
  {
    label: "控规信息",
    url: `${SERVER_HOST}/map-KongGui_LuCheng/rest/maps/%E6%8E%A7%E8%A7%84%E4%B8%89%E5%8C%BA20200304%40172.20.83.196_swdata`
  }
];

/**
 * 对应需要额外数据的点位
 */
export const SET_CESIUM_TREE_EXTRA_DATA_WITH_GEOMETRY = [
  "setMedicalListWithGeometry"
];
export const CESIUM_TREE_EXTRA_DATA_WITH_GEOMETRY = ["medicalListWithGeometry"];
export const CESIUM_TREE_EXTRA_DATA = ["medicalList"];
export const CESIUM_TREE_OPTION = [
  {
    id: "精细三维",
    label: "精细三维",
    children: MODEL_3D_FINE.map(v => {
      return {
        ...v,
        id: v.label,
        type: "model"
      };
    })
  },
  {
    id: "医疗专题",
    label: "医疗专题",
    children: MEDICAL_TOPIC.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        type: "mvt",
        newdataset: `${SW_DATA_NAME}${v.dataset}`
      };
    })
  },
  {
    id: "旅游专题",
    label: "旅游专题",
    children: TOUR_TOPIC.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        type: "mvt",
        newdataset: `${SW_DATA_NAME}${v.dataset}`
      };
    })
  },
  {
    id: "文化专题",
    label: "文化专题",
    children: CULTURE_TOPIC.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        type: "mvt",
        newdataset: `${SW_DATA_NAME}${v.dataset}`
      };
    })
  },
  {
    id: "应急专题",
    label: "应急专题",
    children: EMERGENCY_TOPIC.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        type: "mvt",
        newdataset: `${SW_DATA_NAME}${v.dataset}`,
      };
    })
  },
  {
    id: "基础设施专题",
    label: "基础设施专题",
    children: BASIC_TOPIC.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        type: "mvt",
        newdataset: `${SW_DATA_NAME}${v.dataset}`,
      };
    })
  },
  {
    id: "资源专题",
    label: "资源专题",
    children: SOURCE_TOPIC.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        type: "mvt",
        newdataset: `${SW_DATA_NAME}${v.dataset}`,
      };
    })
  },
  {
    id: "控规信息",
    label: "控规信息",
    children: KG_INFO.map(v => {
      return {
        ...v,
        id: v.label,
        type: "image"
      };
    })
  }
];
