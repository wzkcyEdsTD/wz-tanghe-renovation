
<template>
  <div class="detail-popup">
    <div id="forcePopUp" v-if="forcePosition.x && forcePosition.y">
      <div
        id="forcePopUpContent"
        class="leaflet-popup"
        :style="{transform:`translate3d(${forcePosition.x}px,${forcePosition.y}px, 0)`}"
      >
        <a class="leaflet-popup-close-button" href="#" @click="closePopup"></a>
        <div class="leaflet-popup-content-wrapper">
          <div id="forcePopUpLink" class="leaflet-popup-content">
            <div class="leaflet-popup-content">
              <header>{{forceEntity.extra_data.SHORTNAME || forceEntity.extra_data.NAME}}</header>
              <ul class="content-body">
                <li>
                  <span>所属区县:</span>
                  <span>{{forceEntity.extra_data.DISTRICT}}</span>
                </li>
                <li>
                  <span>所属街道:</span>
                  <span>{{forceEntity.extra_data.STREET}}</span>
                </li>
                <!-- <li v-for="(item,key,index) in forceEntity.fix_data" :key="index">
                  <span>{{key}}</span>
                  <span>{{item}}</span>
                </li> -->
              </ul>
              <div class="detail" @click="isShow = true">查看详情 >></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div class="info-container" v-show="isShow">
        <span class="close-btn" @click="isShow = false"></span>
        <div class="header-wrapper">
          <div class="title-wrapper">
            <span class="pre"></span>
            <span class="title">信息详情</span>
          </div>
          <ul class="header-list">
            <li v-for="(item,index) in nameList" :key="index"
              class="header-item" :class="{active: activeName==item.value}"
              @click="activeName = item.value">
              {{item.label}}
            </li>
            <!-- <li class="header-item">现场记录</li>
            <li class="header-item">视频</li>
            <li class="header-item">全景</li> -->
          </ul>
        </div>
        <div class="basic-wrapper">
           <div class="sub-title">基本信息</div>
           <ul>
             <li v-for="(item,key,index) in fixData" :key="index" class="info-item">
                <span class="key">{{key}}</span>
                <span class="value">{{item}}</span>
              </li>
           </ul>
        </div>
        <div class="spot-wrapper">
          <div class="sub-title">现场记录</div>
          <viewer class="img-wrapper" :images="photoList">
            <img v-for="(item,index) in photoList" :key="index" 
              :src="`/static/images/${forceEntity.type}/${item}`" alt=""
            >
          </viewer>
        </div>
        <div class="video-wrapper">
          <div class="sub-title">视频</div>
          <div class="content-wrapper">
            <img src="/static/images/video.png" alt="">
            <img src="/static/images/video.png" alt="">
            <img src="/static/images/video.png" alt="">
            <img src="/static/images/video.png" alt="">
          </div>
        </div>
        <div class="overall-wrapper">
          <div class="sub-title">全景</div>
          <img v-for="(item,index) in overallList" :key="index"
            :src="`/static/images/VRPic/${item.FEATUREGUID}.png`" @click="openQJ(item)"
          >
        </div>
      </div>
    </transition>
    <div class="QJFrame" v-show="showQJ">
      <i class="close" @click="showQJ = false"></i>
      <iframe id="content" :src="QJURL"></iframe>
    </div>
  </div>
</template>

<script>
import {ZBQJList} from "config/ZBQJConfig";
export default {
  data() {
    return {
      forceEntity: {},
      forcePosition: {},
      isShow: false,
      nameList: [{
        label: '基本信息',
        value: 'basic'
      }, {
        label: '现场记录',
        value: 'spot'
      }, {
        label: '视频',
        value: 'video'
      }, {
        label: '全景',
        value: 'overall'
      }],
      activeName: 'basic',
      showQJ: false,
      QJURL: ''
    };
  },
  computed: {
    fixData() {
      let fixData = {}
      let currentData = this.forceEntity.fix_data
      if (currentData) {
        for (var i in currentData) {
          if (currentData[i].length) {
            fixData[i] = currentData[i]
          }
        }
        return fixData
      }
    },
    photoList() {
      if (this.forceEntity.extra_data && this.forceEntity.extra_data.PHOTO) {
        let photoStr = this.forceEntity.extra_data.PHOTO
        if (photoStr.length) {
          if (~photoStr.indexOf(';')) {
            return photoStr.split(';')
          } else {
            return [photoStr]
          }
        }
      }
    },
    overallList() {
      let overallList = []
      let currentZBQJ = []
      console.log('ZBQJList', ZBQJList)
      if (this.forceEntity.extra_data && this.forceEntity.extra_data.ZBQJ) {
        let ZBQJStr = this.forceEntity.extra_data.ZBQJ
        if (ZBQJStr.length) {
          if (~ZBQJStr.indexOf(',')) {
            currentZBQJ = ZBQJStr.split(',')
          } else {
            currentZBQJ = [ZBQJStr]
          }
          currentZBQJ.forEach(i => {
            ZBQJList.forEach(j => {
              if (i === j.NAME) {
                overallList.push(j)
              }
            })
          })
        }
        return overallList
      }
    }
  },
  async mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {},
    /**
     *  详情点赋值
     *  @param {object} forceEntity 详情点信息
     */
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      console.log('aaa', forceEntity)
    },
    /**
     *  框体移动
     *  @param {object} position
     */
    renderForceEntity() {
      const forceEntity = this.forceEntity;
      if (forceEntity.extra_data) {
        const pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          window.earth.scene,
          forceEntity.position
        );
        if (
          this.forcePosition.x !== pointToWindow.x ||
          this.forcePosition.y !== pointToWindow.y
        ) {
          this.forcePosition = pointToWindow;
        }
      }
    },
    openQJ(qj) {
      this.QJURL = qj.VR
      this.showQJ = true
    },
    closePopup() {
      this.forcePosition = {};
      this.forceEntity = {};
    },
  },
};
</script>

