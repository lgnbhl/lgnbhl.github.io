# Axis & Grid

## Overview

MUI X Charts provide flexible axis configuration. This article
demonstrates axis customization based on the [MUI Axis
documentation](https://mui.com/x/react-charts/axis/).

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Scale Types

The `scaleType` property defines how data maps to axis positions:

- `"band"` — categorical (for bar charts)
- `"point"` — categorical (for line/scatter charts)
- `"linear"` — numeric (default for value axes)
- `"log"` — logarithmic
- `"sqrt"` — square root
- `"time"` — date/time values

### Band Scale

Discrete categories on the x-axis — ideal for bar charts:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(dataKey = "Characters", label = "Characters")),
  height = 300
)
```

### Point Scale

Point scale places each category at a discrete position — used for line
charts:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(dataKey = "Characters", label = "Characters", showMark = TRUE)),
  height = 300
)
```

### Linear Scale

Numeric x-axis with release year — spacing between points reflects
actual time gaps between films:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(
      year       = as.integer(format(release_date, "%Y")),
      Characters = lengths(characters)
    ) |>
    arrange(year),
  xAxis = list(list(
    scaleType      = "linear",
    dataKey        = "year",
    label          = "Release Year",
    valueFormatter = JS("(v) => String(v)")
  )),
  series = list(list(dataKey = "Characters", label = "Characters", showMark = TRUE)),
  height = 300
)
```

## Axis Labels

Add labels to axes using the `label` property:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  yAxis  = list(list(label = "Number of Characters")),
  series = list(list(dataKey = "Characters", label = "Characters")),
  height = 300
)
```

## Value Formatters

Customize how axis values are displayed using `valueFormatter`:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  yAxis  = list(list(
    valueFormatter = JS("(v) => `${v} characters`"),
    width = 100
  )),
  series = list(list(dataKey = "Characters", label = "Characters")),
  height = 300
)
```

## Tick Label Styling

Customize tick label appearance with `tickLabelStyle`. Rotated labels
work well for long category names:

``` r

BarChart(
  dataset = starwars_starships |>
    arrange(desc(crew)) |>
    head(6),
  xAxis  = list(list(
    scaleType      = "band",
    dataKey        = "name",
    height         = 90,
    tickLabelStyle = list(fontSize = "0.7em", angle = 90)
  )),
  yAxis = list(list(width = 60)),
  series = list(list(dataKey = "crew", label = "Crew")),
  height = 350
)
```

## Grid Lines

Add horizontal and/or vertical grid lines with the `grid` prop:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets")
  ),
  grid   = list(horizontal = TRUE, vertical = TRUE),
  height = 300
)
```

## Reference Lines

Use `ChartsReferenceLine` to mark important thresholds. Here the saga
average character count is shown:

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

## Margin Customization

Control spacing between the SVG edge and drawing area with the `margin`
prop:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(dataKey = "Characters", label = "Characters")),
  margin = list(top = 20, bottom = 60, left = 80, right = 20),
  height = 300
)
```

## Learn More

For more details about axis customization, visit the [MUI X Axis
documentation](https://mui.com/x/react-charts/axis/).
