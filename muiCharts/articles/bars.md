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

## Prepare Data

We’ll use the `starwars` dataset from dplyr for our examples. Let’s
prepare the data by counting characters by species and homeworld:

``` r

# Count characters by species
starwars_species <- dplyr::starwars |>
  count(species) |>
  filter(!is.na(species)) |>
  arrange(desc(n)) |>
  slice_head(n = 7)

# Count characters by homeworld
starwars_homeworld <- dplyr::starwars |>
  count(homeworld) |>
  filter(!is.na(homeworld)) |>
  arrange(desc(n)) |>
  slice_head(n = 8)

# Count characters by gender across films
starwars_gender <- dplyr::starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n, values_fill = 0) |>
  mutate(release = c(1977, 2002, 1983, 2005, 1980, 2015, 1999)) |>
  arrange(release)
```

## Basic Bar Chart

A simple vertical bar chart showing the count of characters by species:

``` r

BarChart(
  dataset = starwars_species,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "species",
      label = "Species"
    )
  ),
  series = list(
    list(dataKey = "n", label = "Count")
  ),
  height = 300
)
```

## Horizontal Bar Chart

You can create horizontal bars by using the `layout = "horizontal"`
property:

``` r

BarChart(
  dataset = starwars_homeworld,
  layout = "horizontal",
  yAxis = list(
    list(
      scaleType = "band",
      dataKey = "homeworld",
      label = "Homeworld"
    )
  ),
  series = list(
    list(dataKey = "n", label = "Count")
  ),
  height = 350
)
```

## Grouped Bar Chart

Display multiple series side by side:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female"),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic"),
    list(dataKey = "none", label = "None")
  ),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Stacked Bar Chart

Stack series on top of each other using the `stack` property:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", stack = "total"),
    list(dataKey = "female", label = "Female", stack = "total"),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic", stack = "total"),
    list(dataKey = "none", label = "None", stack = "total")
  ),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Customized Bar Chart

Customize colors, border radius, and spacing:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      label = "Movies",
      categoryGapRatio = 0.3,
      barGapRatio = 0.5,
      height = 100,
      tickLabelStyle = list(
        fontSize = "0.6em",
        angle = 45
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", color = "#440154FF"),
    list(dataKey = "female", label = "Female", color = "#2A788EFF"),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic", color = "#FDE725FF"),
    list(dataKey = "none", label = "None", color = "#35B779FF")
  ),
  borderRadius = 10,
  grid = list(horizontal = TRUE),
  height = 400
)
```

## Bar Chart with Labels

Display values directly on the bars:

``` r

starwars_top5 <- starwars_species |>
  slice_head(n = 5)

BarChart(
  dataset = starwars_top5,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "species",
      label = "Species"
    )
  ),
  series = list(
    list(dataKey = "n", label = "Count", barLabel = "value")
  ),
  height = 300
)
```

## Mixed Stacking

Create different stacking groups:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", stack = "group1"),
    list(dataKey = "female", label = "Female", stack = "group2"),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic", stack = "group3"),
    list(dataKey = "none", label = "None", stack = "group3")
  ),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Bar Size Customization

Control the spacing between bars and categories:

``` r

# Prepare height data
starwars_height <- dplyr::starwars |>
  filter(!is.na(height), !is.na(species)) |>
  group_by(species) |>
  summarize(avg_height = mean(height, na.rm = TRUE)) |>
  arrange(desc(avg_height)) |>
  slice_head(n = 6)

BarChart(
  dataset = starwars_height,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "species",
      label = "Species",
      categoryGapRatio = 0.2,  # Gap between categories
      barGapRatio = 0.1        # Gap between bars
    )
  ),
  series = list(
    list(dataKey = "avg_height", label = "Average Height (cm)")
  ),
  height = 300
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
  dataset = starwars_top5,
  height = 320,
  xAxis = list(list(scaleType = "band", dataKey = "species", label = "Species")),
  series = list(list(type = "bar", dataKey = "n", label = "Count")),
  ChartsSurface(
    BarPlot(
      barLabel = "value",
      slotProps = list(
        barLabel = list(placement = "outside")
      )
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

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
