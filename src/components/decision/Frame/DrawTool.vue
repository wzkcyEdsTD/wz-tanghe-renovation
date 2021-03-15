<template>
  <div class="drawTool" v-show="showDrawInfo">
    <!-- <el-button id="pointBtn" @click="drawPoint">画点</el-button>
    <el-button id="lineBtn" @click="drawLine">画线</el-button>
    <el-button id="polyBtn" @click="drawPolygon">画面</el-button>
    <el-button id="clearBtn" @click="clearDraw">清除</el-button> -->
    <!-- <div id="tooltip"></div> -->
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">地图临时标注</span>
    </div>
    <div class="input-wrapper" v-show="showInput">
      <div class="header">标注信息</div>
      <div class="input-text">
        <span>标注名称：</span>
        <el-input class="draw-input" v-model="nameValue" placeholder="请输入名称"></el-input>
      </div>
      <div class="input-area">
        <div>备注：</div>
        <el-input class="draw-areainput"
          type="textarea"
          resize="none"
          :rows="5"
          v-model="remarkValue">
        </el-input>
      </div>
      <div class="confirm-btn" @click="submit">确认</div>
      <div class="clear"></div> 
    </div>
    <div class="query-wrapper" v-show="showQuery">
      <div class="top">
        <div class="query-item">
          <div class="left">标注时间：</div>
          <div class="right">
            <el-date-picker
              class="draw-datepicker"
              value-format="yyyy-MM-dd"
              v-model="startDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>至
            <el-date-picker
              class="draw-datepicker"
              value-format="yyyy-MM-dd"
              v-model="endDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="query-item">
          <div class="left">名称：</div>
          <div class="right">
            <el-input class="draw-input" v-model="queryName"></el-input>
          </div>
        </div>
        <div class="confirm-btn" @click="query">查询</div>
        <div class="clear"></div> 
      </div>
      <div class="bottom">
        <div class="header">查询结果</div>
        <div class="result-wrapper">
          <div class="result-header">
            <span style="flex:1.1;">选择</span>
            <span class="flex2">操作人</span>
            <span class="flex2">名称</span>
            <span class="flex2">备注</span>
            <span class="flex2">操作时间</span>
          </div>
          <ul class="result-list">
            <li class="result-item" v-for="(item,index) in historyList" :key="index">
              <span class="flex1" style="padding-left:5px;"><el-checkbox v-model="item.checked" @change="checked=>handleCheckedChange(checked,item)"></el-checkbox></span>
              <span class="flex2">{{item.createby}}</span>
              <span class="flex2" :title="item.name">{{item.name}}</span>
              <span class="flex2" :title="item.remark">{{item.remark}}</span>
              <span class="flex2" :title="item.createtime.substr(0,10)">{{item.createtime.substr(0,10)}}</span>
            </li>
            <div class="no-data" v-show="!historyList.length">暂无数据</div>
            <!-- <li class="result-item">
              <span class="flex1" style="padding-left:5px;"><el-checkbox v-model="checked"></el-checkbox></span>
              <span class="flex2">金盛</span>
              <span class="flex2">标绘1</span>
              <span class="flex2">test</span>
              <span class="flex2">2021-01-115</span>
            </li>
            <li class="result-item">
              <span class="flex1" style="padding-left:5px;"><el-checkbox v-model="checked"></el-checkbox></span>
              <span class="flex2">金盛</span>
              <span class="flex2">标绘1</span>
              <span class="flex2">test</span>
              <span class="flex2">2021-01-115</span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cesium = window.Cesium;
