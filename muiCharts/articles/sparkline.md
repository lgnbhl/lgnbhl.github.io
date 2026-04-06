# Sparkline Charts

``` r

library(muiCharts)
library(dplyr)
```

Sparkline charts provide an overview of data trends in a simplified way
without visible axes or coordinates. This article demonstrates how to
create sparkline charts with muiCharts based on the [MUI X Sparkline
documentation](https://mui.com/x/react-charts/sparkline/).

## Basics

The `SparkLineChart` requires only the `data` prop which is an array of
numbers. You can switch from line to bar plot with `plotType="bar"`.

``` r

# Get character counts per film
starwars_films <- starwars |>
  tidyr::unnest(films) |>
  count(films) |>
  arrange(films)

# Line sparkline
SparkLineChart(
  data = starwars_films$n,
  height = 100
)
```

``` r


# Bar sparkline
SparkLineChart(
  plotType = "bar",
  data = starwars_films$n,
  height = 100
)
```

## Line Customization

You can fill the area below the curve with the `area` prop. To modify
curve interpolation, use the `curve` prop.

``` r

# Get height variations across species
starwars_heights <- starwars |>
  filter(!is.na(height)) |>
  group_by(species) |>
  summarise(avg_height = mean(height, na.rm = TRUE)) |>
  arrange(desc(avg_height)) |>
  head(8)

# Area sparkline
SparkLineChart(
  data = starwars_heights$avg_height,
  height = 100,
  area = TRUE
)
```

``` r


# Natural curve with area
SparkLineChart(
  data = starwars_heights$avg_height,
  height = 100,
  curve = "natural",
  area = TRUE
)
```

## Interaction

Use `showTooltip` and `showHighlight` to display default tooltip and
highlight in your sparkline.

``` r

# Birth years of main characters
starwars_birth <- starwars |>
  filter(!is.na(birth_year)) |>
  arrange(birth_year) |>
  head(10)

SparkLineChart(
  data = starwars_birth$birth_year,
  height = 100,
  showHighlight = TRUE,
  showTooltip = TRUE
)
```

## X-axis Data

By default, the sparkline assigns x-axis values as integers (0, 1, 2,…).
You can override this with the `xAxis` prop.

``` r

# Mass of characters over time (using birth year as x)
starwars_timeline <- starwars |>
  filter(!is.na(birth_year), !is.na(mass)) |>
  arrange(birth_year) |>
  head(8)

SparkLineChart(
  data = starwars_timeline$mass,
  height = 100,
  xAxis = list(
    scaleType = "linear",
    data = starwars_timeline$birth_year
  ),
  showTooltip = TRUE
)
```

## Y-axis Range

You can fix the y-range by providing `min`/`max` values to the `yAxis`
configuration.

``` r

# Character heights (natural range)
heights_small <- c(150, 165, 172, 168, 175, 170, 180, 177)

SparkLineChart(
  data = heights_small,
  height = 100,
  showHighlight = TRUE
)
```

``` r


# Fixed y-range from 0 to 200
SparkLineChart(
  data = heights_small,
  height = 100,
  yAxis = list(min = 0, max = 200),
  showHighlight = TRUE
)
```

## Practical Example

Create a sparkline dashboard showing various Star Wars metrics:

``` r

library(muiMaterial)
#> 
#> Attaching package: 'muiMaterial'
#> The following object is masked from 'package:muiCharts':
#> 
#>     Toolbar

# Prepare various metrics
film_counts <- starwars |>
  tidyr::unnest(films) |>
  count(films) |>
  arrange(films)

species_counts <- starwars |>
  count(species, sort = TRUE) |>
  head(8)

Box(
  sx = list(
    display = "flex",
    flexDirection = "column",
    gap = 2,
    padding = 2
  ),
  Box(
    Typography(variant = "h6", "Characters per Film"),
    Typography(variant = "h4", sum(film_counts$n)),
    SparkLineChart(
      data = film_counts$n,
      xAxis = list(
        data = 1:nrow(film_counts),
        valueFormatter = JS(sprintf(
          "function(value) { const films = %s; return films[value - 1]; }",
          jsonlite::toJSON(film_counts$films)
        ))
      ),
      height = 60,
      area = TRUE,
      showHighlight = TRUE,
      showTooltip = TRUE
    )
  ),
  Box(
    Typography(variant = "h6", "Species Distribution"),
    Typography(variant = "h4", nrow(species_counts)),
    SparkLineChart(
      plotType = "bar",
      data = species_counts$n,
      xAxis = list(
        data = 1:nrow(species_counts),
        valueFormatter = JS(sprintf(
          "function(value) { const species = %s; return species[value - 1]; }",
          jsonlite::toJSON(species_counts$species)
        ))
      ),
      height = 60,
      showHighlight = TRUE,
      showTooltip = TRUE
    )
  )
)
```

## Learn More

- [MUI Sparkline Chart
  Documentation](https://mui.com/x/react-charts/sparkline/)

See also:
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
colors and `sx` overrides.
