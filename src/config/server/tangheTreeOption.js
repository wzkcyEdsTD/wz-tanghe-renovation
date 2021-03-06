
const SERVER_HOST =
"http://172.168.3.183:8090/iserver/services"
// "http://172.20.83.223:8098/iserver/services";
const SW_DATA = "/data-alldata/rest/data";
const SW_DATA_NAME = "172.168.3.181_thxm:";
// const SW_DATA_NAME2 = "172.168.3.181_thxm_manage:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;

// const SW_DATA2 = "/data-thzt/rest/data";
// const SW_DATA_NAME2 = "thzt:";
// const SERVER_DEFAULT_DATA2 = SERVER_HOST + SW_DATA2;

//  公共设施
const PUBLIC_INFO = [
  { label: "桥梁", dataset: "bridge" },
  { label: "码头", dataset: "wharf" },
  { label: "公厕", dataset: "toilet" },
  { label: "场馆", dataset: "venues" },
  { label: "公园", dataset: "park" },
  // { label: "景点", dataset: "scenic_spot" },
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

const CITY_INFO = [
  { label: "商业设施", dataset: "shangye" },
  { label: "交通设施", dataset: "jiaotong" },
  { label: "停车场", dataset: "car_park" },
]

const ST_INFO = [
  { label: "公厕", dataset: "toilet" },
  { label: "医疗设施", dataset: "yiliao" },
  { label: "养老设施", dataset: "yanglao" },
  // { label: "桥梁", dataset: "bridge" },
  // { label: "码头", dataset: "wharf" },
]

const JG_INFO = [
  { label: "公园", dataset: "park", withImage: [
    {
      name: "gyfwm",
      url: "http://172.168.3.183:8090/iserver/services/3D-gyfwm/rest/realspace/datas/gyfwm",
      alpha: 0.5
    },
    {
      name: "gyld",
      url: "http://172.168.3.183:8090/iserver/services/3D-gyld/rest/realspace/datas/gyld",
    },
    {
      name: "gydl",
      url: "http://172.168.3.183:8090/iserver/services/3D-gydl/rest/realspace/datas/gydl",
    },
  ] },
  // { label: "公园兴趣点", dataset: "公园兴趣点" },
  { label: "古树名木", dataset: "tree" },
  { label: "公园配套设施", dataset: "park_facilities" },
]

const WH_INFO = [
  { label: "场馆", dataset: "venues" },
  { label: "文化设施", dataset: "wenhua" },
  { label: "体育设施", dataset: "tiyu" },
  { label: "教育设施", dataset: "jiaoyu" },
]

export const CESIUM_TREE_OPTION = [
  {
    id: "塘河沿线",
    label: "塘河沿线",
    children: [
      {
        id: "十二景",
        label: "十二景",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}十二景`,
        icon: '十二景',
        type: "mvt",
        saveData: "setSejList",
        // withImage: "http://172.168.3.183:8090/iserver/services/3D-sej/rest/realspace/datas/sej_bz"
      },
      {
        id: "项目",
        label: "项目",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}项目`,
        icon: false,
        type: "mvt",
        withImage: [{
          name: "xmfwm",
          url: "http://172.168.3.183:8090/iserver/services/3D-xmfwm/rest/realspace/datas/xmfwm",
        }, {
          name: 'xmfwm-m',
          url: "http://172.168.3.183:8090/iserver/services/3D-xmfwm-m/rest/realspace/datas/xmfwm-m",
          alpha: 0.8
        }]
        // saveData: "setProjectList"
      },
      {
        id: "2021年重点项目",
        label: "2021年重点项目",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}xm2021`,
        icon: false,
        type: "mvt",
        // saveData: "setProjectList"
      },
      {
        id: "绿道断点",
        label: "断点",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}绿道断点`,
        icon: '断点',
        iconSize: 'small',
        type: "mvt",
      },
      {
        id: "绿道",
        label: "绿道",
        switchLayer: 'switch-lvdao'
      },
      {
        id: "bridge",
        label: "桥梁",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}bridge`,
        icon: '桥梁',
        type: "mvt",
      },
      {
        id: "wharf",
        label: "码头",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}wharf`,
        icon: '码头',
        type: "mvt",
      },
      {
        id:'scenic_spot',
        icon:'景点',
        label: "景点",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}scenic_spot`,
        type: "mvt"
      },
      {
        id:'shipin',
        icon:'视频',
        label: "视频",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}shipin`,
        type: "mvt"
      },
      {
        id:'quanjin',
        icon:'全景',
        label: "全景",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}quanjin`,
        type: "mvt"
      },
      {
        id:'jiankong',
        icon:'监控',
        label: "监控",
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}jiankong`,
        type: "mvt"
      },
    ]
  },

  // {
  //   id: "塘河沿线",
  //   label: "塘河沿线",
  //   type: "cesium_thyx",
  // },

  {
    id: "城市塘河",
    label: "城市塘河",
    children: CITY_INFO.map(v => {
      return {
        ...v,
        id: v.dataset,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}${v.dataset}`,
        type: "mvt"
      };
    })
  },
  {
    id: "生态塘河",
    label: "生态塘河",
    children: ST_INFO.map(v => {
      return {
        ...v,
        id: v.dataset,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}${v.dataset}`,
        type: "mvt"
      };
    })
  },
  {
    id: "景观塘河",
    label: "景观塘河",
    children: JG_INFO.map(v => {
      return {
        ...v,
        id: v.dataset,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}${v.dataset}`,
        type: "mvt"
      };
    })
  },
  {
    id: "文化塘河",
    label: "文化塘河",
    children: WH_INFO.map(v => {
      return {
        ...v,
        id: v.dataset,
        icon: v.label,
        url: SERVER_DEFAULT_DATA,
        newdataset: `${SW_DATA_NAME}${v.dataset}`,
        type: "mvt"
      };
    })
  },
  {
    id: "界线",
    label: "界线",
    children: [
      {
        id: "区县",
        label: "区县",
        switchLayer: "switch-xzjxqx"
      },
      {
        id: "街道",
        label: "街道",
        switchLayer: "switch-xzjxjd"
      },
      {
        id: "塘河范围面",
        label: "塘河范围面",
        switchLayer: "switch-thfwm"
      },
    ]
  },
]


