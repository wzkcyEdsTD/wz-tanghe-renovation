<template>
  <div v-show="imgViewShow">
    <el-image-viewer
      :on-close="closeViewer"
      :url-list="srcList"
      :initial-index="srcIndex"
      :style="{ right: showLarge ? '45%' : '0' }"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  data() {
    return {
      showLarge: window.showLarge,
      srcList: [
        "http://172.20.83.227:8080/sys/common/static/img/2021绿道打卡作战图.jpg",
      ],
      srcIndex: 0,
    };
  },

  props: { imgViewShow: Boolean },

  components: { ElImageViewer },

  methods: {
    closeViewer() {
      this.$emit("closeImgView");
    },
  },
};
</script>

<style lang="less">
.el-image-viewer__img {
  max-height: 80% !important;
  max-width: 90% !important;
}
.el-icon-circle-close {
  color: #fff !important;
}
</style>