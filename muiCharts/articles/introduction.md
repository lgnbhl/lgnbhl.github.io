# Introduction

## Install

You can install the development version of muiCharts like so:

``` r

remotes::install_github("lgnbhl/muiCharts")
```

## Quick Start

``` r

library(muiCharts)
library(dplyr)

starwars_summary <- dplyr::starwars |>
  filter(species %in% c("Human", "Droid", "Wookiee")) |>
  group_by(species) |>
  summarise(height = mean(height, na.rm = TRUE), mass = mean(mass, na.rm = TRUE))
```

``` r

BarChart(
  dataset = starwars_summary,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "species",
      label = "Species"
    )
  ),
  series = list(
    list(dataKey = "height", label = "Height (cm)"),
    list(dataKey = "mass", label = "Mass (kg)")
  ),
  grid = list(horizontal = TRUE),
  height = 300
)
```

## Using JavaScript

Use the
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
function to pass JavaScript code, for example to customize tooltip
values with `valueFormatter`:

``` r

customValueFormatter <- function(category){
  JS(
    paste0(
      "function(value){",
      "if (value === null) { return 'None' }",
      "return `${value} ", category, "`}"
    )
  )
}

BarChart(
  dataset = starwars_summary,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "species",
      label = "Species",
      valueFormatter = JS("(value) => `${value}`")
    )
  ),
  series = list(
    list(
      dataKey = "height",
      label = "Height (cm)",
      valueFormatter = customValueFormatter("cm")
    ),
    list(
      dataKey = "mass",
      label = "Mass (kg)",
      valueFormatter = customValueFormatter("kg")
    )
  ),
  grid = list(horizontal = TRUE),
  height = 400
)
```

## Chart Types

muiCharts provides the following chart types, each with a dedicated
article:

- [Bar Charts](https://felixluginbuhl.com/muiCharts/articles/bars.md) —
  vertical and horizontal bar charts with grouping and stacking
- [Line Charts](https://felixluginbuhl.com/muiCharts/articles/lines.md)
  — line charts with marks, curves, and null handling
- [Area Charts](https://felixluginbuhl.com/muiCharts/articles/areas.md)
  — filled area charts with stacking and baselines
- [Pie Charts](https://felixluginbuhl.com/muiCharts/articles/pies.md) —
  pie and donut charts with arc labels
- [Scatter
  Charts](https://felixluginbuhl.com/muiCharts/articles/scatter.md) —
  scatter plots with Voronoi interaction
- [Radar Charts](https://felixluginbuhl.com/muiCharts/articles/radar.md)
  — radar charts for multi-metric comparisons
- [Sparkline
  Charts](https://felixluginbuhl.com/muiCharts/articles/sparkline.md) —
  compact inline charts
- [Gauge Charts](https://felixluginbuhl.com/muiCharts/articles/gauge.md)
  — gauge displays for single metrics

## Features

Cross-cutting features that apply to all chart types:

- [Axis & Grid](https://felixluginbuhl.com/muiCharts/articles/axis.md) —
  scale types, labels, value formatters, grid lines, margins
- [Tooltip](https://felixluginbuhl.com/muiCharts/articles/tooltip.md) —
  tooltip triggers, formatting, and composition
- [Legend](https://felixluginbuhl.com/muiCharts/articles/legend.md) —
  legend position, direction, and color legends
- [Highlighting](https://felixluginbuhl.com/muiCharts/articles/highlighting.md)
  — highlight and fade interactions
- [Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) —
  colors, color maps, and CSS overrides with `sx`
- [Composition](https://felixluginbuhl.com/muiCharts/articles/composition.md)
  — build charts from individual sub-components

## Integration

- [Shiny](https://felixluginbuhl.com/muiCharts/articles/shiny.md) —
  reactive charts, click events, and dashboards
- [Quarto](https://felixluginbuhl.com/muiCharts/articles/quarto.md) —
  HTML documents, dashboards, and tabsets

### Contribute

If you have any issue, question or want to contribute with a pull
request, don’t hesitate to write me on
<https://github.com/lgnbhl/muiCharts>

For updates follow [Felix
Luginbuhl](https://linkedin.com/in/FelixLuginbuhl) on LinkedIn.
