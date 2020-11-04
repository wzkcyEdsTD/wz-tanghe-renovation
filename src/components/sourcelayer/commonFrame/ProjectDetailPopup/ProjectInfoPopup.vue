
<template>
  <div class="project-info-popup">
    <div class="mask"></div>
    <div class="info-container" v-show="isLoaded">
      <span class="close-btn" @click="closeInfo"></span>
      <div class="left-menu">
        <div class="left-menu-tool">
          <div
            class="left-menu-child"
            :class="{ active: activeMenu == 0 }"
            @click="menuClick('baseInfo', 0)"
          >
            项目基本信息
          </div>
          <div
            class="left-menu-child"
            :class="{ active: activeMenu == 1 }"
            @click="menuClick('xxjdInfo', 1)"
          >
            形象进度信息
          </div>
          <div
            class="left-menu-child"
            :class="{ active: activeMenu == 2 }"
            @click="menuClick('qgcInfo', 2)"
          >
            全过程信息
          </div>
          <!-- <div class="left-menu-child" :class="{active: activeMenu==3}" @click="menuClick('zbqjInfo', 3)">周边全景信息</div> -->
        </div>
      </div>
      <div class="right-content">
        <div id="baseInfo" class="base-info">
          <div class="base-info-xmmc">{{ projectBaseInfo["项目名称"] }}</div>
          <div class="splitLine"></div>
          <div class="info-title">项目基本信息</div>
          <table class="base-table">
            <tbody class="base-table">
              <tr>
                <th>投资类型：</th>
                <td>{{ projectBaseInfo["投资类型"] + "投资" }}</td>
                <th>总投资：</th>
                <td>{{ projectBaseInfo["总投资"] + "万元" }}</td>
              </tr>
              <tr>
                <th>建设类型大类：</th>
                <td>{{ projectBaseInfo["建设类型大类"] }}</td>
                <th>上年度累计投资：</th>
                <td>{{ projectBaseInfo["上年度累计投资"] + "万元" }}</td>
              </tr>
              <tr>
                <th>建设类型小类：</th>
                <td>{{ projectBaseInfo["建设类型小类"] }}</td>
                <th>当年投资计划：</th>
                <td>{{ projectBaseInfo["当年投资计划"] + "万元" }}</td>
              </tr>
              <tr>
                <th>建设进度：</th>
                <td>{{ projectBaseInfo["建设进度"] }}</td>
                <th>当年累计完成投资：</th>
                <td>{{ projectBaseInfo["当年累计完成投资"] + "万元" }}</td>
              </tr>
              <tr>
                <th>所在范围：</th>
                <td>{{ projectBaseInfo["所在范围"] }}</td>
                <th>当年剩余投资：</th>
                <td>{{ projectBaseInfo["当年剩余投资额"] + "万元" }}</td>
              </tr>
              <tr>
                <th>所属街道：</th>
                <td>{{ projectBaseInfo["所属街道"] }}</td>
                <th>责任单位：</th>
                <td>{{ projectBaseInfo["责任单位"] }}</td>
              </tr>
              <tr>
                <th>计划开工时间：</th>
                <td>{{ projectBaseInfo["计划开工时间"] }}</td>
                <th>实施单位：</th>
                <td>{{ projectBaseInfo["实施单位"] }}</td>
              </tr>
              <tr>
                <th>计划建成时间：</th>
                <td>{{ projectBaseInfo["计划建成时间"] }}</td>
                <th>项目范围：</th>
                <td>{{ projectBaseInfo["项目范围"] }}</td>
              </tr>
              <tr>
                <th>建设规模及内容：</th>
                <td colspan="4">{{ projectBaseInfo["建设规模和内容"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="xxjdInfo" class="xxjd-info">
          <div class="splitLine"></div>
          <div class="info-title">形象进度信息</div>
        </div>
        <div id="qgcInfo" class="qgc-info">
          <div class="splitLine"></div>
          <div class="info-title">全过程信息</div>
          <div class="nodata" v-show="noQgcInfo">
            <img src="./images/noData.png" alt="" />
          </div>
        </div>
        <!-- <div id="zbqjInfo" class="zbqj-info">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { queryInfoByid, queryDetailByid, queryDetailBycode } from "api/djdmAPI";
export default {
  props: ["id"],
  data() {
    return {
      isLoaded: false,
      activeMenu: 0,
      projectCode: null,
      projectBaseInfo: {},
      noQgcInfo: false
    };
  },
  methods: {
    async getDetail() {
      this.projectCode = null
      this.projectBaseInfo = {}
      const res = await queryInfoByid(this.id)
      console.log('infoRes', res)
      this.projectBaseInfo = this.formatData(res.data)
      this.projectCode = res.data['项目副码']
      this.getXxjdData()
      this.getQgcData()
      this.isLoaded = true
    },
    async getXxjdData() {
      const res = await queryDetailByid(this.id)
      console.log('detailRes', res)
      const data = res.data
      let table = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class='xxjd-table'><tr><th style='width: 80px;'>年月</th><th style='width: 120px;'>本月完成投资</th><th style='width: 230px'>本月工程形象进度</th><th style='width: 230px;'>下月形象进度计划</th><th>存在问题</th><th style='width: 120px;'>建议要求</th></tr>";
      let obj = null;
      let contentTr = "";
      if (data.length == 0) {
          contentTr = "<tr><td colspan='6' style='text-align: center'>暂无数据!</td></tr>";
      }
      for (let i = 0; i < data.length; i++) {
          obj = this.formatData(data[i]);
          contentTr += "<tr><td>" + obj.datetime + "</td><td>" + obj.ok_currFund + "万元</td><td>" + obj.progText + "</td><td>" + obj.nextPlanText + "</td><td>" + obj.problem + "</td><td>" + obj.suggestText + "</td></tr>"
      }
      table += contentTr;
      table += "</table>";
      $("#xxjdInfo").append(table);
    },
    async getQgcData() {
      const res = await queryDetailBycode(this.projectCode)
      let data
      if(!res.data) {
        data = null;
      }else {
        data = res.data.message.data
      }
      if (data === null) {
        this.noQgcInfo = true
      } else {
        var statistics = data.Statistics;
        var statisticsTable = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class='xxjd-table' style='text-align: center'>" +
            "<tr><td colspan='2' style='font-size: 16px;font-weight: 400;height:35px;'>审批统计</td></tr>" +
            "<tr><th>并行事项个数</th><th>并行事项总历时</th></tr>" +
            "<tr><td>" + statistics.b_ProSum + "个</td><td>" + statistics.b_SPdays.toFixed(2) + "个工作日</td></tr>" +
            "<tr><th>建设管理审批（主流程）事项个数</th><th>建设管理审批（主流程）总历时</th></tr>" +
            "<tr><td>" + statistics.z_ProSum + "个</td><td>" + statistics.z_SPdays.toFixed(2) + "个工作日</td></tr>" +
            "<tr><th>事项审批总事项</th><th>并联审批总历时</th></tr>" +
            "<tr><td>" + statistics.s_ProSum + "个</td><td>" + statistics.s_SPdays.toFixed(2) + "个工作日</td></tr>" +
            "</table>";
        $("#qgcInfo").append(statisticsTable);

        var tp = data.TechnologicalProcessModel;
        var tpTable = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class='xxjd-table' style='text-align: center'>" +
            "<tr><td colspan='5' style='font-size: 16px;font-weight: 400;height:35px;'>事项审批流程信息</td></tr>" +
            "<tr><th>审批阶段名称</th><th>时限</th><th>开始时间</th><th>结束时间</th><th>审批用时</th></tr>";
        for (var i = 0; i < tp.length; i++) {
            tpTable += "<tr><td>" + tp[i].Name + "</td><td>" + tp[i].TimeLimit + "天</td><td>" + tp[i].StartTime + "</td><td>" + tp[i].EndTime + "</td><td>" + tp[i].UseTimeSum + "天</td></tr>";
        }
        tpTable += "</table>";
        $("#qgcInfo").append(tpTable);

        //立项用地规划许可阶段
        var first = tp[1].AuditingInfos;
        var firstTable = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class='xxjd-table' >" +
            "<tr><td colspan='8' style='font-size: 16px;font-weight: 400;height:35px;text-align: center'>" + tp[1].Name + "（阶段时限" + tp[1].TimeLimit + "个工作日）</td></tr> " +
            "<tr><th>审核单位</th><th>审核事项</th><th style='text-align: center'>接件时间</th><th style='text-align: center'>办结时间</th>" +
            "<th>办理时限</th><th>办理用时</th><th>办理状态</th></tr>";
            // <th style='width: 80px;'>附件</th>
        var firstContent = "";
        if (first.length == 0) {
            firstContent = "<tr style='text-align: center'><td colspan='8'>暂无数据!</td></tr>";
        }
        for (var i = 0; i < first.length; i++) {
            var obj = JSON.stringify(first[i].TransactInfo);
            var fileObj = JSON.stringify(first[i].Files);
            var itemName = first[i].AuditingItem;
            firstContent += "<tr><td>" + first[i].AuditingDepartment + "</td><td>" + first[i].AuditingItem + "</td>" +
                "<td style='text-align: center'>" + first[i].ReceiveCaseTime + "</td><td style='text-align: center;'>" + first[i].GetThroughTime + "</td>" +
                "<td style='width: 105px;'>" + first[i].TimeLimit + "个工作日</td>" +
                "<td style='width: 115px;'><a style='cursor: pointer;color: white' onclick='showSpList(" + obj + ")'>" + first[i].UseTime + "个工作日</a></td>" +
                "<td>" + first[i].State + "</td>" +
                // "<td style='text-align: center;text-indent: 0px;'>" +
                // "<a style='cursor: pointer;color: white' files='" + fileObj + "' onclick='showFileList(" + fileObj + ",\"" + itemName + "\")'><img title='查看' src='./images/showFile.png'></a>" +
                // "</td>" +
                "</tr>";
        }
        firstTable += firstContent;
        firstTable += "</table>";
        $("#qgcInfo").append(firstTable);

        //工程建设许可阶段
        var second = tp[2].AuditingInfos;
        var secondTable = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class='xxjd-table' >" +
            "<tr><td colspan='8' style='font-size: 16px;font-weight: 400;height:35px;text-align: center'>" + tp[2].Name + "（阶段时限" + tp[2].TimeLimit + "个工作日）</td></tr> " +
            "<tr><th>审核单位</th><th>审核事项</th><th style='text-align: center'>接件时间</th><th style='text-align: center'>办结时间</th>" +
            "<th>办理时限</th><th>办理用时</th><th>办理状态</th></tr>";

        var secondContent = "";
        if (second.length == 0) {
            secondContent = "<tr style='text-align: center'><td colspan='8'>暂无数据!</td></tr>";
        }
        for (var i = 0; i < second.length; i++) {
            var obj = JSON.stringify(second[i].TransactInfo);
            var fileObj = JSON.stringify(second[i].Files);
            var itemName = second[i].AuditingItem;
            secondContent += "<tr><td>" + second[i].AuditingDepartment + "</td><td>" + second[i].AuditingItem + "</td>" +
                "<td style='text-align: center'>" + second[i].ReceiveCaseTime + "</td><td style='text-align: center;'>" + second[i].GetThroughTime + "</td>" +
                "<td style='width: 105px;'>" + second[i].TimeLimit + "个工作日</td>" +
                "<td style='width: 105px;'><a style='cursor: pointer;color: white' onclick='showSpList(" + obj + ")'>" + second[i].UseTime + "个工作日</a></td>" +
                "<td>" + second[i].State + "</td>" +
                // "<td style='text-align: center;text-indent: 0px;'>" +
                // "<a style='cursor: pointer;color: white' files='" + fileObj + "' onclick='showFileList(" + fileObj + ",\"" + itemName + "\")'><img title='查看' src='./images/showFile.png'></a>" +
                // "</td>" +
                "</tr>";
        }
        secondTable += secondContent;
        secondTable += "</table>";
        $("#qgcInfo").append(secondTable);

        //施工许可阶段
        var third = tp[3].AuditingInfos;
        var thirdTable = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class='xxjd-table' >" +
            "<tr><td colspan='8' style='font-size:16px;font-weight:400;height:35px;text-align:center'>" + tp[3].Name + "（阶段时限" + tp[3].TimeLimit + "个工作日）</td></tr>" +
            "<tr><th>审核单位</th><th>审核事项</th><th style='text-align:center'>接件时间</th><th style='text-align:center'>办结时间</th>" +
            "<th>办理时限</th><th>办理用时</th><th>办理状态</th></tr>";
        var thirdContent = "";
        if (third.length == 0) {
            thirdContent = "<tr style='text-align:center'><td colspan='8'>暂无数据!</td></tr>";
        }
        for (var i = 0; i < third.length; i++) {
            var obj = JSON.stringify(third[i].TransactInfo);
            var fileObj = JSON.stringify(third[i].Files);
            var itemName = third[i].AuditingItem;
            thirdContent += "<tr><td>" + third[i].AuditingDepartment + "</td><td>" + third[i].AuditingItem + "</td>" +
                "<td style='text-align: center'>" + third[i].ReceiveCaseTime + "</td><td style='text-align: center;'>" + third[i].GetThroughTime + "</td>" +
                "<td style='width: 105px;'>" + third[i].TimeLimit + "个工作日</td>" +
                "<td style='width: 115px;'><a style='cursor: pointer;color: white' onclick='showSpList(" + obj + ")'>" + third[i].UseTime + "个工作日</a></td>" +
                "<td>" + third[i].State + "</td>" +
                // "<td style='text-align: center;text-indent: 0px;'>" +
                // "<a style='cursor: pointer;color: white' files='" + fileObj + "' onclick='showFileList(" + fileObj + ",\"" + itemName + "\")'><img title='查看' src='./images/showFile.png'></a>" +
                // "</td>" +
                "</tr>";
        }
        thirdTable += thirdContent;
        thirdTable += "</table>";
        $("#qgcInfo").append(thirdTable);

        //竣工验收阶段
        var fourth = tp[4].AuditingInfos;
        var fourthTable = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class='xxjd-table' >" +
            "<tr><td colspan='8' style='font-size: 16px;font-weight: 400;height:35px;text-align: center'>" + tp[4].Name + "（阶段时限" + tp[4].TimeLimit + "个工作日）</td></tr> " +
            "<tr><th>审核单位</th><th>审核事项</th><th style='text-align: center'>接件时间</th><th style='text-align: center'>办结时间</th>" +
            "<th>办理时限</th><th>办理用时</th><th>办理状态</th></tr>";

        var fourthContent = "";
        if (fourth.length == 0) {
            fourthContent = "<tr style='text-align: center'><td colspan='8'>暂无数据!</td></tr>";
        }
        for (var i = 0; i < fourth.length; i++) {
            var obj = JSON.stringify(fourth[i].TransactInfo);
            var fileObj = JSON.stringify(fourth[i].Files);
            var itemName = fourth[i].AuditingItem;
            fourthContent += "<tr><td>" + fourth[i].AuditingDepartment + "</td><td>" + fourth[i].AuditingItem + "</td>" +
                "<td style='text-align: center'>" + fourth[i].ReceiveCaseTime + "</td>" +
                "<td style='text-align: center;'>" + fourth[i].GetThroughTime + "</td><td style='width: 105px;'>" + fourth[i].TimeLimit + "个工作日</td>" +
                "<td style='width: 115px;'><a style='cursor: pointer;color: white' onclick='showSpList(" + obj + ")'>" + fourth[i].UseTime + "个工作日</a></td>" +
                "<td>" + fourth[i].State + "</td>" +
                // "<td style='text-align: center;text-indent: 0px;'>" +
                // "<a style='cursor: pointer;color: white' files='" + fileObj + "' onclick='showFileList(" + fileObj + ",\"" + itemName + "\")'><img title='查看' src='./images/showFile.png'></a>" +
                // "</td>" +
                "</tr>";
        }
        fourthTable += fourthContent;
        fourthTable += "</table>";
        $("#qgcInfo").append(fourthTable);
      }
    },
    //处理值为null的数据
    formatData(ProjectBaseInfo) {
      let newObj = {};
      for (let key in ProjectBaseInfo) {
        if (ProjectBaseInfo[key] == null) {
          newObj[key] = "";
        } else {
          newObj[key] = ProjectBaseInfo[key];
        }
      }
      return newObj;
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
    closeInfo() {
      this.$parent.showInfo = false
    },
  },
  mounted() {
    this.getDetail()
  },
  beforeDestroy() {
    this.isLoaded = false
  }
};
</script>

<style lang="less" scoped>
@import url("./ProjectInfoPopup.less");
</style>

<style lang="less">
.xxjd-table {
  text-align: left;
  width: 100%;
  margin-top: 20px;
  border-right: none;
  border-left: none;
  border-top: none;
  letter-spacing: 1px;
  font-size: 1.4vh;
  color: #fff;
  th {
    background: rgba(62, 158, 255, 0.3);
    border: 1px solid rgba(62, 158, 255, 0.3);
    height: 35px;
    line-height: 35px;
    border-top: none;
    letter-spacing: 2px;
    text-align: center;
  }
  td {
    padding: 1px 0px 0px 2px;
    text-indent: 10px;
    border: 1px solid rgba(62, 158, 255, 0.3);
    line-height: 30px;
  }
}
</style>>
