
import axios from "axios";
const serverInstanec = axios.create();

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
const getAxios = (url = "", data = {}) => {
  return serverInstanec.request({ url, data, method: "get" }).then(res => {
    return res.data ? Promise.resolve(res.data) : Promise.reject(res);
  });
};

/**
 * 获取iserver指定数据集下所有别名
 * @param {*} url
 * @param {*} dataset
 */
export const queryDetailByid = (id) => {
  const URL = `https://wzdjdm.wzcitybrain.com:8888/api/onemap/aitivity/project/queryDetailByid?projectId=${id}`;
  return getAxios(URL);
};
