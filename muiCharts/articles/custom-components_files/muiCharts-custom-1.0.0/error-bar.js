
(function () {
  var jsmodule = window.jsmodule;
  var React    = jsmodule['react'];
  var charts   = jsmodule['@mui/x-charts'];
  var useXScale = charts.useXScale;
  var useYScale = charts.useYScale;

  function ErrorBar(props) {
    var data      = props.data;
    var color     = props.color     || '#555';
    var lineWidth = props.lineWidth  || 1.5;
    var capSize   = props.capSize    || 6;

    var xScale = useXScale();
    var yScale = useYScale();

    // The band (category) scale is the one exposing .bandwidth()
    var horizontal  = typeof yScale.bandwidth === 'function';
    var bandScale   = horizontal ? yScale : xScale;
    var valueScale  = horizontal ? xScale : yScale;
    var bandwidth   = typeof bandScale.bandwidth === 'function'
      ? bandScale.bandwidth() : 0;

    if (!data || !Array.isArray(data)) return null;

    return React.createElement(
      'g',
      { className: 'error-bars' },
      data.map(function (d, i) {
        if (d.x == null || d.min == null || d.max == null) return null;

        var band = bandScale(d.x);
        if (band == null || isNaN(band)) return null;
        band += bandwidth / 2;

        var vMin = valueScale(d.min);
        var vMax = valueScale(d.max);
        if (isNaN(vMin) || isNaN(vMax)) return null;

        var stroke = { stroke: color, strokeWidth: lineWidth };

        if (horizontal) {
          return React.createElement('g', { key: i },
            React.createElement('line', Object.assign({ key: 'l',
              x1: vMin, y1: band, x2: vMax, y2: band }, stroke)),
            React.createElement('line', Object.assign({ key: 'a',
              x1: vMin, y1: band - capSize, x2: vMin, y2: band + capSize }, stroke)),
            React.createElement('line', Object.assign({ key: 'b',
              x1: vMax, y1: band - capSize, x2: vMax, y2: band + capSize }, stroke))
          );
        }

        // Vertical (default)
        return React.createElement('g', { key: i },
          React.createElement('line', Object.assign({ key: 'l',
            x1: band, y1: vMin, x2: band, y2: vMax }, stroke)),
          React.createElement('line', Object.assign({ key: 'a',
            x1: band - capSize, y1: vMin, x2: band + capSize, y2: vMin }, stroke)),
          React.createElement('line', Object.assign({ key: 'b',
            x1: band - capSize, y1: vMax, x2: band + capSize, y2: vMax }, stroke))
        );
      })
    );
  }

  // Register the component so shiny.react can find it
  window.jsmodule = window.jsmodule || {};
  window.jsmodule['muiCharts-custom'] =
    Object.assign({}, window.jsmodule['muiCharts-custom'], { ErrorBar: ErrorBar });
})();

