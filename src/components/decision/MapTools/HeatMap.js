/**
 * 开关热力图
 * @param {*} blocks 
 * @param {*} forceKey 
 */
export const switchHeatMap = (blocks, forceKey, heatArr) => {
  blocks.map(({ k }) => {
      if (k == forceKey) {
          window.heatMap[k] ? window.heatMap[k].show(true) : doHeatMap(k, heatArr);
      } else {
          window.heatMap[k] ? window.heatMap[k].show(false) : undefined
      }
  })
};
/**
* 制造热力图
* @param {*} name 
*/
export const doHeatMap = (forceKey, heatArr) => {
  let bounds = {
      west: 120.5644,
      east: 120.8559,
      south: 27.7270,
      north: 28.0363
  };

  // init heatmap
  const heatMap = window.CesiumHeatmap.create(
      window.earth,
      bounds,
      {
          backgroundColor: "rgba(0,0,0,0)",
          radius: 40,
          maxOpacity: 0.4,
          minOpacity: 0,
          blur: 0.55
      }
  );

  // random example data
  let data = heatArr.map(([LON, LAT, value]) => { return { x: LON, y: LAT, value } });
  let valueMin = 0;
  let valueMax = 100000;

  // add data to heatmap
  heatMap.setWGS84Data(valueMin, valueMax, data)
  window.heatMap[forceKey] = heatMap;
}