
var renderGistogram;
$(function () {
  'use strict';

  var maxRate;
  var pointWidth = 19;
  var growingButtonWidth = 56;
  var bgColumns = [];

  var highchart;
  var config;
  var colors;
  var chartData;
  var data;
  var dataLength;
  var interval;


  renderGistogram = function (chartInfo, configInfo) {
    chartData = chartInfo;
    dataLength = chartData.length;
    config = configInfo;
    colors = config.colors;
    maxRate = config.maxRate;
    highchart = initGistogram(chartData, config.container);
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    drawHeader(config, highchart.chartWidth);
    drawBackground(highchart, config);
    correctLabelsPos(growingButtonWidth, interval, config);
  }

  function initGistogram(data, container) {
    fillBgColumnsArray();
    return new Highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'column',
        className: 'gistogram',
        marginLeft: 0,
        marginRight: 0,
        spacingTop: -20,
        spacingBottom: 20
      },
      title: {

          text: ''
      },
      xAxis: {
        tickLength: 35,
        lineColor: 'transparent',
        type: 'category',
        labels: {
          step: 1,
          useHTML: true,
          formatter: function() {
            var labelValue = this.value;
            var oldValue;
            var newValue;
            var pointValue;
            var growth;

            if(this.isLast) {
              return '<div class="labels">' + this.value + '</div>';
            } else {
              pointValue = findByName(chartData, this.value);
              if (pointValue) {
                oldValue = pointValue.current;
                newValue = pointValue.next;
                growth = Math.round((newValue - oldValue) / oldValue * 100);
              }
              if (growth > 0) {
                return '<div class="labels">' + this.value + '<div class="growing plus">' + growth + '%</div>' + '</div>';
              } else {
                return '<div class="labels">' + this.value + '<div class="growing minus">' + growth + '%</div>' + '</div>';
              }
            }
          }
        }
      },
      yAxis: {
        gridLineWidth: 0,
        plotLines: [
          {
            value: maxRate,
            color: colors.gridLines,
            dashStyle: 'dot',
            width: 1
          }, {
            value: maxRate / 2,
            color: colors.gridLines,
            dashStyle: 'dot',
            width: 1,
          }, {
            value: 0,
            color: colors.gridLines,
            dashStyle: 'dot',
            width: 1,
          }
        ],
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
          stacking: 'normal'
        }
      },
      series: [
        {
          type: 'areaspline',
          data: bgColumns
        }, {
          name: 'background',
          className: 'column-background',
          type: 'column',
          color: '#fff',
          pointWidth: pointWidth,
          borderRadiusTopRight: 5,
          borderRadiusTopLeft: 5,
          borderWidth: 0,
          data: bgColumns
        }, {
          name: 'columns',
          type: 'column',
          color: colors.bar,
          pointWidth: pointWidth,
          borderWidth: 0,
          borderRadiusBottomRight: 5,
          borderRadiusBottomLeft: 5,
          data: data,
          dataLabels: {
            enabled: true,
            inside: false,
            y: 7,
            style: {
              color: colors.text
            }
          }
        }
      ]
    });
  }

  function fillBgColumnsArray() {
    bgColumns = [];
      for (var i = 0; i < chartData.length; i += 1) {
        bgColumns.push(maxRate - chartData[i].y);
      }
  }

  function drawHeader(config, width) {
    var $bg;
    var $head;
    var elementName = '#' + config.container;
    var headerType = '.' + config.type;
    var headerText = config.headerText;
    var width = width;
    $bg = $(elementName).find('.gistogram');
    $('<div class="header" style="width: ' + width + 'px;"></div>').insertBefore($bg);
    $head = $(elementName).find('.header');
    $head.append('<span class="icon"></span>');
    $head.append('<span class="text">' + headerText + '</span>');
    $head.append('<span class="corner"></span>');
  }
}());
