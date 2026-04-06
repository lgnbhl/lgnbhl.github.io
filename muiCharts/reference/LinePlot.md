# LinePlot

<https://mui.com/x/api/charts/line-plot/>

## Usage

``` r
LinePlot(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- onItemClick `func`\
  Default is - Callback fired when a line item is
  clicked.Signature:function(event: React.MouseEvent\<SVGPathElement,
  MouseEvent\>, lineItemIdentifier: LineItemIdentifier) =\> voidevent
  The event source of the callback.lineItemIdentifier The line item
  identifier.

- skipAnimation `bool`\
  Default is FALSE If true, animations are skipped.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.
