var renderWaterfallTo;
$(function () {

  // colors [growing, falling, first/last, barBg, gridLines, first/last-text]
  var colors = ['#55c398', '#e45641', '#44b3c2', '#ecf0f7', '#888e95', '#c3cad6'];
  var maxRate = 5000;
  var pointWidth = 19;
  var hoverOpacity = 0.1;

  //
  // tmp - bottom label's value
  var tmp = 14;


  var bgColumns = [];
  var highchart;
  var growingButtonWidth = 58;
  var data;
  var maxRateInPixels;
  var gbWidthValue;
  var interval;
  var chartData;
  var dataLength;
  var config = {};


  renderWaterfallTo = function (chartInfo, configInit) {
    chartData = chartInfo;
    dataLength = chartData.length;
    config = configInit;

    watchOutsideColumns(chartData);
    highchart = initWaterfall(chartData, config.container);
    data = highchart.series[1].data;
    watchNegativeValues(data);
    growingLabelCorrect();
  }

  function initWaterfall(data, container) {
    fillBgColumnsArray();

    return new Highcharts.Chart({
      chart: {
          renderTo: container,
          type: 'waterfall',
          marginLeft: 10,
          marginRight: 10,
          spacingTop: 0,
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
            if(this.isFirst || this.isLast) {
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
          color: colors[5],
          dashStyle: 'dot',
          width: 1
        },{
          value: maxRate / 2,
          color: colors[5],
          dashStyle: 'dot',
          width: 1,
        },{
          value: 0,
          color: colors[5],
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
          color: colors[3],
          pointWidth: pointWidth,
          data: bgColumns
        },
        {
          name: 'waterfall',
          upColor: colors[0],
          color: colors[1],
          pointWidth: pointWidth,
          borderWidth: 0,
          data: data,
          dataLabels: {
              enabled: true,
              inside: false,
              y: 7,
              style: {
                upColor: colors[1],
                color: colors[0]
              }
          }
        }
      ]
    });
  }

  //
  // TODO: click on bar event
  function  clickOnBar() {
    console.log(this);
    alert('todo');
  }

  function growingLabelCorrect() {
    maxRateInPixels = highchart.series[0].yAxis.toPixels(maxRate);
    interval = data[1].clientX - data[0].clientX;
    gbWidthValue =  -growingButtonWidth / 2 + 'px';
    $('.growing').css("marginLeft", gbWidthValue);
  }

  function watchNegativeValues(data) {
    var dd = data;
    data.forEach(function(item, i, arr) {
      if (item.y < 0) {
        item.update({
          dataLabels: {
            inside: true,
            verticalAlign: 'bottom',
            y: 24,
            color: colors[1]
          }
        }, false);
      }
    });

  }

  function watchOutsideColumns(data) {
    var labels = {
      style: {
        color: colors[4]
      }
    };

    data[data.length - 1].color = colors[2];
    data[data.length - 1].dataLabels = {};
    data[data.length - 1].dataLabels = labels;
    data[0].color = colors[2];
    data[0].dataLabels = labels;
  }

  function fillBgColumnsArray() {
      bgColumns = [];
      for (var i = 0; i < dataLength; i += 1) {
        bgColumns.push(maxRate);
      }
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
    var height = chart.plotSizeY ;

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

    $lb = $(elementName).find('.growing');
    if (this.index != 0 && this.index != $lb.length + 1) {
      $lb[this.index - 1].style.borderTop = '30px solid rgba(0, 0, 0, 0.05)';
      $lb[this.index - 1].style.width =  interval + 'px';
      $lb[this.index - 1].style.marginLeft =  -growingButtonWidth / 2 - (interval - growingButtonWidth) / 2 + 'px';
    }
  }

  function borderOnHoverOut() {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;

    if (this.series.chart.hoverStack) {
        this.series.chart.hoverStack.destroy();
        this.series.chart.hoverStack = false
    }

    cancelFillColumnBgWhite.call(this, this.index);
    $lb = $(elementName).find('.growing');
    if (this.index != 0 && this.index != $lb.length + 1) {
      $lb[this.index - 1].style.borderTop = 'none';
      $lb[this.index - 1].style.width = growingButtonWidth + 'px';
      $lb[this.index - 1].style.marginLeft = gbWidthValue;
    }
  }

  function fillColumnBgWhite(index) {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $bg = $(elementName).find('.highcharts-point');
    $bg[index].style.fill = "#fff";
  }

  function cancelFillColumnBgWhite(index) {
    var chart = this.series.chart;
    var elementName = '#' + chart.container.id;
    var $bg = $(elementName).find('.highcharts-point');
    $bg[index].style.fill = colors[3];
  }

  function buildRectPath(xStart, yStart ,width, height,
    rTopLeft, rTopRight, rBottomRight, rBottomLeft) {
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
