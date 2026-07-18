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

# Define theme colors once in R; both ThemeProvider and chart use the same values
primaryColor <- "#9819d2"

muiMaterialPage(
  CssBaseline(),
  ThemeProvider(
    theme = list(
      palette = list(
        primary = list(main = primaryColor)
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
)
```

Charts share muiMaterial’s theme: a `ThemeProvider` rendered by
muiMaterial flows into the chart, so chart text, axes, tooltips, and
surfaces follow the active theme (including dark/light mode—see below).
Series colors are the exception: MUI X Charts draws series from its own
categorical palette rather than `theme.palette.primary`, so set a series
`color` explicitly when you want it to match a theme color. Defining the
value once as an R variable (e.g. `primaryColor`) and passing it to both
the theme palette and the series `color` keeps the two in sync. The
dashboard layout is built with muiMaterial components (`Box`, `Card`,
`Typography`) for visual consistency.

## Theme Inheritance and Dark Mode

Because charts read from the same theme context as the rest of your
muiMaterial UI, switching the theme’s `palette.mode` to `"dark"` is
enough for a chart to adapt—its default color palette, text, and grid
lines all follow the mode. No per-chart configuration is required:

``` r

library(muiMaterial)

muiMaterialPage(
  ThemeProvider(
    theme = list(palette = list(mode = "dark")),
    Box(
      sx = list(p = 3, bgcolor = "background.default"),
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
        height = 300
      )
    )
  )
)
```

The same chart wrapped in a `ThemeProvider` with `mode = "light"` (the
default) renders with dark text on a light surface. This works because
muiCharts and muiMaterial share a single MUI theme context at runtime:
the chart does not bundle its own copy.

## Learn More

For more details about styling, visit the [MUI X Styling
documentation](https://mui.com/x/react-charts/styling/).
