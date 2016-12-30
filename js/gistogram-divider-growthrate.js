
var renderGistogramDividerGrowthrate;
$(function () {
  'use strict';

  var maxRate;
  var pointWidth = 19;
  var spacing = 20;
  var growingButtonWidth = 56;

  var highchart;
  var config;
  var colors;
  var chartData;
  var data;
  var dataLength;
  var interval;
  var bgColumns;
  var bgColumnsMinus;

  renderGistogramDividerGrowthrate = function (chartInfo, configInfo) {
    chartData = chartInfo;
    dataLength = chartData.length;
    config = configInfo;
    colors = config.colors;
    maxRate = config.maxRate;
    highchart = initGistogram(chartData, config.container);
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    drawBordersChart(config, highchart, spacing, interval);
    correctLabelsPos(growingButtonWidth, interval, config);
    setArrowsBg(config);
  }

  function initGistogram(data, container) {
    fillBgColumnsArray();
    return new Highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'column',
        className: 'gistogram-divider-growthrate',
        marginLeft: 10,
        marginRight: 10,
        spacingTop: spacing,
        spacingBottom: spacing
      },
      title: {
          text: ''
      },
      xAxis: {
        tickLength: 0,
        lineColor: 'transparent',
        type: 'category',
        labels: {
          step: 1,
          useHTML: true,
          formatter: function() {
            return '<div class="labels">' + this.value + '</div>';
          }
        }
      },
      yAxis: {
        gridLineWidth: 0,
        plotLines: [{
          value: 50,
          color: colors.gridLines,
          dashStyle: 'dot',
          width: 1
        },{
          value: 0,
          color: colors.gridLines,
          dashStyle: 'dot',
          width: 1,
        },{
          value: -50,
          color: colors.gridLines,
          dashStyle: 'dot',
          width: 1,
        }],
        labels: {
          enabled: false
        },
        title: {
          text: ''
        },
      },
      legend: {
          enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        series: {

        },
        column: {
          stacking: 'percent'
        }
      },
      series: [{
          name: 'backgroundPlus',
          className: 'column-background',
          type: 'column',
          states: {
            hover: {
              enabled: false
            }
          },
          color: colors.barBg,
          pointWidth: pointWidth,
          borderRadiusTopRight: 5,
          borderRadiusTopLeft: 5,
          borderWidth: 0,
          data: bgColumns
        }, {
          name: 'backgroundMinus',
          className: 'column-background',
          type: 'column',
          states: {
            hover: {
              enabled: false
            }
          },
          color: colors.barBg,
          pointWidth: pointWidth,
          borderRadiusBottomRight: 5,
          borderRadiusBottomLeft: 5,
          borderWidth: 0,
          data: bgColumnsMinus
        }, {
          name: 'columns',
          type: 'column',
          point: {
            events: {
              mouseOver: setArrowBgOnOver,
              mouseOut: setArrowBgOnOut
            }
          },
          color: colors.bar,
          pointWidth: pointWidth,
          borderWidth: 0,
          data: data,
          dataLabels: {
            enabled: true,
            inside: false,
            style: {
              color: colors.text
            },
            useHTML: true,
            formatter: function() {
              if(this.y > 0) {
                return '<span class="top arrow"><span class="label">+' + this.y + '%</span><span class="after"></span></span>'
              } if(this.y < 0) {
                return '<span class="bottom arrow"><span class="label">' + this.y + '%</span><span class="after"></span></span>'
              }
            }
          }
        }
      ]
    });
  }

  function fillBgColumnsArray() {
    bgColumns = [];
    bgColumnsMinus = [];
    for (var i = 0; i < chartData.length; i += 1) {
      if (chartData[i].y > 0) {
        bgColumns.push(maxRate - chartData[i].y);
        bgColumnsMinus.push(-maxRate);
      } else {
        bgColumns.push(maxRate);
        bgColumnsMinus.push(-maxRate - chartData[i].y);
      }
    }
  }
}());
