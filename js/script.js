(function () {
  'use strict';

  var chartDataWaterfall = [
            {
              name: '2015',
              y: 2000
            }, {
              name: 'Economy',
              y: -130
            }, {
              name: 'Demographic',
              y: 318
            }, {
              name: 'Inflation',
              y: 1102
            }, {
              name: 'Distribution',
              y: -182
            }, {
              name: 'Pricing',
              y: -212
            }, {
              name: 'Unit size',
              y: 341
            }, {
              name: 'Advertising',
              y: 56
            },{
              name: 'Shake of Snacking',
              y: 240
            }, {
              name: 'Remainder',
              y: 362
            }, {
              name: '2020F',
              isSum: true
            }
  ];

  var chartDataWaterfall2 = [
    {
      name: '2015',
      y: 1000
    }, {
      name: 'Economy',
      y: -230
    }, {
      name: 'Demographic',
      y: 218
    }, {
      name: 'Inflation',
      y: 1202
    }, {
      name: 'Distribution',
      y: -282
    }, {
      name: 'Pricing',
      y: -312
    }, {
      name: 'Unit size',
      y: 341
    }, {
      name: 'Advertising',
      y: 56
    },{
      name: 'Shake of Snacking',
      y: 240
    }, {
      name: 'Remainder',
      y: 362
    }, {
      name: '2020F',
      isSum: true
    }
  ];

  var chartData = [
  {
    name: '2013',
    y: 3.85
  }, {
    name: '2015',
    y: 5.71
  }, {
    name: '2020F',
    y: 7.86
  }
  ];

  var chartDataWide = [
  {
    name: '2013',
    y: 3.85
  }, {
    name: '2014',
    y: 4.71
  }, {
    name: '2015',
    y: 7.86
  }, {
    name: '2016',
    y: 3.85
  }, {
    name: '2017',
    y: 4.71
  }, {
    name: '2018',
    y: 7.86
  }, {
    name: '2019',
    y: 3.85
  }, {
    name: '2020F',
    y: 4.71
  }
  ];

  var chartData2 = [
  {
    name: '2013',
    y: 2
  }, {
    name: '2015',
    y: 4.5
  }, {
    name: '2020F',
    y: 4
  }
  ];

  var chartDataGrowth = [
  {
    name: '12/14',
    y: 22
  }, {
    name: '12/17',
    y: 50
  }
  ];

  var chartDataGrowth2 = [
  {
    name: '12/14',
    y: 34
  }, {
    name: '12/17',
    y: -11
  }
  ];

  var chartDataWideGrowth = [
    {
      name: '2013',
      y: 5
    }, {
      name: '2014',
      y: 5
    }, {
      name: '2015',
      y: 7
    }, {
      name: '2016',
      y: -5
    }, {
      name: '2017',
      y: -10
    }, {
      name: '2018',
      y: -3
    }, {
      name: '2019',
      y: 6
    }, {
      name: '2020F',
      y: 4
    }
  ];

  var configW = {
    // colors [growing, falling, first/last, barBg, gridLines, first/last-text]
    colors: {
      barUp: '#55c398',
      barDown: '#e45641',
      barOutside: '#44b3c2',
      barBg: '#ecf0f7',
      gridLines: '#c3cad6',
      textUp: '#55c398',
      textDown: '#e45641',
      textOutside: '#888e95'
    },
    container: 'waterfall-chart',
    maxRate: 5000
  }

  var configW2 = {
    color: ['#55c398', '#e45641', '#44b3c2', '#ecf0f7', '#888e95', '#c3cad6'],
    container: 'waterfall-chart2',
    maxRate: 4000
  }

  var config = {
    colors: {
      bar: '#f1a94e',
      text: '#888e95',
      gridLines: '#c3cad6'
    },
    container: 'gistogram-grouped',
    maxRate: 10,
    type: 'sales',
    headerText: 'Sales, $ MM'
  }

  var config2 = {
    colors: {
      bar: '#e45641',
      text: '#888e95',
      gridLines: '#c3cad6'
    },
    container: 'gistogram-grouped2',
    maxRate: 10,
    type: 'volume',
    headerText: 'Volume - EQ, Thousands'
  }

  var config3 = {
    
    colors: {
      bar: '#44b3c2',
      text: '#888e95',
      gridLines: '#c3cad6'
    },
    container: 'gistogram-grouped3',
    maxRate: 10,
    type: 'price',
    headerText: 'Price - per EQ, $'
  }

  var config4 = {
    colors: {
      bar: '#f1a94e',
      text: '#888e95',
      gridLines: '#c3cad6'
    },
    maxRate: 100,
    container: 'gistogram-growthrate',
    type: 'sales',
    headerText: 'Sales, $ MM'
  }

  var config5 = {
    colors: {
      bar: '#e45641',
      text: '#888e95',
      gridLines: '#c3cad6'
    },
    maxRate: 100,
    container: 'gistogram-growthrate2',
    type: 'volume',
    headerText: 'Volume - EQ, Thousands'
  }

  var config6 = {
    container: 'gistogram-growthrate3',
    colors: {
      bar: '#44b3c2',
      text: '#888e95',
      gridLines: '#c3cad6'
    },
    maxRate: 100,
    type: 'price',
    headerText: 'Price - per EQ, $'
  }

  var configWide = {
    container: 'gistogram-wide',
    colors: {
      bar: '#f1a94e',
      text: '#888e95',
      barBg: '#ecf0f7',
      gridLines: '#c3cad6',
      leftBorder: '#cfd5de',
      rightBorder: '#f9ddb8'
    },
    dividerPosition: 2,
    maxRate: 10,
    leftLabel: 'Historical',
    rightLabel: 'Forecast'
  }

  var configWide2 = {
    colors: {
      bar: '#e45641',
      text: '#888e95',
      barBg: '#ecf0f7',
      gridLines: '#c3cad6',
      leftBorder: '#cfd5de',
      rightBorder: '#f4bbb3'
    },
    container: 'gistogram-wide2',
    dividerPosition: 4,
    maxRate: 10,
    leftLabel: 'Historical',
    rightLabel: 'Forecast'
  }

  var configWide3 = {
    colors: {
      bar: '#44b3c2',
      text: '#888e95',
      barBg: '#ecf0f7',
      gridLines: '#c3cad6',
      leftBorder: '#cfd5de',
      rightBorder: '#b4e1e6'
    },
    container: 'gistogram-wide3',
    dividerPosition: 2,
    maxRate: 10,
    leftLabel: 'Historical',
    rightLabel: 'Forecast'
  }

  var configWideArrowed = {
    colors: {
      bar: '#f1a94e',
      text: '#888e95',
      barBg: '#ecf0f7',
      gridLines: '#c3cad6',
      leftBorder: '#cfd5de',
      rightBorder: '#f9ddb8'
    },
    container: 'gistogram-wide-arrowed',
    dividerPosition: 2,
    maxRate: 25,
    leftLabel: 'Historical',
    rightLabel: 'Forecastt'
  }
  var configWideArrowed2 = {
    colors: {
      bar: '#e45641',
      text: '#888e95',
      barBg: '#ecf0f7',
      gridLines: '#c3cad6',
      leftBorder: '#cfd5de',
      rightBorder: '#f4bbb3'
    },
    container: 'gistogram-wide-arrowed2',
    dividerPosition: 3,
    maxRate: 25,
    leftLabel: 'Historical',
    rightLabel: 'Forecastt'
  }
  var configWideArrowed3 = {
    colors: {
      bar: '#44b3c2',
      text: '#888e95',
      barBg: '#ecf0f7',
      gridLines: '#c3cad6',
      leftBorder: '#cfd5de',
      rightBorder: '#b4e1e6'
    },
    container: 'gistogram-wide-arrowed3',
    dividerPosition: 2,
    maxRate: 25,
    leftLabel: 'Historical',
    rightLabel: 'Forecastt'
  }

  CHARTS.renderWaterfall(chartDataWaterfall, configW);
  //CHARTS.renderWaterfall(chartDataWaterfall2, configW2);
  CHARTS.renderGistogram(chartData, config);
  CHARTS.renderGistogram(chartData2, config2);
  CHARTS.renderGistogram(chartData2, config3);
  CHARTS.renderGistogramGrowthrate(chartDataGrowth, config4);
  CHARTS.renderGistogramGrowthrate(chartDataGrowth2, config5);
  CHARTS.renderGistogramGrowthrate(chartDataGrowth, config6);
  CHARTS.renderGistogramDivider(chartDataWide, configWide);
  CHARTS.renderGistogramDivider(chartDataWide, configWide2);
  CHARTS.renderGistogramDivider(chartDataWide, configWide3);
  CHARTS.renderGistogramDividerGrowthrate(chartDataWideGrowth, configWideArrowed);
  CHARTS.renderGistogramDividerGrowthrate(chartDataWideGrowth, configWideArrowed2);
  CHARTS.renderGistogramDividerGrowthrate(chartDataWideGrowth, configWideArrowed3);
}());