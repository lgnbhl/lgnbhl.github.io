# Bar Charts

## Overview

Bar charts express quantities through a bar’s length, using a common
baseline. They are ideal for comparing discrete categories and excel at
visualizing differences in magnitude across categories, highlighting
trends, and comparing proportions at a glance.

## Setup

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

## Basic Bar Chart

A vertical bar chart showing the six tallest Star Wars characters from
`starwars_people`. Sorting before slicing puts the tallest first:

``` r

BarChart(
  dataset = starwars_people |> head(4),
  xAxis = list(list(scaleType = "band", dataKey = "name", label = "Character")),
  series = list(list(dataKey = "height", label = "Height (cm)")),
  height = 300
)
```

## Horizontal Bar Chart

Use `layout = "horizontal"` when category names are long. Here
`starwars_starships` is sorted and trimmed to the eight largest vessels
— their names read naturally on the y-axis:

``` r

BarChart(
  dataset = starwars_people |> head(4) |> arrange(height),
  layout = "horizontal",
  yAxis = list(list(scaleType = "band", dataKey = "name", label = "Character", width = 140)),
  series = list(list(dataKey = "height", label = "Height (m)")),
  height = 380
)
```

## Grouped Bar Chart

Place multiple series side by side to compare them directly. This chart
contrasts height and mass for the first six characters where both values
are known:

``` r

BarChart(
  dataset = starwars_people |> head(4),
  xAxis = list(list(scaleType = "band", dataKey = "name", label = "Character")),
  series = list(
    list(dataKey = "height", label = "Height (cm)"),
    list(dataKey = "mass",   label = "Mass (kg)")
  ),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Stacked Bar Chart

Stack series with `stack` to show both totals and part-to-whole
relationships. The `starwars_films` dataset contains list columns;
[`lengths()`](https://rdrr.io/r/base/lengths.html) counts how many items
each film has:

``` r

BarChart(
  dataset = starwars_films |> mutate(
    Characters = lengths(characters),
    Planets    = lengths(planets),
    Species    = lengths(species)
  ),
  layout = "horizontal",
  yAxis = list(list(scaleType = "band", dataKey = "title", width = 220)),
  series = list(
    list(dataKey = "Characters", label = "Number of Characters", stack = "total"),
    list(dataKey = "Planets",    label = "Number of Planets",    stack = "total"),
    list(dataKey = "Species",    label = "Number of Species",    stack = "total")
  ),
  height = 320
)
```

## Bar Chart with Labels

Set `barLabel = "value"` to print the data value directly on each bar.
The top species by average height from `starwars_species` make a
compact, readable chart:

``` r

BarChart(
  dataset = starwars_species |>
    filter(!is.na(average_height)) |>
    head(4),
  xAxis = list(list(scaleType = "band", dataKey = "name", label = "Species")),
  series = list(list(
    dataKey  = "average_height",
    label    = "Avg. Height (cm)",
    barLabel = "value"
  )),
  height = 320
)
```

## Numeric Axis

Integer columns work as discrete band categories. Here `release_date` is
converted to an integer year — each unique year gets its own band, and a
`valueFormatter` prevents MUI from formatting `1977` as `1,977`:

``` r

BarChart(
  dataset = starwars_films |> mutate(
    year         = as.integer(format(release_date, "%Y")),
    n_characters = lengths(characters)
  ),
  xAxis = list(list(
    scaleType      = "band",
    dataKey        = "year",
    label          = "Film Release Year",
    valueFormatter = JS("(v) => String(v)")
  )),
  series = list(list(dataKey = "n_characters", label = "Number of Characters")),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Color Customization

Set `color` on each series and `borderRadius` on the chart for a
polished look. Here film and character counts from `starwars_species`
list columns are styled with a coordinated purple palette:

``` r

BarChart(
  dataset = starwars_species |>
    mutate(n_films = lengths(films), n_people = lengths(people)) |>
    arrange(desc(n_films)) |>
    head(4),
  xAxis = list(list(scaleType = "band", dataKey = "name", label = "Species")),
  series = list(
    list(dataKey = "n_films",  label = "Number of Films",      color = "#4338CA"),
    list(dataKey = "n_people", label = "Number of Characters", color = "#A5B4FC")
  ),
  borderRadius = 8,
  grid = list(horizontal = TRUE),
  height = 320
)
```

## Mixed Stacking

Assign different `stack` values to create independent stacks side by
side. Here characters are grouped by gender: the `"cast"` stack shows
how many characters exist per gender, while the `"piloted"` stack breaks
down the vehicles they operated — starships and ground vehicles stacked
separately:

``` r

BarChart(
  dataset = starwars_people |>
    filter(gender %in% c("male", "female")) |>
    group_by(gender) |>
    summarise(
      Characters = n(),
      Starships  = sum(lengths(starships)),
      Vehicles   = sum(lengths(vehicles))
    ),
  xAxis = list(list(scaleType = "band", dataKey = "gender", label = "Gender")),
  series = list(
    list(dataKey = "Characters", label = "Characters",        stack = "cast"),
    list(dataKey = "Starships",  label = "Starships piloted", stack = "piloted"),
    list(dataKey = "Vehicles",   label = "Vehicles piloted",  stack = "piloted")
  ),
  grid = list(horizontal = TRUE),
  height = 320
)
```

## Bar Element and Bar Label

`BarElement` and `BarLabel` are the sub-components that `BarPlot` uses
internally to render each bar and its label. Call them directly to
explore their props:

``` r

BarElement(skipAnimation = TRUE)
BarLabel(placement = "outside")
```

Use `slotProps` in `BarPlot` to pass props to these components without a
custom slot override:

``` r

ChartDataProvider(
  dataset = starwars_species |>
    filter(!is.na(average_height)) |>
    head(4) |>
    arrange(desc(average_height)),
  height = 340,
  xAxis = list(list(scaleType = "band", dataKey = "name", label = "Species")),
  series = list(list(type = "bar", dataKey = "average_height", label = "Avg. Height (cm)")),
  ChartsTooltip(),
  ChartsLegend(),
  ChartsSurface(
    BarPlot(
      barLabel = "value",
      slotProps = list(barLabel = list(placement = "outside"))
    ),
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

    ThemeProvider(
      theme = list(palette = list(primary = list(main = primaryColor))),
      Box(sx = list(p = 3, bgcolor = "background.paper"),
        Card(sx = list(boxShadow = 3),
          CardContent(
            Stack(spacing = 1.5,
              Typography("Character Count", variant = "h6", sx = list(fontWeight = 600)),
              Typography("Number of characters by episode", variant = "body2", sx = list(color = "text.secondary")),
              BarChart(
                dataset = starwars_films |> mutate(Characters = lengths(characters)) |> arrange(episode_id),
                xAxis = list(list(scaleType = "band", dataKey = "episode_id")),
                series = list(list(dataKey = "Characters", color = primaryColor)),
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

The `Stack` component organizes the title, chart, and footer. The
`primaryColor` from `ThemeProvider` is reused in the chart. This pattern
works with any muiCharts component and fits perfectly within the
Material Design ecosystem.

## Learn More

- [MUI Bar Charts Documentation](https://mui.com/x/react-charts/bars/)

See also:
[Tooltip](https://felixluginbuhl.com/muiCharts/articles/tooltip.md) for
value formatters,
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
colors,
[Composition](https://felixluginbuhl.com/muiCharts/articles/composition.md)
for advanced layout, [Axis &
Grid](https://felixluginbuhl.com/muiCharts/articles/axis.md) for grid
and axis options.
