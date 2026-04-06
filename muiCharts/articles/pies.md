# Pie Charts

## Overview

Pie charts express portions of a whole using arcs or angles within a
circle. They are ideal for showing proportions and making relative
shares easy to compare at a glance. Each slice represents a category’s
contribution to the total.

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Prepare Data

For pie charts, the data must have `label` and `value` columns:

``` r

# Count characters by sex
starwars_sex <- dplyr::starwars |>
  count(sex) |>
  filter(!is.na(sex)) |>
  select(label = sex, value = n)

# Count characters by species (top 5)
starwars_species <- dplyr::starwars |>
  count(species) |>
  filter(!is.na(species)) |>
  arrange(desc(n)) |>
  slice_head(n = 5) |>
  select(label = species, value = n)
```

## Basic Pie Chart

A simple pie chart showing the distribution of characters by sex:

``` r

PieChart(
  series = list(
    list(
      data = starwars_sex
    )
  ),
  height = 300
)
```

## Per-Slice Colors

Add a `color` column to the data to assign colors to individual slices:

``` r

starwars_sex_colored <- starwars_sex |>
  mutate(color = c("#440154FF", "#2A788EFF", "#FDE725FF", "#35B779FF"))

PieChart(
  series = list(
    list(
      data = starwars_sex_colored
    )
  ),
  height = 300
)
```

## Donut Chart

Create a donut chart by setting the `innerRadius`:

``` r

PieChart(
  series = list(
    list(
      data = starwars_sex,
      innerRadius = 50,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Pie Chart with Arc Labels

Display values directly on the slices:

``` r

PieChart(
  series = list(
    list(
      data = starwars_sex,
      arcLabel = "label",
      innerRadius = 50,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Pie Chart with Value Labels

Show the value on each arc:

``` r

PieChart(
  series = list(
    list(
      data = starwars_species,
      arcLabel = "value",
      innerRadius = 40,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Pie Chart with Percentage Labels

Display custom formatted labels using JavaScript:

``` r

# Calculate percentages
starwars_sex_pct <- starwars_sex |>
  mutate(
    pct = round(value / sum(value) * 100, 1),
    pct_label = paste0(pct, "%")
  )

PieChart(
  series = list(
    list(
      data = starwars_sex_pct,
      arcLabel = JS("(item) => `${item.label}: ${item.pct}%`"),
      arcLabelMinAngle = 20,
      innerRadius = 50,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Pie Chart with Padding

Add spacing between slices using `paddingAngle`:

``` r

PieChart(
  series = list(
    list(
      data = starwars_sex,
      paddingAngle = 5,
      cornerRadius = 5,
      innerRadius = 40,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Semi-Circle Pie Chart

Create a semi-circle chart by setting start and end angles:

``` r

PieChart(
  series = list(
    list(
      data = starwars_sex,
      startAngle = -90,
      endAngle = 90,
      innerRadius = 50,
      outerRadius = 100
    )
  ),
  height = 250
)
```

## Two-Level Pie Chart

Create nested pie charts with multiple series:

``` r

# Prepare inner and outer data
starwars_inner <- dplyr::starwars |>
  count(sex) |>
  filter(!is.na(sex)) |>
  select(label = sex, value = n)

starwars_outer <- dplyr::starwars |>
  filter(!is.na(sex), !is.na(species)) |>
  count(species) |>
  arrange(desc(n)) |>
  slice_head(n = 8) |>
  select(label = species, value = n)

PieChart(
  series = list(
    list(
      data = starwars_inner,
      innerRadius = 0,
      outerRadius = 60
    ),
    list(
      data = starwars_outer,
      innerRadius = 80,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Pie Chart with Custom Size

Control the position and size of the pie:

``` r

PieChart(
  series = list(
    list(
      data = starwars_sex,
      cx = 150,
      cy = 150,
      innerRadius = 40,
      outerRadius = 80
    )
  ),
  height = 300,
  width = 300
)
```

## Gauge-Style Donut

Create a gauge-like visualization:

``` r

# Calculate percentage for a specific category
starwars_gauge <- dplyr::starwars |>
  count(sex) |>
  filter(!is.na(sex)) |>
  mutate(
    prop = n / sum(n) * 100,
    prop_label = paste0(round(prop), "%")
  ) |>
  filter(sex == "female") |>
  select(label = sex, value = prop)

# Add remaining to complete the circle
starwars_gauge_data <- bind_rows(
  starwars_gauge,
  list(label = "Other", value = 100 - starwars_gauge$value)
)

PieChart(
  series = list(
    list(
      data = starwars_gauge_data,
      innerRadius = 70,
      outerRadius = 90,
      startAngle = -90,
      endAngle = 90
    )
  ),
  height = 250
)
```

## Pie Chart Composition

Build pie charts from individual sub-components using
`ChartDataProvider`. Use `PiePlot` to render both arcs and labels
together:

``` r

ChartDataProvider(
  series = list(
    list(
      type = "pie",
      data = starwars_sex,
      innerRadius = 50,
      outerRadius = 100
    )
  ),
  height = 300,
  ChartsTooltip(trigger = "item"),
  ChartsSurface(
    PiePlot()
  )
)
```

Use `PieArcPlot` and `PieArcLabelPlot` separately for independent
control over arcs and labels:

``` r

ChartDataProvider(
  series = list(
    list(
      type = "pie",
      data = starwars_sex,
      innerRadius = 50,
      outerRadius = 100,
      arcLabel = "label"
    )
  ),
  height = 300,
  ChartsTooltip(trigger = "item"),
  ChartsSurface(
    PieArcPlot(),
    PieArcLabelPlot()
  )
)
```

`PieArc` and `PieArcLabel` are the slot sub-components for individual
arc and label rendering:

``` r

PieArc(skipAnimation = TRUE)
PieArcLabel()
```

## Learn More

- [MUI Pie Charts Documentation](https://mui.com/x/react-charts/pie/)

See also:
[Highlighting](https://felixluginbuhl.com/muiCharts/articles/highlighting.md)
for hover effects,
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
colors,
[Legend](https://felixluginbuhl.com/muiCharts/articles/legend.md) for
legend options.
