# PieArcPlot

<https://mui.com/x/api/charts/pie-arc-plot/>

## Usage

``` r
PieArcPlot(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- id `number, string`\
  Default is - The id of this series.

- outerRadius `number`\
  Default is - The radius between circle center and the end of the arc.

- arcLabelRadius `number`\
  Default is (innerRadius - outerRadius) / 2 The radius between circle
  center and the arc label in px.

- cornerRadius `number`\
  Default is 0 The radius applied to arc corners (similar to border
  radius).

- faded
  `additionalRadius?: number, arcLabelRadius?: number, color?: string, cornerRadius?: number, innerRadius?: number, outerRadius?: number, paddingAngle?: number`\
  Default is additionalRadius: -5 Override the arc attributes when it is
  faded.

- highlighted
  `additionalRadius?: number, arcLabelRadius?: number, color?: string, cornerRadius?: number, innerRadius?: number, outerRadius?: number, paddingAngle?: number`\
  Default is - Override the arc attributes when it is highlighted.

- innerRadius `number`\
  Default is 0 The radius between circle center and the beginning of the
  arc.

- onItemClick `func`\
  Default is - Callback fired when a pie item is
  clicked.Signature:function(event: React.MouseEvent\<SVGPathElement,
  MouseEvent\>, pieItemIdentifier: PieItemIdentifier, item:
  DefaultizedPieValueType) =\> voidevent The event source of the
  callback.pieItemIdentifier The pie item identifier.item The pie item.

- paddingAngle `number`\
  Default is 0 The padding angle (deg) between two arcs.

- skipAnimation `bool`\
  Default is FALSE If true, animations are skipped.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.
