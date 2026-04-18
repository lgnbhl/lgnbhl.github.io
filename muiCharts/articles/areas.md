# Area Charts

## Overview

Area charts are line charts with the area below the line filled. They
are ideal for showing how values change over time and emphasizing the
magnitude of change. Stacking areas reveals the composition of a whole.

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Basic Area Chart

Character count per Star Wars episode — the shaded area emphasizes the
total across the saga:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(
    list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")
  ),
  series = list(
    list(dataKey = "Characters", label = "Number of Characters", area = TRUE, showMark = FALSE)
  ),
  height = 300
)
```

## Multiple Area Chart

Display multiple filled areas to compare different film elements over
time:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  xAxis  = list(
    list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")
  ),
  series = list(
    list(dataKey = "Characters", label = "Number of Characters", area = TRUE, showMark = FALSE),
    list(dataKey = "Planets",    label = "Number of Planets",    area = TRUE, showMark = FALSE)
  ),
  height = 300
)
```

## Stacked Area Chart

Stack areas with `stack` to show both totals and part-to-whole
relationships:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets),
      Species    = lengths(species)
    ) |>
    arrange(episode_id),
  xAxis  = list(
    list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")
  ),
  series = list(
    list(dataKey = "Characters", label = "Number of Characters", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "Planets",    label = "Number of Planets",    stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "Species",    label = "Number of Species",    stack = "total", area = TRUE, showMark = FALSE)
  ),
  height = 300
)
```

## Area Chart with Marks

Show individual data points alongside the filled area:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(Starships = lengths(starships)) |>
    arrange(episode_id),
  xAxis  = list(
    list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")
  ),
  series = list(
    list(dataKey = "Starships", label = "Number of Starships", area = TRUE, showMark = TRUE)
  ),
  height = 300
)
```

## Curve Interpolation

Use `curve = "natural"` to smooth the area boundary:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(Characters = lengths(characters)) |>
    arrange(episode_id),
  xAxis  = list(
    list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")
  ),
  series = list(
    list(dataKey = "Characters", label = "# Characters", area = TRUE, showMark = FALSE, curve = "natural")
  ),
  height = 300
)
```

## Area with Linear Scale (Release Year)

Map release year to the x-axis for a chronological view of the saga’s
character growth:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(
      year       = as.integer(format(release_date, "%Y")),
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(year),
  xAxis = list(list(
    scaleType      = "linear",
    dataKey        = "year",
    label          = "Release Year",
    valueFormatter = JS("(v) => String(v)")
  )),
  series = list(
    list(dataKey = "Characters", label = "Characters", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "Planets",    label = "Planets",    stack = "total", area = TRUE, showMark = FALSE)
  ),
  grid   = list(horizontal = TRUE),
  height = 300
)
```

## Area Chart with Null Values

Missing values break the area into disconnected segments:

``` r

LineChart(
  dataset = starwars_films |>
    mutate(partial = ifelse(episode_id <= 3, lengths(characters), NA)) |>
    arrange(episode_id),
  xAxis  = list(list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(list(
    dataKey  = "partial",
    label    = "Characters (Ep 1-3 only)",
    area     = TRUE,
    showMark = TRUE,
    connectNulls = FALSE
  )),
  height = 300
)
```

## Area Sub-components

`AreaElement` and `AnimatedArea` are the sub-components rendered by
`AreaPlot`. Use `slotProps` to configure them in a composition chart:

``` r

ChartDataProvider(
  dataset = starwars_films |>
    mutate(
      Characters = lengths(characters),
      Planets    = lengths(planets)
    ) |>
    arrange(episode_id),
  height = 300,
  xAxis  = list(list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")),
  series = list(
    list(type = "line", dataKey = "Characters", label = "Characters", area = TRUE),
    list(type = "line", dataKey = "Planets",    label = "Planets",    area = TRUE)
  ),
  ChartsTooltip(),
  ChartsLegend(),
  ChartsSurface(
    AreaPlot(slotProps = list(area = list(skipAnimation = TRUE))),
    LinePlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Dashboard Example

muiCharts integrates seamlessly with
[muiMaterial](https://felixluginbuhl.com/muiMaterial) to create modern,
fully-styled dashboards. muiMaterial’s `Card`, `Typography`, and `Stack`
components make it easy to add titles, subtitles, and footers around
charts. Combine `ThemeProvider` to customize colors across your entire
dashboard:

``` r

library(muiMaterial)

muiMaterialPage(
  CssBaseline(),
  {
    primaryColor <- "#1976d2"
    secondaryColor <- "#dc004e"

    ThemeProvider(
      theme = list(palette = list(primary = list(main = primaryColor), secondary = list(main = secondaryColor))),
      Box(sx = list(p = 3, bgcolor = "background.paper"),
        Card(sx = list(boxShadow = 3),
          CardContent(
            Stack(spacing = 1.5,
              Typography("Film Elements Over Time", variant = "h6", sx = list(fontWeight = 600)),
              Typography("Stacked area showing characters and planets", variant = "body2", sx = list(color = "text.secondary")),
              LineChart(
                dataset = starwars_films |> mutate(Characters = lengths(characters), Planets = lengths(planets)) |> arrange(episode_id),
                xAxis = list(list(scaleType = "point", dataKey = "episode_id")),
                series = list(
                  list(dataKey = "Characters", label = "Characters", area = TRUE, color = primaryColor, showMark = FALSE),
                  list(dataKey = "Planets", label = "Planets", area = TRUE, color = secondaryColor, showMark = FALSE)
                ),
                height = 280
              ),
              Divider(),
              Typography("Made with muiCharts and muiMaterial", variant = "caption", sx = list(color = "text.secondary"))
            )
          )
        )
      )
    )
  }
)
```

The `Stack` component organizes the title, chart, and footer. Colors
from `ThemeProvider` are reused in the chart. This pattern works with
any muiCharts component and fits perfectly within the Material Design
ecosystem.

## Learn More

- [MUI Area Charts
  Documentation](https://mui.com/x/react-charts/areas-demo/)

See also:
[Tooltip](https://felixluginbuhl.com/muiCharts/articles/tooltip.md) for
value formatters,
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
colors,
[Composition](https://felixluginbuhl.com/muiCharts/articles/composition.md)
for advanced layout, [Axis &
Grid](https://felixluginbuhl.com/muiCharts/articles/axis.md) for grid
and axis options.
