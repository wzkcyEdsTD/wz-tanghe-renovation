<template>
  <div id="drawTool" style="position: fixed; top: 20%">
    <el-button id="pointBtn" @click="drawPoint">画点</el-button>
    <el-button id="lineBtn" @click="drawLine">画线</el-button>
    <el-button id="polyBtn" @click="drawPolygon">画面</el-button>
    <el-button id="clearBtn" @click="clear">清除</el-button>
    <!-- <div id="tooltip"></div> -->
  </div>
</template>

<script>
const Cesium = window.Cesium;
export default {
  name: "drawTool",
  data() {
    return {
      tempEntities: [],
      datasource: null,
      onePoints: [],
      linePoints: [],
      polygonPoints: []
    };
  },
  methods: {
    createEntityCollection() {
      const DrawtoolEntityCollection = new Cesium.CustomDataSource("drawtool");
      window.earth.dataSources.add(DrawtoolEntityCollection);
      this.datasource = window.earth.dataSources.getByName("drawtool")[0];
    },
    drawPoint() {
      this.onePoints = []
      var handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      handler.setInputAction((movement) => {
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction((movement) => {
        let position = window.earth.camera.pickEllipsoid(
          movement.position,
          window.earth.scene.globe.ellipsoid
        );
        this.onePoints.push(position)
        let point = this._drawPoint(position);
        this.tempEntities.push(point);

        console.log('onePoints', this.onePoints)
        handler.destroy(); //关闭事件句柄
        handler = null;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // handler.setInputAction(() => {
      //   handler.destroy(); //关闭事件句柄
      //   handler = null;
      // }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      // handler.setInputAction(() => {
      //   handler.destroy(); //关闭事件句柄
      //   handler = null;
      // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    _drawPoint(position, config) {
      var config = config ? config : {};
      var pointGeometry = this.datasource.entities.add({
        name: "点几何对象",
        position: position,
        point: {
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
      return pointGeometry;
    },
    drawLine() {
      // var tooltip = document.getElementById("tooltip");
      this.linePoints = [];
      var handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      //鼠标移动事件
      handler.setInputAction((movement) => {
        // tooltip.style.left = movement.endPosition.x + 10 + "px";
        // tooltip.style.top = movement.endPosition.y + 20 + "px";
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      //左键点击操作
      handler.setInputAction((click) => {
        //调用获取位置信息的接口
        let position = window.earth.camera.pickEllipsoid(
          click.position,
          window.earth.scene.globe.ellipsoid
        );
        this.linePoints.push(position);
        let tempLength = this.linePoints.length;
        //调用绘制点的接口
        let point = this._drawPoint(this.linePoints[this.linePoints.length - 1]);
        this.tempEntities.push(point);
        if (tempLength > 1) {
          let pointline = this._drawLine([
            this.linePoints[this.linePoints.length - 2],
            this.linePoints[this.linePoints.length - 1],
          ]);
          this.tempEntities.push(pointline);
        } else {
          // tooltip.innerHTML = "请绘制下一个点，右键结束";
        }
        return;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //右键点击操作
      handler.setInputAction((click) => {
        // tooltip.style.display = "none";
        // tooltip.innerHTML = "左键单击绘制,右键结束绘制";
        // this.linePoints = [];
        console.log('linePoints', this.linePoints)
        handler.destroy(); //关闭事件句柄
        handler = null;
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    _drawLine(positions, config) {
      if (positions.length < 1) return;
      var config = config ? config : {};
      var polylineGeometry = this.datasource.entities.add({
        name: "线几何对象",
        polyline: {
          positions: positions,
          width: config.width ? config.width : 5.0,
          material: new Cesium.PolylineGlowMaterialProperty({
            color: config.color
              ? new Cesium.Color.fromCssColorString(config.color)
              : Cesium.Color.GOLD,
          }),
          depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
            color: config.color
              ? new Cesium.Color.fromCssColorString(config.color)
              : Cesium.Color.GOLD,
          }),
        },
      });
      return polylineGeometry;
    },
    drawPolygon() {
      this.polygonPoints = [];
      var handler = new Cesium.ScreenSpaceEventHandler(window.earth.scene.canvas);
      // tooltip.style.display = "block";
      //鼠标移动事件
      handler.setInputAction((movement) => {
        // tooltip.style.left = movement.endPosition.x + 10 + "px";
        // tooltip.style.top = movement.endPosition.y + 20 + "px";
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      //左键点击操作
      handler.setInputAction((click) => {
        //调用获取位置信息的接口
        let position = window.earth.camera.pickEllipsoid(
          click.position,
          window.earth.scene.globe.ellipsoid
        );
        this.polygonPoints.push(position);
        let tempLength = this.polygonPoints.length;
        //调用绘制点的接口
        let point = this._drawPoint(position);
        this.tempEntities.push(point);
        if (tempLength > 1) {
          let pointline = this._drawLine([
            this.polygonPoints[this.polygonPoints.length - 2],
            this.polygonPoints[this.polygonPoints.length - 1],
          ]);
          this.tempEntities.push(pointline);
        } else {
          // tooltip.innerHTML = "请绘制下一个点，右键结束";
        }
        return;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //右键点击操作
      handler.setInputAction((click) => {
        let cartesian = window.earth.camera.pickEllipsoid(
          click.position,
          window.earth.scene.globe.ellipsoid
        );
        if (cartesian) {
          let tempLength = this.polygonPoints.length;
          if (tempLength < 3) {
            alert("请选择3个以上的点再执行闭合操作命令");
          } else {
            //闭合最后一条线
            let pointline = this._drawLine([
              this.polygonPoints[this.polygonPoints.length - 1],
              this.polygonPoints[0],
            ]);
            this.tempEntities.push(pointline);
            this._drawPolygon(this.polygonPoints);
            this.tempEntities.push(this.polygonPoints);
            console.log('polygonPoints', this.polygonPoints)
            handler.destroy(); //关闭事件句柄
            handler = null;
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    _drawPolygon(positions, config) {
      if (positions.length < 2) return;
      var config = config ? config : {};
      var polygonGeometry = this.datasource.entities.add({
        name: "线几何对象",
        polygon: {
          height: 0.1,
          hierarchy: new Cesium.PolygonHierarchy(positions),
          material: config.color
            ? new Cesium.Color.fromCssColorString(config.color).withAlpha(0.2)
            : new Cesium.Color.fromCssColorString("#FFD700").withAlpha(0.2),
          perPositionHeight: true,
        },
      });
      return polygonGeometry;
    },
    clear() {
      this.datasource.entities.removeAll();
    },
  },
  mounted() {
    this.createEntityCollection();
  },
};
</script>

<style lang="less" scoped>
</style>