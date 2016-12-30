var renderGistogramGrowthrate;
$(function () {
  'use strict';

  var maxRate = 100; //const
  var pointWidth = 19;
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

  renderGistogramGrowthrate = function (chartInfo, configInfo) {
    chartData = chartInfo;
    config = configInfo;
    dataLength = chartData.length;
    colors = config.colors;
    highchart = initGistogram(chartData, config);
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    drawHeader(config, highchart.chartWidth);
    drawBackground(highchart, config);
    correctLabelsPos(growingButtonWidth, interval, config);
    setArrowsBg(config);
  }

  function initGistogram(data, config) {
    fillBgColumnsArray();

    return new Highcharts.Chart({
      chart: {
        renderTo: config.container,
        type: 'column',
        className: 'gistogram-growthrate',
        marginLeft: 0,
        marginRight: 0,
        spacingTop: -20,
        spacingBottom: 20
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
        series: {
          fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                [0, Highcharts.Color(colors.bar).setOpacity(0.25).get('rgba')],
                [0.6, Highcharts.Color(colors.bar).setOpacity(0).get('rgba')],
                [1, Highcharts.Color(colors.bar).setOpacity(0).get('rgba')]
              ]
          }
        },
        column: {
          groupPadding: 30,
          stacking: 'percent'
        }
      },
      series: [
        {
          type: 'areaspline',
          data: bgColumns
        }, {
          name: 'backgroundPlus',
          className: 'column-background',
          type: 'column',
          color: '#fff',
          pointWidth: pointWidth,
          borderRadiusTopRight: 5,
          borderRadiusTopLeft: 5,
          borderWidth: 0,
          data: bgColumns
        }, {
          name: 'backgroundMinus',
          className: 'column-background',
          type: 'column',
          color: '#fff',
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

  function drawHeader(config, width) {
    var $bg = 0;
    var $head = 0;
    var elementName = '#' + config.container;
    var headerType = '.' + config.type;
    var headerText = config.headerText;
    var width = width;
    $bg = $(elementName).find('.gistogram-growthrate');
    $('<div class="header" style="width: ' + width + 'px;"></div>').insertBefore($bg)
    $head = $(elementName).find('.header');
    $head.append('<span class="icon"></span>');
    $head.append('<span class="text">' + headerText + '</span>');
    $head.append('<span class="corner"></span>');
  }
}());
