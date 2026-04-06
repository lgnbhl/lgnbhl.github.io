# Line Charts

## Overview

Line charts are ideal for showing how values change over continuous
dimensions such as time or measurement scales. They emphasize trends,
patterns, and fluctuations, making them useful for exploring
relationships, detecting cycles, or tracking performance over time.

## Setup

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

## Prepare Data

We’ll use the `starwars` dataset to create various line chart examples:

``` r

# Count characters by gender across films
starwars_gender <- dplyr::starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n, values_fill = 0) |>
  mutate(release = c(1977, 2002, 1983, 2005, 1980, 2015, 1999)) |>
  arrange(release)

# Character counts by birth year (aggregated into bins)
starwars_birth <- dplyr::starwars |>
  filter(!is.na(birth_year)) |>
  mutate(birth_decade = floor(birth_year / 10) * 10) |>
  count(birth_decade) |>
  arrange(birth_decade)
```

## Basic Line Chart

A simple line chart showing character counts by gender across movies:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "point",
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
  height = 300
)
```

## Line Chart with Linear Scale

Use numeric values on the x-axis with a linear scale:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "linear",
      dataKey = "release",
      label = "Release Year",
      valueFormatter = JS("(value) => String(value)")
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female")
  ),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Multiple Line Chart

Display multiple lines to compare different series:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", showMark = TRUE),
    list(dataKey = "female", label = "Female", showMark = TRUE),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic", showMark = TRUE),
    list(dataKey = "none", label = "None", showMark = TRUE)
  ),
  height = 300
)
```

## Line Chart with Marks

Show data points on the line using the `showMark` property:

``` r

LineChart(
  dataset = starwars_birth,
  xAxis = list(
    list(
      scaleType = "linear",
      dataKey = "birth_decade",
      label = "Birth Decade (BBY)"
    )
  ),
  series = list(
    list(dataKey = "n", label = "Characters Born", showMark = TRUE)
  ),
  height = 300
)
```

## Line Chart without Marks

Hide marks for a cleaner look:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", showMark = FALSE),
    list(dataKey = "female", label = "Female", showMark = FALSE)
  ),
  grid = list(horizontal = TRUE, vertical = TRUE),
  height = 300
)
```

## Line Chart with Custom Curve

Customize the line interpolation using the `curve` property:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", curve = "natural", showMark = TRUE),
    list(dataKey = "female", label = "Female", curve = "linear", showMark = TRUE)
  ),
  height = 300
)
```

## Line Chart with Step Interpolation

Use step interpolation for categorical transitions:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", curve = "step")
  ),
  height = 300
)
```

## Line Chart with Null Values

Handle missing data with null values:

``` r

# Create data with missing values
starwars_incomplete <- starwars_gender |>
  mutate(
    male_partial = ifelse(row_number() <= 3, male, NA),
    female_partial = ifelse(row_number() >= 3, female, NA)
  )

LineChart(
  dataset = starwars_incomplete,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male_partial", label = "Male (Partial)", showMark = TRUE),
    list(dataKey = "female_partial", label = "Female (Partial)", showMark = TRUE)
  ),
  height = 300
)
```

## Line Chart with Connect Nulls

Connect lines across null values:

``` r

LineChart(
  dataset = starwars_incomplete,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      label = "Movies",
      tickLabelStyle = list(
        fontSize = "0.5em"
      )
    )
  ),
  series = list(
    list(dataKey = "male_partial", label = "Male (Connected)", showMark = TRUE, connectNulls = TRUE),
    list(dataKey = "female_partial", label = "Female (Connected)", showMark = TRUE, connectNulls = TRUE)
  ),
  height = 300
)
```

## Line and Mark Sub-components

`LineElement`, `MarkElement`, and `AnimatedLine` are the sub-components
rendered by `LinePlot` and `MarkPlot` for each line, mark, and animated
line respectively. Call them to explore their props:

``` r

LineElement(skipAnimation = TRUE)
MarkElement(shape = "circle")
AnimatedLine(skipAnimation = TRUE)
```

Use `slotProps` to pass props to these components in a composition
chart:

``` r

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(
      scaleType = "point",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "line", dataKey = "male", label = "Male"),
    list(type = "line", dataKey = "female", label = "Female")
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
