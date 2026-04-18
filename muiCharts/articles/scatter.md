# Scatter Charts

## Overview

Scatter charts express the relation between two variables using points
in a surface. They are ideal for visualizing relationships or
correlations, identifying clusters, trends, and outliers in datasets.

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Basic Scatter Chart

Height vs mass for Star Wars characters with known values. Each point is
a character:

``` r

ScatterChart(
  height = 350,
  dataset = starwars_people |> head(20),
  series = list(list(
    datasetKeys = list(x = "height", y = "mass"),
    label = "Characters"
  )),
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)"))
)
```

## Multi-series Scatter Chart

Separate male and female characters into two series for easy comparison:

> **Note:** The `data` argument require two columns named `x` and `y`.

``` r

ScatterChart(
  height = 350,
  series = list(
    list(
      data = starwars_people |> 
        filter(gender == "male") |> 
        select(x = height, y = mass),
      label = "Male"),
    list(
      data = starwars_people |> 
        filter(gender == "female") |> 
        select(x = height, y = mass),
      label = "Female")
  ),
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)"))
)
```

## Voronoi Interaction

The chart computes Voronoi cells to map pointer position to the closest
element. Set a maximum radius with `voronoiMaxRadius`:

``` r

ScatterChart(
  height = 350,
  dataset = starwars_people |> head(20),
  series = list(list(datasetKeys = list(x = "height", y = "mass"), label = "Characters")),
  voronoiMaxRadius = 50,
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)"))
)
```

Set `voronoiMaxRadius = "item"` to trigger interactions only when
hovering exactly over a point:

``` r

ScatterChart(
  height = 350,
  dataset = starwars_people |> head(20),
  series = list(list(datasetKeys = list(x = "height", y = "mass"), label = "Characters")),
  voronoiMaxRadius = "item",
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)"))
)
```

## Multiple Axes

Use dual y-axes to compare mass and birth year against height on the
same chart:

``` r

ScatterChart(
  height = 350,
  dataset = starwars_people |> head(20),
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass"),
      label = "Mass (kg)",
      yAxisId = "left"),
    list(
      datasetKeys = list(x = "height", y = "birth_year"),
      label = "Birth Year (BBY)",
      yAxisId = "right")
  ),
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(
    list(id = "left",  label = "Mass (kg)"),
    list(id = "right", label = "Birth Year (BBY)")
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
              Typography("Height vs Mass by Gender", variant = "h6", sx = list(fontWeight = 600)),
              Typography("Character physical attributes comparison", variant = "body2", sx = list(color = "text.secondary")),
              ScatterChart(
                height = 280,
                series = list(
                  list(data = starwars_people |> filter(gender == "male", !is.na(height), !is.na(mass)) |> select(x = height, y = mass), label = "Male", color = primaryColor),
                  list(data = starwars_people |> filter(gender == "female", !is.na(height), !is.na(mass)) |> select(x = height, y = mass), label = "Female", color = secondaryColor)
                ),
                xAxis = list(list(label = "Height (cm)")),
                yAxis = list(list(label = "Mass (kg)"))
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

- [MUI Scatter Chart
  Documentation](https://mui.com/x/react-charts/scatter/)

See also:
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
color maps,
[Composition](https://felixluginbuhl.com/muiCharts/articles/composition.md)
for advanced layout, [Axis &
Grid](https://felixluginbuhl.com/muiCharts/articles/axis.md) for grid
and axis options.
