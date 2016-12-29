
var renderWideArrowedGistogramTo;
$(function () {
  'use strict';

  var maxRate = 14;
  var pointWidth = 19;
  var spacing = 20;
  var bgColumns = [];
  var bgColumnsMinus = [];
  var tmp = 14;
  var highchart;
  var growingButtonWidth = 56;
  var data;
  var interval;
  var labelIterator = 0;
  var chartData;
  var dataLength;
  var colors = [];
  var config = {};


  renderWideArrowedGistogramTo = function (chartInfo, configInfo) {
    chartData = chartInfo;
    dataLength = chartData.length;
    config = configInfo;
    colors = config.color;
    highchart = initGistogram(chartData, config.container);
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    //drawHeader(config, highchart.chartWidth);
    drawBackground(highchart);
    drawBorders(config, highchart);
    correctLabelsPos();
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
          color: colors[1],
          dashStyle: 'dot',
          width: 1
        },{
          value: 0,
          color: colors[1],
          dashStyle: 'dot',
          width: 1,
        },{
          value: -50,
          color: colors[1],
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
          color: colors[2],
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
          color: colors[2],
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
          color: colors[3],
          pointWidth: pointWidth,
          borderWidth: 0,
          data: data,
          dataLabels: {
            enabled: true,
            inside: false,
            style: {
              color: colors[0]
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
      if(chartData[i].y > 0) {
        bgColumns.push(maxRate - chartData[i].y);
        bgColumnsMinus.push(-maxRate);
      } else {
        bgColumns.push(maxRate);
        bgColumnsMinus.push(-maxRate - chartData[i].y);
      }
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
    $bg = $(elementName).find(elementName);
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

function setArrowsBg(config) {
    var elementName = '#' + config.container;
    var $arrows = $(elementName).find('.arrow').find('.after');
    $arrows.css("border-right-color", colors[3]);
    $arrows.css("border-top-color", colors[3]);
  }

  function setArrowBgOnOver() {
    //
    // delteColors - difference between static and hovered column in RGB;
    var deltaColors = 25;
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $arrows = $(elementName).find('.after');
    var color = hexToRgb(this.series.color);

    increaseColor(color, deltaColors);
    color = rgbToHex(color.r, color.g, color.b);
    $arrows[this.index].style.borderRightColor = color;
    $arrows[this.index].style.borderTopColor = color;
  }
  function setArrowBgOnOut() {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $arrows = $(elementName).find('.arrow').find('.after');
    $arrows[this.index].style.borderRightColor = this.series.color;
    $arrows[this.index].style.borderTopColor = this.series.color;

  }

  function drawBorders(config, highchart) {
    var elementName = '#' + config.container;
    var chart = highchart.series[1].chart;
    var dataLength = highchart.series[1].data.length;
    var dividerPosition = config.dividerPosition;
    var rightRectLength = dataLength - dividerPosition;
    var dividerSpace = 12;
    //
    //2 - borderWidth
    var height = chart.chartHeight - 2;
    var leftRectWidth = interval * dividerPosition + dividerSpace / 4;
    var rightRectWidth = interval * rightRectLength + dividerSpace / 4;
    var borderRadius = 3;
    var xStart = 1;
    var yStart = 1;

    var r = chart.renderer;

    var rectLeft = buildRectPath(xStart, yStart, leftRectWidth, height, borderRadius, 0, 0, borderRadius);
    var rectRight = buildRectPath(leftRectWidth + dividerSpace, yStart, rightRectWidth, height, 0, borderRadius, borderRadius, 0);

    r.path(rectLeft).attr({
        'stroke-width': 2,
        'stroke': colors[4]
    }).add();

    r.path(rectRight).attr({
        'stroke-width': 2,
        'stroke': colors[5]
    }).add();


    var $area = $(elementName).find('.highcharts-root');
    $('<div class="border-label left">' + config.leftLabel + '</div>').insertBefore($area);
    $('<div class="border-label right">' + config.rightLabel + '</div>').insertBefore($area);
    $(elementName).find('.border-label.left').css('backgroundColor', colors[4]);
    $(elementName).find('.border-label.right').css('backgroundColor', colors[5]);
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function increaseColor(color, coeff) {
    if (color.r + coeff > 255) color.r = 255;
    else color.r = color.r + coeff;
    if (color.g + coeff > 255) color.g = 255;
    else color.g = color.g + coeff;
    if (color.b + coeff > 255) color.b = 255;
    else color.b = color.b + coeff;
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
