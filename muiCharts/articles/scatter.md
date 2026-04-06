# Scatter Charts

``` r

library(muiCharts)
library(dplyr)
```

Scatter charts express the relation between two variables, using points
in a surface. They are ideal for visualizing relationships or
correlations, identifying clusters, trends, and outliers in datasets.

This article follows the [MUI Scatter Chart
documentation](https://mui.com/x/react-charts/scatter/).

## Basics

Scatter chart series should contain a `data` property with an array of
objects. Each object requires `x` and `y` properties, with an optional
`id` property.

``` r

# Prepare starwars data with two variables
starwars_scatter <- starwars |>
  filter(!is.na(height), !is.na(mass), mass < 200) |>
  select(name, height, mass, species) |>
  mutate(
    id = row_number(),
    species_group = case_when(
      species == "Human" ~ "Human",
      species == "Droid" ~ "Droid",
      TRUE ~ "Other"
    )
  )

# Create two series based on species group
series_a <- starwars_scatter |>
  filter(species_group == "Human")

series_b <- starwars_scatter |>
  filter(species_group == "Droid")

ScatterChart(
  height = 350,
  series = list(
    list(
      label = "Human",
      data = lapply(1:nrow(series_a), function(i) {
        list(
          id = series_a$id[i],
          x = series_a$height[i],
          y = series_a$mass[i]
        )
      })
    ),
    list(
      label = "Droid",
      data = lapply(1:nrow(series_b), function(i) {
        list(
          id = series_b$id[i],
          x = series_b$height[i],
          y = series_b$mass[i]
        )
      })
    )
  ),
  xAxis = list(
    list(label = "Height (cm)")
  ),
  yAxis = list(
    list(label = "Mass (kg)")
  )
)
```

## Using a Dataset

You can use the `dataset` prop with `datasetKeys` to specify which
columns to use for x and y values:

``` r

ScatterChart(
  height = 350,
  dataset = starwars_scatter,
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass"),
      label = "Characters"
    )
  ),
  xAxis = list(
    list(label = "Height (cm)")
  ),
  yAxis = list(
    list(label = "Mass (kg)")
  )
)
```

## Interaction

The chart computes Voronoi cells to map pointer position to the closest
element. You can define a maximum radius with `voronoiMaxRadius`:

``` r

ScatterChart(
  height = 350,
  dataset = starwars_scatter,
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass"),
      label = "Characters"
    )
  ),
  voronoiMaxRadius = 50,
  xAxis = list(
    list(label = "Height (cm)")
  ),
  yAxis = list(
    list(label = "Mass (kg)")
  )
)
```

Set `voronoiMaxRadius = "item"` to trigger interactions only when
hovering exactly over an element:

``` r

ScatterChart(
  height = 350,
  dataset = starwars_scatter,
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass"),
      label = "Characters"
    )
  ),
  voronoiMaxRadius = "item",
  xAxis = list(
    list(label = "Height (cm)")
  ),
  yAxis = list(
    list(label = "Mass (kg)")
  )
)
```

## Marker Size

Customize the size of points with the `markerSize` prop:

``` r

ScatterChart(
  height = 350,
  series = list(
    list(
      label = "Human",
      data = lapply(1:nrow(series_a), function(i) {
        list(
          id = series_a$id[i],
          x = series_a$height[i],
          y = series_a$mass[i]
        )
      }),
      markerSize = 10
    ),
    list(
      label = "Droid",
      data = lapply(1:nrow(series_b), function(i) {
        list(
          id = series_b$id[i],
          x = series_b$height[i],
          y = series_b$mass[i]
        )
      }),
      markerSize = 5
    )
  ),
  xAxis = list(
    list(label = "Height (cm)")
  ),
  yAxis = list(
    list(label = "Mass (kg)")
  )
)
```

## Multiple Axes

You can use multiple y-axes for different series:

``` r

# Prepare data with different scales
starwars_multi <- starwars |>
  filter(!is.na(height), !is.na(mass), !is.na(birth_year), mass < 200) |>
  select(height, mass, birth_year) |>
  mutate(id = row_number())

ScatterChart(
  height = 350,
  dataset = starwars_multi,
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass"),
      label = "Mass (kg)",
      yAxisId = "leftAxis"
    ),
    list(
      datasetKeys = list(x = "height", y = "birth_year"),
      label = "Birth Year (BBY)",
      yAxisId = "rightAxis"
    )
  ),
  xAxis = list(
    list(label = "Height (cm)")
  ),
  yAxis = list(
    list(id = "leftAxis", label = "Mass (kg)"),
    list(id = "rightAxis", label = "Birth Year (BBY)")
  )
)
```

## Custom Scatter Marker

`ScatterMarker` is the individual marker element rendered for each data
point. Use it inside `ChartsSurface` via the composition API to
customise marker appearance through `slotProps`:

``` r

ChartDataProvider(
  dataset = starwars_scatter,
  height = 350,
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass"),
      label = "Characters"
    )
  ),
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)")),
  ChartsTooltip(trigger = "item"),
  ChartsSurface(
    ScatterPlot(
      slots = list(scatter = JS("
        React.forwardRef(function CustomMarker(props, ref) {
          return React.createElement(
            MuiXCharts.ScatterMarker,
            Object.assign({}, props, { ref: ref, shape: 'cross' })
          );
        })
      "))
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Focused Scatter Mark

`FocusedScatterMark` renders the visual indicator when a scatter point
receives keyboard focus. Add it inside `ChartsSurface` in the
composition API:

``` r

ChartDataProvider(
  dataset = starwars_scatter,
  height = 350,
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass"),
      label = "Characters"
    )
  ),
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)")),
  ChartsTooltip(trigger = "item"),
  ChartsSurface(
    ScatterPlot(),
    FocusedScatterMark(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

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
