<template>
  <div class="score" v-show="showSupervise">
    <div class="title">
      <p>打分</p>
      <img src="../images/score-title.png" />
    </div>
    <img
      class="close"
      src="../images/close.png"
      @click="showSupervise = false"
    />
    <div class="score-box">
      <div class="top">
        <div class="left">
          <img
            :src="
              detailData.photos && detailData.photos.length
                ? `${MediaServer}/${detailData.photos[0].path}`
                : require(`../images/暂无图片.png`)
            "
          />
        </div>
        <div class="right">
          <div class="name">{{ detailData.name }}</div>
          <div class="rate">
            <span>总体评分</span>
            <el-rate
              class="total-rate"
              disabled
              v-model="detailData.star"
            ></el-rate>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="text">历史评论</div>
        <div class="comment-list">
          <div
            class="comment-item"
            v-for="(item, index) in commentList"
            :key="index"
          >
            <div class="comment-header">
              <div class="left">
                <img class="avatar" src="../images/avatar.png" />
                <div class="info">
                  <p class="name">{{ item.username }}</p>
                  <el-rate
                    class="comment-rate"
                    disabled
                    v-model="item.star"
                  ></el-rate>
                </div>
              </div>
              <div class="right">{{ item.createTime }}</div>
            </div>
            <div class="comment-content">
              {{ item.commend }}
            </div>
          </div>
          <p v-show="!commentList.length" class="no-data">暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MediaServer } from "@/config/server/mapConfig";
import { getProjectDetail, resourceComment } from "@/api/tangheAPI";
export default {
  data() {
    return {
      showSupervise: false,
      detailData: {},
      commentList: [],
      MediaServer,
    };
  },
  methods: {
    eventRegsiter() {
      this.$bus.$off("set-supervise");
      this.$bus.$on("set-supervise", ({ feature }) => {
        console.log("feature", feature);
        // this.$refs.Supervise.fixData(feature);
        this.initData(feature.attributes.RESOURCE_ID);
      });
    },
    async initData(id) {
      let res = await getProjectDetail({ id });
      if (res.code === 200) {
        this.detailData = res.result;
        console.log("detailData", this.detailData);
        this.getCommentList(id);
        this.showSupervise = true;
      }
    },
    async getCommentList(id) {
      this.commentList = [];
      let res = await resourceComment({
        resourceId: this.detailData.id,
      });
      if (res.code === 200) {
        this.commentList = res.result.records;
        console.log("commentList", this.commentList);
      }
    },
  },
  mounted() {
    this.eventRegsiter();
  },
};
</script>

<style lang="less" scoped>
.no-data {
  padding: 20px 0;
  text-align: center;
}
</style>