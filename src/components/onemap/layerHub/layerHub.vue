<template>
  <div class="layerhub-wrapper">
    <!-- <div class="sign-wrapper">
      <img src="/static/images/common/sign@2x.png">
    </div> -->
    <div class="switch-menu-wrapper-onemap">
      <div class="switch-menu-container">
        <span :class="{active: currentType=='xm'}" @click="currentType='xm'">项目</span>
        <span :class="{active: currentType=='dd'}" @click="currentType='dd'">断点</span>
      </div>
      <div class="switch-menu-decorate"></div>
    </div>
    <div class="left-content">
      <ul class="zrdw-list">
        <li class="zrdw-item" :class="{active: currentZrdw==item}" v-for="(item, index) in zrdwList" :key="index" @click="getData(item)">
          {{ item }}
        </li>
      </ul>
      <div class="xm-container" v-show="currentType=='xm'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">项目</span>
        </div>
        <div class="search-header">
          <el-input
            v-model="searchXMText"
            class="searchFilterInput"
            placeholder="查找项目"
            size="small"
            @keyup.enter.native="searchXMFilter"
          />
          <div class="button-container">
            <div class="button-item">
              <i class="icon-common icon-clear" @click="searchXMClear"></i>
            </div>
            <div class="button-item">
              <i class="icon-common icon-search" @click="searchXMFilter"></i>
            </div>
          </div>
        </div>
        <div class="xm-list">
          <div v-for="(item, index) in xmList" :key="index">
            <div class="xm-item" @click="itemClick(item)">
              <div class="name">{{ index + 1 }}.{{ item.attributes.NAME }}</div>
              <div class="info-box">
                <div class="info-item">
                  <div class="key">建设状态</div>
                  <div class="value">{{ item.attributes.CURRENT_STATE }}</div>
                </div>
                <div class="split"></div>
                <div class="info-item">
                  <div class="key">投资计划</div>
                  <div class="value">{{ item.attributes.TOTALAMOUNT }}万元</div>
                </div>
                <div class="split"></div>
                <div class="info-item jcsj">
                  <div class="key">计划建成时间</div>
                  <div class="value">{{ item.attributes.CONSYEARE }}</div>
                </div>
              </div>
            </div>
            <div class="split-line"></div>
          </div>
        </div>
        <div class="no-tip" v-show="currentXmList && !currentXmList.length">暂无数据</div>
      </div>
      <div class="dd-container" v-show="currentType=='dd'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">断点</span>
        </div>
        <div class="search-header">
          <el-input
            v-model="searchDDText"
            class="searchFilterInput"
            placeholder="查找断点"
            size="small"
            @keyup.enter.native="searchDDFilter"
          />
          <div class="button-container">
            <div class="button-item">
              <i class="icon-common icon-clear" @click="searchDDClear"></i>
            </div>
            <div class="button-item">
              <i class="icon-common icon-search" @click="searchDDFilter"></i>
            </div>
          </div>
        </div>
        <div class="dd-list">
          <div v-for="(item, index) in ddList" :key="index">
            <div class="dd-item" @click="itemClick(item)">
              <img
                :src="`/static/images/断点/${
                  item.attributes.PHOTO.split(';')[0]
                }`"
              />
              <div class="info-box">
                <div class="name">
                  {{ index + 1 }}.{{ item.attributes.NAME }}
                </div>
                <div class="info-item">
                  <div class="key">计划贯穿时间</div>
                  <div class="value">{{ item.attributes.JHGTSJ }}</div>
                </div>
                <div class="info-item">
                  <div class="key">长度（米）</div>
                  <div class="value">{{ item.attributes.LENGTH }}</div>
                </div>
              </div>
            </div>
            <div class="split-line"></div>
          </div>
        </div>
        <div class="no-tip" v-show="currentDdList && !currentDdList.length">暂无数据</div>
      </div>
    </div>
    <div class="right-content" v-show="changeType=='other'">
      <div class="kdtj-container" v-show="currentType=='dd'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">断点统计</span>
        </div>
        <div class="base-info">
          <div class="base-item">
            <img src="./images/kd-number.png" alt="" />
            <div class="title" style="color: #2fc8e9">总数</div>
            <div class="text" v-if="ret.pointStat.sum">{{ret.pointStat.sum||0}}<span class="unit">个</span></div>
<!--            <div class="text" v-if="!ret.pointStat.sum">0<span class="unit">个</span></div>-->
          </div>
          <div class="base-item">
            <img src="./images/kd-length.png" alt="" />
            <div class="title" style="color: #ff8b4f">总长度</div>
            <div class="text" v-if="ret.pointStat.length">{{ret.pointStat.length||0}}<span class="unit">米</span></div>
<!--            <div class="text" v-if="!ret.pointStat.length">0<span class="unit">米</span></div>-->
          </div>
        </div>
        <div class="base-info">
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0%（蓝）.png" class="empty">
              <div class="progressFull" style="width: 1.00vh">
                <img src="./images/100%（蓝）.png" class="full">
              </div>
              <span class="progressTitle">10%</span>
            </div>
          </div>
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0%（橙）.png" class="empty">
              <div class="progressFull" style="width: 1.00vh">
                <img src="./images/100%（橙）.png" class="full">
              </div>
              <span class="progressTitleRight">10%</span>
            </div>
          </div>
        </div>
        <div class="kdfb-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">断点分布</div>
            <div class="decorate"></div>
          </div>
          <div style="width: 30vh;height: 15vh" class="echart" ref="pieEchart"></div>
        </div>
        <div class="jh-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">计划贯通时间轴</div>
            <div class="decorate"></div>
          </div>
          <div class="gif-wrapper">
            <img src="./images/timegif.gif" alt="" />
          </div>
        </div>
        <div class="czwt-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">
              存在问题<span class="number">(21个)</span>
            </div>
            <div class="decorate"></div>
          </div>
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">断点位置</span>
                <span class="content">存在问题</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in questionDdList"
                :key="index"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="content" :title="item.attributes.CZWT">{{ item.attributes.CZWT }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="xmtj-container" v-show="currentType=='xm'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">项目统计</span>
        </div>
        <div class="base-info">
          <div class="base-item">
            <div class="leftPicture">
              <img src="./images/球-蓝.png" alt="" style="width: 13vh"/>
              <div class="title" style="color: #2fc8e9">总数</div>
              <div class="text">{{ret.project.sum}}<span class="unit">个</span></div>
            </div>
            <img src="./images/台子-蓝.png" alt="" class="leftPictureBottom"/>
          </div>
          <div class="base-item">
            <div class="rightPicture">
              <img src="./images/球-红.png" alt="" style="width: 15vh"/>
              <div class="titleRight" style="color: #ff8b4f">投资计划</div>
              <div class="textRight">{{ret.project.plan}}<span class="unit">亿元</span></div>
            </div>
            <img src="./images/台子-红.png" alt="" class="rightPictureBottom"/>
          </div>
        </div>
        <div class="base-info">
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0%（蓝）.png" class="empty">
              <div class="progressFull" style="width: 1.00vh">
                <img src="./images/100%（蓝）.png" class="full">
              </div>
              <span class="progressTitle">10%</span>
            </div>
          </div>
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0%（红）.png" class="empty">
              <div class="progressFull" style="width: 1.00vh">
                <img src="./images/100%（红）.png" class="full">
              </div>
              <span class="progressTitleRight">10%</span>
            </div>
          </div>
        </div>

<!--        <div class="square"></div>-->
        <div class="jsqk-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">建设情况</div>
            <div class="decorate"></div>
          </div>
          <div style="height: 16vh;  width: 35vh;" class="echart" ref="barEchart"></div>
        </div>
        <div class="jd-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">项目投资计划表</div>
            <div class="decorate"></div>
          </div>
          <div class="chart-wrapper">
            <div class="rate-item">
              <p class="xiaobiaoti">{{'投资计划(万元)'}}</p>
              <div style="height: 16vh;  width: 35vh;" class="echart" ref="lineEchart"></div>
            </div>
<!--            <div class="rate-item">-->
<!--              <p class="xiaobiaoti">项目完成率</p>-->
<!--              <div style="height: 5.5vh" class="echart" ref="xiaEchart"></div>-->
<!--            </div>-->
          </div>
        </div>
        <div class="czwt-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">
              滞后项目<span class="number">(21个)</span>
            </div>
            <div class="decorate"></div>
          </div>
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">名称</span>
                <span class="content">建设状态</span>
                <span class="content">责任单位</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in delayXmList"
                :key="index"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="flex-2 content">{{
                  item.attributes.CURRENT_STATE
                }}</span>
                <span class="flex-2 content">{{
                  item.attributes.ZR_DEPTID
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content" v-show="changeType=='all'">
      <div class="kdtj-container" v-show="currentType=='dd'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">断点统计</span>
        </div>
        <div class="yhsxzcd-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">一环三线断点总长度</div>
            <div class="decorate"></div>
          </div>
          <div class="progressFlex">
            <span class="yhsxText">瓯海区</span>
            <div class = "square">
              <div class="squareIn" style="width: 0.4vh"></div>
              <div class="squareInText">1%</div>
            </div>
            <span class="yhsxTextRight">62米</span>
          </div>
          <div class="progressFlex">
            <span class="yhsxText">鹿城区</span>
            <div class = "square">
              <div class="squareIn" style="width: 0.8vh"></div>
              <div class="squareInText">2%</div>
            </div>
            <span class="yhsxTextRight">62米</span>
          </div>
          <div class="progressFlex">
            <span class="yhsxText">龙湾区</span>
            <div class = "square">
              <div class="squareIn" style="width: 0.8vh"></div>
              <div class="squareInText">2%</div>
            </div>
            <span class="yhsxTextRight">62米</span>
          </div>
        </div>
        <div class="yhsx-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">一环三线</div>
            <div class="decorate"></div>
          </div>
          <img src="./images/动图2.gif" class="yhsxdongtu">
        </div>
        <div class="zrdw-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">责任单位卡点时间轴</div>
            <div class="decorate"></div>
          </div>
          <div class="progressFlexIn">
            <div class="lab">
              <p class="labTitle">2020.12</p>
              <p class="labtext">龙湾区完成</p>
              <p class="labtext">卡点个数 8个</p>
              <p class="labtext">卡点总长度 1412米</p>
            </div>
            <div class="labOH">
              <p class="labTitle">2022.10</p>
              <p class="labtext">鹿城区完成</p>
              <p class="labtext">卡点个数 21个</p>
              <p class="labtext">卡点总长度 8752米</p>
            </div>
          </div>
          <div class="end">
            <div>
              <img src="./images/红线.png" class="redLine">
              <img src="./images/红线.png" class="redLineMidle">
              <img src="./images/红线.png" class="redLineRight">
              <div class="straightLine"></div>
            </div>
          </div>
          <div class="progressFlexIn">
            <div class="labLW">
              <p class="labTitle">2021.12</p>
              <p class="labtext">瓯海区完成</p>
              <p class="labtext">卡点个数 11个</p>
              <p class="labtext">卡点总长度 8910米</p>
            </div>
          </div>
        </div>
      </div>
      <div class="xmtj-container" v-show="currentType=='xm'">
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">项目统计</span>
        </div>
        <div class="xmtzjh-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">项目投资计划完成率排行</div>
            <div class="decorate"></div>
          </div>
          <div class="mxph">
            <img src="./images/xmtzjh.png" class="xmtzPicture">
            <div class="second">65%</div>
            <div class="secondText">总 39亿元</div>
            <div class="first">75%</div>
            <div class="firstText">总 39亿元</div>
            <div class="third">35%</div>
            <div class="thirdText">总 39亿元</div>
          </div>
          <div class="progressFlex">
            <span class="xmtzOH">瓯海区</span>
            <span class="xmtzLC">鹿城区</span>
            <span class="xmtzLW">龙湾区</span>
          </div>
          <ul>
            <li class="info-item-right">
              <span class="value">瑞安市</span>
              <span class="value">浙江产业区</span>
              <span class="value">温州现代集团</span>
              <span class="value">温州城发集团</span>
            </li>
            <li class="info-item-right">
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">45%</p>
                  <p class="secondKeyText">39亿元</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">35%</p>
                  <p class="secondKeyText">39亿元</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">25%</p>
                  <p class="secondKeyText">39亿元</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">15%</p>
                  <p class="secondKeyText">39亿元</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="xmwgl-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">项目完工率</div>
            <div class="decorate"></div>
          </div>
          <div class="pictureFlex">
            <div class="xmwg">
                <img src="./images/lan.png" class="bothSides">
                <span class="compleRate">65%</span>
              </div>
            <div class="xmwg">
              <img src="./images/lan.png" class="middlePic">
              <span class="compleRate">75%</span>
            </div>
            <div class="xmwg">
              <img src="./images/bai.png" class="bothSides">
              <span class="compleRateRight">55%</span>
            </div>
          </div>
          <div class="pictureFlex">
            <p class="compleRateText">瓯海区<br/>9个</p>
            <p class="compleRateText">鹿城区<br/>9个</p>
            <p class="compleRateTextRight">龙湾区<br/>9个</p>
          </div>
          <ul>
            <li class="info-item-right">
              <span class="value">瑞安市</span>
              <span class="value">浙江产业区</span>
              <span class="value">温州现代集团</span>
              <span class="value">温州城发集团</span>
            </li>
            <li class="info-item-right">
              <div class="key">
                <div class="keyAllText">
                    <p class="firstKeyText">45%</p>
                    <p class="secondKeyText">9个</p>
                  </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">35%</p>
                  <p class="secondKeyText">9个</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">25%</p>
                  <p class="secondKeyText">9个</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">15%</p>
                  <p class="secondKeyText">9个</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="zrdwxmsjz">
          <div class="sub-title-wrapper">
            <div class="sub-title">责任单位项目时间轴</div>
            <div class="decorate"></div>
          </div>
          <div class="progressFlexIn">
            <div class="buleText">
              <div class="lucheng">
                <p class="buleLabTitle">2020.6.1完成</p>
                <p class="buleLabText">温州现代集团</p>
                <p class="buleLabText">项目个数 4个</p>
                <p class="buleLabText">投资计划 6.1亿元</p>
              </div>
              <div class="ouhai">
                <p class="buleLabTitle">2020.12.1完成</p>
                <p class="buleLabText">瑞安市政府</p>
                <p class="buleLabText">项目个数 7个</p>
                <p class="buleLabText">投资计划 18.4亿元</p>
              </div>
              <div class="longwan">
                <p class="buleLabTitle">2023.12.1完成</p>
                <p class="buleLabText">浙南产业区</p>
                <p class="buleLabText">项目个数 1个</p>
                <p class="buleLabText">投资计划 11.5亿元</p>
              </div>
              <div class="ruian">
                <p class="buleLabTitle">2024.3.1完成</p>
                <p class="buleLabText">龙湾区政府</p>
                <p class="buleLabText">项目个数 8个</p>
                <p class="buleLabText">投资计划 45.1亿元</p>
              </div>
            </div>
          </div>
          <div class="end">
            <div class="blueLine">
              <img src="./images/蓝线.png" class="lucheng">
              <img src="./images/蓝线.png" class="ouhai">
              <img src="./images/蓝线.png" class="zhenan">
              <img src="./images/蓝线.png" class="longwan">
              <img src="./images/蓝线.png" class="xiandai">
              <img src="./images/蓝线.png" class="ruian">
              <img src="./images/蓝线.png" class="chengfa">
              <div class="straightLine"></div>
            </div>
          </div>
          <div class="progressFlexIn">
            <div class="buleText">
              <div class="zhenan">
                <p class="buleLabTitle">2022.9.1完成</p>
                <p class="buleLabText">瓯海区政府</p>
                <p class="buleLabText">项目个数 17个</p>
                <p class="buleLabText">投资计划 108.9亿元</p>
              </div>
              <div class="xiandai">
                <p class="buleLabTitle">2023.9.1完成</p>
                <p class="buleLabText">温州城发集团完成</p>
                <p class="buleLabText">项目个数 12个</p>
                <p class="buleLabText">投资计划 34.6亿元</p>
              </div>
              <div class="chengfa">
                <p class="buleLabTitle">2020.12.1完成</p>
                <p class="buleLabText">鹿城区政府</p>
                <p class="buleLabText">项目个数 18个</p>
                <p class="buleLabText">投资计划 50.5亿元</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "../../sourcelayer/layerHub/TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      currentType: 'xm',
      changeType:'all',
      zrdwList: [
        '指挥部',
        '鹿城区政府',
        '瓯海区政府',
        '龙湾区政府',
        "瑞安市政府",
        "温州现代集团",
        "温州城发集团",
        "浙南产业区",
      ],
      currentZrdw: '指挥部',
      list:[
            {   "name":"指挥部",
                "project":{"sum":"67","plan":"275"},
                "situation":{"pre":"4","preLag":"2","finish":"12","build":"26","buildLag":"23"},
                "speed":{"Completion":"2","finish":"18"},
                "pointStat":{"sum":"40","length":"19074"},
                "pointDist":{"east":{"number":"12","length":"2792"},"south":{"number":"9","length":"7030"},"inner":{"number":"6","length":"1652"},"outer":{"number":"10","length":"5410"},"west":{"number":"3","length":"2190"},}
            },
            {   "name":"鹿城区政府",
                "project":{"sum":"18","plan":"50.5"},
                "situation":{"pre":"4","preLag":"2","finish":"3","build":"3","buildLag":"6"},
                "speed":{"Completion":"1.3","finish":"16.7"},
                "pointStat":{"sum":"21","length":"8752"},
                "pointDist":{"east":{"number":"4","length":"1380"},"south":{"number":"","length":""},"inner":{"number":"6","length":"1652"},"outer":{"number":"10","length":"5410"},"west":{"number":"1","length":"310"},}
            },
            {   "name":"瓯海区政府",
                "project":{"sum":"17","plan":"109"},
                "situation":{"pre":"0","preLag":"0","finish":"4","build":"7","buildLag":"6"},
                "speed":{"Completion":"1.5","finish":"23.5"},
                "pointStat":{"sum":"11","length":"8910"},
                "pointDist":{"east":{"number":"","length":""},"south":{"number":"9","length":"7030"},"inner":{"number":"","length":""},"outer":{"number":"","length":""},"west":{"number":"2","length":"1880"},}
            },
            {   "name":"龙湾区政府",
                "project":{"sum":"8","plan":"45"},
                "situation":{"pre":"0","preLag":"0","finish":"2","build":"4","buildLag":"2"},
                "speed":{"Completion":"2.2","finish":"25"},
                "pointStat":{"sum":"8","length":"1412"},
                "pointDist":{"east":{"number":"8","length":"1412"},"south":{"number":"","length":""},"inner":{"number":"","length":""},"outer":{"number":"","length":""},"west":{"number":"","length":""},}
            },
            {   "name":"瑞安市政府",
                "project":{"sum":"7","plan":"18.4"},
                "situation":{"pre":"0","preLag":"0","finish":"0","build":"5","buildLag":"2"},
                "speed":{"Completion":"0","finish":"0"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            {   "name":"温州现代集团",
                "project":{"sum":"4","plan":"6"},
                "situation":{"pre":"0","preLag":"0","finish":"2","build":"2","buildLag":"0"},
                "speed":{"Completion":"32.4","finish":"50"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            {   "name":"温州城发集团",
                "project":{"sum":"12","plan":"3.5"},
                "situation":{"pre":"0","preLag":"0","finish":"1","build":"4","buildLag":"7"},
                "speed":{"Completion":"0.03","finish":"8.3"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            {   "name":"浙南产业区",
                "project":{"sum":"1","plan":"11.5"},
                "situation":{"pre":"0","preLag":"0","finish":"0","build":"1","buildLag":"0"},
                "speed":{"Completion":"0","finish":"0"},
                "pointStat":{"sum":"","length":""},
                "pointDist":{"east":{"number":"0","length":"0"},"south":{"number":"0","length":"0"},"inner":{"number":"0","length":"0"},"outer":{"number":"0","length":"0"},"west":{"number":"0","length":"0"},}
            },
            // {   "name":"浙南产业区",
            //     "项目统计":{"总数":"1","投资计划":"11.5"},
            //     "建设情况":{"前期研究":"0","前期(滞后)":"0","完工":"0","在建":"1","在建(滞后)":"0"},
            //     "建设进度":{"投资完成率":"0","项目完工率":"0"},
            //     "卡点统计":{"总数":"","长度":""},
            //     "卡点分布":{"东线":{"个数":"","长度":""},"南线":{"个数":"","长度":""},"内环":{"个数":"","长度":""},"外环":{"个数":"","长度":""},"西线":{"个数":"","长度":""},}
            // }
            ],
      ddList:[],
      xmList:[],
      searchDDText: "",
      searchXMText: "",
      ret:  {   "name":"指挥部",
                "project":{"sum":"67","plan":"275"},
                "situation":{"pre":"4","preLag":"2","finish":"12","build":"26","buildLag":"23"},
                "speed":{"Completion":"2","finish":"18"},
                "pointStat":{"sum":"40","length":"19074"},
                "pointDist":{"east":{"number":"12","length":"2792"},"south":{"number":"9","length":"7030"},"inner":{"number":"6","length":"1652"},"outer":{"number":"10","length":"5410"},"west":{"number":"3","length":"2190"},}
            },
      pieEchart: null,
      barEchart: null,
      lineEchart: null,
      // xiaEchart: null,
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
    drawData() {
      return this.$store.state.map.sourceMap;
    },
    currentXmList() {
      let result
      let alldata = this.sourceMap['项目']
      console.log(alldata)
      if (this.currentZrdw != '指挥部') {
        result = alldata.filter(item => {
          return item.attributes.ZR_DEPTID == this.currentZrdw
        })
      } else {
        result = alldata
      }
      this.xmList = result;
      // return result
    },
    currentDdList() {
      let result = []
      let alldata = this.sourceMap['断点']
      if (this.currentZrdw != '指挥部') {
        result = alldata.filter(item => {
          return item.attributes.ZRDW == this.currentZrdw
        })
      } else {
        result = alldata
      }
      this.ddList = result;
    },
    delayXmList() {
      let result
      let alldata = this.sourceMap['项目']
      if (alldata) {
        if (this.currentZrdw != '指挥部') {
          result = alldata.filter(item => {
            return item.attributes.ZR_DEPTID == this.currentZrdw && ~item.attributes.CURRENT_STATE.indexOf('滞后')
          })
        } else {
          result = alldata.filter(item => {
            return ~item.attributes.CURRENT_STATE.indexOf('滞后')
          })
        }
        return result
      }
    },
    questionDdList() {
      let result
      let alldata = this.sourceMap['断点']
      if (alldata) {
        if (this.currentZrdw != '指挥部') {
          result = alldata.filter(item => {
            return item.attributes.ZRDW == this.currentZrdw && item.attributes.CZWT != '无'
          })
        } else {
          result = alldata.filter(item => {
            return item.attributes.CZWT != '无'
          })
        }
        return result
      }
    },
  },
  methods: {
    ...mapActions("map", ["setSourceMap"]),
    getPOIPickedFeature(node, fn) {
      const { newdataset, url } = node;
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: `SMID <= 1000`,
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: [newdataset],
      });
      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
          processCompleted: async (res) => {
            const fields = await getIserverFields(url, newdataset);
            console.log(119, fields);
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    drawPies() {
      let data1=[],data2=[],lab;
      if(!!this.$data.ret){
        data1.push(parseFloat(this.$data.ret.pointDist.east.number));//东线个数
        data2.push(parseFloat(this.$data.ret.pointDist.east.length));//东线长度
        data1.push(parseFloat(this.$data.ret.pointDist.south.number));//南线个数
        data2.push(parseFloat(this.$data.ret.pointDist.south.length));//南线长度
        data1.push(parseFloat(this.$data.ret.pointDist.west.number));//西线个数
        data2.push(parseFloat(this.$data.ret.pointDist.west.length));//西线长度
        data1.push(parseFloat(this.$data.ret.pointDist.outer.number));//外环个数
        data2.push(parseFloat(this.$data.ret.pointDist.outer.length));//外环长度
        data1.push(parseFloat(this.$data.ret.pointDist.inner.number));//内环个数
        data2.push(parseFloat(this.$data.ret.pointDist.inner.length));//内环长度
      }
      const that = this;
      const e = this.getFontSize();
      this.pieEchart = this.$echarts.init(this.$refs.pieEchart);
      this.pieEchart.setOption({
        series: [
          {
            name: "",
            type: "pie",
            selectedMode: "single",
            radius: ["20%", "25%"],
            label: {
              position: "inner",
            },

            data: [
              {
                value: 335,
                name: "",
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0.5,
                    0,
                    0.5,
                    1,
                    [
                      { offset: 0, color: "#2374F5" },
                      { offset: 0.5, color: "#7BBDFF" },
                      { offset: 1, color: "#064E96" },
                    ]
                  ),
                },
              },
            ],
          },
          {
            name: "",
            type: "pie",
            radius: ["25%", "90%"],
            label: {
              position: "inner",
              formatter: " {b}：{c}个 ",
              textStyle: {
                color: "#040C32",
                fontSize: e,
              },
            },

            data: [
              { value: data1[0], name: "东线", itemStyle: { color: "#52D1FE" } },
              { value: data1[2], name: "西环", itemStyle: { color: "#FF9E72" } },
              { value: data1[1], name: "南线", itemStyle: { color: "#047DF6" } },
              { value: data1[3], name: "外环", itemStyle: { color: "#8FEF8B" } },
              { value: data1[4], name: "内环", itemStyle: { color: "#6852FE" } },
            ],
          },
          {
            name: "",
            type: "pie",
            radius: ["25%", "90%"],
            label: {
              formatter: " {b}",
              textStyle: {
                color: "#FFFFFF",
                fontSize: e,
              },
            },
            labelLine: {
              show: true,
              normal: {
                length: 5, // 改变标示线的长度
                lineStyle: {
                  color: "#A4EEFF", // 改变标示线的颜色
                  fontSize: e,
                },
              },
            },
            data: [
              { value: data1[0], name: data2[0]+"米", itemStyle: { color: "#52D1FE" } },
              { value: data1[2], name: data2[2]+"米", itemStyle: { color: "#FF9E72" } },
              { value: data1[1], name: data2[1]+"米", itemStyle: { color: "#047DF6" } },
              { value: data1[3], name: data2[3]+"米", itemStyle: { color: "#8FEF8B" } },
              { value: data1[4], name: data2[4]+"米", itemStyle: { color: "#6852FE" } },
            ],
          },
        ],
      });
      window.addEventListener("resize",function () {
        that.pieEchart.resize();
      });
    },
    getFontSize(){
      let e = this.screenWidth;
      if (e>4000){
        e = 18;
      }else {
        e = 10;
      }
      return e;
    },
    drawBars() {
      let data1=[],data2=[],lab=[];
      const e = this.getFontSize();
      console.log(e);
      if(!!this.$data.ret){
        // data1.push("");
        data1.push(parseFloat(this.$data.ret.situation.build));//在建
        data1.push(parseFloat(this.$data.ret.situation.pre));//前期研究

        data2.push(parseFloat(this.$data.ret.situation.finish));//完工
        data2.push(parseFloat(this.$data.ret.situation.buildLag));//在建滞后
        data2.push(parseFloat(this.$data.ret.situation.preLag));//前期滞后
        lab.push(""+data2[0]);
        lab.push((data2[1]+data1[0])+'('+data2[1]+")在建");
        lab.push((data2[2]+data1[1])+'('+data2[2]+")前期");
      }
      const that = this;
      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        grid: {
          left: '30%',
          top: 10,
          bottom: '15%',
        },
        xAxis: {
          type: "value",
          splitLine: {
            //网格线
            show: false,
          },
          max: 50,
          axisTick: {
            //x轴刻度线
            show: false,
          },
          axisLine: {
            //坐标轴线
            lineStyle: {
              color: "#ffffff",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: e,
              color: "#ffffff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["完工项目", "在建项目", "前期研究项目"],
          // nameLocation: 'middle',
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: e,
              color: "#ffffff",
            },
            formatter: function (name) {
              return name === "在建项目"
                ? name + " {b|(滞后)}"
                : name === "完工项目"
                ? "完工项目 "
                : name + " {a|(滞后)}";
            },
            rich: {
              a: {
                color: "#FF21D4",
                fontSize: e,
              },
              b: {
                color: "#FF0059",
                fontSize: e,
              },
            },
          },
          axisTick: {
            //x轴刻度线
            show: false,
          },
        },
        series: [
          {
            name: "第一部分",
            type: "bar",
            stack: "总量",
            barWidth: 25, //柱图宽度
            data: [
              { value: "", itemStyle: { color: "#3379FF" } },
              { value: data1[0], itemStyle: { color: "#FF0059" } },
              {
                value: data1[1],
                itemStyle: { color: "#FF21D4" },
              },
            ],
          },
          {
            name: "第二部分",
            type: "bar",
            stack: "总量",
            data: [
              { value: data2[0], name:lab[0],itemStyle: { color: "#3379FF" } },
              { value: data2[1], name:lab[1],itemStyle: { color: "#3379FF" } },
              {
                value: data2[2],name:lab[2],
                itemStyle: { color: "#3379FF" },
              },
            ],
          },
          {
            name: "第二部分",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "right",
              textStyle: {
                fontSize: e,
                color: "#fff",
                fontFamily: "PingFang SC",
              },
              formatter: function (params) {
                let temp = params.name;
                let first, secend;
                if (temp.indexOf('(') > -1) {
                  first = temp.split('(')[0];
                  secend = temp.split('(')[1].toString().split(')')[0];
                  const lab = temp.split('(')[1].toString().split(')')[1].toString();
                  if (lab === "前期") {
                    return "{a|" + first + "}" + '(' + "{c|" + secend + "}" + ")";
                  }
                  if (lab === "在建") {
                    return "{a|" + first + "}" + '(' + "{b|" + secend + "}" + ")";
                  }
                } else {
                  return temp
                }

              },
              rich: {
                a: {
                  fontSize: e,
                  fontFamily: "PingFang SC",
                  color: "#ffffff",
                },
                b:{
                  fontSize: e,
                  fontFamily: "PingFang SC",
                  color: "#FF0059",
                },
                c:{
                  fontSize: e,
                  fontFamily: "PingFang SC",
                  color: "#FF21D4",

                }
              },
            },
            data: [
              { value: 50-data2[0], name:lab[0],itemStyle: { color: "#000000" } },
              { value: 50-data2[1]-data1[0], name:lab[1],itemStyle: { color: "#000000" } },
              {
                value: 50-data2[2]-data1[1],name:lab[2],
                itemStyle: { color: "#000000" },
              },
            ],
          },

        ],
      });
      window.addEventListener("resize",function () {
        that.barEchart.resize();
      });
    },
    drawLines() {
      const e = this.getFontSize();
      const that = this;
      let data1,data2,lab;
      if(!!this.$data.ret){
        data1 = parseFloat(this.$data.ret.speed.Completion);
        data2 = 100 - 1 - data1;
        console.log(data2);
        lab = this.$data.ret.project.plan;
      }
      // console.log(data2);
      this.lineEchart = this.$echarts.init(this.$refs.lineEchart);
      // debugger;
      this.lineEchart.setOption({
            grid: {
              top: '10%',
              bottom:'35%',
              left:'20%',
            },
            tooltip : {
              trigger: 'axis',
              axisPointer: {
                // type: 'cross',
                label: {
                  backgroundColor: '#6a7985',
                  textStyle:{
                    fontSize: e,
                  }
                }
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap:'',
              data: ['2020.1.1', '2020.2.1','2020.6.1','2020.8.1','2020.9.1','2020.10.1','2020.11.1','2020.12.1','2021.1.1','2021.3.1','2021.4.1','2021.6.1','2022.3.1','2022.7.1','2022.9.1','2021.10.1','2021.12.1','2022.10.1','2022.12.1','2023.9.1','2023.12.1','2024.3.1'],
              axisTick: {
                //x轴刻度线
                show: false,
              },
              splitLine: {
                //网格线
                show: false,
              },
              axisLabel: {
                show: true,
                rotate: 40,
                textStyle:{
                  color:"#ffffff",
                  fontFamily:'DIN',
                  fontSize:e
                }
              },
              axisLine: {
                //坐标轴线
                show: true,
                lineStyle: {
                  color: '#ffffff',
                }
              },
            },
            yAxis: {
              type: 'value',
              // max:400,
              axisTick: {
                //x轴刻度线
                show: false,
              },
              splitLine: {
                //网格线
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle:{
                  fontFamily:'DIN',
                  color:"#ffffff",
                  fontSize:e
                }
              },
              axisLine: {
                //坐标轴线
                show: true,
                lineStyle: {
                  color: '#ffffff',
                }
              },
            },
            dataZoom : [
              {
                type: 'slider',
                show: true,
                start: 0,
                end: 30,
                xAxisIndex: [0],
                height: "10%",
                bottom:0,
              },
            ],
            series: [{
              data: [3000, 19000, 150, 15144, 103200, 161250,500,24813.36,194718,7540,20016,133571,7340,50000,67214,1454,928097,5000,408570,171360,176769,240263],
              type: 'line',
              smooth: true,
              areaStyle: {
                normal: {
                  color: '#52D1FE' //改变区域颜色
                }
              },
              itemStyle: {
                normal: {
                  color: '#52D1FE', //改变折线点的颜色
                  lineStyle: {
                    color: '#52D1FE' //改变折线颜色
                  }
                }
              },
            }]
      });
      window.addEventListener("resize",function () {
        that.lineEchart.resize();
      });
    },
    getData(name){
      this.currentZrdw = name;
      if (name==='指挥部'){
        this.changeType = 'all';
      }else{
        this.changeType = 'other';
      }
      console.log(this.changeType);
      let rets = [];
      this.list.forEach(function (element) {
        if(element.name==name){
          rets.push(element);
        }
      });
      if(rets.length>0){
        this.ret = rets[0];
      }
      this.$nextTick(()=>{
        this.drawLines();
        this.drawBars();
        this.drawPies();
      });
    },
    itemClick(item) {
      const { x, y } = item.geometry;
      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y - 0.005, 450),
        orientation: {
          heading: 0.003336768850279448,
          pitch: -0.5808830390057418,
          roll: 0.0,
        },
        maximumHeight: 450,
      });
    },
    searchXMClear() {
      this.searchXMText = "";
      this.xmList = [];
      this.searchXMFilter();
    },
    searchXMFilter() {
      // console.log(this.currentXmList);
      let allSearchList = this.sourceMap['项目'];
      allSearchList = allSearchList.filter(item => {
        return item.attributes.NAME.length
      })
      this.xmList = this.searchXMText
        ? allSearchList.filter((item) => {
          return item.attributes.NAME.indexOf(this.searchXMText) >= 0;
        })
        : allSearchList;
    },
    searchDDFilter() {
      // console.log(this.currentXmList);
      let allSearchList = this.sourceMap['断点'];
      allSearchList = allSearchList.filter(item => {
        return item.attributes.NAME.length
      })
      this.ddList = this.searchDDText
        ? allSearchList.filter((item) => {
          return item.attributes.NAME.indexOf(this.searchDDText) >= 0;
        })
        : allSearchList;
    },
    searchDDClear() {
      this.searchDDText = "";
      this.ddList = [];
      this.searchDDFilter();
    },
  },
  mounted() {
    const SERVER_HOST = "http://172.168.3.183:8090/iserver/services";
    const SW_DATA = "/data-alldata/rest/data";
    const SW_DATA_NAME = "172.168.3.181_thxm:";
    const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
    this.getPOIPickedFeature({
      id: "项目",
      label: "项目",
      url: SERVER_DEFAULT_DATA,
      newdataset: `${SW_DATA_NAME}项目`,
      icon: false,
    });
    this.getPOIPickedFeature({
      id: "断点",
      label: "断点",
      url: SERVER_DEFAULT_DATA,
      newdataset: `${SW_DATA_NAME}绿道断点`,
      icon: "断点",
      iconSize: "small",
    });
    this.drawPies();
    this.drawBars();
    this.drawLines();
  },
  watch: {
    drawData(val) {
      console.log("drawData", val);
    },
  },
};
</script>

<style lang="less">
@import url("./layerHub.less");
</style>
