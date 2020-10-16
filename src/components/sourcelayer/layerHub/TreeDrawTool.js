/*
 * @Author: eds
 * @Date: 2020-09-03 15:04:37
 * @LastEditTime: 2020-09-11 17:05:49
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\sourcelayer\treeTool\TreeDrawTool.js
 */

/**
 * 取面中心点
 * @param {*} arr
 * @param {*} height
 */
const getCenterOfPolygon = (arr, height) => {
  let x = 0,
    y = 0;
  arr.map((v, index) => {
    index % 2 == 0 ? (x += v) : (y += v);
  });
  return [(x * 2) / arr.length, (y * 2) / arr.length, height];
};

/**
 * 别名数组转对象
 * @param {*} fields
 */
const fixFieldsByArr = fields => {
  const fieldHash = {};
  fields.map(({ name, caption }) => {
    const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    reg.test(caption) ? (fieldHash[name] = caption) : undefined;
  });
  return fieldHash;
};

/**
 * 属性名替换中文别名
 * @param {*} attributes
 * @param {*} fields
 */
const fixAttributesByOrigin = (attributes, fields) => {
  const fixAttributes = {};
  for (let v in attributes) {
    const V = v.toLowerCase();
    fields[V] ? (fixAttributes[fields[V]] = attributes[v]) : undefined;
  }
  return fixAttributes;
};

/**
 * 从feature数组里剔除有信息的个例，并返回新的两个数组
 * @param {*} gArr
 * @param {*} eObj
 * @param {*} node
 * @param {*} context
 */
export const fixTreeWithExtra = (gArr, eObj, node, context) => {
  const extraKeys = Object.keys(eObj);
  const drawFeatures = [];
  const extraFeatures = [];
  gArr.map(item => {
    const { attributes } = item;
    ~extraKeys.indexOf(attributes.SHORTNAME)
      ? extraFeatures.push({ ...item, extra_data: eObj[attributes.SHORTNAME] })
      : drawFeatures.push(item);
  });
  context[node.saveData](extraFeatures);
  // context.searchFilter();
  return { drawFeatures };
};

/**
 * 画点、面
 * @param {*} context
 * @param {*} param1
 * @param {*} node
 * @param {*} fields 别名数组
 */
