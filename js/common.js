var COMMON = (function (common) {

  common.watchOutsideColumns = function (data, colors) {
    var labels = {
      style: {
        color: colors.textOutside
      }
    };

    data[data.length - 1].color = colors.barOutside;
    data[data.length - 1].dataLabels = {};
    data[data.length - 1].dataLabels = labels;
    data[0].color = colors.barOutside;
    data[0].dataLabels = labels;
  }

  common.watchNegativeValues = function (data, colors) {
    data.forEach(function(item, i, arr) {
      if (item.y < 0) {
        item.update({
          dataLabels: {
            inside: true,
            verticalAlign: 'bottom',
            y: 24,
            color: colors.textDown
          }
        }, false);
      }
    });
  }

  common.drawBordersPlot = function (config, highchart, spacing, interval) {
    var elementName = '#' + config.container;
    var chart = highchart.series[1].chart;
    var dataLength = highchart.series[1].data.length;
    var dividerPosition = config.dividerPosition;
    var rightRectLength = dataLength - dividerPosition;
    var dividerSpace = 12;
    var colors = config.colors;
    var width = chart.plotWidth;
    var height = chart.plotHeight + spacing * 2;
    var leftRectWidth = interval * dividerPosition + dividerSpace / 4;
    var rightRectWidth = interval * rightRectLength + dividerSpace / 4;
    var borderRadius = 3;
    var xStart = 1;
    var yStart = 1;

    var rectLeft = buildRectPath(xStart, yStart, leftRectWidth, height, borderRadius, 0, 0, borderRadius);
    var rectRight = buildRectPath(leftRectWidth + dividerSpace, yStart, rightRectWidth, height, 0, borderRadius, borderRadius, 0);

    var renderer = chart.renderer;

    renderer.path(rectLeft).attr({
      'stroke-width': 2,
      'stroke': colors.leftBorder
    }).add();

    renderer.path(rectRight).attr({
      'stroke-width': 2,
      'stroke': colors.rightBorder
    }).add();


    var $area = $(elementName).find('.highcharts-root');
    $('<div class="border-label left">' + config.leftLabel + '</div>').insertBefore($area)
    $('<div class="border-label right">' + config.rightLabel + '</div>').insertBefore($area)
    $(elementName).find('.border-label.left').css('backgroundColor', colors.leftBorder);
    $(elementName).find('.border-label.right').css('backgroundColor', colors.rightBorder);
  }

  common.drawBordersChart = function (config, highchart, spacing, interval) {
    var elementName = '#' + config.container;
    var chart = highchart.series[1].chart;
    var dataLength = highchart.series[1].data.length;
    var colors = config.colors;
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

    var renderer = chart.renderer;

    var rectLeft = buildRectPath(xStart, yStart, leftRectWidth, height, borderRadius, 0, 0, borderRadius);
    var rectRight = buildRectPath(leftRectWidth + dividerSpace, yStart, rightRectWidth, height, 0, borderRadius, borderRadius, 0);

    renderer.path(rectLeft).attr({
      'stroke-width': 2,
      'stroke': colors.leftBorder
    }).add();

    renderer.path(rectRight).attr({
      'stroke-width': 2,
      'stroke': colors.rightBorder
    }).add();


    var $area = $(elementName).find('.highcharts-root');
    $('<div class="border-label left">' + config.leftLabel + '</div>').insertBefore($area);
    $('<div class="border-label right">' + config.rightLabel + '</div>').insertBefore($area);
    $(elementName).find('.border-label.left').css('backgroundColor', colors.leftBorder);
    $(elementName).find('.border-label.right').css('backgroundColor', colors.rightBorder);
  }

  common.findByName = function (array, name) {
    var answer;
    array.forEach(function (item, index, arr) {
      if (arr[index].name === name && arr[index + 1]) {
        return  answer = {
          current: arr[index].y,
          next: arr[index + 1].y
        };
      }
    });
    return answer;
  }

  common.setArrowBg = function (config) {
    var elementName = '#' + config.container;
    var $arrows = $(elementName).find('.arrow').find('.after');
    $arrows.css("border-right-color", config.colors.bar);
    $arrows.css("border-top-color", config.colors.bar);
  }

  common.setArrowBgOnOver = function () {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $arrows = $(elementName).find('.arrow').find('.after');
    var color = hexToRgb(this.series.color);
    increaseColor(color, 25);
    color = rgbToHex(color.r, color.g, color.b);
    $arrows[this.index].style.borderRightColor = color;
    $arrows[this.index].style.borderTopColor = color;
  }

  common.setArrowBgOnOut = function () {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $arrows = $(elementName).find('.arrow').find('.after');
    $arrows[this.index].style.borderRightColor = this.series.color;
    $arrows[this.index].style.borderTopColor = this.series.color;
  }

  common.correctLabelsPos = function (growingButtonWidth, interval, config) {
    var elementName = '#' + config.container;
    var gbWidthValue = growingButtonWidth + 'px';
    var $labels = $(elementName).find('.growing');
    var position = (interval / 2) - (growingButtonWidth / 4);
    $labels.css("left", position);
    $labels.css('width', gbWidthValue);
  }

  common.correctLabelCenter = function (growingButtonWidth, config) {
    var elementName = '#' + config.container;
    var gbWidthValue = growingButtonWidth + 'px';
    var $labels = $(elementName).find('.growing');
    var position = -growingButtonWidth / 2 + 'px';
    $labels.css("marginLeft", position);
    $labels.css('width', gbWidthValue);
  }

  common.drawBackgroundGradient = function (chart, config) {
    var elementName = '#' + config.container;
    var gradient = {
      linearGradient: [0, 0, 0, 300],
      stops: [
        [0, Highcharts.Color(config.colors.bar).setOpacity(0.25).get('rgba')],
        [0.6, Highcharts.Color(config.colors.bar).setOpacity(0).get('rgba')],
        [1, Highcharts.Color(config.colors.bar).setOpacity(0).get('rgba')]
      ]
    };
    var $bg = $(elementName).find('.highcharts-background');

    chart.chartBackground.attr({
      fill: gradient
    });
  }

  common.prepareBgColumnsArray = function (data, maxRate) {
    var bgColumns = [];
    var maxRate = maxRate;

    data.forEach(function () {
      bgColumns.push(maxRate);
    });
    return bgColumns;
  }

  common.prepareBgColumnsArrayDelta = function (data, maxRate) {
    var bgColumns = [];

      data.forEach(function(item) {
        bgColumns.push(maxRate - item.y);
      });
    return bgColumns;
  }

  common.prepareBgColumnsArrayWithNegative = function (data, maxRate) {
    var bgColumnsPositive = [];
    var bgColumnsNegative = [];
    var bgColumns = {
      positive: bgColumnsPositive,
      negative: bgColumnsNegative
    };

    data.forEach(function (item) {
      if (item.y > 0) {
        bgColumnsPositive.push(maxRate - item.y);
        bgColumnsNegative.push(-maxRate);
      } else {
        bgColumnsPositive.push(maxRate);
        bgColumnsNegative.push(-maxRate - item.y);
      }
    });
    return bgColumns;
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

    return hex.length === 1 ? "0" + hex : hex;
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
    //
    // d - SVG Path attr
    var d;
    return d = [
      'M',
        xStart + rTopLeft,
        yStart,
      'L',
        xStart + width - rTopRight,
        yStart,
      'C',
        xStart + width - rTopRight / 2,
        yStart, xStart + width,
        yStart + rTopRight / 2,
        xStart + width,
        yStart + rTopRight,
      'L',
        xStart + width,
        yStart + height - rBottomRight,
      'C',
        xStart + width,
        yStart + height - rBottomRight / 2,
        xStart + width - rBottomRight / 2,
        yStart + height,
        xStart + width - rBottomRight,
        yStart + height,
      'L',
        xStart + rBottomLeft,
        yStart + height,
      'C',
        xStart + rBottomLeft / 2,
        yStart + height,
        xStart,
        yStart + height - rBottomLeft / 2,
        xStart,
        yStart + height - rBottomLeft,
      'L',
        xStart,
        yStart + rTopLeft,
      'C',
        xStart,
        yStart + rTopLeft / 2,
        xStart + rTopLeft / 2,
        yStart,
        xStart + rTopLeft,
        yStart,
      'Z'
    ];
  }
  return common;
}(COMMON || {}));