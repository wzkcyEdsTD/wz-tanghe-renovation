
const SERVER_HOST = 
"http://172.168.3.183:8090/iserver/services"
// "http://172.20.83.223:8098/iserver/services";
const SW_DATA = "/data-th_zy/rest/data";
const SW_DATA_NAME = "th_zy:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;

const SW_DATA2 = "/data-thzt/rest/data";
const SW_DATA_NAME2 = "thzt:";
const SERVER_DEFAULT_DATA2 = SERVER_HOST + SW_DATA2;

export const TARGET_SOURCE = [
  {
    id: "项目",
    label: "项目",
    url: SERVER_DEFAULT_DATA,
    newdataset: `${SW_DATA_NAME}项目`,
    icon: false,
    type: "mvt",
    saveData: "setProjectList"
  },
  {
    id: "绿道断点",
    label: "绿道断点",
    url: SERVER_DEFAULT_DATA,
    newdataset: `${SW_DATA_NAME}绿道断点`,
    icon: '卡点',
    type: "mvt",
  },
  {
    id: "十二景",
    label: "十二景",
    url: SERVER_DEFAULT_DATA,
    newdataset: `${SW_DATA_NAME}十二景`,
    icon: '十二景',
    type: "mvt",
    saveData: "setSightList"
  },
];

//  桥梁
const BRIDGE_INFO = [
  {
    label: "桥梁",
    dataset: "bridge"
  }
];

//  公共设施
const PUBLIC_INFO = [
  { label: "公厕", dataset: "toilet" },
  { label: "场馆", dataset: "venues" },
  { label: "公园", dataset: "park" },
  // { label: "景点", dataset: "scenic_spot" },
  { label: "古树名木", dataset: "tree" },
  { label: "公园配套设施", dataset: "park_facilities" },
];

export const CESIUM_TREE_OPTION = [
  {
    id: "桥梁",
    label: "桥梁",
    children: BRIDGE_INFO.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA2,
        newdataset: `${SW_DATA_NAME2}${v.dataset}`,
        type: "mvt"
      };
    })
  },
  {
    id: "公共设施",
    label: "公共设施",
    children: PUBLIC_INFO.map(v => {
      return {
        ...v,
        id: v.label,
        icon: v.label,
        url: SERVER_DEFAULT_DATA2,
        newdataset: `${SW_DATA_NAME2}${v.dataset}`,
        type: "mvt"
      };
    })
  }
]


