
import axios from "axios";
// axios.defaults.baseURL = (process.env.NODE_ENV === 'development') ? '/djdmApi' : ''
const serverInstanec = axios.create();
const BASEURL = "http://172.20.83.227:8080"

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
 * 获取项目基本信息
 * @param {*} id
 */
export const queryInfoByid = (id) => {
  const URL = `${BASEURL}/tanghe/front/resourceProject/queryDetailsId?id=${id}`;
  return getAxios(URL);
};

/**
 * 获取项目形象进度数据
 * @param {*} id
 */
export const queryDetailByid = (id) => {
  const URL = `${BASEURL}/tanghe/front/resourceProject/queryDetailProjectId?id=${id}`;
  return getAxios(URL);
};

/**
 * 获取项目详情信息(全过程数据)
 * @param {*} code
 */
export const queryDetailBycode = (code) => {
  const URL = `${BASEURL}/tanghe/front/resourceProject/queryDetailsByCoding?id=${code}`;
  return getAxios(URL);
};
