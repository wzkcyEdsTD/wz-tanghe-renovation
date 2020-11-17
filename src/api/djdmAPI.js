
import axios from "axios";
// axios.defaults.baseURL = (process.env.NODE_ENV === 'development') ? '/djdmApi' : ''
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
 * 获取项目基本信息
 * @param {*} id
 */
export const queryInfoByid = (id) => {
  const URL = `/details/${id}`;
  return getAxios(URL);
};

/**
 * 获取项目形象进度数据
 * @param {*} id
 */
export const queryDetailByid = (id) => {
  const URL = `/details/project/${id}`;
  return getAxios(URL);
};

/**
 * 获取项目详情信息(全过程数据)
 * @param {*} code
 */
export const queryDetailBycode = (code) => {
  const URL = `/details/byCoding/${code}`;
  return getAxios(URL);
};
