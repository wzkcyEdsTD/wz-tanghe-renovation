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
// export const fixTreeWithExtra = (gArr, eObj, node, context) => {
//   const extraKeys = Object.keys(eObj);
//   const drawFeatures = [];
//   const extraFeatures = [];
//   gArr.map(item => {
//     const { attributes } = item;
//     ~extraKeys.indexOf(attributes.SHORTNAME)
//       ? extraFeatures.push({ ...item, extra_data: eObj[attributes.SHORTNAME] })
//       : drawFeatures.push(item);
//   });
//   context[node.callback](extraFeatures);
//   return { drawFeatures };
// };

/**
 * 画点、面
 * @param {*} context
 * @param {*} param1
 * @param {*} node
 * @param {*} fields 别名数组
 */
export const treeDrawTool = (context, { result }, node, fields = [], fn) => {
  const fieldHash = fixFieldsByArr(fields);
  //  hash赋值
  window.billboardMap[node.id] = window.earth.scene.primitives.add(new Cesium.BillboardCollection());
  window.whiteLabelMap[node.id] = window.earth.scene.primitives.add(new Cesium.LabelCollection());
  window.blackLabelMap[node.id] = window.earth.scene.primitives.add(new Cesium.LabelCollection());

  let forceDrawFeatures = [];
  forceDrawFeatures = result.features;
  if (node.callback) {
    context.saveDataMap[node.id] = result.features;
    context[node.callback](forceDrawFeatures)
  }

  //  属性赋值
  forceDrawFeatures.map(v => {
    !window.featureMap[node.id] && (window.featureMap[node.id] = {});
    if (v.attributes) {
      window.featureMap[node.id][v.attributes.SMID] = {
        name: v.attributes.SHORTNAME || v.attributes.SHORT_NAME || v.attributes.NAME,
        attributes: v.attributes,
        geometry: v.geometry,
        fix_data: fixAttributesByOrigin(v.attributes, fieldHash),
        type: node.id
      }
      return Object.assign(v, { type: node.id })
    } else {
      window.featureMap[node.id][v.resourceId] = {
        name: v.shortName || v.name,
        attributes: v,
        geometry: {x: Number(v.lng), y: Number(v.lat)},
        type: node.id
      }
      return Object.assign(v, { geometry: {x: Number(v.lng), y: Number(v.lat)} })
    }
  })
  context.setSourceMap({ [node.id]: forceDrawFeatures });

  // 获取hash地址判断当前页面
  let currentHash = window.location.hash

  forceDrawFeatures.map(item => {
    const position = Cesium.Cartesian3.fromDegrees(
      item.geometry.x,
      item.geometry.y,
      4
    );

    let billImage
    let width = 32
    let height = 32
    if (node.marker_icon) {
      if (node.marker_icon == '断点') {
        if (~currentHash.indexOf('compare')) {
          billImage = `/static/images/map-ico/断点2.png`
          width = 28
          height = 28
        } else {
          billImage = `/static/images/map-ico/断点.png`
        }
      } else {
        billImage = `/static/images/map-ico/${node.marker_icon}.png`
      }
    } else {
      if (~currentHash.indexOf('sourcelayer')) {
        if (item.attributes) {
          billImage = `/static/images/map-ico/${item.attributes.STATUS.trim()}.png`
        } else {
          billImage = `/static/images/map-ico/${item.status.trim()}.png`
        }
      }
      if (~currentHash.indexOf('compare')) {
        if (item.attributes) {
          billImage = `/static/images/map-ico/${item.attributes.ZT.trim()}.png`
        } else {
          billImage = `/static/images/map-ico/${item.zt.trim()}.png`
        }
        height = 35
      }
    }

    window.billboardMap[node.id].add({
      id: item.attributes ? `billboard@${item.attributes.SMID}@${node.id}` : `billboard@${item.resourceId}@${node.id}`,
      image: billImage,
      width: width,
      height: height,
      scaleByDistance: new Cesium.NearFarScalar(1000, 2, 6000, 1),
      // sizeInMeters:true,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      position
    })

    if (node.id == '十二景') return;

    if (window.currentMapType == 'vectorwhite') {
      addBlackLabel(node.id, item)
    } else {
      addWhiteLabel(node.id, item)
    }

  });
  fn && fn();
};

export const addWhiteLabel = (key, item) => {
  let fillColor
  if (~key.indexOf('项目')) {
    if (item.attributes) {
      fillColor = item.attributes.SF2021 == '是' ? new Cesium.Color.fromCssColorString("#CD2626") : new Cesium.Color.fromCssColorString("#3379FF")
    } else {
      fillColor = item.isImportant ? new Cesium.Color.fromCssColorString("#CD2626") : new Cesium.Color.fromCssColorString("#3379FF")
    }
  } else {
    fillColor = new Cesium.Color.fromCssColorString("#fff")
  }
  const position = Cesium.Cartesian3.fromDegrees(
    item.geometry.x,
    item.geometry.y,
    4
  );
  window.whiteLabelMap[key].add({
    id: item.attributes ? `label@${item.attributes.SMID}@${key}` : `label@${item.resourceId}@${key}`,
    text: item.attributes ? item.attributes.SHORTNAME || item.attributes.SHORT_NAME || item.attributes.NAME : item.shortName || item.name,
    // fillColor: ~key.indexOf('项目') ? item.attributes.SF2021 == '是' ? new Cesium.Color.fromCssColorString("#CD2626") : new Cesium.Color.fromCssColorString("#3379FF") : new Cesium.Color.fromCssColorString("#fff"),
    fillColor,
    font: "bold 14px Microsoft YaHei",
    outlineColor: Cesium.Color.BLACK,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: '2',
    scaleByDistance: new Cesium.NearFarScalar(500, 1.3, 6000, 1),
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6000),
    pixelOffset: new Cesium.Cartesian2(0, 38),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    position
  });
}

export const addBlackLabel = (key, item) => {
  let fillColor
  if (~key.indexOf('项目')) {
    if (item.attributes) {
      fillColor = item.attributes.SF2021 == '是' ? new Cesium.Color.fromCssColorString("#CD2626") : new Cesium.Color.fromCssColorString("#3379FF")
    } else {
      fillColor = item.isImportant ? new Cesium.Color.fromCssColorString("#CD2626") : new Cesium.Color.fromCssColorString("#3379FF")
    }
  } else {
    fillColor = new Cesium.Color.fromCssColorString("#010C27")
  }
  const position = Cesium.Cartesian3.fromDegrees(
    item.geometry.x,
    item.geometry.y,
    4
  );
  window.blackLabelMap[key].add({
    id: `label@${item.attributes.SMID}@${key}`,
    text: item.attributes ? item.attributes.SHORTNAME || item.attributes.SHORT_NAME || item.attributes.NAME : item.shortName || item.name,
    // fillColor: ~key.indexOf('项目') ? item.attributes.SF2021 == '是' ? new Cesium.Color.fromCssColorString("#CD2626") : new Cesium.Color.fromCssColorString("#3379FF") : new Cesium.Color.fromCssColorString("#010C27"),
    fillColor,
    font: "bold 14px Microsoft YaHei",
    outlineColor: Cesium.Color.WHITE,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: '2',
    scaleByDistance: new Cesium.NearFarScalar(500, 1.3, 6000, 1),
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6000),
    pixelOffset: new Cesium.Cartesian2(0, 38),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    position
  });
}
