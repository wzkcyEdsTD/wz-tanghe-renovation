/*
 * @Author: eds
 * @Date: 2020-07-01 15:22:07
 * @LastEditTime: 2020-09-03 15:52:48
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\store\modules\map\state.js
 */
const state = {
  // forceMapTypeBase: true,
  currentMapType: "cesiumMap", // 地图类型  四色图 sandian cesiumMap
  // mapLoaded: false, // 地图底图是否加载完毕
  // 项目
  // projectList: [],
  // 景点
  // sightList: [],

  // 所有资源
  sourceMap: {},
  // 当前资源
  currentSource: '绿道断点',
  // 十二景
  sejList: [],

  // 缓冲区查询
  bufferQueryData: {}
};
export default state;
