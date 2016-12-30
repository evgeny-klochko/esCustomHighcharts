/**
 * Highcharts plugin for creating individual rounded corners.
 */

(function (H) {
  var tmpPoint;
  H.wrap(H.seriesTypes.column.prototype, 'translate', function (proceed) {
    var options = this.options,
      rTopLeft = options.borderRadiusTopLeft || 0,
      rTopRight = options.borderRadiusTopRight || 0,
      rBottomRight = options.borderRadiusBottomRight || 0,
      rBottomLeft = options.borderRadiusBottomLeft || 0,
      rBottomLeftFirst = options.borderRadiusBottomLeftFirst|| 0,
      rBottomRightFirst = options.borderRadiusBottomRightFirst  || 0,
      topMargin = options.topMargin || 0,
      bottomMargin = options.bottomMargin || 0;

    proceed.call(this);
    if (rTopLeft || rTopRight || rBottomRight || rBottomLeft) {
      H.each(this.points, function (point) {
        var shapeArgs = point.shapeArgs,
          w = shapeArgs.width,
          h = shapeArgs.height,
          x = shapeArgs.x,
          y = shapeArgs.y;

        // Correct for small columns (#7)
        if (rTopLeft > (w / 2)) {
          rTopLeft = w / 2;
        }

        if (rTopRight > (w / 2)) {
          rTopRight = w / 2;
        }

        // Preserve the box for data labels
        point.dlBox = point.shapeArgs;

        point.shapeType = 'path';
        point.shapeArgs = {
          d: [
            'M', x + rTopLeft, y + topMargin,
            // top side
            'L', x + w - rTopRight, y + topMargin,
            // top right corner
            'C', x + w - rTopRight / 2, y, x + w, y + rTopRight / 2, x + w, y + rTopRight,
            // right side
            'L', x + w, y + h - rBottomRight,
            // bottom right corner
            'C', x + w, y + h - rBottomRight / 2, x + w - rBottomRight / 2, y + h, x + w - rBottomRight, y + h + bottomMargin,
            // bottom side
            'L', x + rBottomLeft, y + h + bottomMargin,
            // bottom left corner
            'C', x + rBottomLeft / 2, y + h, x, y + h - rBottomLeft / 2, x, y + h - rBottomLeft,
            // left side
            'L', x, y + rTopLeft,
            // top left corner
            'C', x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y,
            'Z'
          ]
        };
      });
    }
  });
}(Highcharts));

