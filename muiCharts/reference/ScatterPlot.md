# ScatterPlot

<https://mui.com/x/api/charts/scatter-plot/>

## Usage

``` r
ScatterPlot(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- onItemClick `func`\
  Default is - Callback fired when clicking on a scatter
  item.Signature:function(event: MouseEvent, scatterItemIdentifier:
  ScatterItemIdentifier) =\> voidevent Mouse event recorded on the
  ![](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=)
  element.scatterItemIdentifier The scatter item identifier.

- renderer `'svg-batch', 'svg-single'`\
  Default is 'svg-single' The type of renderer to use for the scatter
  plot. - svg-single: Renders every scatter item in a element. -
  svg-batch: Batch renders scatter items in elements for better
  performance with large datasets, at the cost of some limitations. Read
  more: https://mui.com/x/react-charts/scatter/#performance

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.
