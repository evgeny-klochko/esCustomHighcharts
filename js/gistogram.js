
var renderGistogramTo;
$(function () {
  'use strict';

  var maxRate = 10;
  var pointWidth = 19;
  var spacing = 20;
  var bgColumns = [];
  var tmp = 14;
  var highchart;
  var growingButtonWidth = 56;
  var data;
  var maxRateInPixels;
  var gbWidthValue;
  var interval;
  var labelIterator = 0;
  var chartData;
  var dataLength;
  var type;
  var colors = [];
  var config = {};

  renderGistogramTo = function (chartInfo, configInfo) {
    chartData = chartInfo;
    dataLength = chartData.length;
    colors = configInfo.color;
    config = configInfo;
    highchart = initGistogram(chartData, config.container);
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    drawHeader(config, highchart.chartWidth);
    drawBackground(highchart);
    correctLabelsPos();
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

            if(this.isLast) {
              return '<div class="labels">' + this.value + '</div>';
            } else {
              pointValue = findByName(chartData, this.value);
              if(pointValue) {
                oldValue = pointValue.current;
                newValue = pointValue.next;
                tmp = Math.round((newValue - oldValue) / oldValue * 100);
              }
              if (tmp > 0) {
                return '<div class="labels">' + this.value + '<div class="growing plus">' + tmp + '%</div>' + '</div>';
              } else {
                return '<div class="labels">' + this.value + '<div class="growing minus">' + tmp + '%</div>' + '</div>';
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
            color: colors[1],
            dashStyle: 'dot',
            width: 1
          }, {
            value: maxRate / 2,
            color: colors[1],
            dashStyle: 'dot',
            width: 1,
          }, {
            value: 0,
            color: colors[1],
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
                  [0, Highcharts.Color(colors[2]).setOpacity(0.25).get('rgba')],
                  [0.6, Highcharts.Color(colors[2]).setOpacity(0).get('rgba')],
                  [1, Highcharts.Color(colors[2]).setOpacity(0).get('rgba')]
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
          color: colors[2],
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
              color: colors[0]
            }
          }
        }
      ]
    });
  }

  function findByName(array, name) {
    for (var i = 0; i < array.length; i++) {
      if(array[i].name === name && array[i + 1]) {

        return {
          current: array[i].y,
          next: array[i + 1].y
        };
      }
    }
  }

  function fillBgColumnsArray() {
    bgColumns = [];
      for (var i = 0; i < chartData.length; i += 1) {
        bgColumns.push(maxRate - chartData[i].y);
      }
  }

  function drawBackground(chart) {
    var elementName = '#' + config.container;
    var highchart = chart;
    var width = highchart.chartWidth;
    var begin = 0;
    var height = highchart.plotHeight;
    var $bg = $(elementName).find('.highcharts-area');
    var value = "path('M 0 " + width + " L 0 " + height + " L " + width + " " + height + " L " + width+ " 0 L 0 0')";
    $bg.css("d", value);
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

  function correctLabelsPos() {
    var elementName = '#' + config.container;
    var $labels = $(elementName).find('.growing');
    var position = (interval / 2) - (growingButtonWidth / 4);
    $labels.css("left", position);
  }


}());
