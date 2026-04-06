# BarChart

<https://mui.com/x/api/charts/bar-chart/>

## Usage

``` r
BarChart(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- series `Array<object>`\
  Default is - The series to display in the bar chart. An array of
  BarSeries objects.

- axisHighlight
  `x?: 'band', 'line', 'none', y?: 'band', 'line', 'none'`\
  Default is - The configuration of axes highlight. Default is set to
  'band' in the bar direction. Depends on layout prop.See highlighting
  docs for more details.

- borderRadius `number`\
  Default is - Defines the border radius of the bar element.

- brushConfig
  `enabled?: bool, preventHighlight?: bool, preventTooltip?: bool`\
  Default is - Configuration for the brush interaction.

- colors `Array<string>, func`\
  Default is rainbowSurgePalette Color palette used to colorize multiple
  series.

- dataset `Array<object>`\
  Default is - An array of objects that can be used to populate series
  and axes data using their dataKey property.

- disableAxisListener `bool`\
  Default is FALSE If true, the charts will not listen to the mouse move
  event. It might break interactive features, but will improve
  performance.

- grid `horizontal?: bool, vertical?: bool`\
  Default is - Option to display a cartesian grid in the background.

- height `number`\
  Default is - The height of the chart in px. If not defined, it takes
  the height of the parent element.

- hideLegend `bool`\
  Default is - If true, the legend is not rendered.

- highlightedAxis `Array< axisId: number, string, dataIndex: number >`\
  Default is - The controlled axis highlight. Identified by the axis id,
  and data index.

- highlightedItem `dataIndex?: number, seriesId: number, string`\
  Default is - The highlighted item. Used when the highlight is
  controlled.

- id `string`\
  Default is - This prop is used to help implement the accessibility
  logic. If you don't provide this prop. It falls back to a randomly
  generated id.

- layout `'horizontal', 'vertical'`\
  Default is 'vertical' The direction of the bar elements.

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

- onHighlightedAxisChange `func`\
  Default is - The function called when the pointer position corresponds
  to a new axis data item. This update can either be caused by a pointer
  movement, or an axis update. In case of multiple axes, the function is
  called if at least one axis is updated. The argument contains the
  identifier for all axes with a data
  property.Signature:function(axisItems: Array) =\> voidaxisItems The
  array of axes item identifiers.

- onItemClick `func`\
  Default is - Callback fired when a bar item is
  clicked.Signature:function(event: React.MouseEvent\<SVGElement,
  MouseEvent\>, barItemIdentifier: BarItemIdentifier) =\> voidevent The
  event source of the callback.barItemIdentifier The bar item
  identifier.

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

- xAxis
  `Array< axis?: 'x', barGapRatio?: number, categoryGapRatio?: number, classes?: object, colorMap?: colors: Array<string>, type: 'ordinal', unknownColor?: string, values?: Array<Date, number, string> , color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, groups?: Array< getValue: func, tickLabelStyle?: object, tickSize?: number >, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'band', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: colors: Array<string>, type: 'ordinal', unknownColor?: string, values?: Array<Date, number, string> , color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, groups?: Array< getValue: func, tickLabelStyle?: object, tickSize?: number >, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'point', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'log', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , constant?: number, data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'symlog', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'pow', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'sqrt', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, valueOf: func , min?: number, valueOf: func , offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'time', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, valueOf: func , min?: number, valueOf: func , offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'utc', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func , axis?: 'x', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, height?: number, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'bottom', 'none', 'top', reverse?: bool, scaleType?: 'linear', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelMinGap?: number, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func >`\
  Default is - The configuration of the x-axes. If not provided, a
  default axis config is used. An array of AxisConfig objects.

- yAxis
  `Array< axis?: 'y', barGapRatio?: number, categoryGapRatio?: number, classes?: object, colorMap?: colors: Array<string>, type: 'ordinal', unknownColor?: string, values?: Array<Date, number, string> , color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, groups?: Array< getValue: func, tickLabelStyle?: object, tickSize?: number >, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'band', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: colors: Array<string>, type: 'ordinal', unknownColor?: string, values?: Array<Date, number, string> , color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, groups?: Array< getValue: func, tickLabelStyle?: object, tickSize?: number >, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'point', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'log', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , constant?: number, data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'symlog', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'pow', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'sqrt', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, valueOf: func , min?: number, valueOf: func , offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'time', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, valueOf: func , min?: number, valueOf: func , offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'utc', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number , axis?: 'y', classes?: object, colorMap?: color: Array<string>, func, max?: Date, number, min?: Date, number, type: 'continuous' , colors: Array<string>, thresholds: Array<Date, number>, type: 'piecewise' , data?: array, dataKey?: string, disableLine?: bool, disableTicks?: bool, domainLimit?: 'nice', 'strict', func, hideTooltip?: bool, id?: number, string, ignoreTooltip?: bool, label?: string, labelStyle?: object, max?: number, min?: number, offset?: number, position?: 'left', 'none', 'right', reverse?: bool, scaleType?: 'linear', slotProps?: object, slots?: object, sx?: Array<func, object, bool>, func, object, tickInterval?: 'auto', array, func, tickLabelInterval?: 'auto', func, tickLabelPlacement?: 'middle', 'tick', tickLabelStyle?: object, tickMaxStep?: number, tickMinStep?: number, tickNumber?: number, tickPlacement?: 'end', 'extremities', 'middle', 'start', tickSize?: number, valueFormatter?: func, width?: number >`\
  Default is - The configuration of the y-axes. If not provided, a
  default axis config is used. An array of AxisConfig objects.
