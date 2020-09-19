
const SERVER_HOST = "http://172.20.83.223:8098/iserver/services";
const SW_DATA = "/data-TangHeShuJu/rest/data";
const SW_DATA_NAME = "all:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;

//  控规专题
const KG_INFO = [
  {
    label: "控规信息",
    url: `${SERVER_HOST}/map-KongGui_LuCheng/rest/maps/%E6%8E%A7%E8%A7%84%E4%B8%89%E5%8C%BA20200304%40172.20.83.196_swdata`
  }
];


export const FIXED_SOURCE = [
  {
    id: "项目",
    label: "项目",
    url: SERVER_DEFAULT_DATA,
    dataset: `${SW_DATA_NAME}项目`,
    icon: '在建项目',
    type: "mvt",
  },
  {
    id: "断点",
    label: "断点",
    url: SERVER_DEFAULT_DATA,
    dataset: `${SW_DATA_NAME}断点`,
    icon: '卡点',
    type: "mvt"
  },
];

export const CESIUM_TREE_OPTION = [
  {
    id: "航道",
    label: "航道",
    children: KG_INFO.map(v => {
      return {
        ...v,
        id: v.label,
        type: "image"
      };
    })
  },
  {
    id: "河道",
    label: "河道",
    children: KG_INFO.map(v => {
      return {
        ...v,
        id: v.label,
        type: "image"
      };
    })
  },
  {
    id: "桥梁",
    label: "桥梁",
    children: KG_INFO.map(v => {
      return {
        ...v,
        id: v.label,
        type: "image"
      };
    })
  },
  {
    id: "码头",
    label: "码头",
    children: KG_INFO.map(v => {
      return {
        ...v,
        id: v.label,
        type: "image"
      };
    })
  }
]


