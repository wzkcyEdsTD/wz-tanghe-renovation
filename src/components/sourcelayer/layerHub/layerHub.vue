
<template>
  <div class="layerhub-wrapper">
    <div class="left-wrapper" >
      <div class="switch-menu-wrapper">
        <div class="switch-menu-container">
          <span :class="{active: selected=='synopsis'}" @click="switchMenu('synopsis')">塘河简介</span>
          <span :class="{active: selected=='source'}" @click="switchMenu('source')">资源目录</span>
        </div>
        <div class="switch-menu-decorate"></div>
      </div>
      <SourceTree ref="SourceTree" v-show="selected=='source'" />
      <Synopsis v-show="selected=='synopsis'" />
    </div>
    <div class="right-wrapper">
      <div class="box">
        <div class="buttonpd" :class="{active: currentType=='summary'}" @click="currentType='summary'">
          <div class="tp">
            <img src="./images/组合.png" alt="" v-if="currentType=='summary'" class="tupianxuanzhong"/>
            <img src="./images/button.png" alt="" v-if="currentType=='source'"   class="tupian"/>
            <span class="button">总览</span>
          </div>
        </div>
        <div class="buttonpd" :class="{active: currentType=='source'}" @click="currentType='source'">
          <div class="tp">
            <img src="./images/组合.png" alt="" v-if="currentType=='source'" class="tupianxuanzhong"/>
            <img src="./images/button.png" alt="" v-if="currentType=='summary'" class="tupian"/>
            <span class="button">资源</span>
          </div>
        </div>
      </div>
      <img src="./images/switch-decorate.png" class="zhuangshi"/>
      <Summary v-show="currentType == 'summary'" />
      <Source v-show="currentType == 'source'" />
    </div>
    <div class="select-wrapper" v-show="showSelect">
      <el-select class="filter-select" v-show="menu=='shipin'||menu=='quanjin'" style="width:90px;" v-model="yearValue" placeholder="年份" @change="changeYear">
        <el-option
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="filter-select" v-show="menu=='shipin'" style="margin-left:10px;width:90px;" v-model="typeValue" placeholder="类型" @change="changeType">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- <div class="sign-wrapper" :style="{right: showLarge?'22%':'22%'}" v-show="showSign">
      <img src="/static/images/common/sign@2x.png">
    </div>
    <MapTool v-show="showMapTool" /> -->
  </div>
</template>

<script>
import Synopsis from "./components/synopsis";
import SourceTree from "./components/sourceTree";
// import MapTool from "./components/mapTool";
import Source from "./components/source";
import Summary from "./components/summary"

export default {
  name: "layerHub",
  components:{
    Synopsis,
    SourceTree,
    // MapTool,
    Summary,
    Source,
  },
  data() {
    return {
      showLarge:window.showLarge,
      selected: 'synopsis',
      currentType: 'summary',
      showSign: true,
      showMapTool: true,
      showSelect: false,
      menu: '',
      yearOptions: [{
        label: '2020',
        value: 2020
      }, {
        label: '2021',
        value: 2021
      }],
      yearValue: '',
      typeOptions: [{
        label: '点',
        value: '点'
      }, {
        label: '线',
        value: '线'
      }],
      typeValue: ''
    };
  },
  computed: {
  },
  mounted() {
    this.eventRegsiter()
  },
  methods: {
    eventRegsiter() {
      this.$bus.$off("toggle-select");
      this.$bus.$on("toggle-select", ({value, menu}) => {
        this.yearValue = ''
        this.typeValue = ''
        if (value) {
          this.showSelect = true
          this.menu = menu
        } else {
          menu == this.menu && (this.showSelect = false)
        }
      })
    },
    changeYear(val) {
      let res = []
      for (let key in window.featureMap[this.menu]) {
        let item = window.featureMap[this.menu][key]
        if (this.typeValue) {
          if (item.attributes.TAG == val && item.attributes.TYPE == this.typeValue) {
            res.push(item)
          }
        } else {
          if (item.attributes.TAG == val) {
            res.push(item)
          }
        }
      }
      console.log('ressssssssss', res)
      this.filterData(res)
    },
    changeType(val) {
      let res = []
      for (let key in window.featureMap[this.menu]) {
        let item = window.featureMap[this.menu][key]
        if (this.yearValue) {
          if (item.attributes.TYPE == val && item.attributes.TAG == this.yearValue) {
            res.push(item)
          }
        } else {
          if (item.attributes.TYPE == val) {
            res.push(item)
          }
        }
      }
      console.log('ressssssssss', res)
      this.filterData(res)
    },
    filterData(array) {
      window.billboardMap[this.menu]._billboards.forEach(v => {
        v.show = false
        array.forEach(item => {
          if (v.id == `billboard@${item.attributes.SMID}@${this.menu}`) {
            v.show = true
          }
        })
      })
      window.whiteLabelMap[this.menu]._labels.forEach(v => {
        v.show = false
        array.forEach(item => {
          if (v.id == `label@${item.attributes.SMID}@${this.menu}`) {
            v.show = true
          }
        })
      })
      window.blackLabelMap[this.menu]._labels.forEach(v => {
        v.show = false
        array.forEach(item => {
          if (v.id == `label@${item.attributes.SMID}@${this.menu}`) {
            v.show = true
          }
        })
      })
    },
    switchMenu(value) {
      this.selected = value;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./layerHub.less");
</style>

<style lang="less">
.filter-select {
  .el-input__inner {
    background-color: rgba(5, 13, 50, 0.9) !important;
    color: white !important;
    border: none !important;
    text-align: center !important;
  }
}
.el-select-dropdown {
  background-color: rgba(5, 13, 50, 0.9) !important;
}
.el-select-dropdown__item {
  color: #fff !important;
  text-align: center !important;
}
.el-select-dropdown__item.hover {
  background-color: #015ead !important;
}
</style>
