$(function () {
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
    y: 67
  }
  ];

  var chartDataGrowth2 = [
  {
    name: '12/14',
    y: 125
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
    container: 'waterfall-chart'
  }

  var configW2 = {
    container: 'waterfall-chart2'
  }

  var config = {
    color: ['#888e95', '#c3cad6', '#f1a94e'],
    container: 'gistogram-grouped',
    type: 'sales',
    headerText: 'Sales, $ MM'
  }
  var config2 = {
  color: ['#888e95', '#c3cad6', '#e45641'],
  container: 'gistogram-grouped2',
  type: 'volume',
  headerText: 'Volume - EQ, Thousands'
  }
  var config3 = {
  color: ['#888e95', '#c3cad6', '#44b3c2'],
  container: 'gistogram-grouped3',
  type: 'price',
  headerText: 'Price - per EQ, $'
  }
  var config4 = {
  color: ['#888e95', '#c3cad6', '#f1a94e', '#FFC267'],
  container: 'gistogram-growthrate',
  type: 'sales',
  headerText: 'Sales, $ MM'
  }
  var config5 = {
    color: ['#888e95', '#c3cad6', '#e45641', '#FD6F5A'],
    container: 'gistogram-growthrate2',
    type: 'volume',
    headerText: 'Volume - EQ, Thousands'
  }
  var config6 = {
    color: ['#888e95', '#c3cad6', '#44b3c2', '#5DCCDB'],
    container: 'gistogram-growthrate3',
    type: 'price',
    headerText: 'Price - per EQ, $'
  }

  var configWide = {
    color: ['#888e95', '#c3cad6', '#ecf0f7', '#f1a94e', '#cfd5de', '#f9ddb8'],
    container: 'gistogram-wide',
    dividerPosition: 2,
    leftLabel: 'Historical',
    rightLabel: 'Forecast'
  }

  var configWide2 = {
    color: ['#888e95', '#c3cad6', '#ecf0f7', '#e45641', '#cfd5de', '#f4bbb3'],
    container: 'gistogram-wide2',
    dividerPosition: 4,
    leftLabel: 'Historical',
    rightLabel: 'Forecast'
  }

  var configWide3 = {
  color: ['#888e95', '#c3cad6', '#ecf0f7', '#44b3c2', '#cfd5de', '#b4e1e6'],
  container: 'gistogram-wide3',
  dividerPosition: 2,
  leftLabel: 'Historical',
  rightLabel: 'Forecast'
  }

  var configWideArrowed = {
    color: ['#888e95', '#c3cad6', '#ecf0f7', '#f1a94e', '#cfd5de', '#f9ddb8'],
    container: 'gistogram-wide-arrowed',
    dividerPosition: 2,
    leftLabel: 'Historical',
    rightLabel: 'Forecastt'
  }
  var configWideArrowed2 = {
    color: ['#888e95', '#c3cad6', '#ecf0f7', '#e45641', '#cfd5de', '#f4bbb3'],
    container: 'gistogram-wide-arrowed2',
    dividerPosition: 3,
    leftLabel: 'Historical',
    rightLabel: 'Forecastt'
  }
  var configWideArrowed3 = {
    color: ['#888e95', '#c3cad6', '#ecf0f7', '#44b3c2', '#cfd5de', '#b4e1e6'],
    container: 'gistogram-wide-arrowed3',
    dividerPosition: 2,
    leftLabel: 'Historical',
    rightLabel: 'Forecastt'
  }

  renderWaterfallTo(chartDataWaterfall, configW);
  //renderWaterfallTo(chartDataWaterfall2, configW2);
  //renderGistogramTo(chartData, config);
  //renderGistogramTo(chartData2, config2);
  //renderGistogramTo(chartData2, config3);
  //renderGistogramGrowthrateTo(chartDataGrowth, config4);
  //renderGistogramGrowthrateTo(chartDataGrowth2, config5);
  //renderGistogramGrowthrateTo(chartDataGrowth, config6);
  //renderWideGistogramTo(chartDataWide, configWide);
  //renderWideGistogramTo(chartDataWide, configWide2);
  //renderWideGistogramTo(chartDataWide, configWide3);
  //renderWideArrowedGistogramTo(chartDataWideGrowth, configWideArrowed);
  //renderWideArrowedGistogramTo(chartDataWideGrowth, configWideArrowed2);
  //renderWideArrowedGistogramTo(chartDataWideGrowth, configWideArrowed3);
}());