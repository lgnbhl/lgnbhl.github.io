# RadarChart

<https://mui.com/x/api/charts/radar-chart/>

## Usage

``` r
RadarChart(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- radar
  `labelFormatter?: func, labelGap?: number, max?: number, metrics: Array<string>, Array< max?: number, min?: number, name: string >, startAngle?: number`\
  Default is - The configuration of the radar scales.

- series `Array<object>`\
  Default is - The series to display in the bar chart. An array of
  RadarSeries objects.

- colors `Array<string>, func`\
  Default is rainbowSurgePalette Color palette used to colorize multiple
  series.

- disableAxisListener `bool`\
  Default is FALSE If true, the charts will not listen to the mouse move
  event. It might break interactive features, but will improve
  performance.

- divisions `number`\
  Default is 5 The number of divisions in the radar grid.

- height `number`\
  Default is - The height of the chart in px. If not defined, it takes
  the height of the parent element.

- hideLegend `bool`\
  Default is - If true, the legend is not rendered.

- highlight `'axis', 'none', 'series'`\
  Default is 'axis' Indicates if the chart should highlight items per
  axis or per series.

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

- onAreaClick `func`\
  Default is - Callback fired when an area is
  clicked.Signature:function(event: React.MouseEvent\<SVGPathElement,
  MouseEvent\>, radarItemIdentifier: RadarItemIdentifier) =\> voidevent
  The event source of the callback.radarItemIdentifier The radar item
  identifier.

- onAxisClick `func`\
  Default is - The function called for onClick events. The second
  argument contains information about all line/bar elements at the
  current mouse position.Signature:function(event: MouseEvent, data:
  null \| ChartsAxisData) =\> voidevent The mouse event recorded on the
  ![](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=) element.data The data
  about the clicked axis and items associated with it.

- onHighlightChange `func`\
  Default is - The callback fired when the highlighted item
  changes.Signature:function(highlightedItem: HighlightItemData \| null)
  =\> voidhighlightedItem The newly highlighted item.

- onMarkClick `func`\
  Default is - Callback fired when a mark is
  clicked.Signature:function(event: React.MouseEvent\<SVGPathElement,
  MouseEvent\>, radarItemIdentifier: RadarItemIdentifier) =\> voidevent
  The event source of the callback.radarItemIdentifier The radar item
  identifier.

- shape `'circular', 'sharp'`\
  Default is 'sharp' The grid shape.

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

- stripeColor `func`\
  Default is (index) =\> index % 2 === 1 ? (theme.vars \|\|
  theme).palette.text.secondary : 'none' Get stripe fill color. Set it
  to null to remove stripesSignature:function(index: number) =\>
  stringindex The index of the stripe band.

- width `number`\
  Default is - The width of the chart in px. If not defined, it takes
  the width of the parent element.
