import { get, post, postRequest, uploadFileRequest, getRequest, putRequest, deleteRequest } from 'api/utils'

// 项目统计
export function getProjNumAndAmound(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projNumAndAmound'
  return get(url, data)
}

// 区域分析统计
export function getProjNumByStreet(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projNumByStreet'
  return get(url, data)
}

// 项目全过程占比
export function getProjStatusByDept(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projStatusByDept'
  return get(url, data)
}

// 重点项目统计
export function getProjDeptNumAmound(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projDeptNumAmound'
  return get(url, data)
}

// 建设进度
export function getProjStatusAmound(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projStatusAmound'
  return get(url, data)
}

// 投资类型分析
export function getProjFundType(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projFundType'
  return get(url, data)
}

// 建设类型分析
export function getProjConsType(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projConsType'
  return get(url, data)
}

// 项目投资计划
export function getProjConsdatee(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projConsdatee'
  return get(url, data)
}

// 项目完工计划
export function getProjByConsdate(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/projByConsdate'
  return get(url, data)
}

// 项目详情
export function queryForOneMapById(data) {
  const url = 'http://172.168.3.182:8080/jeecg-boot/tanghe/resourceProject/count/queryForOneMapById'
  return get(url, data)
}

