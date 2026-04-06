# ChartsWrapper

<https://mui.com/x/api/charts/charts-wrapper/>

## Usage

``` r
ChartsWrapper(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- extendVertically `bool`\
  Default is `FALSE` if the `height` prop is set. And `TRUE` otherwise.
  If true, the chart wrapper set height: 100%.

- hideLegend `bool`\
  Default is FALSE If true, the legend is not rendered.

- legendDirection `'horizontal', 'vertical'`\
  Default is 'horizontal' The direction of the legend.

- legendPosition
  `horizontal?: 'center', 'end', 'start', vertical?: 'bottom', 'middle', 'top'`\
  Default is horizontal: 'center', vertical: 'bottom' The position of
  the legend.
