import { get, post, postRequest, uploadFileRequest, getRequest, putRequest, deleteRequest } from 'api/utils'

const BASEURL = "http://172.20.83.227:8080"
// let BASEURL = "/api"

// 项目统计
export function getProjNumAndAmound(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projNumAndAmound`
  return get(url, data)
}

// 区域分析统计
export function getProjNumByStreet(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projNumByStreet`
  return get(url, data)
}

// 项目全过程占比
export function getProjStatusByDept(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projStatusByDept`
  return get(url, data)
}

// 重点项目统计
export function getProjDeptNumAmound(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projDeptNumAmound`
  return get(url, data)
}

// 建设进度
export function getProjStatusAmound(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projStatusAmound`
  return get(url, data)
}

// 投资类型分析
export function getProjFundType(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projFundType`
  return get(url, data)
}

// 建设类型分析
export function getProjConsType(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projConsType`
  return get(url, data)
}

// 项目投资计划
export function getProjConsdatee(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projConsdatee`
  return get(url, data)
}

// 项目完工计划
export function getProjByConsdate(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/projByConsdate`
  return get(url, data)
}

// 项目详情
export function getProjectDetail(data) {
  const url = `${BASEURL}/tanghe/resourceProject/count/queryForOneMapById`
  return get(url, data)
}

// 卡点详情
export function getPointDetail(data) {
  const url = `${BASEURL}/tanghe/resourceGreenwayPoint/count/queryForMap`
  return get(url, data)
}

// 景点详情
export function getSpotDetail(data) {
  const url = `${BASEURL}/tanghe/front/resourceScenicSpot/queryForMap`
  return get(url, data)
}

// 互学互比列表查询
export function queryMeetingSortFront(data) {
  const url = `${BASEURL}/tanghe/front/bsMeeting/queryMeetingSortFront`
  return get(url, data)
}

// 年度项目数量及总投资额
export function countProjForCurAmound(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/countProjForCurAmound`
  return get(url, data)
}

// 年度计划开工数据
export function countProjByConsdates2(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/countProjByConsdates2`
  return get(url, data)
}

// 年度计划完工数据
export function countProjByConsdatee2(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/countProjByConsdatee2`
  return get(url, data)
}

// 年度投资完成率
export function countProjByAmound(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/countProjByAmound`
  return get(url, data)
}

// 资源目录
export function rootList(data) {
  const url = `${BASEURL}/tanghe/front/resourceMenu/rootList`
  return get(url, data)
}

// 新增评论
export function addComment(data) {
  const url = `${BASEURL}/tanghe/front/resourceProjectComment/addComment`
  return post(url, data)
}

// 查询评论
export function resourceComment(data) {
  const url = `${BASEURL}/tanghe/front/resourceProjectComment/list`
  return get(url, data)
}

// 根据参数查询项目列表
export function resourceProjectList(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/list`
  return get(url, data)
}

// 问题项目数据统计
export function countProjectProgressNum(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/countProjectProgressNum`
  return get(url, data)
}

// 问题项目列表
export function queryProgressList(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/queryProgressList`
  return get(url, data)
}

// 根据街道统计项目数量
export function countProjectStreetNum(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/countProjectStreetNum`
  return get(url, data)
}

// 各单位总投资额统计
export function countProjectAmound(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/countProjectAmound`
  return get(url, data)
}

// 各单位总投资额统计
export function countProjectStar(data) {
  const url = `${BASEURL}/tanghe/front/resourceProjectComment/countProjectStar`
  return get(url, data)
}

// 新增标绘
export function addPlot(data) {
  const url = `${BASEURL}/tanghe/front/spTemporaryPlotting/add`
  return post(url, data)
}

// 标绘历史列表查询
export function queryPlotList(data) {
  const url = `${BASEURL}/tanghe/front/spTemporaryPlotting/queryList`
  return get(url, data)
}

// 标绘详情查询
export function queryPlot(data) {
  const url = `${BASEURL}/tanghe/front/spTemporaryPlotting/queryByGroupId`
  return get(url, data)
}

// 登录验证码
export function randomImage(data) {
  const url = `${BASEURL}/sys/randomImage/1611107075676`
  return get(url, data)
}

// 登录
export function login(data) {
  const url = `${BASEURL}/sys/login`
  return post(url, data)
}

// 项目年度计划
export function queryPlansDetailById(data) {
  const url = `${BASEURL}/tanghe/front/resourceProject/queryPlansDetailById`
  return get(url, data)
}