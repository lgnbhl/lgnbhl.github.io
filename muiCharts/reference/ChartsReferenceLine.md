# ChartsReferenceLine

<https://mui.com/x/api/charts/charts-reference-line/>

## Usage

``` r
ChartsReferenceLine(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- axisId `number, string`\
  Default is The `id` of the first defined axis. The id of the axis used
  for the reference value.

- classes `object`\
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- label `string`\
  Default is - The label to display along the reference line.

- labelAlign `'end', 'middle', 'start'`\
  Default is 'middle' The alignment if the label is in the chart drawing
  area.

- labelStyle `object`\
  Default is - The style applied to the label.

- lineStyle `object`\
  Default is - The style applied to the line.

- spacing `number, x?: number, y?: number `\
  Default is x: 0, y: 5 on a horizontal line and x: 5, y: 0 on a
  vertical line. Additional space around the label in px. Can be a
  number or an object x, y to distinguish space with the reference line
  and space with axes.

- x `Date, number, string`\
  Default is - The x value associated with the reference line. If
  defined the reference line will be vertical.

- y `Date, number, string`\
  Default is - The y value associated with the reference line. If
  defined the reference line will be horizontal.
