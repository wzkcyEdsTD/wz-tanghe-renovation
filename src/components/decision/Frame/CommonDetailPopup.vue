<template>
  <div>
    <transition name="fade">
      <div
        class="detail-popup common-detail-popup"
        v-if="infoShow"
        :style="{ top: (isSearch ? 16.81 : 13.81) + 'vh' }"
      >
        <i class="popup-close" @click="closeInfo" />
        <div class="info-container">
          <div class="panel-title">
            <img src="./images/title-before.png" />
            <span>{{ detailData.name }}</span>
          </div>
          <div class="panel-body">
            <div class="content-info">
              <div class="btn-list">
                <button
                  v-for="(item, index) in topBtns"
                  :key="index"
                  class="btn-type"
                  :disabled="!currentData[item.id] || !currentData[item.id].length"
                  :class="{
                    active: currentShow == item.id,
                    disabled: !currentData[item.id] || !currentData[item.id].length,
                  }"
                  @click="currentShow = item.id"
                >
                  <span>{{ item.label }}</span>
                </button>
              </div>
              <div class="media-content">
                <div class="top">
                  <div class="swiper-buttons swiper-button-left"></div>
                  <swiper
                    ref="SwiperMedia"
                    class="swiper-wrapper swiper-tool"
                    :options="swiperOption"
                    v-show="currentShow == 'overallViews'"
                  >
                    <swiper-slide
                      v-for="(item, i) in currentData.overallViews"
                      :key="i"
                      class="swiper-item"
                    >
                      <img
                        :src="`${MediaServer}/${item.thumbnail}`"
                        @click="openOverview(i)"
                      />
                    </swiper-slide>
                    <swiper-slide
                      class="swiper-item"
                      v-if="!currentData.overallViews||!currentData.overallViews.length"
                    >
                      <div class="no-tip">暂无数据</div>
                    </swiper-slide>

                    <div class="swiper-scrollbar" slot="scrollbar"></div>
                  </swiper>

                  <swiper
                    ref="SwiperMedia"
                    class="swiper-wrapper swiper-tool"
                    :options="swiperOption"
                    v-show="currentShow == 'videos'"
                  >
                    <swiper-slide
                      v-for="(item, i) in currentData.videos"
                      :key="i"
                      class="swiper-item"
                    >
                      <video
                        id="video"
                        ref="video"
                        :src="`${MediaServer}/${item.path}`"
                        controls="controls"
                        muted
                      ></video>
                    </swiper-slide>
                    <swiper-slide class="swiper-item" v-if="!currentData.videos||!currentData.videos.length">
                      <div class="no-tip">暂无数据</div>
                    </swiper-slide>
                    <div class="swiper-scrollbar" slot="scrollbar"></div>
                  </swiper>

                  <swiper
                    ref="SwiperMedia"
                    class="swiper-wrapper swiper-tool"
                    :options="swiperOption"
                    v-show="currentShow == 'photos'"
                  >
                    <swiper-slide
                      v-for="(item, i) in currentData.photos"
                      :key="i"
                      class="swiper-item"
                    >
                      <el-image
                        :src="`${MediaServer}/${item.path}`"
                        @click="onPreview(currentData.photos, i)"
                      ></el-image>
                    </swiper-slide>
                    <swiper-slide class="swiper-item" v-if="!currentData.photos||!currentData.photos.length">
                      <div class="no-tip">暂无数据</div>
                    </swiper-slide>
                    <div class="swiper-scrollbar" slot="scrollbar"></div>
                  </swiper>

                  <div class="swiper-buttons swiper-button-right"></div>
                </div>
              </div>
            </div>
            <div class="basic-wrapper">
              <div class="sub-title">
                <span class="sub-title-text">基本信息</span>
                <span class="sub-title-line"></span>
              </div>
              <div class="basic-content">
                <div class="detail">
                  <span>详情</span>
                  <span>{{ detailData.details || `暂无详情` }}</span>
                </div>
                <div class="desc">
                  <div>
                    <span>区县</span>
                    <span>{{ detailData.district || `无` }}</span>
                  </div>
                  <div>
                    <span>乡镇街道</span>
                    <span>{{ detailData.street || `无` }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="audio-wrapper">
              <div class="sub-title">
                <span class="sub-title-text">音频</span>
                <span class="sub-title-line"></span>
              </div>
              <div
                class="audio-content"
                v-if="detailData.audioSrc"
              >
                <MAudio
                  :src="`${MediaServer}/${detailData.audioSrc}`"
                />
              </div>
              <div v-else class="no-tip">暂无数据</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <el-image-viewer
      :style="{ left: 0 }"
      v-if="viewerShow"
      :on-close="closeViewer"
      :url-list="imgList"
      :initial-index="imgIndex"
    />
    <Overview v-if="overShow" :src="overviewUrl" />
  </div>
</template>

<script>
import { MediaServer } from "@/config/server/mapConfig";
import { commonDetailHideField, topBtns, swiperOption } from "@/common/js/hash";

import MAudio from "@/components/decision/Frame/MAudio";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import Overview from "@/components/decision/Frame/Overview";
import { getSpotDetail } from "api/tangheAPI";

export default {
  data() {
    return {
      MediaServer,
      topBtns,
      swiperOption,

      // name: "",
      // forceEntity: {},
      detailData: {},
      infoShow: false,
      currentData: {},
      currentIndex: 0,
      currentShow: "overview",

      viewerShow: false,
      imgList: [],
      imgIndex: 0,
      overviewUrl: "",
      overShow: false,

      isSearch: false,
    };
  },
  components: { MAudio, ElImageViewer, Overview },
  methods: {
    // 获取选中对象
    getForceEntity(entity) {
      // this.name = entity.name;
      // this.forceEntity = entity;
      // this.infoShow = true;
      this.initData(entity.attributes.RESOURCE_ID);
    },

    // 初始化数据
    async initData(id) {
      this.currentIndex = 0;
      this.currentShow = "overview";
      this.currentData = {};

      let res = await getSpotDetail({id})
      if (res.code === 200) {
        this.infoShow = true;
        this.detailData = res.result;
        this.currentData = {
          overallViews: res.result.overallViews,
          videos: res.result.videos,
          photos: res.result.photos
        }
      }
    },

    // 关闭详情
    closeInfo() {
      this.infoShow = false;
    },

    // 打开全景
    openOverview(index) {
      this.closeViewer();
      this.overviewUrl = this.currentData.overallViews[index];
      this.overShow = true;
    },

    // 开启图片查看
    onPreview(list, index) {
      this.imgList = list.map((item) => {
        return `${MediaServer}/${item.path}`;
      });
      this.imgIndex = index;
      this.viewerShow = true;
    },

    // 关闭图片查看
    closeViewer() {
      this.viewerShow = false;
    },
  },

  watch: {
    currentData(val) {
      if (!val[this.currentShow]) {
        if (val.overallViews) {
          this.currentShow = "overallViews";
          return;
        }
        if (val.videos) {
          this.currentShow = "videos";
          return;
        }
        if (val.photos) {
          this.currentShow = "photos";
          return;
        }
      }
    },
    currentShow(val) {
      if (val != "video") {
        const video = document.getElementById("video");
        if (video) video.pause();
      }
      if (this.$refs.SwiperMedia) {
        this.$refs.SwiperMedia.swiper.activeIndex = 0;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/components/decision/Frame/css/frame.less");
@import url("./css/CommonDetailPopup.less");
</style>