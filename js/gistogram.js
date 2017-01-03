var CHARTS = (function (chart) {
  'use strict';

  var maxRate;
  var pointWidth = 19;
  var growingLabelWidth = 56;

  var interval;


  chart.renderGistogram = function (chartInfo, configInfo) {
    var config = configInfo;
    var chartData = chartInfo;
    var colors = config.colors;
    maxRate = config.maxRate;
    var highchart = initGistogram(chartData, config.container, colors);
    var data = highchart.series[1].data;

    interval = data[1].clientX - data[0].clientX;
    drawHeader(config, highchart.chartWidth);
    COMMON.drawBackgroundGradient(highchart, config);
    COMMON.correctLabelsPos(growingLabelWidth, interval, config);
  }

  return chart;

  function initGistogram(data, container, colors) {
    var bgColumnArray = COMMON.prepareBgColumnsArrayDelta(data, maxRate);


    return new Highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'column',
        className: 'gistogram',
        marginLeft: 0,
        marginRight: 0,
        spacingTop: 20,
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
              pointValue = COMMON.findByName(data, this.value);
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
        maxPadding: 0,
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
        column: {
          stacking: 'normal'
        }
      },
      series: [
        {
          name: 'background',
          className: 'column-background',
          type: 'column',
          color: '#fff',
          pointWidth: pointWidth,
          borderRadiusTopRight: 5,
          borderRadiusTopLeft: 5,
          borderWidth: 0,
          data: bgColumnArray
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

  function drawHeader(config, width) {
    var forAppending;
    var elementName = '#' + config.container;
    var headerType = '.' + config.type;
    var headerText = config.headerText;
    var width = width;
    var $bg = $(elementName).find('.gistogram');
    var $head;
    $('<div class="header" style="width: ' + width + 'px;"></div>').insertBefore($bg);
    $head = $(elementName).find('.header');
    forAppending = '<span class="icon"></span>' +
      '<span class="text">' + headerText + '</span>' +
      '<span class="corner"></span>';
    $head.append(forAppending);
  }
}(CHARTS || {}));
