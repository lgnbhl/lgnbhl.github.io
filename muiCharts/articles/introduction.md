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
```

``` r

BarChart(
  dataset = head(starwars_people, 4),
  xAxis  = list(list(scaleType = "band", dataKey = "name")),
  series = list(list(dataKey = "height", label = "Height (cm)")),
  height = 300
)
```

## Using JavaScript

Use the
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
function to pass JavaScript code, for example to customize tooltip
values with `valueFormatter`:

``` r

BarChart(
  dataset = head(starwars_people, 4),
  xAxis  = list(list(scaleType = "band", dataKey = "name")),
  series = list(
    list(dataKey = "height", label = "Height (cm)", valueFormatter = JS("(v) => v + ' cm'")),
    list(dataKey = "mass",   label = "Mass (kg)",   valueFormatter = JS("(v) => v + ' kg'"))
  ),
  height = 300
)
```

## MUI ecosystem

muiCharts integrates seamlessly with
[muiMaterial](https://felixluginbuhl.com/muiMaterial) to create modern,
fully-styled dashboards.

``` r

library(muiMaterial)

muiMaterialPage(
  CssBaseline(),
  {
    primaryColor <- "#1976d2"

    ThemeProvider(
      theme = list(palette = list(primary = list(main = primaryColor))),
      Box(sx = list(p = 3, bgcolor = "background.paper"),
        Card(sx = list(boxShadow = 3),
          CardContent(
            Stack(spacing = 1.5,
              Typography("Character Count", variant = "h6", sx = list(fontWeight = 600)),
              Typography("Number of characters by Star Wars episode", variant = "body2", sx = list(color = "text.secondary")),
              BarChart(
                dataset = starwars_films |> mutate(Characters = lengths(characters)) |> arrange(episode_id),
                xAxis = list(list(scaleType = "band", dataKey = "episode_id")),
                series = list(list(dataKey = "Characters", color = primaryColor)),
                height = 280
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
