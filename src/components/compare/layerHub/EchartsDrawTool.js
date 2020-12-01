const getFontSize = () => {
  let e = document.body.clientWidth;
  if (e > 4000) {
    e = 18;
  } else {
    e = 14;
  }
  return e;
}

export const drawBar = (context) => {
  let data1 = [], data2 = [], lab = [];
  const e = getFontSize();
  console.log(e);
  if (!!context.$data.ret) {
    data1.push(parseFloat(context.$data.ret.situation.build));//在建
    data1.push(parseFloat(context.$data.ret.situation.pre));//前期研究

    data2.push(parseFloat(context.$data.ret.situation.finish));//完工
    data2.push(parseFloat(context.$data.ret.situation.buildLag));//在建滞后
    data2.push(parseFloat(context.$data.ret.situation.preLag));//前期滞后
    lab.push("" + data2[0]);
    lab.push((data2[1] + data1[0]) + '(' + data2[1] + ")在建");
    lab.push((data2[2] + data1[1]) + '(' + data2[2] + ")前期");
  }
  context.barEchart = context.$echarts.init(context.$refs.barEchart);
  context.barEchart.setOption({
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
      max: 20,
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
          color: "#98BBFF",
        },
        formatter: function (name) {
          return name === "在建项目"
            ? name + "\n" + "{b|(滞后)}"
            : name === "完工项目"
              ? "完工项目"
              : name + "\n" + " {a|(滞后)}";
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
          { value: data2[0], name: lab[0], itemStyle: { color: "#3379FF" } },
          { value: data2[1], name: lab[1], itemStyle: { color: "#3379FF" } },
          {
            value: data2[2], name: lab[2],
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
              color: "#ffffff",
            },
            b: {
              fontSize: e,
              color: "#FF0059",
            },
            c: {
              fontSize: e,
              color: "#FF21D4",
            }
          },
        },
        data: [
          { value: 50 - data2[0], name: lab[0], itemStyle: { color: "#000000" } },
          { value: 50 - data2[1] - data1[0], name: lab[1], itemStyle: { color: "#000000" } },
          {
            value: 50 - data2[2] - data1[1], name: lab[2],
            itemStyle: { color: "#000000" },
          },
        ],
      },

    ],
  });
  window.addEventListener("resize", () => {
    context.barEchart.resize();
  });
}

export const drawLine = (context) => {
  const e = getFontSize();
  let data1, data2, lab;
  if (!!context.$data.ret) {
    data1 = parseFloat(context.$data.ret.speed.Completion);
    data2 = 100 - 1 - data1;
    console.log(data2);
    lab = context.$data.ret.project.plan;
  }
  context.lineEchart = context.$echarts.init(context.$refs.lineEchart);
  context.lineEchart.setOption({
    grid: {
      top: '10%',
      bottom: '35%',
      left: '20%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          textStyle: {
            fontSize: e,
          }
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: '',
      data: ['2020.1.1', '2020.2.1', '2020.6.1', '2020.8.1', '2020.9.1', '2020.10.1', '2020.11.1', '2020.12.1', '2021.1.1', '2021.3.1', '2021.4.1', '2021.6.1', '2022.3.1', '2022.7.1', '2022.9.1', '2021.10.1', '2021.12.1', '2022.10.1', '2022.12.1', '2023.9.1', '2023.12.1', '2024.3.1'],
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
        textStyle: {
          color: "#ffffff",
          fontFamily: 'DIN',
          fontSize: e
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
        textStyle: {
          fontFamily: 'DIN',
          color: "#ffffff",
          fontSize: e
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
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 30,
        xAxisIndex: [0],
        height: "10%",
        bottom: 0,
      },
    ],
    series: [{
      data: [3000, 19000, 150, 15144, 103200, 161250, 500, 24813.36, 194718, 7540, 20016, 133571, 7340, 50000, 67214, 1454, 928097, 5000, 408570, 171360, 176769, 240263],
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
  window.addEventListener("resize", () => {
    context.lineEchart.resize();
  });
}