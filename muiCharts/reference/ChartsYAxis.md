# ChartsYAxis

<https://mui.com/x/api/charts/charts-y-axis/>

## Usage

``` r
ChartsYAxis(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- axisId `number, string`\
  Default is - The id of the axis to render. If undefined, it will be
  the first defined axis.

- classes `object`\
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- disableLine `bool`\
  Default is FALSE If true, the axis line is disabled.

- disableTicks `bool`\
  Default is FALSE If true, the ticks are disabled.

- label `string`\
  Default is - The label of the axis.

- labelStyle `object`\
  Default is - The style applied to the axis label.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.

- tickInterval `'auto', array, func`\
  Default is 'auto' Defines which ticks are displayed. Its value can
  be: - 'auto' In such case the ticks are computed based on axis scale
  and other parameters. - a filtering function of the form (value,
  index) =\> boolean which is available only if the axis has "point"
  scale. - an array containing the values where ticks should be
  displayed.

- tickLabelInterval `'auto', func`\
  Default is 'auto' Defines which ticks get its label displayed. Its
  value can be: - 'auto' In such case, labels are displayed if they do
  not overlap with the previous one. - a filtering function of the form
  (value, index) =\> boolean. Warning: the index is tick index, not data
  ones.

- tickLabelPlacement `'middle', 'tick'`\
  Default is 'middle' The placement of ticks label. Can be the middle of
  the band, or the tick position. Only used if scale is 'band'.

- tickLabelStyle `object`\
  Default is - The style applied to ticks text.

- tickMaxStep `number`\
  Default is - Maximal step between two ticks. When using time data, the
  value is assumed to be in ms. Not supported by categorical axis (band,
  points).

- tickMinStep `number`\
  Default is - Minimal step between two ticks. When using time data, the
  value is assumed to be in ms. Not supported by categorical axis (band,
  points).

- tickNumber `number`\
  Default is - The number of ticks. This number is not guaranteed. Not
  supported by categorical axis (band, points).

- tickPlacement `'end', 'extremities', 'middle', 'start'`\
  Default is 'extremities' The placement of ticks in regard to the band
  interval. Only used if scale is 'band'.

- tickSize `number`\
  Default is 6 The size of the ticks.
