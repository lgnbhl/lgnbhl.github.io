# Line Charts

## Overview

Line charts are ideal for showing how values change over continuous
dimensions such as time or episode sequence. They emphasize trends,
patterns, and fluctuations, making them useful for exploring
relationships or tracking progress over time.

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Basic Line Chart

Element counts per Star Wars film in episode order — characters,
planets, and species:

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
    list(dataKey = "Characters", label = "Number of Characters"),
    list(dataKey = "Planets",    label = "Number of Planets"),
    list(dataKey = "Species",    label = "Number of Species")
  ),
  height = 300
)
```

## Line Chart with Linear Scale

Use release year as a continuous x-axis to reflect real-world
chronology:

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
    label          = "Film Release Year",
    valueFormatter = JS("(v) => String(v)")
  )),
  series = list(
    list(dataKey = "Characters", label = "Characters"),
    list(dataKey = "Planets", label = "Planets")
  ),
  grid   = list(horizontal = TRUE),
  height = 300
)
```

## Line Chart with Marks

Show individual data points on the line with `showMark = TRUE`. By
adding `scaleType = "band"`, you can add the character name between the
marks. Here character heights sorted by name:

``` r

LineChart(
  dataset = starwars_people |> head(5),
  xAxis  = list(
    list(scaleType = "band", dataKey = "name")
  ),
  series = list(
    list(dataKey = "height", label = "Height (cm)", showMark = TRUE)
  ),
  height = 320
)
```

## Line Chart without Marks

Hide marks for a cleaner look with multiple overlapping series:

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
    list(dataKey = "Characters", label = "Number of Characters", showMark = FALSE),
    list(dataKey = "Planets",    label = "Number of Planets",    showMark = FALSE),
    list(dataKey = "Species",    label = "Number of Species",    showMark = FALSE)
  ),
  grid   = list(horizontal = TRUE, vertical = TRUE),
  height = 300
)
```

## Custom Curve Interpolation

Control the line shape with the `curve` property. `"natural"` produces
smooth curves; `"linear"` draws straight segments:

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
    list(dataKey = "Characters", label = "Characters", curve = "natural", showMark = TRUE),
    list(dataKey = "Planets",    label = "Planets",    curve = "linear",  showMark = TRUE)
  ),
  height = 300
)
```

## Step Interpolation

Use `curve = "step"` for categorical data where values jump discretely —
here starship passenger capacity in size order:

``` r

LineChart(
  dataset = starwars_people |> head(4),
  xAxis  = list(
    list(scaleType = "band", dataKey = "name", width = "auto")
  ),
  series = list(
    list(dataKey = "height", label = "Height", curve = "step")
  ),
  height = 320
)
```

## Line and Mark Sub-components

`LineElement`, `MarkElement`, and `AnimatedLine` are the sub-components
rendered by `LinePlot` and `MarkPlot`. Use `slotProps` to configure them
in a composition chart:

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
    list(type = "line", dataKey = "Characters", label = "Characters"),
    list(type = "line", dataKey = "Planets",    label = "Planets")
  ),
  ChartsTooltip(),
  ChartsSurface(
    LinePlot(slotProps = list(line = list(skipAnimation = TRUE))),
    MarkPlot(slotProps = list(mark = list(shape = "circle"))),
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
              Typography("Film Elements Across Episodes", variant = "h6", sx = list(fontWeight = 600)),
              Typography("Characters and planets by episode", variant = "body2", sx = list(color = "text.secondary")),
              LineChart(
                dataset = starwars_films |> mutate(Characters = lengths(characters), Planets = lengths(planets)) |> arrange(episode_id),
                xAxis = list(list(scaleType = "point", dataKey = "episode_id")),
                series = list(
                  list(dataKey = "Characters", label = "Characters", color = primaryColor),
                  list(dataKey = "Planets", label = "Planets", color = secondaryColor)
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

- [MUI Line Charts Documentation](https://mui.com/x/react-charts/lines/)

See also:
[Tooltip](https://felixluginbuhl.com/muiCharts/articles/tooltip.md) for
value formatters,
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
colors,
[Composition](https://felixluginbuhl.com/muiCharts/articles/composition.md)
for advanced layout, [Axis &
Grid](https://felixluginbuhl.com/muiCharts/articles/axis.md) for grid
and axis options.
