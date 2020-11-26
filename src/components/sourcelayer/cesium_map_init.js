// 地图初始配置
export const initMapConfig = () => {
  window.earth.imageryLayers.get(0).show = false;
  window.earth.scene.globe.baseColor = new Cesium.Color.fromCssColorString(
      "rgba(13, 24, 45, 1)"
  );
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

// 白模叠加初始化
export const mapBaimoLayerInit = (arrURL) => {
  return new Promise((resolve, reject) => {
      arrURL.map(({ KEY, URL }, index) => {
          const baimoPromise = window.earth.scene.addS3MTilesLayerByScp(URL, {
              name: KEY,
          });
          Cesium.when(baimoPromise, async (_LAYER_) => {
              const LAYER = window.earth.scene.layers.find(KEY);
              LAYER.indexedDBSetting.isGeoTilesRootNodeSave = true;
              LAYER.residentRootTile = true;
              LAYER.style3D.fillForeColor = new Cesium.Color.fromCssColorString("rgba(137,137,137, 1)");
              const hyp = new Cesium.HypsometricSetting();
              const colorTable = new Cesium.ColorTable();
              hyp.MaxVisibleValue = 300;
              hyp.MinVisibleValue = 0;
              colorTable.insert(300, new Cesium.Color(1, 1, 1));
              colorTable.insert(160, new Cesium.Color(0.95, 0.95, 0.95));
              colorTable.insert(76, new Cesium.Color(0.7, 0.7, 0.7));
              colorTable.insert(0, new Cesium.Color(20 / 255, 28 / 255, 64 / 255));
              hyp.ColorTable = colorTable;
              hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
              hyp.Opacity = 1;
              LAYER.hypsometricSetting = {
                  hypsometricSetting: hyp,
                  analysisMode:
                      Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL,
              };
              index == arrURL.length - 1 && resolve(true)
          });
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