# ContinuousColorLegend

<https://mui.com/x/api/charts/continuous-color-legend/>

## Usage

``` r
ContinuousColorLegend(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- axisDirection `'x', 'y', 'z'`\
  Default is 'z' The axis direction containing the color configuration
  to represent.

- axisId `number, string`\
  Default is The first axis item. The id of the axis item with the color
  configuration to represent.

- classes `object`\
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- direction `'horizontal', 'vertical'`\
  Default is 'horizontal' The direction of the legend layout.

- gradientId `string`\
  Default is auto-generated id The id for the gradient to use. If not
  provided, it will use the generated gradient from the axis
  configuration. The gradientId will be used as fill="url(#gradientId)".

- labelPosition `'start', 'end', 'extremes'`\
  Default is 'end' Where to position the labels relative to the
  gradient.

- maxLabel `func, string`\
  Default is formattedValue The label to display at the maximum side of
  the gradient. Can either be a string, or a function. If not defined,
  the formatted maximal value is display.

- minLabel `func, string`\
  Default is formattedValue The label to display at the minimum side of
  the gradient. Can either be a string, or a function.

- reverse `bool`\
  Default is FALSE If true, the gradient and labels will be reversed.

- rotateGradient `bool`\
  Default is - If provided, the gradient will be rotated by 90deg.
  Useful for linear gradients that are not in the correct orientation.

- thickness `number`\
  Default is 12 The thickness of the gradient
