# ChartDataProvider

<https://mui.com/x/api/charts/chart-data-provider/>

## Usage

``` r
ChartDataProvider(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- colors `Array<string>, func`\
  Default is rainbowSurgePalette Color palette used to colorize multiple
  series.

- dataset `Array<object>`\
  Default is - An array of objects that can be used to populate series
  and axes data using their dataKey property.

- experimentalFeatures `preferStrictDomainInLineCharts?: bool`\
  Default is - Options to enable features planned for the next major.

- height `number`\
  Default is - The height of the chart in px. If not defined, it takes
  the height of the parent element.

- id `string`\
  Default is - This prop is used to help implement the accessibility
  logic. If you don't provide this prop. It falls back to a randomly
  generated id.

- localeText `object`\
  Default is - Localized text for chart components.

- margin
  `number, bottom?: number, left?: number, right?: number, top?: number `\
  Default is - The margin between the SVG and the drawing area. It's
  used for leaving some space for extra information such as the x- and
  y-axis or legend.Accepts a number to be used on all sides or an object
  with the optional properties: top, bottom, left, and right.

- series `Array<object>`\
  Default is - The array of series to display. Each type of series has
  its own specificity. Please refer to the appropriate docs page to
  learn more about it.

- skipAnimation `bool`\
  Default is - If true, animations are skipped. If unset or false, the
  animations respects the user's prefers-reduced-motion setting.

- slotProps `object`\
  Default is - The props for the slots.

- slots `object`\
  Default is - Slots to customize charts' components.See Slots API below
  for more details.

- width `number`\
  Default is - The width of the chart in px. If not defined, it takes
  the width of the parent element.
