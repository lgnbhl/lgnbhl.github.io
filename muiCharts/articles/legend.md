# Legend

## Overview

The legend identifies each series displayed in a chart. This article
demonstrates legend customization based on the [MUI Legend
documentation](https://mui.com/x/react-charts/legend/).

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Default Legend

By default, a legend is displayed above the chart showing all series:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets),
      Species    = lengths(species),
      Starships  = lengths(starships)
    ) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets"),
    list(dataKey = "Species",    label = "Species"),
    list(dataKey = "Starships",  label = "Starships")
  ),
  height = 300
)
```

## Hiding the Legend

Use `hideLegend = TRUE` to remove the legend entirely:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  xAxis      = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series     = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets")
  ),
  hideLegend = TRUE,
  height     = 300
)
```

## Legend Position

Position the legend using `slotProps`. The argument `horizontal` accepts
`"start"`, `"middle"`, or `"end"`, while `vertical` accepts `"top"`,
`"middle"`, or `"bottom"`:

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
  slotProps = list(legend = list(
    position = list(vertical = "bottom", horizontal = "middle")
  )),
  height = 300
)
```

## Legend Direction

Change the legend layout from horizontal (default) to vertical:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets),
      Species    = lengths(species),
      Starships  = lengths(starships)
    ) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets"),
    list(dataKey = "Species",    label = "Species"),
    list(dataKey = "Starships",  label = "Starships")
  ),
  slotProps = list(legend = list(direction = "vertical")),
  height = 350
)
```

## Pie Chart Legend

Pie charts automatically show legend entries for each slice:

``` r

PieChart(
  series = list(list(
    data = starwars_people |>
      count(gender) |>
      filter(!is.na(gender)) |>
      select(label = gender, value = n)
  )),
  height = 300
)
```

## Color Legends

For charts using `colorMap`, use `ContinuousColorLegend` or
`PiecewiseColorLegend` to explain the color scale.

### Continuous Color Legend

Characters plotted by height and mass, colored by birth year:

``` r

ScatterChart(
  height  = 380,
  dataset = starwars_people |>
    filter(!is.na(height), !is.na(mass), !is.na(birth_year), mass < 200) |>
    mutate(id = row_number()),
  series  = list(list(
    datasetKeys = list(x = "height", y = "mass", z = "birth_year"),
    label = "Characters"
  )),
  xAxis  = list(list(label = "Height (cm)")),
  yAxis  = list(list(label = "Mass (kg)")),
  zAxis  = list(list(
    colorMap = list(type = "continuous", min = 0, max = 100, color = c("#d01c8b", "#4dac26"))
  ))
)
```

## Legend in Composition

When using composition, place `ChartsLegend` inside `ChartDataProvider`
but **outside** `ChartsSurface` (the legend is HTML, not SVG):

``` r

library(muiMaterial)

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
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Label Marks

`ChartsLabelMark` renders the small colored shape that appears next to a
series name. Use it in custom legend layouts:

``` r

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
  Box(
    sx = list(display = "flex", gap = "16px", padding = "8px"),
    Box(
      sx = list(display = "flex", alignItems = "center", gap = "4px"),
      ChartsLabelMark(type = "square", color = "#1976d2"),
      Typography(variant = "body2", "Characters")
    ),
    Box(
      sx = list(display = "flex", alignItems = "center", gap = "4px"),
      ChartsLabelMark(type = "square", color = "#d32f2f"),
      Typography(variant = "body2", "Planets")
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

For more details about legend customization, visit the [MUI X Legend
documentation](https://mui.com/x/react-charts/legend/).
