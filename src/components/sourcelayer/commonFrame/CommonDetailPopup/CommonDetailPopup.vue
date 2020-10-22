
<template>
  <div class="common-detail-popup">
    <div id="forcePopUp" v-if="forcePosition.x && forcePosition.y">
      <div
        id="forcePopUpContent"
        class="leaflet-popup"
        :style="{transform:`translate3d(${forcePosition.x}px,${forcePosition.y}px, 0)`}"
      >
        <a class="leaflet-popup-close-button" href="#" @click="closePopup"></a>
        <div class="leaflet-popup-content-wrapper">
          <div id="forcePopUpLink" class="leaflet-popup-content">
            <header>{{forceEntity.attributes.NAME}}</header>
            <ul class="content-body">
              <li>
                <span>所属区县:</span>
                <span>{{forceEntity.attributes.DISTRICT}}</span>
              </li>
              <li>
                <span>所属街道:</span>
                <span>{{forceEntity.attributes.STREET}}</span>
              </li>
            </ul>
            <div class="detail" @click="isShow = true">查看详情 >></div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div class="info-container" v-show="isShow">
        <span class="close-btn" @click="closeInfo"></span>
        <div class="header-wrapper">
          <div class="title-wrapper">
            <span class="pre"></span>
            <span class="title">信息详情</span>
          </div>
          <ul class="header-list">
            <li v-for="(item,index) in nameList" :key="index"
              class="header-item" :class="{active: activeStep==index}"
              @click="headClick(item.value, index)">
              {{item.label}}
            </li>
          </ul>
        </div>
        <div id="content-wrapper" class="content-wrapper">
          <div class="content-item basic-wrapper" id="basic">
            <div class="sub-title">基本信息</div>
            <ul>
              <li v-for="(item,key,index) in fixData" :key="index" class="info-item">
                  <span class="key">{{key}}</span>
                  <span class="value">{{item}}</span>
                </li>
            </ul>
          </div>
          <div id="spot" class="content-item">
            <div class="spot-wrapper">
              <div class="sub-title">景观图</div>
              <div class="img-content">
                <el-image style="width: 160px; height: 100px; margin-right: 10px; margin-top: 10px;" v-for="(item,index) in spotList" :key="index"
                  :src="item" 
                  :preview-src-list="spotList">
                </el-image>
              </div>
              <div class="no-tip" v-show="!haveSpot">暂无数据</div>
            </div>
            <div class="spot-wrapper">
              <div class="sub-title">现场记录</div>
              <div class="spot-box" v-for="(item,index) in photoList" :key="index">
                <span class="time">{{`${item[0].split('_')[1].substring(0,4)}-${item[0].split('_')[1].substring(4,6)}-${item[0].split('_')[1].substring(6,8)}`}}</span>
                <div class="spot-content">
                  <el-image style="width: 160px; height: 100px; margin-right: 10px; margin-top: 10px;" v-for="(img,j) in item" :key="j"
                    :src="img" 
                    :preview-src-list="item">
                  </el-image>
                </div>
              </div>
              <div class="no-tip" v-show="!havePhoto">暂无数据</div>
            </div>
          </div>
          <div class="content-item video-wrapper" id="video">
            <div class="sub-title">视频</div>
            <div class="video-content" v-if="this.forceEntity.attributes && this.forceEntity.attributes.SP">
              <video v-for="(item,index) in spList" :key="index" class="video" :src="`/static/video/${forceEntity.type}/${item}`" controls="controls"></video>
            </div>
            <div v-else class="no-tip">暂无数据</div>
          </div>
          <div class="content-item video-wrapper" id="audio">
            <div class="sub-title">音频</div>
            <div class="video-content" v-if="this.forceEntity.attributes && this.forceEntity.attributes.YY">
              <audio class="audio" :src="`/static/audio/${forceEntity.type}/${this.forceEntity.attributes.YY}`" controls="controls"></audio>
            </div>
            <div v-else class="no-tip">暂无数据</div>
          </div>
          <div class="content-item overall-wrapper" id="overall">
            <div class="sub-title">全景</div>
            <div class="overall-content" v-if="this.forceEntity.attributes && this.forceEntity.attributes.ZBQJ">
              <img v-for="(item,index) in zbOverallList" :key="index"
                :src="`/static/images/VRPic/${forceEntity.type}/${item}`" @click="openQJ(index)"
              >
            </div>
            <div class="overall-content" v-if="this.forceEntity.attributes && this.forceEntity.attributes.QJ">
              <img v-for="(item,index) in overallList" :key="index"
                :src="`/static/images/VRPic/${forceEntity.type}/${item}`" @click="openQJ(index)"
              >
            </div>
            <div class="no-tip" v-show="this.forceEntity.attributes && !this.forceEntity.attributes.QJ && !this.forceEntity.attributes.ZBQJ">暂无数据</div>
          </div>
        </div>
      </div>
    </transition>
    <div class="QJFrame" v-show="showQJ">
      <i class="close" @click="closeQJ"></i>
      <iframe id="content" :src="QJURL"></iframe>
    </div>
  </div>
</template>

