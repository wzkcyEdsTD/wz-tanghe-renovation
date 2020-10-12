
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
            <header>{{forceEntity.extra_data.NAME}}</header>
            <ul class="content-body">
              <li>
                <span>所属区县:</span>
                <span>{{forceEntity.extra_data.DISTRICT}}</span>
              </li>
              <li>
                <span>所属街道:</span>
                <span>{{forceEntity.extra_data.STREET}}</span>
              </li>
            </ul>
            <div class="detail" @click="goDetail">查看详情 >></div>
          </div>
        </div>
      </div>
    </div>
    <div class="QJFrame" v-show="showQJ">
      <i class="close" @click="closeQJ"></i>
      <iframe id="content" :src="QJURL"></iframe>
    </div>
  </div>
</template>

<script>
import {ZBQJList} from "config/ZBQJConfig";
import { queryDetailByid } from "api/djdmAPI";
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
      haveZbOverall: false,
      haveOverall: false,
      // activeName: 'basic',
      activeStep: 0,
      showQJ: false,
      QJURL: '',
      hideField: ["名称", "标签", "备注", "形象进度", "目录分类", "数据来源", "经度", "纬度", "建设地点1", "建设地点2", "建设地点3", "是否属于67个里面的", "类型", "统计", "唯一码", "更新参考数据源", "照片编号", "类型1", "类型2", "类型3", "显示级别", "类型编码", "马克", "照片", "颜色", "全景", "视频", "语音", "现场记录", "景观图", "周边全景"]
    };
  },
  computed: {
  },
  async mounted() {
  },
  methods: {
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
    async goDetail() {
      const res = await queryDetailByid(731)
      console.log('detailRes', res)
    },
    openQJ(qj) {
      this.QJURL = qj.VR
      this.showQJ = true
    },
    closeQJ() {
      this.showQJ = false
      this.QJURL = ''
    },
    closePopup() {
      this.forcePosition = {};
      this.forceEntity = {};
      // this.closeInfo()
    },
  },
};
</script>

<style lang="less">
@import url("./DetailPopup.less");
</style>
