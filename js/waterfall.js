'use strict';

var CHARTS = (function (chart) {
  var maxRate;
  var pointWidth = 19;
  var growingLabelWidth = 56;
  var hoverOpacity = 0.1;

  var colors = {
    barUp: '#55c398',
    barDown: '#e45641',
    barOutside: '#44b3c2',
    barBg: '#ecf0f7',
    gridLines: '#c3cad6',
    textUp: '#55c398',
    textDown: '#e45641',
    textOutside: '#888e95'
  };

  //
  // tmp - bottom label's value
  var tmp = 14;

  var interval;
  var maxRateInPixels;
  var gbWidthValue;

  chart.renderWaterfall = function (chartInfo, configInit) {
    var highchart;
    var config;
    var chartData;
    var data;
    chartData = chartInfo;
    config = configInit;

    if (config.colors) {
      colors = config.colors;
    }

    maxRate = config.maxRate;
    COMMON.watchOutsideColumns(chartData, colors);
    highchart = initWaterfall(chartData, config.container);
    maxRateInPixels = highchart.series[0].yAxis.toPixels(maxRate);
    gbWidthValue =  -growingLabelWidth / 2 + 'px';
    data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;
    COMMON.watchNegativeValues(data, colors);
    COMMON.correctLabelCenter(growingLabelWidth, config);
    highchart.series[1].redraw();
  }

  return chart;
  //
  // TODO: click on bar event
  function  clickOnBar() {
    console.log(this);
    alert('todo');
  }

  function initWaterfall(data, container) {
    var bgColumnArray = COMMON.prepareBgColumnsArray(data, maxRate);

    return new Highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'waterfall',
        className: 'waterfall',
        reflow: false,
        marginLeft: 10,
        marginRight: 10,
        spacingTop: 10,
        spacingBottom: 0
      },
      title: {
        text: ''
      },
      xAxis: {
        tickLength: 60,
        lineColor: 'transparent',
        type: 'category',
        labels: {
          step: 1,
          useHTML: true,
          formatter: function() {
            if (this.isFirst || this.isLast) {
              return '<div class="labels outside">' + this.value + '</div>';
            }
            if (tmp > 0) {
              return '<div class="labels">' + this.value + '<div class="growing plus">' + tmp + '%</div>' + '</div>';
            }
            else {
              return '<div class="labels">' + this.value + '<div class="growing minus">' + tmp + '%</div>' + '</div>';
            }
          }
        }
      },
      yAxis: {
        gridLineWidth: 0,
        maxPadding: 0,
        plotLines: [{
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
        }],
        labels: {
          enabled: false
        },
        title: {
          text: null
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
          cursor: 'pointer',
          point: {
            events: {
                click: clickOnBar
            }
          }
        },
        waterfall: {
          point: {
            events: {
              mouseOver: borderOnHover,
              mouseOut: borderOnHoverOut
            }
          }
        },
        column: {
          borderRadius: 5,
          point: {
            events: {
              mouseOver: borderOnHover,
              mouseOut: borderOnHoverOut
            }
          }
        }
      },
      series: [
        {
          name: 'background',
          className: 'column-background',
          type: 'column',
          color: colors.barBg,
          pointWidth: pointWidth,
          borderWidth: 0,
          data: bgColumnArray
        },
        {
          name: 'waterfall',
          upColor: colors.barUp,
          color: colors.barDown,
          pointWidth: pointWidth,
          borderWidth: 0,
          data: data,
          dataLabels: {
            enabled: true,
            inside: false,
            y: 7,
            style: {
              color: colors.textUp
            }
          }
        }
      ]
    });
  }

  function borderOnHover() {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var renderer = chart.renderer;
    var shape = this.shapeArgs;
    var xAxis = this.series.xAxis;
    var yAxis = this.series.yAxis;
    var x = this.plotX + chart.plotLeft - shape.width / 2;
    var y = maxRateInPixels;
    var strokeWidth = interval - shape.width;
    var height = chart.plotSizeY;
    var opacityCSS;
    var $lb = $(elementName).find('.growing');

    fillColumnBgWhite.call(this, this.index);

    if (chart.hoverStack) {
      chart.hoverStack.destroy()
    } else {
      chart.hoverStack = renderer.rect(x, y, shape.width, height).attr({
        'stroke-width': strokeWidth,
        'stroke': '#000',
        'opacity': hoverOpacity
      }).add();
    }

    if (this.index != 0 && this.index != $lb.length + 1) {
      opacityCSS = hoverOpacity  / 2;
      $lb[this.index - 1].style.borderTop = '30px solid rgba(0, 0, 0, opacityCSS)';
      $lb[this.index - 1].style.width =  interval + 'px';
      $lb[this.index - 1].style.marginLeft =  -growingLabelWidth / 2 - (interval - growingLabelWidth) / 2 + 'px';
    }

    function fillColumnBgWhite(index) {
      var chart = this.series.chart;
      var elementName = '#' + chart.container.id;
      var $bg = $(elementName).find('.highcharts-point');
      $bg[index].style.fill = "#fff";
    }
  }

  function borderOnHoverOut() {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $lb = $(elementName).find('.growing');

    if (this.series.chart.hoverStack) {
      this.series.chart.hoverStack.destroy();
      this.series.chart.hoverStack = false
    }

    cancelFillColumnBgWhite.call(this, this.index);

    if (this.index != 0 && this.index != $lb.length + 1) {
      $lb[this.index - 1].style.borderTop = 'none';
      $lb[this.index - 1].style.width = growingLabelWidth + 'px';
      $lb[this.index - 1].style.marginLeft = gbWidthValue;
    }

    function cancelFillColumnBgWhite(index) {
      var chart = this.series.chart;
      var elementName = '#' + chart.container.id;
      var $bg = $(elementName).find('.highcharts-point');
      $bg[index].style.fill = colors.barBg;
    }
  }
}(CHARTS || {}));
