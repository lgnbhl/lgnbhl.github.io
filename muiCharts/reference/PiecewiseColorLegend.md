# PiecewiseColorLegend

<https://mui.com/x/api/charts/piecewise-color-legend/>

## Usage

``` r
PiecewiseColorLegend(...)
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

- labelFormatter `func`\
  Default is - Format the legend labels.Signature:function(params:
  PiecewiseLabelFormatterParams) =\> string \| nullparams The bound of
  the piece to format.

- labelPosition
  `'start', 'end', 'extremes', 'inline-start', 'inline-end'`\
  Default is 'extremes' Where to position the labels relative to the
  gradient.

- markType `'square', 'circle', 'line'`\
  Default is 'square' The type of the mark.

- onItemClick `func`\
  Default is - Callback fired when a legend item is
  clicked.Signature:function(event: React.MouseEvent\<HTMLButtonElement,
  MouseEvent\>, legendItem: PiecewiseColorLegendItemContext, index:
  number) =\> voidevent The click event.legendItem The legend item
  data.index The index of the clicked legend item.
