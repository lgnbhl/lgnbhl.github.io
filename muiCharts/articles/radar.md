# Radar Charts

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

This article demonstrates how to create radar charts using muiCharts,
based on the [MUI Radar Chart
documentation](https://mui.com/x/react-charts/radar/).

## Basics

Create a basic radar chart showing character counts by sex across
different metrics:

``` r

# Prepare data: count characters by sex for each film
starwars_film_sex <- starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n, values_fill = 0)

# Create radar chart for one film
film_data <- starwars_film_sex |>
  filter(films == "A New Hope")

RadarChart(
  height = 300,
  series = list(
    list(
      label = "A New Hope",
      data = c(film_data$male, film_data$female, film_data$hermaphroditic, film_data$none)
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  )
)
```

## Multi-series Radar Chart

Compare multiple films on the same radar chart:

``` r

# Prepare data for three films
film1 <- starwars_film_sex |> filter(films == "A New Hope")
film2 <- starwars_film_sex |> filter(films == "Attack of the Clones")
film3 <- starwars_film_sex |> filter(films == "Return of the Jedi")

RadarChart(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    ),
    list(
      label = "Return of the Jedi",
      data = c(film3$male, film3$female, film3$hermaphroditic, film3$none)
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  )
)
```

## Series Options

Customize series appearance with `hideMark` and `fillArea`:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none),
      fillArea = TRUE
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none),
      hideMark = TRUE
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  )
)
```

## Metrics

Define metrics with detailed configuration using objects with `name`,
`min`, and `max`:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    ),
    list(
      label = "Return of the Jedi",
      data = c(film3$male, film3$female, film3$hermaphroditic, film3$none)
    )
  ),
  radar = list(
    metrics = list(
      list(name = "male", min = 0, max = 30),
      list(name = "female", min = 0, max = 30),
      list(name = "hermaphroditic", min = 0, max = 30),
      list(name = "none", min = 0, max = 30)
    )
  )
)
```

## Grid

Customize the radar grid with `shape` and `divisions`:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    ),
    list(
      label = "Return of the Jedi",
      data = c(film3$male, film3$female, film3$hermaphroditic, film3$none)
    )
  ),
  shape = "circular", # or "sharp"
  divisions = 3,
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  )
)
```

## Highlight

Control highlighting with the `highlight` prop:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    ),
    list(
      label = "Return of the Jedi",
      data = c(film3$male, film3$female, film3$hermaphroditic, film3$none)
    )
  ),
  highlight = "series",
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  )
)
```

## Tooltip

Customize tooltip behavior with the `trigger` option:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  ),
  slotProps = list(
    tooltip = list(
      trigger = "axis" # or "item"
    )
  )
)
```

## Radar Composition

`RadarDataProvider` is the dedicated data provider for radar charts. Use
it with `RadarGrid`, `RadarAxis`, `RadarSeriesPlot`, and
`RadarMetricLabels` to build a fully custom radar chart:

``` r

RadarDataProvider(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  ),
  ChartsLegend(),
  ChartsTooltip(),
  ChartsSurface(
    RadarGrid(),
    RadarSeriesPlot(),
    RadarAxis(),
    RadarMetricLabels()
  )
)
```

## Focused Radar Mark

`FocusedRadarMark` renders the visual indicator when a radar data point
receives keyboard focus. Add it inside `ChartsSurface`:

``` r

RadarDataProvider(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  ),
  ChartsTooltip(),
  ChartsSurface(
    RadarGrid(),
    RadarSeriesPlot(),
    RadarSeriesMarks(),
    FocusedRadarMark(),
    RadarAxis(),
    RadarMetricLabels()
  )
)
```

## Radar Axis Highlight

`RadarAxisHighlight` renders the highlight indicator when hovering over
a radar axis. Add it inside `ChartsSurface` in the composition API:

``` r

RadarDataProvider(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  ),
  ChartsTooltip(),
  ChartsSurface(
    RadarGrid(),
    RadarSeriesPlot(),
    RadarAxisHighlight(),
    RadarAxis(),
    RadarMetricLabels()
  )
)
```

## Radar Series Area

`RadarSeriesArea` renders the filled area for each radar series. Use it
alongside `RadarSeriesPlot` for filled-area radar charts:

``` r

RadarDataProvider(
  height = 350,
  series = list(
    list(
      label = "A New Hope",
      data = c(film1$male, film1$female, film1$hermaphroditic, film1$none)
    ),
    list(
      label = "Attack of the Clones",
      data = c(film2$male, film2$female, film2$hermaphroditic, film2$none)
    )
  ),
  radar = list(
    metrics = c("male", "female", "hermaphroditic", "none")
  ),
  ChartsLegend(),
  ChartsTooltip(),
  ChartsSurface(
    RadarGrid(),
    RadarSeriesArea(),
    RadarSeriesPlot(),
    RadarAxis(),
    RadarMetricLabels()
  )
)
```

## Learn More

- [MUI Radar Chart Documentation](https://mui.com/x/react-charts/radar/)
