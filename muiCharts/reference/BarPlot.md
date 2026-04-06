# BarPlot

<https://mui.com/x/api/charts/bar-plot/>

## Usage

``` r
BarPlot(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- barLabel `'value', func`\
  Default is - If provided, the function will be used to format the
  label of the bar. It can be set to 'value' to display the current
  value.

- barLabelPlacement `'outside', 'inside'`\
  Default is - The placement of the bar label. It controls whether the
  label is rendered inside or outside the bar.

- borderRadius `number`\
  Default is - Defines the border radius of the bar element.

- onItemClick `func`\
  Default is - Callback fired when a bar item is
  clicked.Signature:function(event: React.MouseEvent\<SVGElement,
  MouseEvent\>, barItemIdentifier: BarItemIdentifier) =\> voidevent The
  event source of the callback.barItemIdentifier The bar item
  identifier.

- skipAnimation `bool`\
  Default is undefined If true, animations are skipped.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.
