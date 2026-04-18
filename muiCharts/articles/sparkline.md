# Sparkline Charts

## Overview

Sparkline charts provide a compact overview of data trends without
visible axes or coordinates. They are ideal for embedding inside tables,
cards, or dashboards.

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Basic Sparklines

`SparkLineChart` requires only a `data` vector of numbers. Switch from a
line to bars with `plotType = "bar"`:

``` r

# Characters per episode (in chronological order)
chars_per_ep <- starwars_films |>
  arrange(episode_id) |>
  mutate(n = lengths(characters)) |>
  pull(n)

# Line sparkline
SparkLineChart(data = chars_per_ep, height = 100)
```

``` r

# Bar sparkline
SparkLineChart(plotType = "bar", data = chars_per_ep, height = 100)
```

## Area and Curve

Fill the area below the curve with `area = TRUE`. Smooth the line with
`curve = "natural"`:

``` r

SparkLineChart(data = chars_per_ep, height = 100, area = TRUE)
```

``` r

SparkLineChart(data = chars_per_ep, height = 100, area = TRUE, curve = "natural")
```

## Tooltip and Highlight

Enable `showTooltip` and `showHighlight` for interactive sparklines:

``` r

SparkLineChart(
  data          = chars_per_ep,
  height        = 100,
  showHighlight = TRUE,
  showTooltip   = TRUE
)
```

## Y-axis Range

Fix the y-axis range so comparisons between sparklines stay fair:

``` r

# Starships per episode — natural scale
ships_per_ep <- starwars_films |>
  arrange(episode_id) |>
  mutate(n = lengths(starships)) |>
  pull(n)

SparkLineChart(data = ships_per_ep, height = 100, showTooltip = TRUE)
```

``` r

# Same data, fixed range from 0 to 20
SparkLineChart(data = ships_per_ep, height = 100, yAxis = list(min = 0, max = 20), showTooltip = TRUE)
```

## Dashboard Example

Embed sparklines alongside summary statistics inside `muiMaterial`
cards:

``` r

library(muiMaterial)

Box(
  sx = list(display = "flex", flexDirection = "column", gap = 2, padding = 2),
  Box(
    Typography(variant = "h6", "Characters per Episode"),
    Typography(variant = "h4", sum(chars_per_ep)),
    SparkLineChart(
      data = chars_per_ep,
      xAxis = list(
        data           = 1:length(chars_per_ep),
        valueFormatter = JS(sprintf(
          "function(v) { const ep = %s; return 'Ep ' + ep[v-1]; }",
          jsonlite::toJSON(starwars_films |> arrange(episode_id) |> pull(episode_id))
        ))
      ),
      height        = 60,
      area          = TRUE,
      showHighlight = TRUE,
      showTooltip   = TRUE
    )
  ),
  Box(
    Typography(variant = "h6", "Starships per Episode"),
    Typography(variant = "h4", sum(ships_per_ep)),
    SparkLineChart(
      plotType      = "bar",
      data          = ships_per_ep,
      height        = 60,
      showHighlight = TRUE,
      showTooltip   = TRUE
    )
  )
)
```

## Learn More

- [MUI Sparkline Chart
  Documentation](https://mui.com/x/react-charts/sparkline/)

See also:
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
colors and `sx` overrides.
