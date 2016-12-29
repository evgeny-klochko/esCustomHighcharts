var renderGistogramGrowthrateTo;
$(function () {
  'use strict';

  var maxRate = 100;
  var pointWidth = 19;
  var bgColumns = [];
  var bgColumnsMinus = [];
  var colors = [];
  var config = {};
  var highchart;
  var growingButtonWidth = 56;
  var data;
  var interval;
  var chartData;
  var dataLength;

  renderGistogramGrowthrateTo = function (chartInfo, config) {
    chartData = chartInfo;
    config = new Object(config);
    dataLength = chartData.length;
    colors = config.color;
    highchart = initGistogram(chartData, config);
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    drawHeader(config, highchart.chartWidth);
    drawBackground(highchart);
    correctLabelsPos();
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
          color: colors[2],
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

  function setArrowsBg(config) {
    var elementName = '#' + config.container;
    var $arrows = $(elementName).find('.arrow').find('.after');
    $arrows.css("border-right-color", colors[2]);
    $arrows.css("border-top-color", colors[2]);
  }

  function setArrowBgOnOver() {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $arrows = $(elementName).find('.arrow').find('.after');
    var color = hexToRgb(this.series.color);
    increaseColor(color, 25);
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

  function drawBackground(chart) {
    var highchart = chart;
    var width = highchart.chartWidth;
    var begin = 0;
    var height = highchart.plotHeight;
    var $bg = $('.gistogram-growthrate').find('.highcharts-area');
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
    $bg = $(elementName).find('.gistogram-growthrate');
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
}());
