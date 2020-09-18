
const SERVER_HOST = "http://172.20.83.223:8098/iserver/services";
const SW_DATA = "/data-TangHeShuJu/rest/data";
const SW_DATA_NAME = "all:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;

// 医疗专题
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
  }
];


