
var renderWideGistogramTo;
$(function () {
  'use strict';

  var maxRate = 10;
  var pointWidth = 19;
  var spacing = 20;
  var bgColumns = [];
  var config = {};
  //
  // tmp - bottom label's value
  var tmp;
  var highchart;
  var growingButtonWidth = 56;
  var data;
  var interval;
  var chartData;
  var dataLength;
  var colors = [];



  renderWideGistogramTo = function (chartInfo, configInfo) {
    chartData = chartInfo;
    dataLength = chartData.length;
    config = configInfo
    colors = config.color;
    highchart = initGistogram(chartData, config.container);
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    //drawHeader(config, highchart.chartWidth);
    drawBackground(highchart);
    drawBorders(config, highchart);
    correctLabelsPos();

  }

  function initGistogram(data, container) {
    fillBgColumnsArray();
    return new Highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'column',
        className: 'gistogram-divider',
        marginLeft: 10,
        marginRight: 10,
        spacingTop: spacing,
        spacingBottom: spacing
      },
      title: {
          text: ''
      },
      xAxis: {
        tickLength: 30,
        lineColor: 'transparent',
        type: 'category',
        labels: {
          step: 1,
          useHTML: true,
          formatter: function() {
            var labelValue = this.value;
            var oldValue;
            var newValue;

            if(this.isLast) {
              return '<div class="labels">' + this.value + '</div>';
            } else {
              var pointValue = findByName(chartData, this.value);
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
        maxPadding: 0,
        plotLines: [{
          value: maxRate,
          color: colors[1],
          dashStyle: 'dot',
          width: 1
        },{
          value: maxRate / 2,
          color: colors[1],
          dashStyle: 'dot',
          width: 1,
        },{
          value: 0,
          color: colors[1],
          dashStyle: 'dot',
          width: 1,
        }],
        labels: {
          enabled: false
        }
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
          stacking: 'normal'
        }
      },
      series: [{
          name: 'background',
          className: 'column-background',
          type: 'column',
          states: {
            hover: {
              enabled: false
            }
          },
          color: colors[2],
          pointWidth: pointWidth,
          borderRadiusTopRight: 5,
          borderRadiusTopLeft: 5,
          borderWidth: 0,
          data: bgColumns
        }, {
          name: 'columns',
          type: 'column',
          color: colors[3],
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
      if(array[i].name == name && array[i + 1]) {
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
    var value = "path('M 0 0 L 0 " + height + " L " +width + " " + height + " L " + width+ " 0 L 0 0')";
    $bg.css("d", value);
  }

  // create header
  function drawHeader(config, width) {
    var $bg = 0;
    var $head = 0;
    var elementName = '#' + config.container;
    var headerType = '.' + config.type;
    var headerText = config.headerText;
    var width = width;
    $bg = $(elementName).find('.gistogram-divider');
    $('<div class="header" style="width: ' + width + 'px;"></div>').insertBefore($bg)
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


  function drawBorders(config, highchart) {
    var elementName = '#' + config.container;
    var chart = highchart.series[1].chart;
    var dataLength = highchart.series[1].data.length;
    var dividerPosition = config.dividerPosition;
    var rightRectLength = dataLength - dividerPosition;
    var dividerSpace = 12;
    var width = chart.plotWidth;
    var height = chart.plotHeight + spacing * 2;
    var leftRectWidth = interval * dividerPosition + dividerSpace / 4;
    var rightRectWidth = interval * rightRectLength + dividerSpace / 4;
    var borderRadius = 3;
    var xStart = 1;
    var yStart = 1;

    var rectLeft = buildRectPath(xStart, yStart, leftRectWidth, height, borderRadius, 0, 0, borderRadius);
    var rectRight = buildRectPath(leftRectWidth + dividerSpace, yStart, rightRectWidth, height, 0, borderRadius, borderRadius, 0);

    var r = chart.renderer;

    r.path(rectLeft).attr({
        'stroke-width': 2,
        'stroke': colors[4]
    }).add();

    r.path(rectRight).attr({
        'stroke-width': 2,
        'stroke': colors[5]
    }).add();


    var $area = $(elementName).find('.highcharts-root');
    $('<div class="border-label left">' + config.leftLabel + '</div>').insertBefore($area)
    $('<div class="border-label right">' + config.rightLabel + '</div>').insertBefore($area)
    $(elementName).find('.border-label.left').css('backgroundColor', colors[4]);
    $(elementName).find('.border-label.right').css('backgroundColor', colors[5]);
  }

  function buildRectPath(xStart, yStart ,width, height, rTopLeft, rTopRight, rBottomRight, rBottomLeft) {
    var d;
    return d = [
      'M', xStart + rTopLeft, yStart,
      'L', xStart + width - rTopRight, yStart,
      'C', xStart + width - rTopRight / 2, yStart, xStart + width, yStart + rTopRight / 2, xStart + width, yStart + rTopRight,
      'L', xStart + width, yStart + height - rBottomRight,
      'C', xStart + width, yStart + height - rBottomRight / 2, xStart + width - rBottomRight / 2, yStart + height, xStart + width - rBottomRight, yStart + height,
      'L', xStart + rBottomLeft, yStart + height,
      'C', xStart + rBottomLeft / 2, yStart + height, xStart, yStart + height - rBottomLeft / 2, xStart, yStart + height - rBottomLeft,
      'L', xStart, yStart + rTopLeft,
      'C', xStart, yStart + rTopLeft / 2, xStart + rTopLeft / 2, yStart, xStart + rTopLeft, yStart,
      'Z'
    ];
  }


}());
