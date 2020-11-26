
// 地图初始配置
export const initMapConfig = () => {
  window.earth.imageryLayers.get(0).show = false;
  window.earth.scene.globe.baseColor = new Cesium.Color.fromCssColorString(
      "rgba(13, 24, 45, 1)"
  );
  // 限制缩放级别
  // window.earth.scene.screenSpaceCameraController.minimumZoomDistance = 1000;
  // window.earth.scene.screenSpaceCameraController.maximumZoomDistance = 20000;
}


// 底图叠加
export const mapImageLayerInit = (url) => {
  return window.earth.imageryLayers.addImageryProvider(
      new Cesium.SuperMapImageryProvider({ url })
  );
}

// Mvt服务叠加
export const mapMvtLayerInit = (name, url, show = true) => {
  const layer = window.earth.scene.addVectorTilesMap({ url, name, viewer: window.earth });
  layer.show = show;
}

// wmts 2.5d
export const mapWmtsLayerInit = (name, url) => {
  const matrixIds = [];
  for (let i = 0; i < 20; ++i) {
      matrixIds[i] = i + 1;
  }
  return window.earth.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url,
      name,
      layer: '3dmap',
      style: "default",
      format: "image/png",
      tileMatrixSetID: "custom_3dmap",
      tileMatrixLabels: matrixIds,
      tilingScheme: new Cesium.GeographicTilingScheme({
          numberOfLevelZeroTilesX: 2
      }),
  }));
}

// 水面叠加
export const mapRiverLayerInit = (name, url) => {
  return new Promise((resolve, reject) => {
      const riverPromise = window.earth.scene.addS3MTilesLayerByScp(url, { name });
      Cesium.when(riverPromise, () => {
          const LAYER = window.earth.scene.layers.find(name)
          LAYER.style3D.bottomAltitude = 0;
          LAYER.refresh();
          LAYER.visibleDistanceMax = 2000;
          resolve(true)
      });
  })
}


const cameraView = {
  destination: Cesium.Cartesian3.fromDegrees(
      120.67625660935506,
      27.990332018707733,
      15000.0
  ),
  orientation: {
      heading: 0.01768860454315663,
      pitch: Cesium.Math.toRadians(-90),
      roll: 0,
  },
}

// 相机视角初始化
export const initCamera = () => {
  window.earth.scene.camera.setView(cameraView);
}


// 视角复位
export const resetCamera = () => {
  window.earth.scene.camera.flyTo(cameraView);
}












// 添加定位图标
export const addLocationIcon = (geometry, id) => {
  const datasource = window.earth.dataSources.getByName("location")[0];
  datasource.entities.removeAll();
  window.earth.entities.removeById("address-location");   // 消除地名地址定位图标

  const {
      x,
      y
  } = geometry;
  const locationEntity = new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(x, y, 4),
      billboard: {
          image: `/static/images/map-ico/location2.png`,
          width: 40,
          height: 40,
          scaleByDistance: new Cesium.NearFarScalar(3000, 1.5, 6000, 1.2),
          // pixelOffset: new Cesium.Cartesian2(0, -5),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
      id,
  });

  datasource.entities.add(locationEntity);
}


// 清除定位图标
export const cleanLocationIcon = () => {
  const datasource = window.earth.dataSources.getByName("location")[0];
  datasource.entities.removeAll();
}