import { mapGetters } from "vuex";
import {
  addPlot,
  queryPlotList,
  queryPlot
} from "api/tangheAPI";
export default {
  name: "drawTool",
  data() {
    return {
      showDrawInfo: false,
      datasource: null,
      pointHandler: null,
      lineHandler: null,
      polygonHandler: null,
      tempEntities: [],   // 临时点位
      onePoints: [],
      linePoints: [],
      polygonPoints: [],
      showInput: false,
      showQuery: false,
      nameValue: '',
      remarkValue: '',
      startDate: '',
      endDate: '',
      queryName: '',
      historyList: []
    };
  },
  computed: {
    ...mapGetters("login", ["username", "name"]),
  },
  methods: {
    createEntityCollection() {
      const DrawtoolEntityCollection = new Cesium.CustomDataSource("drawtool");
      window.earth.dataSources.add(DrawtoolEntityCollection);
      this.datasource = window.earth.dataSources.getByName("drawtool")[0];
    },
    drawPoint() {
      this.destroyAll()
      let tempArr = []
      this.pointHandler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      this.pointHandler.setInputAction((movement) => {
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.pointHandler.setInputAction((movement) => {
        let position = window.earth.camera.pickEllipsoid(
          movement.position,
          window.earth.scene.globe.ellipsoid
        );
        tempArr.push(position)
        this.onePoints.push(tempArr)
        let point = this._drawPoint(position);
        // this.tempEntities.push(point);

        this.showDrawInfo = true
        this.showInput = true
        this.pointHandler.destroy(); //关闭事件句柄
        this.pointHandler = null;
        this.$parent.currentDraw = "";
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    _drawPoint(position, config) {
      var config = config ? config : {};
      var pointGeometry = this.datasource.entities.add({
        name: config.name || "点几何对象",
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
      this.destroyAll()
      // var tooltip = document.getElementById("tooltip");
      let tempArr = []
      this.lineHandler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      //鼠标移动事件
      this.lineHandler.setInputAction((movement) => {
        // tooltip.style.left = movement.endPosition.x + 10 + "px";
        // tooltip.style.top = movement.endPosition.y + 20 + "px";
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      //左键点击操作
      this.lineHandler.setInputAction((click) => {
        //调用获取位置信息的接口
        let position = window.earth.camera.pickEllipsoid(
          click.position,
          window.earth.scene.globe.ellipsoid
        );
        tempArr.push(position)
        let tempLength = tempArr.length
        //调用绘制点的接口
        let point = this._drawPoint(tempArr[tempArr.length - 1]);
        this.tempEntities.push({type:'point',data:point});
        if (tempLength > 1) {
          let pointline = this._drawLine([
            tempArr[tempArr.length - 2],
            tempArr[tempArr.length - 1],
          ]);
          this.tempEntities.push({type:'line',data:pointline});
        } else {
          // tooltip.innerHTML = "请绘制下一个点，右键结束";
        }
        return;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //右键点击操作
      this.lineHandler.setInputAction((click) => {
        // tooltip.style.display = "none";
        // tooltip.innerHTML = "左键单击绘制,右键结束绘制";

        this.tempEntities.forEach(item => {
          if (item.type == 'point') {
            this.datasource.entities.removeById(item.data.id)
          }
        })

        this.tempEntities = []
        this.linePoints.push(tempArr)
        this.showDrawInfo = true
        this.showInput = true
        this.lineHandler.destroy(); //关闭事件句柄
        this.lineHandler = null;
        this.$parent.currentDraw = "";
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    _drawLine(positions, config) {
      if (positions.length < 1) return;
      var config = config ? config : {};
      var polylineGeometry = this.datasource.entities.add({
        name: config.name || "线几何对象",
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
      this.destroyAll()
      let tempArr = []
      this.polygonHandler = new Cesium.ScreenSpaceEventHandler(window.earth.scene.canvas);
      // tooltip.style.display = "block";
      //鼠标移动事件
      this.polygonHandler.setInputAction((movement) => {
        // tooltip.style.left = movement.endPosition.x + 10 + "px";
        // tooltip.style.top = movement.endPosition.y + 20 + "px";
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      //左键点击操作
      this.polygonHandler.setInputAction((click) => {
        //调用获取位置信息的接口
        let position = window.earth.camera.pickEllipsoid(
          click.position,
          window.earth.scene.globe.ellipsoid
        );
        tempArr.push(position)
        let tempLength = tempArr.length
        //调用绘制点的接口
        let point = this._drawPoint(position);
        this.tempEntities.push({type:'point',data:point});
        if (tempLength > 1) {
          let pointline = this._drawLine([
            tempArr[tempArr.length - 2],
            tempArr[tempArr.length - 1],
          ]);
          this.tempEntities.push({type:'line',data:pointline});
        } else {
          // tooltip.innerHTML = "请绘制下一个点，右键结束";
        }
        return;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //右键点击操作
      this.polygonHandler.setInputAction((click) => {
        let cartesian = window.earth.camera.pickEllipsoid(
          click.position,
          window.earth.scene.globe.ellipsoid
        );
        if (cartesian) {
          let tempLength = tempArr.length;
          if (tempLength < 3) {
            this.$message({
              message: '请选择3个以上的点再执行闭合操作命令',
              type: 'error',
              offset: 50
            });
          } else {
            //闭合最后一条线
            let pointline = this._drawLine([
              tempArr[tempArr.length - 1],
              tempArr[0],
            ]);
            this.tempEntities.push({type:'line',data:pointline});
            this._drawPolygon(tempArr);
            // this.tempEntities.push(tempArr);

            this.tempEntities.forEach(item => {
              this.datasource.entities.removeById(item.data.id)
            })
            this.tempEntities = []
            this.polygonPoints.push(tempArr)
            this.showDrawInfo = true
            this.showInput = true
            this.polygonHandler.destroy(); //关闭事件句柄
            this.polygonHandler = null;
            this.$parent.currentDraw = "";
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    _drawPolygon(positions, config) {
      if (positions.length < 2) return;
      var config = config ? config : {};
      var polygonGeometry = this.datasource.entities.add({
        name: config.name || "面几何对象",
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
    recall() {
      let lastEntity = this.datasource.entities._entities._array.slice(-1)[0]
      this.datasource.entities.remove(lastEntity)
      if (~lastEntity.name.indexOf('点')) {
        this.onePoints.pop()
      }
      if (~lastEntity.name.indexOf('线')) {
        this.linePoints.pop()
      }
      if (~lastEntity.name.indexOf('面')) {
        this.polygonPoints.pop()
      }
    },
    clearDraw() {
      // this.showInput = false
      // this.showQuery = false
      this.showDrawInfo = false
      this.datasource.entities.removeAll();
      this.destroyAll()
      this.onePoints = []
      this.linePoints = []
      this.polygonPoints = []
      this.historyList.forEach(item => {
        item.checked = false
      })
    },
    destroyAll() {
      this.tempEntities.forEach(item => {
        item.data.show = false
        window.earth.entities.removeById(item.data.id)
      })
      this.tempEntities = []
      if (this.pointHandler) {
        this.pointHandler.destroy()
        this.pointHandler = null
      }
      if (this.lineHandler) {
        this.lineHandler.destroy()
        this.lineHandler = null
      }
      if (this.polygonHandler) {
        this.polygonHandler.destroy()
        this.polygonHandler = null
      }
      // this.pointHandler && this.pointHandler.destroy()
      // this.lineHandler && this.lineHandler.destroy()
      // this.polygonHandler && this.polygonHandler.destroy()
    },
    async submit() {
      this.destroyAll()

      let listArr = []
      this.onePoints.forEach(item => {
        let obj = {
          remark: this.remarkValue,
          createby: this.name,
          name: this.nameValue,
          geometry: JSON.stringify(item),
          type: 'point'
        }
        listArr.push(obj)
      })
      this.linePoints.forEach(item => {
        let obj = {
          remark: this.remarkValue,
          createby: this.name,
          name: this.nameValue,
          geometry: JSON.stringify(item),
          type: 'line'
        }
        listArr.push(obj)
      })
      this.polygonPoints.forEach(item => {
        let obj = {
          remark: this.remarkValue,
          createby: this.name,
          name: this.nameValue,
          geometry: JSON.stringify(item),
          type: 'polygon'
        }
        listArr.push(obj)
      })

      if (listArr.length && this.nameValue) {
        let res = await addPlot(listArr)
        if (res.code == 200) {
          this.$message({
            message: '保存成功',
            type: 'success',
            offset: 50
          });
          this.showQuery = true
          this.nameValue = ''
          this.remarkValue = ''
          this.clearDraw()
        }
      } else {
        this.$message({
          message: '请先完成绘制',
          type: 'error',
          offset: 50
        });
      }
    },
    async query() {
      let res = await queryPlotList({
        startTime: this.startDate,
        endTime: this.endDate,
        name: this.queryName
      })
      if (res.code == 200) {
        this.historyList = res.result
        this.historyList.map(item => {
          // return Object.assign(item, {checked: false})
          this.$set(item, 'checked', false)
          return item
        })
      }
    },
    async handleCheckedChange(val, node) {
      if (val) {
        let res = await queryPlot({groupId:node.groupid})
        if (res.code == 200) {
          res.result.forEach(item => {
            let positions = JSON.parse(item.geometry)
            if (item.type == 'point') {
              this._drawPoint(positions[0], {name: item.groupid})
            }
            if (item.type == 'line') {
              this._drawLine(positions, {name: item.groupid})
            }
            if (item.type == 'polygon') {
              this._drawPolygon(positions, {name: item.groupid})
            }
          })
        }
      } else {
        let entitys = this.datasource.entities._entities._array
        for (let i = 0; i < entitys.length; i++) {
          if (entitys[i]._name === node.groupid) {
            this.datasource.entities.remove(entitys[i]);
            i--;
          }
        }
      }
    },
    showHistory() {
      this.destroyAll()
      this.showDrawInfo = true
      this.showQuery = true
    }
  },
  mounted() {
    let d = new Date();
    this.startDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    this.endDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    this.createEntityCollection();
  },
  watch: {
    showInput(val) {
      // val && (this.showDrawInfo = true)
      if (this.showDrawInfo = true) {
        this.showQuery = !val
      }
    },
    showQuery(val) {
      // val && (this.showDrawInfo = true)
      if (this.showDrawInfo = true) {
        this.showInput = !val
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/DrawTool.less");
</style>
<style lang="less">
.draw-input {
  .el-input__inner {
    background: #00214e !important;
    border: solid 1px #87bcc1 !important;
    color: #fff !important;
  }
}
.draw-areainput {
  margin-top: 1vh;
  .el-textarea__inner {
    background: #00214e !important;
    border: solid 1px #87bcc1 !important;
    color: #fff !important;
  }
}
.draw-datepicker {
  width: 110px !important;
  .el-input__inner {
    padding: 0 !important;
    background: #00214e !important;
    text-align: center !important;
  }
  .el-input__prefix {
    display: none !important;
  }
}
</style>