# Tooltip

## Overview

Tooltips provide extra data when hovering over chart elements. This
article demonstrates tooltip customization based on the [MUI Tooltip
documentation](https://mui.com/x/react-charts/tooltip/).

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

## Tooltip Triggers

Tooltips can be triggered in two ways:

- `"item"` — data about the single hovered element (default for scatter
  and pie)
- `"axis"` — data about all series at the hovered axis position (default
  for bar and line)

### Item Trigger

``` r

BarChart(
  dataset = film_counts,
  layout  = "horizontal",
  yAxis   = list(list(scaleType = "band", dataKey = "title", width = 220)),
  series  = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets")
  ),
  slotProps = list(tooltip = list(trigger = "item")),
  height = 320
)
```

### Axis Trigger

``` r

BarChart(
  dataset = film_counts,
  layout  = "horizontal",
  yAxis   = list(list(scaleType = "band", dataKey = "title", width = 220)),
  series  = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets")
  ),
  slotProps = list(tooltip = list(trigger = "axis")),
  height = 320
)
```

## Disabling the Tooltip

Set `trigger = "none"` to completely disable the tooltip:

``` r

BarChart(
  dataset = film_counts,
  layout  = "horizontal",
  yAxis   = list(list(scaleType = "band", dataKey = "title", width = 220)),
  series  = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets")
  ),
  slotProps = list(tooltip = list(trigger = "none")),
  height = 320
)
```

## Custom Value Formatters

Use `valueFormatter` in each series to control the text shown in the
tooltip:

``` r

BarChart(
  dataset = film_counts,
  layout  = "horizontal",
  yAxis   = list(list(scaleType = "band", dataKey = "title", width = 220)),
  series  = list(
    list(
      dataKey        = "Characters",
      label          = "Characters",
      valueFormatter = JS("(v) => `${v} characters`")
    ),
    list(
      dataKey        = "Planets",
      label          = "Planets",
      valueFormatter = JS("(v) => `${v} planets`")
    )
  ),
  height = 320
)
```

## Learn More

For more details about tooltip customization, visit the [MUI X Tooltip
documentation](https://mui.com/x/react-charts/tooltip/).
