# Gauge Charts

## Overview

Gauge charts let users evaluate a single metric relative to a defined
range. This article demonstrates gauge charts with muiCharts based on
the [MUI X Gauge documentation](https://mui.com/x/react-charts/gauge/).

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Basics

The Gauge displays a numeric value between 0 and 100 by default. Control
the arc range with `startAngle` and `endAngle`:

``` r

# Percentage of characters whose gender is "male"
male_pct <- starwars_people |>
  summarise(pct = round(mean(gender == "male", na.rm = TRUE) * 100)) |>
  pull(pct)

# Full circle gauge
Gauge(width = 100, height = 100, value = male_pct)
```

``` r

# Semi-circle gauge (speedometer style)
Gauge(width = 100, height = 100, value = male_pct, startAngle = -90, endAngle = 90)
```

## Value Range

Use `valueMin` and `valueMax` to shift the gauge off the 0–100 default —
here the average character height mapped to a 100–250 cm range:

``` r

avg_height <- starwars_people |>
  filter(!is.na(height)) |>
  summarise(avg = round(mean(height))) |>
  pull(avg)

# Default range
Gauge(width = 100, height = 100, value = 50)
```

``` r

# Custom range (100–250 cm)
Gauge(width = 100, height = 100, value = avg_height, valueMin = 100, valueMax = 250)
```

## Arc Configuration

Modify arc shape with `innerRadius`, `outerRadius`, and `cornerRadius`:

``` r

# Data completeness: % of characters with known mass
mass_known <- starwars_people |>
  summarise(pct = round(mean(!is.na(mass)) * 100)) |>
  pull(pct)

# Donut gauge
Gauge(width = 150, height = 150, value = mass_known, innerRadius = "70%", outerRadius = "100%")
```

``` r

# With rounded corners
Gauge(width = 150, height = 150, value = mass_known, innerRadius = "70%", outerRadius = "100%", cornerRadius = "50%")
```

## Text Configuration

Customize the center text with the `text` prop — static string or a
JavaScript formatter:

``` r

# % of characters with known height
height_known <- starwars_people |>
  summarise(pct = round(mean(!is.na(height)) * 100)) |>
  pull(pct)

# Static text
Gauge(width = 150, height = 150, value = height_known, text = paste0(height_known, "%"))
```

``` r

# Dynamic formatter
Gauge(width = 150, height = 150, value = height_known, text = JS("({ value, valueMax }) => `${value} / ${valueMax}`"))
```

## Arc Design

Customize colors using the `sx` prop with MUI CSS class selectors:

``` r

Gauge(
  width        = 150,
  height       = 150,
  value        = male_pct,
  cornerRadius = "50%",
  sx = list(
    "& .MuiGauge-valueText"   = list(fontSize = 40),
    "& .MuiGauge-valueArc"    = list(fill = "#52b202"),
    "& .MuiGauge-referenceArc"= list(fill = "#e0e0e0")
  )
)
```

## Semi-Circle and Quarter-Circle

Different arc ranges suit different use cases:

``` r

# % of species with a known homeworld
homeworld_known <- starwars_species |>
  summarise(pct = round(mean(!is.na(homeworld)) * 100)) |>
  pull(pct)

# Semi-circle
Gauge(width = 200, height = 120, value = homeworld_known, startAngle = -90, endAngle = 90)
```

``` r

# Quarter-circle
Gauge(width = 150, height = 150, value = homeworld_known, startAngle = 0, endAngle = 90)
```

## Multiple Gauges

A dashboard showing three data-quality metrics from `starwars_people`:

``` r

library(muiMaterial)

height_known <- round(mean(!is.na(starwars_people$height)) * 100)
mass_known   <- round(mean(!is.na(starwars_people$mass))   * 100)
birth_known  <- round(mean(!is.na(starwars_people$birth_year)) * 100)

Box(
  sx = list(display = "flex", gap = 2, justifyContent = "center", alignItems = "center"),
  Box(
    sx = list(display = "flex", flexDirection = "column", alignItems = "center"),
    Typography(variant = "subtitle2", "Height known"),
    Gauge(width = 100, height = 100, value = height_known)
  ),
  Box(
    sx = list(display = "flex", flexDirection = "column", alignItems = "center"),
    Typography(variant = "subtitle2", "Mass known"),
    Gauge(width = 100, height = 100, value = mass_known)
  ),
  Box(
    sx = list(display = "flex", flexDirection = "column", alignItems = "center"),
    Typography(variant = "subtitle2", "Birth year known"),
    Gauge(width = 100, height = 100, value = birth_known)
  )
)
```

## Accessibility

The Gauge follows the ARIA Meter pattern. Add `aria-label` or
`aria-labelledby` for screen readers:

``` r

species_count <- nrow(starwars_species)
diversity_pct <- min(round(species_count / 50 * 100), 100)

Box(
  Typography(id = "div_label", variant = "h6", "Species Diversity Index"),
  Gauge(
    width            = 150,
    height           = 150,
    value            = diversity_pct,
    `aria-labelledby`= "div_label",
    `aria-valuetext` = paste0(species_count, " species out of 50")
  )
)
```

## Composition

Use `GaugeContainer` with individual sub-components for full control
over the layout:

``` r

GaugeContainer(
  width       = 200,
  height      = 200,
  value       = male_pct,
  startAngle  = -110,
  endAngle    = 110,
  GaugeReferenceArc(),
  GaugeValueArc(),
  GaugeValueText()
)
```

Customize the center text with a JavaScript formatter:

``` r

GaugeContainer(
  width        = 200,
  height       = 200,
  value        = male_pct,
  startAngle   = -110,
  endAngle     = 110,
  innerRadius  = "60%",
  outerRadius  = "100%",
  cornerRadius = "50%",
  GaugeReferenceArc(),
  GaugeValueArc(),
  GaugeValueText(text = JS("({ value, valueMax }) => `${value} / ${valueMax}`"))
)
```

## Learn More

- [MUI Gauge Chart Documentation](https://mui.com/x/react-charts/gauge/)

See also:
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
`sx` overrides and arc styling.
