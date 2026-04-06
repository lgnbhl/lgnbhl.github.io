# Composition

``` r

library(muiCharts)
library(muiMaterial)
library(dplyr)
library(tidyr)
```

MUI X Charts can be built using self-contained components
(e.g. `BarChart`) or composed from individual building blocks. This
article demonstrates the composition API based on the [MUI Composition
documentation](https://mui.com/x/react-charts/composition/).

## Why Composition?

Self-contained components like `BarChart` are simple to use, but the
composition API gives you:

- Full control over which sub-components are rendered
- Ability to mix chart types (lines + bars in one chart)
- Custom layout of HTML components (legend, tooltip)
- Adding reference lines, custom text, and overlays

## Basic Composition Pattern

The composition pattern uses three key components:

1.  **`ChartDataProvider`** — wraps everything, provides data context
2.  **`ChartsSurface`** — renders the SVG element (plots, axes, grid)
3.  **`ChartsLegend` / `ChartsTooltip`** — HTML components placed
    outside the SVG

``` r

starwars_gender <- dplyr::starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n) |>
  mutate(release = c(1977, 2002, 1983, 2005, 1980, 2015, 1999)) |>
  arrange(release)

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
    list(type = "bar", dataKey = "female", label = "Female"),
    list(type = "bar", dataKey = "hermaphroditic", label = "Hermaphroditic"),
    list(type = "bar", dataKey = "none", label = "None")
  ),
  ChartsLegend(),
  ChartsTooltip(),
  ChartsSurface(
    ChartsGrid(horizontal = TRUE),
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Adding a Title

Use `muiMaterial` components for custom titles and layout:

``` r

Box(
  sx = list(
    width = "100%",
    display = "flex",
    flexDirection = "column",
    alignItems = "center"
  ),
  Typography(variant = "h6", "Star Wars Characters by Gender"),
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
    ChartsLegend(),
    ChartsTooltip(),
    ChartsSurface(
      ChartsGrid(horizontal = TRUE),
      BarPlot(),
      ChartsXAxis(),
      ChartsYAxis()
    )
  )
)
```

## Mixed Chart Types

Combine different plot types in a single chart. Use `type` in the series
to specify plot kinds:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 350,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male (bars)"),
    list(type = "line", dataKey = "female", label = "Female (line)")
  ),
  ChartsLegend(),
  ChartsTooltip(),
  ChartsSurface(
    ChartsGrid(horizontal = TRUE),
    BarPlot(),
    LinePlot(),
    MarkPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Reference Lines

Add reference lines to mark important thresholds:

``` r

avg_male <- round(mean(starwars_gender$male, na.rm = TRUE))

ChartDataProvider(
  dataset = starwars_gender,
  height = 350,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male")
  ),
  ChartsTooltip(),
  ChartsSurface(
    ChartsGrid(horizontal = TRUE),
    BarPlot(),
    ChartsReferenceLine(
      y = avg_male,
      label = paste("Average:", avg_male),
      lineStyle = list(stroke = "red", strokeDasharray = "5 5")
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Scatter Chart Composition

Compose a scatter chart with a title and custom grid:

``` r

starwars_scatter <- starwars |>
  filter(!is.na(height), !is.na(mass), mass < 200) |>
  select(name, height, mass) |>
  mutate(id = row_number())

Box(
  sx = list(
    width = "100%",
    display = "flex",
    flexDirection = "column",
    alignItems = "center"
  ),
  Typography(variant = "h6", "Star Wars Characters: Height vs Mass"),
  ChartDataProvider(
    dataset = starwars_scatter,
    height = 350,
    series = list(
      list(
        type = "scatter",
        datasetKeys = list(x = "height", y = "mass"),
        label = "Characters"
      )
    ),
    xAxis = list(list(label = "Height (cm)")),
    yAxis = list(list(label = "Mass (kg)")),
    ChartsLegend(),
    ChartsTooltip(trigger = "item"),
    ChartsSurface(
      ChartsGrid(horizontal = TRUE, vertical = TRUE),
      ScatterPlot(),
      ChartsXAxis(),
      ChartsYAxis()
    )
  )
)
```

## Line Chart Composition

Compose a line chart with marks, area, and highlighted points:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 350,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "line", dataKey = "male", label = "Male", area = TRUE),
    list(type = "line", dataKey = "female", label = "Female", area = TRUE)
  ),
  ChartsLegend(),
  ChartsTooltip(trigger = "axis"),
  ChartsSurface(
    ChartsGrid(horizontal = TRUE),
    AreaPlot(),
    LinePlot(),
    MarkPlot(),
    LineHighlightPlot(),
    ChartsAxisHighlight(x = "line"),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Gauge Composition

Compose a gauge from individual sub-components for full control:

``` r

GaugeContainer(
  width = 200,
  height = 200,
  value = 75,
  startAngle = -110,
  endAngle = 110,
  innerRadius = "60%",
  outerRadius = "100%",
  cornerRadius = "50%",
  GaugeReferenceArc(),
  GaugeValueArc(),
  GaugeValueText(
    text = JS("({ value, valueMax }) => `${value} / ${valueMax}`")
  )
)
```

## ChartsContainer and ChartsDataProvider

`ChartsContainer` and `ChartsDataProvider` are the v8 equivalents of
`ChartContainer` and `ChartDataProvider`. `ChartsDataProvider` provides
data context without rendering SVG — pair it with `ChartsWrapper` for
the HTML layer and `ChartsSurface` for the SVG:

``` r

ChartsDataProvider(
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
  ChartsWrapper(
    ChartsLegend(),
    ChartsTooltip(),
    ChartsSurface(
      ChartsGrid(horizontal = TRUE),
      BarPlot(),
      ChartsXAxis(),
      ChartsYAxis()
    )
  )
)
```

`ChartsContainer` combines `ChartsDataProvider` and `ChartsSurface` into
a single SVG-based container. Use it when you only need SVG content
without an outer HTML wrapper:

``` r

ChartsContainer(
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
  ChartsGrid(horizontal = TRUE),
  BarPlot(),
  ChartsAxisHighlight(x = "band"),
  ChartsXAxis(),
  ChartsYAxis()
)
```

## Inline Labels

`ChartsLabel` renders a styled HTML `<span>` element. Place it as a
sibling of `ChartsSurface` (outside the SVG) inside `ChartDataProvider`,
and pass the text as a child argument:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 320,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male")
  ),
  ChartsLabel(
    "Star Wars Characters",
    style = list(fontSize = "0.85rem", fontWeight = "bold")
  ),
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Charts Text

`ChartsText` renders an SVG text element inside `ChartsSurface`. Use it
to add text annotations directly to the chart:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 320,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male")
  ),
  ChartsSurface(
    BarPlot(),
    ChartsText(
      text = "Male characters per film",
      x = 5,
      y = 15,
      style = list(fontSize = "0.75rem", fill = "#555")
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Clip Path

`ChartsClipPath` adds an SVG `<clipPath>` definition inside
`ChartsSurface` to restrict plot rendering to the drawing area:

``` r

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
  ChartsSurface(
    ChartsClipPath(id = "drawing-area-clip"),
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Learn More

For more details about composition, visit the [MUI X Composition
documentation](https://mui.com/x/react-charts/composition/).
