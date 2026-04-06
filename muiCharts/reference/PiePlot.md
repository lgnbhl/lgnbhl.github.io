# PiePlot

<https://mui.com/x/api/charts/pie-plot/>

## Usage

``` r
PiePlot(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- onItemClick `func`\
  Default is - Callback fired when a pie item is
  clicked.Signature:function(event: React.MouseEvent\<SVGPathElement,
  MouseEvent\>, pieItemIdentifier: PieItemIdentifier, item:
  DefaultizedPieValueType) =\> voidevent The event source of the
  callback.pieItemIdentifier The pie item identifier.item The pie item.

- skipAnimation `bool`\
  Default is FALSE If true, animations are skipped.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.