<script>
// import {ZBQJList} from "config/ZBQJConfig";
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
        label: '图片',
        value: 'spot'
      }, {
        label: '视频',
        value: 'video'
      }, {
        label: '音频',
        value: 'audio'
      }, {
        label: '全景',
        value: 'overall'
      }],
      havePhoto: false,
      haveSpot: false,
      activeStep: 0,
      showQJ: false,
      QJURL: '',
      hideField: ["名称", "标签", "备注", "形象进度", "目录分类", "数据来源", "经度", "纬度", "建设地点1", "建设地点2", "建设地点3", "是否属于67个里面的", "类型", "统计", "唯一码", "更新参考数据源", "照片编号", "类型1", "类型2", "类型3", "显示级别", "类型编码", "马克", "照片", "颜色", "全景", "视频", "语音", "现场记录", "景观图", "周边全景", "全景缩略图"]
    };
  },
  computed: {
    fixData() {
      let fixData = {}
      let currentData = this.forceEntity.fix_data
      if (currentData) {
        for (let i in currentData) {
          if (currentData[i].length && !~this.hideField.indexOf(i)) {
            fixData[i] = currentData[i]
          }
        }
        return fixData
      }
    },
    photoList() {
      let tempArr = []
      let tempObj = {}
      if (this.forceEntity.attributes && this.forceEntity.attributes.PHOTO) {
        let photoStr = this.forceEntity.attributes.PHOTO
        if (photoStr.length) {
          this.havePhoto = true
          if (~photoStr.indexOf(';')) {
            tempArr = photoStr.split(';')
            tempArr.forEach(item => {
              let time = item.split('_')[1].split('.')[0]
              if (tempObj[time]) {
                // tempObj[time].push(item)
                tempObj[time].push(`/static/images/${this.forceEntity.type}/${item}`)
              } else {
                // tempObj[time] = [item]
                tempObj[time] = [`/static/images/${this.forceEntity.type}/${item}`]
              }
            })
          } else {
            let time = photoStr.split('_')[1].split('.')[0]
            // tempObj[time] = [photoStr]
            tempObj[time] = [`/static/images/${this.forceEntity.type}/${photoStr}`]
          }
          console.log('tempObj!!!!', tempObj)
          let arr = Object.values(tempObj).reverse()
          console.log('arr!!!', arr);
          return arr
        }
      } else {
        this.havePhoto = false
      }
    },
    spotList() {
      let tempArr = []
      let result = []
      if (this.forceEntity.attributes && this.forceEntity.attributes.JGT) {
        let photoStr = this.forceEntity.attributes.JGT
        if (photoStr.length) {
          this.haveSpot = true
          if (~photoStr.indexOf(';')) {
            tempArr =  photoStr.split(';')
          } else {
            tempArr = [photoStr]
          }
        }
        result = tempArr.map(item => {
          return `/static/images/${this.forceEntity.type}/${item}`
        })
        return result
      } else {
        this.haveSpot = false
      }
    },
    overallList() {
      let overallList = []
      let currentZBQJ = []
      if (this.forceEntity.attributes && this.forceEntity.attributes.QJSLT) {
        let ZBQJStr = this.forceEntity.attributes.QJSLT
        if (ZBQJStr.length) {
          if (~ZBQJStr.indexOf(';')) {
            currentZBQJ = ZBQJStr.split(';')
          } else {
            currentZBQJ = [ZBQJStr]
          }
          console.log('haha', currentZBQJ)
          return currentZBQJ
        }
      }
    },
    zbOverallList() {
      let overallList = []
      let currentZBQJ = []
      if (this.forceEntity.attributes && this.forceEntity.attributes.ZBQJSLT) {
        let ZBQJStr = this.forceEntity.attributes.ZBQJSLT
        if (ZBQJStr.length) {
          if (~ZBQJStr.indexOf(';')) {
            currentZBQJ = ZBQJStr.split(';')
          } else {
            currentZBQJ = [ZBQJStr]
          }
          console.log('xixi', currentZBQJ)
          return currentZBQJ
        }
      }
    },
    spList() {
      let currentSP = []
      if (this.forceEntity.attributes && this.forceEntity.attributes.SP) {
        let SPStr = this.forceEntity.attributes.SP
        if (SPStr.length) {
          if (~SPStr.indexOf(';')) {
            currentSP = SPStr.split(';')
          } else {
            currentSP = [SPStr]
          }
          return currentSP
        }
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
      if (forceEntity.fix_data) {
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
    headClick(value, index) {
      this.activeStep = index
      this.$nextTick(() => {
        document.querySelector(`#${value}`).scrollIntoView({
          behavior: "auto", // 平滑过渡
          block: "end" // 上边框与视窗顶部平齐。默认值
        });
      });
    },
    // onScroll(e) {
    //   let activeIndex
    //   let scrollItems = document.querySelectorAll(".content-item");
    //   for (let i = scrollItems.length - 1; i >= 0; i--) {
    //     // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
    //     let judge =
    //       e.target.scrollTop >=
    //       scrollItems[i].offsetTop - scrollItems[0].offsetTop;
    //     if (judge) {
    //       activeIndex = i;
    //       this.activeStep = activeIndex;
    //       break;
    //     }
    //   }
    // },
    openQJ(index) {
      let arr = []
      let qjStr = this.forceEntity.attributes.QJ || this.forceEntity.attributes.ZBQJ
      console.log('qjStr', qjStr, index)
      if (~qjStr.indexOf(';')) {
        arr = qjStr.split(';')
      } else {
        arr = [qjStr]
      }
      this.QJURL = arr[index]
      console.log('QJURL', this.QJURL)
      this.showQJ = true
    },
    closeQJ() {
      this.showQJ = false
      this.QJURL = ''
    },
    closeInfo() {
      this.isShow = false
      document.getElementById('content-wrapper').scrollTop = 0;
      this.activeStep = 0
    },
    closePopup() {
      this.forcePosition = {};
      this.forceEntity = {};
      this.closeInfo()
    },
  },
};
</script>

<style lang="less">
@import url("./CommonDetailPopup.less");
</style>
