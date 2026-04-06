# Area Charts

## Overview

Area charts are line charts with the area below the line filled. They
are ideal for showing how values change over time and emphasizing the
magnitude of change. Area charts can be stacked to show the composition
of a whole.

## Setup

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

## Prepare Data

We’ll use the `starwars` dataset to create various area chart examples:

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

## Basic Area Chart

A simple area chart showing character counts:

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
    list(dataKey = "male", label = "Male", area = TRUE, showMark = FALSE)
  ),
  height = 300
)
```

## Multiple Area Chart

Display multiple areas for comparison:

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
    list(dataKey = "male", label = "Male", area = TRUE, showMark = FALSE),
    list(dataKey = "female", label = "Female", area = TRUE, showMark = FALSE)
  ),
  height = 300
)
```

## Stacked Area Chart

Stack areas on top of each other to show composition:

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
    list(dataKey = "male", label = "Male", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "female", label = "Female", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "none", label = "None", stack = "total", area = TRUE, showMark = FALSE)
  ),
  height = 300
)
```

## Area Chart with Marks

Show data points on the area chart:

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
    list(dataKey = "n", label = "Characters Born", area = TRUE, showMark = TRUE)
  ),
  height = 300
)
```

## Area Chart with Curve Interpolation

Customize the area curve using different interpolation methods:

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
    list(dataKey = "male", label = "Male", area = TRUE, showMark = FALSE, curve = "natural")
  ),
  height = 300
)
```

## Stacked Area Chart with Percentage

Show relative proportions over time:

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
    list(dataKey = "male", label = "Male", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "female", label = "Female", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "none", label = "None", stack = "total", area = TRUE, showMark = FALSE)
  ),
  stackOffset = "expand",
  height = 300
)
```

## Area Chart with Baseline

Customize the baseline for the area fill:

``` r

# Create data with negative values
starwars_variation <- starwars_gender |>
  mutate(
    male_diff = male - lag(male, default = male[1]),
    female_diff = female - lag(female, default = female[1])
  )

LineChart(
  dataset = starwars_variation,
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
    list(dataKey = "male_diff", label = "Male (Change)", area = TRUE, showMark = FALSE, baseline = "min")
  ),
  height = 300
)
```

## Area Chart with Connect Nulls

Handle missing data gracefully:

``` r

# Create data with missing values
starwars_incomplete <- starwars_gender |>
  mutate(
    male_partial = ifelse(row_number() %in% c(3, 5), NA, male)
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
    list(dataKey = "male_partial", label = "Male (with gaps)", area = TRUE, showMark = TRUE, connectNulls = FALSE)
  ),
  height = 300
)
```

## Area Chart Connecting Nulls

Connect areas across null values:

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
    list(dataKey = "male_partial", label = "Male (connected)", area = TRUE, showMark = TRUE, connectNulls = TRUE)
  ),
  height = 300
)
```

## Area Chart with Linear Scale

Use numeric values on the x-axis:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "linear",
      dataKey = "release",
      label = "Release Year"
    )
  ),
  series = list(
    list(dataKey = "male", label = "Male", stack = "total", area = TRUE, showMark = FALSE),
    list(dataKey = "female", label = "Female", stack = "total", area = TRUE, showMark = FALSE)
  ),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Area Sub-components

`AreaElement` and `AnimatedArea` are the sub-components rendered by
`AreaPlot` for each filled area and its animation. Call them to explore
their props:

``` r

AreaElement(skipAnimation = TRUE)
AnimatedArea(skipAnimation = TRUE)
```

Use `slotProps` on `AreaPlot` to configure these components:

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
    list(type = "line", dataKey = "male", label = "Male", area = TRUE),
    list(type = "line", dataKey = "female", label = "Female", area = TRUE)
  ),
  ChartsTooltip(),
  ChartsSurface(
    AreaPlot(slotProps = list(area = list(skipAnimation = TRUE))),
    LinePlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

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
