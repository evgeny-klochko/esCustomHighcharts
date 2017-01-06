var CHARTS = (function (chart) {
  'use strict';

  var maxRate;
  var pointWidth = 19;
  var spacing = 20;
  var growingLabelWidth = 56;

  var interval;

  chart.renderGistogramDivider = function (chartInfo, configInfo) {
    var config = configInfo;
    var chartData = chartInfo;
    var colors = config.colors;
    maxRate = config.maxRate;
    var highchart = initGistogram(chartData, config.container, colors);
    var data = highchart.series[1].data;
    interval = data[1].clientX - data[0].clientX;

    COMMON.drawBordersPlot(config, highchart, spacing, interval);
    COMMON.correctLabelsPos(growingLabelWidth, interval, config);

  }
  return chart;

  function initGistogram(data, container, colors) {
    var bgColumnArray = COMMON.prepareBgColumnsArrayDelta(data, maxRate);
    return new Highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'column',
        className: 'gistogram-divider',
        reflow: false,
        marginLeft: 10,
        marginRight: 10,
        spacingTop: spacing,
        spacingBottom: spacing
      },
      title: {
        text: ''
      },
      xAxis: {
        tickLength: 37,
        lineColor: 'transparent',
        type: 'category',
        labels: {
          step: 1,
          useHTML: true,
          style: {
            color: colors.bar
          },
          formatter: function() {
            var labelValue = this.value;
            var oldValue;
            var newValue;
            var growth;
            if (this.isLast) {
              return '<div class="labels">' + this.value + '</div>';
            } else {
              var pointValue = COMMON.findByName(data, this.value);
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
        plotLines: [{
          value: maxRate,
          color: colors.gridLines,
          dashStyle: 'dot',
          width: 1
        },{
          value: maxRate / 2,
          color: colors.gridLines,
          dashStyle: 'dot',
          width: 1,
        },{
          value: 0,
          color: colors.gridLines,
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
      series: [
        {
          name: 'background',
          className: 'column-background',
          type: 'column',
          states: {
            hover: {
              enabled: false
            }
          },
          color: colors.barBg,
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
}(CHARTS || {}));
