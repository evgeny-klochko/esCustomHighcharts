(function () {
  'use strict';

  //waterfall
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
    container: 'chart-waterfall-summary',
    maxRate: 5000
  }

  //grouped
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
  var config = {
    colors: {
      bar: '#f1a94e',
      barBg: '#fff',
      text: '#888e95',
      gridLines: '#aaa'
    },
    container: 'gistogram-grouped',
    maxRate: 10,
    type: 'sales',
    headerText: 'Sales, $ MM'
  }
  var config2 = {
    colors: {
      bar: '#e45641',
      barBg: '#fff',
      text: '#888e95',
      gridLines: '#aaa'
    },
    container: 'gistogram-grouped2',
    maxRate: 10,
    type: 'volume',
    headerText: 'Volume - EQ, Thousands'
  }
  var config3 = {
    colors: {
      bar: '#44b3c2',
      barBg: '#fff',
      text: '#888e95',
      gridLines: '#aaa'
    },
    container: 'gistogram-grouped3',
    maxRate: 10,
    type: 'price',
    headerText: 'Price - per EQ, $'
  }

  //growth
  var chartDataGrowth = [
    {
      name: '12/14',
      y: 22
    }, {
      name: '12/17',
      y: 50
    }
  ];
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

//divider
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
    dividerPosition: 3,
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

//divider grawth
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

  //details
  var chartDataDetails = [
    {
      name: '2013',
      y: 0.6
    }, {
      name: '2014',
      y: 0.7
    }, {
      name: '2015',
      y: 0.8
    }, {
      name: '2016',
      y: 0.9
    }, {
      name: '2017F',
      y: 1.12
    }, {
      name: '2018F',
      y: 1.25
    }
  ];
  var configDetails = {
    colors: {
      bar: '#44b3c2',
      barBg: '#ecf0f7',
      text: '#888e95',
      gridLines: '#aaa'
    },
    container: 'chart-gistogram-details',
    maxRate: 2,
    background: false,
    type: 'price',
    headerText: 'Price - per EQ, $'
  }
  var configDetails2 = {
    colors: {
      bar: '#44b3c2',
      barBg: '#ecf0f7',
      text: '#888e95',
      gridLines: '#aaa'
    },
    container: 'chart-gistogram-details-absolute',
    maxRate: 2,
    background: false,
    type: 'price',
    headerText: 'Price - per EQ, $'
  }

    CHARTS.renderWaterfall(chartDataWaterfall, configW);
    CHARTS.renderGistogram(chartData, config);
    CHARTS.renderGistogram(chartData, config2);
    CHARTS.renderGistogram(chartData, config3);
    CHARTS.renderGistogramGrowthrate(chartDataGrowth, config4);
    CHARTS.renderGistogramGrowthrate(chartDataGrowth, config5);
    CHARTS.renderGistogramGrowthrate(chartDataGrowth, config6);
    CHARTS.renderGistogramDivider(chartDataWide, configWide);
    CHARTS.renderGistogramDivider(chartDataWide, configWide2);
    CHARTS.renderGistogramDivider(chartDataWide, configWide3);
    CHARTS.renderGistogramDividerGrowthrate(chartDataWideGrowth, configWideArrowed);
    CHARTS.renderGistogramDividerGrowthrate(chartDataWideGrowth, configWideArrowed2);
    CHARTS.renderGistogramDividerGrowthrate(chartDataWideGrowth, configWideArrowed3);
}());
