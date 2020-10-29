
<template>
  <div class="detail-popup">
    <div id="forcePopUp" v-if="forcePosition.x && forcePosition.y">
      <div
        id="forcePopUpContent"
        class="leaflet-popup"
        :style="{
          transform: `translate3d(${forcePosition.x}px,${forcePosition.y}px, 0)`,
        }"
      >
        <a class="leaflet-popup-close-button" href="#" @click="closePopup"></a>
        <div class="leaflet-popup-content-wrapper">
          <div id="forcePopUpLink" class="leaflet-popup-content">
            <header>{{ forceEntity.attributes.NAME }}</header>
            <ul class="content-body">
              <li>
                <span>所属区县:</span>
                <span>{{ forceEntity.attributes.DISTRICT }}</span>
              </li>
              <li>
                <span>所属街道:</span>
                <span>{{ forceEntity.attributes.STREET }}</span>
              </li>
            </ul>
            <div class="detail" @click="goDetail">查看详情 >></div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-container" v-show="isShow">
      <div class="left-menu">
        <div class="left-menu-tool">
          <div class="left-menu-child" :class="{active: activeMenu==0}" @click="menuClick('baseInfo', 0)">项目基本信息</div>
          <div class="left-menu-child" :class="{active: activeMenu==1}" @click="menuClick('xxjdInfo', 1)">形象进度信息</div>
          <div class="left-menu-child" :class="{active: activeMenu==2}" @click="menuClick('qgcInfo', 2)">全过程信息</div>
          <div class="left-menu-child" :class="{active: activeMenu==3}" @click="menuClick('zbqjInfo', 3)">周边全景信息</div>
        </div>
      </div>
      <span class="close-btn" @click="closeInfo"></span>
      <div class="right-content">
        <div id="baseInfo" class="base-info">
          <div class="base-info-xmmc">
            瓯海区南白象街道横港头村E-1-03、E-1-05地块城中村改造安置房及周边绿化、道路工程
          </div>
          <div class="splitLine"></div>
          <div class="info-title">项目基本信息</div>
          <table class="base-table">
            <tbody class="base-table">
              <tr>
                <th>投资类型：</th>
                <td>政府性投资</td>
                <th>总投资：</th>
                <td>90771万元</td>
              </tr>
              <tr>
                <th>建设类型大类：</th>
                <td>公共类项目</td>
                <th>上年度累计投资：</th>
                <td>19171万元</td>
              </tr>
              <tr>
                <th>建设类型小类：</th>
                <td>保障性安居工程</td>
                <th>当年投资计划：</th>
                <td>12000万元</td>
              </tr>
              <tr>
                <th>建设进度：</th>
                <td>续建</td>
                <th>当年累计完成投资：</th>
                <td>11687.31万元</td>
              </tr>
              <tr>
                <th>所在范围：</th>
                <td>瓯海区</td>
                <th>当年剩余投资：</th>
                <td>312.69万元</td>
              </tr>
              <tr>
                <th>所属街道：</th>
                <td>南白象街道</td>
                <th>责任单位：</th>
                <td>瓯海区</td>
              </tr>
              <tr>
                <th>计划开工时间：</th>
                <td>2017-09-01</td>
                <th>实施单位：</th>
                <td>瓯海区城市建设中心</td>
              </tr>
              <tr>
                <th>计划建成时间：</th>
                <td>2021-06-01</td>
                <th>项目范围：</th>
                <td>市级重点区块塘河沿线</td>
              </tr>
              <tr>
                <th>建设规模及内容：</th>
                <td colspan="4">
                  总用地面积54522平方米，总建筑面积187723平方米，其中地下室50155平方米，共1002套。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="xxjdInfo" class="xxjd-info">
          <div class="splitLine"></div>
          <div class="info-title">形象进度信息</div>
          <table border="1" cellspacing="0" cellpadding="0" class="xxjd-table">
            <tbody>
              <tr>
                <th style="width: 80px">年月</th>
                <th style="width: 120px">本月完成投资</th>
                <th style="width: 250px">本月工程形象进度</th>
                <th style="width: 250px">下月形象进度计划</th>
                <th>存在问题</th>
                <th style="width: 80px">建议要求</th>
              </tr>
              <tr>
                <td>2020-9</td>
                <td>1455.84万元</td>
                <td>
                  "E-1-05地块：屋面瓦安装完成90%；屋面防水及保护层浇筑完成40%；附楼屋面防水及保护层浇筑完成50%；阳台推拉门框安装完成,16层上部阳台栏杆安装完成50%；2-15层卫生间、阳台楼地面浇筑完成70%；地下室顶板防水及保护层浇筑完成70%；16-屋面外架拆除完成80%；附楼石材干挂外架搭设完成40%。E-1-03地块：16层-屋面外墙抹灰完成80%；16层-屋面内墙抹灰完成70%，内墙保温完成30%；内墙腻子与内墙抹灰基本同步跟上；2-15层阳台栏杆安装完成；阳台推拉门框安装完成40%，楼地面刨地清理完成80%；16层-屋面层内外墙喷浆完成；2-15层卫生间结构闭水完成80%；
                  地下室：第二道腻子完成30%。 "
                </td>
                <td>
                  "E-1-05地块：坡屋面瓦安装完成；屋面防水及保护层浇筑完成；附楼屋面防水及保护层浇筑完成；16层上部阳台栏杆安装完成，楼地面刨地清理完成80%；2-15层卫生间防水保护层浇筑完成，楼地面保温浇筑完成80%；2~屋面楼梯踏步浇筑完成60%；地下室顶板防水及保护层浇筑完成；16-屋面外架拆除完成；附楼石材干挂外架搭设完成。
                  E-1-03地块：坡屋面防水完成，屋面瓦完成80%；16层-屋面外墙抹灰完成；16层-屋面内墙抹灰完成，内墙保温完成；内墙腻子与内墙抹灰基本同步跟上；2-15阳台推拉门框安装完成，楼地面刨地清理完成；2-15层卫生间结构闭水完成，防水及防水保护层浇筑完成60%；16层-屋面外架拆除完成50%。地下室：第二道腻子完成；地面刨地及清理完成50%。"
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2020-8</td>
                <td>1939.52万元</td>
                <td>03地块粉刷完成70%；05地块粉刷完成90%。</td>
                <td>03地块粉刷完成，外墙涂料完成30%；05地块外墙涂料完成50%。</td>
                <td>
                  "1、梧三路预留市政给水接口暂不能使用，道路竣工尚未移交有关部门。
                  2、04、06以及临编地块图纸发改委审核尚未完成。"
                </td>
                <td></td>
              </tr>
              <tr>
                <td>2020-7</td>
                <td>1482.35万元</td>
                <td>
                  E-1-03地块主体结顶；砌体完成90%；内外墙抹灰完成60%。外墙涂料完成10%。
                </td>
                <td>E-1-03地块粉刷完成60%；E-1-05外墙涂料完成50%。</td>
                <td>梧三路没有预留市政给水接口</td>
                <td></td>
              </tr>
              <tr>
                <td>2020-6</td>
                <td>2012.7万元</td>
                <td>主体混凝土全部完成；砌体完成至90% ；内外墙抹灰完成至50%</td>
                <td>
                  E-1-03地块主体结顶；砌体完成80%；内外墙抹灰完成30%。外墙涂料完成10%。
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2020-5</td>
                <td>1650.76万元</td>
                <td>
                  "主体混凝土完成至98%；砌体完成至68% ；内外墙抹灰完成至15%"
                </td>
                <td>
                  E-1-03地块主体结顶；砌体完成80%；内外墙抹灰完成30%。外墙涂料完成10%。
                </td>
                <td>地下室增加部分造价未确定</td>
                <td>尽快确定并支付。</td>
              </tr>
              <tr>
                <td>2020-4</td>
                <td>1142.14万元</td>
                <td>
                  E-1-03地块：主体混凝土完成至87%；砌体完成至40%
                  E-1-05地块：砌体完成至93%；内外墙抹灰完成至13%
                </td>
                <td>
                  E-1-03地块：主体结顶；砌体完成至80%
                  E-1-05地块：砌体完成；外墙抹灰完成。外墙涂料完成30%。
                </td>
                <td>地下室增加部分造价未确定</td>
                <td>尽快确定并支付。</td>
              </tr>
              <tr>
                <td>2020-3</td>
                <td>2004万元</td>
                <td>主体结构施工</td>
                <td>主体结构施工</td>
                <td>
                  由于新冠疫情，区、市质监站暂不组织标化验收，导致后续附属工程目前还不能进场
                </td>
                <td></td>
              </tr>
              <tr>
                <td>2019-12</td>
                <td>3621.39万元</td>
                <td>
                  E-1-05地块：主体结构完成100%；砌体完成65%； E-1-03
                  地块：主体结构完成67%.
                </td>
                <td>
                  E-1-05地块：砌体完成72%；地下室结构中间验收； E-1-03
                  地块：主体结构完成73%.
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-11</td>
                <td>1517万元</td>
                <td>
                  E-1-05地块：主体结构完成75%；砌体完成35%； E-1-03
                  地块：主体结构完成50%.
                </td>
                <td>
                  E-1-05地块：主体结构完成95%；砌体完55%；地下室结构中间验收；
                  E-1-03 地块：主体结构完成60%.
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-10</td>
                <td>1617.58万元</td>
                <td>
                  E-1-05地块：主体结构完成65%；砌体完成25%； E-1-03 地块：
                  主体结构完成40%；
                </td>
                <td>
                  E-1-05地块：主体结构完成75%；砌体完成35%； E-1-03 地块：
                  主体结构完成50%.
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-9</td>
                <td>1718.49万元</td>
                <td>
                  E-1-05地块：主体结构完成50%；砌体完成15%； E-1-03 地块：
                  主体结构完成30%；基础全部完成。
                </td>
                <td>
                  E-1-05地块：主体结构完成70%；砌体完成20%； E-1-03 地块：
                  主体结构完成40%.
                </td>
                <td>
                  1、因地下室平面图调整，造成的临时设施拆除重建的工作量及05-5#楼处的地下河道换土处理需相关各方签字确认；
                  2、地下室增加造价款需及时足额支付；
                  3、地下室增加工程量及工期顺延的签证需抓紧落实。
                </td>
                <td></td>
              </tr>
              <tr>
                <td>2019-8</td>
                <td>923.09万元</td>
                <td>
                  E-1-05地块：主体结构完成40%；砌体完成10%； E-1-03 地块：
                  主体结构完成20%；基础完成90%。
                </td>
                <td>
                  E-1-05地块：主体结构完成50%；砌体完成10%； E-1-03 地块：
                  主体结构完成30%；基础结构全部完成。
                </td>
                <td>
                  1、地下室增加造价款需及时足额支付；
                  2、地下室增加工程量及工期顺延的签证需抓紧落实。
                </td>
                <td></td>
              </tr>
              <tr>
                <td>2019-7</td>
                <td>2371.08万元</td>
                <td>
                  "E-1-05地块：
                  05-1#楼十七~十九层、05-2#楼十一~十二层、05-3#楼三~四层、05-4#楼三~五层、05-5#楼三~五层梁板砼浇捣完成；6区块地下室顶板浇捣完成；4区块地下室顶板浇筑完成；地下室结构全部完成；05-1#楼砌体完成二~七层。
                  E-1-03 地块：
                  03-1#楼七~八层、03-2#楼二层、03-6#楼三~五层、03-7#楼二层梁板砼浇捣完成；03-5#楼二层梁板模板安装完成；10区~12区地下室顶板钢筋绑扎完成；14、15、22区块地下室顶板浇筑完成；15区块地下室顶板钢筋绑扎完成70%；19区块地下室底板浇筑完成；、20区块地下室底板钢筋绑扎完成70%；21、13a区块土方外运、砖胎膜、垫层浇筑完成；
                  "
                </td>
                <td>
                  "E-1-05地块：05-1#楼二十~二十三层、05-2#楼十三~十五层、05-3#楼五~八层、05-4#楼六~八层、05-5#楼五~八层梁板砼浇捣完成；05-1#楼砌体六~十层、05-2#楼砌体二~五层。05-3#、05-4#、05-5#楼砌体二~三层，地下室砌体完成30%。
                  E-1-03地块：03-1#楼九~十一层、03-2#楼二~四层、03-4#楼二~三层、03-5#楼二~四层、03-6#楼五~七层、03-7#楼三~五层梁板砼浇捣完成；12区地下室顶板浇捣完成；15区块地下室顶板浇筑完成；20、21、13a区块地下室底板浇筑完成；24区块土方外运、砖胎膜、垫层浇筑完成；19、20区块支撑梁破除完成。"
                </td>
                <td>
                  因地下室平面图调整，造成的临时设施拆除重建的工作量及05-5#楼处的地下河道换土处理需相关各方签字确认；
                </td>
                <td></td>
              </tr>
              <tr>
                <td>2019-6</td>
                <td>1204.03万元</td>
                <td>
                  E-1-05地块:主体施工 E-1-03 地块：1#、6#主体施工，其余地下室施工
                </td>
                <td>E-1-05地块:主体施工 E-1-03地块：主体施工、地下室施工</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-5</td>
                <td>1000万元</td>
                <td>地下室施工</td>
                <td>主体施工</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-4</td>
                <td>1005.17万元</td>
                <td>地下室施工</td>
                <td>地下室施工</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-3</td>
                <td>1008.22万元</td>
                <td>地下室施工</td>
                <td>地下室施工</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-2</td>
                <td>697.65万元</td>
                <td>地下室施工</td>
                <td>地下室施工</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2019-1</td>
                <td>678.03万元</td>
                <td>地下室施工</td>
                <td>地下室施工</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="qgcInfo" class="qgc-info">
          <div class="splitLine"></div>
          <div class="info-title">全过程信息</div>
          <div class="nodata">
            <img src="./images/noData.png" alt="">
          </div>
        </div>
        <div id="zbqjInfo" class="zbqj-info">
          <div class="splitLine"></div>
          <div class="info-title">周边全景信息</div>
          <div class="vr-list">
            <div class="vr-item">
              <div class="vr-out">
                <img src="https://wzdjdm.wzcitybrain.com:8888/VRPic\e96a87a101714569a6658c79d1009865.png" alt="">
              </div>
              <div class="vr-name">白象-滨水公园</div>
            </div>
            <div class="vr-item">
              <div class="vr-out">
                <img src="https://wzdjdm.wzcitybrain.com:8888/VRPic\e96a87a101714569a6658c79d1009865.png" alt="">
              </div>
              <div class="vr-name">白象-滨水公园</div>
            </div>
            <div class="vr-item">
              <div class="vr-out">
                <img src="https://wzdjdm.wzcitybrain.com:8888/VRPic\e96a87a101714569a6658c79d1009865.png" alt="">
              </div>
              <div class="vr-name">白象-滨水公园</div>
            </div>
            <div class="vr-item">
              <div class="vr-out">
                <img src="https://wzdjdm.wzcitybrain.com:8888/VRPic\e96a87a101714569a6658c79d1009865.png" alt="">
              </div>
              <div class="vr-name">白象-滨水公园</div>
            </div>
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
import { ZBQJList } from "config/ZBQJConfig";
import { queryDetailByid } from "api/djdmAPI";
export default {
  data() {
    return {
      forceEntity: {},
      forcePosition: {},
      isShow: false,
      nameList: [
        {
          label: "基本信息",
          value: "basic",
        },
        {
          label: "图片",
          value: "spot",
        },
        {
          label: "视频",
          value: "video",
        },
        {
          label: "音频",
          value: "audio",
        },
        {
          label: "全景",
          value: "overall",
        },
      ],
      havePhoto: false,
      haveSpot: false,
      haveZbOverall: false,
      haveOverall: false,
      activeMenu: 0,
      showQJ: false,
      QJURL: "",
      hideField: [
        "名称",
        "标签",
        "备注",
        "形象进度",
        "目录分类",
        "数据来源",
        "经度",
        "纬度",
        "建设地点1",
        "建设地点2",
        "建设地点3",
        "是否属于67个里面的",
        "类型",
        "统计",
        "唯一码",
        "更新参考数据源",
        "照片编号",
        "类型1",
        "类型2",
        "类型3",
        "显示级别",
        "类型编码",
        "马克",
        "照片",
        "颜色",
        "全景",
        "视频",
        "语音",
        "现场记录",
        "景观图",
        "周边全景",
      ],
    };
  },
  computed: {},
  async mounted() {},
  methods: {
    /**
     *  详情点赋值
     *  @param {object} forceEntity 详情点信息
     */
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      console.log("aaa", forceEntity);
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
    async goDetail() {
      // const res = await queryDetailByid(731)
      // console.log('detailRes', res)
      this.isShow = true;
    },
    menuClick(id, index) {
      this.activeMenu = index
      this.$nextTick(() => {
        document.querySelector(`#${id}`).scrollIntoView({
          behavior: "auto", // 平滑过渡
          block: "start" // 上边框与视窗顶部平齐。默认值
        });
      });
    },
    openQJ(qj) {
      this.QJURL = qj.VR;
      this.showQJ = true;
    },
    closeQJ() {
      this.showQJ = false;
      this.QJURL = "";
    },
    closeInfo() {
      this.isShow = false;
    },
    closePopup() {
      this.forcePosition = {};
      this.forceEntity = {};
      this.closeInfo();
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./DetailPopup.less");
</style>
