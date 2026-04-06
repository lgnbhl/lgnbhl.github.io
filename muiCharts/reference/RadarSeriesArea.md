# RadarSeriesArea

<https://mui.com/x/api/charts/radar-series-area/>

## Usage

``` r
RadarSeriesArea(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- classes `object`\
  Default is NA Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- onItemClick `func`\
  Default is NA Callback fired when an area is
  clicked.Signature:function(event: React.MouseEvent\<SVGPathElement,
  MouseEvent\>, radarItemIdentifier: RadarItemIdentifier) =\> voidevent
  The event source of the callback.radarItemIdentifier The radar item
  identifier.

- seriesId `string`\
  Default is NA The id of the series to display. If undefined all series
  are displayed.
