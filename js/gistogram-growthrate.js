var CHARTS = (function (chart) {
  'use strict';

  var maxRate;
  var pointWidth = 19;
  var growingLabelWidth = 56;

  var interval;

  chart.renderGistogramGrowthrate = function (chartInfo, configInfo) {
    var config = configInfo;
    var chartData = chartInfo;
    var colors = config.colors;
    maxRate = config.maxRate;
    var highchart = initGistogram(chartData, config, colors);
    var data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;

    //drawHeader(config, highchart.chartWidth);
    COMMON.drawBackgroundGradient(highchart, config);
    COMMON.correctLabelsPos(growingLabelWidth, interval, config);
    COMMON.setArrowBg(config);
  }

  return chart;

  function initGistogram(data, config, colors) {
    var bgColumnArray = COMMON.prepareBgColumnsArrayWithNegative(data, maxRate);

    return new Highcharts.Chart({
      chart: {
        renderTo: config.container,
        type: 'column',
        className: 'gistogram-growthrate',
        marginLeft: 0,
        marginRight: 0,
        spacingTop: 20,
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
          style: {
            color: colors.bar
          },
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
          text: null
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
        column: {
          stacking: 'percent'
        }
      },
      series: [
        {
          name: 'backgroundPositive',
          className: 'column-background',
          type: 'column',
          color: '#fff',
          pointWidth: pointWidth,
          borderRadiusTopRight: 5,
          borderRadiusTopLeft: 5,
          borderWidth: 0,
          data: bgColumnArray.positive
        }, {
          name: 'backgroundNegative',
          className: 'column-background',
          type: 'column',
          color: '#fff',
          pointWidth: pointWidth,
          borderRadiusBottomRight: 5,
          borderRadiusBottomLeft: 5,
          borderWidth: 0,
          data: bgColumnArray.negative
        }, {
          name: 'columns',
          type: 'column',
          point: {
            events: {
              mouseOver: COMMON.setArrowBgOnOver,
              mouseOut: COMMON.setArrowBgOnOut
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
              if (this.y > 0) {
                return '<span class="top arrow"><span class="label">+' + this.y + '%</span><span class="after"></span></span>'
              } if (this.y < 0) {
                return '<span class="bottom arrow"><span class="label">' + this.y + '%</span><span class="after"></span></span>'
              }
            }
          }
        }
      ]
    });
  }

  function drawHeader(config, width) {
    var forAppending;
    var elementName = '#' + config.container;
    var headerType = '.' + config.type;
    var headerText = config.headerText;
    var width = width;
    var $bg = $(elementName).find('.gistogram-growthrate');
    var $head;

    $('<div class="header" style="width: ' + width + 'px;"></div>').insertBefore($bg)
    $head = $(elementName).find('.header');
    forAppending = '<span class="icon"></span>' +
      '<span class="text">' + headerText + '</span>' +
      '<span class="corner"></span>';
    $head.append(forAppending);
  }
}(CHARTS || {}));
