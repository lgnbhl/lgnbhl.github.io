# PieChart

<https://mui.com/x/api/charts/pie-chart/>

## Usage

``` r
PieChart(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- series `Array<object>`\
  Default is - The series to display in the pie chart. An array of
  PieSeries objects.

- colors `Array<string>, func`\
  Default is rainbowSurgePalette Color palette used to colorize multiple
  series.

- dataset `Array<object>`\
  Default is - An array of objects that can be used to populate series
  and axes data using their dataKey property.

- height `number`\
  Default is - The height of the chart in px. If not defined, it takes
  the height of the parent element.

- hideLegend `bool`\
  Default is - If true, the legend is not rendered.

- highlightedItem `dataIndex?: number, seriesId: number, string`\
  Default is - The highlighted item. Used when the highlight is
  controlled.

- id `string`\
  Default is - This prop is used to help implement the accessibility
  logic. If you don't provide this prop. It falls back to a randomly
  generated id.

- loading `bool`\
  Default is FALSE If true, a loading overlay is displayed.

- localeText `object`\
  Default is - Localized text for chart components.

- margin
  `number, bottom?: number, left?: number, right?: number, top?: number `\
  Default is - The margin between the SVG and the drawing area. It's
  used for leaving some space for extra information such as the x- and
  y-axis or legend.Accepts a number to be used on all sides or an object
  with the optional properties: top, bottom, left, and right.

- onHighlightChange `func`\
  Default is - The callback fired when the highlighted item
  changes.Signature:function(highlightedItem: HighlightItemData \| null)
  =\> voidhighlightedItem The newly highlighted item.

- onItemClick `func`\
  Default is - Callback fired when a pie arc is clicked.

- showToolbar `bool`\
  Default is FALSE If true, shows the default chart toolbar.

- skipAnimation `bool`\
  Default is - If true, animations are skipped. If unset or false, the
  animations respects the user's prefers-reduced-motion setting.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.

- width `number`\
  Default is - The width of the chart in px. If not defined, it takes
  the width of the parent element.
