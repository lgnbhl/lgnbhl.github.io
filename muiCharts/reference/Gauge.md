# Gauge

<https://mui.com/x/api/charts/gauge/>

## Usage

``` r
Gauge(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- cornerRadius `number, string`\
  Default is 0 The radius applied to arc corners (similar to border
  radius). Set it to '50%' to get rounded arc.

- cx `number, string`\
  Default is - The x coordinate of the arc center. Can be a number (in
  px) or a string with a percentage such as '50%'. The '100%' is the
  width the drawing area.

- cy `number, string`\
  Default is - The y coordinate of the arc center. Can be a number (in
  px) or a string with a percentage such as '50%'. The '100%' is the
  height the drawing area.

- endAngle `number`\
  Default is 360 The end angle (deg).

- height `number`\
  Default is - The height of the chart in px. If not defined, it takes
  the height of the parent element.

- id `string`\
  Default is - This prop is used to help implement the accessibility
  logic. If you don't provide this prop. It falls back to a randomly
  generated id.

- innerRadius `number, string`\
  Default is '80%' The radius between circle center and the beginning of
  the arc. Can be a number (in px) or a string with a percentage such as
  '50%'. The '100%' is the maximal radius that fit into the drawing
  area.

- margin
  `number, bottom?: number, left?: number, right?: number, top?: number `\
  Default is - The margin between the SVG and the drawing area. It's
  used for leaving some space for extra information such as the x- and
  y-axis or legend.Accepts a number to be used on all sides or an object
  with the optional properties: top, bottom, left, and right.

- outerRadius `number, string`\
  Default is '100%' The radius between circle center and the end of the
  arc. Can be a number (in px) or a string with a percentage such as
  '50%'. The '100%' is the maximal radius that fit into the drawing
  area.

- skipAnimation `bool`\
  Default is - If true, animations are skipped. If unset or false, the
  animations respects the user's prefers-reduced-motion setting.

- startAngle `number`\
  Default is 0 The start angle (deg).

- value `number`\
  Default is - The value of the gauge. Set to null to not display a
  value.

- valueMax `number`\
  Default is 100 The maximal value of the gauge.

- valueMin `number`\
  Default is 0 The minimal value of the gauge.

- width `number`\
  Default is - The width of the chart in px. If not defined, it takes
  the width of the parent element.
