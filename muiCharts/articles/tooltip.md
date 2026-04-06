# Tooltip

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

Tooltips provide extra data when hovering over chart elements. This
article demonstrates tooltip customization based on the [MUI Tooltip
documentation](https://mui.com/x/react-charts/tooltip/).

## Tooltip Triggers

Tooltips can be triggered in two ways:

- `"item"` — displays data about the hovered element (default for
  scatter and pie charts)
- `"axis"` — displays data about all items at the current axis position
  (default for bar and line charts)

### Item Trigger

``` r

starwars_gender <- dplyr::starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n) |>
  mutate(release = c(1977, 2002, 1983, 2005, 1980, 2015, 1999)) |>
  arrange(release)

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female")
  ),
  slotProps = list(
    tooltip = list(trigger = "item")
  ),
  height = 300
)
```

### Axis Trigger

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female")
  ),
  slotProps = list(
    tooltip = list(trigger = "axis")
  ),
  height = 300
)
```

## Disabling Tooltip

Set `trigger = "none"` to completely disable the tooltip:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female")
  ),
  slotProps = list(
    tooltip = list(trigger = "none")
  ),
  height = 300
)
```

## Custom Value Formatters

Use `valueFormatter` in series or axis to control what appears in the
tooltip:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em"),
      valueFormatter = JS("(value) => `Movie: ${value}`")
    )
  ),
  series = list(
    list(
      dataKey = "male",
      label = "Male",
      valueFormatter = JS("(value) => `${value} characters`")
    ),
    list(
      dataKey = "female",
      label = "Female",
      valueFormatter = JS("(value) => `${value} characters`")
    )
  ),
  height = 300
)
```

## Tooltip in Composition

When using the composition API, add `ChartsTooltip` explicitly inside
`ChartDataProvider`:

``` r

library(muiMaterial)
#> 
#> Attaching package: 'muiMaterial'
#> The following object is masked from 'package:muiCharts':
#> 
#>     Toolbar

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male"),
    list(type = "bar", dataKey = "female", label = "Female")
  ),
  ChartsTooltip(trigger = "axis"),
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Custom Tooltip Layout

`ChartsTooltipPaper`, `ChartsTooltipTable`, `ChartsTooltipRow`, and
`ChartsTooltipCell` are the building blocks of the default tooltip.
Export them to build fully custom tooltip content by passing a
JavaScript function to the `slots` prop:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male"),
    list(type = "bar", dataKey = "female", label = "Female")
  ),
  ChartsTooltip(
    trigger = "axis",
    slots = list(
      axisContent = JS("function CustomAxisContent(props) {
        const { series, dataIndex } = props;
        return React.createElement(
          MuiXCharts.ChartsTooltipPaper, null,
          React.createElement(
            MuiXCharts.ChartsTooltipTable, null,
            series.map(function(s) {
              return React.createElement(
                MuiXCharts.ChartsTooltipRow, { key: s.id },
                React.createElement(MuiXCharts.ChartsTooltipCell,
                  { sx: { fontWeight: 'bold' } }, s.label),
                React.createElement(MuiXCharts.ChartsTooltipCell, null,
                  s.data[dataIndex])
              );
            })
          )
        );
      }")
    )
  ),
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Tooltip Content Components

`ChartsAxisTooltipContent` and `ChartsItemTooltipContent` render the
default axis and item tooltip content. Reference them in `slots` to
extend or replace the default renderer:

``` r

ChartsAxisTooltipContent()
ChartsItemTooltipContent()
```

`ChartsTooltipContainer` wraps all tooltip content. Use it inside a
custom `axisContent` slot to build a completely custom tooltip:

``` r

ChartsTooltipContainer()

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male"),
    list(type = "bar", dataKey = "female", label = "Female")
  ),
  ChartsTooltip(
    trigger = "axis",
    slots = list(
      axisContent = JS("function(props) {
        const { series, dataIndex } = props;
        return React.createElement(
          MuiXCharts.ChartsTooltipContainer, null,
          series.map(function(s) {
            return React.createElement(
              'div', { key: s.id, style: { padding: '4px 8px' } },
              s.label + ': ' + s.data[dataIndex]
            );
          })
        );
      }")
    )
  ),
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Learn More

For more details about tooltip customization, visit the [MUI X Tooltip
documentation](https://mui.com/x/react-charts/tooltip/).
