# Highlighting

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

Highlighting provides visual feedback when users interact with chart
elements. This article demonstrates highlighting options based on the
[MUI Highlighting
documentation](https://mui.com/x/react-charts/highlighting/).

## Highlight Scope

The `highlightScope` prop controls how items are emphasized on hover. It
has two properties:

- `highlight` — which items to highlight: `"item"`, `"series"`, or
  `"none"`
- `fade` — which items to fade: `"global"`, `"series"`, or `"none"`

## Highlight Item

Highlight a single item on hover, fading all others:

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
    list(
      dataKey = "male",
      label = "Male",
      highlightScope = list(highlight = "item", fade = "global")
    ),
    list(
      dataKey = "female",
      label = "Female",
      highlightScope = list(highlight = "item", fade = "global")
    )
  ),
  height = 300
)
```

## Highlight Series

Highlight an entire series when hovering over any item in it:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(
      dataKey = "male",
      label = "Male",
      highlightScope = list(highlight = "series", fade = "global")
    ),
    list(
      dataKey = "female",
      label = "Female",
      highlightScope = list(highlight = "series", fade = "global")
    ),
    list(
      dataKey = "hermaphroditic",
      label = "Hermaphroditic",
      highlightScope = list(highlight = "series", fade = "global")
    )
  ),
  height = 300
)
```

## Faded Item Styling

Customize the appearance of faded items using the `faded` property in
pie charts:

``` r

df <- starwars |>
  count(sex) |>
  filter(!is.na(sex)) |>
  select(label = sex, value = n)

PieChart(
  series = list(
    list(
      data = df,
      highlightScope = list(highlight = "item", fade = "global"),
      faded = list(
        innerRadius = 30,
        additionalRadius = -30,
        color = "gray"
      )
    )
  ),
  height = 300
)
```

## Line Chart Highlighting

Highlighting works with line charts too:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "point", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(
      dataKey = "male",
      label = "Male",
      highlightScope = list(highlight = "series", fade = "global")
    ),
    list(
      dataKey = "female",
      label = "Female",
      highlightScope = list(highlight = "series", fade = "global")
    )
  ),
  height = 300
)
```

## Scatter Chart Highlighting

Scatter charts also support highlighting by series:

``` r

df_male <- starwars |>
  filter(sex == "male", !is.na(mass), !is.na(height)) |>
  select(x = mass, y = height)

df_female <- starwars |>
  filter(sex == "female", !is.na(mass), !is.na(height)) |>
  select(x = mass, y = height)

ScatterChart(
  series = list(
    list(
      data = df_male,
      label = "Male",
      highlightScope = list(highlight = "series", fade = "global")
    ),
    list(
      data = df_female,
      label = "Female",
      highlightScope = list(highlight = "series", fade = "global")
    )
  ),
  xAxis = list(list(min = 0, label = "Mass (kg)")),
  yAxis = list(list(min = 0, label = "Height (cm)")),
  height = 350
)
```

## Axis Highlight in Composition

When using composition, add `ChartsAxisHighlight` to display a highlight
band or line on hover:

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
  ChartsTooltip(trigger = "axis"),
  ChartsSurface(
    BarPlot(),
    ChartsAxisHighlight(x = "band"),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Custom Axis Highlight Path

`ChartsAxisHighlightPath` is the SVG path element rendered by
`ChartsAxisHighlight`. Pass it via `slots` to apply custom styles:

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
  ChartsTooltip(trigger = "axis"),
  ChartsSurface(
    BarPlot(),
    ChartsAxisHighlight(
      x = "band",
      slots = list(axisHighlight = JS("
        React.forwardRef(function StyledHighlight(props, ref) {
          return React.createElement(
            MuiXCharts.ChartsAxisHighlightPath,
            Object.assign({}, props, {
              ref: ref,
              style: { fill: 'rgba(255, 200, 0, 0.2)', stroke: 'orange', strokeWidth: 1 }
            })
          );
        })
      "))
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Focused Elements in Composition

`FocusedBar`, `FocusedLineMark`, and `FocusedScatterMark` render the
visual indicator when a chart element receives keyboard focus. Add them
inside `ChartsSurface` when building charts with the composition API:

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
  ChartsTooltip(),
  ChartsSurface(
    BarPlot(),
    FocusedBar(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

For line charts, use `FocusedLineMark`:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(scaleType = "point", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(type = "line", dataKey = "male", label = "Male"),
    list(type = "line", dataKey = "female", label = "Female")
  ),
  ChartsTooltip(),
  ChartsSurface(
    LinePlot(),
    MarkPlot(),
    FocusedLineMark(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

For scatter charts, use `FocusedScatterMark`:

``` r

starwars_scatter <- starwars |>
  filter(!is.na(height), !is.na(mass), mass < 200) |>
  select(height, mass) |>
  mutate(id = row_number())

ChartDataProvider(
  dataset = starwars_scatter,
  height = 300,
  series = list(
    list(type = "scatter", datasetKeys = list(x = "height", y = "mass"), label = "Characters")
  ),
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)")),
  ChartsTooltip(trigger = "item"),
  ChartsSurface(
    ScatterPlot(),
    FocusedScatterMark(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Line Highlight Element

`LineHighlightElement` is the component rendered by `LineHighlightPlot`
for each hover indicator on a line chart. Call it to inspect its props:

``` r

LineHighlightElement()
```

Use `slotProps` on `LineHighlightPlot` to configure the highlight circle
size:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(scaleType = "point", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(type = "line", dataKey = "male", label = "Male"),
    list(type = "line", dataKey = "female", label = "Female")
  ),
  ChartsTooltip(trigger = "axis"),
  ChartsSurface(
    LinePlot(),
    MarkPlot(),
    LineHighlightPlot(slotProps = list(highlight = list(r = 7))),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Learn More

For more details about highlighting, visit the [MUI X Highlighting
documentation](https://mui.com/x/react-charts/highlighting/).
