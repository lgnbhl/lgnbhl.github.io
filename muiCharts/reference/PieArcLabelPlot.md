# PieArcLabelPlot

<https://mui.com/x/api/charts/pie-arc-label-plot/>

## Usage

``` r
PieArcLabelPlot(...)
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

- arcLabel `'formattedValue', 'label', 'value', func`\
  Default is - The label displayed into the arc.

- arcLabelMinAngle `number`\
  Default is 0 The minimal angle required to display the arc label.

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

- paddingAngle `number`\
  Default is 0 The padding angle (deg) between two arcs.

- skipAnimation `bool`\
  Default is FALSE If true, animations are skipped.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.
