# Gauge Charts

``` r

library(muiCharts)
library(dplyr)
```

Gauge charts let users evaluate metrics. They display a numeric value
that varies within a defined range. This article demonstrates how to
create gauge charts with muiCharts based on the [MUI X Gauge
documentation](https://mui.com/x/react-charts/gauge/).

## Basics

The Gauge displays a numeric value between 0 and 100 by default. You can
customize the arc’s angle range.

``` r

# Calculate percentage of human characters
human_pct <- starwars |>
  summarise(pct = sum(species == "Human", na.rm = TRUE) / n() * 100) |>
  pull(pct) |>
  round(0)

# Full circle gauge
Gauge(
  width = 100,
  height = 100,
  value = human_pct
)
```

``` r


# Semi-circle gauge
Gauge(
  width = 100,
  height = 100,
  value = human_pct,
  startAngle = -90,
  endAngle = 90
)
```

## Value Range

The Gauge’s value is between 0 and 100 by default. Use `valueMin` and
`valueMax` to modify it.

``` r

# Average character height (170-180 range)
avg_height <- starwars |>
  filter(!is.na(height)) |>
  summarise(avg = mean(height)) |>
  pull(avg) |>
  round(0)

# Default range (0-100)
Gauge(
  width = 100,
  height = 100,
  value = 50
)
```

``` r


# Custom range (150-200 cm)
Gauge(
  width = 100,
  height = 100,
  value = avg_height,
  valueMin = 150,
  valueMax = 200
)
```

## Arcs Configuration

Modify the arc shape with `startAngle`, `endAngle`, `innerRadius`,
`outerRadius`, and `cornerRadius`.

``` r

# Calculate character completion rate
completion_rate <- starwars |>
  summarise(rate = sum(!is.na(height) & !is.na(mass) & !is.na(birth_year)) / n() * 100) |>
  pull(rate) |>
  round(0)

# Donut gauge
Gauge(
  width = 150,
  height = 150,
  value = completion_rate,
  innerRadius = "70%",
  outerRadius = "100%"
)
```

``` r


# With corner radius
Gauge(
  width = 150,
  height = 150,
  value = completion_rate,
  innerRadius = "70%",
  outerRadius = "100%",
  cornerRadius = "50%"
)
```

## Text Configuration

By default, the Gauge displays the value in the center. Use the `text`
prop to customize it.

``` r

# Percentage of characters with known species
known_species_pct <- starwars |>
  summarise(pct = sum(!is.na(species)) / n() * 100) |>
  pull(pct) |>
  round(0)

# Custom text
Gauge(
  width = 150,
  height = 150,
  value = known_species_pct,
  text = paste0(known_species_pct, "%")
)
```

``` r


# Using a formatter with JS
Gauge(
  width = 150,
  height = 150,
  value = known_species_pct,
  text = JS("({ value, valueMax }) => `${value} / ${valueMax}`")
)
```

## Arc Design

Customize the Gauge styles using the `sx` prop with MuiGauge CSS class
selectors:

``` r

Gauge(
  width = 150,
  height = 150,
  value = 75,
  cornerRadius = "50%",
  sx = list(
    "& .MuiGauge-valueText" = list(
      fontSize = 40
    ),
    "& .MuiGauge-valueArc" = list(
      fill = "#52b202"
    ),
    "& .MuiGauge-referenceArc" = list(
      fill = "#e0e0e0"
    )
  )
)
```

## Semi-Circle and Quarter-Circle

Create semi-circle or quarter-circle gauges for different use cases.

``` r

# Character power level
power_level <- 85

# Semi-circle (speedometer style)
Gauge(
  width = 200,
  height = 120,
  value = power_level,
  startAngle = -90,
  endAngle = 90
)
```

``` r


# Quarter-circle
Gauge(
  width = 150,
  height = 150,
  value = power_level,
  startAngle = 0,
  endAngle = 90
)
```

## Multiple Gauges

Create a dashboard with multiple gauges showing different metrics.

``` r

library(muiMaterial)
#> 
#> Attaching package: 'muiMaterial'
#> The following object is masked from 'package:muiCharts':
#> 
#>     Toolbar

# Calculate various metrics
human_pct <- round(sum(starwars$species == "Human", na.rm = TRUE) / nrow(starwars) * 100, 0)
known_height_pct <- round(sum(!is.na(starwars$height)) / nrow(starwars) * 100, 0)
known_mass_pct <- round(sum(!is.na(starwars$mass)) / nrow(starwars) * 100, 0)

Box(
  sx = list(
    display = "flex",
    gap = 2,
    justifyContent = "center",
    alignItems = "center"
  ),
  Box(
    sx = list(
      display = "flex",
      flexDirection = "column",
      alignItems = "center"
    ),
    Typography(variant = "subtitle2", "Human Characters"),
    Gauge(
      width = 100,
      height = 100,
      value = human_pct
    )
  ),
  Box(
    sx = list(
      display = "flex",
      flexDirection = "column",
      alignItems = "center"
    ),
    Typography(variant = "subtitle2", "Known Height"),
    Gauge(
      width = 100,
      height = 100,
      value = known_height_pct
    )
  ),
  Box(
    sx = list(
      display = "flex",
      flexDirection = "column",
      alignItems = "center"
    ),
    Typography(variant = "subtitle2", "Known Mass"),
    Gauge(
      width = 100,
      height = 100,
      value = known_mass_pct
    )
  )
)
```

## Accessibility

The Gauge is compliant with the ARIA Meter pattern. You can add
`aria-label` or `aria-labelledby` for better accessibility.

``` r

# Character diversity index
diversity_index <- starwars |>
  count(species) |>
  summarise(index = n()) |>
  pull(index)

# Scale to 0-100
diversity_pct <- min(diversity_index * 2, 100)

Box(
  Typography(
    id = "diversity_label",
    variant = "h6",
    "Species Diversity Index"
  ),
  Gauge(
    width = 150,
    height = 150,
    value = diversity_pct,
    `aria-labelledby` = "diversity_label",
    `aria-valuetext` = paste0(diversity_index, " unique species")
  )
)
```

## Composition

For advanced customization, use `GaugeContainer` with individual
sub-components:

``` r

# Custom gauge using composition
GaugeContainer(
  width = 200,
  height = 200,
  value = human_pct,
  startAngle = -110,
  endAngle = 110,
  GaugeReferenceArc(),
  GaugeValueArc(),
  GaugeValueText()
)
```

You can customize the text display using `GaugeValueText` with a JS
formatter:

``` r

GaugeContainer(
  width = 200,
  height = 200,
  value = 75,
  startAngle = -110,
  endAngle = 110,
  innerRadius = "60%",
  outerRadius = "100%",
  cornerRadius = "50%",
  GaugeReferenceArc(),
  GaugeValueArc(),
  GaugeValueText(
    text = JS("({ value, valueMax }) => `${value} / ${valueMax}`")
  )
)
```

## Learn More

- [MUI Gauge Chart Documentation](https://mui.com/x/react-charts/gauge/)

See also:
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
`sx` overrides and arc styling.
