# Radar Charts

## Overview

Radar charts compare multiple quantitative variables for one or more
groups. They are ideal for profiling items across a common set of
dimensions.

## Setup

``` r

library(muiCharts)
library(dplyr)
```

Compute element counts per film — Characters, Planets, Species and
Starships make natural radar dimensions:

``` r

film_metrics <- starwars_films |>
  mutate(
    n_characters = lengths(characters),
    n_planets    = lengths(planets),
    n_species    = lengths(species),
    n_starships  = lengths(starships)
  )
```

## Basic Radar Chart

Profile a single film across its four element dimensions:

``` r

RadarChart(
  height  = 300,
  series  = list(
    list(
      label = film_metrics$title[1], 
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      )
    )
  ),
  radar   = list(metrics = c("Characters", "Planets", "Species", "Starships"))
)
```

## Multi-series Radar Chart

Overlay multiple films to compare how each is composed across the same
dimensions:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = film_metrics$title[1],
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      )
    ),
    list(
      label = film_metrics$title[2],
      data = c(
        film_metrics$n_characters[2], film_metrics$n_planets[2],
        film_metrics$n_species[2], film_metrics$n_starships[2]
      )
    ),
    list(
      label = film_metrics$title[3],
      data = c(
        film_metrics$n_characters[3], film_metrics$n_planets[3],
        film_metrics$n_species[3], film_metrics$n_starships[3]
      )
    )
  ),
  radar  = list(metrics = c("Characters", "Planets", "Species", "Starships"))
)
```

## Series Options

Use `fillArea = TRUE` to shade the polygon and `hideMark = TRUE` to
suppress vertex dots:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = film_metrics$title[1],
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      ),
      fillArea = TRUE
    ),
    list(
      label = film_metrics$title[2],
      data = c(
        film_metrics$n_characters[2], film_metrics$n_planets[2],
        film_metrics$n_species[2], film_metrics$n_starships[2]
      ),
      hideMark = TRUE
    )
  ),
  radar  = list(metrics = c("Characters", "Planets", "Species", "Starships"))
)
```

## Metrics with Fixed Range

Define `min` and `max` per metric to ensure all axes share the same
scale:

``` r

RadarChart(
  height = 350,
  series = list(
    list(
      label = film_metrics$title[1],
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      )
    ),
    list(
      label = film_metrics$title[2],
      data = c(
        film_metrics$n_characters[2], film_metrics$n_planets[2],
        film_metrics$n_species[2], film_metrics$n_starships[2]
      )
    )
  ),
  radar  = list(metrics = list(
    list(name = "Characters", min = 0, max = 20),
    list(name = "Planets",    min = 0, max = 20),
    list(name = "Species",    min = 0, max = 20),
    list(name = "Starships",  min = 0, max = 20)
  ))
)
```

## Grid Shape

Switch between a circular (`"circular"`) and a polygon (`"sharp"`) grid:

``` r

RadarChart(
  height    = 350,
  series = list(
    list(
      label = film_metrics$title[1],
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      )
    ),
    list(
      label = film_metrics$title[2],
      data = c(
        film_metrics$n_characters[2], film_metrics$n_planets[2],
        film_metrics$n_species[2], film_metrics$n_starships[2]
      )
    )
  ),
  shape = "circular",
  divisions = 3,
  radar = list(metrics = c("Characters", "Planets", "Species", "Starships"))
)
```

## Highlight

Control hover highlighting with `highlight`:

``` r

RadarChart(
  height    = 350,
  series = list(
    list(
      label = film_metrics$title[1],
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      )
    ),
    list(
      label = film_metrics$title[2],
      data = c(
        film_metrics$n_characters[2], film_metrics$n_planets[2],
        film_metrics$n_species[2], film_metrics$n_starships[2]
      )
    )
  ),
  highlight = "series",
  radar     = list(metrics = c("Characters", "Planets", "Species", "Starships"))
)
```

## Tooltip

Customize tooltip behavior with the `trigger` option:

``` r

RadarChart(
  height    = 350,
  series = list(
    list(
      label = film_metrics$title[1],
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      )
    ),
    list(
      label = film_metrics$title[2],
      data = c(
        film_metrics$n_characters[2], film_metrics$n_planets[2],
        film_metrics$n_species[2], film_metrics$n_starships[2]
      )
    )
  ),
  radar     = list(metrics = c("Characters", "Planets", "Species", "Starships")),
  slotProps = list(tooltip = list(trigger = "axis"))
)
```

## Radar Composition

`RadarDataProvider` is the dedicated data provider for radar charts. Use
it with `RadarGrid`, `RadarAxis`, `RadarSeriesPlot`, and
`RadarMetricLabels` for a fully custom layout:

``` r

RadarDataProvider(
  height = 350,
  series = list(
    list(
      label = film_metrics$title[1],
      data = c(
        film_metrics$n_characters[1], film_metrics$n_planets[1],
        film_metrics$n_species[1], film_metrics$n_starships[1]
      )
    ),
    list(
      label = film_metrics$title[2],
      data = c(
        film_metrics$n_characters[2], film_metrics$n_planets[2],
        film_metrics$n_species[2], film_metrics$n_starships[2]
      )
    )
  ),
  radar  = list(metrics = c("Characters", "Planets", "Species", "Starships")),
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

## Learn More

- [MUI Radar Chart Documentation](https://mui.com/x/react-charts/radar/)
