# Composition

## Overview

MUI X Charts can be built using self-contained components
(e.g. `BarChart`) or composed from individual building blocks. The
composition API gives full control over layout, sub-components, and
mixed chart types.

## Setup

``` r

library(muiCharts)
library(muiMaterial)
library(dplyr)
```

## Why Composition?

Self-contained components like `BarChart` are simple to use, but the
composition API gives you:

- Full control over which sub-components are rendered
- Ability to mix chart types (lines + bars in one chart)
- Custom layout of HTML components (legend, tooltip)
- Adding reference lines, custom text, and overlays

## Basic Composition Pattern

Three key components work together:

1.  **`ChartDataProvider`** — wraps everything, provides data context
2.  **`ChartsSurface`** — renders the SVG element (plots, axes, grid)
3.  **`ChartsLegend` / `ChartsTooltip`** — HTML components placed
    outside the SVG

``` r

ChartDataProvider(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets),
      Species    = lengths(species),
      Starships  = lengths(starships)
    ) |>
    arrange(episode_id),
  height = 300,
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(type = "bar", dataKey = "Characters", label = "Characters"),
    list(type = "bar", dataKey = "Planets",    label = "Planets"),
    list(type = "bar", dataKey = "Species",    label = "Species"),
    list(type = "bar", dataKey = "Starships",  label = "Starships")
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

library(muiMaterial)

Box(
  sx = list(width = "100%", display = "flex", flexDirection = "column", alignItems = "center"),
  Typography(variant = "h6", "Star Wars Film Elements by Episode"),
  ChartDataProvider(
    dataset = starwars_films |>
      mutate(
        Characters = lengths(characters),
        Planets    = lengths(planets)
      ) |>
      arrange(episode_id),
    height = 300,
    xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
    series = list(
      list(type = "bar", dataKey = "Characters", label = "Characters"),
      list(type = "bar", dataKey = "Planets",    label = "Planets")
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

Combine bar and line plots in a single chart — bars show character
counts, the line tracks planet counts:

``` r

ChartDataProvider(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  height = 350,
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(type = "bar",  dataKey = "Characters", label = "Characters (bars)"),
    list(type = "line", dataKey = "Planets",    label = "Planets (line)")
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

Mark important thresholds with `ChartsReferenceLine`:

``` r

avg_chars <- starwars_films |>
  mutate(n = lengths(characters)) |>
  summarise(avg = round(mean(n))) |>
  pull(avg)

ChartDataProvider(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  height = 350,
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(type = "bar", dataKey = "Characters", label = "Characters")),
  ChartsTooltip(),
  ChartsSurface(
    ChartsGrid(horizontal = TRUE),
    BarPlot(),
    ChartsReferenceLine(
      y     = avg_chars,
      label = paste("Saga avg:", avg_chars),
      lineStyle = list(stroke = "red", strokeDasharray = "5 5")
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Scatter Chart Composition

Compose a scatter chart with a title and custom grid — height vs mass
for characters:

``` r

Box(
  sx = list(width = "100%", display = "flex", flexDirection = "column", alignItems = "center"),
  Typography(variant = "h6", "Star Wars Characters: Height vs Mass"),
  ChartDataProvider(
    dataset = starwars_people |>
      filter(!is.na(height), !is.na(mass), mass < 200) |>
      mutate(id = row_number()),
    height = 350,
    series = list(list(
      type        = "scatter",
      datasetKeys = list(x = "height", y = "mass"),
      label       = "Characters"
    )),
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

Compose a line chart with area fill and interactive highlighting:

``` r

ChartDataProvider(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  height = 350,
  xAxis  = list(list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(type = "line", dataKey = "Characters", label = "Characters", area = TRUE),
    list(type = "line", dataKey = "Planets",    label = "Planets",    area = TRUE)
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
  width        = 200,
  height       = 200,
  value        = 75,
  startAngle   = -110,
  endAngle     = 110,
  innerRadius  = "60%",
  outerRadius  = "100%",
  cornerRadius = "50%",
  GaugeReferenceArc(),
  GaugeValueArc(),
  GaugeValueText(text = JS("({ value, valueMax }) => `${value} / ${valueMax}`"))
)
```

## ChartsDataProvider and ChartsContainer

`ChartsDataProvider` provides data context without rendering SVG — pair
it with `ChartsWrapper` and `ChartsSurface`:

``` r

ChartsDataProvider(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  height = 300,
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(type = "bar", dataKey = "Characters", label = "Characters"),
    list(type = "bar", dataKey = "Planets",    label = "Planets")
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

`ChartsContainer` combines `ChartsDataProvider` and `ChartsSurface` —
useful when you need only SVG content:

``` r

ChartsContainer(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  height = 300,
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(type = "bar", dataKey = "Characters", label = "Characters"),
    list(type = "bar", dataKey = "Planets",    label = "Planets")
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
sibling of `ChartsSurface` inside `ChartDataProvider`:

``` r

ChartDataProvider(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  height = 320,
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(type = "bar", dataKey = "Characters", label = "Characters")),
  ChartsLabel("Characters per Film", style = list(fontSize = "0.85rem", fontWeight = "bold")),
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Charts Text

`ChartsText` renders an SVG text element inside `ChartsSurface` — useful
for annotations directly on the chart:

``` r

ChartDataProvider(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  height = 320,
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(type = "bar", dataKey = "Characters", label = "Characters")),
  ChartsSurface(
    BarPlot(),
    ChartsText(
      text  = "Characters per episode",
      x     = 5,
      y     = 15,
      style = list(fontSize = "0.75rem", fill = "#555")
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Learn More

For more details about composition, visit the [MUI X Composition
documentation](https://mui.com/x/react-charts/composition/).