export const treeDrawTool = (context, { result }, node, fields = [], fn) => {
  const fieldHash = fixFieldsByArr(fields);
  // const poiEntityCollection = new Cesium.CustomDataSource(node.id);
  // window.earth.dataSources.add(poiEntityCollection).then(datasource => {
  //   context.entityMap[node.id] = datasource;
  // });
  //  hash赋值
  window.billboardMap[node.id] = window.earth.scene.primitives.add(new Cesium.BillboardCollection());
  window.whiteLabelMap[node.id] = window.earth.scene.primitives.add(new Cesium.LabelCollection());
  window.blackLabelMap[node.id] = window.earth.scene.primitives.add(new Cesium.LabelCollection());

  // context.featureMap[node.id] = result.features;
  let forceDrawFeatures = [];
  if (node.id === '项目') {
    result.features.forEach(item => {
      if (item.attributes.SFFSY67) {
        forceDrawFeatures.push(item)
      }
    })
  } else {
    forceDrawFeatures = result.features;
  }
  if (node.saveData) {
    context.saveDataMap[node.id] = result.features;
    context[node.saveData](forceDrawFeatures)
  }
  context.setSourceMap({[node.id]: forceDrawFeatures});

  // forceDrawFeatures.map(item => {
  //   const entityOption = {
  //     id: `${node.id}_${item.attributes.SMID}@${node.icon}`,
  //     label: {
  //       text: node.id == '项目' ? item.attributes.SHORTNAME : item.attributes.NAME,
  //       // color: new Cesium.Color.fromCssColorString("#000"),
  //       fillColor: node.id == '项目' ? new Cesium.Color.fromCssColorString("#02FCDC") : new Cesium.Color.fromCssColorString("#fff"),
  //       // style: Cesium.LabelStyle.FILL_AND_OUTLINE,
  //       // outlineColor: new Cesium.Color.fromCssColorString("#fff"),
  //       font: "8px",
  //       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6000),
  //       pixelOffset: new Cesium.Cartesian2(0, -20),
  //       disableDepthTestDistance: Number.POSITIVE_INFINITY
  //     },
  //     name: node.id,
  //     fieldHash,
  //     extra_data: item.attributes,
  //     fix_data: fixAttributesByOrigin(item.attributes, fieldHash),
  //     geometry: item.geometry,
  //     type: node.id
  //   };
  //   const entityInstance = {
  //       ...entityOption,
  //       position: Cesium.Cartesian3.fromDegrees(
  //         item.geometry.x,
  //         item.geometry.y,
  //         4
  //       ),
  //       billboard: {
  //         image: node.icon ? `/static/images/map-ico/${node.icon}.png` : `/static/images/map-ico/${item.attributes.CURRENT_STATE.trim()}.png`,
  //         width: node.iconSize == 'small' ? 24 : 24,
  //         height: node.iconSize == 'small' ? 24 : 25,
  //         // sizeInMeters: true,
  //         disableDepthTestDistance: Number.POSITIVE_INFINITY,
  //         // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6000),
  //         // translucencyByDistance: new Cesium.NearFarScalar(7000, 1, 8000, 0)
  //       }
  //     };

  //   poiEntityCollection.entities.add(entityInstance);
  // });

  //  属性赋值
  forceDrawFeatures.map(v => {
    !window.featureMap[node.id] && (window.featureMap[node.id] = {});
    window.featureMap[node.id][v.attributes.SMID] = {
      name: v.attributes.SHORTNAME || v.attributes.NAME || v.attributes.MC || v.attributes.JC || v.attributes[node.withExtraKey],
      attributes: v.attributes,
      geometry: v.geometry,
      fix_data: fixAttributesByOrigin(v.attributes, fieldHash),
      type: node.id
    }
  })
  console.log('window.featureMap!!!', window.featureMap)
  forceDrawFeatures.map(item => {
    const position = Cesium.Cartesian3.fromDegrees(
      item.geometry.x,
      item.geometry.y,
      4
    );
    window.whiteLabelMap[node.id].add({
      id: `label@${item.attributes.SMID}@${node.id}`,
      text: item.attributes.SHORTNAME || item.attributes.NAME,
      fillColor: node.id == '项目' ? new Cesium.Color.fromCssColorString("#02FCDC") : new Cesium.Color.fromCssColorString("#fff"),
      font: "8px",
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6000),
      pixelOffset: new Cesium.Cartesian2(0, -30),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      position
    });
    window.blackLabelMap[node.id].add({
      id: `label@${item.attributes.SMID}@${node.id}`,
      text: item.attributes.SHORTNAME || item.attributes.NAME,
      fillColor: node.id == '项目' ? new Cesium.Color.fromCssColorString("#02FCDC") : new Cesium.Color.fromCssColorString("#010C27"),
      font: "8px",
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6000),
      pixelOffset: new Cesium.Cartesian2(0, -30),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      position
    });
    window.currentMapType == 'vectorwhite' ? window.whiteLabelMap[node.id].setAllLabelsVisible(false) : window.blackLabelMap[node.id].setAllLabelsVisible(false)
    window.billboardMap[node.id].add({
      id: `billboard@${item.attributes.SMID}@${node.id}`,
      image: node.icon ? `/static/images/map-ico/${node.icon}.png` : `/static/images/map-ico/${item.attributes.CURRENT_STATE.trim()}.png`,
      width: node.iconSize == 'small' ? 24 : 24,
      height: node.iconSize == 'small' ? 24 : 25,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      position
    })
  });
  fn && fn();
};
