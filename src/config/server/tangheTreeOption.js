
const SERVER_HOST = 
"http://172.168.3.183:8090/iserver/services"
// "http://172.20.83.223:8098/iserver/services";
const SW_DATA = "/data-th_zy/rest/data";
const SW_DATA_NAME = "th_zy:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;

const SW_DATA2 = "/data-thzt/rest/data";
const SW_DATA_NAME2 = "thzt:";
const SERVER_DEFAULT_DATA2 = SERVER_HOST + SW_DATA2;

// export const TARGET_SOURCE = [
//   {
//     id: "项目",
//     label: "项目",
//     url: SERVER_DEFAULT_DATA,
//     newdataset: `${SW_DATA_NAME}项目`,
//     icon: false,
//     type: "mvt",
//     saveData: "setProjectList"
//   },
//   {
//     id: "绿道断点",
//     label: "绿道断点",
//     url: SERVER_DEFAULT_DATA,
//     newdataset: `${SW_DATA_NAME}绿道断点`,
//     icon: '卡点',
//     type: "mvt",
//   },
//   {
//     id: "十二景",
//     label: "十二景",
//     url: SERVER_DEFAULT_DATA,
//     newdataset: `${SW_DATA_NAME}十二景`,
//     icon: '十二景',
//     type: "mvt",
//     saveData: "setSightList"
//   },
// ];

//  公共设施
const PUBLIC_INFO = [
  { label: "桥梁", dataset: "bridge" },
  { label: "码头", dataset: "wharf" },
  { label: "公厕", dataset: "toilet" },
  { label: "场馆", dataset: "venues" },
  { label: "公园", dataset: "park" },
  { label: "景点", dataset: "scenic_spot" },
  { label: "古树名木", dataset: "tree" },
  { label: "公园配套设施", dataset: "park_facilities" },
  { label: "医疗设施", dataset: "yiliao" },
  { label: "养老设施", dataset: "yanglao" },
  { label: "文化设施", dataset: "wenhua" },
  { label: "体育设施", dataset: "tiyu" },
  { label: "商业设施", dataset: "shangye" },
  { label: "教育设施", dataset: "jiaoyu" },
  { label: "交通设施", dataset: "jiaotong" },
];

export const CESIUM_TREE_OPTION = [
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
    icon: '断点',
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
  {
    id: "乡镇名称",
    label: "乡镇名称",
    type: "cesium_town",
  },
  {
    id: "基础数据",
    label: "基础数据",
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


