# Highlighting

## Overview

Highlighting provides visual feedback when users interact with chart
elements. This article demonstrates highlighting options based on the
[MUI Highlighting
documentation](https://mui.com/x/react-charts/highlighting/).

## Setup

``` r

library(muiCharts)
library(dplyr)
```

Element counts per film — used throughout this vignette:

``` r

film_counts <- starwars_films |>
  mutate(
    Characters = lengths(characters),
    Planets    = lengths(planets),
    Species    = lengths(species)
  ) |>
  arrange(episode_id)
```

## Highlight Scope

The `highlightScope` prop controls how items are emphasized on hover. It
has two properties:

- `highlight` — which items to highlight: `"item"`, `"series"`, or
  `"none"`
- `fade` — which items to fade: `"global"`, `"series"`, or `"none"`

## Highlight Item

Highlight a single bar on hover, fading all others:

``` r

BarChart(
  dataset = film_counts,
  layout  = "horizontal",
  yAxis   = list(list(scaleType = "band", dataKey = "title", width = 220)),
  series  = list(
    list(dataKey = "Characters", label = "Characters", highlightScope = list(highlight = "item", fade = "global")),
    list(dataKey = "Planets",    label = "Planets",    highlightScope = list(highlight = "item", fade = "global"))
  ),
  height = 320
)
```

## Highlight Series

Highlight an entire series when hovering over any bar in it:

``` r

BarChart(
  dataset = film_counts,
  layout  = "horizontal",
  yAxis   = list(list(scaleType = "band", dataKey = "title", width = 220)),
  series  = list(
    list(dataKey = "Characters", label = "Characters", highlightScope = list(highlight = "series", fade = "global")),
    list(dataKey = "Planets",    label = "Planets",    highlightScope = list(highlight = "series", fade = "global")),
    list(dataKey = "Species",    label = "Species",    highlightScope = list(highlight = "series", fade = "global"))
  ),
  height = 320
)
```

## Faded Item Styling

Customize the appearance of faded slices in pie charts using the `faded`
property:

``` r

PieChart(
  series = list(list(
    data = starwars_people |>
      count(gender) |>
      filter(!is.na(gender)) |>
      select(label = gender, value = n),
    highlightScope = list(highlight = "item", fade = "global"),
    faded = list(innerRadius = 30, additionalRadius = -30, color = "gray")
  )),
  height = 300
)
```

## Line Chart Highlighting

Highlighting works across all chart types. Here each line series
highlights on hover:

``` r

LineChart(
  dataset = film_counts,
  xAxis  = list(list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(dataKey = "Characters", label = "Characters", highlightScope = list(highlight = "series", fade = "global")),
    list(dataKey = "Planets",    label = "Planets",    highlightScope = list(highlight = "series", fade = "global")),
    list(dataKey = "Species",    label = "Species",    highlightScope = list(highlight = "series", fade = "global"))
  ),
  height = 300
)
```

## Learn More

For more details about highlighting, visit the [MUI X Highlighting
documentation](https://mui.com/x/react-charts/highlighting/).
