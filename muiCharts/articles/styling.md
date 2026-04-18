# Styling

## Overview

MUI X Charts offer several ways to customize colors and appearance. This
article demonstrates styling options based on the [MUI Styling
documentation](https://mui.com/x/react-charts/styling/).

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Color Palette

Use the `colors` prop to set a custom color palette for all series:

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
  colors = c("#440154FF", "#2A788EFF", "#FDE725FF", "#35B779FF"),
  height = 300
)
```

## Per-Series Colors

Assign colors to individual series using the `color` property:

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
    list(dataKey = "Characters", label = "Characters", color = "#1976d2"),
    list(dataKey = "Planets",    label = "Planets",    color = "#d32f2f")
  ),
  height = 300
)
```

## Color Maps

The `colorMap` property on axes maps data values to colors.

### Piecewise Color Map

Define thresholds and assign different colors to value ranges — useful
for highlighting high/low values:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  yAxis  = list(list(
    colorMap = list(
      type       = "piecewise",
      thresholds = c(15, 20, 25),
      colors     = c("#4caf50", "#ff9800", "#f44336", "#9c27b0")
    )
  )),
  series = list(list(dataKey = "Characters", label = "Characters")),
  height = 300
)
```

### Continuous Color Map

Map a value range to a color gradient — here characters are colored by
birth year:

``` r

ScatterChart(
  height  = 350,
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
    colorMap = list(
      type  = "continuous",
      min   = 0,
      max   = 100,
      color = c("#d01c8b", "#f1b6da", "#b8e186", "#4dac26")
    )
  ))
)
```

### Ordinal Color Map

Map categorical values to specific colors — top 3 species by membership
each get a distinct color:

``` r

BarChart(
  dataset = starwars_species |>
    mutate(n = lengths(people)) |>
    arrange(desc(n)) |>
    head(3),
  xAxis  = list(list(
    scaleType = "band",
    dataKey   = "name",
    colorMap  = list(
      type   = "ordinal",
      values = c("Human", "Droid", "Naboo"),
      colors = c("#1976d2", "#ff9800", "#4caf50")
    )
  )),
  series = list(list(dataKey = "n", label = "Members")),
  height = 300
)
```

## The sx Prop

Use the `sx` prop for CSS overrides on chart elements using MUI CSS
class selectors — here rounded bars and a subtle axis line:

``` r

BarChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(dataKey = "Characters", label = "Characters")),
  sx = list(
    "& .MuiBarElement-root" = list(rx = 8),
    "& .MuiChartsAxis-line" = list(stroke = "#999", strokeWidth = 2)
  ),
  height = 300
)
```

## Line Chart Styling

Customize line and mark appearance with `sx`:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets",    label = "Planets")
  ),
  sx = list(
    "& .MuiLineElement-root"  = list(strokeWidth = 3, strokeDasharray = "5 5")
  ),
  height = 300
)
```

## Pie Chart Styling

Combine `innerRadius`, `paddingAngle`, and `cornerRadius` for a polished
donut look:

``` r

PieChart(
  series = list(list(
    data = starwars_people |>
      count(gender) |>
      filter(!is.na(gender)) |>
      select(label = gender, value = n),
    innerRadius  = 50,
    paddingAngle = 3,
    cornerRadius = 5
  )),
  height = 300
)
```

## Dark/Light Mode Colors

Pass a JavaScript function to `color` that adapts to the current theme
mode:

``` r

SparkLineChart(
  data   = starwars_films |> arrange(episode_id) |> mutate(n = lengths(characters)) |> pull(n),
  height = 100,
  color  = JS("(mode) => (mode === 'light' ? '#1976d2' : '#90caf9')"),
  area   = TRUE,
  showHighlight = TRUE,
  showTooltip = TRUE
)
```

## Dashboard Example

Combine `ThemeProvider` from muiMaterial with charts for a cohesive
dashboard. Define palette colors in R variables and reference them in
both the theme and chart:

``` r

library(muiMaterial)

muiMaterialPage(
  CssBaseline(),
  {
    # Define theme colors once in R; both ThemeProvider and chart use the same values
    primaryColor <- "#9819d2"
    secondaryColor <- "#dc004e"

    ThemeProvider(
      theme = list(
        palette = list(
          primary = list(main = primaryColor),
          secondary = list(main = secondaryColor)
        )
      ),
      Box(
        sx = list(p = 3, bgcolor = "background.paper"),
        Typography("Star Wars Characters by Episode", variant = "h5", sx = list(mb = 2)),
        Card(
          CardContent(
            BarChart(
              dataset = starwars_films |>
                mutate(Characters = lengths(characters)) |>
                arrange(episode_id),
              xAxis = list(
                list(scaleType = "band", dataKey = "episode_id", label = "Episode")
              ),
              series = list(
                list(dataKey = "Characters", label = "Characters", color = primaryColor)
              ),
              height = 300
            )
          )
        )
      )
    )
  }
)
```

Define palette colors as R variables (e.g., `primaryColor`), then pass
them to both `ThemeProvider`’s palette and the chart’s `color` prop.
This keeps colors in sync—when you edit `primaryColor`, it updates
everywhere automatically. The dashboard layout is built with muiMaterial
components (`Box`, `Card`, `Typography`) for visual consistency.

## Learn More

For more details about styling, visit the [MUI X Styling
documentation](https://mui.com/x/react-charts/styling/).