<style lang="less">
#forcePopUp {
  .leaflet-popup {
    top: -80px;
    left: 30px;
    position: absolute;
  }

  .leaflet-popup-close-button {
    .bg-image("./images/close");
    position: absolute;
    top: -10px;
    right: -10px;
    width: 32px;
    height: 32px;
    text-decoration: none;
    cursor: pointer;
  }

  .leaflet-popup-content-wrapper {
    .bg-image("./images/bg");
    text-align: center;
    height: 132px;
    width: 240px;
    box-sizing: border-box;
    padding: 15px 20px 5px 20px;
  }

  .leaflet-popup-content {
    position: relative;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    width: 100%;
    height: 100%;
    > header {
      line-height: 20px;
      box-sizing: border-box;
      // padding-right: 5px;
      font-size: 18px;
      font-family: YouSheBiaoTiHei;
      text-align: left;
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 1);
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
    .content-body {
      // flex: 1;
      // overflow-y: auto;
      margin-top: 8px;
      text-align: left;
      >li {
        font-size: 14px;
        height: 22px;
        line-height: 22px;
      }
    }
    .detail {
      position: absolute;
      bottom: 5px;
      right: 0;
      color: #2ACBFE;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.info-container {
  width: 4.5rem;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0px;
  z-index: 1999;
  padding: 5vw 10px 0 10px;
  // background: linear-gradient(271deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
  background-color: #040D33;
  color: #fff;
  overflow-y: auto;
  .close-btn {
    position: absolute;
    right: 30px;
    width: 15px;
    height: 15px;
    .bg-image("./images/close-info");
    cursor: pointer;
  }
  .header-list {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .header-item {
      margin-right: 20px;
      padding-bottom: 3px;
      font-family: PingFang;
      font-size: 18px;
      font-weight: bold;
      color: #165CE2;
      &.active {
        color: #61F5F5;
        border-bottom: 2px solid #00FFD4;
      }
    }
  }
  .basic-wrapper {
    margin-top: 10px;
    ul {
      // border: 1px solid #000C22;
      padding: 15px;
      .info-item {
        display: flex;
        // margin-top: 8px;
        font-family: PingFang;
        background-color: rgba(0, 12, 34, 0.69);
        border-bottom: 1px solid rgba(22, 95, 234, 0.4);
        .key {
          // margin-right: 20px;
          padding: 15px 10px;
          width: 120px;
          background-color: rgba(10,36,86,0.5);
          text-align: center;
        }
        .value {
          padding: 15px 10px;
          flex: 1;
          word-break: break-all;
        }
      }
      // li:nth-child(even) {
      //   background-color: rgba(22, 95, 234, 0.24);
      // }
    }
  }
  .spot-wrapper, .video-wrapper {
    margin-top: 20px;
    .img-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 10px 15px;
    }
    img {
      width: 160px;
      margin-right: 10px;
      margin-top: 10px;
    }
  }
  .overall-wrapper {
    margin-top: 20px;
  }
  .title-wrapper {
    display: flex;
    align-items: flex-end;
    .pre {
      display: block;
      width: 10px;
      height: 24px;
      background: linear-gradient(180deg, #16EAEA 0%, rgba(11, 48, 117, 0) 100%);
      transform: skewX(-30deg);
    }
    .title {
      display: block;
      height: 35px;
      line-height: 35px;
      font-family: YouSheBiaoTiHei;
      font-size: 27px;
      letter-spacing: 0px;
      color: #ffffff;
      text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.64);
      position: relative;
      padding-left: 12px;
    }
    .title::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 2px;
      width: 300px;
      height: 15px;
      z-index: -1;
      background-image: linear-gradient(90deg, #1950B9 0%, transparent 100%);
      transform: skewX(-30deg);
    }
  }
  .sub-title {
    display: block;
    margin-left: 20px;
    height: 35px;
    line-height: 35px;
    font-family: YouSheBiaoTiHei;
    font-size: 20px;
    letter-spacing: 0px;
    color: #ffffff;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.64);
    position: relative;
  }
  .sub-title::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 200px;
    height: 15px;
    z-index: -1;
    background-image: linear-gradient(90deg, #1950B9 0%, transparent 100%);
    transform: skewX(-30deg);
  }
  .content-wrapper {
    padding: 0 15px;
  }
}
.QJFrame {
  position: absolute;
  z-index: 9999;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 1s;
  background: rgba(19,45,85,.9);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  box-sizing: border-box;
  bottom: 0;
  #content {
    width: 100%;
    height: 800px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  .close {
    .bg-image("./images/close");
    position: absolute;
    top: 8%;
    right: 3%;
    width: 32px;
    height: 32px;
    text-decoration: none;
    cursor: pointer;
    z-index: 99;
  }
}
</style>
